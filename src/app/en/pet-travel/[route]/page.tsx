import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getCurrentRequirementVersions } from '@/lib/requirements/queries';
import FreshnessIndicator from '@/components/FreshnessIndicator';
import BrowseRequirementsChecklist from '@/components/BrowseRequirementsChecklist';
import { getFaqSchema, getBreadcrumbSchema, getHowToSchema } from '@/lib/seo/schema';
import { CORRIDORS } from '@/lib/data/corridors';

interface StatutoryRule {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  severity: 'BLOCKING' | 'NON_BLOCKING';
  rules: string[];
  protocol: string;
  sourceName: string;
  sourceUrl: string;
  lastVerifiedAt: string;
}

interface TimelineStep {
  step: number;
  timing: string;
  title: string;
  description: string;
}

interface RouteIntelligence {
  from: string;
  to: string;
  originCode: string;
  destCode: string;
  region: string;
  authority: string;
  legalBasis: string;
  description: string;
  titerRequired: string;
  titerStatus: 'exempt' | 'mandatory' | 'conditional';
  titerDetail: string;
  quarantineDays: string;
  quarantineDetail: string;
  leadTime: string;
  leadTimeDetail: string;
  certificateType: string;
  certificateDetail: string;
  entryAirports: string[];
  restrictedBreeds?: string[];
  timelineSteps: TimelineStep[];
  faqs: Array<{ q: string; a: string }>;
  statutoryRequirements: StatutoryRule[];
}

