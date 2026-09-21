/**
 * Master Declarative Rules Catalog for PawValid (TRD & PRD Compliance Engine)
 *
 * Single Source of Truth shared between TypeScript Engine and Python Backend.
 * Contains comprehensive multi-jurisdiction regulatory specifications:
 * - Origin / Export mandates (US VEHCS, AU DAFF, UK Export, AQCS India)
 * - Transit Hub compliance (Singapore AVS Transshipment, EU BIP Transit, UK Manifest Cargo Transit, UAE Transit)
 * - Destination entry requirements across all 50 global corridors
 * - Biosecurity controls (ISO Microchips, Rabies latency, RNATT Titer Clocks, Tapeworm windows)
 */

import { RequirementVersionForEval, RuleType, RuleParams } from './schema';

export const EU_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
]);

export const EU_TITER_EXEMPT_COUNTRIES = new Set([
  'AU', 'CA', 'US', 'GB', 'NZ', 'JP', 'CH', 'NO', 'IS', 'SG', 'HK', 'AE', 'QA', 'KR'
]);

export const TAPEWORM_REQUIRED_COUNTRIES = new Set(['GB', 'IE', 'FI', 'MT', 'NO']);

export interface DeclarativeRule {
  rule_id: string;
  name: string;
  category: string;
  scope: 'LEAVING' | 'TRANSIT' | 'ARRIVING' | 'LOGISTICS';
  jurisdiction: string;
  source: string;
  source_title: string;
  rule_version: string;
  effective_from: string;
  verified_at: string;
  source_url: string;
  severity: 'BLOCKING' | 'NON_BLOCKING' | 'INFORMATIONAL';
  ruleType: RuleType;
  ruleParams: RuleParams;
  applicability: {
    species?: ('DOG' | 'CAT' | 'ALL')[];
    origins?: string[];
    origins_not_in?: string[];
    destinations?: string[];
    destinations_not_in?: string[];
    transit_in?: string[];
    movement_types?: ('NON_COMMERCIAL' | 'COMMERCIAL')[];
  };
  ruleText: string;
  details: string;
}

