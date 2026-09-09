import { NextRequest, NextResponse } from 'next/server';
import { generateVerificationPassHtml, generatePdfFromHtml } from '@/lib/pdf/generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const passId = searchParams.get('passId') || 'PV-2026-UKDE-9842';
    const baseUrl = request.nextUrl.origin || 'https://pawvalid.online';
    const verificationUrl = `${baseUrl}/verify/${passId}`;

    const html = await generateVerificationPassHtml({
      passId,
      petName: searchParams.get('petName') || 'Bailey',
      species: searchParams.get('species') || 'Canine',
      breed: searchParams.get('breed') || 'Golden Retriever',
      ageYears: 3,
      weightKg: 28.5,
      microchip: searchParams.get('microchip') || '985141002847192',
      microchipDate: '2023-04-12',
      origin: searchParams.get('origin') || 'United Kingdom (London LHR)',
      destination: searchParams.get('destination') || 'Germany (Frankfurt FRA)',
      verificationUrl,
    });

    const pdfBuffer = await generatePdfFromHtml(html);

    const safeFilename = `PawValid-Verification-Pass-${passId.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[API /api/pdf/verify GET] Error generating verify PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate verification dossier PDF.' },
      { status: 500 }
    );
  }
}
