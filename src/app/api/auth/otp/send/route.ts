import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { sendOtpEmail } from '@/lib/email/templates';

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds

/**
 * POST /api/auth/otp/send
 * 
 * Generates and emails a secure 6-digit One-Time Password (OTP) for user sign-in.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, petName } = body;

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check rate limit: cooldown between requests for same email
    const recentOtp = await db.otpVerification.findFirst({
      where: {
        email: cleanEmail,
        createdAt: { gt: new Date(Date.now() - RESEND_COOLDOWN_MS) },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (recentOtp) {
      const remainingSeconds = Math.ceil(
        (recentOtp.createdAt.getTime() + RESEND_COOLDOWN_MS - Date.now()) / 1000
      );
      return NextResponse.json(
        {
          success: false,
          error: `Please wait ${remainingSeconds > 0 ? remainingSeconds : 1}s before requesting a new code.`,
        },
        { status: 429 }
      );
    }

    // Generate secure 6-digit numerical code
    const code = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    // Clean up previous tokens for this email and save the new one
    await db.otpVerification.deleteMany({
      where: { email: cleanEmail },
    });

    await db.otpVerification.create({
      data: {
        email: cleanEmail,
        code,
        expiresAt,
      },
    });

    // Check if user has a registered pet name in saved trips if not supplied
    let resolvedPetName = petName;
    if (!resolvedPetName) {
      const latestTrip = await db.savedTrip.findFirst({
        where: { userEmail: cleanEmail },
        orderBy: { createdAt: 'desc' },
        select: { petName: true },
      });
      resolvedPetName = latestTrip?.petName;
    }

    // Dispatch OTP email via Brevo
    const emailResult = await sendOtpEmail({
      email: cleanEmail,
      code,
      petName: resolvedPetName,
    });

    if (!emailResult.success) {
      console.warn('[OTP Auth] Brevo dispatch warning:', emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${cleanEmail}.`,
      expiresInMinutes: 10,
      devOtp: process.env.NODE_ENV !== 'production' ? code : undefined,
    });
  } catch (error: any) {
    console.error('[POST /api/auth/otp/send] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to dispatch verification code.' },
      { status: 500 }
    );
  }
}
