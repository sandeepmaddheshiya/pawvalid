import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { destination, origin, departureDate, transitCountries } = body;

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination country is required for new trip plan' },
        { status: 400 }
      );
    }

    // Fetch existing pet passport from saved trips
    const sourceTrip = await db.savedTrip.findUnique({
      where: { id },
    });

    if (!sourceTrip) {
      return NextResponse.json(
        { error: 'Pet passport record not found' },
        { status: 404 }
      );
    }

    const newOrigin = origin || sourceTrip.origin;
    const petProfile: any = sourceTrip.petProfile || {};

    // Create new trip reusing all pet compliance facts
    const newTrip = await db.savedTrip.create({
      data: {
        userEmail: sourceTrip.userEmail,
        petName: sourceTrip.petName,
        species: sourceTrip.species,
        breed: sourceTrip.breed,
        origin: newOrigin,
        destination,
        transitCountries: transitCountries || [],
        departureDate: departureDate || null,
        overallStatus: 'READY',
        statusHeadline: `${sourceTrip.petName}'s profile applied to ${destination} journey`,
        tier: sourceTrip.tier,
        petProfile,
        route: {
          origin: newOrigin,
          destination,
          departureDate,
          transitCountries: transitCountries || [],
        },
        stats: {
          overallStatus: 'READY',
          statusHeadline: `Compliance re-evaluated for ${newOrigin} ➔ ${destination}`,
        },
        timelineMilestones: sourceTrip.timelineMilestones || [],
        complianceChecklist: sourceTrip.complianceChecklist || {},
        readinessReport: sourceTrip.readinessReport || {},
        uploadedDocuments: sourceTrip.uploadedDocuments || [],
      },
    });

    return NextResponse.json({
      success: true,
      message: `New trip to ${destination} successfully planned using ${sourceTrip.petName}'s saved digital passport!`,
      trip: newTrip,
    });
  } catch (error) {
    console.error('[API /api/passport/[id]/reuse POST] Error reusing pet passport:', error);
    return NextResponse.json(
      { error: 'Failed to plan new trip with saved pet passport.' },
      { status: 500 }
    );
  }
}
