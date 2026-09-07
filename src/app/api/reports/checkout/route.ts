/**
 * POST /api/reports/checkout
 *
 * Creates a Razorpay order for a saved assessment.
 * Returns orderId + key for the Razorpay checkout widget.
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkoutRequestSchema } from '@/lib/validations';
import { db } from '@/lib/db';

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

    // Check if Razorpay keys are configured
    const hasRazorpayKeys = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

    if (!hasRazorpayKeys) {
      // Sandbox / Demo mode for local testing without active gateway credentials
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
        orderId: mockOrderId,
        amount,
        currency,
        keyId: 'rzp_test_demo',
        isMock: true,
        reportUrl: `/en/checker/${assessmentId}`,
      });
    }

    // Create Razorpay order with live credentials
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `petvia_${assessmentId}`,
      notes: {
        assessmentId,
        email,
      },
    });

    // Store the order ID on the assessment
    await db.assessment.update({
      where: { id: assessmentId },
      data: { razorpayOrderId: order.id },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      isMock: false,
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
