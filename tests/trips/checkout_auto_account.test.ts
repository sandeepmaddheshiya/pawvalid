import { describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as createTripRoute } from '@/app/api/trips/route';
import { POST as verifyPaymentRoute } from '@/app/api/trips/[id]/verify-payment/route';
import { POST as razorpayWebhook } from '@/app/api/webhooks/razorpay/route';
import { db } from '@/lib/db';

describe('Auto-Account Creation on Razorpay Payment & Webhook', () => {
  const payerEmail = `payer_${Date.now()}@example.co.uk`;
  let testTripId = '';

  beforeEach(async () => {
    await db.user.deleteMany({ where: { email: payerEmail } });
  });

  it('should seed a trip without user account', async () => {
    const payload = {
      userEmail: payerEmail,
      petName: 'Barnaby',
      scanResult: {
        route: { origin: 'United Kingdom', destination: 'Germany' },
        petProfile: { species: 'DOG', name: 'Barnaby' },
        stats: { overallStatus: 'APPEARS_READY' },
      },
      tier: 'FREE',
    };

    const req = new NextRequest('http://localhost:3000/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await createTripRoute(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.trip.id).toBeDefined();
    testTripId = data.trip.id;

    // Confirm user does not exist yet
    const userPre = await db.user.findUnique({ where: { email: payerEmail } });
    expect(userPre).toBeNull();
  });

  it('should auto-create User account and upgrade trip via /api/trips/[id]/verify-payment', async () => {
    const req = new NextRequest(`http://localhost:3000/api/trips/${testTripId}/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: payerEmail,
        tier: 'CERTIFIED_PASS',
        razorpay_payment_id: 'pay_demo_test_123',
        razorpay_order_id: 'order_demo_test_123',
      }),
    });

    const res = await verifyPaymentRoute(req, { params: Promise.resolve({ id: testTripId }) });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.accountCreated).toBe(true);
    expect(data.trip.tier).toBe('CERTIFIED_PASS');

    // Confirm User record was auto-created in database
    const userInDb = await db.user.findUnique({ where: { email: payerEmail } });
    expect(userInDb).not.toBeNull();
    expect(userInDb?.email).toBe(payerEmail);
  });

  it('should auto-create User account when receiving Razorpay payment.captured webhook', async () => {
    const webhookEmail = `webhook_payer_${Date.now()}@example.co.uk`;

    // Create a trip for this webhook test
    const trip = await db.savedTrip.create({
      data: {
        userEmail: webhookEmail,
        petName: 'Luna',
        origin: 'United Kingdom',
        destination: 'Spain',
        petProfile: { name: 'Luna', species: 'CAT' },
        route: { origin: 'United Kingdom', destination: 'Spain' },
        stats: {},
        timelineMilestones: [],
        complianceChecklist: {},
        readinessReport: {},
      },
    });

    // Verify user doesn't exist yet
    const preUser = await db.user.findUnique({ where: { email: webhookEmail } });
    expect(preUser).toBeNull();

    const webhookPayload = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: `pay_webhook_${Date.now()}`,
            order_id: `order_webhook_${Date.now()}`,
            amount: 1900,
            currency: 'GBP',
            email: webhookEmail,
            notes: {
              tripId: trip.id,
              tier: 'CERTIFIED_PASS',
              email: webhookEmail,
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
    expect(data.accountCreated).toBe(true);
    expect(data.upgradedTier).toBe('CERTIFIED_PASS');

    // Confirm User account was auto-created in DB
    const postUser = await db.user.findUnique({ where: { email: webhookEmail } });
    expect(postUser).not.toBeNull();
    expect(postUser?.email).toBe(webhookEmail);

    // Clean up
    await db.user.deleteMany({ where: { email: webhookEmail } });
    await db.savedTrip.deleteMany({ where: { id: trip.id } });
  });
});
