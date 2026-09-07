import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trip = await db.savedTrip.findUnique({
      where: { id },
    });

    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, trip });
  } catch (error) {
    console.error('[API /api/trips/[id] GET] Error fetching trip:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve trip' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedTrip = await db.savedTrip.update({
      where: { id },
      data: {
        ...(body.petName && { petName: body.petName }),
        ...(body.departureDate && { departureDate: body.departureDate }),
        ...(body.tier && { tier: body.tier }),
        ...(body.overallStatus && { overallStatus: body.overallStatus }),
        ...(body.stats && { stats: body.stats }),
        ...(body.complianceChecklist && { complianceChecklist: body.complianceChecklist }),
        ...(body.timelineMilestones && { timelineMilestones: body.timelineMilestones }),
        ...(body.uploadedDocuments && { uploadedDocuments: body.uploadedDocuments }),
      },
    });

    return NextResponse.json({ success: true, trip: updatedTrip });
  } catch (error) {
    console.error('[API /api/trips/[id] PATCH] Error updating trip:', error);
    return NextResponse.json(
      { error: 'Failed to update trip' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.savedTrip.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Trip successfully deleted',
    });
  } catch (error) {
    console.error('[API /api/trips/[id] DELETE] Error deleting trip:', error);
    return NextResponse.json(
      { error: 'Failed to delete trip' },
      { status: 500 }
    );
  }
}
