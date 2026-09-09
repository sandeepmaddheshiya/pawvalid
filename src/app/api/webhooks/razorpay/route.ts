/**
 * POST /api/webhooks/razorpay
 *
 * Handles Razorpay payment webhooks.
 * On successful payment (payment.captured):
 * 1. For Saved Trips (tripId):
 *    - Upgrades trip tier to CERTIFIED_PASS or CONCIERGE.
 *    - If CONCIERGE: records WhatsApp phone number, sets conciergeStatus to IN_REVIEW,
 *      and dispatches specialist alert to review team.
 *    - Sends purchase receipt & dossier link to traveler via Resend.
 * 2. For legacy Assessments (assessmentId):
 *    - Marks assessment as paid and triggers report email.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { sendSpecialistIntakeNotification } from '@/lib/email/reminders';

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

        // If Concierge tier, notify PawValid specialist team
        if (targetTier === 'CONCIERGE') {
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

        // Send purchase receipt & dossier link to traveler
        if (email && process.env.RESEND_API_KEY) {
          try {
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

            await resend.emails.send({
              from: process.env.RESEND_FROM_EMAIL || 'noreply@pawvalid.online',
              to: email,
              subject: `Payment Confirmed: PawValid ${targetTier === 'CONCIERGE' ? 'Priority Concierge' : 'Certified Trip Pass'} (${trip.petName})`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
                  <h1 style="color: #0f172a;">Your PawValid Plan is Active!</h1>
                  <p>Thank you for your purchase. Your travel compliance plan for <strong>${trip.petName}</strong> is now fully unlocked.</p>
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                    <p style="margin: 4px 0;"><strong>Pet Name:</strong> ${trip.petName}</p>
                    <p style="margin: 4px 0;"><strong>Route:</strong> ${trip.origin} &rarr; ${trip.destination}</p>
                    <p style="margin: 4px 0;"><strong>Plan Tier:</strong> ${targetTier === 'CONCIERGE' ? '★ Priority Concierge (£59)' : '✓ Certified Trip Pass (£19)'}</p>
                    <p style="margin: 4px 0;"><strong>Transaction ID:</strong> ${paymentId}</p>
                  </div>

                  <p>You can access your command center and download your official PDF travel dossier at any time:</p>
                  <p style="text-align: center; margin: 24px 0;">
                    <a href="${appUrl}/dashboard?tripId=${tripId}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                      Open Trip Command Center &rarr;
                    </a>
                  </p>
                </div>
              `,
            });
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

        if (email && process.env.RESEND_API_KEY) {
          try {
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);
            const assessment = await db.assessment.findUnique({
              where: { razorpayOrderId: orderId },
            });

            await resend.emails.send({
              from: process.env.RESEND_FROM_EMAIL || 'noreply@pawvalid.online',
              to: email,
              subject: 'Your PawValid Pet Travel Compliance Report',
              html: `
                <h1>Your PawValid Assessment Report</h1>
                <p>Thank you for your purchase! Your detailed compliance report is ready.</p>
                <p><strong>Assessment ID:</strong> ${assessmentId}</p>
                <p><strong>Overall Verdict:</strong> ${assessment?.overallVerdict ?? 'N/A'}</p>
                <p>View your full report at: ${process.env.NEXT_PUBLIC_APP_URL}/en/checker/${assessmentId}</p>
              `,
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