export const ROUTE_DATA: Record<string, RouteIntelligence> = {
  ...CORRIDORS,
  'usa-to-germany': {
    from: 'United States',
    to: 'Germany',
    originCode: 'US',
    destCode: 'DE',
    region: 'North America → European Union',
    authority: 'German Federal Ministry of Food and Agriculture (BMEL) & European Commission (DG SANTE)',
    legalBasis: 'Regulation (EU) No 576/2013 & Commission Implementing Regulation (EU) No 577/2013',
    description: 'Statutory non-commercial entry regulations for traveling with dogs and cats from the USA to Germany. Verified against official German BMEL and European Union border control statutes.',
    titerRequired: 'Exempt / Not Required',
    titerStatus: 'exempt',
    titerDetail: 'The US is listed as a rabies-controlled third country in Annex II of EU Reg 577/2013. No 30-day waiting period or 3-month RNATT blood titer test is required for direct travel.',
    quarantineDays: '0 Days Quarantine',
    quarantineDetail: 'Direct release upon customs clearance at any approved German Border Inspection Post (FRA, MUC, BER). No quarantine facility stay required.',
    leadTime: '21 Days Minimum',
    leadTimeDetail: 'Primary rabies vaccination requires a mandatory 21-day latency window before travel. Valid boosters administered within active duration have no waiting period.',
    certificateType: 'EU Non-Commercial Health Certificate (Annex IV)',
    certificateDetail: 'Must be issued by a USDA-accredited veterinarian and officially endorsed via USDA APHIS VEHCS within 10 days of scheduled EU arrival.',
    entryAirports: ['Frankfurt Airport (FRA)', 'Munich Airport (MUC)', 'Berlin Brandenburg (BER)', 'Hamburg (HAM)', 'Düsseldorf (DUS)'],
    restrictedBreeds: ['Pitbull Terrier', 'American Staffordshire Terrier', 'Staffordshire Bull Terrier', 'Bull Terrier (and crossbreeds) under HundVerbrEinfG statutory import ban'],
    timelineSteps: [
      {
        step: 1,
        timing: 'Earliest Step',
        title: 'ISO Microchip Implantation',
        description: 'Implant a standard 15-digit ISO 11784/11785 compliant microchip. Must occur strictly before rabies vaccination.',
      },
      {
        step: 2,
        timing: 'At Least 21 Days Before Arrival',
        title: 'Rabies Vaccination & Latency',
        description: 'Administer rabies vaccination. The 21-day waiting period starts on the day after injection (Day 0).',
      },
      {
        step: 3,
        timing: 'Within 10 Days of Arrival',
        title: 'USDA Vet Exam & VEHCS Endorsement',
        description: 'USDA-accredited vet issues the EU Annex IV certificate. Submit electronically through VEHCS for USDA endorsement.',
      },
      {
        step: 4,
        timing: 'Flight Day at German Airport',
        title: 'German Customs Declaration',
        description: 'Exit via Red Customs Channel ("Goods to Declare / Zoll") at Frankfurt or Munich airport for official document and microchip check.',
      },
    ],
    faqs: [
      {
        q: 'Do I need an EU Pet Passport if my pet resides in the United States?',
        a: 'No. EU Pet Passports can only be issued by authorized veterinarians within the European Union. US-resident pets enter Germany on the official EU Non-Commercial Health Certificate (Annex IV) endorsed by USDA APHIS.',
      },
      {
        q: 'Can my dog enter Germany with a 3-year rabies vaccination?',
        a: 'Yes, 3-year rabies vaccines are fully recognized by German authorities, provided the vaccine was administered strictly after the microchip implantation and remains within the manufacturer’s stated validity period.',
      },
      {
        q: 'What happens at German airport customs upon arrival?',
        a: 'Pet travelers must proceed through the Red Customs Channel ("Goods to Declare / Zoll") at the airport. A border customs official or official veterinarian will verify the microchip transponder with a handheld scanner and examine the endorsed EU Annex IV certificate.',
      },
      {
        q: 'Are cats subject to tapeworm (Echinococcus) treatment when traveling to Germany?',
        a: 'No. Tapeworm treatment is not required for cats or dogs traveling directly to Germany from the United States (unlike travel to the UK, Ireland, Finland, Norway, or Malta).',
      },
    ],
    statutoryRequirements: [
      {
        id: 'de-req-microchip',
        category: 'MICROCHIP',
        categoryLabel: 'ISO 11784/11785 Microchip',
        title: 'Microchip Identification Transponder',
        severity: 'BLOCKING',
        rules: [
          'ISO 11784/11785 compliant 15-digit microchip (transponder) is required.',
          'Microchip must be implanted strictly prior to or on the same day as the rabies vaccination.',
          'Microchip number must be readable by standard HDX or FDX-B scanners at German Border Inspection Posts.',
        ],
        protocol: 'Sequence Mandatory: Microchip MUST be implanted and verified strictly prior to rabies vaccination. Any vaccine administered before microchipping is legally invalid in the European Union.',
        sourceName: 'European Commission — Non-Commercial Movement of Pets',
        sourceUrl: 'https://ec.europa.eu/food/animals/pet-movement/eu-legislation/non-commercial-non-eu_en',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'de-req-rabies',
        category: 'RABIES_VACCINATION',
        categoryLabel: 'Rabies Immunization Protocol',
        title: 'Rabies Vaccination & 21-Day Latency Window',
        severity: 'BLOCKING',
        rules: [
          'Valid rabies vaccination administered by an accredited veterinarian after microchip implantation.',
          'Pet must be at least 12 weeks old at the time of primary vaccination.',
          'At least 21 days must elapse between the primary rabies vaccination and arrival in Germany.',
        ],
        protocol: '21-Day Wait Rule: The primary rabies vaccination is legally effective starting on Day 22 (Day 0 = date of injection). Valid booster shots administered within the manufacturer validity duration have no waiting period.',
        sourceName: 'German Federal Ministry of Food and Agriculture (BMEL)',
        sourceUrl: 'https://www.bmel.de/EN/topics/animals/pets/pets_node.html',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'de-req-health-cert',
        category: 'HEALTH_CERTIFICATE',
        categoryLabel: 'EU Health Certificate (Annex IV)',
        title: 'USDA-Accredited Health Certificate & Endorsement',
        severity: 'BLOCKING',
        rules: [
          'EU-format non-commercial veterinary health certificate (Annex IV) completed in English and German.',
          'Issued by a USDA-accredited veterinarian following clinical examination.',
          'Endorsed electronically via USDA APHIS VEHCS within 10 days of scheduled EU arrival.',
        ],
        protocol: '10-Day Endorsement Window: Completed by a USDA-accredited veterinarian and officially endorsed via USDA APHIS VEHCS within 10 days of scheduled EU arrival.',
        sourceName: 'USDA APHIS Pet Travel to Germany',
        sourceUrl: 'https://www.aphis.usda.gov/aphis/pet-travel/by-country/eu/eu-echc/germany',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'de-req-tapeworm',
        category: 'TAPEWORM_TREATMENT',
        categoryLabel: 'Echinococcus Multilocularis Protocol',
        title: 'Tapeworm Advisory for Transiting Pets',
        severity: 'NON_BLOCKING',
        rules: [
          'Direct entry from the USA into Germany does not mandate preventive tapeworm treatment.',
          'Transiting pets: Dogs continuing travel to the UK, Ireland, Finland, Norway, or Malta mandate veterinary praziquantel treatment within 24 to 120 hours.',
        ],
        protocol: 'Route Advisory: Direct arrival at Frankfurt (FRA), Munich (MUC), or Berlin (BER) has no tapeworm mandate. Verify onward European connection requirements.',
        sourceName: 'German Federal Ministry of Food and Agriculture (BMEL)',
        sourceUrl: 'https://www.bmel.de/EN/topics/animals/pets/pets_node.html',
        lastVerifiedAt: 'September 4, 2026',
      },
    ],
  },
  'usa-to-uk': {
    from: 'United States',
    to: 'United Kingdom',
    originCode: 'US',
    destCode: 'GB',
    region: 'North America → Great Britain',
    authority: 'UK Animal and Plant Health Agency (APHA) & DEFRA',
    legalBasis: 'UK Non-Commercial Movement of Pet Animals Order & Retained Regulation (EU) 576/2013',
    description: 'Comprehensive pet import regulations for dogs, cats, and ferrets traveling from the USA to Great Britain under the UK Pet Travel Scheme (PETS).',
    titerRequired: 'Exempt / Not Required',
    titerStatus: 'exempt',
    titerDetail: 'The United States is recognized as a Part 2 listed country under UK regulations. No rabies blood titer (RNATT) test is required.',
    quarantineDays: '0 Days Quarantine',
    quarantineDetail: 'Zero quarantine when entering on an approved transport company and route with compliant Great Britain Pet Health Certificate.',
    leadTime: '21 Days Minimum',
    leadTimeDetail: '21-day latency period for primary rabies vaccine, plus a strictly timed veterinary tapeworm treatment 1 to 5 days prior to arrival.',
    certificateType: 'Great Britain Pet Health Certificate',
    certificateDetail: 'Must be issued by a USDA-accredited veterinarian and officially endorsed by USDA APHIS within 10 days of departure.',
    entryAirports: ['London Heathrow (LHR)', 'London Gatwick (LGW)', 'Manchester (MAN)', 'Edinburgh (EDI)'],
    restrictedBreeds: ['XL Bully', 'Pitbull Terrier', 'Japanese Tosa', 'Dogo Argentino', 'Fila Brasileiro (Dangerous Dogs Act 1991)'],
    timelineSteps: [
      {
        step: 1,
        timing: 'Day -30 or Earlier',
        title: 'ISO Microchip & Rabies Vaccination',
        description: 'Implant 15-digit ISO microchip, followed immediately by rabies vaccination with a 21-day latency period.',
      },
      {
        step: 2,
        timing: 'Day -20 to -14',
        title: 'Approved Route & Cargo Booking',
        description: 'Commercial airlines require manifest cargo booking into London Heathrow (HARC), Gatwick, or Manchester Animal Reception Centres.',
      },
      {
        step: 3,
        timing: 'Day -5 to Day -1 (24–120h Window)',
        title: 'Tapeworm (Praziquantel) Treatment',
        description: 'USDA vet administers praziquantel and records exact date and time on the Great Britain Health Certificate.',
      },
      {
        step: 4,
        timing: 'Within 10 Days of Arrival',
        title: 'USDA APHIS VEHCS Endorsement',
        description: 'Submit health certificate through USDA VEHCS for federal endorsement prior to flight departure.',
      },
    ],
    faqs: [
      {
        q: 'What is the mandatory tapeworm treatment window for dogs entering the UK?',
        a: 'Dogs must receive an approved praziquantel tapeworm treatment administered by a licensed veterinarian between 24 and 120 hours (1 to 5 days) before the scheduled arrival time in the UK.',
      },
      {
        q: 'Can pets fly in-cabin on commercial flights to the UK?',
        a: 'No commercial airline is permitted to carry pets into the UK in passenger cabins (except certified assistance dogs). Pets must travel as manifest cargo under IATA Live Animals Regulations, or via authorized pet courier routes.',
      },
      {
        q: 'Does Great Britain accept EU Pet Passports issued in the EU?',
        a: 'Yes, Great Britain accepts valid EU Pet Passports issued in EU member states, provided the rabies vaccination was administered and recorded by an authorized EU veterinarian.',
      },
      {
        q: 'Are cats required to have tapeworm treatment for the UK?',
        a: 'No. The Echinococcus tapeworm treatment rule strictly applies to dogs. Cats and ferrets entering the UK do not require tapeworm medication.',
      },
    ],
    statutoryRequirements: [
      {
        id: 'uk-req-microchip',
        category: 'MICROCHIP',
        categoryLabel: 'ISO 11784/11785 Microchip',
        title: 'Microchip Identification',
        severity: 'BLOCKING',
        rules: [
          'ISO 11784/11785 compliant 15-digit microchip must be implanted before rabies vaccination.',
          'Microchip number must match all veterinary records and cargo airway bills exactly.',
        ],
        protocol: 'Sequence Mandatory: Microchip must be implanted before rabies vaccination. Any vaccination prior to microchipping is invalid in the UK.',
        sourceName: 'UK Animal and Plant Health Agency (APHA)',
        sourceUrl: 'https://www.gov.uk/bring-pet-to-great-britain',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'uk-req-rabies',
        category: 'RABIES_VACCINATION',
        categoryLabel: 'Rabies Immunization Protocol',
        title: 'Rabies Vaccination & 21-Day Wait',
        severity: 'BLOCKING',
        rules: [
          'Valid rabies vaccination administered by an accredited vet after microchipping.',
          'Pet must be at least 12 weeks old at the time of primary vaccination.',
          'At least 21 days must elapse after primary vaccination before entering Great Britain.',
        ],
        protocol: '21-Day Wait Rule: The primary rabies vaccination becomes valid on Day 22. Valid continuous booster shots have no waiting period.',
        sourceName: 'UK DEFRA',
        sourceUrl: 'https://www.gov.uk/bring-pet-to-great-britain',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'uk-req-tapeworm',
        category: 'TAPEWORM_TREATMENT',
        categoryLabel: 'Echinococcus Multilocularis Protocol',
        title: 'Mandatory Tapeworm Treatment (24–120 Hours)',
        severity: 'BLOCKING',
        rules: [
          'Approved praziquantel tapeworm treatment administered by a licensed veterinarian.',
          'Treatment must be administered between 24 and 120 hours (1 to 5 days) before scheduled arrival in the UK.',
          'Veterinarian must explicitly record the product name, date, and exact time of administration.',
        ],
        protocol: 'Strict Window: Must be given not less than 24 hours and not more than 120 hours before UK arrival. Failure results in border quarantine or refusal.',
        sourceName: 'UK DEFRA Pet Travel Scheme',
        sourceUrl: 'https://www.gov.uk/bring-pet-to-great-britain',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'uk-req-health-cert',
        category: 'HEALTH_CERTIFICATE',
        categoryLabel: 'Great Britain Health Certificate',
        title: 'USDA-Accredited Health Certificate & Endorsement',
        severity: 'BLOCKING',
        rules: [
          'Official Great Britain Pet Health Certificate completed by a USDA-accredited veterinarian.',
          'Officially endorsed by USDA APHIS within 10 days of arrival in the UK.',
        ],
        protocol: '10-Day Endorsement Window: Issued and federally endorsed by USDA APHIS within 10 days of scheduled UK entry.',
        sourceName: 'USDA APHIS Pet Travel to Great Britain',
        sourceUrl: 'https://www.aphis.usda.gov/aphis/pet-travel/by-country/united-kingdom',
        lastVerifiedAt: 'September 4, 2026',
      },
    ],
  },
  'usa-to-australia': {
    from: 'United States',
    to: 'Australia',
    originCode: 'US',
    destCode: 'AU',
    region: 'North America → Oceania',
    authority: 'Australian Department of Agriculture, Fisheries and Forestry (DAFF)',
    legalBasis: 'Biosecurity Act 2015 & Group 3 Approved Country Non-Commercial Import Conditions',
    description: 'Rigorous biosecurity requirements for importing pets from the USA into Australia. Australia is rabies-free with mandatory post-entry quarantine.',
    titerRequired: 'Mandatory Blood Titer (RNATT)',
    titerStatus: 'mandatory',
    titerDetail: 'Mandatory Rabies Neutralising Antibody Titre (RNATT) test with antibody level ≥ 0.5 IU/ml, followed by a mandatory 180-day waiting period before export.',
    quarantineDays: '10 to 30 Days Quarantine',
    quarantineDetail: 'Mandatory stay at the Mickleham Post-Entry Quarantine (PEQ) Facility in Melbourne. Reservations must be secured months in advance.',
    leadTime: '7 Months Minimum',
    leadTimeDetail: 'Due to the 180-day post-titer waiting duration and DAFF Import Permit processing times, preparations must begin at least 7 months prior to travel.',
    certificateType: 'DAFF Import Permit & USDA APHIS Form',
    certificateDetail: 'Requires a formal DAFF Import Permit approved in Canberra, plus multi-stage veterinary health certificates endorsed by USDA APHIS.',
    entryAirports: ['Melbourne Tullamarine (MEL) — Direct PEQ Transfer Only'],
    timelineSteps: [
      {
        step: 1,
        timing: 'Month -7 (180+ Days Out)',
        title: 'Microchip & RNATT Blood Titer Draw',
        description: 'USDA vet scans microchip and draws blood for RNATT test. 180-day countdown begins on the date the sample arrives at an approved lab.',
      },
      {
        step: 2,
        timing: 'Month -5 to -4',
        title: 'DAFF Import Permit Application',
        description: 'Submit online application through Australian DAFF BICON system with passing titer result (≥ 0.5 IU/ml). Allow 20–30 business days.',
      },
      {
        step: 3,
        timing: 'Month -3',
        title: 'Mickleham PEQ Quarantine Booking',
        description: 'Reserve post-entry quarantine space at the Mickleham Quarantine Facility in Melbourne immediately upon permit issuance.',
      },
      {
        step: 4,
        timing: 'Month -1 to Departure',
        title: 'Parasite Treatments & Final USDA Exam',
        description: 'Complete mandatory internal/external parasite treatments at prescribed intervals and obtain USDA APHIS endorsed final health certificate.',
      },
    ],
    faqs: [
      {
        q: 'Can pets fly into Sydney or Brisbane when relocating to Australia?',
        a: 'No. All cats and dogs entering Australia must arrive directly into Melbourne Airport (MEL) for immediate transfer to the Mickleham Post-Entry Quarantine Facility.',
      },
      {
        q: 'How long is the mandatory quarantine stay in Australia?',
        a: 'Pets from the US completing all pre-export requirements and blood tests accurately qualify for the minimum 10-day quarantine stay. If requirements are missing, stay may extend to 30 days.',
      },
      {
        q: 'What is the RNATT blood titer requirement?',
        a: 'The pet must test with a rabies neutralising antibody level of 0.5 IU/ml or greater at an approved laboratory. The pet cannot enter Australia until at least 180 days have passed since the blood draw date.',
      },
      {
        q: 'Can pets travel in passenger cabins to Australia?',
        a: 'No. Australian biosecurity regulations mandate that all companion animals enter as manifest air cargo directly into Melbourne.',
      },
    ],
    statutoryRequirements: [
      {
        id: 'au-req-microchip',
        category: 'MICROCHIP',
        categoryLabel: 'ISO 11784/11785 Microchip',
        title: 'Microchip Implantation & Verification',
        severity: 'BLOCKING',
        rules: [
          'ISO 11784/11785 compliant microchip implanted prior to rabies vaccination and RNATT blood draw.',
          'Microchip must be scanned at every veterinary visit and recorded on all laboratory reports.',
        ],
        protocol: 'Identity Integrity: Blood drawn before microchip verification will be rejected by Australian biosecurity officials.',
        sourceName: 'Australian DAFF Biosecurity',
        sourceUrl: 'https://www.agriculture.gov.au/biosecurity-trade/cats-dogs',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'au-req-titer',
        category: 'TITER_TEST',
        categoryLabel: 'RNATT Antibody Titer & 180-Day Wait',
        title: 'Rabies Blood Titer (RNATT) & 180-Day Duration',
        severity: 'BLOCKING',
        rules: [
          'Blood draw for RNATT test performed by a USDA-accredited vet and tested at an approved lab (e.g. Kansas State University).',
          'Antibody titer result must be ≥ 0.5 IU/ml.',
          'Mandatory 180-day waiting period from the date of blood collection before flight departure.',
        ],
        protocol: 'Critical 180-Day Timeline: Entry into Australia cannot occur before 180 days have elapsed from the laboratory blood draw date.',
        sourceName: 'Australian DAFF Biosecurity',
        sourceUrl: 'https://www.agriculture.gov.au/biosecurity-trade/cats-dogs',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'au-req-import-permit',
        category: 'IMPORT_PERMIT',
        categoryLabel: 'DAFF Biosecurity Import Permit',
        title: 'Australian Government Import Permit',
        severity: 'BLOCKING',
        rules: [
          'Formal import permit application submitted online through the DAFF BICON system.',
          'Permit takes 20 to 30 Australian business days to process.',
        ],
        protocol: 'Advance Authorization: Must be granted before booking quarantine facility or arranging final export flight booking.',
        sourceName: 'Australian DAFF BICON',
        sourceUrl: 'https://bicon.agriculture.gov.au/BiconWeb4.0',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'au-req-peq',
        category: 'QUARANTINE_BOOKING',
        categoryLabel: 'Post-Entry Quarantine (PEQ)',
        title: 'Mickleham Quarantine Reservation & Final Exam',
        severity: 'BLOCKING',
        rules: [
          'Confirmed booking at the Mickleham Post-Entry Quarantine Facility in Melbourne.',
          'Mandatory internal/external parasite treatments at statutory intervals within 28 days of export.',
          'Final USDA APHIS endorsed veterinary health certificate.',
        ],
        protocol: 'Direct Port Arrival: All companion animals must land at Melbourne Airport (MEL) for bonded transfer to Mickleham.',
        sourceName: 'Australian DAFF PEQ Operations',
        sourceUrl: 'https://www.agriculture.gov.au/biosecurity-trade/cats-dogs/quarantine-facilities',
        lastVerifiedAt: 'September 4, 2026',
      },
    ],
  },
  'usa-to-canada': {
    from: 'United States',
    to: 'Canada',
    originCode: 'US',
    destCode: 'CA',
    region: 'North America Cross-Border',
    authority: 'Canadian Food Inspection Agency (CFIA)',
    legalBasis: 'Health of Animals Act & Regulations, Section 51',
    description: 'Cross-border import requirements for bringing companion dogs and cats from the United States into Canada via air or land border crossings.',
    titerRequired: 'Exempt / Not Required',
    titerStatus: 'exempt',
    titerDetail: 'No rabies titer test or quarantine is required for pets entering Canada from the USA.',
    quarantineDays: '0 Days Quarantine',
    quarantineDetail: 'Zero quarantine. Pets are released directly to owners upon CBSA inspection at the port of entry.',
    leadTime: 'Current Rabies Certificate',
    leadTimeDetail: 'Valid rabies vaccination certificate signed by a licensed veterinarian. No 21-day latency wait is imposed on adult pets entering from the USA.',
    certificateType: 'Official Rabies Vaccination Certificate',
    certificateDetail: 'Standard rabies certificate or USDA APHIS international health certificate detailing microchip, vaccine manufacturer, lot, and duration.',
    entryAirports: ['Toronto Pearson (YYZ)', 'Vancouver (YVR)', 'Montreal (YUL)', 'All Land Border Crossings'],
    timelineSteps: [
      {
        step: 1,
        timing: 'Day -30 or Earlier',
        title: 'Microchip Identification',
        description: 'Implant an ISO 11784/11785 standard 15-digit microchip. Recommended for all pets, required for commercial imports.',
      },
      {
        step: 2,
        timing: 'Prior to Travel',
        title: 'Rabies Vaccination Status Check',
        description: 'Ensure rabies vaccination is active and certificate is signed by a licensed veterinarian.',
      },
      {
        step: 3,
        timing: 'Within 30 Days of Travel',
        title: 'Veterinary Health Inspection',
        description: 'Have a licensed vet verify that the pet is clinically healthy and free of contagious diseases.',
      },
      {
        step: 4,
        timing: 'Port of Entry Arrival',
        title: 'CBSA Customs Clearance',
        description: 'Present pet and rabies certificate to Canada Border Services Agency (CBSA) officer at airport or land border crossing.',
      },
    ],
    faqs: [
      {
        q: 'Do dogs need a microchip to enter Canada from the US?',
        a: 'Microchips are highly recommended for all pets entering Canada and are mandatory for commercial shipments or specific service animals, though commercial pet travel requires microchip documentation.',
      },
      {
        q: 'Does Canada impose a 21-day rabies waiting period for US pets?',
        a: 'No. Adult dogs and cats entering Canada from the United States do not face a 21-day waiting period after a rabies vaccine, provided the vaccine certificate is current and valid on travel day.',
      },
      {
        q: 'Can I bring my pet across the US-Canada land border by car?',
        a: 'Yes. Cross-border pet travel by car is straightforward. Present the pet’s valid rabies certificate and identification directly to the CBSA officer at the border booth.',
      },
      {
        q: 'What is the minimum age for puppies or kittens entering Canada?',
        a: 'Puppies and kittens must be at least 3 months old to receive their rabies vaccination, which is mandatory for entry into Canada.',
      },
    ],
    statutoryRequirements: [
      {
        id: 'ca-req-rabies',
        category: 'RABIES_VACCINATION',
        categoryLabel: 'Rabies Immunization',
        title: 'Valid Rabies Vaccination Certificate',
        severity: 'BLOCKING',
        rules: [
          'Pet must be accompanied by a valid rabies vaccination certificate issued and signed by a licensed veterinarian.',
          'Certificate must clearly specify pet breed, sex, color, weight, microchip, vaccine manufacturer, lot, and duration.',
          'Canada recognizes both 1-year and 3-year rabies vaccines within manufacturer stated duration.',
        ],
        protocol: 'Continuous Validity: Rabies vaccination certificate must be current on the date of entry into Canada.',
        sourceName: 'Canadian Food Inspection Agency (CFIA)',
        sourceUrl: 'https://inspection.canada.ca/animal-health/terrestrial-animals/imports/import-policies/live-animals/pet-imports',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'ca-req-microchip',
        category: 'MICROCHIP',
        categoryLabel: 'ISO Microchip Identification',
        title: 'Microchip Identification Standards',
        severity: 'NON_BLOCKING',
        rules: [
          'ISO 11784/11785 compliant 15-digit microchip strongly recommended for companion pets.',
          'Mandatory for commercial pet travel or unaccompanied cargo shipments.',
        ],
        protocol: 'Identification Standard: Having a matching microchip number eliminates border inspection delays with CBSA.',
        sourceName: 'Canada Border Services Agency (CBSA)',
        sourceUrl: 'https://www.cbsa-asfc.gc.ca',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'ca-req-health-exam',
        category: 'HEALTH_CERTIFICATE',
        categoryLabel: 'Clinical Health Inspection',
        title: 'Veterinary Health & Welfare Inspection',
        severity: 'BLOCKING',
        rules: [
          'Pet must appear clinically healthy and free of communicable diseases upon physical inspection.',
          'Subject to a standard CBSA animal inspection fee at the port of entry.',
        ],
        protocol: 'Port Clearance: Pets with visible signs of illness may be referred to an official CFIA veterinarian at owner expense.',
        sourceName: 'CFIA Health of Animals Regulations',
        sourceUrl: 'https://inspection.canada.ca',
        lastVerifiedAt: 'September 4, 2026',
      },
    ],
  },
  'usa-to-japan': {
    from: 'United States',
    to: 'Japan',
    originCode: 'US',
    destCode: 'JP',
    region: 'North America → East Asia',
    authority: 'Japan Ministry of Agriculture, Forestry and Fisheries (MAFF) Animal Quarantine Service (AQS)',
    legalBasis: 'Rabies Prevention Law & Domestic Animal Infectious Diseases Control Act',
    description: 'Strict import standards for companion animals entering Japan. Japan is rabies-free; pets without compliant advance documentation face up to 180 days of quarantine.',
    titerRequired: 'Mandatory FAVN/RNATT Test',
    titerStatus: 'mandatory',
    titerDetail: 'Requires 2 rabies vaccinations followed by a FAVN blood titer test (≥ 0.5 IU/ml) at a designated laboratory (e.g. KSU-VBSL), plus a 180-day waiting period.',
    quarantineDays: '0 to 12 Hours (if compliant)',
    quarantineDetail: 'If the 180-day waiting period is satisfied in the US, port-of-entry quarantine is completed within 12 hours. Non-compliant pets face 180 days of detention.',
    leadTime: '7 to 8 Months Minimum',
    leadTimeDetail: 'Preparations require at least 7 months to complete 2 vaccinations, FAVN blood draw, 180-day wait, and 40-day advance notification to Japanese AQS.',
    certificateType: 'MAFF Form A/C & USDA VEHCS Endorsement',
    certificateDetail: 'Japan MAFF Form A & C health certificates completed by a USDA-accredited vet and endorsed by USDA APHIS.',
    entryAirports: ['Tokyo Narita (NRT)', 'Tokyo Haneda (HND)', 'Osaka Kansai (KIX)', 'Nagoya Chubu (NGO)'],
    timelineSteps: [
      {
        step: 1,
        timing: 'Month -8 (210+ Days Out)',
        title: 'Microchip & Dual Rabies Vaccines',
        description: 'Implant ISO microchip, administer first rabies shot, and administer second rabies shot at least 30 days later.',
      },
      {
        step: 2,
        timing: 'Month -7 (180+ Days Out)',
        title: 'FAVN Blood Titer Test & 180-Day Wait',
        description: 'Draw blood for FAVN test at accredited vet. 180-day countdown starts on the blood draw date.',
      },
      {
        step: 3,
        timing: 'Day -40 Before Arrival',
        title: '40-Day Advance Notification to AQS',
        description: 'Submit formal import notice to Animal Quarantine Service at intended entry airport. Receive approval code.',
      },
      {
        step: 4,
        timing: 'Within 10 Days of Departure',
        title: 'USDA Exam & MAFF Form Endorsement',
        description: 'USDA-accredited vet completes MAFF Form A & C. Endorsed by USDA APHIS via VEHCS.',
      },
    ],
    faqs: [
      {
        q: 'What is the 40-Day Advance Notification requirement for Japan?',
        a: 'Travelers must submit an official "Notification for Import Inspection of Dogs/Cats" to the Animal Quarantine Service (AQS) at the intended port of entry at least 40 days prior to arrival. AQS will issue an "Approval of Inspection" which must be presented at airline check-in.',
      },
      {
        q: 'Why does Japan require two rabies vaccinations?',
        a: 'Under the Japanese Rabies Prevention Law, companion animals must have two lifetime rabies vaccinations administered with killed or recombinant virus at least 30 days apart, both given after microchip implantation.',
      },
      {
        q: 'What happens if the 180-day waiting period is not completed before flying to Japan?',
        a: 'If a pet arrives in Japan before the 180 days elapse, the pet will be quarantined at an AQS quarantine facility for the remainder of the 180 days at the owner’s substantial expense.',
      },
      {
        q: 'How fast is customs clearance at Narita or Haneda if all paperwork is compliant?',
        a: 'Compliant pets with approved advance notification and satisfied 180-day wait are released within 2 to 12 hours after physical transponder and document verification.',
      },
    ],
    statutoryRequirements: [
      {
        id: 'jp-req-microchip',
        category: 'MICROCHIP',
        categoryLabel: 'ISO 11784/11785 Microchip',
        title: 'Microchip Implantation',
        severity: 'BLOCKING',
        rules: [
          'ISO 11784/11785 compliant microchip implanted prior to any qualifying rabies vaccination.',
          'Microchip number must be recorded on all vaccination records and AQS forms.',
        ],
        protocol: 'Sequence Mandatory: Any vaccine administered prior to microchip implantation is completely void under Japan MAFF regulations.',
        sourceName: 'Japan Animal Quarantine Service (AQS)',
        sourceUrl: 'https://www.maff.go.jp/aqs/english/animal/dog/index.html',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'jp-req-dual-rabies',
        category: 'RABIES_VACCINATION',
        categoryLabel: 'Dual Rabies Protocol',
        title: 'Two Inactivated Rabies Vaccinations',
        severity: 'BLOCKING',
        rules: [
          'Two lifetime rabies vaccinations administered with killed/recombinant virus at least 30 days apart.',
          'Both vaccinations must be administered after microchip implantation.',
        ],
        protocol: 'Spacing Mandate: Second vaccine must be given at least 30 days after the first and within its active duration.',
        sourceName: 'Japan MAFF Rabies Prevention Law',
        sourceUrl: 'https://www.maff.go.jp/aqs/english/animal/dog/index.html',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'jp-req-favn',
        category: 'TITER_TEST',
        categoryLabel: 'FAVN Rabies Antibody Titer',
        title: 'FAVN Blood Titer Test & 180-Day Wait',
        severity: 'BLOCKING',
        rules: [
          'Blood drawn by USDA-accredited vet and tested at a designated lab (KSU-VBSL or DOD).',
          'Antibody titer level must be ≥ 0.5 IU/ml.',
          'Pet must wait a minimum of 180 days in the US from blood collection before flight.',
        ],
        protocol: '180-Day Countdown: Calculated strictly from the blood draw date. Premature arrival results in airport quarantine.',
        sourceName: 'Japan Animal Quarantine Service (AQS)',
        sourceUrl: 'https://www.maff.go.jp/aqs/english/animal/dog/index.html',
        lastVerifiedAt: 'September 4, 2026',
      },
      {
        id: 'jp-req-notification',
        category: 'ADVANCE_NOTIFICATION',
        categoryLabel: '40-Day Advance Notification',
        title: 'Animal Quarantine Service Advance Notice & Form A/C',
        severity: 'BLOCKING',
        rules: [
          'Submit advance notification to AQS at port of entry at least 40 days prior to arrival.',
          'Obtain AQS Approval of Inspection.',
          'USDA APHIS endorsed Japan MAFF Form A & C health certificates.',
        ],
        protocol: 'Airline Clearance: Airlines will not issue boarding passes for pets to Japan without the AQS Approval Certificate.',
        sourceName: 'Japan MAFF & USDA APHIS',
        sourceUrl: 'https://www.aphis.usda.gov/aphis/pet-travel/by-country/japan',
        lastVerifiedAt: 'September 4, 2026',
      },
    ],
  },
};