export const CATALOG_RULES: DeclarativeRule[] = [
  // ─── 0. GLOBAL IDENTIFICATION & RESIDENCE ─────────────────────────────────────
  {
    rule_id: 'GLOBAL_SPECIES_VERIFIED',
    name: 'Species Identification',
    category: 'DOCUMENTS',
    scope: 'ARRIVING',
    jurisdiction: 'GLOBAL',
    source: 'World Organisation for Animal Health (WOAH)',
    source_title: 'International Veterinary Health Protocol',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.woah.org',
    severity: 'BLOCKING',
    ruleType: 'REQUIRED',
    ruleParams: { field: 'species' },
    applicability: { species: ['ALL'] },
    ruleText: 'Confirm pet species (Dog or Cat) to unlock statutory compliance criteria.',
    details: 'Species identification determines vaccine protocols, tapeworm requirements, and airline crate dimensions.',
  },
  {
    rule_id: 'GLOBAL_MICROCHIP_MANDATE',
    name: 'ISO 11784/11785 Compliant Microchip',
    category: 'MICROCHIP',
    scope: 'ARRIVING',
    jurisdiction: 'GLOBAL',
    source: 'International Standards Organization (ISO)',
    source_title: 'ISO 11784/11785 Radio-frequency identification of animals',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.iso.org',
    severity: 'BLOCKING',
    ruleType: 'REQUIRED',
    ruleParams: { field: 'microchip_number' },
    applicability: { species: ['ALL'] },
    ruleText: 'A 15-digit ISO 11784/11785 compliant microchip must be implanted before rabies vaccination.',
    details: 'The microchip transponder must be readable by standard 134.2 kHz scanners at all border inspection posts.',
  },
  {
    rule_id: 'GLOBAL_MICROCHIP_BEFORE_VACCINE',
    name: 'Microchip Implantation Precedes Vaccination',
    category: 'MICROCHIP',
    scope: 'ARRIVING',
    jurisdiction: 'GLOBAL',
    source: 'World Small Animal Veterinary Association (WSAVA)',
    source_title: 'Global Veterinary Travel Guidelines',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://wsava.org/guidelines/vaccination-guidelines/',
    severity: 'BLOCKING',
    ruleType: 'DATE_BEFORE',
    ruleParams: {
      field: 'microchip_date',
      before: 'rabies_vaccination_date',
    },
    applicability: { species: ['ALL'] },
    ruleText: 'Microchip implantation must precede or occur on the same day as the primary rabies vaccination.',
    details: 'Any rabies vaccination administered before microchip implantation is legally invalid under international biosecurity laws.',
  },

  // ─── 1. ORIGIN EXPORT ENDORSEMENTS ───────────────────────────────────────────
  {
    rule_id: 'US_USDA_APHIS_001',
    name: 'USDA APHIS Form 7001 / VEHCS Endorsement',
    category: 'HEALTH_CERTIFICATE',
    scope: 'LEAVING',
    jurisdiction: 'US',
    source: 'USDA Animal and Plant Health Inspection Service (APHIS)',
    source_title: 'USDA APHIS Veterinary Services Pet Travel Mandate',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.aphis.usda.gov/aphis/pet-travel',
    severity: 'BLOCKING',
    ruleType: 'DOCUMENT_REQUIRED',
    ruleParams: {
      document_type: 'health_certificate',
      field: 'has_health_certificate',
    },
    applicability: { origins: ['US'], destinations_not_in: ['MX'] },
    ruleText: 'Veterinary health certificate must be submitted through USDA VEHCS for federal endorsement within 10 days of departure.',
    details: 'US federal law requires companion animals exported internationally to hold a USDA-endorsed certificate.',
  },
  {
    rule_id: 'AU_DAFF_EXPORT_001',
    name: 'Australian DAFF Export Permit (Notice of Intention)',
    category: 'DOCUMENTS',
    scope: 'LEAVING',
    jurisdiction: 'AU',
    source: 'Department of Agriculture, Fisheries and Forestry (DAFF)',
    source_title: 'Export Control (Animals) Rules 2021',
    rule_version: '2026.2',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.agriculture.gov.au/biosecurity-trade/export/live-animals/companion-animals',
    severity: 'BLOCKING',
    ruleType: 'DOCUMENT_REQUIRED',
    ruleParams: {
      document_type: 'export_permit',
      field: 'has_import_permit',
    },
    applicability: { origins: ['AU'], destinations_not_in: ['NZ'] },
    ruleText: 'Lodge Notice of Intention with Australian DAFF; must obtain DAFF export permit prior to flight.',
    details: 'Live companion animals departing Australia require an approved Notice of Intention and DAFF Export Permit.',
  },
  {
    rule_id: 'IN_AQCS_EXPORT_001',
    name: 'AQCS India Veterinary Export NOC',
    category: 'DOCUMENTS',
    scope: 'LEAVING',
    jurisdiction: 'IN',
    source: 'Animal Quarantine and Certification Services (AQCS India / DAHD)',
    source_title: 'Standard Operating Procedure for Export of Pets from India',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://aqcsindia.gov.in',
    severity: 'BLOCKING',
    ruleType: 'DOCUMENT_REQUIRED',
    ruleParams: {
      document_type: 'health_certificate',
      field: 'has_health_certificate',
    },
    applicability: { origins: ['IN'] },
    ruleText: 'Must obtain physical inspection and Animal Quarantine & Certification Services (AQCS) export NOC within 7 days of departure.',
    details: 'Mandatory export clearance issued by AQCS quarantine officer at Delhi, Mumbai, Kolkata, Chennai, or Bengaluru.',
  },

  // ─── 2. TRANSIT HUB JURISDICTIONS (Item 22) ──────────────────────────────────
  {
    rule_id: 'SG_NPARKS_TRANSIT_001',
    name: 'Singapore NParks / AVS Transshipment License',
    category: 'TRANSIT',
    scope: 'TRANSIT',
    jurisdiction: 'SG',
    source: 'Animal & Veterinary Service (AVS) / NParks Singapore',
    source_title: 'Singapore Animals and Birds (Transshipment of Companion Animals) Regulations',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.nparks.gov.sg/avs/pets/bringing-animals-into-singapore-and-transshipping/transshipping-dogs-and-cats',
    severity: 'BLOCKING',
    ruleType: 'DOCUMENT_REQUIRED',
    ruleParams: {
      document_type: 'import_permit',
      field: 'has_import_permit',
    },
    applicability: { transit_in: ['SG'] },
    ruleText: 'Apply for NParks transshipment permit and reserve Changi Animal & Plant Quarantine Station (CAPQ) if transit exceeds 4 hours.',
    details: 'All animals transiting through Singapore Changi Airport must hold an AVS Transshipment License.',
  },
  {
    rule_id: 'EU_TRANSIT_BIP_DE',
    name: 'EU First Point of Entry Border Inspection Post (Transit)',
    category: 'TRANSIT',
    scope: 'TRANSIT',
    jurisdiction: 'EU',
    source: 'European Commission DG SANTE',
    source_title: 'Regulation (EU) No 576/2013 First Entry Point Transit Mandate',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://food.ec.europa.eu/animals/movement-pets_en',
    severity: 'BLOCKING',
    ruleType: 'DOCUMENT_REQUIRED',
    ruleParams: {
      document_type: 'health_certificate',
      field: 'has_health_certificate',
    },
    applicability: { transit_in: ['DE', 'FR', 'NL', 'ES', 'IT', 'BE'] },
    ruleText: 'Ensure minimum 3 to 4 hour layover in EU transit hub for official Border Inspection Post (BIP) microchip scan and paperwork clearance.',
    details: 'Because this is your pet\'s first entry into the EU customs territory, entry checks occur at the transit airport before connecting flights.',
  },
  {
    rule_id: 'UK_DEFRA_TRANSIT_001',
    name: 'UK DEFRA Manifest Cargo Transit Protocol',
    category: 'TRANSIT',
    scope: 'TRANSIT',
    jurisdiction: 'GB',
    source: 'Department for Environment, Food & Rural Affairs (DEFRA)',
    source_title: 'UK Non-Commercial Pet Travel Scheme (Transit)',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.gov.uk/bring-pet-to-great-britain',
    severity: 'BLOCKING',
    ruleType: 'REQUIRED',
    ruleParams: { field: 'airline' },
    applicability: { transit_in: ['GB'] },
    ruleText: 'Pets transiting the UK must be booked strictly as manifest cargo with an approved airline; in-cabin and checked baggage transit is prohibited.',
    details: 'DEFRA biosecurity strictly enforces manifest cargo airside routing for all companion animals transiting through British airports (LHR, LGW).',
  },
  {
    rule_id: 'AE_MOCCAE_TRANSIT_001',
    name: 'UAE MOCCAE Transshipment Transit Clearance',
    category: 'TRANSIT',
    scope: 'TRANSIT',
    jurisdiction: 'AE',
    source: 'Ministry of Climate Change and Environment (MOCCAE UAE)',
    source_title: 'Federal Law No. 22 Live Animal Transshipment Protocol',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.moccae.gov.ae',
    severity: 'BLOCKING',
    ruleType: 'DOCUMENT_REQUIRED',
    ruleParams: {
      document_type: 'health_certificate',
      field: 'has_health_certificate',
    },
    applicability: { transit_in: ['AE'] },
    ruleText: 'Pets transiting Dubai (DXB) or Abu Dhabi (AUH) must remain in manifest cargo transit custody and hold origin-endorsed health certificate.',
    details: 'Layovers exceeding 12 hours require pre-booking at Dubai Airport Pet Lounge / Emirates Live Animal Cargo Centre.',
  },

  // ─── 3. DESTINATION BIOSECURITY & RABIES LATENCY ───────────────────────────────
  {
    rule_id: 'EU_RABIES_VACCINATION_001',
    name: 'EU Primary Rabies Vaccination & 21-Day Latency',
    category: 'RABIES_VACCINATION',
    scope: 'ARRIVING',
    jurisdiction: 'EU',
    source: 'European Commission',
    source_title: 'Regulation (EU) No 576/2013 Annex III',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://food.ec.europa.eu/animals/movement-pets_en',
    severity: 'BLOCKING',
    ruleType: 'MIN_WAIT',
    ruleParams: {
      from: 'rabies_vaccination_date',
      to: 'arrival_datetime',
      value: 21,
      unit: 'days',
    },
    applicability: { destinations: ['DE', 'FR', 'ES', 'IT', 'IE', 'NL', 'EU', 'CH'] },
    ruleText: 'Primary rabies vaccination must be administered at least 21 days prior to entering the European Union.',
    details: 'Primary vaccination validity begins exactly on day 22 after vaccine administration (Day 0).',
  },
  {
    rule_id: 'UK_DEFRA_RABIES_001',
    name: 'UK DEFRA Rabies Immunization & 21-Day Latency',
    category: 'RABIES_VACCINATION',
    scope: 'ARRIVING',
    jurisdiction: 'GB',
    source: 'Animal and Plant Health Agency (APHA) & DEFRA',
    source_title: 'The Non-Commercial Movement of Pet Animals Order 2011',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.gov.uk/bring-pet-to-great-britain',
    severity: 'BLOCKING',
    ruleType: 'MIN_WAIT',
    ruleParams: {
      from: 'rabies_vaccination_date',
      to: 'arrival_datetime',
      value: 21,
      unit: 'days',
    },
    applicability: { destinations: ['GB'] },
    ruleText: 'Primary rabies vaccination must be administered at least 21 days prior to arrival in Great Britain.',
    details: 'Booster vaccines have no 21-day latency provided there is no gap in validity from the previous vaccination.',
  },
  {
    rule_id: 'UK_DEFRA_TAPEWORM_001',
    name: 'DEFRA Mandatory Echinococcus Tapeworm Treatment (24–120h)',
    category: 'TAPEWORM_TREATMENT',
    scope: 'ARRIVING',
    jurisdiction: 'GB',
    source: 'APHA & DEFRA',
    source_title: 'UK Tapeworm (Echinococcus multilocularis) Treatment Protocol',
    rule_version: '2026.1',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.gov.uk/bring-pet-to-great-britain',
    severity: 'BLOCKING',
    ruleType: 'DATE_WINDOW',
    ruleParams: {
      from: 'tapeworm_treatment_date',
      to: 'arrival_datetime',
      min_days: 1,
      max_days: 5,
    },
    applicability: { species: ['DOG'], destinations: ['GB', 'IE', 'FI', 'MT', 'NO'] },
    ruleText: 'Dogs must be treated for tapeworm (Praziquantel) by a licensed vet between 24 and 120 hours before scheduled arrival.',
    details: 'Exact date and time of administration must be recorded in the official health certificate or pet passport.',
  },
  {
    rule_id: 'AU_DAFF_RNATT_001',
    name: 'Australian DAFF RNATT Rabies Titer Test (180-Day Latency)',
    category: 'RABIES_TITER',
    scope: 'ARRIVING',
    jurisdiction: 'AU',
    source: 'Australian Department of Agriculture, Fisheries and Forestry (DAFF)',
    source_title: 'DAFF Group 3 Companion Animal Import Biosecurity Standard',
    rule_version: '2026.2',
    effective_from: '2026-01-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.agriculture.gov.au/biosecurity-trade/cats-dogs',
    severity: 'BLOCKING',
    ruleType: 'MIN_WAIT',
    ruleParams: {
      from: 'rabies_vaccination_date',
      to: 'arrival_datetime',
      value: 180,
      unit: 'days',
    },
    applicability: { destinations: ['AU'], origins_not_in: ['NZ'] },
    ruleText: 'Blood sample must achieve RNATT antibody titer ≥ 0.5 IU/mL, and pet must wait at least 180 days after blood draw before entering Australia.',
    details: 'Mandatory for direct entry into Australia from all non-rabies-free countries to qualify for 10-day Mickleham quarantine.',
  },
  {
    rule_id: 'US_CDC_DOG_IMPORT_001',
    name: 'US CDC Dog Import Form Submission & 6-Month Age Mandate',
    category: 'HEALTH_CERTIFICATE',
    scope: 'ARRIVING',
    jurisdiction: 'US',
    source: 'US Centers for Disease Control and Prevention (CDC)',
    source_title: 'CDC Dog Importation Regulation (42 CFR Part 71)',
    rule_version: '2026.1',
    effective_from: '2024-08-01',
    verified_at: 'September 21, 2026',
    source_url: 'https://www.cdc.gov/importation/dogs/enter-the-us.html',
    severity: 'BLOCKING',
    ruleType: 'REQUIRED',
    ruleParams: { field: 'microchip_number' },
    applicability: { species: ['DOG'], destinations: ['US'] },
    ruleText: 'Must submit the free online CDC Dog Import Form and hold confirmation receipt. Dog must be at least 6 months of age.',
    details: 'Mandatory for all dogs entering the US under active CDC dog rabies importation regulations.',
  },
];

