import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendTripReminder } from '@/lib/email/reminders';
import { differenceInCalendarDays, parseISO, isValid } from 'date-fns';

/**
 * Validates request authorization header against CRON_SECRET
 */
function isAuthorizedCronRequest(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    // If not configured in environment, allow local dev execution
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader === `Bearer ${secret}`) {
    return true;
  }

  const customHeader = request.headers.get('x-cron-secret');
  if (customHeader && customHeader === secret) {
    return true;
  }

  return false;
}

/**
 * Core execution engine for Daily Automated Pre-Flight Reminders
 */
async function executeDailyReminderCron(request: NextRequest) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid or missing CRON_SECRET' },
      { status: 401 }
    );
  }

  const today = new Date();
  const trips = await db.savedTrip.findMany({
    where: {
      remindersEnabled: true,
      departureDate: { not: null },
    },
  });

  const dispatched: Array<{
    tripId: string;
    petName: string;
    email: string;
    type: 'DAY_30' | 'DAY_5' | 'DAY_2';
    daysUntilDeparture: number;
    messageId?: string;
  }> = [];

  const skipped: Array<{
    tripId: string;
    petName: string;
    daysUntilDeparture: number;
    reason: string;
  }> = [];

  const errors: Array<{ tripId: string; error: string }> = [];

  for (const trip of trips) {
    try {
      if (!trip.departureDate) continue;

      const departureDateParsed = parseISO(trip.departureDate);
      if (!isValid(departureDateParsed)) {
        errors.push({
          tripId: trip.id,
          error: `Invalid departureDate format: "${trip.departureDate}"`,
        });
        continue;
      }

      const daysUntil = differenceInCalendarDays(departureDateParsed, today);
      let targetMilestone: 'DAY_30' | 'DAY_5' | 'DAY_2' | null = null;

      if (daysUntil === 30) {
        targetMilestone = 'DAY_30';
      } else if (daysUntil === 5) {
        targetMilestone = 'DAY_5';
      } else if (daysUntil === 2) {
        targetMilestone = 'DAY_2';
      }

      if (!targetMilestone) {
        skipped.push({
          tripId: trip.id,
          petName: trip.petName,
          daysUntilDeparture: daysUntil,
          reason: `Days until departure (${daysUntil}) does not match reminder milestones (30, 5, 2)`,
        });
        continue;
      }

      // Check if this milestone was already sent
      if (trip.lastReminderSent && trip.lastReminderSent.startsWith(targetMilestone)) {
        skipped.push({
          tripId: trip.id,
          petName: trip.petName,
          daysUntilDeparture: daysUntil,
          reason: `Milestone ${targetMilestone} was already dispatched on ${trip.lastReminderSent}`,
        });
        continue;
      }

      // Dispatch the reminder email
      const result = await sendTripReminder(trip, targetMilestone);

      if (result.success) {
        const timestamp = `${targetMilestone}_${new Date().toISOString()}`;
        await db.savedTrip.update({
          where: { id: trip.id },
          data: { lastReminderSent: timestamp },
        });

        dispatched.push({
          tripId: trip.id,
          petName: trip.petName,
          email: trip.userEmail,
          type: targetMilestone,
          daysUntilDeparture: daysUntil,
          messageId: result.messageId,
        });
      } else {
        errors.push({
          tripId: trip.id,
          error: result.error || 'Unknown email dispatch failure',
        });
      }
    } catch (err: any) {
      errors.push({
        tripId: trip.id,
        error: err.message || 'Error processing trip reminder',
      });
    }
  }

  return NextResponse.json({
    success: true,
    timestamp: today.toISOString(),
    tripsEvaluated: trips.length,
    dispatchedCount: dispatched.length,
    dispatched,
    skippedCount: skipped.length,
    skipped,
    errorsCount: errors.length,
    errors,
  });
}

export async function GET(request: NextRequest) {
  return executeDailyReminderCron(request);
}

export async function POST(request: NextRequest) {
  return executeDailyReminderCron(request);
}
