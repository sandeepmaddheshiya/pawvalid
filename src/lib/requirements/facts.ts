/**
 * Facts Model (PRD §18)
 *
 * The Fact-shaped interface that evaluate.ts depends on — not raw Pet/Trip models.
 * This decouples the rule engine from the database schema, making the engine
 * independently unit-testable and future-proof for a dynamic question engine (V2).
 *
 * A fact value of 'unknown' means the user explicitly couldn't answer.
 * A fact value of undefined means the fact was never asked / not relevant.
 */

export type FactValue = string | number | boolean | 'unknown' | undefined;

export type Facts = Record<string, FactValue>;

/**
 * Well-known fact field names used by the MVP rule set.
 * These are the concrete fields that rules reference by name.
 */
export const FACT_FIELDS = {
  // Pet facts
  SPECIES: 'species',
  BREED: 'breed',
  AGE_MONTHS: 'age_months',
  WEIGHT_KG: 'weight_kg',
  COUNTRY_OF_RESIDENCE: 'country_of_residence',
  MICROCHIP_NUMBER: 'microchip_number',
  MICROCHIP_DATE: 'microchip_date',
  STERILIZED: 'sterilized',
  RABIES_VACCINATION_DATE: 'rabies_vaccination_date',
  RABIES_VACCINATION_TYPE: 'rabies_vaccination_type',
  RABIES_VACCINATION_VALIDITY_END: 'rabies_vaccination_validity_end',

  // Trip facts
  ORIGIN_COUNTRY: 'origin_country',
  DESTINATION_COUNTRY: 'destination_country',
  DEPARTURE_DATETIME: 'departure_datetime',
  ARRIVAL_DATETIME: 'arrival_datetime',
  AIRLINE: 'airline',
  ENTRY_AIRPORT: 'entry_airport',

  // Document facts
  HAS_HEALTH_CERTIFICATE: 'has_health_certificate',
  HEALTH_CERTIFICATE_DATE: 'health_certificate_date',
  HAS_IMPORT_PERMIT: 'has_import_permit',
  IMPORT_PERMIT_DATE: 'import_permit_date',
  HAS_RABIES_TITER_TEST: 'has_rabies_titer_test',
  RABIES_TITER_TEST_DATE: 'rabies_titer_test_date',
  HAS_TAPEWORM_TREATMENT: 'has_tapeworm_treatment',
  TAPEWORM_TREATMENT_DATE: 'tapeworm_treatment_date',
} as const;

export type FactField = typeof FACT_FIELDS[keyof typeof FACT_FIELDS];

/**
 * Extracts a Facts object from Pet + Trip data structures.
 * This is the adapter between the DB models and the rule engine.
 */
export function extractFacts(pet: {
  species: string;
  breed?: string | null;
  age?: number | null;
  weight?: number | null;
  countryOfResidence: string;
  microchipNumber?: string | null;
  microchipDate?: Date | string | null;
  sterilized?: boolean | null;
  vaccinations?: Array<{
    vaccinationDate: Date | string;
    primaryOrBooster: string;
    validityEnd?: Date | string | null;
  }>;
}, trip: {
  originCountryId: string;
  destinationCountryId: string;
  departureDatetime: Date | string;
  arrivalDatetime: Date | string;
  airlineId: string;
  entryAirport?: string | null;
}, unknownFields?: string[]): Facts {
  const facts: Facts = {};

  // Pet facts
  facts[FACT_FIELDS.SPECIES] = pet.species;
  facts[FACT_FIELDS.BREED] = pet.breed ?? undefined;
  facts[FACT_FIELDS.AGE_MONTHS] = pet.age ?? undefined;
  facts[FACT_FIELDS.WEIGHT_KG] = pet.weight ?? undefined;
  facts[FACT_FIELDS.COUNTRY_OF_RESIDENCE] = pet.countryOfResidence;
  facts[FACT_FIELDS.MICROCHIP_NUMBER] = pet.microchipNumber ?? undefined;
  facts[FACT_FIELDS.MICROCHIP_DATE] = pet.microchipDate
    ? new Date(pet.microchipDate).toISOString()
    : undefined;
  facts[FACT_FIELDS.STERILIZED] = pet.sterilized ?? undefined;

  // Most recent vaccination
  if (pet.vaccinations && pet.vaccinations.length > 0) {
    const sorted = [...pet.vaccinations].sort(
      (a, b) => new Date(b.vaccinationDate).getTime() - new Date(a.vaccinationDate).getTime()
    );
    const latest = sorted[0];
    facts[FACT_FIELDS.RABIES_VACCINATION_DATE] = new Date(latest.vaccinationDate).toISOString();
    facts[FACT_FIELDS.RABIES_VACCINATION_TYPE] = latest.primaryOrBooster;
    facts[FACT_FIELDS.RABIES_VACCINATION_VALIDITY_END] = latest.validityEnd
      ? new Date(latest.validityEnd).toISOString()
      : undefined;
  }

  // Trip facts
  facts[FACT_FIELDS.ORIGIN_COUNTRY] = trip.originCountryId;
  facts[FACT_FIELDS.DESTINATION_COUNTRY] = trip.destinationCountryId;
  facts[FACT_FIELDS.DEPARTURE_DATETIME] = new Date(trip.departureDatetime).toISOString();
  facts[FACT_FIELDS.ARRIVAL_DATETIME] = new Date(trip.arrivalDatetime).toISOString();
  facts[FACT_FIELDS.AIRLINE] = trip.airlineId;
  facts[FACT_FIELDS.ENTRY_AIRPORT] = trip.entryAirport ?? undefined;

  // Mark explicitly unknown fields
  if (unknownFields) {
    for (const field of unknownFields) {
      facts[field] = 'unknown';
    }
  }

  return facts;
}
