import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendSpecialistIntakeNotification } from '@/lib/email/reminders';

/**
 * POST /api/concierge/intake
 * 
 * Registers £59 Concierge tier purchase & specialist intake:
 * 1. Captures traveler's WhatsApp phone number, urgency, and specific travel notes.
 * 2. Updates SavedTrip tier to 'CONCIERGE' and conciergeStatus to 'IN_REVIEW'.
 * 3. Triggers automated notification to PawValid's specialist team via email (Brevo) & Slack webhook.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tripId, whatsappNumber, notes, urgency } = body;

    if (!tripId || typeof tripId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'tripId is required' },
        { status: 400 }
      );
    }

    if (!whatsappNumber || typeof whatsappNumber !== 'string' || whatsappNumber.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: 'A valid WhatsApp phone number with country code is required' },
        { status: 400 }
      );
    }

    const trip = await db.savedTrip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      );
    }

    const cleanNumber = whatsappNumber.trim();
    const cleanUrgency = urgency === 'IMMEDIATE' || urgency === 'HIGH' ? urgency : 'STANDARD';

    // Update database record
    const updatedTrip = await db.savedTrip.update({
      where: { id: tripId },
      data: {
        tier: 'CONCIERGE',
        whatsappNumber: cleanNumber,
        conciergeStatus: 'IN_REVIEW',
        conciergeNotes: notes?.trim() || null,
      },
    });

    // Send specialist intake email & slack notification
    const emailResult = await sendSpecialistIntakeNotification({
      trip: updatedTrip,
      customerWhatsApp: cleanNumber,
      notes: notes?.trim(),
      urgency: cleanUrgency,
    });

    return NextResponse.json({
      success: true,
      message: 'Concierge review initiated and specialist team alerted successfully.',
      trip: updatedTrip,
      notification: emailResult,
    });
  } catch (error: any) {
    console.error('[POST /api/concierge/intake] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error during concierge intake' },
      { status: 500 }
    );
  }
}
