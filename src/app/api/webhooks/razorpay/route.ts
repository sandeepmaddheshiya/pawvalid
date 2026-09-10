/**
 * POST /api/webhooks/razorpay
 *
 * Handles Razorpay payment webhooks.
 * On successful payment (payment.captured):
 * 1. For Saved Trips (tripId):
 *    - Upgrades trip tier to CERTIFIED_PASS or CONCIERGE.
 *    - If CONCIERGE: records WhatsApp phone number, sets conciergeStatus to IN_REVIEW,
 *      and dispatches specialist alert to review team.
 *    - Sends purchase receipt & dossier link to traveler via Brevo (sendPurchaseReceiptEmail).
 *    - If CONCIERGE: dispatches traveler concierge confirmation (sendConciergeConfirmationEmail).
 * 2. For legacy Assessments (assessmentId):
 *    - Marks assessment as paid and triggers compliant report email.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { sendSpecialistIntakeNotification } from '@/lib/email/reminders';
import { sendTransactionalEmail } from '@/lib/email/brevo';
import {
  sendPurchaseReceiptEmail,
  sendConciergeConfirmationEmail,
  wrapPawValidEmail,
} from '@/lib/email/templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(body);

    if (event.event === 'payment.captured') {
      const payment = event.payload?.payment?.entity || {};
      const orderId = payment.order_id;
      const paymentId = payment.id;
      const notes = payment.notes || {};
      const email = notes.email || payment.email;
      const tripId = notes.tripId;
      const assessmentId = notes.assessmentId;
      const targetTier = notes.tier === 'CONCIERGE' ? 'CONCIERGE' : 'CERTIFIED_PASS';

      // ─── 1. HANDLE SAVED TRIP PAYMENT ──────────────────────────────────────
      if (tripId) {
        const trip = await db.savedTrip.findUnique({
          where: { id: tripId },
        });

        if (!trip) {
          console.error(`[Razorpay Webhook] SavedTrip not found: ${tripId}`);
          return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        // Check idempotency: if already upgraded to CONCIERGE and webhook repeated, avoid duplicate alerts
        const alreadyUpgraded = trip.tier === targetTier;

        const updatedTrip = await db.savedTrip.update({
          where: { id: tripId },
          data: {
            tier: targetTier,
            ...(targetTier === 'CONCIERGE'
              ? {
                  whatsappNumber: notes.whatsappNumber || trip.whatsappNumber,
                  conciergeStatus: 'IN_REVIEW',
                  conciergeNotes: notes.notes || trip.conciergeNotes,
                }
              : {}),
          },
        });

        // If Concierge tier, notify PawValid specialist team (if not already notified)
        if (targetTier === 'CONCIERGE' && !alreadyUpgraded) {
          try {
            await sendSpecialistIntakeNotification({
              trip: updatedTrip,
              customerWhatsApp: notes.whatsappNumber || trip.whatsappNumber || '',
              notes: notes.notes || trip.conciergeNotes || undefined,
              urgency: (notes.urgency as any) || 'HIGH',
            });
          } catch (intakeErr) {
            console.error('[Razorpay Webhook] Specialist notification failed:', intakeErr);
          }
        }

        // Send purchase receipt & dossier link to traveler via Brevo
        if (email && !alreadyUpgraded) {
          try {
            await sendPurchaseReceiptEmail({
              trip: updatedTrip,
              paymentId,
              amount: payment.amount,
              currency: payment.currency || 'GBP',
              targetTier,
              recipientEmail: email,
            });

            // If Concierge tier, also send traveler WhatsApp confirmation email
            if (targetTier === 'CONCIERGE' && (notes.whatsappNumber || updatedTrip.whatsappNumber)) {
              await sendConciergeConfirmationEmail(
                updatedTrip,
                notes.whatsappNumber || updatedTrip.whatsappNumber || ''
              );
            }
          } catch (emailError) {
            console.error('[Razorpay Webhook] Email send failed:', emailError);
          }
        }

        return NextResponse.json({ status: 'ok', upgradedTier: targetTier, tripId });
      }

      // ─── 2. HANDLE LEGACY ASSESSMENT PAYMENT ───────────────────────────────
      if (assessmentId) {
        await db.assessment.update({
          where: { razorpayOrderId: orderId },
          data: {
            paidReportId: paymentId,
            razorpayPaymentId: paymentId,
          },
        });

        if (email) {
          try {
            const assessment = await db.assessment.findUnique({
              where: { razorpayOrderId: orderId },
            });
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';
            const subject = 'Your PawValid Travel Compliance Report is Ready';

            const reportHtml = wrapPawValidEmail({
              title: subject,
              preheader: 'Your comprehensive pet travel compliance audit is ready for review.',
              contentHtml: `
                <h1 class="h1">Compliance Report Ready</h1>
                <p class="lead">
                  Thank you for your purchase. Your travel compliance assessment for dossier <strong>#${assessmentId.slice(-6)}</strong> has been verified.
                </p>

                <div class="card">
                  <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 14px;">
                    <tr>
                      <td style="color: #64748b; width: 40%;">Assessment ID:</td>
                      <td style="font-weight: 700; color: #0f172a;">${assessmentId}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b;">Overall Status:</td>
                      <td style="font-weight: 700; color: #10b981;">${assessment?.overallVerdict ?? 'VERIFIED'}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b;">Payment Reference:</td>
                      <td style="font-weight: 600; color: #0f172a;">${paymentId}</td>
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
              to: email,
              subject,
              htmlContent: reportHtml,
              textContent: `Your PawValid Compliance Report is ready.\nAssessment ID: ${assessmentId}\nStatus: ${assessment?.overallVerdict ?? 'VERIFIED'}\nView report: ${appUrl}/en/checker/${assessmentId}`,
            });
          } catch (emailError) {
            console.error('[Razorpay Webhook] Email send failed:', emailError);
          }
        }

        return NextResponse.json({ status: 'ok', assessmentId });
      }

      console.warn('[Razorpay Webhook] Neither tripId nor assessmentId present in payment notes');
      return NextResponse.json({ status: 'ok', warning: 'No matching entity in notes' });
    }

    // Acknowledge other events
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('[POST /api/webhooks/razorpay] Error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
