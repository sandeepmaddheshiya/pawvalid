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

    // ─── POLAR GATEWAY (Exclusive) ──────────────────────────────────────────
    if (!isPolarConfigured()) {
      console.error('[Reports Checkout] Missing POLAR_ACCESS_TOKEN on server');
      return NextResponse.json(
        { error: 'Payment gateway configuration error: POLAR_ACCESS_TOKEN is missing or not loaded.' },
        { status: 500 }
      );
    }

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
      return NextResponse.json(
        { error: polarErr.message || 'Failed to initialize Polar checkout' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[POST /api/reports/checkout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
