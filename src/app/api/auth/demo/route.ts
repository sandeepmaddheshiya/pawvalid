import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateDemoTrip } from '@/lib/trips/mockTrips';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      email = 'traveler@example.com',
      tier = 'CERTIFIED_PASS',
    } = body;

    const trip = await getOrCreateDemoTrip(email, tier);

    return NextResponse.json({
      success: true,
      trip,
      message: `Signed in as ${email}`,
    });
  } catch (error: any) {
    console.error('[API /api/auth/demo] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to initialize session' },
      { status: 500 }
    );
  }
}