interface RoutePageProps {
  params: Promise<{ route: string }>;
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { route } = await params;
  const display = ROUTE_DATA[route];

  if (!display) {
    return { title: 'Route Not Found | PawValid' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';
  const pageUrl = `${appUrl}/en/pet-travel/${route}`;
  const title = `Pet Travel: ${display.from} to ${display.to} — 2026 Requirements & Checklist | PawValid`;

  return {
    title,
    description: display.description,
    keywords: [
      `pet travel ${display.from} to ${display.to}`,
      `dog travel ${display.to}`,
      `cat travel ${display.to}`,
      `rabies titer ${display.to}`,
      `pet health certificate ${display.to}`,
      `pet passport ${display.from} to ${display.to}`,
      'pawvalid compliance',
    ],
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${appUrl}/en/pet-travel/${route}`,
        de: `${appUrl}/de/pet-travel/${route}`,
        fr: `${appUrl}/fr/pet-travel/${route}`,
        es: `${appUrl}/es/pet-travel/${route}`,
        'x-default': `${appUrl}/en/pet-travel/${route}`,
      },
    },
    openGraph: {
      title,
      description: display.description,
      url: pageUrl,
      siteName: 'PawValid Pet Travel Compliance',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/hero-dog-airport.jpg',
          width: 1200,
          height: 630,
          alt: `Pet travel requirements from ${display.from} to ${display.to}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@pawvalid',
      creator: '@pawvalid',
      title,
      description: display.description,
      images: ['/hero-dog-airport.jpg'],
    },
    other: {
      'geo.region': display.destCode,
      'geo.placename': display.to,
    },
  };
}

export async function generateStaticParams() {
  try {
    const routes = await db.route.findMany({
      where: { status: 'SUPPORTED' },
      select: { slug: true },
    });
    const dbSlugs = routes.map((r) => r.slug);
    const combined = Array.from(new Set([...Object.keys(ROUTE_DATA), ...dbSlugs]));
    return combined.map((slug) => ({ route: slug }));
  } catch {
    return Object.keys(ROUTE_DATA).map((slug) => ({ route: slug }));
  }
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { route } = await params;
  const display = ROUTE_DATA[route];

  if (!display) {
    return (
      <div className="section-container py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Route Not Found</h1>
        <p className="text-zinc-500 mb-6">This pet travel route is not currently available in our directory.</p>
        <Link href="/en/pet-travel" className="btn-primary inline-block">
          Browse Supported Routes →
        </Link>
      </div>
    );
  }

  // Fetch live requirements from database
  let dbRequirements: Awaited<ReturnType<typeof getCurrentRequirementVersions>> = [];
  try {
    dbRequirements = await getCurrentRequirementVersions(route, 'DOG');
  } catch {
    // fallback if DB connection fails
  }

  const checkerHref = `/en/checker?origin=${display.originCode}&destination=${display.destCode}&petType=DOG`;

  // Standard category display helper
  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'MICROCHIP':
        return {
          label: 'ISO 11784/11785 Microchip',
          icon: (
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21z" />
            </svg>
          ),
          protocol: 'Sequence Mandatory: Microchip MUST be implanted and scanned strictly prior to rabies vaccination. Any vaccine administered before microchipping is legally invalid in the European Union.',
        };
      case 'RABIES_VACCINATION':
        return {
          label: 'Rabies Immunization Protocol',
          icon: (
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          ),
          protocol: '21-Day Wait Rule: The primary rabies vaccination is legally effective for entry starting on Day 22 (Day 0 = injection date). Pet must be at least 12 weeks old at the time of injection.',
        };
      case 'HEALTH_CERTIFICATE':
        return {
          label: 'EU Health Certificate (Annex IV)',
          icon: (
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          ),
          protocol: '10-Day Endorsement Window: Completed by a USDA-accredited veterinarian and officially endorsed via USDA APHIS VEHCS within 10 days of scheduled EU arrival.',
        };
      case 'TAPEWORM_TREATMENT':
        return {
          label: 'Echinococcus Multilocularis Protocol',
          icon: (
            <svg className="w-4 h-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          ),
          protocol: 'Route Advisory: Direct entry into Germany from the USA does not mandate tapeworm treatment. However, dogs transiting through or continuing travel into the UK, Ireland, Norway, or Malta mandate praziquantel treatment within 24–120 hours.',
        };
      case 'TITER_TEST':
        return {
          label: 'Rabies Neutralising Antibody Titre (RNATT)',
          icon: (
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L4.2 15.3" />
            </svg>
          ),
          protocol: 'Laboratory Protocol: Blood drawn by accredited veterinarian and tested at an approved government-certified laboratory (result ≥ 0.5 IU/ml).',
        };
      case 'IMPORT_PERMIT':
        return {
          label: 'Government Import Authorization',
          icon: (
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-2.171-7.14a2.25 2.25 0 00-3.158 0L3.375 8.906a2.25 2.25 0 000 3.158l6.716 6.716a2.25 2.25 0 003.158 0l6.716-6.716a2.25 2.25 0 000-3.158L13.829 2.61z" />
            </svg>
          ),
          protocol: 'Advance Permit: Formal biosecurity permit granted by destination national authority prior to departure.',
        };
      case 'QUARANTINE_BOOKING':
        return {
          label: 'Post-Entry Quarantine Facility',
          icon: (
            <svg className="w-4 h-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1.09" />
            </svg>
          ),
          protocol: 'Direct Port Arrival: All companion animals must land at approved port for immediate bonded transfer to the quarantine facility.',
        };
      default:
        return {
          label: cat.replace(/_/g, ' '),
          icon: (
            <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          protocol: 'Compliance standard verified against destination regulatory authority statutes.',
        };
    }
  };

  // Group database requirements by category if present to prevent redundant headers
  const displayRequirements = (() => {
    if (dbRequirements.length > 0) {
      const grouped: Array<{
        id: string;
        category: string;
        categoryLabel: string;
        title: string;
        severity: 'BLOCKING' | 'NON_BLOCKING';
        rules: string[];
        protocol: string;
        sourceName: string;
        sourceUrl: string;
        lastVerifiedAt: string;
      }> = [];

      for (const req of dbRequirements) {
        const meta = getCategoryMeta(req.category);
        const existing = grouped.find((g) => g.category === req.category);
        if (existing) {
          if (!existing.rules.includes(req.ruleText)) {
            existing.rules.push(req.ruleText);
          }
          if (req.severity === 'BLOCKING') existing.severity = 'BLOCKING';
        } else {
          grouped.push({
            id: req.id,
            category: req.category,
            categoryLabel: meta.label,
            title: req.category.replace(/_/g, ' '),
            severity: req.severity === 'BLOCKING' ? 'BLOCKING' : 'NON_BLOCKING',
            rules: [req.ruleText],
            protocol: meta.protocol,
            sourceName: req.source.publisher,
            sourceUrl: req.source.url,
            lastVerifiedAt: typeof req.lastVerifiedAt === 'string' ? req.lastVerifiedAt : new Date(req.lastVerifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          });
        }
      }
      return grouped;
    }
    // Fall back to comprehensive curated route statutory requirements
    return display.statutoryRequirements;
  })();

  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pet Travel Routes', url: '/en/pet-travel' },
    { name: `${display.from} to ${display.to}`, url: `/en/pet-travel/${route}` },
  ]);