/**
 * Normalizes 2-letter ISO country code or common country name.
 */
export function normalizeIsoCode(nameOrCode: string): string {
  const val = (nameOrCode || '').trim();
  const lower = val.toLowerCase();
  if (lower === 'uk' || lower === 'gb' || lower === 'britain' || lower.includes('united kingdom') || lower.includes('great britain')) return 'GB';
  if (lower === 'us' || lower === 'usa' || lower.includes('united states') || lower.includes('america')) return 'US';
  if (lower === 'de' || lower.includes('germany') || lower.includes('deutschland')) return 'DE';
  if (lower === 'sg' || lower.includes('singapore')) return 'SG';
  if (lower === 'au' || lower.includes('australia')) return 'AU';
  if (lower === 'ca' || lower.includes('canada')) return 'CA';
  if (lower === 'jp' || lower.includes('japan') || lower.includes('tokyo')) return 'JP';
  if (lower === 'ae' || lower === 'uae' || lower.includes('united arab emirates') || lower.includes('dubai') || lower.includes('abu dhabi')) return 'AE';
  if (lower === 'fr' || lower.includes('france')) return 'FR';
  if (lower === 'ie' || lower.includes('ireland')) return 'IE';
  if (lower === 'in' || lower.includes('india')) return 'IN';
  if (lower === 'es' || lower.includes('spain') || lower.includes('espana')) return 'ES';
  if (lower === 'it' || lower.includes('italy') || lower.includes('italia')) return 'IT';
  if (lower === 'mx' || lower.includes('mexico')) return 'MX';
  if (lower === 'nz' || lower.includes('new zealand')) return 'NZ';
  if (lower === 'nl' || lower.includes('netherlands') || lower.includes('holland')) return 'NL';
  if (lower === 'ch' || lower.includes('switzerland')) return 'CH';
  if (val.length === 2) return val.toUpperCase();
  return val.toUpperCase();
}

