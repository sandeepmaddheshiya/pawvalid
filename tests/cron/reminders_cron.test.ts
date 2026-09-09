import { describe, it, expect, beforeAll } from 'vitest';
import { GET as runCron } from '@/app/api/cron/reminders/route';
import { POST as createTrip } from '@/app/api/trips/route';
import { NextRequest } from 'next/server';
import { addDays, format } from 'date-fns';

describe('Daily Pre-Flight Reminders Cron Worker', () => {
  const CRON_SECRET = 'test_cron_secret_456';
  let tripDay30Id = '';
  let tripDay5Id = '';
  let tripDay2Id = '';
  let tripDay10Id = '';

  beforeAll(async () => {
    process.env.CRON_SECRET = CRON_SECRET;
    delete process.env.BREVO_API_KEY;
    delete process.env.RESEND_API_KEY;

    const today = new Date();
    const date30 = format(addDays(today, 30), 'yyyy-MM-dd');
    const date5 = format(addDays(today, 5), 'yyyy-MM-dd');
    const date2 = format(addDays(today, 2), 'yyyy-MM-dd');
    const date10 = format(addDays(today, 10), 'yyyy-MM-dd');

    const seedHelper = async (petName: string, departureDate: string) => {
      const req = new NextRequest('http://localhost:3000/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: `cron_${petName.toLowerCase()}@pawvalid.online`,
          petName,
          scanResult: {
            route: { origin: 'United Kingdom', destination: 'Norway', departureDate },
            petProfile: { species: 'DOG', name: petName },
            stats: { overallStatus: 'ACTION_REQUIRED' },
            timelineMilestones: [],
            complianceChecklist: { all: [] },
            readinessReport: { nextSteps: [] },
          },
          tier: 'CERTIFIED_PASS',
        }),
      });
      const res = await createTrip(req);
      const data = await res.json();
      return data.trip.id;
    };

    tripDay30Id = await seedHelper('Rover30', date30);
    tripDay5Id = await seedHelper('Daisy5', date5);
    tripDay2Id = await seedHelper('Barney2', date2);
    tripDay10Id = await seedHelper('Rocky10', date10);
  });

  it('should reject cron invocation when authorization header is missing or incorrect', async () => {
    const req = new NextRequest('http://localhost:3000/api/cron/reminders', {
      headers: { Authorization: 'Bearer wrong_secret' },
    });

    const res = await runCron(req);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it('should successfully evaluate trips and dispatch Day -30, Day -5, and Day -2 reminders', async () => {
    const req = new NextRequest('http://localhost:3000/api/cron/reminders', {
      headers: { Authorization: `Bearer ${CRON_SECRET}` },
    });

    const res = await runCron(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.tripsEvaluated).toBeGreaterThanOrEqual(4);

    const dispatchedTripIds = data.dispatched.map((d: any) => d.tripId);
    expect(dispatchedTripIds).toContain(tripDay30Id);
    expect(dispatchedTripIds).toContain(tripDay5Id);
    expect(dispatchedTripIds).toContain(tripDay2Id);

    // Verify non-milestone trip (Day 10) was skipped
    const skippedTripIds = data.skipped.map((s: any) => s.tripId);
    expect(skippedTripIds).toContain(tripDay10Id);
  });

  it('should be idempotent: subsequent run skips trips that already received reminders today', async () => {
    const req = new NextRequest('http://localhost:3000/api/cron/reminders', {
      headers: { Authorization: `Bearer ${CRON_SECRET}` },
    });

    const res = await runCron(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);

    const dispatchedTripIds = data.dispatched.map((d: any) => d.tripId);
    expect(dispatchedTripIds).not.toContain(tripDay30Id);
    expect(dispatchedTripIds).not.toContain(tripDay5Id);
    expect(dispatchedTripIds).not.toContain(tripDay2Id);
  });
});