  const faqLd = getFaqSchema(display.faqs);

  const howToLd = getHowToSchema({
    title: `How to Travel with a Pet from ${display.from} to ${display.to}`,
    description: `Official regulatory step-by-step checklist to transport a dog or cat from ${display.from} to ${display.to} under ${display.legalBasis}.`,
    steps: display.timelineSteps.map((s) => ({
      step: s.step,
      title: s.title,
      description: `${s.timing}: ${s.description}`,
    })),
  });

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Pet Travel Requirements: ${display.from} to ${display.to}`,
    description: display.description,
    mainEntity: {
      '@type': 'GovernmentService',
      name: `Veterinary Pet Movement from ${display.from} to ${display.to}`,
      provider: {
        '@type': 'GovernmentOrganization',
        name: display.authority,
      },
      serviceType: 'International Animal Movement Compliance',
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />

      {/* ─── 1. BREADCRUMB & REGULATORY VERIFICATION BAR ────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-hidden text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/pet-travel" className="hover:text-zinc-900 transition-colors">Routes</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900 truncate">{display.from} → {display.to}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Verified Regulatory Directory • Updated 2026</span>
          </div>
        </div>
      </div>

      {/* ─── 2. ROUTE HERO HEADER ────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="section-container">
          {/* ISO Country Badges & Corridor Scope */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 mb-4 text-xs font-semibold text-zinc-700">
            <span className="px-1.5 py-0.5 rounded bg-[#0E2342] text-white text-[11px] font-bold tracking-wider">{display.originCode}</span>
            <span className="text-zinc-400">→</span>
            <span className="px-1.5 py-0.5 rounded bg-[#0E2342] text-white text-[11px] font-bold tracking-wider">{display.destCode}</span>
            <span className="text-zinc-300 font-normal">|</span>
            <span className="text-zinc-600 font-medium">{display.region}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
            Pet Travel Requirements:{' '}
            <span className="text-[#0E2342]">{display.from}</span> to{' '}
            <span className="text-[#0E2342]">{display.to}</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl leading-relaxed mb-6">
            {display.description}
          </p>

          {/* AEO Quick Answer / AI Direct Snippet Box */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-200/90 rounded-2xl p-5 sm:p-6 mb-8 shadow-xs">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Direct Answer / Statutory Summary
              </span>
              <span className="text-[11px] text-zinc-500 hidden sm:inline">• Verified for 2026 Entry</span>
            </div>
            
            <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed mb-4">
              <strong>Can I travel with my pet from {display.from} to {display.to}?</strong> Yes. Companion dogs and cats can enter {display.to} from {display.from} under non-commercial regulations established by {display.authority} ({display.legalBasis}). Entry requires an ISO 11784/11785 microchip, rabies vaccination with a {display.leadTime.toLowerCase()} waiting period, {display.titerRequired.toLowerCase()}, and an endorsed {display.certificateType}. Compliant pets are eligible for {display.quarantineDays.toLowerCase()}.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-emerald-200/60 text-xs">
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Rabies Titer</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">{display.titerRequired}</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Lead Time</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">{display.leadTime}</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Quarantine</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">{display.quarantineDays}</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Certificate</span>
                <span className="font-bold text-zinc-900 mt-0.5 block truncate" title={display.certificateType}>{display.certificateType}</span>
              </div>
            </div>
          </div>

          {/* Quick Authority Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span><strong>Authority:</strong> {display.authority}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span><strong>Statute:</strong> {display.legalBasis}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={checkerHref}
              className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-xs hover:shadow active:scale-98"
            >
              <span>Check Your Pet&apos;s Readiness for This Route</span>
              <span className="text-emerald-400">→</span>
            </Link>
            <a
              href="#statutory-checklist"
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium px-4 py-3 rounded-xl border border-zinc-300 transition-colors shadow-2xs"
            >
              <span>View Requirement Checklist</span>
              <span className="text-zinc-400">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 3. QUICK DECISION SUMMARY CARDS (4 PILLARS) ────────────────── */}
      <section className="py-10 bg-zinc-50/50 border-b border-zinc-200/80">
        <div className="section-container">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Quick Decision Summary</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              Key Route Factors at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Rabies Titer Test */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Rabies Titer (RNATT)</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  display.titerStatus === 'exempt'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {display.titerStatus === 'exempt' ? 'EXEMPT' : 'MANDATORY'}
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.titerRequired}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.titerDetail}
              </p>
            </div>

            {/* Card 2: Border Quarantine */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Border Quarantine</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  display.quarantineDays.startsWith('0')
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {display.quarantineDays.startsWith('0') ? 'FREE ENTRY' : 'MANDATORY PEQ'}
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.quarantineDays}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.quarantineDetail}
              </p>
            </div>

            {/* Card 3: Lead Time */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Preparation Window</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  MANDATORY
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.leadTime}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.leadTimeDetail}
              </p>
            </div>

            {/* Card 4: Required Document */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Required Document</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                  GOV SEAL
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.certificateType}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.certificateDetail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. STATUTORY REQUIREMENTS CHECKLIST ───────────────────────── */}
      <section id="statutory-checklist" className="py-12 sm:py-16">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Official Regulatory Standard</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
                Statutory Requirements Checklist
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Every requirement must be met in strict chronological order before departure.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-2xs">
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span>Interactive Self-Assessment</span>
              </div>
            </div>
          </div>

          <BrowseRequirementsChecklist
            routeSlug={route}
            origin={display.from}
            destination={display.to}
            originCode={display.originCode}
            destCode={display.destCode}
            authority={display.authority}
            legalBasis={display.legalBasis}
            leadTime={display.leadTime}
            titerRequired={display.titerRequired}
            quarantineDays={display.quarantineDays}
            certificateType={display.certificateType}
            requirements={displayRequirements}
            restrictedBreeds={display.restrictedBreeds}
          />
        </div>
      </section>

      {/* ─── 5. STEP-BY-STEP CHRONOLOGICAL ROADMAP ──────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Chronological Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              The 4-Step Preparation Timeline
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1.5">
              Follow this verified corridor timeline to prevent border delays or invalid document rejections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
            {display.timelineSteps.map((step) => (
              <div key={step.step} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 relative flex flex-col justify-between">
                <div>
                  <span className="w-7 h-7 rounded-full bg-[#0E2342] text-white font-bold text-xs flex items-center justify-center mb-3">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    {step.timing}
                  </span>
                  <h4 className="font-bold text-sm text-zinc-900 mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. RELATED REGULATORY MANUALS & DEEP DIVES ──────────────── */}
      <section className="py-10 bg-zinc-50 border-t border-zinc-200/80">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Official Compliance Manuals
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                Recommended Regulatory Guides for {display.from} → {display.to}
              </h2>
            </div>
            <Link
              href="/en/guides"
              className="text-xs font-semibold text-[#0E2342] hover:text-emerald-700 transition-colors"
            >
              Browse All Regulatory Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/en/guides/rabies-titer-test-favn-guide"
              className="group bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    Veterinary Testing
                  </span>
                  <span className="text-[11px] text-zinc-400">9 min read</span>
                </div>
                <h3 className="font-serif text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-2">
                  FAVN Rabies Titer Test Manual
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Learn about the 0.5 IU/mL antibody threshold, approved testing laboratories (KSU, Auburn, ANSES), and mandatory post-draw waiting periods.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read FAVN Guide</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              href="/en/guides/usda-aphis-vehcs-guide"
              className="group bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80">
                    Government Endorsement
                  </span>
                  <span className="text-[11px] text-zinc-400">8 min read</span>
                </div>
                <h3 className="font-serif text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-2">
                  USDA APHIS VEHCS Guide
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  How accredited veterinarians submit export certificates for sovereign government review and validation within 10 days of travel.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read VEHCS Guide</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              href="/en/guides/iata-crate-requirements"
              className="group bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80">
                    Aviation &amp; Crates
                  </span>
                  <span className="text-[11px] text-zinc-400">10 min read</span>
                </div>
                <h3 className="font-serif text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-2">
                  IATA Dog Crate Requirements
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Container Requirement 1 (CR-1) sizing formulas, metal hardware specifications, and ventilation percentages for international flights.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read Crate Guide</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. ROUTE SPECIFIC FAQS & ADVISORIES ────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Practical Guidance</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              Frequently Asked Questions: {display.from} to {display.to}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {display.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
                <h4 className="font-bold text-sm text-zinc-900 mb-2 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Breed Restriction Alert Box if present */}
          {display.restrictedBreeds && display.restrictedBreeds.length > 0 && (
            <div className="mt-6 p-4.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <strong className="font-bold block text-sm text-amber-950 mb-1">
                  Statutory Breed Import Restrictions
                </strong>
                <p className="text-xs text-amber-900 leading-relaxed mb-1.5">
                  Government regulations strictly prohibit or restrict the import of specific dog breeds into {display.to}:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-900">
                  {display.restrictedBreeds.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── 7. EXECUTIVE CONVERSION CTA BANNER ─────────────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-[#08162A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                Route Assessment Engine
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                Traveling from {display.from} to {display.to} with your pet?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                Upload your pet&apos;s vaccination records and microchip certificate. We verify vaccination dates, 21-day latency windows, and USDA health certificate deadlines against official {display.authority} rules in seconds.
              </p>
              <Link
                href={checkerHref}
                className="inline-flex items-center gap-2 bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Run Free Route Compliance Assessment</span>
                <span>→</span>
              </Link>
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-400 flex-wrap">
                <span>✓ Sourced to {display.legalBasis.split('&')[0].trim()}</span>
                <span>•</span>
                <span>✓ Instant PDF Export</span>
                <span>•</span>
                <span>✓ No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
