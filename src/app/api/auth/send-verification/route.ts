import { NextRequest, NextResponse } from 'next/server';
import { createMagicToken } from '@/lib/auth/magicToken';
import { sendTripVerificationEmail } from '@/lib/email/templates';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, tripId, petName, origin, destination } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const token = createMagicToken(cleanEmail);
    const tripParam = tripId ? `&tripId=${encodeURIComponent(tripId)}` : '';
    const magicUrl = `${APP_URL}/login?token=${encodeURIComponent(token)}&email=${encodeURIComponent(cleanEmail)}${tripParam}`;

    // Dispatch email ownership verification link via Brevo
    const emailResult = await sendTripVerificationEmail({
      userEmail: cleanEmail,
      magicUrl,
      petName: petName || 'your pet',
      origin,
      destination,
    });

    if (!emailResult.success) {
      console.warn('[Trip Verification] Email delivery warning:', emailResult.error);
      // In development or if Brevo key is unconfigured, return success with devMagicUrl for seamless testing
      return NextResponse.json({
        success: true,
        message: `Verification link created for ${cleanEmail}.`,
        devMagicUrl: process.env.NODE_ENV !== 'production' ? magicUrl : undefined,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Verification link sent to ${cleanEmail}. Please check your inbox.`,
      devMagicUrl: process.env.NODE_ENV !== 'production' ? magicUrl : undefined,
    });
  } catch (error: any) {
    console.error('[API /api/auth/send-verification] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
