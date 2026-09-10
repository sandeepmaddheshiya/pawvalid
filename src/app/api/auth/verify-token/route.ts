import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicToken } from '@/lib/auth/magicToken';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { token, email } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Authentication token is required.' },
        { status: 400 }
      );
    }

    const verification = verifyMagicToken(token, email);
    if (!verification.valid || !verification.email) {
      return NextResponse.json(
        { success: false, error: verification.error || 'Magic link is invalid or expired.' },
        { status: 400 }
      );
    }

    const cleanEmail = verification.email;

    // Fetch user's saved trips
    const userTrips = await db.savedTrip.findMany({
      where: { userEmail: cleanEmail },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      userEmail: cleanEmail,
      hasTrips: userTrips.length > 0,
      trips: userTrips,
      activeTrip: userTrips.length > 0 ? userTrips[0] : null,
      message: `Successfully authenticated as ${cleanEmail}`,
    });
  } catch (error: any) {
    console.error('[API /api/auth/verify-token] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Token verification error' },
      { status: 500 }
    );
  }
}
