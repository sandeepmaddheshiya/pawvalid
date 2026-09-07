import { describe, it, expect } from 'vitest';
import { POST, GET } from '@/app/api/trips/route';
import { GET as getSingleTrip, PATCH } from '@/app/api/trips/[id]/route';
import { NextRequest } from 'next/server';

describe('Trips API Endpoints', () => {
  const testEmail = `test_${Date.now()}@petvia.com`;
  let createdTripId = '';

  it('should create a saved trip record with full compliance snapshots', async () => {
    const payload = {
      userEmail: testEmail,
      petName: 'Milo',
      scanResult: {
        route: { origin: 'Australia', destination: 'Austria', transitCountries: ['Singapore'], departureDate: '2026-11-20' },
        petProfile: { species: 'DOG', name: 'Milo', breed: 'Golden Retriever', microchipNumber: '985141000999999' },
        stats: { overallStatus: 'ACTION_REQUIRED', earliestFlightDate: 'November 18, 2026', statusHeadline: 'Action Required' },
        timelineMilestones: [{ title: 'Microchip', date: '2025-01-10', status: 'COMPLETED' }],
        complianceChecklist: { all: [{ name: 'Rabies', authority: 'EU', status: 'SATISFIED' }] },
        readinessReport: { nextSteps: ['Tapeworm pill'], documentAudit: [{ filename: 'cert.pdf', summary: 'Verified' }] },
      },
      tier: 'CERTIFIED_PASS',
    };

    const req = new NextRequest('http://localhost:3000/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.trip).toBeDefined();
    expect(data.trip.petName).toBe('Milo');
    expect(data.trip.userEmail).toBe(testEmail);
    expect(data.trip.origin).toBe('Australia');
    expect(data.trip.destination).toBe('Austria');
    expect(data.trip.tier).toBe('CERTIFIED_PASS');

    createdTripId = data.trip.id;
  });

  it('should retrieve trips associated with user email', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips?email=${encodeURIComponent(testEmail)}`);
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.trips)).toBe(true);
    expect(data.trips.length).toBeGreaterThanOrEqual(1);
    expect(data.trips[0].userEmail).toBe(testEmail);
  });

  it('should retrieve single trip by id', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${createdTripId}`);
    const res = await getSingleTrip(req, { params: Promise.resolve({ id: createdTripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.trip.id).toBe(createdTripId);
    expect(data.trip.petName).toBe('Milo');
  });

  it('should update trip fields via PATCH', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${createdTripId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        departureDate: '2026-12-01',
        tier: 'CONCIERGE',
      }),
    });

    const res = await PATCH(req, { params: Promise.resolve({ id: createdTripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.trip.departureDate).toBe('2026-12-01');
    expect(data.trip.tier).toBe('CONCIERGE');
  });
});
