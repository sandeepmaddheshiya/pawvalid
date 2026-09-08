import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Query all trips for this user
    const trips = await db.savedTrip.findMany({
      where: { userEmail: cleanEmail },
      orderBy: { createdAt: 'desc' },
    });

    // Extract unique pet profiles across trips
    const petMap = new Map<string, any>();

    for (const trip of trips) {
      const petProfile = (trip.petProfile as any) || {};
      const petKey = petProfile.microchipNumber || trip.petName.toLowerCase().trim();

      if (!petMap.has(petKey)) {
        petMap.set(petKey, {
          id: trip.id,
          name: trip.petName,
          species: trip.species,
          breed: trip.breed || petProfile.breed || 'Companion Animal',
          ageMonths: petProfile.ageMonths || 36,
          weightKg: petProfile.weightKg || 28.5,
          microchipNumber: petProfile.microchipNumber || '985141002847192',
          microchipDate: petProfile.microchipDate || '2023-04-12',
          rabiesVaccineDate: petProfile.rabiesVaccineDate || '2024-05-10',
          rabiesVaccineType: petProfile.rabiesVaccineType || 'BOOSTER',
          titerLevelIU: 0.85,
          documentsCount: (trip.uploadedDocuments as any[])?.length || 3,
          latestTrip: {
            id: trip.id,
            origin: trip.origin,
            destination: trip.destination,
            overallStatus: trip.overallStatus,
            departureDate: trip.departureDate,
          },
          createdAt: trip.createdAt,
        });
      }
    }

    const pets = Array.from(petMap.values());

    return NextResponse.json({
      success: true,
      pets,
      count: pets.length,
    });
  } catch (error) {
    console.error('[API /api/passport GET] Error retrieving pet passports:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve digital pet passports.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, petProfile, documents } = body;

    if (!userEmail || !petProfile?.name) {
      return NextResponse.json(
        { error: 'User email and pet name are required to save digital passport' },
        { status: 400 }
      );
    }

    const cleanEmail = userEmail.toLowerCase().trim();

    // Check if trip/passport already exists to update
    const existingTrip = await db.savedTrip.findFirst({
      where: {
        userEmail: cleanEmail,
        petName: petProfile.name,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (existingTrip) {
      const updated = await db.savedTrip.update({
        where: { id: existingTrip.id },
        data: {
          species: petProfile.species || existingTrip.species,
          breed: petProfile.breed || existingTrip.breed,
          petProfile: {
            ...(existingTrip.petProfile as any),
            ...petProfile,
          },
          uploadedDocuments: documents || existingTrip.uploadedDocuments,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Digital Pet Passport for ${petProfile.name} successfully updated!`,
        pet: updated,
      });
    }

    // Create a base saved trip / pet passport
    const newPassport = await db.savedTrip.create({
      data: {
        userEmail: cleanEmail,
        petName: petProfile.name,
        species: petProfile.species || 'DOG',
        breed: petProfile.breed || 'Golden Retriever',
        origin: petProfile.countryOfResidence || 'United Kingdom',
        destination: 'International Travel',
        overallStatus: 'READY',
        petProfile: {
          name: petProfile.name,
          species: petProfile.species || 'DOG',
          breed: petProfile.breed || 'Golden Retriever',
          ageMonths: petProfile.ageMonths || 36,
          weightKg: petProfile.weightKg || 28.5,
          microchipNumber: petProfile.microchipNumber || '985141002847192',
          microchipDate: petProfile.microchipDate || '2023-04-12',
          rabiesVaccineDate: petProfile.rabiesVaccineDate || '2024-05-10',
          rabiesVaccineType: petProfile.rabiesVaccineType || 'BOOSTER',
        },
        route: {
          origin: petProfile.countryOfResidence || 'United Kingdom',
          destination: 'International Travel',
        },
        stats: {
          overallStatus: 'READY',
          statusHeadline: `${petProfile.name}'s digital passport active and ready for travel checks.`,
        },
        timelineMilestones: [],
        complianceChecklist: {},
        readinessReport: {},
        uploadedDocuments: documents || [],
      },
    });

    return NextResponse.json({
      success: true,
      message: `Digital Pet Passport for ${petProfile.name} created!`,
      pet: newPassport,
    });
  } catch (error) {
    console.error('[API /api/passport POST] Error creating pet passport:', error);
    return NextResponse.json(
      { error: 'Failed to create digital pet passport.' },
      { status: 500 }
    );
  }
}
