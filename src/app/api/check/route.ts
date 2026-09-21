/**
 * POST /api/check
 *
 * Runs a compliance assessment. Pure evaluation — no persistence unless save: true.
 * 
 * FAIL-SAFE (PRD §26, TRD §4): Any internal error returns
 * overallVerdict: 'UNABLE_TO_DETERMINE' with HTTP 200 — not a 5xx
 * that a client might mishandle as "ignore and show cached READY".
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRequestSchema } from '@/lib/validations';
import { getCurrentRequirementVersions } from '@/lib/requirements/queries';
import { evaluate } from '@/lib/requirements/evaluate';
import { scoreOverall } from '@/lib/requirements/scoring';
import { FACT_FIELDS, Facts } from '@/lib/requirements/facts';
import { createAssessment } from '@/lib/assessment/snapshot';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { trip, pet, save } = parsed.data;

    // Parse transit countries
    let transitCountries: string[] = [];
    const rawTransits = trip.transitCountries || trip.transit_countries;
    if (rawTransits) {
      if (Array.isArray(rawTransits)) {
        transitCountries = rawTransits.map((t) => t.trim().toUpperCase()).filter(Boolean);
      } else if (typeof rawTransits === 'string') {
        transitCountries = rawTransits.split(',').map((t) => t.trim().toUpperCase()).filter(Boolean);
      }
    }

    // Look up route in DB
    let routeSlug = `${trip.originCountry.toLowerCase()}-to-${trip.destinationCountry.toLowerCase()}`;
    let isDbRouteSupported = false;

    try {
      const route = await db.route.findFirst({
        where: {
          originCountry: { isoCode: trip.originCountry },
          destinationCountry: { isoCode: trip.destinationCountry },
          status: 'SUPPORTED',
        },
      });
      if (route) {
        routeSlug = route.slug;
        isDbRouteSupported = true;
      }
    } catch {
      // DB offline or query failure - continue with fallback routeSlug
    }

    // Build facts from the request
    const facts: Facts = {
      [FACT_FIELDS.SPECIES]: pet.species,
      [FACT_FIELDS.BREED]: pet.breed,
      [FACT_FIELDS.AGE_MONTHS]: pet.ageMonths,
      [FACT_FIELDS.WEIGHT_KG]: pet.weightKg,
      [FACT_FIELDS.COUNTRY_OF_RESIDENCE]: pet.countryOfResidence,
      [FACT_FIELDS.MICROCHIP_NUMBER]: pet.microchipNumber,
      [FACT_FIELDS.MICROCHIP_DATE]: pet.microchipDate,
      [FACT_FIELDS.ORIGIN_COUNTRY]: trip.originCountry,
      [FACT_FIELDS.DESTINATION_COUNTRY]: trip.destinationCountry,
      [FACT_FIELDS.TRANSIT_COUNTRIES]: transitCountries.join(','),
      [FACT_FIELDS.DEPARTURE_DATETIME]: trip.departureDatetime,
      [FACT_FIELDS.ARRIVAL_DATETIME]: trip.arrivalDatetime,
      [FACT_FIELDS.AIRLINE]: trip.airlineSlug,
      [FACT_FIELDS.ENTRY_AIRPORT]: trip.entryAirport,
      [FACT_FIELDS.HAS_HEALTH_CERTIFICATE]: pet.hasHealthCertificate,
      [FACT_FIELDS.HEALTH_CERTIFICATE_DATE]: pet.healthCertificateDate,
      [FACT_FIELDS.HAS_IMPORT_PERMIT]: pet.hasImportPermit,
      [FACT_FIELDS.HAS_TAPEWORM_TREATMENT]: pet.hasTapewormTreatment,
      [FACT_FIELDS.TAPEWORM_TREATMENT_DATE]: pet.tapewormTreatmentDate,
    };

    // Rabies vaccination
    if (pet.mostRecentRabiesVaccination) {
      facts[FACT_FIELDS.RABIES_VACCINATION_DATE] = pet.mostRecentRabiesVaccination.date;
      facts[FACT_FIELDS.RABIES_VACCINATION_TYPE] = pet.mostRecentRabiesVaccination.type;
      if (pet.mostRecentRabiesVaccination.validityEnd) {
        facts[FACT_FIELDS.RABIES_VACCINATION_VALIDITY_END] = pet.mostRecentRabiesVaccination.validityEnd;
      }
    }

    // Mark explicitly unknown fields
    if (pet.unknownFields) {
      for (const field of pet.unknownFields) {
        facts[field] = 'unknown';
      }
    }

    // Get requirements (including transit country rules) and evaluate
    const requirementVersions = await getCurrentRequirementVersions(
      routeSlug,
      pet.species,
      transitCountries
    );

    if (requirementVersions.length === 0) {
      // FAIL-SAFE: no requirements found → can't determine
      return NextResponse.json({
        overallVerdict: 'UNABLE_TO_DETERMINE',
        items: [],
        message: 'No requirements data available for this route',
      });
    }

    const items = evaluate(requirementVersions, facts, trip.arrivalDatetime);
    const overallVerdict = scoreOverall(items);

    let assessmentId: string | undefined;

    if (save) {
      // Create persistent trip + pet + assessment
      const airline = await db.airline.findUnique({
        where: { slug: trip.airlineSlug },
      });

      if (airline) {
        const originCountry = await db.country.findUnique({ where: { isoCode: trip.originCountry } });
        const destCountry = await db.country.findUnique({ where: { isoCode: trip.destinationCountry } });

        if (originCountry && destCountry) {
          const petRecord = await db.pet.create({
            data: {
              species: pet.species,
              breed: pet.breed,
              age: pet.ageMonths,
              weight: pet.weightKg,
              countryOfResidence: pet.countryOfResidence,
              microchipNumber: pet.microchipNumber,
              microchipDate: pet.microchipDate ? new Date(pet.microchipDate) : undefined,
              vaccinations: pet.mostRecentRabiesVaccination
                ? {
                    create: {
                      vaccinationDate: new Date(pet.mostRecentRabiesVaccination.date),
                      primaryOrBooster: pet.mostRecentRabiesVaccination.type,
                      validityEnd: pet.mostRecentRabiesVaccination.validityEnd
                        ? new Date(pet.mostRecentRabiesVaccination.validityEnd)
                        : undefined,
                    },
                  }
                : undefined,
            },
          });

          const tripRecord = await db.trip.create({
            data: {
              originCountryId: originCountry.id,
              destinationCountryId: destCountry.id,
              departureDatetime: new Date(trip.departureDatetime),
              arrivalDatetime: new Date(trip.arrivalDatetime),
              originTimezone: 'UTC',
              destinationTimezone: 'UTC',
              entryAirport: trip.entryAirport,
              airlineId: airline.id,
              petId: petRecord.id,
            },
          });

          const assessment = await createAssessment(tripRecord.id, facts);
          assessmentId = assessment.id;
        }
      }
    }

    return NextResponse.json({
      overallVerdict,
      items: items.map((item) => ({
        requirementId: item.requirementId,
        status: item.status,
        severity: item.severity,
        category: item.category,
        ruleText: item.ruleText,
        detail: item.detail,
        deadlineIfApplicable: item.deadlineIfApplicable,
        confidence: item.confidence,
        source: item.source,
      })),
      assessmentId,
    });
  } catch (error) {
    // FAIL-SAFE (PRD §26): internal error → UNABLE_TO_DETERMINE, HTTP 200
    console.error('[POST /api/check] Error:', error);
    return NextResponse.json({
      overallVerdict: 'UNABLE_TO_DETERMINE',
      items: [],
      message: 'An error occurred during evaluation — unable to determine compliance',
    });
  }
}
