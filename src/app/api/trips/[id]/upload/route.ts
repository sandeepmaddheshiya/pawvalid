import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existingTrip = await db.savedTrip.findUnique({
      where: { id },
    });

    if (!existingTrip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

    // Append route context if not already in form data
    if (!formData.has('origin_country')) {
      formData.append('origin_country', existingTrip.origin);
    }
    if (!formData.has('destination_country')) {
      formData.append('destination_country', existingTrip.destination);
    }
    if (existingTrip.transitCountries && existingTrip.transitCountries.length > 0 && !formData.has('transit_countries')) {
      formData.append('transit_countries', existingTrip.transitCountries.join(','));
    }
    if (existingTrip.departureDate && !formData.has('departure_date')) {
      formData.append('departure_date', existingTrip.departureDate);
    }

    // Call Python FastAPI backend to scan newly added documents
    const scanResponse = await fetch(`${pythonBackendUrl}/api/v1/scan`, {
      method: 'POST',
      body: formData,
    });

    if (!scanResponse.ok) {
      const errText = await scanResponse.text();
      return NextResponse.json(
        { error: errText || 'Failed to scan newly uploaded document' },
        { status: scanResponse.status }
      );
    }

    const scanData = await scanResponse.json();

    // Merge uploaded documents list
    const currentDocs = (existingTrip.uploadedDocuments as any[]) || [];
    const newlyDetectedDocs = scanData.readinessReport?.documentAudit || [];
    const mergedDocs = [...currentDocs];

    for (const newDoc of newlyDetectedDocs) {
      if (!mergedDocs.some((d) => d.filename === newDoc.filename)) {
        mergedDocs.push(newDoc);
      }
    }

    // Update database record with fresh compliance results
    const updatedTrip = await db.savedTrip.update({
      where: { id },
      data: {
        overallStatus: scanData.stats?.overallStatus || existingTrip.overallStatus,
        statusHeadline: scanData.stats?.statusHeadline || existingTrip.statusHeadline,
        earliestFlightDate: scanData.stats?.earliestFlightDate || existingTrip.earliestFlightDate,
        needsHumanReview: Boolean(scanData.stats?.needsHumanReview),
        stats: scanData.stats || existingTrip.stats,
        timelineMilestones: scanData.timelineMilestones || existingTrip.timelineMilestones,
        complianceChecklist: scanData.complianceChecklist || existingTrip.complianceChecklist,
        readinessReport: scanData.readinessReport || existingTrip.readinessReport,
        uploadedDocuments: mergedDocs,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'New document verified and trip status updated!',
      trip: updatedTrip,
    });
  } catch (error) {
    console.error('[API /api/trips/[id]/upload POST] Error uploading document:', error);
    return NextResponse.json(
      { error: 'Failed to process document upload' },
      { status: 500 }
    );
  }
}
