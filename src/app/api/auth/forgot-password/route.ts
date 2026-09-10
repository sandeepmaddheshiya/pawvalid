import { NextRequest, NextResponse } from 'next/server';
import { createMagicToken } from '@/lib/auth/magicToken';
import { sendMagicAuthLinkEmail } from '@/lib/email/templates';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const token = createMagicToken(cleanEmail);
    const magicUrl = `${APP_URL}/login?token=${encodeURIComponent(token)}&email=${encodeURIComponent(cleanEmail)}`;

    // Dispatch magic access link email via Brevo
    const emailResult = await sendMagicAuthLinkEmail(cleanEmail, magicUrl);

    if (!emailResult.success) {
      console.error('[Forgot Password] Email sending failed:', emailResult.error);
      return NextResponse.json(
        { success: false, error: 'Failed to send login email. Please try again in a few moments.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Magic access link sent! Please check your inbox to sign in instantly.',
    });
  } catch (error: any) {
    console.error('[API /api/auth/forgot-password] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
