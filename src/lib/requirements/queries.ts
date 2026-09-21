/**
 * Requirement Queries
 *
 * Database queries for requirement data, used by both API routes and
 * the assessment snapshot builder.
 */

import { db } from '../db';
import { RequirementVersionForEval } from './schema';
import { getDeclarativeRequirements, normalizeIsoCode } from './rulesCatalog';
import { CORRIDORS } from '../data/corridors';

/**
 * Fetches current requirement versions for a route+species combo, including transit country rules.
 * Seamlessly queries DB first, falling back/augmenting with the unified declarative statutory catalog.
 */
export async function getCurrentRequirementVersions(
  routeSlug: string,
  species: 'DOG' | 'CAT',
  transitCountries: string[] = []
): Promise<RequirementVersionForEval[]> {
  let dbResults: RequirementVersionForEval[] = [];

  // Parse origin and destination from route slug or CORRIDORS
  let originCode = '';
  let destCode = '';

  const corridor = CORRIDORS[routeSlug];
  if (corridor) {
    originCode = corridor.originCode;
    destCode = corridor.destCode;
  } else if (routeSlug.includes('-to-')) {
    const [orig, dest] = routeSlug.split('-to-');
    originCode = normalizeIsoCode(orig);
    destCode = normalizeIsoCode(dest);
  }

  try {
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

    if (route && route.status === 'SUPPORTED') {
      dbResults = route.requirements
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
  } catch {
    // Database unavailable or route not in DB
  }

  // If DB results exist and no transit rules needed, return DB results
  if (dbResults.length > 0 && (!transitCountries || transitCountries.length === 0)) {
    return dbResults;
  }

  // Get declarative rules from unified catalog (incorporating transit hubs & corridor rules)
  const declarativeRules = getDeclarativeRequirements(
    originCode || 'US',
    destCode || 'DE',
    transitCountries,
    species
  );

  if (dbResults.length === 0) {
    return declarativeRules;
  }

  // If DB has destination rules but transit countries are specified, blend transit rules in
  const existingCategories = new Set(dbResults.map((r) => r.category));
  const transitAndExtraRules = declarativeRules.filter(
    (dr) => dr.category === 'TRANSIT' || !existingCategories.has(dr.category)
  );

  return [...dbResults, ...transitAndExtraRules];
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
