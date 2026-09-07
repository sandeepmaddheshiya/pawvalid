import { describe, it, expect } from 'vitest';
import { POST as createTrip } from '@/app/api/trips/route';
import { POST as checkoutRoute } from '@/app/api/trips/[id]/checkout/route';
import { POST as razorpayWebhook } from '@/app/api/webhooks/razorpay/route';
import { NextRequest } from 'next/server';

describe('Trip Checkout & Payment Webhook Endpoints', () => {
  const testEmail = `checkout_test_${Date.now()}@petvia.com`;
  let tripId = '';

  it('should seed a trip for testing checkout flow', async () => {
    const payload = {
      userEmail: testEmail,
      petName: 'Rusty',
      scanResult: {
        route: { origin: 'Australia', destination: 'France', departureDate: '2026-12-20' },
        petProfile: { species: 'DOG', name: 'Rusty', breed: 'Corgi' },
        stats: { overallStatus: 'ACTION_REQUIRED', earliestFlightDate: 'December 15, 2026' },
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

    const res = await createTrip(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.trip.id).toBeDefined();
    tripId = data.trip.id;
  });

  it('should reject Concierge checkout without a WhatsApp phone number', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${tripId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: 'CONCIERGE',
        currency: 'GBP',
        email: testEmail,
      }),
    });

    const res = await checkoutRoute(req, { params: Promise.resolve({ id: tripId }) });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('WhatsApp phone number is required');
  });

  it('should successfully initiate checkout for Certified Trip Pass (£19)', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${tripId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: 'CERTIFIED_PASS',
        currency: 'GBP',
        email: testEmail,
      }),
    });

    const res = await checkoutRoute(req, { params: Promise.resolve({ id: tripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.amount).toBe(1900); // £19.00
    expect(data.currency).toBe('GBP');
    expect(data.tier).toBe('CERTIFIED_PASS');
  });

  it('should successfully initiate checkout for Priority Concierge (£59)', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${tripId}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: 'CONCIERGE',
        currency: 'GBP',
        email: testEmail,
        whatsappNumber: '+44 7123 998877',
        urgency: 'HIGH',
        notes: 'Owner requests confirmation on tapeworm window.',
      }),
    });

    const res = await checkoutRoute(req, { params: Promise.resolve({ id: tripId }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.amount).toBe(5900); // £59.00
    expect(data.currency).toBe('GBP');
    expect(data.tier).toBe('CONCIERGE');
    expect(data.trip.conciergeStatus).toBe('IN_REVIEW');
    expect(data.trip.whatsappNumber).toBe('+44 7123 998877');
  });

  it('should process payment webhook and upgrade SavedTrip tier to CONCIERGE', async () => {
    const webhookPayload = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: `pay_test_${Date.now()}`,
            order_id: `order_test_${Date.now()}`,
            amount: 5900,
            currency: 'GBP',
            email: testEmail,
            notes: {
              tripId,
              tier: 'CONCIERGE',
              whatsappNumber: '+44 7700 123456',
              urgency: 'HIGH',
              notes: 'Checked in via automated webhook test.',
            },
          },
        },
      },
    };

    const req = new NextRequest('http://localhost:3000/api/webhooks/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': 'test_mock_sig',
      },
      body: JSON.stringify(webhookPayload),
    });

    const res = await razorpayWebhook(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(data.upgradedTier).toBe('CONCIERGE');
  });
});
