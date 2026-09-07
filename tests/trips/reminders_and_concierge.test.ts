import { describe, it, expect } from 'vitest';
import { POST as createTrip } from '@/app/api/trips/route';
import { POST as conciergeIntake } from '@/app/api/concierge/intake/route';
import { GET as getReminders, POST as triggerReminders } from '@/app/api/trips/[id]/reminders/route';
import { NextRequest } from 'next/server';

describe('Concierge Intake & Pre-Flight Reminders Endpoints', () => {
  const testEmail = `concierge_${Date.now()}@petvia.com`;
  let tripId = '';

  it('should seed a trip for testing concierge and reminder operations', async () => {
    const payload = {
      userEmail: testEmail,
      petName: 'Luna',
      scanResult: {
        route: { origin: 'United States', destination: 'United Kingdom', departureDate: '2026-11-15' },
        petProfile: { species: 'DOG', name: 'Luna', breed: 'Labrador Retriever' },
        stats: { overallStatus: 'ACTION_REQUIRED', earliestFlightDate: 'November 10, 2026' },
        timelineMilestones: [{ title: 'Tapeworm Treatment', date: '2026-11-12', status: 'PENDING' }],
        complianceChecklist: { all: [{ name: 'Tapeworm Praziquantel', status: 'ACTION_REQUIRED' }] },
        readinessReport: { nextSteps: ['Tapeworm vet visit'] },
      },
      tier: 'FREE',
    };

    const req = new NextRequest('http://localhost:3000/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await createTrip(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.trip.id).toBeDefined();
    tripId = data.trip.id;
  });

  it('should reject concierge intake with invalid or missing inputs', async () => {
    // Missing tripId
    const req1 = new NextRequest('http://localhost:3000/api/concierge/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whatsappNumber: '+447123456789' }),
    });
    const res1 = await conciergeIntake(req1);
    expect(res1.status).toBe(400);

    // Missing whatsappNumber
    const req2 = new NextRequest('http://localhost:3000/api/concierge/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId }),
    });
    const res2 = await conciergeIntake(req2);
    expect(res2.status).toBe(400);
  });

  it('should process £59 concierge intake, updating tier and dispatching specialist alert', async () => {
    const req = new NextRequest('http://localhost:3000/api/concierge/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tripId,
        whatsappNumber: '+44 7987 112233',
        notes: 'Owner requests confirmation on UK tapeworm 24h rule timing.',
        urgency: 'HIGH',
      }),
    });

    const res = await conciergeIntake(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.trip.tier).toBe('CONCIERGE');
    expect(data.trip.conciergeStatus).toBe('IN_REVIEW');
    expect(data.trip.whatsappNumber).toBe('+44 7987 112233');
    expect(data.notification.success).toBe(true);
  });

  it('should retrieve reminder status for a trip via GET', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${tripId}/reminders`);
    const res = await getReminders(req, { params: Promise.resolve({ id: tripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.reminders.enabled).toBe(true);
    expect(data.reminders.userEmail).toBe(testEmail);
  });

  it('should toggle reminder subscription via POST', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${tripId}/reminders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remindersEnabled: false }),
    });

    const res = await triggerReminders(req, { params: Promise.resolve({ id: tripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.remindersEnabled).toBe(false);
  });

  it('should dispatch an on-demand pre-flight reminder email (Day -5)', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${tripId}/reminders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'DAY_5' }),
    });

    const res = await triggerReminders(req, { params: Promise.resolve({ id: tripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.result.success).toBe(true);
  });
});
