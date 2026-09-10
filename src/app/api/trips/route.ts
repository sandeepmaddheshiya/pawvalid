import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendTripSummaryEmail } from '@/lib/email/templates';

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
        : `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}@guest.pawvalid.online`;
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

    const isInvalidVal = (val?: string | null) =>
      !val ||
      val.trim() === '' ||
      val === 'Not Specified' ||
      val === 'Origin' ||
      val === 'Destination' ||
      val.toLowerCase() === 'unknown';

    const cleanOrigin = !isInvalidVal(scanResult.route?.origin)
      ? scanResult.route!.origin
      : (!isInvalidVal(body.origin) ? body.origin : 'United Kingdom');

    const cleanDestination = !isInvalidVal(scanResult.route?.destination)
      ? scanResult.route!.destination
      : (!isInvalidVal(body.destination) ? body.destination : 'Germany');

    const cleanTransits =
      Array.isArray(scanResult.route?.transitCountries) && scanResult.route!.transitCountries.length > 0
        ? scanResult.route!.transitCountries
        : Array.isArray(body.transitCountries) && body.transitCountries.length > 0
        ? body.transitCountries
        : [];

    const departureDate = scanResult.route?.departureDate || body.departureDate || null;

    const savedTrip = await db.savedTrip.create({
      data: {
        userEmail: cleanEmail,
        petName: cleanPetName,
        species,
        breed,
        origin: cleanOrigin,
        destination: cleanDestination,
        transitCountries: cleanTransits,
        departureDate,
        earliestFlightDate: scanResult.stats?.earliestFlightDate || null,
        overallStatus: scanResult.stats?.overallStatus || 'NOT_READY',
        statusHeadline: scanResult.stats?.statusHeadline || null,
        needsHumanReview: Boolean(scanResult.stats?.needsHumanReview),
        tier: tier || 'FREE',
        petProfile: scanResult.petProfile || {},
        route: {
          ...(scanResult.route || {}),
          origin: cleanOrigin,
          destination: cleanDestination,
          transitCountries: cleanTransits,
          departureDate,
        },
        stats: scanResult.stats || {},
        timelineMilestones: scanResult.timelineMilestones || [],
        complianceChecklist: scanResult.complianceChecklist || {},
        readinessReport: scanResult.readinessReport || {},
        uploadedDocuments: scanResult.readinessReport?.documentAudit || [],
      },
    });

    // Dispatch trip summary email via Brevo for registered users
    if (!cleanEmail.includes('@guest.pawvalid.online')) {
      sendTripSummaryEmail({
        id: savedTrip.id,
        userEmail: cleanEmail,
        petName: cleanPetName,
        species,
        breed,
        origin: cleanOrigin,
        destination: cleanDestination,
        departureDate,
        overallStatus: savedTrip.overallStatus,
        earliestFlightDate: savedTrip.earliestFlightDate,
        actionItemCount: Array.isArray(savedTrip.timelineMilestones)
          ? savedTrip.timelineMilestones.length
          : undefined,
      })
        .then((res) => {
          if (!res.success) {
            console.warn('[Trip Summary Email] Non-fatal delivery failure:', res.error);
          }
        })
        .catch((err) => console.error('[Trip Summary Email] Async error:', err));
    }

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
