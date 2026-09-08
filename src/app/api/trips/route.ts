import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, petName, scanResult, tier } = body;

    if (!scanResult) {
      return NextResponse.json(
        { error: 'Scan results payload is required' },
        { status: 400 }
      );
    }

    const cleanEmail =
      userEmail && typeof userEmail === 'string' && userEmail.trim()
        ? userEmail.toLowerCase().trim()
        : `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}@guest.petvia.com`;
    const cleanPetName =
      petName?.trim() ||
      scanResult.petProfile?.name?.trim() ||
      'My Pet';

    const species =
      (scanResult.petProfile?.species === 'CAT' || scanResult.petProfile?.species === 'DOG')
        ? scanResult.petProfile.species
        : (body.species === 'CAT' ? 'CAT' : 'DOG');

    const breed =
      scanResult.petProfile?.breed?.trim() ||
      body.breed?.trim() ||
      'Companion Animal';

    const savedTrip = await db.savedTrip.create({
      data: {
        userEmail: cleanEmail,
        petName: cleanPetName,
        species,
        breed,
        origin: scanResult.route?.origin || 'Not Specified',
        destination: scanResult.route?.destination || 'Not Specified',
        transitCountries: scanResult.route?.transitCountries || [],
        departureDate: scanResult.route?.departureDate || null,
        earliestFlightDate: scanResult.stats?.earliestFlightDate || null,
        overallStatus: scanResult.stats?.overallStatus || 'NOT_READY',
        statusHeadline: scanResult.stats?.statusHeadline || null,
        needsHumanReview: Boolean(scanResult.stats?.needsHumanReview),
        tier: tier || 'FREE',
        petProfile: scanResult.petProfile || {},
        route: scanResult.route || {},
        stats: scanResult.stats || {},
        timelineMilestones: scanResult.timelineMilestones || [],
        complianceChecklist: scanResult.complianceChecklist || {},
        readinessReport: scanResult.readinessReport || {},
        uploadedDocuments: scanResult.readinessReport?.documentAudit || [],
      },
    });

    return NextResponse.json({
      success: true,
      trip: savedTrip,
      message: `Trip for ${cleanPetName} successfully saved!`,
    });
  } catch (error) {
    console.error('[API /api/trips POST] Error creating saved trip:', error);
    return NextResponse.json(
      { error: 'Failed to save trip to database.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const whereClause = email
      ? { userEmail: email.toLowerCase().trim() }
      : {};

    const trips = await db.savedTrip.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error('[API /api/trips GET] Error fetching trips:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve saved trips.' },
      { status: 500 }
    );
  }
}
