import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { sendPurchaseReceiptEmail, sendConciergeConfirmationEmail } from '@/lib/email/templates';
import { sendSpecialistIntakeNotification } from '@/lib/email/reminders';

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/trips/[id]/verify-payment
 * 
 * Verifies payment confirmation from the client-side Razorpay modal handler.
 * 1. Validates Razorpay payment signature (if live keys/secret configured).
 * 2. Auto-creates or retrieves User account in PostgreSQL.
 * 3. Upgrades the SavedTrip to CERTIFIED_PASS or CONCIERGE.
 * 4. Dispatches confirmation emails and returns user & trip data.
 */
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { id: tripId } = await params;
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      whatsappNumber,
      tier = 'CERTIFIED_PASS',
      notes,
    } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const targetTier = tier === 'CONCIERGE' ? 'CONCIERGE' : 'CERTIFIED_PASS';

    // Verify signature if live secret is available and signature provided
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (secret && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: 'Invalid payment signature.' },
          { status: 400 }
        );
      }
    }

    // 1. Auto-create or find user account
    const user = await db.user.upsert({
      where: { email: cleanEmail },
      update: {},
      create: {
        email: cleanEmail,
      },
    });

    // 2. Fetch and update SavedTrip
    const existingTrip = await db.savedTrip.findUnique({
      where: { id: tripId },
    });

    if (!existingTrip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found.' },
        { status: 404 }
      );
    }

    const updatedTrip = await db.savedTrip.update({
      where: { id: tripId },
      data: {
        tier: targetTier,
        userEmail: cleanEmail,
        ...(targetTier === 'CONCIERGE'
          ? {
              whatsappNumber: whatsappNumber || existingTrip.whatsappNumber,
              conciergeStatus: 'IN_REVIEW',
              conciergeNotes: notes || existingTrip.conciergeNotes,
            }
          : {}),
      },
    });

    // 3. Dispatch specialist intake if concierge
    if (targetTier === 'CONCIERGE' && (whatsappNumber || existingTrip.whatsappNumber)) {
      sendSpecialistIntakeNotification({
        trip: updatedTrip,
        customerWhatsApp: whatsappNumber || existingTrip.whatsappNumber || '',
        notes: notes || existingTrip.conciergeNotes || undefined,
        urgency: 'HIGH',
      }).catch((err) => console.error('[Verify Payment] Specialist notification failed:', err));

      sendConciergeConfirmationEmail(
        updatedTrip,
        whatsappNumber || existingTrip.whatsappNumber || ''
      ).catch((err) => console.error('[Verify Payment] Concierge email failed:', err));
    }

    // 4. Dispatch purchase receipt & auto-account notification email
    sendPurchaseReceiptEmail({
      trip: updatedTrip,
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
      amount: targetTier === 'CONCIERGE' ? 5900 : 1900,
      currency: 'GBP',
      targetTier,
      recipientEmail: cleanEmail,
    }).catch((err) => console.error('[Verify Payment] Receipt email failed:', err));

    return NextResponse.json({
      success: true,
      accountCreated: true,
      user,
      trip: updatedTrip,
      message: `Account created for ${cleanEmail} and trip upgraded to ${targetTier}.`,
    });
  } catch (error: any) {
    console.error('[API /api/trips/[id]/verify-payment] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
