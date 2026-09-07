/**
 * Requirement Queries
 *
 * Database queries for requirement data, used by both API routes and
 * the assessment snapshot builder.
 */

import { db } from '../db';
import { RequirementVersionForEval } from './schema';

/**
 * Fetches current requirement versions for a route+species combo.
 * Only returns data for routes with status = SUPPORTED.
 */
export async function getCurrentRequirementVersions(
  routeSlug: string,
  species: 'DOG' | 'CAT'
): Promise<RequirementVersionForEval[]> {
  const route = await db.route.findUnique({
    where: { slug: routeSlug },
    include: {
      requirements: {
        where: {
          OR: [
            { petSpecies: species },
            { petSpecies: null }, // species-agnostic requirements
          ],
        },
        include: {
          versions: {
            orderBy: { version: 'desc' },
            take: 1,
            include: {
              sourceVersion: {
                include: {
                  source: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!route || route.status !== 'SUPPORTED') {
    return [];
  }

  return route.requirements
    .filter((req) => req.versions.length > 0)
    .map((req) => {
      const latestVersion = req.versions[0];
      return {
        id: latestVersion.id,
        requirementId: req.id,
        version: latestVersion.version,
        ruleType: latestVersion.ruleType as RequirementVersionForEval['ruleType'],
        ruleParams: latestVersion.ruleParams as unknown as RequirementVersionForEval['ruleParams'],
        ruleText: latestVersion.ruleText,
        severity: req.severity as RequirementVersionForEval['severity'],
        category: req.category,
        confidence: latestVersion.confidence as RequirementVersionForEval['confidence'],
        lastVerifiedAt: latestVersion.lastVerifiedAt.toISOString(),
        source: {
          publisher: latestVersion.sourceVersion.source.publisher,
          url: latestVersion.sourceVersion.source.url,
          authorityTier: latestVersion.sourceVersion.source.authorityTier,
        },
      };
    });
}

/**
 * Fetches requirement versions by their IDs (for assessment replay/snapshot).
 */
export async function getRequirementVersionsByIds(
  ids: string[]
): Promise<RequirementVersionForEval[]> {
  const versions = await db.requirementVersion.findMany({
    where: { id: { in: ids } },
    include: {
      requirement: true,
      sourceVersion: {
        include: {
          source: true,
        },
      },
    },
  });

  return versions.map((v) => ({
    id: v.id,
    requirementId: v.requirementId,
    version: v.version,
    ruleType: v.ruleType as RequirementVersionForEval['ruleType'],
    ruleParams: v.ruleParams as unknown as RequirementVersionForEval['ruleParams'],
    ruleText: v.ruleText,
    severity: v.requirement.severity as RequirementVersionForEval['severity'],
    category: v.requirement.category,
    confidence: v.confidence as RequirementVersionForEval['confidence'],
    lastVerifiedAt: v.lastVerifiedAt.toISOString(),
    source: {
      publisher: v.sourceVersion.source.publisher,
      url: v.sourceVersion.source.url,
      authorityTier: v.sourceVersion.source.authorityTier,
    },
  }));
}
