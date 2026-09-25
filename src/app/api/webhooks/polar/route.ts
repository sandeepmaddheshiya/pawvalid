/**
 * POST /api/webhooks/polar
 *
 * Handles Polar.sh payment webhooks (Standard Webhooks compliant).
 * Supported events:
 * 1. order.created / order.paid
 * 2. checkout.updated (status: 'succeeded' / 'confirmed')
 *
 * Business logic on successful payment:
 * - For Saved Trips (tripId):
 *   1. Auto-creates or updates User account in PostgreSQL.
 *   2. Upgrades SavedTrip tier to CERTIFIED_PASS (£19) or CONCIERGE (£59).
 *   3. If CONCIERGE: records WhatsApp phone number, sets conciergeStatus to IN_REVIEW,
 *      and dispatches specialist alert email.
 *   4. Dispatches purchase receipt & traveler confirmation emails via Brevo/Resend.
 * - For Assessments (assessmentId):
 *   1. Marks assessment as paid (paidReportId).
 *   2. Sends compliance report delivery email to customer.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseAndValidatePolarWebhook } from '@/lib/polar';
import { sendSpecialistIntakeNotification } from '@/lib/email/reminders';
import { sendTransactionalEmail } from '@/lib/email/brevo';
import {
  sendPurchaseReceiptEmail,
  sendConciergeConfirmationEmail,
  wrapPawValidEmail,
} from '@/lib/email/templates';
import { WebhookVerificationError } from '@polar-sh/sdk/webhooks';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    
    // Extract headers for Standard Webhook signature verification
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    let event: any;
    try {
      event = parseAndValidatePolarWebhook(rawBody, headers);
    } catch (err: any) {
      if (err instanceof WebhookVerificationError || err?.name === 'WebhookVerificationError') {
        console.error('[Polar Webhook] Signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 403 });
      }
      console.error('[Polar Webhook] Payload error:', err);
      return NextResponse.json({ error: 'Malformed payload' }, { status: 400 });
    }

    const eventType = event.type;
    console.log(`[Polar Webhook] Received event: ${eventType}`);

    // Handle order.created, order.paid, and successful checkout.updated
    const isOrderEvent = eventType === 'order.created' || eventType === 'order.paid';
    const isCheckoutSucceeded =
      eventType === 'checkout.updated' &&
      (event.data?.status === 'succeeded' || event.data?.status === 'confirmed');

    if (isOrderEvent || isCheckoutSucceeded) {
      const data = event.data || {};
      const metadata = data.metadata || {};
      const orderId = data.id || data.checkout_id;
      const paymentAmount = data.total_amount || data.amount || data.subtotal_amount || 0;
      const currency = (data.currency || 'GBP').toUpperCase();

      const customerEmail = (
        metadata.email ||
        data.customer?.email ||
        data.customer_email ||
        data.customerEmail ||
        ''
      )
        .toLowerCase()
        .trim();

      const tripId = metadata.tripId as string | undefined;
      const assessmentId = metadata.assessmentId as string | undefined;
      const targetTier = metadata.tier === 'CONCIERGE' ? 'CONCIERGE' : 'CERTIFIED_PASS';
      const whatsappNumber = (metadata.whatsappNumber as string | undefined) || '';
      const notes = (metadata.notes as string | undefined) || '';
      const urgency = (metadata.urgency as any) || 'HIGH';

      // ─── 1. HANDLE SAVED TRIP PAYMENT ──────────────────────────────────────
      if (tripId) {
        const trip = await db.savedTrip.findUnique({
          where: { id: tripId },
        });

        if (!trip) {
          console.error(`[Polar Webhook] SavedTrip not found for id: ${tripId}`);
          return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        const emailToUse = customerEmail || trip.userEmail;

        // Auto-create or ensure User account exists in database
        if (emailToUse) {
          try {
            await db.user.upsert({
              where: { email: emailToUse },
              update: {},
              create: {
                email: emailToUse,
              },
            });
          } catch (userErr) {
            console.warn('[Polar Webhook] Auto user creation note:', userErr);
          }
        }

        // Idempotency check: avoid duplicate email dispatches if repeated
        const alreadyUpgraded = trip.tier === targetTier;

        const updatedTrip = await db.savedTrip.update({
          where: { id: tripId },
          data: {
            tier: targetTier,
            userEmail: emailToUse || trip.userEmail,
            ...(targetTier === 'CONCIERGE'
              ? {
                  whatsappNumber: whatsappNumber || trip.whatsappNumber,
                  conciergeStatus: 'IN_REVIEW',
                  conciergeNotes: notes || trip.conciergeNotes,
                }
              : {}),
          },
        });

        // If Concierge tier, notify PawValid specialist team
        if (targetTier === 'CONCIERGE' && !alreadyUpgraded) {
          try {
            await sendSpecialistIntakeNotification({
              trip: updatedTrip,
              customerWhatsApp: whatsappNumber || trip.whatsappNumber || '',
              notes: notes || trip.conciergeNotes || undefined,
              urgency,
            });
          } catch (intakeErr) {
            console.error('[Polar Webhook] Specialist notification failed:', intakeErr);
          }
        }

        // Send purchase receipt & dossier link to traveler via Brevo
        if (emailToUse && !alreadyUpgraded) {
          try {
            await sendPurchaseReceiptEmail({
              trip: updatedTrip,
              paymentId: orderId,
              amount: paymentAmount || (targetTier === 'CONCIERGE' ? 5900 : 1900),
              currency: currency || 'GBP',
              targetTier,
              recipientEmail: emailToUse,
            });

            // If Concierge tier, also send traveler WhatsApp confirmation email
            if (targetTier === 'CONCIERGE' && (whatsappNumber || updatedTrip.whatsappNumber)) {
              await sendConciergeConfirmationEmail(
                updatedTrip,
                whatsappNumber || updatedTrip.whatsappNumber || ''
              );
            }
          } catch (emailError) {
            console.error('[Polar Webhook] Email send failed:', emailError);
          }
        }

        return NextResponse.json({
          status: 'ok',
          provider: 'polar',
          event: eventType,
          upgradedTier: targetTier,
          tripId,
          accountCreated: true,
        });
      }

      // ─── 2. HANDLE ASSESSMENT PAYMENT ──────────────────────────────────────
      if (assessmentId) {
        const assessment = await db.assessment.findUnique({
          where: { id: assessmentId },
        });

        if (assessment) {
          await db.assessment.update({
            where: { id: assessmentId },
            data: {
              paidReportId: orderId,
              razorpayPaymentId: orderId, // Backwards compatibility for paid badge
            },
          });

          if (customerEmail) {
            try {
              const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';
              const subject = 'Your PawValid Travel Compliance Report is Ready';

              const reportHtml = wrapPawValidEmail({
                title: subject,
                preheader: 'Your comprehensive pet travel compliance audit is ready for review.',
                contentHtml: `
                  <h1 class="h1">Compliance Report Ready</h1>
                  <p class="lead">
                    Thank you for your purchase via Polar. Your travel compliance assessment for dossier <strong>#${assessmentId.slice(
                      -6
                    )}</strong> has been verified.
                  </p>

                  <div class="card">
                    <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 14px;">
                      <tr>
                        <td style="color: #64748b; width: 40%;">Assessment ID:</td>
                        <td style="font-weight: 700; color: #0f172a;">${assessmentId}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b;">Overall Status:</td>
                        <td style="font-weight: 700; color: #10b981;">${
                          assessment?.overallVerdict ?? 'VERIFIED'
                        }</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b;">Polar Order Ref:</td>
                        <td style="font-weight: 600; color: #0f172a;">${orderId}</td>
                      </tr>
                    </table>
                  </div>

                  <div style="text-align: center; margin: 32px 0;">
                    <a href="${appUrl}/en/checker/${assessmentId}" class="btn">
                      View Full Compliance Report &rarr;
                    </a>
                  </div>
                `,
              });

              await sendTransactionalEmail({
                to: customerEmail,
                subject,
                htmlContent: reportHtml,
                textContent: `Your PawValid Compliance Report is ready.\nAssessment ID: ${assessmentId}\nStatus: ${
                  assessment?.overallVerdict ?? 'VERIFIED'
                }\nView report: ${appUrl}/en/checker/${assessmentId}`,
              });
            } catch (emailErr) {
              console.error('[Polar Webhook] Assessment email failed:', emailErr);
            }
          }

          return NextResponse.json({
            status: 'ok',
            provider: 'polar',
            event: eventType,
            assessmentId,
          });
        }
      }

      console.warn('[Polar Webhook] No matching tripId or assessmentId in metadata');
      return NextResponse.json({ status: 'ok', warning: 'No matching entity in metadata' });
    }

    // Acknowledge other event types (e.g., checkout.created, subscription.*, etc.)
    return NextResponse.json({ status: 'ok', event: eventType }, { status: 200 });
  } catch (error: any) {
    console.error('[POST /api/webhooks/polar] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
