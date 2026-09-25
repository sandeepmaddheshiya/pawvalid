import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendSpecialistIntakeNotification } from '@/lib/email/reminders';
import { isPolarConfigured, createPolarTripCheckout, POLAR_TIER_PRICES } from '@/lib/polar';

interface Params {
  params: Promise<{ id: string }>;
}

const TIER_PRICES: Record<string, Record<string, number>> = {
  CERTIFIED_PASS: {
    GBP: 1900, // £19.00
    USD: 2400, // $24.00
    EUR: 2200, // €22.00
    INR: 149900, // ₹1,499.00
  },
  CONCIERGE: {
    GBP: 5900, // £59.00
    USD: 7900, // $79.00
    EUR: 6900, // €69.00
    INR: 499900, // ₹4,999.00
  },
};

/**
 * POST /api/trips/[id]/checkout
 * 
 * Initiates checkout for a saved pet travel trip.
 * Supports £19 Certified Trip Pass and £59 Priority Concierge Review.
 * 
 * Flow:
 * 1. If Polar (POLAR_ACCESS_TOKEN) is configured -> Creates Polar checkout session & returns redirect URL.
 * 2. If Razorpay (RAZORPAY_KEY_ID) is configured -> Creates Razorpay order & returns order credentials.
 * 3. In sandbox/demo mode -> Safely simulates checkout and immediately activates the plan.
 */
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      tier = 'CERTIFIED_PASS',
      currency = 'GBP',
      email,
      whatsappNumber,
      urgency = 'HIGH',
      notes,
    } = body;

    const targetTier = tier === 'CONCIERGE' ? 'CONCIERGE' : 'CERTIFIED_PASS';
    const targetCurrency = ['GBP', 'USD', 'EUR', 'INR'].includes(currency) ? currency : 'GBP';
    const amount = TIER_PRICES[targetTier][targetCurrency] || TIER_PRICES[targetTier]['GBP'];

    const trip = await db.savedTrip.findUnique({
      where: { id },
    });

    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      );
    }

    if (targetTier === 'CONCIERGE' && !whatsappNumber && !trip.whatsappNumber) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp phone number is required for Priority Concierge tier.' },
        { status: 400 }
      );
    }

    const customerEmail = email?.trim() || trip.userEmail;
    const customerPhone = (whatsappNumber || trip.whatsappNumber || '').trim();

    // ─── POLAR.SH GATEWAY (Exclusive) ──────────────────────────────────────────
    if (!isPolarConfigured()) {
      console.error('[Polar Checkout] Missing POLAR_ACCESS_TOKEN on server');
      return NextResponse.json(
        {
          success: false,
          error: 'Payment gateway configuration error: POLAR_ACCESS_TOKEN is missing or not loaded.',
        },
        { status: 500 }
      );
    }

    try {
      const checkout = await createPolarTripCheckout({
        tripId: trip.id,
        tier: targetTier,
        email: customerEmail,
        whatsappNumber: customerPhone,
        urgency,
        notes,
        currency: targetCurrency,
      });

      return NextResponse.json({
        success: true,
        provider: 'polar',
        url: checkout.url,
        checkoutId: checkout.id,
        clientSecret: checkout.clientSecret,
        amount,
        currency: targetCurrency,
        isMock: false,
        tier: targetTier,
      });
    } catch (polarError: any) {
      console.error('[Polar Checkout] Error creating session:', polarError);
      return NextResponse.json(
        {
          success: false,
          error: polarError.message || 'Failed to initialize Polar checkout session',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[POST /api/trips/[id]/checkout] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to initialize checkout session' },
      { status: 500 }
    );
  }
}
