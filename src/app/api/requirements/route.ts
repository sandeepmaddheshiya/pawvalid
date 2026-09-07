/**
 * GET /api/requirements
 * 
 * Returns current RequirementVersions for a route+species combo.
 * Only returns data for routes with status = SUPPORTED (TRD §4).
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentRequirementVersions } from '@/lib/requirements/queries';
import { requirementsQuerySchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const parsed = requirementsQuerySchema.safeParse({
      route: searchParams.get('route'),
      species: searchParams.get('species'),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { route, species } = parsed.data;
    const requirements = await getCurrentRequirementVersions(route, species);

    if (requirements.length === 0) {
      return NextResponse.json(
        { error: 'Route not found or not yet supported' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      route: { slug: route, status: 'SUPPORTED' },
      requirements: requirements.map((r) => ({
        id: r.id,
        category: r.category,
        severity: r.severity,
        ruleText: r.ruleText,
        confidence: r.confidence,
        source: {
          publisher: r.source.publisher,
          url: r.source.url,
          lastVerifiedAt: r.lastVerifiedAt,
        },
      })),
    });
  } catch (error) {
    console.error('[GET /api/requirements] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
