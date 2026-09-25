import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as createTripRoute } from '@/app/api/trips/route';
import { POST as checkoutRoute } from '@/app/api/trips/[id]/checkout/route';
import { POST as polarWebhookRoute } from '@/app/api/webhooks/polar/route';
import { POST as reportCheckoutRoute } from '@/app/api/reports/checkout/route';
import { db } from '@/lib/db';
import * as polarLib from '@/lib/polar';

describe('Polar.sh Checkout & Webhook Integration', () => {
  const testEmail = `polar_tester_${Date.now()}@pawvalid.online`;
  let testTripId = '';
  let testAssessmentId = '';

  beforeEach(async () => {
    await db.user.deleteMany({ where: { email: testEmail } });
  });

  it('should seed a trip for testing Polar checkout flow', async () => {
    const payload = {
      userEmail: testEmail,
      petName: 'Milo',
      scanResult: {
        route: { origin: 'United Kingdom', destination: 'France', departureDate: '2026-11-15' },
        petProfile: { species: 'DOG', name: 'Milo', breed: 'Golden Retriever' },
        stats: { overallStatus: 'APPEARS_READY', earliestFlightDate: 'November 10, 2026' },
        timelineMilestones: [],
        complianceChecklist: { all: [] },
        readinessReport: { nextSteps: [] },
      },
      tier: 'FREE',
    };

    const req = new NextRequest('http://localhost:3000/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await createTripRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.trip.id).toBeDefined();
    testTripId = data.trip.id;
  });

  it('should reject Concierge checkout without a WhatsApp phone number', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${testTripId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: 'CONCIERGE',
        currency: 'GBP',
        email: testEmail,
      }),
    });

    const res = await checkoutRoute(req, { params: Promise.resolve({ id: testTripId }) });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('WhatsApp phone number is required');
  });

  it('should create Polar checkout session when Polar is configured', async () => {
    // Mock Polar client checkout creation
    const isPolarConfiguredSpy = vi.spyOn(polarLib, 'isPolarConfigured').mockReturnValue(true);
    const createPolarTripCheckoutSpy = vi.spyOn(polarLib, 'createPolarTripCheckout').mockResolvedValue({
      id: 'polar_chk_test_123',
      url: 'https://sandbox.polar.sh/checkout/polar_chk_test_123',
      clientSecret: 'sec_test_123',
    } as any);

    const req = new NextRequest(`http://localhost:3000/api/trips/${testTripId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: 'CERTIFIED_PASS',
        currency: 'GBP',
        email: testEmail,
      }),
    });

    const res = await checkoutRoute(req, { params: Promise.resolve({ id: testTripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.provider).toBe('polar');
    expect(data.url).toBe('https://sandbox.polar.sh/checkout/polar_chk_test_123');
    expect(data.checkoutId).toBe('polar_chk_test_123');
    expect(data.tier).toBe('CERTIFIED_PASS');

    isPolarConfiguredSpy.mockRestore();
    createPolarTripCheckoutSpy.mockRestore();
  });

  it('should process Polar "order.created" webhook event and upgrade trip to CONCIERGE', async () => {
    const webhookEmail = `polar_concierge_${Date.now()}@pawvalid.online`;

    // Create a new trip for this test
    const trip = await db.savedTrip.create({
      data: {
        userEmail: webhookEmail,
        petName: 'Bella',
        origin: 'United Kingdom',
        destination: 'Canada',
        petProfile: { name: 'Bella', species: 'DOG' },
        route: { origin: 'United Kingdom', destination: 'Canada' },
        stats: {},
        timelineMilestones: [],
        complianceChecklist: {},
        readinessReport: {},
      },
    });

    const webhookPayload = {
      type: 'order.created',
      timestamp: new Date().toISOString(),
      data: {
        id: `polar_ord_${Date.now()}`,
        status: 'paid',
        paid: true,
        total_amount: 5900,
        currency: 'GBP',
        customer: {
          email: webhookEmail,
          name: 'Bella Owner',
        },
        metadata: {
          tripId: trip.id,
          tier: 'CONCIERGE',
          email: webhookEmail,
          whatsappNumber: '+44 7700 987654',
          urgency: 'HIGH',
          notes: 'Requires fast-track titer certification check.',
        },
      },
    };

    const req = new NextRequest('http://localhost:3000/api/webhooks/polar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    const res = await polarWebhookRoute(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(data.provider).toBe('polar');
    expect(data.upgradedTier).toBe('CONCIERGE');
    expect(data.accountCreated).toBe(true);

    // Verify database record was updated
    const updatedTrip = await db.savedTrip.findUnique({ where: { id: trip.id } });
    expect(updatedTrip?.tier).toBe('CONCIERGE');
    expect(updatedTrip?.conciergeStatus).toBe('IN_REVIEW');
    expect(updatedTrip?.whatsappNumber).toBe('+44 7700 987654');

    // Verify user account auto-created
    const userInDb = await db.user.findUnique({ where: { email: webhookEmail } });
    expect(userInDb).not.toBeNull();
    expect(userInDb?.email).toBe(webhookEmail);

    // Cleanup
    await db.user.deleteMany({ where: { email: webhookEmail } });
    await db.savedTrip.deleteMany({ where: { id: trip.id } });
  });

  it('should process Polar "checkout.updated" (succeeded) webhook event and upgrade trip to CERTIFIED_PASS', async () => {
    const webhookEmail = `polar_pass_${Date.now()}@pawvalid.online`;

    const trip = await db.savedTrip.create({
      data: {
        userEmail: webhookEmail,
        petName: 'Oliver',
        origin: 'United Kingdom',
        destination: 'Spain',
        petProfile: { name: 'Oliver', species: 'CAT' },
        route: { origin: 'United Kingdom', destination: 'Spain' },
        stats: {},
        timelineMilestones: [],
        complianceChecklist: {},
        readinessReport: {},
      },
    });

    const webhookPayload = {
      type: 'checkout.updated',
      timestamp: new Date().toISOString(),
      data: {
        id: `polar_chk_${Date.now()}`,
        status: 'succeeded',
        total_amount: 1900,
        currency: 'GBP',
        customer_email: webhookEmail,
        metadata: {
          tripId: trip.id,
          tier: 'CERTIFIED_PASS',
          email: webhookEmail,
        },
      },
    };

    const req = new NextRequest('http://localhost:3000/api/webhooks/polar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    const res = await polarWebhookRoute(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(data.upgradedTier).toBe('CERTIFIED_PASS');

    const updatedTrip = await db.savedTrip.findUnique({ where: { id: trip.id } });
    expect(updatedTrip?.tier).toBe('CERTIFIED_PASS');

    // Cleanup
    await db.user.deleteMany({ where: { email: webhookEmail } });
    await db.savedTrip.deleteMany({ where: { id: trip.id } });
  });

  it('should reject webhooks with invalid signature when secret is configured', async () => {
    const originalSecret = process.env.POLAR_WEBHOOK_SECRET;
    process.env.POLAR_WEBHOOK_SECRET = 'whsec_test_secret_12345';

    const req = new NextRequest('http://localhost:3000/api/webhooks/polar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'webhook-id': 'msg_123',
        'webhook-timestamp': '1234567890',
        'webhook-signature': 'v1,invalid_signature_here',
      },
      body: JSON.stringify({ type: 'order.created', data: {} }),
    });

    const res = await polarWebhookRoute(req);
    expect(res.status).toBe(403);
    const data = await res.json();
    expect(data.error).toBe('Invalid webhook signature');

    process.env.POLAR_WEBHOOK_SECRET = originalSecret;
  });
});
