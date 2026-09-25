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

    // ─── 1. POLAR.SH GATEWAY (Primary) ──────────────────────────────────────────
    if (isPolarConfigured()) {
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
        // If Polar fails but Razorpay is configured, it falls through or errors
        if (!process.env.RAZORPAY_KEY_ID?.trim()) {
          return NextResponse.json(
            { success: false, error: polarError.message || 'Failed to initialize Polar checkout session' },
            { status: 500 }
          );
        }
      }
    }

    // ─── 2. RAZORPAY GATEWAY (Secondary) ────────────────────────────────────────
    const hasRazorpayKeys = Boolean(
      process.env.RAZORPAY_KEY_ID?.trim() &&
      process.env.RAZORPAY_KEY_SECRET?.trim()
    );

    if (hasRazorpayKeys) {
      const Razorpay = (await import('razorpay')).default;
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const order = await razorpay.orders.create({
        amount,
        currency: targetCurrency,
        receipt: `pawvalid_${trip.id.slice(-8)}_${Date.now().toString().slice(-4)}`,
        notes: {
          tripId: trip.id,
          tier: targetTier,
          email: customerEmail,
          whatsappNumber: customerPhone,
          urgency,
          notes: notes || '',
        },
      });

      return NextResponse.json({
        success: true,
        provider: 'razorpay',
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
        isMock: false,
        tier: targetTier,
      });
    }

    // ─── 3. SANDBOX / DEMO MODE (Development Only) ────────────────────────────
    if (process.env.NODE_ENV === 'production') {
      console.error('[Checkout] No payment provider configured. POLAR_ACCESS_TOKEN is missing or invalid.');
      return NextResponse.json(
        {
          success: false,
          error: 'Payment gateway configuration error. POLAR_ACCESS_TOKEN is not loaded on the server.',
        },
        { status: 500 }
      );
    }

    // Sandbox / Demo mode for automated testing and local development
    const mockOrderId = `order_demo_${trip.id.slice(-6)}_${Date.now()}`;
    const mockPaymentId = `pay_demo_${Date.now()}`;

    if (customerEmail) {
      try {
        await db.user.upsert({
          where: { email: customerEmail.toLowerCase().trim() },
          update: {},
          create: { email: customerEmail.toLowerCase().trim() },
        });
      } catch (uErr) {
        console.warn('[Checkout] User auto-creation notice:', uErr);
      }
    }

    const updatedTrip = await db.savedTrip.update({
      where: { id },
      data: {
        tier: targetTier,
        userEmail: customerEmail,
        ...(targetTier === 'CONCIERGE'
          ? {
              whatsappNumber: customerPhone,
              conciergeStatus: 'IN_REVIEW',
              conciergeNotes: notes?.trim() || trip.conciergeNotes,
            }
          : {}),
      },
    });

    // If Concierge tier purchased, notify the specialist team
    if (targetTier === 'CONCIERGE' && customerPhone) {
      await sendSpecialistIntakeNotification({
        trip: updatedTrip,
        customerWhatsApp: customerPhone,
        notes: notes?.trim() || trip.conciergeNotes || undefined,
        urgency: urgency as any,
      });
    }

    return NextResponse.json({
      success: true,
      provider: 'mock',
      orderId: mockOrderId,
      paymentId: mockPaymentId,
      amount,
      currency: targetCurrency,
      keyId: 'test_demo',
      isMock: true,
      tier: targetTier,
      trip: updatedTrip,
      message: `Trip upgraded to ${targetTier} (Demo Mode).`,
    });
  } catch (error: any) {
    console.error('[POST /api/trips/[id]/checkout] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to initialize checkout session' },
      { status: 500 }
    );
  }
}
