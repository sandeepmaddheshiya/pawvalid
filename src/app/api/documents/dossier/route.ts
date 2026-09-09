import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

    const isPaid = Boolean(
      payload.isPaid ||
      payload.is_paid ||
      payload.tier === 'CERTIFIED_PASS' ||
      payload.tier === 'CONCIERGE' ||
      payload.trip?.tier === 'CERTIFIED_PASS' ||
      payload.trip?.tier === 'CONCIERGE' ||
      payload.trip?.isPaid
    );

    const enrichedPayload = {
      ...payload,
      is_paid: isPaid,
      isPaid: isPaid,
    };

    const response = await fetch(`${pythonBackendUrl}/api/v1/dossier/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to generate PDF dossier' },
        { status: response.status }
      );
    }

    const pdfBuffer = await response.arrayBuffer();
    const defaultFilename = isPaid
      ? 'PawValid_Certified_Travel_Dossier.pdf'
      : 'PawValid_Preview_Dossier.pdf';
    const contentDisposition =
      response.headers.get('content-disposition') ||
      `attachment; filename="${defaultFilename}"`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (error) {
    console.error('[API /api/documents/dossier] Error generating dossier:', error);
    return NextResponse.json(
      { error: 'Unable to connect to travel dossier generator service.' },
      { status: 503 }
    );
  }
}
