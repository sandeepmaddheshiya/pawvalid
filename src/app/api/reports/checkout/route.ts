/**
 * POST /api/reports/checkout
 *
 * Creates a checkout session (Polar or Razorpay) for a saved assessment report.
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkoutRequestSchema } from '@/lib/validations';
import { db } from '@/lib/db';
import { isPolarConfigured, createPolarReportCheckout } from '@/lib/polar';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { assessmentId, email, amount, currency } = parsed.data;

    // Verify assessment exists
    const assessment = await db.assessment.findUnique({
      where: { id: assessmentId },
    });

    if (!assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    if (assessment.paidReportId) {
      return NextResponse.json(
        { error: 'Report already purchased' },
        { status: 409 }
      );
    }

    // ─── 1. POLAR GATEWAY ──────────────────────────────────────────────────
    if (isPolarConfigured()) {
      try {
        const checkout = await createPolarReportCheckout({
          assessmentId,
          email,
        });

        return NextResponse.json({
          provider: 'polar',
          url: checkout.url,
          checkoutId: checkout.id,
          amount,
          currency,
          isMock: false,
          reportUrl: `/en/checker/${assessmentId}`,
        });
      } catch (polarErr: any) {
        console.error('[Polar Report Checkout] Error:', polarErr);
        if (!process.env.RAZORPAY_KEY_ID?.trim()) {
          return NextResponse.json(
            { error: polarErr.message || 'Failed to initialize Polar checkout' },
            { status: 500 }
          );
        }
      }
    }

    // ─── 2. RAZORPAY GATEWAY ───────────────────────────────────────────────
    const hasRazorpayKeys = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

    if (hasRazorpayKeys) {
      const Razorpay = (await import('razorpay')).default;
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const order = await razorpay.orders.create({
        amount,
        currency,
        receipt: `pawvalid_${assessmentId}`,
        notes: {
          assessmentId,
          email,
        },
      });

      await db.assessment.update({
        where: { id: assessmentId },
        data: { razorpayOrderId: order.id },
      });

      return NextResponse.json({
        provider: 'razorpay',
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        isMock: false,
        reportUrl: `/en/checker/${assessmentId}`,
      });
    }

    // ─── 3. SANDBOX / DEMO MODE (Development Only) ────────────────────────────
    if (process.env.NODE_ENV === 'production') {
      console.error('[Reports Checkout] No payment provider configured. POLAR_ACCESS_TOKEN is missing or invalid.');
      return NextResponse.json(
        { error: 'Payment gateway configuration error. POLAR_ACCESS_TOKEN is not loaded on the server.' },
        { status: 500 }
      );
    }

    const mockOrderId = `order_demo_${assessmentId.slice(0, 8)}_${Date.now()}`;
    const mockPaymentId = `pay_demo_${Date.now()}`;

    await db.assessment.update({
      where: { id: assessmentId },
      data: {
        razorpayOrderId: mockOrderId,
        paidReportId: mockPaymentId,
        razorpayPaymentId: mockPaymentId,
      },
    });

    return NextResponse.json({
      provider: 'mock',
      orderId: mockOrderId,
      amount,
      currency,
      keyId: 'test_demo',
      isMock: true,
      reportUrl: `/en/checker/${assessmentId}`,
    });
  } catch (error) {
    console.error('[POST /api/reports/checkout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
