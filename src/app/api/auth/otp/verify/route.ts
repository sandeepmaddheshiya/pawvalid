import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/auth/otp/verify
 * 
 * Verifies a 6-digit One-Time Password (OTP).
 * On success:
 * 1. Invalidates the used OTP.
 * 2. Auto-creates/upserts User in PostgreSQL.
 * 3. Returns user profile and associated pet trips for instant dashboard sign-in.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, code } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string' || code.trim().length !== 6) {
      return NextResponse.json(
        { success: false, error: 'Please enter the 6-digit verification code.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = code.trim();

    // Look for matching active OTP
    const otpRecord = await db.otpVerification.findFirst({
      where: {
        email: cleanEmail,
        code: cleanCode,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      // Check if code exists but expired
      const expiredRecord = await db.otpVerification.findFirst({
        where: {
          email: cleanEmail,
          code: cleanCode,
        },
      });

      if (expiredRecord) {
        return NextResponse.json(
          { success: false, error: 'This verification code has expired. Please request a new one.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Invalid verification code. Please check your email and try again.' },
        { status: 400 }
      );
    }

    // 1. Invalidate OTP (single-use)
    await db.otpVerification.deleteMany({
      where: { email: cleanEmail },
    });

    // 2. Ensure user record exists in database
    const user = await db.user.upsert({
      where: { email: cleanEmail },
      update: {},
      create: { email: cleanEmail },
    });

    // 3. Fetch all user's trips
    const userTrips = await db.savedTrip.findMany({
      where: { userEmail: cleanEmail },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      userEmail: cleanEmail,
      user,
      hasTrips: userTrips.length > 0,
      trips: userTrips,
      activeTrip: userTrips.length > 0 ? userTrips[0] : null,
      message: `Signed in successfully as ${cleanEmail}`,
    });
  } catch (error: any) {
    console.error('[POST /api/auth/otp/verify] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
