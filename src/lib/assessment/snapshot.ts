/**
 * Assessment Snapshot Builder (TRD §6, PRD §13)
 *
 * Builds and persists an Assessment at report-generation time.
 * The snapshot pins the exact RequirementVersion rows, trip state,
 * and pet facts used — a report generated on day X renders identically
 * on day X forever, even if requirements change.
 */

import { db } from '../db';
import { Prisma } from '@prisma/client';
import { Facts } from '../requirements/facts';
import { evaluate } from '../requirements/evaluate';
import { scoreOverall } from '../requirements/scoring';
import { getCurrentRequirementVersions } from '../requirements/queries';

export const RULE_ENGINE_VERSION = process.env.RULE_ENGINE_VERSION || '0.1.0';

/**
 * Creates a frozen assessment snapshot.
 *
 * This is the paid product's integrity mechanism — old reports read from
 * their pinned Assessment, never from live tables.
 */
export async function createAssessment(
  tripId: string,
  facts: Facts
): Promise<{
  id: string;
  overallVerdict: string;
  itemVerdicts: ReturnType<typeof evaluate>;
}> {
  // Fetch the trip with related data
  const trip = await db.trip.findUniqueOrThrow({
    where: { id: tripId },
    include: {
      pet: {
        include: {
          vaccinations: true,
        },
      },
      airline: true,
    },
  });

  // Determine the route slug
  const route = await db.route.findFirst({
    where: {
      originCountryId: trip.originCountryId,
      destinationCountryId: trip.destinationCountryId,
    },
  });

  if (!route) {
    throw new Error(`No route found for origin=${trip.originCountryId} → destination=${trip.destinationCountryId}`);
  }

  // Get current requirement versions for this route
  const requirementVersions = await getCurrentRequirementVersions(
    route.slug,
    trip.pet.species as 'DOG' | 'CAT'
  );

  if (requirementVersions.length === 0) {
    throw new Error(`No requirement versions found for route ${route.slug}`);
  }

  // Run evaluation
  const items = evaluate(requirementVersions, facts, trip.arrivalDatetime.toISOString());
  const overallVerdict = scoreOverall(items);

  // Build frozen snapshots
  const tripSnapshot = {
    id: trip.id,
    originCountryId: trip.originCountryId,
    destinationCountryId: trip.destinationCountryId,
    departureDatetime: trip.departureDatetime.toISOString(),
    arrivalDatetime: trip.arrivalDatetime.toISOString(),
    originTimezone: trip.originTimezone,
    destinationTimezone: trip.destinationTimezone,
    entryAirport: trip.entryAirport,
    airline: {
      id: trip.airline.id,
      name: trip.airline.name,
      slug: trip.airline.slug,
    },
  };

  // Persist the assessment
  const assessment = await db.assessment.create({
    data: {
      tripId: trip.id,
      tripSnapshot: tripSnapshot as unknown as Prisma.InputJsonValue,
      petFactsSnapshot: facts as unknown as Prisma.InputJsonValue,
      requirementVersionsUsed: requirementVersions.map((rv) => rv.id),
      ruleEngineVersion: RULE_ENGINE_VERSION,
      overallVerdict: overallVerdict,
      itemVerdicts: items as unknown as Prisma.InputJsonValue,
    },
  });

  return {
    id: assessment.id,
    overallVerdict,
    itemVerdicts: items,
  };
}
