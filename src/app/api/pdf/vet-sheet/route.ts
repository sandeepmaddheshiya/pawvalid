import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateVetSheetHtml, generatePdfFromHtml } from '@/lib/pdf/generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get('tripId');
    const qPetName = searchParams.get('petName');
    const qSpecies = searchParams.get('species');
    const qDestination = searchParams.get('destination');
    const qMicrochip = searchParams.get('microchip');

    let tripData: any = null;

    if (tripId) {
      try {
        tripData = await db.savedTrip.findUnique({
          where: { id: tripId },
        });
      } catch (err) {
        console.warn('[PDF API] Could not fetch trip from DB:', err);
      }
    }

    const petProfile = (tripData?.petProfile as any) || {};

    const petName = qPetName || tripData?.petName || 'Bailey';
    const species = qSpecies || tripData?.species || 'Canine';
    const breed = tripData?.breed || petProfile.breed || 'Golden Retriever';
    const destination = qDestination || tripData?.destination || 'Germany';
    const origin = tripData?.origin || 'United Kingdom';
    const microchip =
      qMicrochip || petProfile.microchipNumber || '985141002847192';
    const userEmail = tripData?.userEmail || 'traveler@petvia.com';

    const html = generateVetSheetHtml({
      petName,
      species,
      breed,
      destination,
      origin,
      microchip,
      userEmail,
    });

    const pdfBuffer = await generatePdfFromHtml(html);

    const safeFilename = `Petvia-Vet-Clinic-Sheet-${petName.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[API /api/pdf/vet-sheet GET] Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate Veterinary Clinic Sheet PDF.' },
      { status: 500 }
    );
  }
}
