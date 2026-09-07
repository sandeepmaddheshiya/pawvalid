import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, name, isSignUp } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Fetch only REAL trips created by or saved for this user
    const userTrips = await db.savedTrip.findMany({
      where: { userEmail: cleanEmail },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      userEmail: cleanEmail,
      isSignUp: Boolean(isSignUp),
      hasTrips: userTrips.length > 0,
      trips: userTrips,
      activeTrip: userTrips.length > 0 ? userTrips[0] : null,
      message: isSignUp
        ? `Account created for ${cleanEmail}`
        : `Signed in as ${cleanEmail}`,
    });
  } catch (error: any) {
    console.error('[API /api/auth/session] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