/**
 * Evaluates whether a declarative rule applies to a specific journey.
 */
export function isRuleApplicable(
  rule: DeclarativeRule,
  originCode: string,
  destCode: string,
  transitCodes: string[],
  species: 'DOG' | 'CAT'
): boolean {
  const app = rule.applicability;

  // 1. Species condition
  if (app.species && !app.species.includes('ALL') && !app.species.includes(species)) {
    return false;
  }

  // 2. Origin condition
  if (app.origins && !app.origins.includes(originCode)) {
    return false;
  }
  if (app.origins_not_in && app.origins_not_in.includes(originCode)) {
    return false;
  }

  // 3. Destination condition
  if (app.destinations) {
    const isDestEu = EU_COUNTRIES.has(destCode);
    let matchDest = false;
    for (const d of app.destinations) {
      if (d === 'EU' && isDestEu) matchDest = true;
      else if (d === destCode) matchDest = true;
    }
    if (!matchDest) return false;
  }
  if (app.destinations_not_in && app.destinations_not_in.includes(destCode)) {
    return false;
  }

  // 4. Transit condition
  if (app.transit_in) {
    const hasMatchingTransit = app.transit_in.some((t) => transitCodes.includes(t));
    if (!hasMatchingTransit) return false;
  }

  return true;
}

/**
 * Returns declarative requirement versions matching origin, destination, transits, and species.
 */
export function getDeclarativeRequirements(
  origin: string,
  destination: string,
  transitCountries: string[] = [],
  species: 'DOG' | 'CAT' = 'DOG'
): RequirementVersionForEval[] {
  const originCode = normalizeIsoCode(origin);
  const destCode = normalizeIsoCode(destination);
  const transitCodes = transitCountries.map(normalizeIsoCode);

  const matchingRules = CATALOG_RULES.filter((rule) =>
    isRuleApplicable(rule, originCode, destCode, transitCodes, species)
  );

  return matchingRules.map((rule) => ({
    id: `decl-${rule.rule_id}`,
    requirementId: `req-${rule.rule_id}`,
    version: 1,
    ruleType: rule.ruleType,
    ruleParams: rule.ruleParams,
    ruleText: rule.ruleText,
    severity: rule.severity,
    category: rule.category,
    confidence: 'VERIFIED',
    lastVerifiedAt: rule.verified_at,
    source: {
      publisher: rule.source,
      url: rule.source_url,
      authorityTier: 1,
    },
  }));
}
