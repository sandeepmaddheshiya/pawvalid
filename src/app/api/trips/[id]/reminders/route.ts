import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendTripReminder } from '@/lib/email/reminders';

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/trips/[id]/reminders
 * Returns reminder subscription state and last sent timestamp
 */
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const trip = await db.savedTrip.findUnique({
      where: { id },
      select: {
        id: true,
        userEmail: true,
        departureDate: true,
        remindersEnabled: true,
        lastReminderSent: true,
      },
    });

    if (!trip) {
      return NextResponse.json({ success: false, error: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      reminders: {
        enabled: trip.remindersEnabled,
        lastReminderSent: trip.lastReminderSent,
        userEmail: trip.userEmail,
        departureDate: trip.departureDate,
      },
    });
  } catch (error: any) {
    console.error('[GET /api/trips/[id]/reminders] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/trips/[id]/reminders
 * 
 * Supports:
 * 1. Triggering an immediate test/scheduled reminder: { type: 'DAY_30' | 'DAY_5' | 'DAY_2' }
 * 2. Toggling reminder preferences: { remindersEnabled: boolean }
 */
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { type, remindersEnabled } = body;

    const trip = await db.savedTrip.findUnique({
      where: { id },
    });

    if (!trip) {
      return NextResponse.json({ success: false, error: 'Trip not found' }, { status: 404 });
    }

    // If toggling subscription
    if (typeof remindersEnabled === 'boolean') {
      const updated = await db.savedTrip.update({
        where: { id },
        data: { remindersEnabled },
      });
      return NextResponse.json({
        success: true,
        message: `Reminders ${remindersEnabled ? 'enabled' : 'disabled'} successfully.`,
        remindersEnabled: updated.remindersEnabled,
      });
    }

    // If dispatching a reminder
    if (type && ['DAY_30', 'DAY_5', 'DAY_2'].includes(type)) {
      const result = await sendTripReminder(trip, type as 'DAY_30' | 'DAY_5' | 'DAY_2');

      if (result.success) {
        await db.savedTrip.update({
          where: { id },
          data: { lastReminderSent: `${type}_${new Date().toISOString()}` },
        });
      }

      return NextResponse.json({
        success: result.success,
        message: result.success
          ? `Pre-flight ${type} reminder dispatched to ${trip.userEmail}`
          : `Failed to deliver reminder: ${result.error}`,
        result,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request: provide a valid reminder "type" (DAY_30, DAY_5, DAY_2) or "remindersEnabled" boolean.' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('[POST /api/trips/[id]/reminders] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process reminder request' },
      { status: 500 }
    );
  }
}
