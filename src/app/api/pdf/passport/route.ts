import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generatePassportHtml, generatePdfFromHtml } from '@/lib/pdf/generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get('tripId');
    const isPreview = searchParams.get('preview') === 'true';

    let tripData: any = null;

    if (tripId) {
      try {
        tripData = await db.savedTrip.findUnique({
          where: { id: tripId },
        });
      } catch (err) {
        console.warn('[Passport PDF API] DB lookup error:', err);
      }
    }

    // Check paywall tier
    const tier = tripData?.tier || 'CERTIFIED_PASS';
    if (tier === 'FREE' && !isPreview) {
      return NextResponse.json(
        {
          error:
            'Upgrade required. Activate the Complete Travel Plan (£19) to download the official certified digital pet passport.',
          upgradeRequired: true,
        },
        { status: 402 }
      );
    }

    const petProfile = (tripData?.petProfile as any) || {};
    const petName = tripData?.petName || petProfile.name || 'Bailey';
    const species = tripData?.species || petProfile.species || 'Canine';
    const breed = tripData?.breed || petProfile.breed || 'Golden Retriever';
    const origin = tripData?.origin || 'United Kingdom';
    const destination = tripData?.destination || 'Germany';
    const transits = tripData?.route?.transitCountries || [];
    const userEmail = tripData?.userEmail || 'traveler@petvia.com';

    const passId = `PV-2026-${tripData?.id?.slice(0, 8)?.toUpperCase() || 'UKDE-9842'}`;
    const baseUrl = request.nextUrl.origin || 'https://petvia.com';
    const verificationUrl = `${baseUrl}/verify/${passId}`;

    const html = await generatePassportHtml({
      passId,
      pet: {
        name: petName,
        species,
        breed,
        ageMonths: petProfile.ageMonths || 36,
        weightKg: petProfile.weightKg || 28.5,
        microchipNumber: petProfile.microchipNumber || '985141002847192',
        microchipDate: petProfile.microchipDate || '2023-04-12',
        rabiesVaccineDate: petProfile.rabiesVaccineDate || '2024-05-10',
        rabiesVaccineType: petProfile.rabiesVaccineType || 'BOOSTER',
      },
      origin,
      destination,
      transits,
      userEmail,
      verificationUrl,
    });

    const pdfBuffer = await generatePdfFromHtml(html);

    const safeFilename = `Petvia-Digital-Passport-${petName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[API /api/pdf/passport GET] Error generating Passport PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate Digital Pet Passport PDF.' },
      { status: 500 }
    );
  }
}
