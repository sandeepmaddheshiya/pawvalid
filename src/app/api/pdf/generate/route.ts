import { NextRequest, NextResponse } from 'next/server';
import {
  generatePdfFromHtml,
  generateVetSheetHtml,
  generatePassportHtml,
  generateVerificationPassHtml,
} from '@/lib/pdf/generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Document type is required (vet-sheet, passport, verify)' },
        { status: 400 }
      );
    }

    let html = '';
    let filename = 'Petvia-Document.pdf';

    if (type === 'vet-sheet') {
      html = generateVetSheetHtml(data || {});
      const petName = (data?.petName || 'Patient').replace(/[^a-zA-Z0-9_-]/g, '_');
      filename = `Petvia-Vet-Clinic-Sheet-${petName}.pdf`;
    } else if (type === 'passport') {
      html = await generatePassportHtml({
        passId: data?.passId || 'PV-2026-UKDE-9842',
        pet: data?.pet || { name: 'Bailey' },
        origin: data?.origin || 'United Kingdom',
        destination: data?.destination || 'Germany',
        transits: data?.transits || [],
        userEmail: data?.userEmail || 'traveler@petvia.com',
        verificationUrl: data?.verificationUrl || 'https://petvia.com/verify/PV-2026-UKDE-9842',
        sha256Hash: data?.sha256Hash,
      });
      const petName = (data?.pet?.name || 'Bailey').replace(/[^a-zA-Z0-9_-]/g, '_');
      filename = `Petvia-Digital-Passport-${petName}.pdf`;
    } else if (type === 'verify') {
      html = await generateVerificationPassHtml(data || { verificationUrl: 'https://petvia.com' });
      const passId = (data?.passId || 'PV-2026-UKDE-9842').replace(/[^a-zA-Z0-9_-]/g, '_');
      filename = `Petvia-Verification-Pass-${passId}.pdf`;
    } else {
      return NextResponse.json(
        { error: `Unsupported document type: ${type}` },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePdfFromHtml(html);

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[API /api/pdf/generate POST] Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF document.' },
      { status: 500 }
    );
  }
}
