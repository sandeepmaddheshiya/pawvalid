export interface StatutoryRule {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  severity: 'BLOCKING' | 'NON_BLOCKING';
  applicableSpecies?: 'DOG' | 'CAT' | 'BOTH';
  rules: string[];
  protocol: string;
  sourceName: string;
  sourceUrl: string;
  lastVerifiedAt: string;
}

export interface TimelineStep {
  step: number;
  timing: string;
  title: string;
  description: string;
}

export interface RouteAirlinePolicy {
  name: string;
  code: string;
  inCabinAllowed: boolean;
  cargoAllowed: boolean;
  maxInCabinWeightKg?: number;
  notes: string;
  feeEstimate: string;
  airlineGuideSlug?: string;
}

export interface RouteTransitAdvice {
  headline: string;
  layoverRules: string;
  directVsTransit: string;
  landBorderOption?: string;
  climateRestrictions?: string;
}

export interface RouteIntelligence {
  slug: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
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
  airlinePolicies?: RouteAirlinePolicy[];
  transitAdvice?: RouteTransitAdvice;
  timelineSteps: TimelineStep[];
  faqs: Array<{ q: string; a: string }>;
  statutoryRequirements: StatutoryRule[];
}

export const CORRIDORS: Record<string, RouteIntelligence> = {
  "usa-to-germany": {
    "slug": "usa-to-germany",
    "from": "United States",
    "to": "Germany",
    "fromFlag": "🇺🇸",
    "toFlag": "🇩🇪",
    "originCode": "US",
    "destCode": "DE",
    "region": "North America → European Union",
    "authority": "German Federal Ministry of Food and Agriculture (BMEL) & European Commission (DG SANTE)",
    "legalBasis": "Regulation (EU) No 576/2013 & Commission Implementing Regulation (EU) No 577/2013",
    "description": "Statutory non-commercial entry regulations for traveling with dogs and cats from the USA to Germany. Verified against official German BMEL and European Union border control statutes.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The US is listed as a rabies-controlled third country in Annex II of EU Reg 577/2013. No 30-day waiting period or 3-month RNATT blood titer test is required for direct travel.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance at any approved German Border Inspection Post (FRA, MUC, BER). No quarantine facility stay required.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "Primary rabies vaccination requires a mandatory 21-day latency window before travel. Valid boosters administered within active duration have no waiting period.",
    "certificateType": "EU Non-Commercial Health Certificate (Annex IV)",
    "certificateDetail": "Must be issued by a USDA-accredited veterinarian and officially endorsed via USDA APHIS VEHCS within 10 days of scheduled EU arrival.",
    "entryAirports": [
      "Frankfurt Airport (FRA)",
      "Munich Airport (MUC)",
      "Berlin Brandenburg (BER)",
      "Hamburg (HAM)",
      "Düsseldorf (DUS)"
    ],
    "restrictedBreeds": [
      "Pitbull Terrier",
      "American Staffordshire Terrier",
      "Staffordshire Bull Terrier",
      "Bull Terrier (and crossbreeds) under HundVerbrEinfG statutory import ban"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO Microchip Implantation",
        "description": "Implant a standard 15-digit ISO 11784/11785 compliant microchip. Must occur strictly before rabies vaccination."
      },
      {
        "step": 2,
        "timing": "At Least 21 Days Before Arrival",
        "title": "Rabies Vaccination & Latency",
        "description": "Administer rabies vaccination. The 21-day waiting period starts on the day after injection (Day 0)."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Arrival",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "USDA-accredited vet issues the EU Annex IV certificate. Submit electronically through VEHCS for USDA endorsement."
      },
      {
        "step": 4,
        "timing": "Flight Day at German Airport",
        "title": "German Customs Declaration",
        "description": "Exit via Red Customs Channel (\"Goods to Declare / Zoll\") at Frankfurt or Munich airport for official document check."
      }
    ],
    "faqs": [
      {
        "q": "Do I need an EU Pet Passport if my pet resides in the United States?",
        "a": "No. EU Pet Passports can only be issued by authorized veterinarians within the European Union. US-resident pets enter Germany on the official EU Non-Commercial Health Certificate (Annex IV) endorsed by USDA APHIS."
      },
      {
        "q": "Can my dog enter Germany with a 3-year rabies vaccination?",
        "a": "Yes, 3-year rabies vaccines are fully recognized by German authorities, provided the vaccine was administered strictly after the microchip implantation and remains within the manufacturer’s stated validity period."
      },
      {
        "q": "What happens at German airport customs upon arrival?",
        "a": "You must proceed through the Red Customs Channel (\"Zoll / Goods to Declare\") at Frankfurt, Munich, or Berlin. Customs officials will scan your pet’s microchip and verify the USDA endorsed Annex IV certificate."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "de-req-1",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Transponder Mandate",
        "title": "ISO Microchip Specification",
        "severity": "BLOCKING",
        "rules": [
          "Must be implanted strictly prior to or on the same day as the primary rabies vaccination.",
          "Must be a 15-digit non-encrypted transponder operating at 134.2 kHz compliant with ISO 11784/11785."
        ],
        "protocol": "Veterinary Verification: Transponder must be scanned prior to any medical procedure and recorded on all travel documentation.",
        "sourceName": "Regulation (EU) No 576/2013 Annex II",
        "sourceUrl": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32013R0576",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "de-req-2",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Rabies Immunization & 21-Day Latency Window",
        "title": "Rabies Vaccine Validity",
        "severity": "BLOCKING",
        "rules": [
          "Primary vaccination requires a minimum 21-day latency period before international departure.",
          "Must be administered at 12 weeks of age or older by an authorized veterinarian."
        ],
        "protocol": "Latency Clock: Day 0 is the day of injection; Day 21 must be fully complete before border crossing.",
        "sourceName": "German Federal Ministry of Food and Agriculture (BMEL)",
        "sourceUrl": "https://www.bmel.de/EN/topics/animals/pets/pets_node.html",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-uk": {
    "slug": "usa-to-uk",
    "from": "United States",
    "to": "United Kingdom",
    "fromFlag": "🇺🇸",
    "toFlag": "🇬🇧",
    "originCode": "US",
    "destCode": "GB",
    "region": "North America → Great Britain",
    "authority": "Animal and Plant Health Agency (APHA) & Department for Environment, Food & Rural Affairs (DEFRA)",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained EU Regulation 576/2013",
    "description": "Comprehensive pet import regulations for dogs, cats, and ferrets traveling from the USA to Great Britain under the UK Pet Travel Scheme (PETS). Covers mandatory manifest cargo routing, London Heathrow Animal Reception Centre (HARC) intake, USDA APHIS VEHCS endorsement within 10 days, 24–120 hour tapeworm rules, and XL Bully breed bans.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The United States is recognized as a Part 2 listed country under UK regulations. No rabies blood titer (RNATT) test is required for direct entry into Great Britain.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Zero quarantine when entering on an approved transport company and route with compliant Great Britain Pet Health Certificate.",
    "leadTime": "21 Days + Tapeworm",
    "leadTimeDetail": "21-day rabies vaccination wait + strict veterinary tapeworm administration window (24–120 hours before arrival).",
    "certificateType": "Great Britain Pet Health Certificate",
    "certificateDetail": "Must be issued by a USDA-accredited veterinarian and officially endorsed by USDA APHIS via VEHCS within 10 days of UK entry.",
    "entryAirports": [
      "London Heathrow Airport (LHR - HARC Cargo)",
      "London Gatwick Airport (LGW - Cargo)",
      "Manchester Airport (MAN - Cargo)",
      "Edinburgh Airport (EDI - Cargo)"
    ],
    "restrictedBreeds": [
      "XL Bully (Dangerous Dogs Act 1991)",
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro"
    ],
    "airlinePolicies": [
      {
        "name": "British Airways",
        "code": "BA",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "All pets entering the UK on BA must travel as manifest cargo booked via IAG Cargo into London Heathrow (LHR) or Manchester (MAN). In-cabin pet travel is strictly prohibited for UK arrivals.",
        "feeEstimate": "$1,200–$2,800 USD (based on crate volume and weight)",
        "airlineGuideSlug": "british-airways"
      },
      {
        "name": "Virgin Atlantic",
        "code": "VS",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Pets fly exclusively as manifest cargo via Virgin Atlantic Cargo into London Heathrow Animal Reception Centre (HARC).",
        "feeEstimate": "$1,400–$3,000 USD",
        "airlineGuideSlug": "virgin-atlantic"
      },
      {
        "name": "Delta Air Lines",
        "code": "DL",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Delta Cargo operates live animal transport from US hubs into London Heathrow. No in-cabin pets allowed on UK-bound flights.",
        "feeEstimate": "$1,100–$2,500 USD",
        "airlineGuideSlug": "delta-air-lines"
      },
      {
        "name": "Air France (Paris Transit Workaround)",
        "code": "AF",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 8,
        "notes": "Travelers wishing to keep pets in-cabin often fly Air France from the US to Paris CDG (pets under 8kg), then take a licensed pet taxi or Eurotunnel Le Shuttle into the UK.",
        "feeEstimate": "$200 USD (in-cabin to Paris) + £250–£600 (pet taxi / Eurotunnel)",
        "airlineGuideSlug": "air-france"
      }
    ],
    "transitAdvice": {
      "headline": "UK Manifest Cargo Mandate & In-Cabin Transit Alternatives",
      "layoverRules": "Transiting through third countries: If your flight connects through a rabies-unlisted country (e.g. Turkey or Egypt), the pet must remain sealed in the airport transit zone under customs supervision to prevent voiding UK Part 2 rabies-exempt status.",
      "directVsTransit": "Direct flights to London Heathrow (LHR) or Gatwick (LGW) require booking through an approved IPATA pet shipper or direct airline cargo desk. Pets cannot be checked as excess baggage.",
      "landBorderOption": "In-Cabin Alternative: Fly to Paris Charles de Gaulle (CDG), Brussels (BRU), or Amsterdam (AMS) with your pet in-cabin, then cross into the UK via Eurotunnel Le Shuttle (Folkestone) in a private vehicle.",
      "climateRestrictions": "Transatlantic live animal shipments are subject to airline temperature embargoes (typically canceled if ground temps exceed 85°F / 29.4°C or fall below 45°F / 7.2°C at departure or arrival stations)."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO 11784/11785 Microchip & Rabies Vaccination",
        "description": "Implant standard 15-digit microchip. Administer rabies vaccine on the same day or after; a 21-day latency period must elapse before departure."
      },
      {
        "step": 2,
        "timing": "Day -21 to -14",
        "title": "Approved Route & Manifest Cargo Booking",
        "description": "Commercial airlines require manifest cargo booking with an Air Waybill (AWB) into London Heathrow (HARC), Gatwick, or Manchester Animal Reception Centres."
      },
      {
        "step": 3,
        "timing": "Day -5 to Day -1 (24–120h Window)",
        "title": "Mandatory Tapeworm (Praziquantel) Treatment",
        "description": "USDA-accredited vet administers praziquantel and records exact date and time on Section II of the Great Britain Health Certificate."
      },
      {
        "step": 4,
        "timing": "Within 10 Days of UK Arrival",
        "title": "USDA APHIS VEHCS Digital Endorsement",
        "description": "Accredited vet submits the completed GB Health Certificate through USDA VEHCS for federal electronic endorsement."
      },
      {
        "step": 5,
        "timing": "Arrival Day at Heathrow HARC",
        "title": "Animal Reception Centre Inspection & Release",
        "description": "Direct bonded transfer to Heathrow Animal Reception Centre (HARC) for microchip verification and immediate 0-day quarantine release (typically 2–4 hours)."
      }
    ],
    "faqs": [
      {
        "q": "Can my dog fly in the cabin from the USA to the UK?",
        "a": "No. Under DEFRA regulations, commercial airlines are legally prohibited from carrying pets in passenger cabins on UK inbound flights (except certified assistance dogs). Pets must enter the UK as manifest cargo under an Air Waybill (AWB) or via approved pet ferry/Eurotunnel routes."
      },
      {
        "q": "What is the mandatory tapeworm treatment window for dogs entering the UK?",
        "a": "Dogs must receive an approved praziquantel tapeworm treatment administered by a licensed veterinarian between 24 and 120 hours (1 to 5 days) before the scheduled arrival time in the UK. The exact date, hour, and drug brand must be recorded on the Great Britain Health Certificate."
      },
      {
        "q": "How can I bring my dog to the UK in-cabin using the Paris workaround?",
        "a": "Many pet owners fly with their pet in-cabin on US-to-Europe flights landing in Paris (CDG), Brussels (BRU), or Amsterdam (AMS) where in-cabin pets are permitted. After clearing EU customs on an EU Annex IV certificate, they enter the UK via Eurotunnel Le Shuttle (Folkestone) or a cross-channel pet taxi with an Animal Health Certificate and tapeworm treatment."
      },
      {
        "q": "Is a rabies titer test required for dogs coming from the USA to the UK?",
        "a": "No. The United States is listed as a Part 2 rabies-controlled country by UK DEFRA. A rabies titer test (RNATT/FAVN) is not required for direct travel from the US to Great Britain."
      },
      {
        "q": "How do I get USDA APHIS endorsement for pet travel to Great Britain?",
        "a": "Your USDA-accredited veterinarian completes the official Great Britain Pet Health Certificate and submits it electronically via the USDA APHIS Veterinary Export Health Certification System (VEHCS). USDA endorses the certificate digitally within 10 days of your scheduled arrival."
      },
      {
        "q": "Are XL Bully and Pitbull breeds banned from entering the United Kingdom?",
        "a": "Yes. Under the UK Dangerous Dogs Act 1991 (updated for XL Bullies), importing Pit Bull Terriers, Japanese Tosas, Dogo Argentinos, Fila Brasileiros, and American Bully XL dogs into Great Britain is strictly illegal."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "uk-req-microchip",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "ISO 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "ISO 11784/11785 compliant 15-digit microchip must be implanted before rabies vaccination.",
          "Microchip number must match all veterinary records, health certificates, and cargo airway bills exactly."
        ],
        "protocol": "Sequence Mandatory: Microchip must be implanted and verified before rabies vaccination. Any vaccination administered prior to microchipping is legally invalid in the UK.",
        "sourceName": "UK Animal and Plant Health Agency (APHA)",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "uk-req-rabies",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Rabies Immunization Protocol",
        "title": "Rabies Vaccination & 21-Day Wait",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Valid rabies vaccination administered by an accredited vet after microchipping.",
          "Pet must be at least 12 weeks old at the time of primary vaccination.",
          "At least 21 days must elapse after primary vaccination before entering Great Britain."
        ],
        "protocol": "21-Day Wait Rule: The primary rabies vaccination becomes valid on Day 22. Valid continuous booster shots have no waiting period.",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "uk-req-tapeworm",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "Echinococcus Multilocularis Protocol",
        "title": "Mandatory 24–120 Hour Tapeworm Treatment",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Approved praziquantel tapeworm treatment administered by a licensed veterinarian.",
          "Treatment must be administered between 24 and 120 hours (1 to 5 days) before scheduled arrival in the UK.",
          "Veterinarian must explicitly record the product name, date, and exact time of administration."
        ],
        "protocol": "Strict Window: Must be given not less than 24 hours and not more than 120 hours before UK arrival. Failure results in border quarantine or refusal.",
        "sourceName": "UK DEFRA Pet Travel Scheme",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "uk-req-health-cert",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "Great Britain Health Certificate",
        "title": "USDA-Accredited Health Certificate & Endorsement",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Official Great Britain Pet Health Certificate completed by a USDA-accredited veterinarian.",
          "Officially endorsed by USDA APHIS via VEHCS within 10 days of arrival in the UK."
        ],
        "protocol": "10-Day Endorsement Window: Issued and federally endorsed by USDA APHIS within 10 days of scheduled UK entry.",
        "sourceName": "USDA APHIS Pet Travel to Great Britain",
        "sourceUrl": "https://www.aphis.usda.gov/aphis/pet-travel/by-country/united-kingdom",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-spain": {
    "slug": "uk-to-spain",
    "from": "United Kingdom",
    "to": "Spain",
    "fromFlag": "🇬🇧",
    "toFlag": "🇪🇸",
    "originCode": "GB",
    "destCode": "ES",
    "region": "Great Britain → European Union (Schengen)",
    "authority": "Spanish Ministry of Agriculture, Fisheries and Food (MAPA) & European Commission",
    "legalBasis": "Regulation (EU) No 576/2013 & Spanish Royal Decree 990/2022",
    "description": "Post-Brexit non-commercial pet movement from Great Britain to Spain. Covers UK Animal Health Certificate (AHC) issuance, EU pet passport validity, and tapeworm rules on return.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Great Britain is a Part 2 listed country under EU Regulation 577/2013. No rabies serological titer test is required for entry into Spain.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs check at Madrid Barajas, Barcelona El Prat, Malaga, Alicante, or northern ferry ports (Santander/Bilbao).",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day latency period for primary rabies vaccine. UK Animal Health Certificate must be issued within 10 days of EU arrival.",
    "certificateType": "UK Animal Health Certificate (AHC) or valid EU Pet Passport",
    "certificateDetail": "Must be issued by an Official Veterinarian (OV) in Great Britain within 10 days before crossing into Spain.",
    "entryAirports": [
      "Madrid-Barajas (MAD)",
      "Barcelona-El Prat (BCN)",
      "Málaga-Costa del Sol (AGP)",
      "Alicante-Elche (ALC)",
      "Santander Ferry Port (SDR)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Staffordshire Bull Terrier",
      "American Staffordshire Terrier",
      "Rottweiler",
      "Dogo Argentino",
      "Fila Brasileiro",
      "Tosa Inu",
      "Akita Inu under Spanish Law 50/1999"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO 11784/11785 Microchip",
        "description": "Confirm 15-digit microchip is active and readable."
      },
      {
        "step": 2,
        "timing": "At Least 21 Days Before Travel",
        "title": "Rabies Vaccine Administration",
        "description": "Ensure rabies immunization is current. 21-day latency applies if primary vaccine."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "Animal Health Certificate (AHC) Appointment",
        "description": "Official Veterinarian (OV) issues bilingual Spanish-English AHC valid for 4 months of EU travel."
      },
      {
        "step": 4,
        "timing": "24 to 120 Hours Prior to UK Return",
        "title": "Veterinary Tapeworm Pill in Spain",
        "description": "Spanish vet administers Praziquantel and signs the AHC/passport for return to Great Britain."
      }
    ],
    "faqs": [
      {
        "q": "Can I use my old UK Pet Passport to travel to Spain?",
        "a": "No. Blue UK pet passports issued prior to January 1, 2021, are no longer valid for travel into the EU. You must obtain an Animal Health Certificate (AHC) issued by an Official Veterinarian in the UK, unless you hold an active EU Pet Passport issued inside an EU member state."
      },
      {
        "q": "How long is an Animal Health Certificate (AHC) valid in Spain?",
        "a": "An AHC is valid for entry into the EU for 10 days from the date of issue by the vet, and remains valid for travel within the EU and return to the UK for 4 months."
      },
      {
        "q": "Are muzzles required for dogs in Spain?",
        "a": "Yes. Under Spanish Law 50/1999 on potentially dangerous dogs (PPP), breeds such as Rottweilers, Pitbulls, and Staffies must wear a muzzle and be kept on a non-extendable leash under 2 meters in public areas."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "es-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "Official Animal Health Certificate (AHC)",
        "title": "Bilingual AHC Mandate",
        "severity": "BLOCKING",
        "rules": [
          "Must be completed in Spanish and English.",
          "Must be signed by an authorized Official Veterinarian (OV) within 10 days of arrival in Spain."
        ],
        "protocol": "Border Verification: Customs at Spanish airports and ferry terminals scan microchips and check OV credentials.",
        "sourceName": "Spanish MAPA",
        "sourceUrl": "https://www.mapa.gob.es/en/ganaderia/temas/comercio-exterior-ganadero/desplazamiento-animales-compania/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-france": {
    "slug": "uk-to-france",
    "from": "United Kingdom",
    "to": "France",
    "fromFlag": "🇬🇧",
    "toFlag": "🇫🇷",
    "originCode": "GB",
    "destCode": "FR",
    "region": "Great Britain → European Union (Eurotunnel / Ferry)",
    "authority": "French Ministry of Agriculture and Food Sovereignty (DGAL) & EU DG SANTE",
    "legalBasis": "Regulation (EU) No 576/2013 & French Rural Code Article L211-14",
    "description": "Statutory transit rules for taking dogs and cats from the UK to France post-Brexit. Covers DEFRA Animal Health Certificates (AHC), 21-day rabies latency, Eurotunnel Le Shuttle Folkestone-Calais pet travel, cross-channel ferries, Category 1 dangerous breed bans, and mandatory tapeworm treatment before returning to the UK.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Great Britain is a Part 2 listed country under EU Regulation 577/2013. No rabies serological titer test is required for direct travel into France.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct clearance through Eurotunnel Pet Reception Centre in Folkestone or ferry terminal pet control in Dover with 0 days quarantine.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day latency window for primary rabies vaccine. AHC must be issued within 10 days of travel.",
    "certificateType": "UK Animal Health Certificate (AHC) or EU Pet Passport",
    "certificateDetail": "Must be issued by an accredited Official Veterinarian (OV) within 10 days of French border crossing, or a valid EU Pet Passport.",
    "entryAirports": [
      "Eurotunnel Folkestone-Calais Terminal (Vehicle)",
      "Port of Dover / Port of Calais (P&O / DFDS Ferries)",
      "Portsmouth / Plymouth (Brittany Ferries)",
      "Paris Charles de Gaulle (CDG)",
      "Nice Côte d’Azur (NCE)"
    ],
    "restrictedBreeds": [
      "Category 1 (Attack dogs without kennel club pedigree e.g. Pitbulls, Boerboels - strictly banned from France under Article L211-14)",
      "Category 2 (Guard dogs with recognized pedigree e.g. purebred Rottweilers, American Staffordshire - require muzzle, leash, insurance, and permit)"
    ],
    "airlinePolicies": [
      {
        "name": "Eurotunnel Le Shuttle (Folkestone → Calais)",
        "code": "ES",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Drive onto the train in your vehicle with your pet in 35 minutes. Pre-booked check-in at Folkestone Pet Reception Centre (£22 per pet each way).",
        "feeEstimate": "£22 GBP per pet each way"
      },
      {
        "name": "P&O Ferries / DFDS (Dover → Calais / Dunkirk)",
        "code": "PO",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "notes": "Offers dedicated pet lounges (pets on leash inside lounge) or pet stays inside vehicle on vehicle deck (90-minute crossing).",
        "feeEstimate": "£15–£30 GBP per pet each way"
      },
      {
        "name": "Brittany Ferries (Portsmouth/Plymouth → Caen/St Malo)",
        "code": "BF",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "notes": "Overnight and day sailings with dedicated pet-friendly cabins and open-air pet exercise areas.",
        "feeEstimate": "£30–£50 GBP per pet each way"
      },
      {
        "name": "Air France",
        "code": "AF",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 8,
        "notes": "Direct flights from London Heathrow/Manchester to Paris CDG allowing pets under 8kg in cabin.",
        "feeEstimate": "€70–€125 EUR each way",
        "airlineGuideSlug": "air-france"
      }
    ],
    "transitAdvice": {
      "headline": "Eurotunnel Folkestone Check-In & Onward EU Mobility",
      "layoverRules": "4-Month EU Validity: A single UK Animal Health Certificate (AHC) is valid for up to 4 months of continuous onward travel throughout all 27 EU member states and Switzerland, and for returning to the UK.",
      "directVsTransit": "Eurotunnel Le Shuttle vs Ferry: Eurotunnel is the fastest and least stressful crossing (35 minutes, pet stays in vehicle). Ferries offer pet lounges or pet cabins for longer crossings.",
      "landBorderOption": "Driving via Eurotunnel: Check in at the Folkestone Pet Reception Centre 1 to 2 hours before train departure. Staff scan the microchip and verify the AHC.",
      "climateRestrictions": "Return to UK Tapeworm Rule: Before returning to Great Britain from France, your dog MUST receive a praziquantel tapeworm treatment from an EU vet between 24 and 120 hours before UK check-in."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO 11784/11785 Microchip & Rabies Vaccination",
        "description": "Confirm 15-digit microchip. Administer rabies shot; a 21-day latency period must elapse before entering France."
      },
      {
        "step": 2,
        "timing": "Within 10 Days Before Departure",
        "title": "Official Veterinarian Issues UK AHC",
        "description": "UK Official Veterinarian (OV) examines pet and completes bilingual French-English Animal Health Certificate."
      },
      {
        "step": 3,
        "timing": "Day -3 to -1",
        "title": "Book Eurotunnel / Ferry Pet Slot",
        "description": "Add pet to vehicle booking with Eurotunnel Le Shuttle or cross-channel ferry operator."
      },
      {
        "step": 4,
        "timing": "Day of Departure at Folkestone / Dover",
        "title": "Pet Reception Centre Verification",
        "description": "Folkestone Pet Reception Centre scans microchip, stamps paperwork, and approves boarding with 0 days quarantine."
      }
    ],
    "faqs": [
      {
        "q": "How do I take my dog from the UK to France using the Eurotunnel Le Shuttle?",
        "a": "To take your dog to France via Eurotunnel: (1) Ensure microchip and rabies vaccine (at least 21 days old); (2) Obtain a UK Animal Health Certificate (AHC) within 10 days of travel; (3) Book a pet ticket (£22) on Le Shuttle; and (4) Stop at the Folkestone Pet Reception Centre 1–2 hours before departure for a quick microchip scan and document check before driving onto the train."
      },
      {
        "q": "How long is a UK Animal Health Certificate (AHC) valid in France and the EU?",
        "a": "A UK Animal Health Certificate is valid for entry into the EU within 10 days of its issuance date, and remains valid for up to 4 months of onward travel throughout EU member states and for re-entering Great Britain."
      },
      {
        "q": "What tapeworm treatment is needed when returning to the UK from France?",
        "a": "Before re-entering Great Britain from France, every dog must be treated against tapeworm (Praziquantel) by a licensed EU veterinarian between 24 and 120 hours (1 to 5 days) prior to scheduled UK check-in at Calais."
      },
      {
        "q": "Can my dog travel on Eurostar passenger trains between London and Paris?",
        "a": "No. Eurostar passenger trains through the Channel Tunnel do NOT allow pets on board (except registered assistance dogs). You must use Eurotunnel Le Shuttle (by car) or a cross-channel ferry."
      },
      {
        "q": "Are Pit Bulls and dangerous breeds banned in France?",
        "a": "Yes. France enforces strict laws: Category 1 attack dogs (Pit Bulls, Boerboels, and Tosa types without recognized kennel club pedigree) are completely banned from entering or transiting French territory."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "fr-req-1",
        "category": "BREED_RESTRICTIONS",
        "categoryLabel": "French Category 1 Dangerous Dogs Prohibition",
        "title": "Category 1 Attack Dog Import Ban",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Category 1 dogs (Pitbulls, Boerboels, and mastiff crosses without kennel club pedigree) cannot enter French territory.",
          "Violation results in immediate seizure, fine up to €15,000, and mandatory repatriation or euthanasia."
        ],
        "protocol": "Border Inspection: Verified by French border police and Eurotunnel attendants.",
        "sourceName": "French Ministry of Agriculture (DGAL)",
        "sourceUrl": "https://agriculture.gouv.fr/telecharger/87508",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "fr-req-2",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "UK Animal Health Certificate (AHC)",
        "title": "UK Animal Health Certificate within 10 Days",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Bilingual French/English Animal Health Certificate issued by UK Official Veterinarian within 10 days of border entry, OR valid EU Pet Passport."
        ],
        "protocol": "Inspected at Folkestone Pet Reception Centre or ferry terminal.",
        "sourceName": "EU DG SANTE & UK DEFRA",
        "sourceUrl": "https://www.gov.uk/take-pet-abroad",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "fr-req-3",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Rabies Immunization Protocol",
        "title": "Rabies Vaccination with 21-Day Wait",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Microchip implanted before rabies vaccination.",
          "Primary vaccination requires 21-day latency before entry into France."
        ],
        "protocol": "Primary vaccine effective on Day 22.",
        "sourceName": "French Ministry of Agriculture",
        "sourceUrl": "https://agriculture.gouv.fr",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "fr-req-4",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Standard 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "15-digit ISO 11784/11785 compliant microchip."
        ],
        "protocol": "Scanned with universal scanner at French border.",
        "sourceName": "EU Regulation 576/2013",
        "sourceUrl": "https://agriculture.gouv.fr",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-france": {
    "slug": "usa-to-france",
    "from": "United States",
    "to": "France",
    "fromFlag": "🇺🇸",
    "toFlag": "🇫🇷",
    "originCode": "US",
    "destCode": "FR",
    "region": "North America → European Union",
    "authority": "French Ministry of Agriculture and Food Sovereignty (DGAL) & USDA APHIS",
    "legalBasis": "Regulation (EU) No 576/2013 Annex IV & French Rural Code",
    "description": "Comprehensive statutory guide for moving dogs and cats from the United States to France. Covers EU Non-Commercial Health Certificate (Annex IV) endorsed via USDA APHIS VEHCS within 10 days, 21-day rabies vaccination latency, ISO microchips, Category 1 dangerous dog bans, and Paris CDG/Orly customs clearance.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The United States is listed as an Annex II rabies-controlled third country. No rabies titer test (FAVN/RNATT) is required for direct travel into France.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs declaration at Paris Charles de Gaulle (CDG), Paris Orly (ORY), or Nice (NCE).",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day rabies latency period + USDA VEHCS electronic endorsement issued within 10 days of landing.",
    "certificateType": "EU Non-Commercial Health Certificate (Annex IV)",
    "certificateDetail": "Must be issued by USDA-accredited vet and endorsed electronically via USDA APHIS VEHCS within 10 days of EU arrival.",
    "entryAirports": [
      "Paris Charles de Gaulle (CDG)",
      "Paris Orly (ORY)",
      "Nice Côte d’Azur (NCE)",
      "Lyon-Saint Exupéry (LYS)",
      "Marseille Provence (MRS)"
    ],
    "restrictedBreeds": [
      "Category 1 (Pitbulls, Staffordshire crosses without pedigree, Boerboels - strictly banned from France)",
      "Category 2 (Rottweilers with pedigree - require muzzle, leash, and French permit)"
    ],
    "airlinePolicies": [
      {
        "name": "Air France",
        "code": "AF",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 8,
        "notes": "Direct flights from major US hubs (JFK, BOS, MIA, LAX, SFO, ORD) to Paris CDG. Dogs and cats under 8kg (including soft carrier) allowed in-cabin ($125–$200 USD fee).",
        "feeEstimate": "$125–$200 USD (in-cabin) / $400 USD (hold)",
        "airlineGuideSlug": "air-france"
      },
      {
        "name": "Delta Air Lines",
        "code": "DL",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Allows small in-cabin dogs and cats on direct transatlantic flights to Paris CDG and Nice ($95 USD fee).",
        "feeEstimate": "$95 USD each way",
        "airlineGuideSlug": "delta-air-lines"
      },
      {
        "name": "United Airlines",
        "code": "UA",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "In-cabin pets allowed on direct US-to-Paris flights ($150 USD fee).",
        "feeEstimate": "$150 USD each way",
        "airlineGuideSlug": "united-airlines"
      },
      {
        "name": "American Airlines",
        "code": "AA",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Accepts in-cabin pets on transatlantic routes into Paris ($150 USD fee).",
        "feeEstimate": "$150 USD each way"
      }
    ],
    "transitAdvice": {
      "headline": "Paris CDG Customs Clearance & European Onward Travel",
      "layoverRules": "Intra-EU Mobility: Once your EU Annex IV certificate is stamped by French Douane at Paris CDG, your pet can travel freely across all 27 EU member states for up to 4 months.",
      "directVsTransit": "Direct flights to Paris (CDG/ORY) avoid intermediate customs checks. If connecting through Frankfurt or Amsterdam, customs clearance occurs at your first EU airport.",
      "landBorderOption": "In-Cabin Arrival for UK Transits: Many travelers flying from the US to the UK fly into Paris CDG on Air France with in-cabin pets, then take a pet taxi via Eurotunnel to the UK.",
      "climateRestrictions": "Summer heat embargoes: Transatlantic airlines enforce cargo/hold heat restrictions during hot summer months (above 85°F / 29.4°C)."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO 11784/11785 Microchip & Rabies Vaccination",
        "description": "Implant 15-digit microchip strictly before or on the day of rabies vaccination; 21-day latency period required before export."
      },
      {
        "step": 2,
        "timing": "Day -21 to -14",
        "title": "Airline In-Cabin or Cargo Reservation",
        "description": "Book pet reservation with Air France, Delta, or United."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of EU Arrival",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "USDA-accredited vet completes EU Annex IV certificate; USDA endorses electronically via VEHCS."
      },
      {
        "step": 4,
        "timing": "Flight & Arrival Day at Paris CDG",
        "title": "French Customs (Douane) Clearance",
        "description": "Proceed through the Red Customs Lane (\"Douane / Marchandises à déclarer\") for microchip scan and immediate 0-day quarantine entry."
      }
    ],
    "faqs": [
      {
        "q": "What are the step-by-step requirements for moving a pet to France from the US?",
        "a": "To move a dog or cat to France from the US: (1) Implant a 15-digit ISO 11784/11785 microchip; (2) Administer a rabies vaccination (at least 21 days before departure); (3) Have a USDA-accredited vet complete the EU Annex IV certificate within 10 days of arrival; (4) Obtain electronic USDA APHIS VEHCS endorsement; and (5) Declare pet at French Douane customs at Paris CDG or Orly. 0 days quarantine."
      },
      {
        "q": "How long before travel to France does USDA VEHCS need to endorse the health certificate?",
        "a": "The EU Annex IV health certificate must be completed by your vet and officially endorsed by USDA APHIS within 10 days of your scheduled arrival date in France."
      },
      {
        "q": "Which dog breeds are banned from entering France under Category 1 laws?",
        "a": "France strictly prohibits Category 1 attack dogs without recognized kennel club pedigree: Staffordshire Bull Terriers / American Staffordshire Terriers without pedigree (Pit Bulls), Mastiff crosses (Boerboels), and Tosa crosses. These breeds face seizure and heavy fines."
      },
      {
        "q": "Can I fly my dog in the cabin from the USA to Paris Charles de Gaulle (CDG)?",
        "a": "Yes! Air France, Delta, United, and American Airlines permit small dogs and cats up to 8 kg (17.6 lbs) including their soft-sided carrier in the passenger cabin on flights from the US to Paris."
      },
      {
        "q": "Does France require a rabies titer test or quarantine for pets from the US?",
        "a": "No. The United States is listed as an Annex II rabies-controlled country. Pets flying directly to France do not require a rabies titer test (RNATT/FAVN) and enter with 0 days quarantine."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "fr-us-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "USDA APHIS Endorsed EU Annex IV",
        "title": "10-Day USDA Endorsed EU Health Certificate",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Must be issued by a USDA-accredited veterinarian.",
          "Must be endorsed electronically via USDA APHIS VEHCS within 10 days of EU entry.",
          "Features digital USDA cryptographic seal and watermark."
        ],
        "protocol": "Customs Verification: Stamped by French Douane at CDG or ORY.",
        "sourceName": "French DGAL & USDA APHIS",
        "sourceUrl": "https://www.aphis.usda.gov/pet-travel/us-to-france",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "fr-us-req-2",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Rabies Immunization Protocol",
        "title": "Rabies Vaccination with 21-Day Wait",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Administered strictly after ISO microchip implantation.",
          "Primary vaccine requires a 21-day waiting period before travel."
        ],
        "protocol": "21-Day Wait Rule: Primary vaccine valid on Day 22.",
        "sourceName": "French Ministry of Agriculture",
        "sourceUrl": "https://agriculture.gouv.fr",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "fr-us-req-3",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Standard 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "ISO 11784/11785 compliant 15-digit microchip implanted before rabies vaccination."
        ],
        "protocol": "Microchip verified by French customs scanner.",
        "sourceName": "EU DG SANTE",
        "sourceUrl": "https://agriculture.gouv.fr",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "fr-us-req-4",
        "category": "BREED_RESTRICTIONS",
        "categoryLabel": "French Category 1 Prohibition",
        "title": "Category 1 Dangerous Dog Import Ban",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Non-pedigreed Pit Bulls, Boerboels, and Tosa crosses are strictly barred from entering France."
        ],
        "protocol": "Customs Enforcement: Seizure and immediate repatriation for illegal breeds.",
        "sourceName": "French Ministry of Agriculture (DGAL)",
        "sourceUrl": "https://agriculture.gouv.fr",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-italy": {
    "slug": "usa-to-italy",
    "from": "United States",
    "to": "Italy",
    "fromFlag": "🇺🇸",
    "toFlag": "🇮🇹",
    "originCode": "US",
    "destCode": "IT",
    "region": "North America → European Union (Mediterranean)",
    "authority": "Italian Ministry of Health (Ministero della Salute) & USDA APHIS",
    "legalBasis": "Regulation (EU) No 576/2013 & Ministerial Ordinance of 3 August 2011",
    "description": "Statutory guidelines for traveling with pets from the USA to Italy. Covers USDA VEHCS endorsement, Rome FCO / Milan MXP border inspection, and Italian leash/muzzle regulations.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The United States is an Annex II rabies-controlled country. No rabies titer test is required for direct travel.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs inspection at Rome Fiumicino (FCO), Milan Malpensa (MXP), or Venice (VCE).",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day latency period for primary rabies vaccine + USDA endorsement within 10 days of flight.",
    "certificateType": "EU Non-Commercial Health Certificate (Annex IV)",
    "certificateDetail": "Must be issued by USDA-accredited vet and endorsed electronically via USDA APHIS VEHCS within 10 days of Italian arrival.",
    "entryAirports": [
      "Rome Leonardo da Vinci–Fiumicino (FCO)",
      "Milan Malpensa (MXP)",
      "Venice Marco Polo (VCE)",
      "Naples International (NAP)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO 11784/11785 Microchip",
        "description": "Implant 15-digit microchip before rabies shot."
      },
      {
        "step": 2,
        "timing": "At Least 21 Days Before Travel",
        "title": "Rabies Vaccination",
        "description": "Administer vaccine and observe 21-day latency period."
      },
      {
        "step": 3,
        "timing": "Within 10 Days Before Flight",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "Accredited vet conducts exam and submits EU Annex IV certificate through VEHCS."
      },
      {
        "step": 4,
        "timing": "Arrival at Rome FCO / Milan MXP",
        "title": "Italian Customs Declaration",
        "description": "Present pet and USDA-endorsed certificate at airport Dogana (Customs) desk."
      }
    ],
    "faqs": [
      {
        "q": "Are dogs required to wear muzzles in Italy?",
        "a": "Italian law requires pet owners to carry a muzzle with them in public at all times and to use a leash no longer than 1.5 meters. Dogs must wear the muzzle on public transit, trains (Trenitalia/Italo), and in crowded public areas if requested by authorities."
      },
      {
        "q": "Can dogs ride trains in Italy?",
        "a": "Yes! Italy is extremely pet-friendly on rail. Small pets in carriers travel free on Trenitalia and Italo trains. Larger leashed dogs can travel on high-speed Frecciarossa trains with a discounted pet ticket, muzzle, and health certificate."
      },
      {
        "q": "Is a tapeworm treatment required for Italy?",
        "a": "No. Direct travel from the US to Italy does not mandate tapeworm (Echinococcus) treatment, unlike travel into the UK, Ireland, or Norway."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "it-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "EU Annex IV Health Certificate",
        "title": "USDA VEHCS Validation",
        "severity": "BLOCKING",
        "rules": [
          "Must be endorsed by USDA APHIS within 10 days of arrival.",
          "Owner must carry muzzle and non-extendable leash in public."
        ],
        "protocol": "Italian Customs Dogana inspection at FCO and MXP.",
        "sourceName": "Ministero della Salute Italy",
        "sourceUrl": "https://www.salute.gov.it/portale/caniGatti/homeCaniGatti.jsp",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-mexico": {
    "slug": "usa-to-mexico",
    "from": "United States",
    "to": "Mexico",
    "fromFlag": "🇺🇸",
    "toFlag": "🇲🇽",
    "originCode": "US",
    "destCode": "MX",
    "region": "North America Cross-Border",
    "authority": "National Service of Agro-Alimentary Public Health, Safety and Quality (SENASICA)",
    "legalBasis": "Mexican Federal Animal Health Law & SENASICA Official Notice B00.02.01.01.01",
    "description": "Complete statutory guide on how to take a dog or cat to Mexico from the USA under SENASICA and SADER regulations. Explains the 2019+ streamlined protocol (no USDA health certificate required for tourist pets), mandatory rabies vaccination certificates, free physical inspection at OISA border checkpoints, driving vs flying, and airline policies.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "No rabies antibody titer test (FAVN/RNATT) is required for dogs or cats entering Mexico from the United States.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon physical inspection by SENASICA officers at the Agricultural Sanitation Inspection Office (OISA).",
    "leadTime": "Current Vaccine",
    "leadTimeDetail": "Valid current rabies vaccination required. No mandatory 21-day latency period enforced for tourist pet entries from the US.",
    "certificateType": "Rabies Certificate & SENASICA OISA Inspection (CIS)",
    "certificateDetail": "Under the simplified US-Mexico bilateral agreement, USDA APHIS international health certificates are exempt for tourist pets; SENASICA issues a free Pet Import Certificate (CIS) upon port inspection.",
    "entryAirports": [
      "Cancún International (CUN)",
      "Mexico City Benito Juárez (MEX)",
      "Guadalajara (GDL)",
      "Puerto Vallarta (PVR)",
      "Los Cabos (SJD)",
      "All US-Mexico Land Border Crossings (San Ysidro, Otay Mesa, Laredo, El Paso, CBX)"
    ],
    "airlinePolicies": [
      {
        "name": "Aeromexico",
        "code": "AM",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 9,
        "notes": "Allows dogs and cats in-cabin on direct US-Mexico flights ($125–$150 USD fee). Combined weight of pet and carrier must not exceed 9kg (20 lbs).",
        "feeEstimate": "$125–$150 USD each way"
      },
      {
        "name": "Volaris",
        "code": "Y4",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 10,
        "notes": "Popular low-cost option allowing small pets in cabin ($100–$130 USD fee).",
        "feeEstimate": "$100–$130 USD each way"
      },
      {
        "name": "Delta Air Lines",
        "code": "DL",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Accepts in-cabin pets on direct flights into Cancun, Mexico City, and Cabo ($95 USD fee).",
        "feeEstimate": "$95 USD each way",
        "airlineGuideSlug": "delta-air-lines"
      },
      {
        "name": "United Airlines",
        "code": "UA",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Accepts small dogs and cats in-cabin on US-Mexico routes ($150 USD fee).",
        "feeEstimate": "$150 USD each way",
        "airlineGuideSlug": "united-airlines"
      }
    ],
    "transitAdvice": {
      "headline": "Border Driving Crossings vs Mexican Airport OISA Inspection",
      "layoverRules": "Domestic Mexican connections: Once your pet clears the SENASICA OISA inspection at your first port of entry (e.g. Mexico City MEX or Guadalajara GDL), you receive the green CIS certificate, which allows smooth transit on domestic flights.",
      "directVsTransit": "Airport Arrival Protocol: Upon deplaning in Mexico, proceed to the SENASICA / SAGARPA OISA module before exiting customs. The officer conducts a physical check for external parasites and stamps your clearance in 10–15 minutes.",
      "landBorderOption": "Driving Across the US-Mexico Border: At land ports (San Ysidro, Otay Mesa, El Paso, Laredo), stop at the OISA checkpoint. If entering via the Cross Border Xpress (CBX) bridge from San Diego into Tijuana Airport, an OISA station is located inside the terminal.",
      "climateRestrictions": "Commercial pet food rules: You may bring one unopened commercial bag of dry pet food (up to 50 lbs / 22 kg) with USDA labels in English or Spanish. Loose bags or fresh/raw meat products are strictly confiscated."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "Rabies Vaccination & Microchip Verification",
        "description": "Ensure rabies vaccine is current and signed by a licensed veterinarian. Confirm 15-digit ISO microchip (mandatory for returning to the US under CDC rules)."
      },
      {
        "step": 2,
        "timing": "Day -14 to -7 Before Travel",
        "title": "Parasite Prevention Protocol",
        "description": "Administer veterinary flea, tick, and deworming treatments. Ensuring the pet is 100% free of external parasites avoids border treatment delays."
      },
      {
        "step": 3,
        "timing": "Day -3 to -1",
        "title": "Airline In-Cabin Pet Booking",
        "description": "Confirm in-cabin pet reservation with Aeromexico, Volaris, Delta, United, or American."
      },
      {
        "step": 4,
        "timing": "Arrival Day at Mexico Port of Entry",
        "title": "SENASICA OISA Office Physical Inspection",
        "description": "Present pet and rabies certificate to the SENASICA OISA inspection post at the airport or border booth for free physical exam and issuance of the Official Pet Import Certificate (CIS)."
      }
    ],
    "faqs": [
      {
        "q": "How can I take my dog to Mexico from the USA?",
        "a": "To take a dog to Mexico from the US: (1) Ensure your dog has a valid rabies vaccination certificate signed by a licensed vet; (2) Ensure your pet is treated for fleas, ticks, and worms; (3) Book an in-cabin pet flight on Aeromexico, Volaris, Delta, or United (or drive across a land border); and (4) Upon arrival in Mexico, take your pet to the SENASICA OISA office at the airport or border for a free physical inspection. You will be issued a free Official Pet Import Certificate (CIS) with 0 days quarantine."
      },
      {
        "q": "Does Mexico SENASICA require an official USDA health certificate for dogs?",
        "a": "No! Under the simplified bilateral accord between USDA APHIS and Mexico SENASICA, companion dogs and cats entering Mexico from the US for tourism no longer require a formal USDA-endorsed international health certificate. A standard veterinary rabies certificate and on-site SENASICA OISA inspection are all that is required."
      },
      {
        "q": "Can I drive across the US-Mexico border with my dog or cat?",
        "a": "Yes! Driving across land border crossings (like San Ysidro, Otay Mesa, Laredo, or El Paso) is very common. Stop at the SENASICA inspection post to have your pet’s rabies certificate reviewed and your pet checked for ectoparasites."
      },
      {
        "q": "What happens at SENASICA airport inspection in Cancun, Mexico City, or Puerto Vallarta?",
        "a": "After landing and collecting your luggage, you visit the SENASICA OISA desk. The official veterinarian checks your pet’s rabies certificate, scans the microchip, and briefly inspects the pet’s fur and ears for ticks or fleas. The process takes 10–15 minutes, is completely free, and grants immediate entry."
      },
      {
        "q": "Can I bring pet food into Mexico from the United States?",
        "a": "Yes, but with strict rules: you may bring one unopened, factory-sealed commercial bag of dry pet food (up to 50 lbs / 22 kg) that includes USDA/FDA packaging labels. Open bags, homemade pet food, or bulk raw meat will be confiscated by Mexican agricultural inspectors."
      },
      {
        "q": "What is needed to bring my dog back to the US from Mexico?",
        "a": "Under CDC regulations, because Mexico is classified as a dog-rabies free/low-risk country, returning to the US only requires: (1) An ISO 11784/11785 microchip; (2) The dog must be at least 6 months old; and (3) A free online CDC Dog Import Form submission receipt generated on cdc.gov prior to crossing."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "mx-req-1",
        "category": "PARASITE_TREATMENT",
        "categoryLabel": "SENASICA Physical Health Inspection",
        "title": "OISA Ectoparasite Inspection & Clearance",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Pet must be clinically healthy and free of ectoparasites (ticks, fleas, mites) and skin lesions upon physical inspection.",
          "If ectoparasites are found during inspection, the owner must pay for private Mexican veterinary treatment before entry is granted."
        ],
        "protocol": "Physical inspection conducted by SENASICA veterinarian at airport or border OISA office.",
        "sourceName": "SENASICA Mexico (SADER)",
        "sourceUrl": "https://www.gob.mx/senasica/documentos/si-viajas-con-tu-mascota-194177",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "mx-req-2",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Rabies Immunization",
        "title": "Current Rabies Vaccination Certificate",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Valid rabies vaccination certificate signed by a licensed US veterinarian.",
          "Must state animal breed, sex, age, weight, vaccine manufacturer, lot number, and expiration date.",
          "Animals under 3 months of age are exempt from rabies vaccination."
        ],
        "protocol": "Document Review: Inspected by SENASICA officer at port of entry.",
        "sourceName": "SENASICA Mexico",
        "sourceUrl": "https://www.gob.mx/senasica/documentos/si-viajas-con-tu-mascota-194177",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "mx-req-3",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Microchip Identification Standard",
        "applicableSpecies": "BOTH",
        "severity": "NON_BLOCKING",
        "rules": [
          "15-digit ISO microchip strongly recommended for Mexican entry and mandatory for re-entry into the United States under CDC guidelines."
        ],
        "protocol": "Identity Scanning: Scanned at OISA desk and recorded on entry certificate.",
        "sourceName": "SENASICA / CDC",
        "sourceUrl": "https://www.gob.mx/senasica/documentos/si-viajas-con-tu-mascota-194177",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "mx-req-4",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "SENASICA Certificate of Import (CIS)",
        "title": "Official Zoosanitary Import Certificate (CIS)",
        "applicableSpecies": "BOTH",
        "severity": "NON_BLOCKING",
        "rules": [
          "Issued free of charge by SENASICA officer upon completing physical inspection at port of entry.",
          "Serves as official entry document for domestic travel within Mexico."
        ],
        "protocol": "Issued on-site at airport customs hall or border station.",
        "sourceName": "SENASICA SADER",
        "sourceUrl": "https://www.gob.mx/senasica/documentos/si-viajas-con-tu-mascota-194177",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-ireland": {
    "slug": "usa-to-ireland",
    "from": "United States",
    "to": "Ireland",
    "fromFlag": "🇺🇸",
    "toFlag": "🇮🇪",
    "originCode": "US",
    "destCode": "IE",
    "region": "North America → European Union (Island Biosecurity)",
    "authority": "Department of Agriculture, Food and the Marine (DAFM)",
    "legalBasis": "Regulation (EU) No 576/2013 & Commission Delegated Regulation (EU) 2018/772",
    "description": "Strict island biosecurity regulations for bringing pets from the USA to the Republic of Ireland. Enforces mandatory Praziquantel tapeworm treatment and advance arrival pre-notification.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The US is an Annex II rabies-controlled country. No rabies blood titer test is required for direct travel.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon pre-booked compliance inspection at Dublin Airport (DUB), Shannon (SNN), or Cork (ORK).",
    "leadTime": "21 Days + Tapeworm",
    "leadTimeDetail": "21-day rabies latency period + mandatory veterinary tapeworm treatment administered 24–120 hours before arrival.",
    "certificateType": "EU Non-Commercial Health Certificate (Annex IV)",
    "certificateDetail": "Must be issued by USDA-accredited vet and endorsed via USDA APHIS VEHCS within 10 days of Irish arrival.",
    "entryAirports": [
      "Dublin Airport (DUB)",
      "Shannon Airport (SNN)",
      "Cork Airport (ORK)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "English Bull Terrier",
      "Staffordshire Bull Terrier",
      "Rottweiler",
      "Doberman Pinscher",
      "German Shepherd (Alsatian)",
      "Rhodesian Ridgeback under Irish Control of Dogs Act"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO 11784/11785 Microchip",
        "description": "Implant 15-digit microchip before rabies vaccine."
      },
      {
        "step": 2,
        "timing": "At Least 21 Days Before Travel",
        "title": "Rabies Immunization",
        "description": "Administer vaccine; wait 21 days for primary vaccination latency."
      },
      {
        "step": 3,
        "timing": "Within 10 Days Before Flight",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "Submit EU Annex IV certificate for USDA federal endorsement."
      },
      {
        "step": 4,
        "timing": "24 to 120 Hours Before Landing",
        "title": "Mandatory Veterinary Tapeworm Pill",
        "description": "Veterinarian administers Praziquantel and records exact date and time in the certificate."
      },
      {
        "step": 5,
        "timing": "At Least 24 Hours Before Departure",
        "title": "DAFM Advance Arrival Pre-Notification",
        "description": "Book mandatory compliance check with Dublin Airport animal inspection facility."
      }
    ],
    "faqs": [
      {
        "q": "Is tapeworm treatment mandatory for dogs entering Ireland from the US?",
        "a": "Yes! Ireland is free of Echinococcus multilocularis. All dogs entering the Republic of Ireland must be treated with Praziquantel by a licensed veterinarian between 24 and 120 hours prior to arrival."
      },
      {
        "q": "Do I have to notify Irish authorities before flying?",
        "a": "Yes. You must submit an advance pre-notification to the Department of Agriculture, Food and the Marine (DAFM) at least 24 hours prior to flight to ensure an inspector is scheduled at Dublin, Shannon, or Cork airport."
      },
      {
        "q": "Are restricted breeds allowed in Ireland?",
        "a": "Restricted breeds (like German Shepherds, Rottweilers, and Staffies) are permitted to enter Ireland, but when in public they must be muzzled, kept on a strong leash under 2 meters by a person over 16 years of age, and wear an ID collar tag."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "ie-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "DAFM Echinococcus Multilocularis Protocol",
        "title": "Mandatory 24–120 Hour Tapeworm Treatment",
        "severity": "BLOCKING",
        "rules": [
          "Must contain Praziquantel.",
          "Administered between 24 and 120 hours before scheduled landing in Ireland."
        ],
        "protocol": "Recorded in EU Annex IV Section II by accredited vet.",
        "sourceName": "Irish DAFM",
        "sourceUrl": "https://www.gov.ie/en/publication/21d40-pet-travel/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "australia-to-uk": {
    "slug": "australia-to-uk",
    "from": "Australia",
    "to": "United Kingdom",
    "fromFlag": "🇦🇺",
    "toFlag": "🇬🇧",
    "originCode": "AU",
    "destCode": "GB",
    "region": "Oceania → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Australia to Great Britain. Australia is listed in Part 1 of Annex II to Regulation (EU) No 577/2013 (rabies-free country). Requires ISO microchip, rabies vaccination, DAFF export health certificate, 24–120 hour tapeworm treatment for dogs, and arrival as manifest cargo.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Australia is a Part 1 listed rabies-free country. No rabies antibody titer test is required for entry into Great Britain.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance at London Heathrow Animal Reception Centre (HARC) or Gatwick.",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine + DAFF government vet exam + 24–120 hour tapeworm treatment.",
    "certificateType": "Great Britain Pet Health Certificate (endorsed by DAFF)",
    "certificateDetail": "Must be issued by a registered Australian vet and officially endorsed by Australian DAFF.",
    "entryAirports": [
      "London Heathrow (LHR - HARC Cargo)",
      "London Gatwick (LGW - Cargo)",
      "Manchester Airport (MAN - Cargo)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30+ Days Before Departure",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Administer rabies vaccine after confirming 15-digit microchip."
      },
      {
        "step": 2,
        "timing": "24 to 120 Hours Before UK Landing",
        "title": "Tapeworm Treatment for Dogs",
        "description": "Australian vet administers Praziquantel and records exact date and time on export certificate."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "DAFF Export Health Certificate Endorsement",
        "description": "DAFF official veterinarian inspects pet and stamps the Great Britain health certificate."
      },
      {
        "step": 4,
        "timing": "Arrival at Heathrow HARC",
        "title": "Manifest Cargo Customs Clearance",
        "description": "Pet cleared by City of London veterinarians at HARC facility and released to owner."
      }
    ],
    "faqs": [
      {
        "q": "Is quarantine required when moving a pet from Australia to the UK?",
        "a": "No! Because Australia is free of rabies, pets entering Great Britain directly face zero quarantine, provided microchip, rabies vaccine, tapeworm treatment, and official health certificate are compliant."
      },
      {
        "q": "Can my pet fly in the cabin from Sydney to London?",
        "a": "No. All companion animals entering the UK must arrive as manifest cargo through an approved Border Inspection Post (like HARC at Heathrow)."
      },
      {
        "q": "Does Australia require rabies vaccination to export a dog to the UK?",
        "a": "Yes. Even though Australia is rabies-free, the UK government mandates that all dogs entering Great Britain must be vaccinated against rabies at least 21 days prior to departure."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "au-gb-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "DEFRA Tapeworm Protocol for Dogs",
        "title": "Mandatory 24–120h Praziquantel Treatment",
        "severity": "BLOCKING",
        "rules": [
          "Administered 24 to 120 hours before UK landing by registered Australian vet.",
          "Contains Praziquantel."
        ],
        "protocol": "Verified at London Heathrow Animal Reception Centre (HARC).",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "canada-to-usa": {
    "slug": "canada-to-usa",
    "from": "Canada",
    "to": "United States",
    "fromFlag": "🇨🇦",
    "toFlag": "🇺🇸",
    "originCode": "CA",
    "destCode": "US",
    "region": "North America Cross-Border",
    "authority": "Centers for Disease Control and Prevention (CDC) & USDA APHIS",
    "legalBasis": "CDC Final Rule on Dog Importation (42 CFR Part 71) & Canadian Food Inspection Agency (CFIA)",
    "description": "Updated cross-border regulations for bringing dogs and cats from Canada into the United States under active CDC 2024–2026 entry rules. Covers mandatory free online CDC Dog Import Form receipts, 6-month age limits, ISO microchip verification, 0-day quarantine, and land border vs airport clearance.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Canada is classified by the CDC as a dog-rabies free or low-risk country. No rabies titer test is required for entry into the United States.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Immediate clearance at US land border ports or airport customs with valid CDC documentation.",
    "leadTime": "Instant Online Form",
    "leadTimeDetail": "CDC Dog Import Form must be submitted online prior to arrival; valid for 6 months.",
    "certificateType": "CDC Dog Import Form Receipt & CFIA Rabies Certificate",
    "certificateDetail": "Free online CDC Dog Import Form submission receipt + proof of valid rabies vaccination.",
    "entryAirports": [
      "All US-Canada Land Border Ports (Blaine, Peace Arch, Ambassador Bridge, Buffalo Peace Bridge)",
      "Pre-Clearance Airports (Toronto YYZ, Vancouver YVR, Montreal YUL, Calgary YYC)"
    ],
    "airlinePolicies": [
      {
        "name": "Air Canada",
        "code": "AC",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 10,
        "notes": "Allows small dogs and cats in-cabin on cross-border US flights ($50–$100 CAD fee). Pets must fit under the seat in an approved carrier.",
        "feeEstimate": "$50–$100 CAD each way",
        "airlineGuideSlug": "air-canada"
      },
      {
        "name": "WestJet",
        "code": "WS",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 7.5,
        "notes": "Allows in-cabin pets on direct flights from Canada to US destinations ($50–$100 CAD fee).",
        "feeEstimate": "$50–$100 CAD each way"
      },
      {
        "name": "United Airlines",
        "code": "UA",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Accepts in-cabin dogs and cats on cross-border flights from Canadian airports ($150 USD fee).",
        "feeEstimate": "$150 USD each way",
        "airlineGuideSlug": "united-airlines"
      },
      {
        "name": "Delta Air Lines",
        "code": "DL",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Accepts small companion pets in passenger cabin on all flights from Canada to US hubs ($95 USD fee).",
        "feeEstimate": "$95 USD each way",
        "airlineGuideSlug": "delta-air-lines"
      }
    ],
    "transitAdvice": {
      "headline": "Cross-Border Driving vs Airport Pre-Clearance",
      "layoverRules": "Domestic US connections: Once cleared through US Customs and Border Protection (CBP) at the border or Canadian airport pre-clearance, pets travel under standard domestic airline transit rules.",
      "directVsTransit": "Flights departing major Canadian airports (YYZ, YVR, YUL, YYC) clear US CBP customs before departure in Canada (US Pre-Clearance). Present the CDC receipt and Canadian rabies certificate at pre-clearance.",
      "landBorderOption": "Driving Across the Border: Pet owners driving across US-Canada land border crossings (e.g. Blaine, Detroit-Windsor, Niagara Falls) show the digital CDC QR code on their smartphone to the CBP officer in the inspection booth.",
      "climateRestrictions": "Canadian winter travel: Airlines may restrict pets traveling as checked baggage/cargo if airport ramp temperatures drop below -10°C (14°F)."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO 11784/11785 Microchip & Rabies Vaccine",
        "description": "Ensure 15-digit microchip is implanted and rabies vaccine is current on Canadian veterinary records."
      },
      {
        "step": 2,
        "timing": "Day -7 to -1 Before Departure",
        "title": "Submit Free Online CDC Dog Import Form",
        "description": "Complete the official online CDC Dog Import Form on cdc.gov; download the email receipt containing the QR code (valid for 6 months)."
      },
      {
        "step": 3,
        "timing": "Day -3 to -1",
        "title": "Reserve Pet Space with Airline",
        "description": "Confirm in-cabin pet reservation with Air Canada, WestJet, United, or Delta."
      },
      {
        "step": 4,
        "timing": "Border Crossing / Departure Day",
        "title": "US Customs & Border Protection (CBP) Clearance",
        "description": "Present CDC receipt QR code and Canadian rabies certificate at land border booth or airport US pre-clearance for 0-day quarantine entry."
      }
    ],
    "faqs": [
      {
        "q": "What is the new CDC Dog Import Form required for dogs from Canada?",
        "a": "Under CDC regulations implemented in August 2024 and active through 2026, all dogs entering the United States from Canada (including returning US dogs) must have an approved CDC Dog Import Form receipt. The form is 100% free to generate online on the CDC website and is valid for multiple entries for up to 6 months."
      },
      {
        "q": "Can puppies under 6 months cross from Canada to the US?",
        "a": "No. Under federal CDC regulations, all dogs entering the United States from any foreign country must be at least 6 months (24 weeks) of age at the time of entry. Puppies under 6 months will be denied entry."
      },
      {
        "q": "Can I drive my dog across the Canadian border into the US by car?",
        "a": "Yes. Cross-border driving is very popular. You only need to show the digital or printed CDC Dog Import Form receipt QR code along with your Canadian rabies certificate to the US CBP officer at the land border booth."
      },
      {
        "q": "Are cats required to have a CDC form to enter the US from Canada?",
        "a": "No. The CDC Dog Import Form applies exclusively to dogs. Domestic cats do not require CDC paperwork or a federal rabies certificate to enter the US from Canada, although airlines require rabies records and state health laws may apply."
      },
      {
        "q": "Does Canada to US pet travel require a rabies titer test or quarantine?",
        "a": "No. Because Canada is recognized as rabies-free/low-risk by the CDC, no rabies titer test (FAVN/RNATT) is required and dogs qualify for immediate release with 0 days quarantine."
      },
      {
        "q": "Is USDA endorsement or CFIA certification required for Canadian tourist dogs?",
        "a": "No. For tourist dogs entering the US from Canada, formal CFIA export endorsement or USDA import permits are not required. The free online CDC receipt and standard Canadian veterinary rabies certificate are sufficient."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "ca-us-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "CDC Dog Import Form Receipt",
        "title": "Mandatory Online CDC Dog Import Form Receipt",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Must complete the free online CDC Dog Import Form prior to travel.",
          "Must present digital or printed email confirmation receipt with QR code to airline and CBP officers.",
          "Form receipt is valid for multiple entries for 6 months as long as the dog has not visited a rabies-high-risk country."
        ],
        "protocol": "CBP Gate Check: CBP officers scan receipt QR code at land border booths and airport pre-clearance.",
        "sourceName": "US Centers for Disease Control (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "ca-us-req-2",
        "category": "AGE_RESTRICTION",
        "categoryLabel": "CDC 6-Month Minimum Age Mandate",
        "title": "Minimum 6-Month (24-Week) Age Requirement",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "All dogs entering the United States must be at least 6 months old at the time of entry.",
          "Puppies under 6 months of age are strictly prohibited from entry."
        ],
        "protocol": "Strict Age Enforcement: Birthdate on veterinary certificate is verified by border officers.",
        "sourceName": "CDC Dog Importation Rules",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "ca-us-req-3",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Standard 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Must have an ISO 11784/11785 compliant 15-digit microchip implanted before travel.",
          "Microchip number must be accurately entered on the CDC Dog Import Form."
        ],
        "protocol": "Identity Verification: Microchip number must match all accompanying health documents.",
        "sourceName": "CDC & USDA APHIS",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "ca-us-req-4",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Canadian Rabies Certificate",
        "title": "Valid Rabies Immunization Certificate",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Valid rabies vaccination certificate signed by a licensed Canadian veterinarian.",
          "Certificate must specify animal breed, sex, age, weight, vaccine manufacturer, lot number, and expiration."
        ],
        "protocol": "Border Review: Presented to CBP officer upon crossing.",
        "sourceName": "Canadian Food Inspection Agency (CFIA)",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-uae": {
    "slug": "usa-to-uae",
    "from": "United States",
    "to": "United Arab Emirates",
    "fromFlag": "🇺🇸",
    "toFlag": "🇦🇪",
    "originCode": "US",
    "destCode": "AE",
    "region": "North America → Middle East",
    "authority": "Ministry of Climate Change and Environment (MOCCAE UAE) & USDA APHIS",
    "legalBasis": "Federal Law No. 22 of 2016 & USDA APHIS Live Animal Export Protocol",
    "description": "Statutory non-commercial entry regulations for traveling with pets from the USA to the UAE. Requires electronic MOCCAE Import Permit, RNATT rabies titer test (≥ 0.5 IU/mL), USDA APHIS VEHCS endorsed international health certificate, and arrival as manifest cargo.",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "Rabies Neutralizing Antibody Titre (RNATT) test result ≥ 0.5 IU/mL from a recognized lab (Kansas State or DOD).",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon cargo customs clearance at Dubai (DXB) or Abu Dhabi (AUH).",
    "leadTime": "3–4 Months Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine + RNATT blood draw + MOCCAE import permit + USDA VEHCS endorsement within 10 days.",
    "certificateType": "MOCCAE Electronic Import Permit & USDA APHIS Export Certificate",
    "certificateDetail": "Must hold MOCCAE Import Permit paired with USDA VEHCS endorsed bilingual health certificate.",
    "entryAirports": [
      "Dubai International Airport (DXB - Cargo)",
      "Abu Dhabi International (AUH - Cargo)"
    ],
    "restrictedBreeds": [
      "Pit Bulls",
      "Staffordshire Bull Terrier",
      "American Bully",
      "Doberman Pinscher",
      "Rottweiler",
      "Boxer",
      "Mastiff types",
      "Japanese Tosa"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "3–4 Months Before Flight",
        "title": "Microchip, Rabies & RNATT Titer Test",
        "description": "Administer rabies vaccine and draw blood for RNATT test at Kansas State Veterinary Diagnostic Lab."
      },
      {
        "step": 2,
        "timing": "30 Days Before Flight",
        "title": "Obtain MOCCAE Import Permit",
        "description": "Apply online through the MOCCAE portal with USDA records and RNATT test report."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "USDA Accredited Exam & VEHCS Endorsement",
        "description": "Veterinarian submits certificate for electronic USDA APHIS endorsement."
      },
      {
        "step": 4,
        "timing": "Arrival at Dubai Cargo Terminal",
        "title": "MOCCAE Port Verification",
        "description": "Clearance and release at DXB Cargo Centre."
      }
    ],
    "faqs": [
      {
        "q": "Is Kansas State University FAVN test accepted by the UAE?",
        "a": "Yes, Kansas State University KSVDL is the primary USDA-approved rabies testing laboratory recognized by the UAE MOCCAE."
      },
      {
        "q": "What vaccinations are mandatory for dogs entering Dubai or Abu Dhabi?",
        "a": "Dogs require rabies vaccine (administered at least 21 days before travel), DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza), and an RNATT test result of at least 0.5 IU/mL."
      },
      {
        "q": "Can I bring my dog in the passenger cabin into the UAE?",
        "a": "No. Under MOCCAE and UAE civil aviation regulations, all dogs and cats must enter the UAE as manifested cargo through Dubai (DXB) or Abu Dhabi (AUH)."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "us-ae-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "MOCCAE Import Permit Mandate",
        "title": "UAE MOCCAE Import Permit",
        "severity": "BLOCKING",
        "rules": [
          "Must hold active MOCCAE Import Permit (valid 30 days).",
          "Pet must fly as manifest cargo with Air Waybill (AWB)."
        ],
        "protocol": "Airlines enforce MOCCAE permit prior to loading in the US.",
        "sourceName": "UAE MOCCAE",
        "sourceUrl": "https://www.moccae.gov.ae",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-usa": {
    "slug": "uk-to-usa",
    "from": "United Kingdom",
    "to": "United States",
    "fromFlag": "🇬🇧",
    "toFlag": "🇺🇸",
    "originCode": "GB",
    "destCode": "US",
    "region": "Great Britain → North America",
    "authority": "Centers for Disease Control and Prevention (CDC) & USDA APHIS",
    "legalBasis": "CDC Final Rule on Dog Importation (42 CFR Part 71) & 9 CFR Part 91",
    "description": "Official US entry regulations for dogs and cats flying from Great Britain to the United States under active CDC biosecurity statutes. Covers the August 2024 CDC Dog Import Form submission, 6-month age floor, ISO microchip verification, in-cabin flight options on outbound transatlantic carriers, and 0-day quarantine.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The United Kingdom is categorized by the CDC as a dog-rabies free country. No rabies titer test or CDC Animal Care Facility reservation is required.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release at all US international gateway airports upon presentation of the CDC Dog Import Form receipt.",
    "leadTime": "Instant Online Form",
    "leadTimeDetail": "Online CDC Dog Import Form must be completed before travel; valid for 6 months.",
    "certificateType": "CDC Dog Import Form Receipt & UK Export Health Certificate",
    "certificateDetail": "Free online CDC submission receipt + proof of ISO microchip and rabies vaccination.",
    "entryAirports": [
      "New York (JFK)",
      "Boston Logan (BOS)",
      "Chicago O'Hare (ORD)",
      "Los Angeles (LAX)",
      "Miami (MIA)",
      "San Francisco (SFO)",
      "Washington Dulles (IAD)"
    ],
    "airlinePolicies": [
      {
        "name": "British Airways",
        "code": "BA",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "BA flies pets as manifest cargo only on transatlantic flights departing London Heathrow into US gateway airports.",
        "feeEstimate": "£900–£2,200 GBP",
        "airlineGuideSlug": "british-airways"
      },
      {
        "name": "Virgin Atlantic",
        "code": "VS",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Accepts pet dogs and cats in temperature-controlled cargo hold departing London Heathrow to US destinations.",
        "feeEstimate": "£950–£2,400 GBP",
        "airlineGuideSlug": "virgin-atlantic"
      },
      {
        "name": "Air France (via Paris CDG)",
        "code": "AF",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 8,
        "notes": "Outbound passengers from the UK can transit via Paris CDG to fly small pets in-cabin to the US on Air France.",
        "feeEstimate": "€125–€200 EUR each way",
        "airlineGuideSlug": "air-france"
      },
      {
        "name": "KLM Royal Dutch Airlines (via Amsterdam AMS)",
        "code": "KL",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 8,
        "notes": "Allows in-cabin dogs and cats under 8kg departing UK airports (e.g. Manchester, Edinburgh, Heathrow) via Amsterdam to the US.",
        "feeEstimate": "€125–€200 EUR each way"
      }
    ],
    "transitAdvice": {
      "headline": "Outbound Flights from UK: In-Cabin vs Direct Cargo",
      "layoverRules": "European transit flights: If transiting through Paris (CDG), Amsterdam (AMS), or Frankfurt (FRA) with an in-cabin pet, verify that the pet stays with you in the passenger transit zone. Ensure your CDC Dog Import Form lists the origin as the UK.",
      "directVsTransit": "Direct flights on British Airways and Virgin Atlantic require booking live animal cargo. If you want your pet in the cabin, booking a connecting flight through an EU hub (Air France or KLM) is the standard method.",
      "landBorderOption": "UK to US travel is entirely transatlantic by air.",
      "climateRestrictions": "US summer heat embargoes: Many US airports enforce cargo embargoes between May 15 and September 15 when ramp temperatures exceed 85°F (29.4°C)."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO 11784/11785 Microchip Verification",
        "description": "Confirm 15-digit microchip is active, scannable, and recorded on UK veterinary records."
      },
      {
        "step": 2,
        "timing": "Day -14 to -7 Before Departure",
        "title": "UK Official Vet Health Exam & Export Certificate",
        "description": "Licensed UK veterinarian conducts pre-flight clinical examination and issues export health documentation."
      },
      {
        "step": 3,
        "timing": "Day -7 to -1",
        "title": "Submit Free Online CDC Dog Import Form",
        "description": "Complete the official online CDC Dog Import Form on cdc.gov; download the email receipt containing the QR code (valid for 6 months)."
      },
      {
        "step": 4,
        "timing": "Departure & Arrival Day",
        "title": "Airline Gate & US CBP Customs Clearance",
        "description": "Present CDC receipt QR code and UK vet records to airline agent at check-in and US Customs and Border Protection at US port of entry for immediate release."
      }
    ],
    "faqs": [
      {
        "q": "How do I bring my dog from the UK to the United States under the new CDC rule?",
        "a": "To bring a dog from the UK to the US under CDC regulations: (1) Ensure your dog is at least 6 months old; (2) Verify the dog has an ISO 11784/11785 15-digit microchip; (3) Complete the free online CDC Dog Import Form on cdc.gov before departure; and (4) Show the email receipt QR code to airline staff and US CBP officers upon landing for 0-day quarantine entry."
      },
      {
        "q": "Can dogs fly in the passenger cabin on flights leaving the UK for America?",
        "a": "Yes! While entering the UK prohibits in-cabin pets, leaving the UK on outbound international flights permits in-cabin pet travel on select carriers transiting through European hubs (such as Air France via Paris CDG or KLM via Amsterdam AMS) for pets under 8kg with carrier."
      },
      {
        "q": "What CDC documents are required for dogs from Great Britain?",
        "a": "Because Great Britain is officially classified by the CDC as dog-rabies free, dogs only require an ISO microchip, proof of being at least 6 months old, and a free online CDC Dog Import Form submission receipt."
      },
      {
        "q": "Does the US require rabies quarantine for British pets?",
        "a": "No. Companion animals entering the United States directly from rabies-free countries like the United Kingdom face zero quarantine and are released immediately upon CBP document inspection."
      },
      {
        "q": "Can puppies under 6 months old travel from the UK to the US?",
        "a": "No. CDC regulations strictly ban the entry of any dog under 6 months (24 weeks) of age into the United States from any foreign country."
      },
      {
        "q": "Do cats need a CDC form or health certificate to fly from the UK to the US?",
        "a": "No. The CDC Dog Import Form applies exclusively to dogs. Domestic cats do not require CDC paperwork or federal rabies certificates for entry, though airlines require a veterinary health certificate."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "uk-us-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "CDC Dog Import Form Receipt",
        "title": "Mandatory Online CDC Dog Import Form Receipt",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Must complete the free online CDC Dog Import Form prior to boarding.",
          "Must present digital or printed email confirmation receipt with QR code to airline and CBP officers.",
          "Receipt is valid for 6 months for multiple entries from rabies-free countries."
        ],
        "protocol": "CBP Gate Check: CBP officers scan receipt QR code at airport port of entry.",
        "sourceName": "US Centers for Disease Control (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "uk-us-req-2",
        "category": "AGE_RESTRICTION",
        "categoryLabel": "CDC 6-Month Minimum Age Mandate",
        "title": "Minimum 6-Month Age Requirement",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "All dogs entering the United States must be at least 6 months (24 weeks) old on travel day.",
          "Puppies younger than 6 months are denied entry."
        ],
        "protocol": "Strict Age Enforcement: Birthdate on veterinary certificate is verified by border officers.",
        "sourceName": "CDC Dog Importation Rules",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "uk-us-req-3",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Standard 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Must have an ISO 11784/11785 compliant 15-digit microchip implanted before travel.",
          "Microchip number must be accurately entered on the CDC Dog Import Form."
        ],
        "protocol": "Identity Verification: Microchip number must match all accompanying health documents.",
        "sourceName": "CDC & USDA APHIS",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "uk-us-req-4",
        "category": "EXPORT_CERTIFICATE",
        "categoryLabel": "UK Export Documentation",
        "title": "UK Official Vet Health & Export Certificate",
        "applicableSpecies": "BOTH",
        "severity": "NON_BLOCKING",
        "rules": [
          "Clinical health certificate issued by a registered UK veterinary surgeon within 10 days of travel.",
          "Confirms animal is fit to travel and free of infectious diseases."
        ],
        "protocol": "Airline Check-In: Required by transatlantic airline before boarding.",
        "sourceName": "UK DEFRA & APHA",
        "sourceUrl": "https://www.gov.uk/take-pet-abroad",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-australia": {
    "slug": "usa-to-australia",
    "from": "United States",
    "to": "Australia",
    "fromFlag": "🇺🇸",
    "toFlag": "🇦🇺",
    "originCode": "US",
    "destCode": "AU",
    "region": "North America → Oceania (Strict Biosecurity)",
    "authority": "Department of Agriculture, Fisheries and Forestry (DAFF)",
    "legalBasis": "Australian Biosecurity Act 2015 & Group 3 Import Conditions",
    "description": "Strict statutory biosecurity conditions for importing companion dogs and cats from the USA to Australia. Governs RNATT testing, DAFF import permits, and mandatory Mickleham Post-Entry Quarantine (PEQ).",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "Rabies Neutralising Antibody Titre (RNATT) test mandatory. Minimum 180-day waiting period from date of laboratory blood collection required for standard 10-day quarantine.",
    "quarantineDays": "10–30 Days PEQ",
    "quarantineDetail": "Mandatory stay at the Mickleham Post-Entry Quarantine Facility in Melbourne (VIC). Advance reservation mandatory.",
    "leadTime": "7–8 Months Minimum",
    "leadTimeDetail": "Multi-stage statutory timeline: RNATT blood draw (Day 0), 180-day latency clock, DAFF import permit processing (up to 40 business days), and quarantine booking.",
    "certificateType": "DAFF Import Permit & USDA APHIS Dual-Endorsed Veterinary Certificate",
    "certificateDetail": "Australian Biosecurity Import Permit issued by DAFF + official Australian Health Certificate endorsed by USDA APHIS.",
    "entryAirports": [
      "Melbourne Airport (MEL) — Direct transfer to Mickleham PEQ facility"
    ],
    "restrictedBreeds": [
      "Dogo Argentino",
      "Fila Brasileiro",
      "Japanese Tosa",
      "American Pit Bull Terrier / Pit Bull types",
      "Perro de Presa Canario"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "7–8 Months Before Travel",
        "title": "ISO Microchip Implantation",
        "description": "Implant a 15-digit ISO 11784/11785 chip before any rabies test or vaccine."
      },
      {
        "step": 2,
        "timing": "180+ Days Before Travel",
        "title": "RNATT Blood Draw & Laboratory Testing",
        "description": "Accredited vet collects blood; KSU or Auburn tests sample (≥ 0.5 IU/mL required). 180-day clock begins on draw date."
      },
      {
        "step": 3,
        "timing": "5–6 Months Before Travel",
        "title": "Apply for DAFF Import Permit",
        "description": "Submit electronic application through BICON portal with RNATT laboratory report."
      },
      {
        "step": 4,
        "timing": "3–4 Months Before Travel",
        "title": "Book Mickleham PEQ Quarantine Space",
        "description": "Reserve a minimum 10-day quarantine stay at the Mickleham facility in Melbourne."
      },
      {
        "step": 5,
        "timing": "Within 5 Days Before Travel",
        "title": "Final Parasite Treatments & USDA Endorsement",
        "description": "Administer internal/external parasite treatments and secure final USDA APHIS raised-seal endorsement."
      }
    ],
    "faqs": [
      {
        "q": "Can my pet skip quarantine in Australia if all tests are negative?",
        "a": "No. Australia is an island nation completely free of dog rabies. All dogs and cats entering from the United States (Group 3 country) must complete a mandatory minimum 10-day post-entry quarantine stay at the Mickleham facility in Melbourne."
      },
      {
        "q": "Why is the Australia timeline at least 7 months long?",
        "a": "Under DAFF rules, a minimum of 180 days must elapse between the date the passing rabies titer blood sample is drawn and the date of arrival in Australia. Combined with the time required to apply for and receive the DAFF import permit (up to 40 days) and book quarantine space, preparation realistically requires 7 to 9 months."
      },
      {
        "q": "Can my pet fly directly to Sydney or Brisbane from the US?",
        "a": "No. All companion animals entering Australia from non-rabies-free origins must land exclusively at Melbourne Airport (MEL) for immediate bonded transport to the Mickleham Post-Entry Quarantine facility."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "au-req-1",
        "category": "TITER_TEST",
        "categoryLabel": "Rabies Neutralising Antibody Titre (RNATT)",
        "title": "Mandatory 180-Day RNATT Waiting Period",
        "severity": "BLOCKING",
        "rules": [
          "Laboratory result must be ≥ 0.5 IU/mL.",
          "Arrival in Australia cannot occur earlier than 180 days after the date blood was drawn."
        ],
        "protocol": "Direct electronic submission from KSU to DAFF.",
        "sourceName": "Australian DAFF Biosecurity",
        "sourceUrl": "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-canada": {
    "slug": "usa-to-canada",
    "from": "United States",
    "to": "Canada",
    "fromFlag": "🇺🇸",
    "toFlag": "🇨🇦",
    "originCode": "US",
    "destCode": "CA",
    "region": "North America Cross-Border",
    "authority": "Canadian Food Inspection Agency (CFIA) & Canada Border Services Agency (CBSA)",
    "legalBasis": "Health of Animals Act (S.C. 1990, c. 21) & CFIA Live Animal Import Regulations",
    "description": "Official statutory compliance guide for taking dogs and cats from the United States into Canada. Covers bilingual rabies certificates, ISO 11784/11785 microchips, 0-day quarantine direct airport and land border entry, Ontario DOLA breed restrictions, and airline cabin vs baggage options.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Canada does not require rabies antibody titer testing (FAVN/RNATT) for personal companion dogs and cats traveling directly from the United States.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon visual documentation inspection by Canada Border Services Agency (CBSA) officers at land border ports or airport customs.",
    "leadTime": "Current Vaccine (30 Days if Primary)",
    "leadTimeDetail": "Valid current rabies vaccination required. If it is a primary vaccination, at least 30 days must have elapsed before border entry for pets ≥ 3 months old.",
    "certificateType": "Official Rabies Vaccination Certificate (Bilingual)",
    "certificateDetail": "Signed rabies certificate by a licensed US veterinarian specifying breed, sex, age, weight, vaccine trade name, lot number, and expiration (English or French).",
    "entryAirports": [
      "Toronto Pearson (YYZ)",
      "Vancouver International (YVR)",
      "Montréal-Trudeau (YUL)",
      "Calgary International (YYC)",
      "All US-Canada Land Border Crossings (Blaine, Detroit, Niagara, Buffalo)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier (Ontario BSL - DOLA)",
      "American Staffordshire Terrier (Ontario)",
      "Staffordshire Bull Terrier (Ontario)",
      "American Pit Bull (and crossbreeds) strictly banned from entry or transit into the Province of Ontario under the Dog Owners’ Liability Act"
    ],
    "airlinePolicies": [
      {
        "name": "Air Canada",
        "code": "AC",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 10,
        "notes": "Allows small dogs and cats in-cabin on cross-border US flights ($50–$100 CAD fee). Pets must fit under the seat in an approved carrier.",
        "feeEstimate": "$50–$100 CAD each way",
        "airlineGuideSlug": "air-canada"
      },
      {
        "name": "WestJet",
        "code": "WS",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 7.5,
        "notes": "Allows in-cabin pets on direct flights from US to Canadian destinations ($50–$100 CAD fee).",
        "feeEstimate": "$50–$100 CAD each way"
      },
      {
        "name": "Delta Air Lines",
        "code": "DL",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Accepts small dogs and cats in-cabin on all direct US-to-Canada flights ($95 USD fee).",
        "feeEstimate": "$95 USD each way",
        "airlineGuideSlug": "delta-air-lines"
      },
      {
        "name": "United Airlines",
        "code": "UA",
        "inCabinAllowed": true,
        "cargoAllowed": false,
        "notes": "Accepts in-cabin dogs and cats on cross-border flights into Canadian hubs ($150 USD fee).",
        "feeEstimate": "$150 USD each way",
        "airlineGuideSlug": "united-airlines"
      }
    ],
    "transitAdvice": {
      "headline": "Cross-Border Driving vs Commercial Air Travel",
      "layoverRules": "Domestic Canadian onward travel: Once cleared through CBSA customs at your first Canadian point of entry, pets travel under standard domestic carrier policies without further border checks.",
      "directVsTransit": "Direct flights landing at YYZ, YVR, YUL, or YYC clear CBSA customs in the baggage hall. Pay the standard $30 CAD inspection fee at the customs desk.",
      "landBorderOption": "Driving Across the Border: Pet owners driving across US-Canada land border crossings (e.g. Blaine/Peace Arch, Detroit-Windsor, Buffalo Peace Bridge) show the veterinary rabies certificate directly to the CBSA officer in the border booth.",
      "climateRestrictions": "Winter pet travel: Canadian carriers may restrict pets in the baggage hold during extreme winter cold (below -10°C / 14°F)."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO 11784/11785 Microchip & Rabies Vaccination",
        "description": "Ensure pet has a 15-digit microchip and active rabies certificate signed by a licensed US veterinarian (in English or French)."
      },
      {
        "step": 2,
        "timing": "Day -14 to -7 Before Travel",
        "title": "Veterinary Pre-Flight Clinical Exam",
        "description": "Licensed US vet confirms pet is clinically healthy and fits airline cabin carrier dimensions."
      },
      {
        "step": 3,
        "timing": "Day -3 to -1",
        "title": "Airline Pet Reservation",
        "description": "Reserve in-cabin pet space with Air Canada, WestJet, Delta, or United."
      },
      {
        "step": 4,
        "timing": "Border Crossing Day",
        "title": "CBSA Border Customs Declaration & Fee",
        "description": "Present rabies certificate at land border booth or airport customs counter; pay standard $30 CAD inspection fee for immediate 0-day quarantine entry."
      }
    ],
    "faqs": [
      {
        "q": "How do I travel to Canada with my pet from the United States?",
        "a": "To travel to Canada from the US with a dog or cat: (1) Ensure your pet has an ISO 11784/11785 microchip; (2) Obtain a valid rabies vaccination certificate in English or French signed by a licensed US vet; (3) Verify your pet is traveling as a personal companion (CFIA bans commercial rescue imports from rabies-high-risk countries); and (4) Present paperwork to CBSA officers at the airport or land border and pay the standard $30 CAD inspection fee."
      },
      {
        "q": "Is a USDA APHIS health certificate required to take a dog to Canada?",
        "a": "No. For personal companion dogs and cats entering Canada from the US for tourism or relocation with their owners, a standard rabies vaccination certificate signed by your licensed private veterinarian is accepted. Formal USDA APHIS endorsement is NOT required for personal tourist pets."
      },
      {
        "q": "Can I drive across the US-Canada border with my dog or cat?",
        "a": "Yes! Driving across US-Canada land border crossings (such as Peace Arch, Ambassador Bridge, or Niagara Falls) is seamless. Hand your pet’s rabies certificate directly to the CBSA officer in the inspection booth."
      },
      {
        "q": "Are Pit Bulls and restricted breeds allowed into Canada?",
        "a": "While Canada has no federal breed ban, the Province of Ontario enforces an import ban on Pit Bull Terriers, Staffordshire Bull Terriers, and American Staffordshire Terriers under the Dog Owners’ Liability Act (DOLA). Restricted breeds cannot be imported into or transit through Ontario."
      },
      {
        "q": "What is the CBSA pet inspection fee at Canadian airports?",
        "a": "Canada Border Services Agency (CBSA) collects a statutory pet inspection fee of approx. $30 CAD + tax for the first animal ($5 CAD for each additional animal) upon clearing customs at Canadian international airports."
      },
      {
        "q": "Does Canada require a rabies titer test or quarantine for US pets?",
        "a": "No. Personal companion dogs and cats traveling directly from the United States do not require a rabies antibody titer test (FAVN/RNATT) and are completely exempt from quarantine."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "us-ca-req-1",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "CFIA Rabies Certificate Requirement",
        "title": "Bilingual Rabies Vaccination Certificate",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Must clearly state breed, color, sex, age, and weight of the animal.",
          "Must state vaccine trade name, lot number, serial number, and duration of immunity (1-year or 3-year).",
          "Must be in English or French and signed by a licensed US veterinarian."
        ],
        "protocol": "CBSA Border Check: CBSA officers inspect rabies certificates at land border booths and airport primary inspection posts.",
        "sourceName": "Canadian Food Inspection Agency (CFIA)",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "us-ca-req-2",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Standard 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "ISO 11784/11785 compliant 15-digit microchip implanted before travel.",
          "Mandatory for all dogs; strongly recommended and airline-required for cats."
        ],
        "protocol": "Identity Integrity: Microchip number eliminates border inspection delays with CBSA.",
        "sourceName": "CFIA Animal Health Division",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "us-ca-req-3",
        "category": "BREED_RESTRICTIONS",
        "categoryLabel": "Ontario DOLA Breed Ban",
        "title": "Ontario Dog Owners' Liability Act (DOLA) Pit Bull Ban",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Pit Bull Terriers, Staffordshire Bull Terriers, American Staffordshire Terriers, and American Pit Bulls are strictly banned from entering Ontario.",
          "Applies to dogs entering or transiting through Ontario (including layovers at Toronto Pearson YYZ)."
        ],
        "protocol": "Provincial Enforcement: Prohibited breeds entering Ontario face seizure and immediate re-exportation.",
        "sourceName": "Government of Ontario / CFIA",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "us-ca-req-4",
        "category": "CUSTOMS_FEE",
        "categoryLabel": "CBSA Port Inspection Fee",
        "title": "Statutory Airport Inspection Fee ($30 CAD + Tax)",
        "applicableSpecies": "BOTH",
        "severity": "NON_BLOCKING",
        "rules": [
          "Payable at CBSA primary inspection upon clearing Canadian airport customs ($30 CAD + tax for first animal)."
        ],
        "protocol": "Collected at CBSA customs counter at Toronto (YYZ), Vancouver (YVR), Montreal (YUL), or Calgary (YYC).",
        "sourceName": "CBSA",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-japan": {
    "slug": "usa-to-japan",
    "from": "United States",
    "to": "Japan",
    "fromFlag": "🇺🇸",
    "toFlag": "🇯🇵",
    "originCode": "US",
    "destCode": "JP",
    "region": "North America → East Asia",
    "authority": "Ministry of Agriculture, Forestry and Fisheries (MAFF) Animal Quarantine Service (AQS)",
    "legalBasis": "Rabies Prevention Act (Act No. 247 of 1950) & Domestic Animal Infectious Diseases Control Act",
    "description": "Official biosecurity regulations for bringing companion pets from the USA to Japan. Enforces microchip, dual rabies vaccination, FAVN titer testing, and mandatory 180-day waiting period.",
    "titerRequired": "Mandatory FAVN (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "FAVN test must be performed at an approved laboratory (KSU or Auburn) with result ≥ 0.5 IU/mL. Blood draw starts mandatory 180-day countdown.",
    "quarantineDays": "0–12h (if compliant)",
    "quarantineDetail": "Immediate release (under 12 hours) if all conditions and the full 180-day waiting period are satisfied before landing. Non-compliant pets face up to 180 days in quarantine.",
    "leadTime": "7–8 Months Minimum",
    "leadTimeDetail": "Microchip + 2 rabies shots + FAVN blood draw + 180-day post-draw waiting clock + 40-day advance notification to AQS.",
    "certificateType": "MAFF Form AC / Form C & USDA APHIS Embossed Health Certificate",
    "certificateDetail": "Official Japanese AQS Form AC endorsed with USDA APHIS raised embossed ink seal.",
    "entryAirports": [
      "Tokyo Narita International (NRT)",
      "Tokyo Haneda Airport (HND)",
      "Kansai International (KIX)",
      "Chubu Centrair (NGO)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "7–8 Months Before Travel",
        "title": "ISO 11784/11785 Microchip",
        "description": "Implant 15-digit microchip before any rabies vaccination."
      },
      {
        "step": 2,
        "timing": "Immediately After Microchip",
        "title": "First Rabies Shot",
        "description": "Administer primary rabies shot. Must be an inactivated or recombinant vaccine."
      },
      {
        "step": 3,
        "timing": "30+ Days After 1st Shot",
        "title": "Second Rabies Shot",
        "description": "Administer second rabies shot before the first expires."
      },
      {
        "step": 4,
        "timing": "Day of 2nd Shot or After",
        "title": "FAVN Titer Blood Collection",
        "description": "Vet draws blood; KSU processes sample (≥ 0.5 IU/mL required). 180-day clock begins on draw date."
      },
      {
        "step": 5,
        "timing": "At Least 40 Days Before Arrival",
        "title": "Submit Advance Notification to AQS",
        "description": "Submit electronic notification to the Animal Quarantine Service at your port of entry in Japan."
      },
      {
        "step": 6,
        "timing": "Within 10 Days Before Flight",
        "title": "Pre-Flight Exam & USDA Embossed Seal",
        "description": "Veterinarian conducts clinical exam; USDA APHIS validates forms with physical raised embossed seal."
      }
    ],
    "faqs": [
      {
        "q": "Can my pet skip quarantine when entering Japan?",
        "a": "Yes! If you strictly complete the 180-day waiting period from the date of the FAVN blood draw before arriving in Japan, and your paperwork is authenticated, quarantine inspection at Narita or Haneda takes less than 12 hours."
      },
      {
        "q": "What is the 40-day advance notification rule for Japan?",
        "a": "Under Japanese law, you must submit an advance notification of animal arrival to the Animal Quarantine Service (AQS) at your intended port of entry at least 40 days prior to your arrival date. AQS issues an Approval of Notification that must be presented at check-in."
      },
      {
        "q": "What happens if I arrive in Japan before the 180-day wait is complete?",
        "a": "If your pet arrives on Day 150 of the 180-day clock, your pet will be detained at the airport quarantine facility for the remaining 30 days at your expense."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "jp-req-1",
        "category": "TITER_TEST",
        "categoryLabel": "Japan MAFF FAVN 180-Day Rule",
        "title": "Mandatory 180-Day Pre-Arrival Wait",
        "severity": "BLOCKING",
        "rules": [
          "Result must be ≥ 0.5 IU/mL.",
          "180 full days must elapse between blood draw date and Japan arrival date."
        ],
        "protocol": "AQS inspection at Narita/Haneda.",
        "sourceName": "Japan MAFF AQS",
        "sourceUrl": "https://www.maff.go.jp/aqs/english/animal/dog/index.html",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "india-to-uk": {
    "slug": "india-to-uk",
    "from": "India",
    "to": "United Kingdom",
    "fromFlag": "🇮🇳",
    "toFlag": "🇬🇧",
    "originCode": "IN",
    "destCode": "GB",
    "region": "South Asia → Great Britain",
    "authority": "Animal Quarantine and Certification Services (AQCS / DAHD India) & UK DEFRA / APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) No 576/2013 (Unlisted Third Country)",
    "description": "Official biosecurity regulations for bringing companion pets from India to Great Britain. India is classified as an unlisted third country, requiring an ISO microchip, rabies vaccination, RNATT blood titer test with a mandatory 3-month waiting period, tapeworm treatment, and AQCS export certification.",
    "titerRequired": "Mandatory (3-Month Waiting Period)",
    "titerStatus": "mandatory",
    "titerDetail": "India is an unlisted third country under UK DEFRA statutes. A Rabies Neutralising Antibody Titre (RNATT) blood test must be drawn at least 30 days after vaccination and processed at a DEFRA/EU-approved lab (result ≥ 0.5 IU/ml). A strict 3-calendar-month (90-day) waiting period must elapse between the blood draw date and the date of UK entry.",
    "quarantineDays": "0 Days (Direct Release upon HARC Clearance)",
    "quarantineDetail": "Compliant companion pets entering on an approved airline route as manifest cargo are inspected at Heathrow Animal Reception Centre (HARC) or Gatwick and released directly without quarantine detention.",
    "leadTime": "4–5 Months Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine + 30-day wait before blood draw + 3-month post-draw latency + 7-day AQCS export NOC + 24–120h tapeworm treatment.",
    "certificateType": "Great Britain Pet Health Certificate & AQCS India Export NOC",
    "certificateDetail": "Official GB Pet Health Certificate signed by a licensed veterinarian, endorsed by AQCS (Animal Quarantine and Certification Services) along with an AQCS Export Health Certificate / NOC.",
    "entryAirports": [
      "London Heathrow Airport (LHR / HARC)",
      "London Gatwick Airport (LGW)",
      "Manchester Airport (MAN)",
      "Edinburgh Airport (EDI)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully under the Dangerous Dogs Act 1991"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "At Least 4–5 Months Before Travel",
        "title": "ISO 11784/11785 Microchip",
        "description": "Implant 15-digit non-encrypted microchip. Must precede or occur on the same date as primary rabies vaccination."
      },
      {
        "step": 2,
        "timing": "Immediately Following Microchip",
        "title": "Rabies Immunization",
        "description": "Administer an approved inactivated rabies vaccine. Pet must be at least 12 weeks of age at time of injection."
      },
      {
        "step": 3,
        "timing": "30+ Days Post-Vaccination",
        "title": "RNATT / FAVN Titer Blood Draw",
        "description": "Accredited vet collects serum. Sample sent to DEFRA/EU-approved lab. Result must be ≥ 0.5 IU/ml. The 3-month (90-day) countdown begins on the draw date."
      },
      {
        "step": 4,
        "timing": "Within 7 Days of Departure",
        "title": "AQCS India Export NOC & Health Exam",
        "description": "Present pet, microchip certificate, vaccination book, and original lab titer report to regional AQCS station (Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad) for physical inspection and Export Certificate."
      },
      {
        "step": 5,
        "timing": "24 to 120 Hours Before UK Landing",
        "title": "Mandatory Tapeworm Treatment",
        "description": "Veterinarian administers licensed Praziquantel tapeworm pill and records exact date and time in Section II of the GB Health Certificate."
      },
      {
        "step": 6,
        "timing": "Flight Day into UK",
        "title": "Manifest Cargo & HARC Clearance",
        "description": "Pet flies as manifest cargo under IATA LAR standards. Clears biosecurity at Heathrow Animal Reception Centre (HARC)."
      }
    ],
    "faqs": [
      {
        "q": "Can my pet fly in the cabin from India to the UK?",
        "a": "No. Under UK DEFRA biosecurity regulations, all companion pets entering Great Britain from outside the UK/EU must arrive as manifest cargo on an approved airline route. Pets cannot travel in the passenger cabin or as excess baggage."
      },
      {
        "q": "What is the mandatory 3-month waiting period after the titer test?",
        "a": "Because India is an unlisted third country for rabies, UK law mandates that at least 3 full calendar months (90 days) must elapse from the exact date the blood sample was drawn before your pet can land in the UK."
      },
      {
        "q": "How do I obtain the AQCS Export Certificate in India?",
        "a": "You must apply through the Government of India AQCS portal (aqcsindia.gov.in) and attend an in-person physical examination at the nearest AQCS quarantine station (Delhi, Mumbai, Chennai, Kolkata, Bengaluru, or Hyderabad) within 2 to 7 days before flight departure."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "in-uk-req-1",
        "category": "TITER_TEST",
        "categoryLabel": "DEFRA Unlisted Third Country RNATT Protocol",
        "title": "Rabies Titer (RNATT) & 3-Month Waiting Clock",
        "severity": "BLOCKING",
        "rules": [
          "Blood sample must be collected at least 30 days after rabies vaccination.",
          "Test must be processed at a DEFRA/EU-approved laboratory with an antibody titer ≥ 0.5 IU/ml.",
          "Strict 3-month (90-day) waiting period must elapse from the blood draw date before UK entry."
        ],
        "protocol": "Latency Clock: The 3-month countdown begins on the blood draw date, not the result date. Entry prior to 90 days results in mandatory quarantine.",
        "sourceName": "UK DEFRA & Animal and Plant Health Agency (APHA)",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain/rabies-blood-test",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "in-uk-req-2",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AQCS India Animal Quarantine Export Mandate",
        "title": "AQCS India Veterinary Export Certificate & NOC",
        "severity": "BLOCKING",
        "rules": [
          "Must be issued by an authorized Animal Quarantine Officer at AQCS (Department of Animal Husbandry and Dairying - DAHD).",
          "Physical examination of the pet must occur within 7 days prior to flight departure."
        ],
        "protocol": "Government Endorsement: Indian customs and international airlines will not accept pet cargo without the official physical AQCS stamp and NOC.",
        "sourceName": "Animal Quarantine and Certification Services (AQCS India)",
        "sourceUrl": "http://aqcsindia.gov.in/",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "in-uk-req-3",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "Echinococcus Multilocularis Praziquantel Protocol",
        "title": "Mandatory 24–120 Hour Tapeworm Treatment",
        "severity": "BLOCKING",
        "rules": [
          "Must be administered by a licensed vet not less than 24 hours and not more than 120 hours before UK entry.",
          "Must contain Praziquantel or approved equivalent active ingredient against tapeworm."
        ],
        "protocol": "Clock Requirement: Must be recorded in Section II of the Great Britain Health Certificate with vet signature, date, and exact time.",
        "sourceName": "UK APHA & DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain/tapeworm-treatment-dogs",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "india-to-usa": {
    "slug": "india-to-usa",
    "from": "India",
    "to": "United States",
    "fromFlag": "🇮🇳",
    "toFlag": "🇺🇸",
    "originCode": "IN",
    "destCode": "US",
    "region": "South Asia → North America",
    "authority": "AQCS India & US Centers for Disease Control and Prevention (CDC) / USDA APHIS",
    "legalBasis": "CDC Dog Importation Regulations (42 CFR 71.51, effective August 1, 2024)",
    "description": "Statutory biosecurity requirements for taking companion pets from India to the United States. Under the CDC Dog Import Rule, India is classified as a high-risk rabies country, requiring a minimum age of 6 months, ISO microchips, online CDC Dog Import Form receipts, AQCS endorsement, and Animal Care Facility reservations.",
    "titerRequired": "Conditional / Recommended for Streamlined Entry",
    "titerStatus": "conditional",
    "titerDetail": "India is classified as high-risk for dog rabies by the CDC. Dogs vaccinated in India must have a reservation at a CDC-registered Animal Care Facility (ACF) at an approved US port of entry for exam and booster revaccination, unless accompanied by a qualifying USDA/CDC approved rabies titer lab report.",
    "quarantineDays": "0 Days (Subject to ACF Examination)",
    "quarantineDetail": "No long-term quarantine facility stay required. Dogs complete immediate veterinary check-in at the airport Animal Care Facility (e.g. The ARK at JFK) and are released directly to the owner.",
    "leadTime": "2–3 Months Minimum",
    "leadTimeDetail": "Dog must be at least 6 months old at flight date. Microchip + rabies vaccine + 28-day validity + CDC Form + AQCS Export Certificate within 7 days of departure.",
    "certificateType": "CDC Certification of Foreign Rabies Vaccination and Microchip & AQCS Export NOC",
    "certificateDetail": "Official CDC Foreign Rabies Vaccination and Microchip form signed by a licensed vet and endorsed by an AQCS official government veterinarian.",
    "entryAirports": [
      "New York JFK (The ARK at JFK)",
      "Atlanta (ATL)",
      "Los Angeles (LAX)",
      "Miami (MIA)",
      "San Francisco (SFO)",
      "Chicago O’Hare (ORD)",
      "Washington Dulles (IAD)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Rabies Vaccination",
        "title": "ISO 11784/11785 Microchip",
        "description": "Implant 15-digit microchip. Must be documented on all veterinary records."
      },
      {
        "step": 2,
        "timing": "At Least 28 Days Before Travel",
        "title": "Rabies Vaccination (Age ≥ 12 Weeks)",
        "description": "Administer approved rabies vaccine. Dog must be at least 6 months of age by departure date."
      },
      {
        "step": 3,
        "timing": "3–4 Weeks Before Departure",
        "title": "CDC-Registered ACF Reservation",
        "description": "Book required arrival appointment and revaccination slot at a CDC-registered Animal Care Facility at your US entry airport."
      },
      {
        "step": 4,
        "timing": "Within 7 Days of Departure",
        "title": "AQCS India Endorsement & Health Certificate",
        "description": "Attend regional AQCS station in India for physical pet exam and government endorsement of the CDC Foreign Rabies form."
      },
      {
        "step": 5,
        "timing": "2–5 Days Before Flight",
        "title": "Submit Online CDC Dog Import Form",
        "description": "Complete free online CDC Dog Import Form and obtain the instant email receipt with QR code."
      }
    ],
    "faqs": [
      {
        "q": "Can puppies under 6 months old travel from India to the USA?",
        "a": "No. Under the CDC Dog Import Rule effective August 1, 2024, all dogs entering the United States from high-risk rabies countries like India must be at least 6 months (24 weeks) of age at the time of entry without exception."
      },
      {
        "q": "What is the CDC Dog Import Form?",
        "a": "It is a mandatory online form that must be submitted on the CDC website prior to departure. The form is free and generates a digital receipt with a QR code that must be presented to airlines and US Customs and Border Protection (CBP)."
      },
      {
        "q": "What is a CDC-registered Animal Care Facility (ACF)?",
        "a": "ACFs are specialized airport quarantine facilities (such as The ARK at JFK Airport) authorized by the CDC to inspect dogs arriving from high-risk rabies countries, verify microchips, and administer required boosters."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "in-us-req-1",
        "category": "AGE_REQUIREMENT",
        "categoryLabel": "CDC High-Risk Minimum Age Mandate",
        "title": "Minimum 6 Months Age Restriction",
        "severity": "BLOCKING",
        "rules": [
          "Dog must be at least 6 months (24 weeks) of age at time of arrival in the USA.",
          "Date of birth must be verified on microchip and veterinary records."
        ],
        "protocol": "Zero Tolerance: Any dog under 6 months arriving from a high-risk rabies country will be denied entry and deported at the owner’s expense.",
        "sourceName": "US Centers for Disease Control and Prevention (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "in-us-req-2",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "CDC Foreign Rabies & Microchip Certificate",
        "title": "CDC Endorsed Foreign Rabies Form",
        "severity": "BLOCKING",
        "rules": [
          "Must be completed on the standardized CDC \"Certification of Foreign Rabies Vaccination and Microchip\" form.",
          "Must be endorsed by an official Indian government veterinarian (AQCS / DAHD)."
        ],
        "protocol": "Documentation Standard: Generic clinic certificates are rejected by US CBP. Official CDC form with AQCS government seal is mandatory.",
        "sourceName": "CDC & USDA APHIS",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/high-risk-dog-rabies.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "in-us-req-3",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AQCS India Animal Quarantine Export Mandate",
        "title": "AQCS Export NOC & Online Form Receipt",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid AQCS India Animal Health Export Certificate issued within 7 days of departure.",
          "Must hold digital receipt for the submitted CDC Dog Import Form."
        ],
        "protocol": "Pre-Boarding Check: Airline check-in counters in India mandate presentation of the physical AQCS certificate and CDC QR code.",
        "sourceName": "AQCS India & US CDC",
        "sourceUrl": "http://aqcsindia.gov.in/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "india-to-canada": {
    "slug": "india-to-canada",
    "from": "India",
    "to": "Canada",
    "fromFlag": "🇮🇳",
    "toFlag": "🇨🇦",
    "originCode": "IN",
    "destCode": "CA",
    "region": "South Asia → North America",
    "authority": "AQCS India & Canadian Food Inspection Agency (CFIA)",
    "legalBasis": "Health of Animals Regulations & CFIA Rabies Import Policy",
    "description": "Official statutory regulations for bringing personal companion dogs and cats from India to Canada. Governs CFIA non-commercial pet entry rules, ISO microchip standards, rabies vaccination requirements, and mandatory AQCS government export clearance.",
    "titerRequired": "Exempt for Personal Pets / Recommended",
    "titerStatus": "exempt",
    "titerDetail": "Personal companion dogs entering Canada with their owner do not require a rabies titer test under current CFIA non-commercial rules, provided they have a valid rabies certificate and official AQCS export certificate. Note: Commercial/rescue dog imports from India are prohibited.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs inspection at approved Canadian ports of entry (Toronto Pearson, Vancouver, Montréal-Trudeau, Calgary). Pet undergoes physical document verification and microchip scan.",
    "leadTime": "30–60 Days Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine (administered at least 30 days prior to travel) + general health exam + AQCS India Export Certificate within 7 days of departure.",
    "certificateType": "AQCS International Animal Health Certificate & Rabies Certificate",
    "certificateDetail": "Official veterinary health certificate issued in English or French, signed by a licensed veterinarian and endorsed by AQCS (Animal Quarantine and Certification Services).",
    "entryAirports": [
      "Toronto Pearson (YYZ)",
      "Vancouver International (YVR)",
      "Montréal-Trudeau (YUL)",
      "Calgary International (YYC)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Vaccination",
        "title": "ISO 11784/11785 Microchip",
        "description": "Implant 15-digit microchip. Must be documented on vaccination book."
      },
      {
        "step": 2,
        "timing": "At Least 30 Days Before Arrival",
        "title": "Rabies Vaccination (Age ≥ 3 Months)",
        "description": "Administer rabies vaccine. Must be valid for at least 30 days prior to landing in Canada."
      },
      {
        "step": 3,
        "timing": "Within 7 Days of Departure",
        "title": "AQCS India Health Exam & Export NOC",
        "description": "Obtain official Government of India AQCS Export Health Certificate at regional quarantine station."
      },
      {
        "step": 4,
        "timing": "Arrival in Canada",
        "title": "CBSA / CFIA Inspection",
        "description": "Present pet and AQCS documents to Canada Border Services Agency (CBSA) for inspection fee payment and release."
      }
    ],
    "faqs": [
      {
        "q": "Can I bring a rescue dog from India into Canada?",
        "a": "No. CFIA regulations prohibit the commercial import of dogs from countries at high risk for dog rabies, which includes dogs intended for resale, adoption, fostering, or rescue organizations."
      },
      {
        "q": "Does Canada accept rabies certificates written in India?",
        "a": "Yes, provided the certificate is in English or French, clearly identifies the pet, lists the microchip number, dates of vaccination and expiry, and is authenticated by the Government of India AQCS quarantine officer."
      },
      {
        "q": "Is there an inspection fee upon arriving in Canada?",
        "a": "Yes. CBSA collects a statutory pet inspection fee (approx. $30 CAD + tax for the first animal) at the airport customs clearance area."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "in-ca-req-1",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "CFIA Rabies Immunization Protocol",
        "title": "Valid Rabies Vaccination Certificate",
        "severity": "BLOCKING",
        "rules": [
          "Must clearly state the animal’s breed, weight, color, and 15-digit microchip number.",
          "Must specify the trade name of the licensed rabies vaccine, serial/batch number, and duration of immunity.",
          "Must be signed by a licensed veterinarian."
        ],
        "protocol": "Language Requirement: Must be issued in English or French and match the microchip recorded on the pet.",
        "sourceName": "Canadian Food Inspection Agency (CFIA)",
        "sourceUrl": "https://inspection.canada.ca/animal-health/terrestrial-animals/imports/import-policies/live-animals/pet-imports/dogs/eng/1594056247953/1594056248443",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "in-ca-req-2",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AQCS India Animal Quarantine Export Mandate",
        "title": "AQCS India Export Health Certificate & NOC",
        "severity": "BLOCKING",
        "rules": [
          "Must be endorsed by the Animal Quarantine and Certification Services (AQCS), Government of India.",
          "Physical veterinary inspection must be conducted within 7 days before departure."
        ],
        "protocol": "Airlines and Indian customs require the physical AQCS stamped certificate prior to airport security clearance.",
        "sourceName": "AQCS India",
        "sourceUrl": "http://aqcsindia.gov.in/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "india-to-australia": {
    "slug": "india-to-australia",
    "from": "India",
    "to": "Australia",
    "fromFlag": "🇮🇳",
    "toFlag": "🇦🇺",
    "originCode": "IN",
    "destCode": "AU",
    "region": "South Asia → Oceania (Non-Approved Country Protocol)",
    "authority": "AQCS India & Australian Department of Agriculture, Fisheries and Forestry (DAFF)",
    "legalBasis": "Biosecurity Act 2015 & DAFF Group 3 Non-Approved Country Policy",
    "description": "Official Australian biosecurity protocol for companion animals originating from India. India is classified as a non-approved country by DAFF, meaning direct pet transport from India to Australia is legally prohibited. Pets must first reside in an approved Group 3 intermediate country for at least 180 consecutive days before entering Australia.",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "A Rabies Neutralising Antibody Titre (RNATT) test must be completed at a DAFF-recognized laboratory in the approved intermediate export country (result ≥ 0.5 IU/mL). An official RNATT declaration must be validated by an official government veterinarian.",
    "quarantineDays": "10–30 Days Mandatory PEQ",
    "quarantineDetail": "All companion pets arriving in Australia must undergo a minimum of 10 to 30 days mandatory post-entry quarantine (PEQ) at the Mickleham Post-Entry Quarantine Facility in Melbourne.",
    "leadTime": "8–12 Months Minimum",
    "leadTimeDetail": "Direct import from India is prohibited. Pet must relocate to an approved Group 3 country (e.g. Singapore, UAE, UK, USA) for 180+ consecutive days of residency + RNATT test + DAFF Import Permit + Mickleham quarantine reservation.",
    "certificateType": "DAFF Veterinary Health Certificate & Australian Import Permit",
    "certificateDetail": "Australian Biosecurity Import Permit issued by DAFF, plus government veterinary health certificate from the intermediate approved export country.",
    "entryAirports": [
      "Melbourne Airport (MEL) - Direct bonded transfer to Mickleham Quarantine Facility"
    ],
    "restrictedBreeds": [
      "Dogo Argentino",
      "Fila Brasileiro",
      "Japanese Tosa",
      "American Pit Bull Terrier",
      "Pit Bull Terrier types",
      "Perro de Presa Canario"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "8–12 Months Before Australia Entry",
        "title": "Export from India to Approved Group 3 Country",
        "description": "Obtain AQCS Export NOC and fly pet to an approved intermediate country (e.g. Singapore, UAE, UK, USA)."
      },
      {
        "step": 2,
        "timing": "Day 1 to Day 180 in Intermediate Country",
        "title": "180-Day Continuous Residency Period",
        "description": "Pet must continuously reside in the approved country. Microchip and rabies vaccinations are maintained by accredited local vets."
      },
      {
        "step": 3,
        "timing": "Within Intermediate Country",
        "title": "RNATT Rabies Titer Test",
        "description": "Blood drawn and tested at a DAFF-recognized laboratory (≥ 0.5 IU/mL required). RNATT declaration endorsed by official government vet."
      },
      {
        "step": 4,
        "timing": "3–4 Months Before Australia Flight",
        "title": "Apply for DAFF Import Permit & Book PEQ",
        "description": "Submit online DAFF import permit application and book quarantine slot at Mickleham Quarantine Facility in Melbourne."
      },
      {
        "step": 5,
        "timing": "Within 5 Days of Flight to Australia",
        "title": "Final Parasite Treatments & Health Exam",
        "description": "Accredited vet conducts external/internal parasite treatments and completes the DAFF veterinary health certificate."
      },
      {
        "step": 6,
        "timing": "Arrival at Melbourne Airport",
        "title": "Direct Transfer to Mickleham Quarantine",
        "description": "Pet lands at Melbourne (MEL) and is transferred directly by biosecurity officers to Mickleham for 10–30 days of quarantine observation."
      }
    ],
    "faqs": [
      {
        "q": "Can I fly my pet directly from India to Australia?",
        "a": "No. Under the Australian Biosecurity Act 2015, Australia strictly prohibits direct companion animal imports from India due to rabies biosecurity risks. Direct flights with pets are not permitted."
      },
      {
        "q": "What is the approved intermediary country route?",
        "a": "To bring a pet from India to Australia, you must first export the pet to a DAFF-approved Group 3 country (such as Singapore, the United Kingdom, UAE, or the United States), where the pet must reside continuously for at least 180 days before applying for an Australian import permit."
      },
      {
        "q": "Where is the post-entry quarantine facility in Australia?",
        "a": "All companion pets entering Australia from overseas must land in Melbourne (MEL) and complete quarantine at the single national facility: the Mickleham Post-Entry Quarantine Facility in Victoria."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "in-au-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "DAFF Group 3 Approved Country Residency Mandate",
        "title": "Mandatory 180-Day Intermediary Country Residency",
        "severity": "BLOCKING",
        "rules": [
          "Direct companion animal import from India into Australia is legally prohibited.",
          "Pet must continuously reside in an approved DAFF Group 3 country (e.g. Singapore, UK, USA) for at least 180 consecutive days prior to Australian export."
        ],
        "protocol": "Non-Approved Origin: Applications listing India as direct origin are rejected automatically by DAFF.",
        "sourceName": "Australian Department of Agriculture, Fisheries and Forestry (DAFF)",
        "sourceUrl": "https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/companion-animals/step-by-step-guides/non-approved-country",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "in-au-req-2",
        "category": "QUARANTINE_BOOKING",
        "categoryLabel": "Mickleham Post-Entry Quarantine Mandate",
        "title": "Australian Import Permit & Mickleham PEQ Reservation",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid DAFF Biosecurity Import Permit prior to booking travel.",
          "Must have confirmed booking at Mickleham Post-Entry Quarantine Facility in Melbourne (minimum 10 to 30 days)."
        ],
        "protocol": "Port Requirement: All pets entering Australia must arrive via Melbourne Airport (MEL) for bonded transfer to Mickleham.",
        "sourceName": "Australian DAFF",
        "sourceUrl": "https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/companion-animals/quarantine-in-australia",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-india": {
    "slug": "uk-to-india",
    "from": "United Kingdom",
    "to": "India",
    "fromFlag": "🇬🇧",
    "toFlag": "🇮🇳",
    "originCode": "GB",
    "destCode": "IN",
    "region": "Western Europe → South Asia",
    "authority": "Animal Quarantine and Certification Services (AQCS) & DAHD India",
    "legalBasis": "Livestock Importation Act 1898 & AQCS Pet Import Guidelines",
    "description": "Statutory non-commercial entry regulations for traveling with pets from the UK to India. Requires AQCS advance No Objection Certificate (NOC), DEFRA veterinary health certificate endorsement, valid rabies vaccination, and arrival at designated Indian international airports.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "India does not mandate an RNATT rabies titer test for pets arriving directly from the United Kingdom with official DEFRA certification.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance and verification of the AQCS advance NOC and DEFRA export certificate at Indian ports of entry (DEL, BOM, BLR, MAA).",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Microchip + rabies vaccination within 1 year of departure + DEFRA APHA health certificate endorsement within 7 days + AQCS advance import NOC application.",
    "certificateType": "Official Veterinary Health Certificate & AQCS Advance Import NOC",
    "certificateDetail": "Must be issued by an Official Veterinarian (OV) in the UK, endorsed by DEFRA/APHA within 7 days of travel, and accompanied by the AQCS advance NOC.",
    "entryAirports": [
      "Indira Gandhi International, Delhi (DEL)",
      "Chhatrapati Shivaji Maharaj International, Mumbai (BOM)",
      "Kempegowda International, Bengaluru (BLR)",
      "Chennai International (MAA)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30+ Days Before Departure",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Ensure 15-digit ISO microchip is active and rabies vaccination was administered within 1 year of travel."
      },
      {
        "step": 2,
        "timing": "7–10 Days Before Flight",
        "title": "DEFRA Health Certificate & APHA Endorsement",
        "description": "Official Veterinarian (OV) conducts clinical examination and obtains DEFRA/APHA export health endorsement."
      },
      {
        "step": 3,
        "timing": "7 Days Before Flight",
        "title": "AQCS Advance Import NOC Application",
        "description": "Submit flight itinerary, passport copy, and endorsed health certificate to AQCS port of entry to obtain electronic NOC."
      },
      {
        "step": 4,
        "timing": "Arrival at Indian Airport",
        "title": "AQCS Quarantine Counter Clearance",
        "description": "Present pet, physical DEFRA certificate, and AQCS NOC at the airport quarantine counter for release."
      }
    ],
    "faqs": [
      {
        "q": "Can British citizens bring pets to India on tourist visas?",
        "a": "Under current DAHD/AQCS regulations, pet imports are generally permitted for passengers relocating to India (transfer of residence, long-term employment/visas) or returning Indian nationals. Short-term tourist entries may require special authorization."
      },
      {
        "q": "How far in advance is the AQCS NOC issued?",
        "a": "AQCS typically issues the provisional No Objection Certificate 2 to 7 days prior to travel upon receipt of the endorsed export health certificate."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "uk-in-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AQCS Advance Import NOC Mandate",
        "title": "AQCS Provisional No Objection Certificate (NOC)",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid advance AQCS NOC issued by destination port officer.",
          "Must arrive into approved airport (DEL, BOM, BLR, MAA, CCU, HYD)."
        ],
        "protocol": "Airlines will verify the AQCS NOC before boarding flights to India.",
        "sourceName": "AQCS India",
        "sourceUrl": "http://aqcsindia.gov.in",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "uk-in-req-2",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "DEFRA/APHA Export Endorsement Mandate",
        "title": "DEFRA Export Health Certificate",
        "severity": "BLOCKING",
        "rules": [
          "Must be issued by UK Official Veterinarian (OV) within 7 days of departure.",
          "Must certify freedom from infectious diseases and valid rabies immunization."
        ],
        "protocol": "Original ink-signed or official DEFRA digital document required at border clearance.",
        "sourceName": "UK APHA / DEFRA",
        "sourceUrl": "https://www.gov.uk/export-health-certificates",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-india": {
    "slug": "usa-to-india",
    "from": "United States",
    "to": "India",
    "fromFlag": "🇺🇸",
    "toFlag": "🇮🇳",
    "originCode": "US",
    "destCode": "IN",
    "region": "North America → South Asia",
    "authority": "Animal Quarantine and Certification Services (AQCS) & USDA APHIS",
    "legalBasis": "Livestock Importation Act 1898 & USDA APHIS Pet Export Protocol",
    "description": "Statutory non-commercial entry regulations for traveling with pets from the USA to India. Requires USDA APHIS VEHCS endorsed international health certificate, AQCS advance import NOC, valid rabies vaccination, and port veterinary inspection.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "India does not mandate an RNATT rabies titer test for pets arriving directly from the USA with official USDA certification.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs inspection and validation of the AQCS advance NOC at Delhi, Mumbai, Bengaluru, or Chennai airports.",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Rabies vaccination + USDA accredited vet exam within 30 days + VEHCS endorsement within 7 days of flight + AQCS NOC application.",
    "certificateType": "USDA APHIS International Health Certificate & AQCS NOC",
    "certificateDetail": "Must be issued by USDA accredited vet, electronically or physically endorsed via USDA VEHCS within 7 days of departure, and paired with AQCS NOC.",
    "entryAirports": [
      "Indira Gandhi International, Delhi (DEL)",
      "Chhatrapati Shivaji Maharaj International, Mumbai (BOM)",
      "Kempegowda International, Bengaluru (BLR)",
      "Chennai International (MAA)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30+ Days Before Departure",
        "title": "Microchip & Rabies Vaccination",
        "description": "Administer rabies vaccine (if not currently valid) after confirming 15-digit ISO microchip implantation."
      },
      {
        "step": 2,
        "timing": "7 Days Before Flight",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "USDA-accredited vet conducts clinical exam and submits bilingual export certificate via VEHCS."
      },
      {
        "step": 3,
        "timing": "5–7 Days Before Flight",
        "title": "Apply for AQCS Advance Import NOC",
        "description": "Submit USDA endorsed certificate, passport copy, and flight airway bill to destination AQCS officer online."
      },
      {
        "step": 4,
        "timing": "Arrival in India",
        "title": "AQCS Physical Clearance & Release",
        "description": "Officer at airport quarantine desk verifies microchip, stamps document, and releases pet without quarantine."
      }
    ],
    "faqs": [
      {
        "q": "Is 3-year rabies vaccine recognized in India?",
        "a": "Yes, India recognizes 3-year rabies vaccines provided the vaccine certificate explicitly states the 3-year duration and was administered within active validity."
      },
      {
        "q": "Can pets travel in-cabin from USA to India?",
        "a": "In-cabin policies depend on the operating carrier (e.g. Air India, Lufthansa, Air France), but pets must clear through official AQCS customs upon landing in India."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "us-in-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AQCS Advance Import NOC",
        "title": "Advance Electronic NOC from AQCS India",
        "severity": "BLOCKING",
        "rules": [
          "Must obtain official AQCS NOC prior to boarding US departure flight.",
          "Passenger must possess valid Indian visa or OCI card."
        ],
        "protocol": "Checked by US airline gate agent prior to issuing boarding pass.",
        "sourceName": "AQCS India",
        "sourceUrl": "http://aqcsindia.gov.in",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "us-in-req-2",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "USDA APHIS VEHCS Endorsement",
        "title": "USDA APHIS Export Certificate",
        "severity": "BLOCKING",
        "rules": [
          "Endorsed by USDA APHIS Veterinary Medical Officer within 7 days of departure.",
          "Must contain microchip number, rabies manufacturer, lot number, and vaccination dates."
        ],
        "protocol": "Physical embossed certificate or digital VEHCS barcode verification.",
        "sourceName": "USDA APHIS",
        "sourceUrl": "https://www.aphis.usda.gov/pet-travel",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "canada-to-india": {
    "slug": "canada-to-india",
    "from": "Canada",
    "to": "India",
    "fromFlag": "🇨🇦",
    "toFlag": "🇮🇳",
    "originCode": "CA",
    "destCode": "IN",
    "region": "North America → South Asia",
    "authority": "Animal Quarantine and Certification Services (AQCS) & CFIA",
    "legalBasis": "Livestock Importation Act 1898 & CFIA Live Animal Export Regulations",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Canada to India. Requires CFIA-endorsed veterinary health certificate, valid rabies vaccination, and advance AQCS Import NOC.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Direct imports from Canada with valid CFIA certification do not require a rabies antibody titer test.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs inspection at Delhi, Mumbai, Bengaluru, or Chennai airports.",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine + CFIA official endorsement within 7 days + AQCS NOC application.",
    "certificateType": "CFIA Export Certificate & AQCS Advance NOC",
    "certificateDetail": "Must be completed by a licensed Canadian veterinarian and endorsed with an official CFIA stamp.",
    "entryAirports": [
      "Indira Gandhi International, Delhi (DEL)",
      "Chhatrapati Shivaji Maharaj International, Mumbai (BOM)",
      "Kempegowda International, Bengaluru (BLR)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30+ Days Before Departure",
        "title": "Microchip & Rabies Vaccination",
        "description": "Verify ISO 11784/11785 microchip and up-to-date rabies immunization."
      },
      {
        "step": 2,
        "timing": "7 Days Before Flight",
        "title": "CFIA Health Certificate Endorsement",
        "description": "Vet examination followed by CFIA district office endorsement."
      },
      {
        "step": 3,
        "timing": "5–7 Days Before Flight",
        "title": "AQCS Advance NOC Application",
        "description": "Submit endorsed papers to AQCS to obtain provisional import NOC."
      },
      {
        "step": 4,
        "timing": "Arrival in India",
        "title": "Airport Clearance",
        "description": "Final microchip scan and document stamp by AQCS quarantine officer."
      }
    ],
    "faqs": [
      {
        "q": "How do I get CFIA endorsement in Canada?",
        "a": "Book an appointment with your local CFIA Animal Health District Office after your private vet completes the bilingual export certificate."
      },
      {
        "q": "Is quarantine required for pets entering India from Canada?",
        "a": "No. Pets entering India under the non-commercial passenger baggage route with a valid AQCS NOC, CFIA-endorsed health certificate, and compliant rabies vaccination face 0 days quarantine upon clearance."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "ca-in-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AQCS Advance Import NOC",
        "title": "AQCS Provisional No Objection Certificate",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid AQCS NOC issued prior to departure.",
          "Limited to 2 pets per passenger under transfer of residence / non-commercial rules."
        ],
        "protocol": "Airlines will not board pets from Canada without valid NOC.",
        "sourceName": "AQCS India",
        "sourceUrl": "http://aqcsindia.gov.in",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "australia-to-india": {
    "slug": "australia-to-india",
    "from": "Australia",
    "to": "India",
    "fromFlag": "🇦🇺",
    "toFlag": "🇮🇳",
    "originCode": "AU",
    "destCode": "IN",
    "region": "Oceania → South Asia",
    "authority": "Animal Quarantine and Certification Services (AQCS) & DAFF",
    "legalBasis": "Livestock Importation Act 1898 & Australian Export Control Act 2020",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Australia to India. Requires DAFF-endorsed export health certificate, AQCS advance NOC, and airport quarantine desk check.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Direct travel from rabies-free Australia does not require an antibody titer test for Indian entry.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon arrival inspection by AQCS officers at approved Indian international airports.",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine + DAFF government vet export inspection + AQCS NOC application.",
    "certificateType": "DAFF Export Health Certificate & AQCS NOC",
    "certificateDetail": "Official export certificate issued and stamped by Australian DAFF veterinary officer.",
    "entryAirports": [
      "Indira Gandhi International, Delhi (DEL)",
      "Chhatrapati Shivaji Maharaj International, Mumbai (BOM)",
      "Kempegowda International, Bengaluru (BLR)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30+ Days Before Departure",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Administer rabies vaccine (since rabies is absent in Australia, pets traveling abroad need it before departure)."
      },
      {
        "step": 2,
        "timing": "Within 7 Days of Flight",
        "title": "DAFF Export Health Endorsement",
        "description": "DAFF official veterinarian completes export inspection and issues official Australian export certificate."
      },
      {
        "step": 3,
        "timing": "5–7 Days Before Flight",
        "title": "AQCS NOC Application",
        "description": "Submit flight details and DAFF certificate to AQCS online portal."
      },
      {
        "step": 4,
        "timing": "Arrival in India",
        "title": "AQCS Port Inspection",
        "description": "Officer verifies transponder and clears pet for immediate release."
      }
    ],
    "faqs": [
      {
        "q": "Does my dog need rabies vaccination in Australia before going to India?",
        "a": "Yes. Although Australia is rabies-free, India requires all incoming dogs and cats to possess a valid rabies vaccination certificate."
      },
      {
        "q": "What is the procedure upon arriving at Indian airport customs with an Australian pet?",
        "a": "You must present the pet and original DAFF export documents to AQCS quarantine officers at Delhi, Mumbai, Bengaluru, or Chennai airport for microchip verification and entry clearance."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "au-in-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AQCS Advance Import NOC",
        "title": "AQCS Advance No Objection Certificate",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid AQCS provisional NOC before departure from Australia."
        ],
        "protocol": "Verified by departure airline in Sydney, Melbourne, or Perth.",
        "sourceName": "AQCS India",
        "sourceUrl": "http://aqcsindia.gov.in",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "germany-to-uk": {
    "slug": "germany-to-uk",
    "from": "Germany",
    "to": "United Kingdom",
    "fromFlag": "🇩🇪",
    "toFlag": "🇬🇧",
    "originCode": "DE",
    "destCode": "GB",
    "region": "European Union → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Germany to Great Britain. Governs EU Pet Passport validation, 21-day rabies latency, mandatory 24–120 hour tapeworm treatment for dogs, and approved transport routes (Eurotunnel, ferries, or manifest cargo).",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Germany is an EU Member State listed in Part 1 of Annex II to Regulation (EU) No 577/2013. No rabies antibody titer test is required for direct entry into the UK.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct entry with 0 days quarantine when all DEFRA requirements are fulfilled.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day rabies latency window on primary vaccination. Valid EU Pet Passport + 24–120 hour tapeworm window.",
    "certificateType": "EU Pet Passport (issued in EU) or Great Britain Pet Health Certificate",
    "certificateDetail": "Must possess an active EU Pet Passport with rabies vaccinations up to date and signed tapeworm administration section.",
    "entryAirports": [
      "London Heathrow (LHR - HARC Cargo)",
      "London Gatwick (LGW)",
      "Folkestone (Eurotunnel Le Shuttle Pet Reception)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully (banned under Dangerous Dogs Act unless Certificate of Exemption held)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Microchip must precede rabies vaccination. Ensure 21 days have elapsed if a new primary vaccine was administered."
      },
      {
        "step": 2,
        "timing": "24 to 120 Hours Before UK Entry",
        "title": "Mandatory Tapeworm Treatment (Dogs Only)",
        "description": "Licensed vet in Germany administers Praziquantel and records date, exact time, and manufacturer in EU Pet Passport."
      },
      {
        "step": 3,
        "timing": "Travel Day (Eurotunnel / Ferry / Cargo)",
        "title": "DEFRA Pet Check at Departure / Arrival",
        "description": "Microchip and passport verified at Calais Pet Reception or airport HARC cargo center."
      }
    ],
    "faqs": [
      {
        "q": "Can my dog travel in-cabin from Germany to the UK?",
        "a": "No. Commercial airlines flying into the UK cannot carry pets in the passenger cabin. Pets must fly as manifest cargo or travel by car via Eurotunnel Le Shuttle / authorized ferry routes."
      },
      {
        "q": "Can I use an EU Pet Passport issued in Germany to enter the UK?",
        "a": "Yes. The UK continues to recognize valid EU Pet Passports issued in EU member states like Germany for travel into Great Britain."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "de-gb-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "Echinococcus Multilocularis 24–120h Window",
        "title": "Mandatory Tapeworm Treatment for Dogs",
        "severity": "BLOCKING",
        "rules": [
          "Must be administered by a licensed vet 24 to 120 hours (1 to 5 days) before entering Great Britain.",
          "Active ingredient must be Praziquantel or clinically equivalent approved formulation.",
          "Veterinarian must record the exact date and time (24-hour clock) in the Pet Passport."
        ],
        "protocol": "Border Failure: Arrival outside the 24–120h window results in immediate boarding denial or 24-hour quarantine stay in the UK.",
        "sourceName": "UK DEFRA Pet Travel Guidelines",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "france-to-uk": {
    "slug": "france-to-uk",
    "from": "France",
    "to": "United Kingdom",
    "fromFlag": "🇫🇷",
    "toFlag": "🇬🇧",
    "originCode": "FR",
    "destCode": "GB",
    "region": "European Union → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from France to Great Britain. High-volume route via Eurotunnel Le Shuttle (Calais to Folkestone) and cross-channel ferries. Enforces EU Pet Passport checks, 21-day rabies latency, and mandatory 24–120 hour tapeworm treatment for dogs.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "France is an EU Member State listed in Part 1 of Annex II to Regulation (EU) No 577/2013. No rabies titer blood test is required.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon document and microchip check at Eurotunnel Calais Pet Reception or approved ferry ports.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day rabies latency if primary vaccine. 24–120 hour tapeworm window before scheduled UK arrival.",
    "certificateType": "EU Pet Passport (issued in EU) or Great Britain Pet Health Certificate",
    "certificateDetail": "Must present valid EU Pet Passport with complete rabies and tapeworm sections signed and stamped by an authorized vet in France.",
    "entryAirports": [
      "Folkestone (Eurotunnel Le Shuttle Pet Reception)",
      "Dover Ferry Port",
      "London Heathrow (LHR - Manifest Cargo)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "Verify Microchip & Rabies Validity",
        "description": "Ensure microchip number matches EU Pet Passport and rabies vaccination is active."
      },
      {
        "step": 2,
        "timing": "24 to 120 Hours Before Crossing",
        "title": "Veterinary Tapeworm Administration",
        "description": "French vet administers Praziquantel and signs/stamps Section VII of the EU Pet Passport with date and exact time."
      },
      {
        "step": 3,
        "timing": "At Calais Terminal (Eurotunnel)",
        "title": "Pet Reception Check-In",
        "description": "Drive to the Eurotunnel Pet Reception Centre in Calais. Staff scan microchip and verify passport within 10 minutes."
      }
    ],
    "faqs": [
      {
        "q": "How does Eurotunnel Le Shuttle pet check-in work at Calais?",
        "a": "You drive to the dedicated Pet Reception building at the Calais Eurotunnel terminal at least 45 minutes before departure. Staff scan your pet’s microchip, verify the EU Pet Passport and tapeworm stamp, and issue your boarding hanger."
      },
      {
        "q": "What if my dog’s tapeworm treatment is administered 22 hours before entry?",
        "a": "It will be rejected. You must wait until exactly 24 hours have elapsed since the recorded administration time before being allowed to board the shuttle to the UK."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "fr-gb-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "Echinococcus Multilocularis Mandate",
        "title": "Mandatory 24–120h Praziquantel Treatment for Dogs",
        "severity": "BLOCKING",
        "rules": [
          "Administered 24 to 120 hours before UK entry by an authorized French veterinarian.",
          "Must be recorded in Section VII of EU Pet Passport with date and exact hour."
        ],
        "protocol": "Strict 24h Clock: Arrival before 24h elapsed results in denied boarding until clock reaches 24h.",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "spain-to-uk": {
    "slug": "spain-to-uk",
    "from": "Spain",
    "to": "United Kingdom",
    "fromFlag": "🇪🇸",
    "toFlag": "🇬🇧",
    "originCode": "ES",
    "destCode": "GB",
    "region": "European Union → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Spain to Great Britain. Covers EU Pet Passport verification, 21-day rabies latency, mandatory 24–120 hour tapeworm treatment for dogs, and approved manifest cargo or overland routes.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Spain is an EU Member State listed in Part 1 of Annex II. No rabies titer test is required for direct entry into the UK.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release with 0 days quarantine when all DEFRA statutory conditions are fulfilled.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day latency on primary rabies vaccination + 24–120 hour veterinary tapeworm treatment.",
    "certificateType": "EU Pet Passport (issued in Spain / EU) or Great Britain Health Certificate",
    "certificateDetail": "Must have valid EU Pet Passport with up-to-date rabies records and Praziquantel tapeworm administration.",
    "entryAirports": [
      "London Heathrow (LHR - HARC Cargo)",
      "London Gatwick (LGW - Cargo)",
      "Folkestone (Eurotunnel Le Shuttle)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "Microchip & Rabies Booster",
        "description": "Confirm ISO 11784/11785 microchip and valid rabies vaccination recorded in Spanish Pet Passport."
      },
      {
        "step": 2,
        "timing": "24 to 120 Hours Before UK Entry",
        "title": "Tapeworm Administration in Spain / En Route",
        "description": "Licensed vet administers Praziquantel and stamps the passport with date and exact time."
      },
      {
        "step": 3,
        "timing": "Flight / Ferry / Overland Arrival",
        "title": "UK Border Inspection",
        "description": "Clearance via approved manifest cargo facility at Heathrow or Eurotunnel Pet Reception."
      }
    ],
    "faqs": [
      {
        "q": "Can my dog fly from Madrid or Barcelona in-cabin to London?",
        "a": "No. UK law prohibits commercial airlines from carrying pets in the passenger cabin on inbound flights. Pets must fly as manifest cargo or travel by authorized road courier."
      },
      {
        "q": "What tapeworm treatment is required when returning from Spain to the UK?",
        "a": "All dogs must be treated for tapeworm (Praziquantel) by an authorized Spanish vet between 24 and 120 hours before scheduled arrival in the UK, recorded in the EU Pet Passport or UK health certificate."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "es-gb-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "DEFRA Tapeworm Protocol for Dogs",
        "title": "Mandatory 24–120h Praziquantel Treatment",
        "severity": "BLOCKING",
        "rules": [
          "Administered 24 to 120 hours before UK entry by a registered veterinarian.",
          "Product must contain Praziquantel."
        ],
        "protocol": "Checked at Spanish departure airport cargo desk or French channel port.",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "italy-to-uk": {
    "slug": "italy-to-uk",
    "from": "Italy",
    "to": "United Kingdom",
    "fromFlag": "🇮🇹",
    "toFlag": "🇬🇧",
    "originCode": "IT",
    "destCode": "GB",
    "region": "European Union → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Italy to Great Britain. Enforces EU Pet Passport checks, 21-day rabies latency, mandatory 24–120 hour tapeworm treatment for dogs, and manifest cargo or channel transit clearance.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Italy is an EU Member State listed in Part 1 of Annex II. Rabies antibody titer testing is not required for UK entry.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon document and microchip check at Heathrow HARC or Eurotunnel Folkestone.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day rabies latency on primary immunization + 24–120 hour tapeworm treatment window.",
    "certificateType": "EU Pet Passport (issued in Italy / EU) or Great Britain Health Certificate",
    "certificateDetail": "Must possess valid Italian EU Pet Passport issued by local ASL (Azienda Sanitaria Locale) or authorized vet.",
    "entryAirports": [
      "London Heathrow (LHR - Manifest Cargo)",
      "London Gatwick (LGW - Cargo)",
      "Folkestone (Eurotunnel Le Shuttle)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "Microchip & Rabies Vaccine",
        "description": "Confirm ISO microchip and active rabies vaccination recorded in Italian EU Pet Passport."
      },
      {
        "step": 2,
        "timing": "24 to 120 Hours Before UK Entry",
        "title": "Praziquantel Tapeworm Treatment",
        "description": "Italian vet administers tapeworm treatment and records date, exact hour, and manufacturer in Section VII."
      },
      {
        "step": 3,
        "timing": "Arrival in the UK",
        "title": "Border Clearance",
        "description": "Pet Reception check at channel crossing or Heathrow HARC."
      }
    ],
    "faqs": [
      {
        "q": "Can an Italian vet complete the UK tapeworm requirement?",
        "a": "Yes. Any licensed veterinarian in Italy can administer and sign Section VII of the EU Pet Passport."
      },
      {
        "q": "What documents do I need to bring my pet from Italy to Great Britain?",
        "a": "You need a valid EU Pet Passport issued in an EU member state or a Great Britain Pet Health Certificate, valid rabies vaccination, and proof of tapeworm treatment given 24-120 hours prior."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "it-gb-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "DEFRA Tapeworm Protocol for Dogs",
        "title": "Mandatory 24–120h Praziquantel Treatment",
        "severity": "BLOCKING",
        "rules": [
          "Administered 24 to 120 hours before UK arrival.",
          "Veterinary stamp, signature, date, and exact hour must be recorded."
        ],
        "protocol": "Verified strictly against scheduled arrival time.",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-germany": {
    "slug": "uk-to-germany",
    "from": "United Kingdom",
    "to": "Germany",
    "fromFlag": "🇬🇧",
    "toFlag": "🇩🇪",
    "originCode": "GB",
    "destCode": "DE",
    "region": "Great Britain → European Union",
    "authority": "German Federal Ministry of Food and Agriculture (BMEL) & European Commission",
    "legalBasis": "Regulation (EU) No 576/2013 & Commission Implementing Regulation (EU) No 577/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Great Britain to Germany post-Brexit. Great Britain is a Part 2 listed third country. Requires UK Official Veterinarian Animal Health Certificate (AHC) valid for 10 days or valid EU Pet Passport (issued in the EU), ISO microchip, and 21-day rabies latency.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Great Britain is listed in Part 2 of Annex II to Regulation (EU) No 577/2013. No rabies antibody titer test is required for entry into Germany.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance (Zoll) at Frankfurt (FRA), Munich (MUC), or Berlin (BER) airports.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day latency on primary rabies vaccination. UK Animal Health Certificate (AHC) must be issued within 10 days of travel.",
    "certificateType": "UK Animal Health Certificate (AHC) or valid EU Pet Passport",
    "certificateDetail": "Must be issued by an Official Veterinarian (OV) in the UK within 10 days of entering the EU.",
    "entryAirports": [
      "Frankfurt Airport (FRA)",
      "Munich Airport (MUC)",
      "Berlin Brandenburg (BER)",
      "Hamburg (HAM)",
      "Düsseldorf (DUS)"
    ],
    "restrictedBreeds": [
      "Pitbull Terrier",
      "American Staffordshire Terrier",
      "Staffordshire Bull Terrier",
      "Bull Terrier (and crossbreeds under HundVerbrEinfG)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO Microchip Implantation",
        "description": "Ensure 15-digit ISO 11784/11785 microchip is implanted before rabies vaccine."
      },
      {
        "step": 2,
        "timing": "At Least 21 Days Before Travel",
        "title": "Rabies Vaccination & Latency",
        "description": "Primary rabies vaccination must be administered at least 21 days prior to entry into Germany."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "Official Veterinarian AHC Exam",
        "description": "UK Official Veterinarian (OV) conducts clinical examination and issues bilingual German/English Animal Health Certificate."
      },
      {
        "step": 4,
        "timing": "Arrival at German Airport",
        "title": "German Customs (Zoll) Inspection",
        "description": "Proceed through Red Customs Channel for document and transponder verification."
      }
    ],
    "faqs": [
      {
        "q": "Can I use a UK Pet Passport to enter Germany?",
        "a": "No. UK Pet Passports issued in Great Britain became invalid for EU entry following Brexit. You must obtain an Animal Health Certificate (AHC) from a UK Official Veterinarian, unless your pet holds an active EU Pet Passport issued inside an EU member state."
      },
      {
        "q": "Are pit bulls or bull terriers allowed into Germany from the UK?",
        "a": "No. Under Germany's HundVerbrEinfG statutory ban, dangerous breeds such as American Pit Bull Terriers, Staffordshire Bull Terriers, and Bull Terriers cannot be imported for stays exceeding 4 weeks."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-de-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "Post-Brexit UK Animal Health Certificate Mandate",
        "title": "UK Animal Health Certificate (AHC)",
        "severity": "BLOCKING",
        "rules": [
          "Must be issued by a UK Official Veterinarian (OV) within 10 days of entering the EU.",
          "Valid for 4 months of onward travel within the EU or until rabies vaccination expires."
        ],
        "protocol": "Customs Verification: Checked by German Zoll officers upon airport arrival.",
        "sourceName": "German BMEL & European Commission",
        "sourceUrl": "https://www.bmel.de/EN/topics/animals/pets/pets_node.html",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-italy": {
    "slug": "uk-to-italy",
    "from": "United Kingdom",
    "to": "Italy",
    "fromFlag": "🇬🇧",
    "toFlag": "🇮🇹",
    "originCode": "GB",
    "destCode": "IT",
    "region": "Great Britain → European Union",
    "authority": "Ministero della Salute (Italy) & European Commission",
    "legalBasis": "Regulation (EU) No 576/2013 & Commission Implementing Regulation (EU) No 577/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Great Britain to Italy. Requires UK Official Veterinarian Animal Health Certificate (AHC) issued within 10 days of travel, valid ISO microchip, and 21-day rabies latency.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Great Britain is a Part 2 listed third country. No rabies titer test is required for direct travel to Italy.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon document and microchip check by Italian customs officers at Rome FCO or Milan MXP.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day rabies vaccination latency + UK AHC issued within 10 days of EU arrival.",
    "certificateType": "UK Animal Health Certificate (AHC) or valid EU Pet Passport",
    "certificateDetail": "Must be completed in Italian and English by a UK Official Veterinarian (OV).",
    "entryAirports": [
      "Rome Leonardo da Vinci Fiumicino (FCO)",
      "Milan Malpensa (MXP)",
      "Venice Marco Polo (VCE)",
      "Naples (NAP)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "Microchip & Rabies Vaccination",
        "description": "Confirm ISO microchip followed by primary rabies vaccination with 21-day latency."
      },
      {
        "step": 2,
        "timing": "Within 10 Days of Departure",
        "title": "UK OV Animal Health Certificate",
        "description": "UK Official Veterinarian conducts health exam and issues bilingual Italian/English AHC."
      },
      {
        "step": 3,
        "timing": "Arrival in Italy",
        "title": "Italian Customs Verification",
        "description": "Present pet and AHC to customs (Dogana) at Rome FCO or Milan MXP."
      }
    ],
    "faqs": [
      {
        "q": "Is a muzzle required for dogs in Italy?",
        "a": "Yes. Italian law requires dog owners to carry a muzzle and a leash (maximum length 1.5m) in public spaces and public transport."
      },
      {
        "q": "How long before travel must the rabies vaccination be given for Italy?",
        "a": "Primary rabies vaccination must be administered at least 21 days before entry into Italy. If regular boosters are up to date, there is no waiting period."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-it-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "UK Animal Health Certificate for Italy",
        "title": "Bilingual Italian/English AHC",
        "severity": "BLOCKING",
        "rules": [
          "Issued by UK Official Veterinarian within 10 days of Italian arrival.",
          "Microchip must precede rabies vaccination."
        ],
        "protocol": "Checked by Dogana customs upon airport arrival.",
        "sourceName": "Ministero della Salute Italy",
        "sourceUrl": "https://www.salute.gov.it",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-australia": {
    "slug": "uk-to-australia",
    "from": "United Kingdom",
    "to": "Australia",
    "fromFlag": "🇬🇧",
    "toFlag": "🇦🇺",
    "originCode": "GB",
    "destCode": "AU",
    "region": "Western Europe → Oceania",
    "authority": "Department of Agriculture, Fisheries and Forestry (DAFF Australia)",
    "legalBasis": "Biosecurity Act 2015 & DAFF Companion Animal Import Policy (Group 3)",
    "description": "Statutory biosecurity regulations for importing dogs and cats from Great Britain to Australia. Great Britain is categorized as a DAFF Group 3 approved country. Enforces mandatory RNATT rabies titer testing, 180-day waiting clock, DAFF Import Permit, parasite treatments, and mandatory 10–30 days quarantine at Mickleham, Melbourne.",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "RNATT rabies titer blood test (result ≥ 0.5 IU/mL) is mandatory. A minimum of 180 days must elapse between the blood draw and Australian entry to qualify for 10-day post-entry quarantine (PEQ).",
    "quarantineDays": "10–30 Days Mandatory PEQ",
    "quarantineDetail": "All pets must arrive into Melbourne Airport (MEL) for bonded transfer to the Mickleham Post-Entry Quarantine Facility.",
    "leadTime": "7–10 Months Minimum",
    "leadTimeDetail": "Microchip + rabies vaccines + RNATT blood draw + 180-day waiting clock + DAFF import permit + Mickleham quarantine booking + parasite treatments.",
    "certificateType": "DAFF Import Permit & APHA Export Health Certificate",
    "certificateDetail": "Must possess an active DAFF Biosecurity Import Permit and Australian export certificate endorsed by DEFRA/APHA.",
    "entryAirports": [
      "Melbourne Airport (MEL) - Direct bonded transfer to Mickleham Quarantine"
    ],
    "restrictedBreeds": [
      "Dogo Argentino",
      "Fila Brasileiro",
      "Japanese Tosa",
      "American Pit Bull Terrier",
      "Pit Bull Terrier types",
      "Perro de Presa Canario"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "7–10 Months Before Departure",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Confirm ISO microchip and administer valid rabies vaccination."
      },
      {
        "step": 2,
        "timing": "Day 0 (At Least 180 Days Before Flight)",
        "title": "RNATT Rabies Titer Blood Draw",
        "description": "UK vet draws blood sample. Processed at DEFRA/DAFF approved lab (≥ 0.5 IU/mL required). 180-day countdown begins."
      },
      {
        "step": 3,
        "timing": "3–4 Months Before Flight",
        "title": "Apply for DAFF Import Permit & Book Mickleham PEQ",
        "description": "Submit online application via DAFF BICON system and secure 10-day quarantine slot at Mickleham, Melbourne."
      },
      {
        "step": 4,
        "timing": "Within 5 Days of Departure",
        "title": "Internal/External Parasite Treatments & Vet Check",
        "description": "Official Veterinarian administers internal/external parasite treatments and completes DAFF health certificate."
      },
      {
        "step": 5,
        "timing": "Flight Day via Manifest Cargo",
        "title": "Manifest Cargo to Melbourne (MEL)",
        "description": "Pet flies as manifest cargo to Melbourne for immediate transfer to Mickleham Quarantine Facility."
      }
    ],
    "faqs": [
      {
        "q": "Can my pet do home quarantine in Australia?",
        "a": "No. Australian law strictly requires all companion pets entering from overseas to complete mandatory quarantine at the national Mickleham Quarantine Facility in Melbourne."
      },
      {
        "q": "How far in advance must I begin preparations for pet travel from the UK to Australia?",
        "a": "Preparations must begin at least 7 months (210+ days) in advance due to the mandatory RNATT rabies titer test, 180-day post-blood draw waiting period, and DAFF import permit booking."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-au-req-1",
        "category": "TITER_TEST",
        "categoryLabel": "DAFF 180-Day RNATT Waiting Period",
        "title": "RNATT Rabies Titer Test & 180-Day Clock",
        "severity": "BLOCKING",
        "rules": [
          "Blood sample must achieve antibody titer ≥ 0.5 IU/mL at a DAFF-recognized laboratory.",
          "Must complete 180-day waiting period from blood draw date prior to entering Australia."
        ],
        "protocol": "Laboratory reports RNATT declaration directly to DAFF biosecurity.",
        "sourceName": "Australian DAFF Biosecurity",
        "sourceUrl": "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-uae": {
    "slug": "uk-to-uae",
    "from": "United Kingdom",
    "to": "United Arab Emirates",
    "fromFlag": "🇬🇧",
    "toFlag": "🇦🇪",
    "originCode": "GB",
    "destCode": "AE",
    "region": "Western Europe → Middle East",
    "authority": "Ministry of Climate Change and Environment (MOCCAE UAE)",
    "legalBasis": "Federal Law No. 22 of 2016 & MOCCAE Companion Animal Import Regulations",
    "description": "Statutory non-commercial entry regulations for traveling with pets from the UK to the UAE (Dubai, Abu Dhabi). Requires electronic MOCCAE Import Permit (valid for 30 days), RNATT rabies titer test (≥ 0.5 IU/mL), DEFRA/APHA endorsed health certificate, and arrival as manifest cargo.",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "Mandatory RNATT rabies titer test with result ≥ 0.5 IU/mL processed at an approved laboratory.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon cargo terminal customs inspection at Dubai International (DXB) or Abu Dhabi (AUH).",
    "leadTime": "3–4 Months Minimum",
    "leadTimeDetail": "Microchip + rabies vaccines + RNATT titer test + MOCCAE import permit + APHA export endorsement within 10 days.",
    "certificateType": "MOCCAE Electronic Import Permit & DEFRA Export Health Certificate",
    "certificateDetail": "Must obtain MOCCAE Import Permit online and pair with bilingual UAE health certificate endorsed by DEFRA/APHA.",
    "entryAirports": [
      "Dubai International Airport (DXB - Cargo Terminal)",
      "Abu Dhabi International (AUH - Cargo Terminal)",
      "Al Maktoum International (DWC)"
    ],
    "restrictedBreeds": [
      "Pit Bulls",
      "Staffordshire Bull Terrier",
      "American Bully",
      "Doberman Pinscher",
      "Rottweiler",
      "Boxer",
      "Mastiff types",
      "Japanese Tosa"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "3–4 Months Before Flight",
        "title": "Microchip, Rabies & RNATT Titer Test",
        "description": "Administer rabies vaccination and draw blood for RNATT titer test at approved UK laboratory (≥ 0.5 IU/mL)."
      },
      {
        "step": 2,
        "timing": "30 Days Before Flight",
        "title": "Apply for MOCCAE Electronic Import Permit",
        "description": "Submit pet vaccination card, RNATT result, and passport copy via MOCCAE online portal."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "DEFRA/APHA Export Health Endorsement",
        "description": "Official Veterinarian completes UAE certificate and secures APHA physical/electronic stamp."
      },
      {
        "step": 4,
        "timing": "Flight via Manifest Cargo",
        "title": "Arrival at Dubai Cargo Terminal",
        "description": "MOCCAE veterinary officer inspects documentation and microchip at DXB Cargo Centre for immediate release."
      }
    ],
    "faqs": [
      {
        "q": "Can my pet fly in-cabin to Dubai?",
        "a": "No. MOCCAE regulations require all companion animals entering the UAE to arrive as manifest cargo with an airway bill (AWB)."
      },
      {
        "q": "What vaccinations are mandatory for dogs entering the UAE from the UK?",
        "a": "Dogs require rabies vaccination, DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza), and an RNATT rabies titer test result ≥ 0.5 IU/mL from a recognized laboratory."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-ae-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "MOCCAE Electronic Import Permit",
        "title": "UAE MOCCAE Import Permit",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid MOCCAE Import Permit issued via government portal.",
          "Permit is valid for 30 days from issue date."
        ],
        "protocol": "Airlines will verify permit and AWB before cargo loading.",
        "sourceName": "UAE Ministry of Climate Change and Environment",
        "sourceUrl": "https://www.moccae.gov.ae",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uae-to-uk": {
    "slug": "uae-to-uk",
    "from": "United Arab Emirates",
    "to": "United Kingdom",
    "fromFlag": "🇦🇪",
    "toFlag": "🇬🇧",
    "originCode": "AE",
    "destCode": "GB",
    "region": "Middle East → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from the UAE to Great Britain. The UAE is categorized as an unlisted third country under UK DEFRA rules. Enforces mandatory RNATT rabies titer testing, a mandatory 3-month (90-day) post-draw waiting period, 24–120 hour tapeworm treatment for dogs, and arrival as manifest cargo.",
    "titerRequired": "Mandatory RNATT (90-Day Waiting Clock)",
    "titerStatus": "mandatory",
    "titerDetail": "Blood sample drawn at least 30 days after rabies vaccination and tested at a DEFRA/EU approved lab (≥ 0.5 IU/mL). A mandatory 3-month (90-day) waiting clock applies from blood collection date before entering the UK.",
    "quarantineDays": "0 Days Quarantine (If 90-day clock met)",
    "quarantineDetail": "Direct release at London Heathrow Animal Reception Centre (HARC) if the 90-day post-draw wait time is fully satisfied.",
    "leadTime": "4–5 Months Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine + 30d wait + RNATT blood draw + 90-day waiting clock + MOCCAE export health certificate + tapeworm treatment.",
    "certificateType": "Great Britain Pet Health Certificate & MOCCAE Export Certificate",
    "certificateDetail": "Must be issued by a licensed vet in the UAE and officially endorsed by MOCCAE.",
    "entryAirports": [
      "London Heathrow (LHR - HARC Cargo)",
      "London Gatwick (LGW - Cargo)",
      "Manchester Airport (MAN - Cargo)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "4–5 Months Before Travel",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Confirm ISO microchip and administer rabies vaccine in UAE."
      },
      {
        "step": 2,
        "timing": "30 Days Post-Vaccine (Day 0 of Clock)",
        "title": "RNATT Rabies Titer Blood Draw",
        "description": "Vet draws blood sample for testing at DEFRA-approved laboratory. 3-month (90-day) clock starts."
      },
      {
        "step": 3,
        "timing": "24 to 120 Hours Before UK Landing",
        "title": "Tapeworm Treatment (Dogs Only)",
        "description": "UAE vet administers Praziquantel and records exact date and time on GB health certificate."
      },
      {
        "step": 4,
        "timing": "Within 10 Days of Departure",
        "title": "MOCCAE Export Certificate Endorsement",
        "description": "MOCCAE government veterinarian inspects pet and endorses Great Britain health certificate."
      },
      {
        "step": 5,
        "timing": "Arrival at Heathrow HARC",
        "title": "Cargo Clearance & Release",
        "description": "HARC veterinarians verify paperwork and release pet to owner."
      }
    ],
    "faqs": [
      {
        "q": "What happens if the 90-day waiting clock has not elapsed?",
        "a": "If you arrive in the UK before 90 days have passed from the RNATT blood draw date, your pet will be quarantined at your expense until the remainder of the 90 days has elapsed."
      },
      {
        "q": "What documents must be presented at Heathrow Animal Reception Centre (HARC) for pets arriving from UAE?",
        "a": "You must provide the UK Pet Health Certificate endorsed by UAE MOCCAE, the official rabies titer laboratory certificate showing a 90-day waiting period, and proof of tapeworm treatment."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "ae-gb-req-1",
        "category": "TITER_TEST",
        "categoryLabel": "DEFRA Unlisted Third Country Titer Latency",
        "title": "RNATT Rabies Titer & 90-Day Waiting Clock",
        "severity": "BLOCKING",
        "rules": [
          "Blood drawn at least 30 days after rabies vaccination.",
          "Result must be ≥ 0.5 IU/mL from DEFRA/EU approved lab.",
          "Must wait 3 calendar months (90 days) from blood collection date before entering the UK."
        ],
        "protocol": "Strictly audited by City of London veterinarians at Heathrow HARC.",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-singapore": {
    "slug": "usa-to-singapore",
    "from": "United States",
    "to": "Singapore",
    "fromFlag": "🇺🇸",
    "toFlag": "🇸🇬",
    "originCode": "US",
    "destCode": "SG",
    "region": "North America → Southeast Asia",
    "authority": "Animal & Veterinary Service (AVS / NParks Singapore) & USDA APHIS",
    "legalBasis": "Animals and Birds Act (Cap. 7) & AVS Pet Import Framework (Category C)",
    "description": "Statutory biosecurity regulations for importing pets from the USA to Singapore. The USA is categorized as an AVS Category C country. Requires AVS Import Licence, RNATT rabies antibody titer test (≥ 0.5 IU/mL), USDA APHIS VEHCS endorsed veterinary health certificate, and mandatory 30 days quarantine at the Changi Animal & Plant Quarantine Station (CAPQ).",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "RNATT rabies titer test (≥ 0.5 IU/mL) drawn at least 30 days after rabies vaccination and within 6 months of export.",
    "quarantineDays": "30 Days Mandatory PEQ (CAPQ)",
    "quarantineDetail": "Mandatory 30-day quarantine stay at Sembawang Animal Quarantine Station / Changi Animal & Plant Quarantine Station (CAPQ).",
    "leadTime": "4–6 Months Minimum",
    "leadTimeDetail": "Microchip + 2 rabies vaccines + RNATT test + CAPQ quarantine slot reservation + AVS Import Licence + USDA endorsement.",
    "certificateType": "AVS Veterinary Certificate (Annex A) & AVS Electronic Import Licence",
    "certificateDetail": "Must possess an AVS Import Licence from NParks paired with USDA APHIS endorsed veterinary health certificate.",
    "entryAirports": [
      "Singapore Changi Airport (SIN - CAPQ)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Akita",
      "Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "Boerboel",
      "Neapolitan Mastiff"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "4–6 Months Before Departure",
        "title": "Microchip & Two Rabies Vaccinations",
        "description": "Implant ISO microchip and administer at least two rabies vaccinations."
      },
      {
        "step": 2,
        "timing": "At Least 30 Days Post-Vaccine",
        "title": "RNATT Rabies Titer Test",
        "description": "Draw blood for RNATT test at approved lab (result ≥ 0.5 IU/mL)."
      },
      {
        "step": 3,
        "timing": "At Least 3 Months Before Arrival",
        "title": "Reserve CAPQ Quarantine Space",
        "description": "Book 30-day quarantine slot via Singapore AVS Quarantine Management System (QMS)."
      },
      {
        "step": 4,
        "timing": "Within 30 Days of Travel",
        "title": "Obtain AVS Import Licence",
        "description": "Apply for official electronic Import Licence via NParks portal."
      },
      {
        "step": 5,
        "timing": "Within 7 Days of Departure",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "USDA accredited vet conducts health exam and obtains USDA APHIS endorsement."
      },
      {
        "step": 6,
        "timing": "Arrival at Changi Airport",
        "title": "CAPQ Quarantine Induction",
        "description": "Pet is transferred from Changi Airport to CAPQ facility for 30-day quarantine."
      }
    ],
    "faqs": [
      {
        "q": "How early must I book quarantine in Singapore?",
        "a": "Quarantine slots at CAPQ fill up rapidly. You should book at least 3 months prior to your intended arrival date through the NParks QMS system."
      },
      {
        "q": "Can I bring banned breeds like pit bulls or akitas to Singapore?",
        "a": "No. Singapore AVS strictly prohibits the importation of Pit Bulls, Akita, Tosa, Dogo Argentino, Fila Brasileiro, and their crosses."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "us-sg-req-1",
        "category": "QUARANTINE_BOOKING",
        "categoryLabel": "AVS Category C Quarantine Mandate",
        "title": "CAPQ Quarantine Booking & AVS Import Licence",
        "severity": "BLOCKING",
        "rules": [
          "Must hold confirmed CAPQ quarantine reservation.",
          "Must hold active AVS electronic Import Licence."
        ],
        "protocol": "Airlines will deny boarding without validated AVS Licence.",
        "sourceName": "Singapore AVS / NParks",
        "sourceUrl": "https://www.nparks.gov.sg/avs",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "singapore-to-usa": {
    "slug": "singapore-to-usa",
    "from": "Singapore",
    "to": "United States",
    "fromFlag": "🇸🇬",
    "toFlag": "🇺🇸",
    "originCode": "SG",
    "destCode": "US",
    "region": "Southeast Asia → North America",
    "authority": "Centers for Disease Control and Prevention (CDC) & USDA APHIS",
    "legalBasis": "42 CFR 71.51 & CDC Dog Importation Regulations (August 2024)",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Singapore to the USA. Singapore is categorized as a rabies-free/low-risk country under CDC regulations. Requires completion of the free online CDC Dog Import Form, ISO microchip, valid rabies vaccination, and arrival inspection.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Singapore is a rabies-free country. No rabies titer blood test is required for entry into the United States.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance and verification of the CDC Dog Import Form QR receipt at any US port of entry.",
    "leadTime": "15–30 Days Minimum",
    "leadTimeDetail": "Microchip + valid rabies vaccine + free online CDC Dog Import Form submitted prior to boarding.",
    "certificateType": "CDC Dog Import Form Receipt & AVS Export Certificate",
    "certificateDetail": "Must possess the instant electronic CDC Dog Import receipt and an export certificate from Singapore AVS.",
    "entryAirports": [
      "Any US International Airport with CBP Facilities (SFO, LAX, JFK, ORD)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "Verify Microchip & Rabies Vaccine",
        "description": "Confirm ISO microchip and active rabies immunization."
      },
      {
        "step": 2,
        "timing": "2 to 10 Days Before Flight",
        "title": "Submit Free CDC Dog Import Form",
        "description": "Complete online form on CDC website and save generated QR code receipt."
      },
      {
        "step": 3,
        "timing": "Within 7 Days of Departure",
        "title": "Obtain Singapore AVS Export Certificate",
        "description": "AVS vet inspection and export permit issuance."
      },
      {
        "step": 4,
        "timing": "Arrival at US Airport",
        "title": "CBP Customs Verification",
        "description": "Present CDC QR receipt and AVS certificate to CBP officer for immediate entry."
      }
    ],
    "faqs": [
      {
        "q": "Is there a quarantine fee for dogs entering the USA from Singapore?",
        "a": "No. Because Singapore is recognized as a rabies-free country, dogs enter directly without quarantine or animal care facility fees."
      },
      {
        "q": "What are the entry requirements for dogs traveling from Singapore to the United States?",
        "a": "Dogs must have an ISO microchip, be at least 6 months old, have a valid rabies vaccine, and have a completed CDC Dog Import Form confirmation receipt."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "sg-us-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "CDC August 2024 Dog Import Mandate",
        "title": "CDC Dog Import Form Receipt (QR Code)",
        "severity": "BLOCKING",
        "rules": [
          "Must complete electronic CDC Dog Import Form prior to boarding flight.",
          "Dog must be at least 6 months old at time of US entry."
        ],
        "protocol": "Airlines will check CDC receipt before boarding.",
        "sourceName": "US Centers for Disease Control (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-singapore": {
    "slug": "uk-to-singapore",
    "from": "United Kingdom",
    "to": "Singapore",
    "fromFlag": "🇬🇧",
    "toFlag": "🇸🇬",
    "originCode": "GB",
    "destCode": "SG",
    "region": "Western Europe → Southeast Asia",
    "authority": "Animal & Veterinary Service (AVS / NParks Singapore) & DEFRA",
    "legalBasis": "Animals and Birds Act (Cap. 7) & AVS Category A Regulations",
    "description": "Statutory biosecurity regulations for importing pets from Great Britain to Singapore. Great Britain is recognized as an AVS Category A (rabies-free) country. Qualifies for 0 days quarantine, no rabies titer test required, subject to AVS Import Licence and DEFRA export health certificate endorsement.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The UK is an AVS Category A country. Rabies antibody titer testing is not required.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon arrival inspection at Changi Airport CAPQ station. No post-entry quarantine required.",
    "leadTime": "30–45 Days Minimum",
    "leadTimeDetail": "Microchip + residency in UK for at least 6 months + AVS Import Licence + DEFRA APHA export endorsement within 7 days.",
    "certificateType": "AVS Category A Veterinary Certificate & AVS Import Licence",
    "certificateDetail": "Must obtain AVS Import Licence and have official DEFRA/APHA endorsed veterinary certificate.",
    "entryAirports": [
      "Singapore Changi Airport (SIN - CAPQ)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Akita",
      "Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "Boerboel",
      "Neapolitan Mastiff"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30+ Days Before Departure",
        "title": "Verify ISO Microchip & Continuous UK Residency",
        "description": "Confirm ISO 11784/11785 microchip and continuous residence in the UK for at least 6 months prior to export."
      },
      {
        "step": 2,
        "timing": "30 Days Before Flight",
        "title": "Apply for AVS Electronic Import Licence",
        "description": "Submit online application via NParks portal to obtain Category A import licence."
      },
      {
        "step": 3,
        "timing": "Within 7 Days of Departure",
        "title": "DEFRA/APHA Veterinary Health Endorsement",
        "description": "UK Official Veterinarian conducts health exam and secures APHA stamp."
      },
      {
        "step": 4,
        "timing": "Arrival at Changi Airport",
        "title": "CAPQ Inspection & Direct Release",
        "description": "CAPQ officer scans microchip and releases pet without quarantine."
      }
    ],
    "faqs": [
      {
        "q": "Does my dog need rabies vaccine to go to Singapore from the UK?",
        "a": "Under AVS Category A rules, rabies vaccination is not mandatory for pets resident in the UK since birth or for the past 6 months, though standard core vaccinations (DHPPI) are required."
      },
      {
        "q": "How long is quarantine in Singapore for pets arriving from the UK?",
        "a": "Because the UK is classified as Category A (rabies-free) by Singapore AVS, pets face 0 days quarantine provided all veterinary and microchip criteria are met."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-sg-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "AVS Category A Import Licence",
        "title": "AVS Electronic Import Licence",
        "severity": "BLOCKING",
        "rules": [
          "Must hold active AVS Import Licence issued via NParks portal.",
          "Must book arrival inspection at Changi CAPQ."
        ],
        "protocol": "Verified prior to boarding departure flight in the UK.",
        "sourceName": "Singapore AVS / NParks",
        "sourceUrl": "https://www.nparks.gov.sg/avs",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "singapore-to-uk": {
    "slug": "singapore-to-uk",
    "from": "Singapore",
    "to": "United Kingdom",
    "fromFlag": "🇸🇬",
    "toFlag": "🇬🇧",
    "originCode": "SG",
    "destCode": "GB",
    "region": "Southeast Asia → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Singapore to Great Britain. Singapore is listed in Part 1 of Annex II to Regulation (EU) No 577/2013 (rabies-free/controlled country). Requires ISO microchip, rabies vaccination (with 21-day latency), Great Britain health certificate endorsed by Singapore AVS, 24–120 hour tapeworm treatment for dogs, and arrival as manifest cargo.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Singapore is a Part 1 listed country. No rabies antibody titer test is required for entry into Great Britain.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon cargo terminal clearance at London Heathrow (HARC) or Gatwick.",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine with 21-day latency + AVS export certificate + 24–120 hour tapeworm treatment.",
    "certificateType": "Great Britain Pet Health Certificate (endorsed by Singapore AVS)",
    "certificateDetail": "Must be completed by licensed vet in Singapore and endorsed by AVS.",
    "entryAirports": [
      "London Heathrow (LHR - HARC Cargo)",
      "London Gatwick (LGW - Cargo)",
      "Manchester Airport (MAN - Cargo)"
    ],
    "restrictedBreeds": [
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro",
      "XL Bully"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30+ Days Before Departure",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Administer rabies vaccine after confirming 15-digit ISO microchip."
      },
      {
        "step": 2,
        "timing": "24 to 120 Hours Before UK Landing",
        "title": "Tapeworm Treatment for Dogs",
        "description": "Singapore vet administers Praziquantel and records exact date and time on GB health certificate."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "Singapore AVS Export Health Endorsement",
        "description": "AVS official veterinarian endorses Great Britain health certificate."
      },
      {
        "step": 4,
        "timing": "Arrival at Heathrow HARC",
        "title": "Manifest Cargo Clearance & Release",
        "description": "HARC inspection and release to pet owner."
      }
    ],
    "faqs": [
      {
        "q": "Can my pet fly from Singapore to London in-cabin?",
        "a": "No. UK DEFRA regulations mandate that all pets arriving into the UK by air must travel as manifest cargo."
      },
      {
        "q": "Is a rabies titer blood test needed when traveling from Singapore to the UK?",
        "a": "No. Singapore is a Part 1 listed country under DEFRA regulations. No blood titer test is required for direct travel to Great Britain."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "sg-gb-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "DEFRA Tapeworm Protocol for Dogs",
        "title": "Mandatory 24–120h Praziquantel Treatment",
        "severity": "BLOCKING",
        "rules": [
          "Administered 24 to 120 hours before UK landing by registered Singapore vet.",
          "Contains Praziquantel."
        ],
        "protocol": "Verified at London Heathrow Animal Reception Centre (HARC).",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-new-zealand": {
    "slug": "usa-to-new-zealand",
    "from": "United States",
    "to": "New Zealand",
    "fromFlag": "🇺🇸",
    "toFlag": "🇳🇿",
    "originCode": "US",
    "destCode": "NZ",
    "region": "North America → Oceania",
    "authority": "Ministry for Primary Industries (MPI Biosecurity New Zealand) & USDA APHIS",
    "legalBasis": "Biosecurity Act 1993 & MPI Import Health Standard for Cats and Dogs",
    "description": "Statutory biosecurity regulations for importing pets from the USA to New Zealand. Enforces strict island biosecurity standards: mandatory RNATT rabies titer test (≥ 0.5 IU/mL) with a minimum 90-day waiting clock, MPI Import Permit, internal/external parasite protocols, heartworm testing, and mandatory 10 days quarantine at an MPI-approved facility in Auckland or Christchurch.",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "RNATT rabies titer test (≥ 0.5 IU/mL) drawn at least 3 months (90 days) and not more than 24 months before travel.",
    "quarantineDays": "10 Days Mandatory PEQ",
    "quarantineDetail": "Mandatory minimum 10-day quarantine stay at an approved private quarantine facility in Auckland or Christchurch.",
    "leadTime": "6–9 Months Minimum",
    "leadTimeDetail": "Microchip + rabies vaccines + RNATT test + 90-day waiting clock + MPI permit + quarantine reservation + parasite treatments.",
    "certificateType": "MPI Import Permit & USDA APHIS Endorsed Health Certificate",
    "certificateDetail": "Must possess an official MPI Import Permit and veterinary certificate endorsed by USDA APHIS.",
    "entryAirports": [
      "Auckland Airport (AKL - Approved PEQ transfer)",
      "Christchurch International (CHC - Approved PEQ transfer)"
    ],
    "restrictedBreeds": [
      "American Pit Bull Terrier",
      "Brazilian Fila",
      "Dogo Argentino",
      "Japanese Tosa",
      "Perro de Presa Canario"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "6–9 Months Before Travel",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Verify ISO microchip and administer valid rabies vaccination."
      },
      {
        "step": 2,
        "timing": "At Least 90 Days Before Travel",
        "title": "RNATT Rabies Titer Blood Test",
        "description": "Draw blood for RNATT test at Kansas State lab (≥ 0.5 IU/mL required). 90-day countdown begins."
      },
      {
        "step": 3,
        "timing": "3 Months Before Travel",
        "title": "Book Quarantine & Apply for MPI Permit",
        "description": "Reserve slot at Auckland/Christchurch quarantine facility and obtain MPI Import Permit."
      },
      {
        "step": 4,
        "timing": "Within 30 Days of Flight",
        "title": "Brucella, Heartworm & Parasite Testing",
        "description": "USDA vet conducts heartworm, Leptospirosis, Brucella canis, and external/internal parasite protocols."
      },
      {
        "step": 5,
        "timing": "Within 48–72 Hours of Departure",
        "title": "USDA Health Exam & VEHCS Endorsement",
        "description": "Final clinical inspection and USDA APHIS official endorsement."
      },
      {
        "step": 6,
        "timing": "Arrival in New Zealand",
        "title": "Direct Transfer to Quarantine",
        "description": "Pet lands at AKL or CHC and is transferred directly by MPI biosecurity officers for 10-day quarantine."
      }
    ],
    "faqs": [
      {
        "q": "Can pets fly directly to Wellington from the USA?",
        "a": "No. Companion pets must land at Auckland (AKL) or Christchurch (CHC) where approved post-entry quarantine stations operate."
      },
      {
        "q": "How long is post-arrival quarantine in New Zealand for US pets?",
        "a": "Pets arriving from the United States must complete a mandatory 10-day quarantine at an MPI-approved private quarantine facility in Auckland or Christchurch."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "us-nz-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "MPI Biosecurity Import Permit & Quarantine",
        "title": "New Zealand MPI Import Permit",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid MPI Import Permit.",
          "Must have confirmed booking at MPI approved quarantine facility (minimum 10 days)."
        ],
        "protocol": "Airlines will verify permit and quarantine booking prior to cargo departure.",
        "sourceName": "Biosecurity New Zealand (MPI)",
        "sourceUrl": "https://www.mpi.govt.nz/bring-send-to-nz/pets-cats-and-dogs/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "new-zealand-to-usa": {
    "slug": "new-zealand-to-usa",
    "from": "New Zealand",
    "to": "United States",
    "fromFlag": "🇳🇿",
    "toFlag": "🇺🇸",
    "originCode": "NZ",
    "destCode": "US",
    "region": "Oceania → North America",
    "authority": "Centers for Disease Control and Prevention (CDC) & USDA APHIS",
    "legalBasis": "42 CFR 71.51 & CDC Dog Importation Regulations (August 2024)",
    "description": "Statutory non-commercial entry regulations for traveling with pets from New Zealand to the USA. New Zealand is recognized as a rabies-free country under CDC regulations. Requires online CDC Dog Import Form submission, ISO microchip, and MPI export health certificate.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "New Zealand is a rabies-free country. No rabies antibody titer test is required for US entry.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance at any US port of entry.",
    "leadTime": "15–30 Days Minimum",
    "leadTimeDetail": "Microchip + CDC Dog Import Form receipt + MPI export certificate.",
    "certificateType": "CDC Dog Import Form Receipt & MPI Export Certificate",
    "certificateDetail": "Must possess electronic CDC QR receipt and official MPI export certificate.",
    "entryAirports": [
      "Any US International Airport with CBP Facilities (LAX, SFO, HNL, SEA)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "Verify Microchip & MPI Health Certificate",
        "description": "Confirm ISO microchip and obtain MPI export health certificate from registered vet in NZ."
      },
      {
        "step": 2,
        "timing": "2 to 10 Days Before Flight",
        "title": "Complete Online CDC Dog Import Form",
        "description": "Submit electronic form on CDC website to generate QR code receipt."
      },
      {
        "step": 3,
        "timing": "Arrival at US Port of Entry",
        "title": "CBP Customs Clearance",
        "description": "Present CDC QR receipt for instant release."
      }
    ],
    "faqs": [
      {
        "q": "Is a rabies vaccine required in New Zealand before flying to the US?",
        "a": "Under CDC August 2024 regulations, dogs arriving from rabies-free countries like New Zealand do not require rabies vaccination, but must hold the CDC Dog Import Form receipt and certification of 6-month continuous residency in a rabies-free country."
      },
      {
        "q": "What paperwork is required for cats flying from New Zealand to the USA?",
        "a": "Cats do not need a CDC form, but require an MPI export certificate showing freedom from clinical signs of infectious disease."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "nz-us-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "CDC August 2024 Dog Import Mandate",
        "title": "CDC Dog Import Form Receipt (QR Code)",
        "severity": "BLOCKING",
        "rules": [
          "Must complete electronic CDC Dog Import Form prior to boarding flight.",
          "Dog must be at least 6 months old at time of US entry."
        ],
        "protocol": "Checked by departure airline in Auckland or Christchurch.",
        "sourceName": "US Centers for Disease Control (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-new-zealand": {
    "slug": "uk-to-new-zealand",
    "from": "United Kingdom",
    "to": "New Zealand",
    "fromFlag": "🇬🇧",
    "toFlag": "🇳🇿",
    "originCode": "GB",
    "destCode": "NZ",
    "region": "Western Europe → Oceania",
    "authority": "Ministry for Primary Industries (MPI Biosecurity New Zealand) & DEFRA",
    "legalBasis": "Biosecurity Act 1993 & MPI Import Health Standard for Cats and Dogs",
    "description": "Statutory biosecurity regulations for importing pets from Great Britain to New Zealand. Requires RNATT rabies titer test (≥ 0.5 IU/mL), MPI Import Permit, DEFRA export certificate endorsement, parasite treatments, and mandatory 10 days quarantine at an MPI-approved facility.",
    "titerRequired": "Mandatory RNATT (≥ 0.5 IU/mL)",
    "titerStatus": "mandatory",
    "titerDetail": "RNATT rabies titer test (≥ 0.5 IU/mL) drawn at least 3 months and not more than 24 months before travel.",
    "quarantineDays": "10 Days Mandatory PEQ",
    "quarantineDetail": "Mandatory 10-day quarantine stay at an approved private quarantine facility in Auckland or Christchurch.",
    "leadTime": "6–9 Months Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine + RNATT blood draw + 90-day waiting clock + MPI permit + quarantine reservation.",
    "certificateType": "MPI Import Permit & DEFRA Export Health Certificate",
    "certificateDetail": "Must possess an MPI Import Permit and DEFRA/APHA endorsed veterinary certificate.",
    "entryAirports": [
      "Auckland Airport (AKL - Approved PEQ transfer)",
      "Christchurch International (CHC - Approved PEQ transfer)"
    ],
    "restrictedBreeds": [
      "American Pit Bull Terrier",
      "Brazilian Fila",
      "Dogo Argentino",
      "Japanese Tosa",
      "Perro de Presa Canario"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "6–9 Months Before Travel",
        "title": "ISO Microchip & Rabies Vaccine",
        "description": "Confirm ISO microchip and administer rabies vaccination."
      },
      {
        "step": 2,
        "timing": "At Least 90 Days Before Travel",
        "title": "RNATT Rabies Titer Blood Draw",
        "description": "UK vet draws blood sample for RNATT test at DEFRA-approved lab (≥ 0.5 IU/mL required)."
      },
      {
        "step": 3,
        "timing": "3 Months Before Travel",
        "title": "Book Quarantine & Apply for MPI Permit",
        "description": "Reserve slot at Auckland/Christchurch quarantine facility and obtain MPI Import Permit."
      },
      {
        "step": 4,
        "timing": "Within 48–72 Hours of Departure",
        "title": "DEFRA Health Exam & APHA Endorsement",
        "description": "Final clinical inspection, parasite treatments, and APHA endorsement."
      },
      {
        "step": 5,
        "timing": "Arrival in New Zealand",
        "title": "Quarantine Induction",
        "description": "Direct transfer to MPI-approved quarantine station for 10 days."
      }
    ],
    "faqs": [
      {
        "q": "Is quarantine required for UK pets entering New Zealand?",
        "a": "Yes. All cats and dogs entering New Zealand from the UK must complete a mandatory minimum 10-day stay at an approved quarantine facility."
      },
      {
        "q": "Can dogs fly in the passenger cabin to New Zealand from the UK?",
        "a": "No. All pets entering New Zealand must arrive as manifest cargo under MPI regulations to ensure biosecurity chain of custody."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-nz-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "MPI Biosecurity Import Permit & Quarantine",
        "title": "New Zealand MPI Import Permit",
        "severity": "BLOCKING",
        "rules": [
          "Must hold valid MPI Import Permit.",
          "Must have confirmed booking at MPI approved quarantine facility."
        ],
        "protocol": "Checked by airline in the UK prior to issuing cargo airway bill.",
        "sourceName": "Biosecurity New Zealand (MPI)",
        "sourceUrl": "https://www.mpi.govt.nz/bring-send-to-nz/pets-cats-and-dogs/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "australia-to-new-zealand": {
    "slug": "australia-to-new-zealand",
    "from": "Australia",
    "to": "New Zealand",
    "fromFlag": "🇦🇺",
    "toFlag": "🇳🇿",
    "originCode": "AU",
    "destCode": "NZ",
    "region": "Oceania (Trans-Tasman Corridor)",
    "authority": "Ministry for Primary Industries (MPI Biosecurity New Zealand) & DAFF",
    "legalBasis": "Biosecurity Act 1993 & Trans-Tasman Biosecurity Agreement",
    "description": "Statutory non-commercial entry regulations for traveling with pets between Australia and New Zealand under the Trans-Tasman biosecurity agreement. Because both nations are rabies-free, companion animals qualify for 0 days quarantine and no rabies vaccination/titer requirement, subject to microchipping, DAFF veterinary health certification, and parasite treatments.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Both Australia and New Zealand are rabies-free. No rabies vaccination or titer test is required for Trans-Tasman travel.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon arrival clearance at Auckland, Christchurch, or Wellington airports. No post-entry quarantine required.",
    "leadTime": "15–30 Days Minimum",
    "leadTimeDetail": "Microchip + DAFF export health certificate issued within 5 days of flight + parasite treatments.",
    "certificateType": "Official DAFF Export Certificate to New Zealand",
    "certificateDetail": "Must be issued by a registered Australian vet and endorsed by Australian DAFF.",
    "entryAirports": [
      "Auckland Airport (AKL)",
      "Christchurch International (CHC)",
      "Wellington International (WLG)"
    ],
    "restrictedBreeds": [
      "American Pit Bull Terrier",
      "Brazilian Fila",
      "Dogo Argentino",
      "Japanese Tosa",
      "Perro de Presa Canario"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30 Days Before Flight",
        "title": "Verify Microchip & Health Status",
        "description": "Confirm ISO 11784/11785 microchip and continuous residence in Australia since birth or for at least 90 days."
      },
      {
        "step": 2,
        "timing": "Within 5 Days of Flight",
        "title": "DAFF Veterinary Health Inspection",
        "description": "Registered vet administers external/internal parasite treatments and conducts clinical exam."
      },
      {
        "step": 3,
        "timing": "Within 3 Days of Flight",
        "title": "DAFF Export Health Endorsement",
        "description": "DAFF official veterinarian inspects pet and stamps the official Trans-Tasman export certificate."
      },
      {
        "step": 4,
        "timing": "Arrival in New Zealand",
        "title": "MPI Biosecurity Clearance & Direct Release",
        "description": "MPI biosecurity officer at AKL/CHC/WLG verifies microchip and releases pet immediately."
      }
    ],
    "faqs": [
      {
        "q": "Is there quarantine between Australia and New Zealand?",
        "a": "No. The Trans-Tasman corridor is quarantine-free for dogs and cats that have resided in Australia or New Zealand for at least 90 days or since birth."
      },
      {
        "q": "Do Australian dogs need a rabies vaccine before going to New Zealand?",
        "a": "No. Because both Australia and New Zealand are rabies-free, rabies vaccination is not mandatory for direct Trans-Tasman travel."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "au-nz-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "Trans-Tasman Health Certificate Mandate",
        "title": "DAFF Export Health Certificate for New Zealand",
        "severity": "BLOCKING",
        "rules": [
          "Must be endorsed by Australian DAFF within 5 days of departure.",
          "Pet must have resided continuously in Australia for at least 90 days."
        ],
        "protocol": "Verified by MPI biosecurity officers at New Zealand airport.",
        "sourceName": "Biosecurity New Zealand & Australian DAFF",
        "sourceUrl": "https://www.mpi.govt.nz/bring-send-to-nz/pets-cats-and-dogs/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "new-zealand-to-australia": {
    "slug": "new-zealand-to-australia",
    "from": "New Zealand",
    "to": "Australia",
    "fromFlag": "🇳🇿",
    "toFlag": "🇦🇺",
    "originCode": "NZ",
    "destCode": "AU",
    "region": "Oceania (Trans-Tasman Corridor)",
    "authority": "Department of Agriculture, Fisheries and Forestry (DAFF Australia) & MPI",
    "legalBasis": "Biosecurity Act 2015 & DAFF Group 1 (Rabies-Free) Import Protocol",
    "description": "Statutory non-commercial entry regulations for traveling with pets from New Zealand to Australia under DAFF Group 1 (rabies-free) protocol. Qualifies for 0 days quarantine, no DAFF import permit required, no rabies vaccination or titer test required, subject to microchipping and MPI export health certification.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "New Zealand is a DAFF Group 1 rabies-free country. No rabies vaccination or titer test is required.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon arrival clearance at Sydney (SYD), Melbourne (MEL), Brisbane (BNE), or Perth (PER). No quarantine facility stay required.",
    "leadTime": "15–30 Days Minimum",
    "leadTimeDetail": "Microchip + MPI export health certificate issued within 5 days of departure + parasite treatments.",
    "certificateType": "Official MPI Export Certificate to Australia",
    "certificateDetail": "Must be completed by a registered New Zealand vet and endorsed by an MPI Official Veterinarian.",
    "entryAirports": [
      "Sydney Kingsford Smith (SYD)",
      "Melbourne Airport (MEL)",
      "Brisbane Airport (BNE)",
      "Perth Airport (PER)"
    ],
    "restrictedBreeds": [
      "Dogo Argentino",
      "Fila Brasileiro",
      "Japanese Tosa",
      "American Pit Bull Terrier",
      "Pit Bull Terrier types",
      "Perro de Presa Canario"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "30 Days Before Flight",
        "title": "Verify Microchip & NZ Residency",
        "description": "Confirm ISO microchip and continuous residence in New Zealand since birth or for at least 90 days."
      },
      {
        "step": 2,
        "timing": "Within 5 Days of Flight",
        "title": "MPI Veterinary Health Examination",
        "description": "Vet administers internal/external parasite treatments and conducts clinical exam."
      },
      {
        "step": 3,
        "timing": "Within 3 Days of Flight",
        "title": "MPI Export Certificate Endorsement",
        "description": "MPI official veterinarian certifies health and issues official Group 1 export certificate."
      },
      {
        "step": 4,
        "timing": "Arrival in Australia",
        "title": "DAFF Biosecurity Clearance & Direct Release",
        "description": "DAFF officer at SYD/MEL/BNE verifies microchip and releases pet immediately to owner."
      }
    ],
    "faqs": [
      {
        "q": "Do I need a DAFF import permit to bring a dog from New Zealand to Australia?",
        "a": "No. Pets travelling directly from New Zealand to Australia do not require an Australian DAFF import permit, provided they have resided in New Zealand since birth or for at least 90 days."
      },
      {
        "q": "What biosecurity inspections happen when pets arrive in Australia from New Zealand?",
        "a": "Pets undergo a physical inspection by DAFF biosecurity officers at the airport to verify microchip and absence of ticks/fleas before release."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "nz-au-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "DAFF Group 1 Trans-Tasman Protocol",
        "title": "MPI Official Export Certificate for Australia",
        "severity": "BLOCKING",
        "rules": [
          "Must be endorsed by an MPI Official Veterinarian within 5 days of departure.",
          "Pet must have resided in New Zealand for at least 90 days or since birth."
        ],
        "protocol": "Verified by DAFF biosecurity officers at Australian international terminal.",
        "sourceName": "Australian DAFF Biosecurity",
        "sourceUrl": "https://www.agriculture.gov.au/biosecurity-trade/cats-dogs",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-japan": {
    "slug": "uk-to-japan",
    "from": "United Kingdom",
    "to": "Japan",
    "fromFlag": "🇬🇧",
    "toFlag": "🇯🇵",
    "originCode": "GB",
    "destCode": "JP",
    "region": "Western Europe → East Asia",
    "authority": "Ministry of Agriculture, Forestry and Fisheries (MAFF Animal Quarantine Service - Japan)",
    "legalBasis": "Rabies Prevention Act & Domestic Animal Infectious Diseases Control Act (Japan)",
    "description": "Statutory biosecurity regulations for importing pets from Great Britain to Japan. Enforces mandatory ISO microchipping, 2 rabies vaccinations, FAVN rabies antibody titer testing (≥ 0.5 IU/mL), a mandatory 180-day waiting period from blood draw date, advance notification to MAFF at least 40 days prior to arrival, and 12-hour quarantine clearance at Tokyo Narita (NRT) or Haneda (HND).",
    "titerRequired": "Mandatory FAVN (≥ 0.5 IU/mL) + 180d Clock",
    "titerStatus": "mandatory",
    "titerDetail": "FAVN rabies antibody titer test (≥ 0.5 IU/mL) drawn at an approved laboratory. A mandatory 180-day waiting clock from blood draw date applies to qualify for short (12 hours or less) quarantine.",
    "quarantineDays": "12 Hours (If 180-day clock met) vs 180 Days",
    "quarantineDetail": "Short quarantine (12 hours or less) at Tokyo Narita (NRT) or Haneda (HND) if the 180-day post-draw wait time is fully satisfied.",
    "leadTime": "7–8 Months Minimum",
    "leadTimeDetail": "Microchip + 2 rabies vaccines + FAVN test + 180-day waiting clock + 40-day MAFF advance notification + DEFRA export certificate.",
    "certificateType": "MAFF Approval of Import Inspection & DEFRA Export Health Certificate",
    "certificateDetail": "Must possess MAFF Approval of Import Inspection and official health certificate endorsed by DEFRA/APHA (Forms A and C).",
    "entryAirports": [
      "Tokyo Narita International (NRT)",
      "Tokyo Haneda (HND)",
      "Kansai International (KIX)",
      "Chubu Centrair (NGO)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "7–8 Months Before Travel",
        "title": "ISO Microchip & 2 Rabies Vaccinations",
        "description": "Implant ISO 11784/11785 microchip and administer 2 rabies vaccines at least 30 days apart."
      },
      {
        "step": 2,
        "timing": "Day 0 of Clock (After 2nd Vaccine)",
        "title": "FAVN Rabies Titer Blood Test",
        "description": "Blood drawn and tested at a MAFF-designated laboratory (≥ 0.5 IU/mL). 180-day waiting clock begins."
      },
      {
        "step": 3,
        "timing": "At Least 40 Days Before Arrival",
        "title": "Submit Advance Notification to MAFF",
        "description": "Submit import notification to Animal Quarantine Service at destination airport to receive Approval of Import Inspection."
      },
      {
        "step": 4,
        "timing": "Within 10 Days of Departure",
        "title": "DEFRA/APHA Export Endorsement (Forms A & C)",
        "description": "UK Official Veterinarian completes clinical exam and secures APHA stamp on MAFF export certificates."
      },
      {
        "step": 5,
        "timing": "Arrival in Japan",
        "title": "Animal Quarantine Service Inspection",
        "description": "Inspection at airport quarantine counter (12 hours or less) and release to owner."
      }
    ],
    "faqs": [
      {
        "q": "What happens if 180 days have not elapsed since the FAVN blood draw?",
        "a": "If you arrive in Japan before 180 days have passed from the FAVN blood collection date, your pet will be quarantined at the Animal Quarantine Service facility for the remainder of the 180 days at your expense."
      },
      {
        "q": "How far in advance must I notify Japanese Animal Quarantine Service (AQS)?",
        "a": "You must submit an advance notification to AQS at least 40 days prior to arrival in Japan via the NACCS online portal."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-jp-req-1",
        "category": "TITER_TEST",
        "categoryLabel": "MAFF 180-Day FAVN Waiting Period",
        "title": "FAVN Rabies Titer Test & 180-Day Clock",
        "severity": "BLOCKING",
        "rules": [
          "Must be tested at a MAFF-designated laboratory (result ≥ 0.5 IU/mL).",
          "Must complete 180-day waiting period from blood draw date prior to landing in Japan.",
          "Must submit advance notification to MAFF at least 40 days prior to arrival."
        ],
        "protocol": "Verified by Japanese quarantine officers at Narita / Haneda airport.",
        "sourceName": "Japan MAFF Animal Quarantine Service",
        "sourceUrl": "https://www.maff.go.jp/aqs/english/animal/dog/index.html",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "japan-to-usa": {
    "slug": "japan-to-usa",
    "from": "Japan",
    "to": "United States",
    "fromFlag": "🇯🇵",
    "toFlag": "🇺🇸",
    "originCode": "JP",
    "destCode": "US",
    "region": "East Asia → North America",
    "authority": "Centers for Disease Control and Prevention (CDC) & USDA APHIS",
    "legalBasis": "42 CFR 71.51 & CDC Dog Importation Regulations (August 2024)",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Japan to the USA. Japan is recognized as a rabies-free country under CDC regulations. Requires completion of the free online CDC Dog Import Form, ISO microchip, MAFF export quarantine certificate, and arrival customs inspection.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Japan is a rabies-free country. No rabies titer blood test is required for US entry.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance and verification of the CDC Dog Import Form QR receipt at any US port of entry.",
    "leadTime": "15–30 Days Minimum",
    "leadTimeDetail": "Microchip + CDC Dog Import Form receipt + MAFF export certificate.",
    "certificateType": "CDC Dog Import Form Receipt & Japan MAFF Export Certificate",
    "certificateDetail": "Must possess electronic CDC QR receipt and official export quarantine certificate from Japan MAFF.",
    "entryAirports": [
      "Any US International Airport with CBP Facilities (HNL, LAX, SFO, SEA, JFK)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "Verify Microchip & MAFF Export Certificate",
        "description": "Confirm ISO microchip and obtain export quarantine certificate from Japan MAFF at departure airport."
      },
      {
        "step": 2,
        "timing": "2 to 10 Days Before Flight",
        "title": "Submit Free CDC Dog Import Form",
        "description": "Complete online form on CDC website to generate QR code receipt."
      },
      {
        "step": 3,
        "timing": "Arrival at US Airport",
        "title": "CBP Customs Verification",
        "description": "Present CDC QR receipt and MAFF certificate to CBP officer for immediate entry."
      }
    ],
    "faqs": [
      {
        "q": "Is there a quarantine fee for dogs entering the USA from Japan?",
        "a": "No. Because Japan is recognized as a rabies-free country, dogs enter directly without quarantine or animal care facility fees."
      },
      {
        "q": "What CDC documentation is required for dogs arriving from Japan to the United States?",
        "a": "Owners must complete the online CDC Dog Import Form, have an ISO microchip, and show proof of rabies vaccination if entering from Japan."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "jp-us-req-1",
        "category": "IMPORT_PERMIT",
        "categoryLabel": "CDC August 2024 Dog Import Mandate",
        "title": "CDC Dog Import Form Receipt (QR Code)",
        "severity": "BLOCKING",
        "rules": [
          "Must complete electronic CDC Dog Import Form prior to boarding flight.",
          "Dog must be at least 6 months old at time of US entry."
        ],
        "protocol": "Checked by airline in Tokyo (NRT/HND) prior to boarding.",
        "sourceName": "US Centers for Disease Control (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "canada-to-uk": {
    "slug": "canada-to-uk",
    "from": "Canada",
    "to": "United Kingdom",
    "fromFlag": "🇨🇦",
    "toFlag": "🇬🇧",
    "originCode": "CA",
    "destCode": "GB",
    "region": "North America → Great Britain",
    "authority": "Department for Environment, Food & Rural Affairs (DEFRA) & APHA",
    "legalBasis": "The Non-Commercial Movement of Pet Animals Order 2011 & Retained Regulation (EU) 576/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Canada to Great Britain under the UK Pet Travel Scheme (PETS). Covers mandatory CFIA district office endorsement within 10 days, 24–120 hour veterinary tapeworm treatment, manifest cargo arrival at London Heathrow HARC, and 0-day quarantine.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Canada is recognized as a Part 1 listed country under UK DEFRA statutes. No rabies antibody titer test is required for direct entry into Great Britain.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs inspection at London Heathrow Animal Reception Centre (HARC), Gatwick, or Manchester.",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Microchip + rabies vaccine with 21-day latency + CFIA district office export endorsement + 24–120 hour tapeworm treatment.",
    "certificateType": "Great Britain Pet Health Certificate (CFIA Endorsed)",
    "certificateDetail": "Must be issued by a licensed Canadian veterinarian and endorsed with an official CFIA stamp within 10 days of travel.",
    "entryAirports": [
      "London Heathrow (LHR - HARC Cargo)",
      "London Gatwick (LGW - Cargo)",
      "Manchester Airport (MAN - Cargo)",
      "Edinburgh Airport (EDI - Cargo)"
    ],
    "restrictedBreeds": [
      "XL Bully (Dangerous Dogs Act 1991)",
      "Pit Bull Terrier",
      "Japanese Tosa",
      "Dogo Argentino",
      "Fila Brasileiro"
    ],
    "airlinePolicies": [
      {
        "name": "Air Canada Cargo (AC PetConnect)",
        "code": "AC",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Air Canada transports pets as manifest cargo via AC PetConnect from Toronto YYZ, Vancouver YVR, and Montreal YUL into London Heathrow HARC. In-cabin pet travel is strictly prohibited for UK arrivals.",
        "feeEstimate": "$1,100–$2,600 CAD",
        "airlineGuideSlug": "air-canada"
      },
      {
        "name": "British Airways / IAG Cargo",
        "code": "BA",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Flies pets as manifest cargo into LHR HARC and Manchester.",
        "feeEstimate": "$1,200–$2,800 CAD",
        "airlineGuideSlug": "british-airways"
      },
      {
        "name": "Air France (via Paris Transit Workaround)",
        "code": "AF",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 8,
        "notes": "Travelers wishing to avoid cargo can fly Air France in-cabin to Paris CDG, then enter the UK via Eurotunnel Le Shuttle with an accredited pet taxi.",
        "feeEstimate": "$200 CAD + £300–£600 (Eurotunnel / pet taxi)",
        "airlineGuideSlug": "air-france"
      }
    ],
    "transitAdvice": {
      "headline": "CFIA Physical Endorsement & Manifest Cargo Protocol",
      "layoverRules": "Direct transatlantic routing is strongly recommended. If transiting through European airports, ensure the pet remains in transit and documents are not stamped by intermediate EU customs unless intentionally entering the EU first.",
      "directVsTransit": "All commercial airline flights landing in the UK require booking pets as manifest cargo with an Air Waybill (AWB). Hand luggage / in-cabin pets cannot be brought directly into UK airports.",
      "landBorderOption": "In-Cabin Workaround: Fly in-cabin from Montreal/Toronto to Paris CDG or Amsterdam AMS, then drive across to Great Britain via Eurotunnel Folkestone.",
      "climateRestrictions": "Winter pet travel: Extreme Canadian winter cold (temperatures below -10°C / 14°F) can trigger ground cargo embargoes at Toronto YYZ and Montreal YUL."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Implant 15-digit ISO microchip. Administer rabies shot on the same day or after; a 21-day latency period must elapse before export."
      },
      {
        "step": 2,
        "timing": "Day -21 to -14",
        "title": "Book Manifest Cargo Air Waybill (AWB)",
        "description": "Reserve live animal manifest cargo space with Air Canada Cargo (PetConnect) or IAG Cargo into London Heathrow HARC."
      },
      {
        "step": 3,
        "timing": "Day -5 to -1 (24–120h Window)",
        "title": "Mandatory Tapeworm (Praziquantel) Treatment",
        "description": "Canadian veterinarian administers Praziquantel and records exact date and time on Section II of the Great Britain Health Certificate."
      },
      {
        "step": 4,
        "timing": "Within 10 Days of Departure",
        "title": "CFIA District Office Official Endorsement",
        "description": "Official CFIA veterinarian inspects the health certificate and applies the physical sovereign endorsement stamp."
      },
      {
        "step": 5,
        "timing": "Arrival at Heathrow HARC",
        "title": "Animal Reception Centre Inspection & Release",
        "description": "HARC verifies microchip, stamps customs clearance, and releases pet to owner within 2–4 hours of flight landing."
      }
    ],
    "faqs": [
      {
        "q": "Can my dog fly in-cabin from Toronto or Vancouver to London?",
        "a": "No. Under UK DEFRA regulations, commercial airlines are legally prohibited from bringing pets into the UK in passenger cabins (except certified assistance dogs). All companion pets must arrive as manifest cargo under an Air Waybill (AWB)."
      },
      {
        "q": "How do I get CFIA endorsement for the Great Britain Pet Health Certificate?",
        "a": "Your private veterinarian in Canada fills out the official Great Britain Pet Health Certificate. You then take or courier the certificate to your local CFIA District Office (Animal Health Division), where an official CFIA veterinarian reviews the records and applies the sovereign endorsement stamp within 10 days of travel."
      },
      {
        "q": "Is tapeworm treatment mandatory for dogs entering the UK from Canada?",
        "a": "Yes. All dogs entering Great Britain from Canada must be treated with an approved praziquantel product by a licensed veterinarian between 24 and 120 hours (1 to 5 days) before scheduled arrival in the UK."
      },
      {
        "q": "Is a rabies titer test required for pets from Canada to the UK?",
        "a": "No. Canada is listed as a Part 1 rabies-controlled country by UK DEFRA. No rabies antibody titer test (FAVN/RNATT) is required for direct travel."
      },
      {
        "q": "What happens at London Heathrow Animal Reception Centre (HARC) upon arrival?",
        "a": "Upon landing at Heathrow (LHR), airline staff transport your pet directly to HARC. Official veterinary staff scan the microchip, check the CFIA-endorsed health certificate and tapeworm records, and release the pet to you or your clearing agent in approx. 2 to 4 hours."
      },
      {
        "q": "Are XL Bullies and Pitbulls permitted into the UK from Canada?",
        "a": "No. The UK Dangerous Dogs Act strictly prohibits importing XL Bullies, Pit Bull Terriers, Japanese Tosas, Dogo Argentinos, and Fila Brasileiros."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "ca-gb-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "DEFRA Tapeworm Protocol for Dogs",
        "title": "Mandatory 24–120h Praziquantel Treatment",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Administered 24 to 120 hours before UK landing by registered Canadian veterinarian.",
          "Must contain Praziquantel or licensed equivalent.",
          "Exact date, hour, and drug brand must be entered on Section II of the Great Britain certificate."
        ],
        "protocol": "Strict Window: Administering outside the 24–120h window results in border quarantine or refusal.",
        "sourceName": "UK DEFRA Pet Travel Scheme",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "ca-gb-req-2",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "CFIA Endorsed GB Health Certificate",
        "title": "CFIA District Office Health Certificate Endorsement",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Official Great Britain Pet Health Certificate completed by licensed Canadian veterinarian.",
          "Officially stamped and endorsed by a CFIA District Veterinarian within 10 days of departure."
        ],
        "protocol": "10-Day Window: Must be stamped by CFIA within 10 days of UK landing.",
        "sourceName": "Canadian Food Inspection Agency (CFIA)",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/exports/live-animals",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "ca-gb-req-3",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Standard 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "15-digit ISO 11784/11785 compliant microchip must be implanted before rabies vaccination."
        ],
        "protocol": "Identity Integrity: Microchip transponder must match all documents and cargo Air Waybill.",
        "sourceName": "UK APHA & DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "ca-gb-req-4",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Rabies Immunization Protocol",
        "title": "Rabies Vaccination with 21-Day Wait",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Valid rabies vaccination given at 12 weeks of age or older after microchipping.",
          "Primary vaccine requires a 21-day latency period before departure."
        ],
        "protocol": "Latency Clock: Primary rabies vaccine becomes legally effective on Day 22.",
        "sourceName": "UK DEFRA",
        "sourceUrl": "https://www.gov.uk/bring-pet-to-great-britain",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-canada": {
    "slug": "uk-to-canada",
    "from": "United Kingdom",
    "to": "Canada",
    "fromFlag": "🇬🇧",
    "toFlag": "🇨🇦",
    "originCode": "GB",
    "destCode": "CA",
    "region": "Great Britain → North America",
    "authority": "Canadian Food Inspection Agency (CFIA) & Canada Border Services Agency (CBSA)",
    "legalBasis": "Health of Animals Act & CFIA Dog and Cat Importation Policy",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Great Britain to Canada. Requires valid rabies vaccination certificate (in English or French), ISO microchip, DEFRA veterinary export certificate, and payment of the standard CBSA inspection fee ($30 CAD) upon airport arrival.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Canada does not require rabies antibody titer testing (FAVN/RNATT) for personal companion pets arriving from the UK.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon CBSA document inspection and payment of the veterinary inspection fee at Canadian airports.",
    "leadTime": "30 Days Minimum",
    "leadTimeDetail": "Microchip + valid rabies vaccine (administered at least 30 days before travel if primary) + DEFRA export certificate.",
    "certificateType": "Official Rabies Certificate & DEFRA Export Certificate",
    "certificateDetail": "Must clearly state breed, color, sex, weight, microchip number, vaccine brand, serial number, and duration of immunity in English or French.",
    "entryAirports": [
      "Toronto Pearson (YYZ)",
      "Vancouver International (YVR)",
      "Montréal-Trudeau (YUL)",
      "Calgary International (YYC)"
    ],
    "airlinePolicies": [
      {
        "name": "Air Canada",
        "code": "AC",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 10,
        "notes": "Direct flights from London Heathrow (LHR) to Toronto, Vancouver, Montreal, and Calgary. Small pets permitted in-cabin ($50–$100 CAD fee); larger pets travel via AC Cargo.",
        "feeEstimate": "$50–$100 CAD (in-cabin) / $1,000–$2,200 CAD (cargo)",
        "airlineGuideSlug": "air-canada"
      },
      {
        "name": "British Airways",
        "code": "BA",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Accepts pets as manifest cargo departing London Heathrow into Toronto YYZ and Vancouver YVR.",
        "feeEstimate": "£900–£2,200 GBP",
        "airlineGuideSlug": "british-airways"
      },
      {
        "name": "WestJet",
        "code": "WS",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "maxInCabinWeightKg": 7.5,
        "notes": "Direct flights from London Gatwick (LGW) and Edinburgh (EDI) to Calgary and Toronto. Allows in-cabin pets under 7.5kg.",
        "feeEstimate": "$50–$100 CAD each way"
      }
    ],
    "transitAdvice": {
      "headline": "Direct Transatlantic Flights & Airport Customs Clearance",
      "layoverRules": "Direct flights from London (LHR/LGW) to Toronto (YYZ) or Vancouver (YVR) are fastest. If connecting through an EU hub, ensure the pet remains in the sterile transit area.",
      "directVsTransit": "Air Canada and WestJet allow in-cabin companion pets departing UK airports to Canadian gateways, providing a comfortable journey without mandatory cargo booking.",
      "landBorderOption": "UK to Canada travel is entirely transatlantic by air.",
      "climateRestrictions": "Canadian winter cold: Canadian airlines enforce ramp temperature embargoes below -10°C (14°F) for hold/cargo animals."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Confirm ISO microchip and administer valid rabies vaccination (if primary, at least 30 days before travel)."
      },
      {
        "step": 2,
        "timing": "Within 10 Days of Departure",
        "title": "UK Vet Exam & Export Health Certificate",
        "description": "UK Official Veterinarian completes bilingual export health certificate specifying breed, microchip, and vaccine details."
      },
      {
        "step": 3,
        "timing": "Day -3 to -1",
        "title": "Airline Pet Reservation",
        "description": "Confirm in-cabin pet reservation with Air Canada or WestJet, or finalize cargo booking."
      },
      {
        "step": 4,
        "timing": "Arrival at Canadian Airport",
        "title": "CBSA Customs Inspection & Fee Payment",
        "description": "CBSA officer inspects paperwork and collects standard inspection fee ($30 CAD) for immediate 0-day quarantine entry."
      }
    ],
    "faqs": [
      {
        "q": "Can my pet fly in-cabin from London to Toronto or Vancouver?",
        "a": "Yes! Unlike inbound flights to the UK, outbound transatlantic flights from London to Canada on Air Canada and WestJet permit small companion dogs and cats in the passenger cabin (under 8–10kg including carrier)."
      },
      {
        "q": "What health certificate does Canada CFIA require from the UK?",
        "a": "CFIA requires a valid rabies vaccination certificate signed by a licensed veterinarian (in English or French) specifying the animal’s breed, sex, weight, microchip number, vaccine brand, and lot number."
      },
      {
        "q": "Is there any quarantine for pets moving from the UK to Canada?",
        "a": "No. The UK is recognized as a rabies-free territory by CFIA. Pets enter Canada with 0 days quarantine upon document verification at CBSA customs."
      },
      {
        "q": "What is the CBSA pet inspection fee at Canadian ports of entry?",
        "a": "CBSA collects an inspection fee of approx. $30 CAD + tax for the first animal ($5 CAD for each additional animal) at Canadian airport customs counters."
      },
      {
        "q": "Are Pit Bulls and dangerous breeds banned from entering Canada from the UK?",
        "a": "While Canada has no federal breed ban, the Province of Ontario enforces an import ban on Pit Bull Terriers, Staffordshire Bull Terriers, and American Staffordshire Terriers under the Dog Owners’ Liability Act (DOLA)."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-ca-req-1",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "CFIA Rabies Certificate Mandate",
        "title": "Bilingual Rabies Certificate for Canada",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Must be in English or French and signed by a licensed veterinarian.",
          "Must list animal identification, microchip number, vaccine trade name, lot number, and expiration date.",
          "Primary vaccine must be given at least 30 days prior to border entry."
        ],
        "protocol": "CBSA Border Check: CBSA border officer checks documentation upon landing.",
        "sourceName": "Canadian Food Inspection Agency (CFIA)",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "gb-ca-req-2",
        "category": "MICROCHIP",
        "categoryLabel": "ISO 11784/11785 Microchip",
        "title": "Standard 15-Digit Microchip Implantation",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "ISO 11784/11785 compliant 15-digit microchip implanted before travel."
        ],
        "protocol": "Identity Integrity: Microchip number eliminates border inspection delays with CBSA.",
        "sourceName": "CFIA Animal Health Division",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "gb-ca-req-3",
        "category": "BREED_RESTRICTIONS",
        "categoryLabel": "Ontario DOLA Breed Ban",
        "title": "Ontario Dog Owners' Liability Act (DOLA) Pit Bull Ban",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Pit Bull Terriers, Staffordshire Bull Terriers, American Staffordshire Terriers, and American Pit Bulls are strictly banned from entering Ontario."
        ],
        "protocol": "Provincial Enforcement: Prohibited breeds entering Ontario face seizure and immediate re-exportation.",
        "sourceName": "Government of Ontario / CFIA",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "gb-ca-req-4",
        "category": "CUSTOMS_FEE",
        "categoryLabel": "CBSA Port Inspection Fee",
        "title": "Statutory Airport Inspection Fee ($30 CAD + Tax)",
        "applicableSpecies": "BOTH",
        "severity": "NON_BLOCKING",
        "rules": [
          "Payable at CBSA primary inspection upon clearing Canadian airport customs ($30 CAD + tax for first animal)."
        ],
        "protocol": "Collected at CBSA customs counter at Toronto (YYZ), Vancouver (YVR), Montreal (YUL), or Calgary (YYC).",
        "sourceName": "CBSA",
        "sourceUrl": "https://inspection.canada.ca/en/animal-health/terrestrial-animals/imports/pets",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-switzerland": {
    "slug": "usa-to-switzerland",
    "from": "United States",
    "to": "Switzerland",
    "fromFlag": "🇺🇸",
    "toFlag": "🇨🇭",
    "originCode": "US",
    "destCode": "CH",
    "region": "North America → Central Europe",
    "authority": "Federal Food Safety and Veterinary Office (FSVO / BLV Switzerland) & USDA APHIS",
    "legalBasis": "Federal Ordinance on the Import, Transit and Export of Pet Animals (EDAV; SR 916.443.10)",
    "description": "Statutory non-commercial entry regulations for traveling with pets from the USA to Switzerland. Switzerland harmonizes pet movement rules with EU Regulation (EU) No 576/2013. Requires EU Non-Commercial Health Certificate (Annex IV) endorsed by USDA APHIS via VEHCS, ISO microchip, 21-day rabies latency, and compliance with strict Swiss animal welfare bans on docked tails/cropped ears.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The US is listed as a rabies-controlled third country in Annex II to Regulation (EU) No 577/2013. No rabies titer test is required for direct travel to Switzerland.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs inspection at Zurich Airport (ZRH) or Geneva Airport (GVA).",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day latency on primary rabies vaccination + USDA VEHCS endorsement within 10 days of travel.",
    "certificateType": "EU Non-Commercial Health Certificate (Annex IV / Swiss equivalent)",
    "certificateDetail": "Must be issued by a USDA-accredited vet and officially endorsed via USDA APHIS VEHCS.",
    "entryAirports": [
      "Zurich Airport (ZRH)",
      "Geneva Airport (GVA)",
      "EuroAirport Basel Mulhouse Freiburg (BSL)"
    ],
    "restrictedBreeds": [
      "Dogs with docked tails or cropped ears (strictly banned from import under Swiss Animal Welfare legislation SR 455)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO Microchip Implantation",
        "description": "Implant 15-digit ISO 11784/11785 microchip strictly prior to rabies vaccination."
      },
      {
        "step": 2,
        "timing": "At Least 21 Days Before Arrival",
        "title": "Rabies Vaccination & Latency",
        "description": "Administer rabies vaccine. 21-day waiting clock begins on Day 0."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Arrival",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "USDA-accredited vet completes health certificate and submits via VEHCS."
      },
      {
        "step": 4,
        "timing": "Arrival at Zurich / Geneva Airport",
        "title": "Swiss Customs (Zoll) Declaration",
        "description": "Exit via Red Customs Channel for microchip scan and document stamp."
      }
    ],
    "faqs": [
      {
        "q": "Can dogs with docked tails or cropped ears enter Switzerland?",
        "a": "No. Switzerland has strict animal welfare laws prohibiting the import of dogs with cropped ears or docked tails. Exceptions only apply to owners relocating permanently to Switzerland or short-term vacationers who apply in advance for an FSVO exemption permit."
      },
      {
        "q": "Does Switzerland accept the standard EU Pet Health Certificate from the USA?",
        "a": "Yes. Switzerland applies EU pet movement regulations and accepts the USDA-endorsed EU Annex IV health certificate or Swiss-specific model certificate."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "us-ch-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "Swiss FSVO Health Certificate Mandate",
        "title": "USDA VEHCS Endorsed Health Certificate",
        "severity": "BLOCKING",
        "rules": [
          "Issued within 10 days of Swiss arrival by USDA-accredited veterinarian.",
          "Must verify 21-day rabies latency."
        ],
        "protocol": "Verified at Zurich / Geneva customs.",
        "sourceName": "Swiss Federal Food Safety and Veterinary Office (FSVO)",
        "sourceUrl": "https://www.blv.admin.ch",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "usa-to-netherlands": {
    "slug": "usa-to-netherlands",
    "from": "United States",
    "to": "Netherlands",
    "fromFlag": "🇺🇸",
    "toFlag": "🇳🇱",
    "originCode": "US",
    "destCode": "NL",
    "region": "North America → European Union",
    "authority": "Netherlands Food and Consumer Product Safety Authority (NVWA) & USDA APHIS",
    "legalBasis": "Regulation (EU) No 576/2013 & Commission Implementing Regulation (EU) No 577/2013",
    "description": "Statutory non-commercial entry regulations for traveling with pets from the USA to the Netherlands. Requires EU Non-Commercial Health Certificate (Annex IV) endorsed by USDA APHIS via VEHCS, ISO microchip, 21-day rabies latency, and border inspection at Amsterdam Airport Schiphol (AMS).",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "The US is listed in Annex II to Regulation (EU) No 577/2013. No rabies antibody titer test is required for direct travel to the Netherlands.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs clearance at Amsterdam Airport Schiphol (AMS).",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day latency on primary rabies vaccination + USDA VEHCS endorsement within 10 days of EU arrival.",
    "certificateType": "EU Non-Commercial Health Certificate (Annex IV)",
    "certificateDetail": "Must be issued by a USDA-accredited veterinarian and officially endorsed via USDA APHIS VEHCS.",
    "entryAirports": [
      "Amsterdam Airport Schiphol (AMS)",
      "Rotterdam The Hague Airport (RTM)",
      "Eindhoven Airport (EIN)"
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Earliest Step",
        "title": "ISO Microchip Implantation",
        "description": "Implant 15-digit ISO microchip prior to rabies vaccination."
      },
      {
        "step": 2,
        "timing": "At Least 21 Days Before Arrival",
        "title": "Rabies Vaccination & Latency",
        "description": "Administer rabies vaccine. 21-day waiting period begins on Day 0."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Arrival",
        "title": "USDA Vet Exam & VEHCS Endorsement",
        "description": "USDA vet completes EU Annex IV certificate and secures electronic USDA endorsement."
      },
      {
        "step": 4,
        "timing": "Arrival at Amsterdam Schiphol (AMS)",
        "title": "Dutch Customs (Douane) Clearance",
        "description": "Proceed through Red Customs Channel for document and microchip check."
      }
    ],
    "faqs": [
      {
        "q": "Does the Netherlands ban any specific dog breeds?",
        "a": "No. The Netherlands does not currently enforce a statutory ban on specific dog breeds for non-commercial pet imports, provided all standard EU health certificate and rabies requirements are met."
      },
      {
        "q": "What happens when arriving at Amsterdam Schiphol Airport (AMS) with a dog?",
        "a": "You must proceed to the Red Customs channel where Dutch customs officers verify your USDA-endorsed EU Health Certificate and scan the microchip."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "us-nl-req-1",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "EU Annex IV Health Certificate Mandate",
        "title": "USDA VEHCS Endorsed EU Certificate",
        "severity": "BLOCKING",
        "rules": [
          "Issued by USDA-accredited vet within 10 days of arrival in the Netherlands.",
          "Microchip must precede rabies vaccination."
        ],
        "protocol": "Verified by Dutch Douane customs at Amsterdam Schiphol (AMS).",
        "sourceName": "Netherlands NVWA & European Commission",
        "sourceUrl": "https://www.nvwa.nl",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "uk-to-ireland": {
    "slug": "uk-to-ireland",
    "from": "United Kingdom",
    "to": "Ireland",
    "fromFlag": "🇬🇧",
    "toFlag": "🇮🇪",
    "originCode": "GB",
    "destCode": "IE",
    "region": "Great Britain → Republic of Ireland",
    "authority": "Department of Agriculture, Food and the Marine (DAFM Ireland) & DEFRA",
    "legalBasis": "Pet Passport (No. 2) Regulations 2014 & Regulation (EU) No 576/2013",
    "description": "Statutory non-commercial entry regulations for taking dogs, cats, and ferrets from Great Britain to the Republic of Ireland post-Brexit. Governs DEFRA Animal Health Certificate (AHC) or valid EU Pet Passport, ISO microchip, 21-day rabies latency, mandatory 24–120 hour tapeworm treatment for dogs, 24-hour advance DAFM notification, and ferry/air transport options.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Great Britain is a Part 2 listed third country under EU Regulation 577/2013. No rabies blood titer test is required for direct entry into Ireland.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon document and microchip check at Dublin Airport (DUB), Cork Airport (ORK), or Dublin / Rosslare ferry ports.",
    "leadTime": "21 Days Minimum",
    "leadTimeDetail": "21-day rabies vaccination latency + UK AHC within 10 days + mandatory 24–120 hour tapeworm treatment for dogs.",
    "certificateType": "UK Animal Health Certificate (AHC) or valid EU Pet Passport",
    "certificateDetail": "Must possess an Animal Health Certificate (AHC) issued by a UK Official Veterinarian within 10 days of travel, or an active EU Pet Passport.",
    "entryAirports": [
      "Dublin Airport (DUB)",
      "Cork Airport (ORK)",
      "Shannon Airport (SNN)",
      "Dublin Port (Irish Ferries / Stena Line)",
      "Rosslare Europort (Stena Line / Irish Ferries)"
    ],
    "restrictedBreeds": [
      "American Pit Bull Terrier",
      "English Bull Terrier",
      "Staffordshire Bull Terrier",
      "Bullmastiff",
      "Doberman Pinscher",
      "German Shepherd",
      "Rhodesian Ridgeback",
      "Rottweiler",
      "Japanese Akita",
      "Japanese Tosa (Must be securely muzzled and on a strong short leash ≤ 2m in all public spaces in Ireland under the Control of Dogs Act)"
    ],
    "airlinePolicies": [
      {
        "name": "Irish Ferries (Holyhead → Dublin / Pembroke → Rosslare)",
        "code": "IF",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "notes": "Offers dedicated pet-friendly passenger cabins and heated onboard kennels. Pets can also stay inside your vehicle on the vehicle deck.",
        "feeEstimate": "£15–£30 GBP per pet each way"
      },
      {
        "name": "Stena Line (Holyhead → Dublin / Fishguard → Rosslare)",
        "code": "SL",
        "inCabinAllowed": true,
        "cargoAllowed": true,
        "notes": "Dedicated pet lounges on select vessels (pets allowed on leash in pet lounge) or in private pet cabins and pre-booked kennels.",
        "feeEstimate": "£15–£25 GBP per pet each way"
      },
      {
        "name": "Aer Lingus",
        "code": "EI",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Aer Lingus Cargo handles companion animals as cargo on select routes; assistance dogs permitted in cabin.",
        "feeEstimate": "£150–£350 GBP"
      },
      {
        "name": "British Airways",
        "code": "BA",
        "inCabinAllowed": false,
        "cargoAllowed": true,
        "notes": "Live animal transport operated via IAG Cargo into Dublin.",
        "feeEstimate": "£200–£450 GBP",
        "airlineGuideSlug": "british-airways"
      }
    ],
    "transitAdvice": {
      "headline": "Irish Sea Ferry Crossings vs Commercial Air Travel",
      "layoverRules": "Northern Ireland Transit: Under the Windsor Framework and Common Travel Area arrangements, pets moving between Great Britain and Northern Ireland for non-commercial purposes travel seamlessly, but travel onwards across the border into the Republic of Ireland must satisfy EU/DAFM rules.",
      "directVsTransit": "Ferry travel (Holyhead to Dublin or Fishguard to Rosslare) is the most popular, stress-free route because pet owners can keep pets in pet-friendly cabins or dedicated lounges without cargo crating.",
      "landBorderOption": "Driving & Ferries: Drive onto Irish Ferries or Stena Line at Holyhead or Pembroke; clear DAFM check upon landing at Dublin Port or Rosslare.",
      "climateRestrictions": "Winter sea conditions: Irish Sea crossings operate year-round, though stormy weather may cause ferry delays."
    },
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Day -30 or Earlier",
        "title": "ISO Microchip & Rabies Vaccination",
        "description": "Confirm 15-digit microchip. Administer rabies vaccine (21-day latency period must elapse before entering Ireland)."
      },
      {
        "step": 2,
        "timing": "Within 10 Days of Departure",
        "title": "UK Official Veterinarian Issues AHC",
        "description": "UK Official Veterinarian conducts health exam and issues bilingual Animal Health Certificate (or updates active EU Pet Passport)."
      },
      {
        "step": 3,
        "timing": "24 to 120 Hours Before Landing in Ireland",
        "title": "Mandatory Tapeworm (Praziquantel) Treatment",
        "description": "Licensed vet administers Praziquantel and records exact date and hour on the AHC or EU Pet Passport."
      },
      {
        "step": 4,
        "timing": "At Least 24 Hours Before Travel",
        "title": "DAFM Advance Compliance Notice",
        "description": "Email the DAFM Border Control Post at your port of arrival (Dublin Airport, Cork, Rosslare, or Dublin Port) with pet details and travel time."
      },
      {
        "step": 5,
        "timing": "Arrival in Ireland",
        "title": "DAFM Port Clearance & Release",
        "description": "DAFM biosecurity officers scan microchip and verify tapeworm window timestamp for immediate release with 0 days quarantine."
      }
    ],
    "faqs": [
      {
        "q": "Taking a dog to Ireland from UK: What are the statutory requirements?",
        "a": "To take a dog from Great Britain to Ireland post-Brexit: (1) Ensure your dog has an ISO 11784/11785 microchip; (2) Administer a rabies vaccine at least 21 days before departure; (3) Obtain an Animal Health Certificate (AHC) from a UK Official Veterinarian within 10 days of travel (or use a valid EU Pet Passport); (4) Have a vet administer tapeworm (praziquantel) treatment 24 to 120 hours before arrival; and (5) Notify DAFM at least 24 hours in advance. Entry has 0 days quarantine."
      },
      {
        "q": "Is tapeworm treatment required for dogs traveling from the UK to Ireland?",
        "a": "Yes! Because the Republic of Ireland is officially free of Echinococcus multilocularis tapeworm, all dogs entering Ireland from Great Britain must be treated with an approved Praziquantel product by a licensed veterinarian between 24 and 120 hours (1 to 5 days) before scheduled arrival."
      },
      {
        "q": "Can I take my pet on the ferry from Holyhead to Dublin?",
        "a": "Yes! Both Irish Ferries and Stena Line operate pet-friendly ferry services between Holyhead and Dublin Port. You can book private pet-friendly cabins, dedicated pet lounges, or pre-reserved onboard kennels."
      },
      {
        "q": "Does an EU Pet Passport issued in Ireland or the EU work for UK-Ireland travel?",
        "a": "Yes. If your pet has a valid EU Pet Passport issued in the Republic of Ireland or another EU member state (with current rabies vaccination recorded by an EU vet), it remains fully valid for travel between the UK and Ireland without needing a UK AHC."
      },
      {
        "q": "How do I notify DAFM before arriving in Ireland with a pet?",
        "a": "You must send an advance notification email to the DAFM portal team at your intended point of entry (e.g. petmove@agriculture.gov.ie for Dublin Airport or the specific DAFM office for Dublin Port / Rosslare) at least 24 hours prior to arrival with pet and travel details."
      },
      {
        "q": "Are restricted dog breeds allowed in Ireland?",
        "a": "Ireland permits restricted breeds (such as German Shepherds, Rottweilers, Staffordshire Bull Terriers, and Dobermans), but by law they must be securely muzzled and controlled on a strong short leash (maximum 2 meters) by a person over 16 years old in all public places under the Control of Dogs Regulations."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "gb-ie-req-1",
        "category": "TAPEWORM_TREATMENT",
        "categoryLabel": "Echinococcus Multilocularis Protocol for Ireland",
        "title": "Mandatory 24–120h Praziquantel Treatment for Dogs",
        "applicableSpecies": "DOG",
        "severity": "BLOCKING",
        "rules": [
          "Administered by licensed veterinarian 24 to 120 hours before scheduled arrival in Ireland.",
          "Active ingredient must be Praziquantel or licensed equivalent.",
          "Must be recorded in UK Animal Health Certificate or EU Pet Passport with exact date and hour of administration."
        ],
        "protocol": "Strict Window: Administering less than 24 hours or more than 120 hours prior to arrival results in border quarantine or refusal.",
        "sourceName": "Irish Department of Agriculture, Food and the Marine (DAFM)",
        "sourceUrl": "https://www.gov.ie/en/publication/21d40-pet-travel/",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "gb-ie-req-2",
        "category": "HEALTH_CERTIFICATE",
        "categoryLabel": "UK Animal Health Certificate (AHC)",
        "title": "UK Animal Health Certificate within 10 Days",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Must possess an Animal Health Certificate (AHC) issued by an Official Veterinarian (OV) in the UK within 10 days of travel, OR a valid EU Pet Passport.",
          "AHC is valid for 4 months of onward travel throughout the EU and return to the UK."
        ],
        "protocol": "Border Verification: Inspected by DAFM compliance officers at Dublin, Cork, or Rosslare.",
        "sourceName": "DAFM Ireland & UK DEFRA",
        "sourceUrl": "https://www.gov.ie/en/publication/21d40-pet-travel/",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "gb-ie-req-3",
        "category": "ADVANCE_NOTIFICATION",
        "categoryLabel": "DAFM 24-Hour Notice",
        "title": "Mandatory 24-Hour DAFM Advance Notice",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Travelers must email the DAFM Border Control Post at their port of arrival at least 24 hours prior to travel.",
          "Includes pet transponder number, owner contact info, and flight/ferry booking details."
        ],
        "protocol": "Notification Logging: DAFM logs arrival and prepares on-site biosecurity inspector.",
        "sourceName": "DAFM Ireland",
        "sourceUrl": "https://www.gov.ie/en/publication/21d40-pet-travel/",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "gb-ie-req-4",
        "category": "RABIES_VACCINATION",
        "categoryLabel": "Rabies Immunization Protocol",
        "title": "Rabies Vaccination with 21-Day Latency",
        "applicableSpecies": "BOTH",
        "severity": "BLOCKING",
        "rules": [
          "Pet must be microchipped before rabies vaccine is administered.",
          "At least 21 days must elapse after primary rabies vaccination before travel."
        ],
        "protocol": "21-Day Rule: Primary vaccine becomes legally active on Day 22.",
        "sourceName": "DAFM Ireland & European Commission",
        "sourceUrl": "https://www.gov.ie/en/publication/21d40-pet-travel/",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "germany-to-usa": {
    "slug": "germany-to-usa",
    "from": "Germany",
    "to": "United States",
    "fromFlag": "🇩🇪",
    "toFlag": "🇺🇸",
    "originCode": "DE",
    "destCode": "US",
    "region": "European Union → North America",
    "authority": "US Centers for Disease Control and Prevention (CDC) & USDA APHIS",
    "legalBasis": "CDC Dog Import Regulations (42 CFR Part 71) & USDA APHIS Animal Welfare Act",
    "description": "Statutory non-commercial entry regulations for traveling with pets from Germany to the United States. Governs mandatory CDC Dog Import Form receipt, ISO microchip verification, valid EU Pet Passport or German official veterinary certificate, and rabies vaccination standards for low-risk rabies countries.",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "Germany is categorized as rabies-free/low-risk by the CDC. Rabies titer blood testing is NOT required for direct entry into the United States.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon customs declaration and CBP document inspection at US port of entry. No quarantine required.",
    "leadTime": "5 to 14 Days",
    "leadTimeDetail": "Submit free online CDC Dog Import Form within 2 to 10 days of travel; obtain airline fit-to-fly certificate within 10 days of departure.",
    "certificateType": "CDC Dog Import Form Receipt & EU Pet Passport / USDA-compatible Vet Certificate",
    "certificateDetail": "Free online CDC Dog Import Form submission receipt (QR code) + EU Pet Passport issued by German official vet with rabies vaccination records.",
    "entryAirports": [
      "New York JFK (JFK)",
      "Newark (EWR)",
      "Chicago O’Hare (ORD)",
      "Atlanta (ATL)",
      "Los Angeles (LAX)",
      "San Francisco (SFO)",
      "Washington Dulles (IAD)",
      "Miami (MIA)",
      "Dallas/Fort Worth (DFW)",
      "Boston (BOS)"
    ],
    "restrictedBreeds": [
      "No federal breed bans in the United States; individual airlines and local municipalities may have specific restrictions."
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "ISO 11784/11785 Microchip & Rabies Vaccine",
        "description": "Ensure pet has a 15-digit ISO microchip and up-to-date rabies vaccination recorded in EU Pet Passport."
      },
      {
        "step": 2,
        "timing": "2 to 10 Days Before Departure",
        "title": "Submit CDC Dog Import Form",
        "description": "Complete the free online CDC Dog Import Form to receive instant email confirmation receipt with barcode/QR code."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "Airline Veterinary Health Check",
        "description": "Obtain clinical health check and airline fit-to-fly endorsement from German veterinarian."
      },
      {
        "step": 4,
        "timing": "Arrival in the USA",
        "title": "CBP & Port of Entry Verification",
        "description": "Present CDC Dog Import Form receipt and EU Pet Passport to US Customs and Border Protection (CBP) officers."
      }
    ],
    "faqs": [
      {
        "q": "Can my dog enter the US from Germany with an EU Pet Passport?",
        "a": "Yes. An EU Pet Passport issued by an authorized German veterinarian documenting the ISO microchip and valid rabies vaccination satisfies USDA/CDC entry proof for dogs residing in low-risk rabies countries."
      },
      {
        "q": "Is the CDC Dog Import Form required for cats traveling from Germany?",
        "a": "No. The CDC Dog Import Form is mandatory for all dogs entering the United States. Cats do not require the CDC form, though USDA APHIS requires a general certificate of health showing freedom from communicable diseases."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "de-us-req-1",
        "category": "CDC_IMPORT_FORM",
        "categoryLabel": "CDC Dog Import Regulation Mandate",
        "title": "Mandatory CDC Dog Import Form Receipt",
        "severity": "BLOCKING",
        "rules": [
          "Must complete the free online CDC Dog Import Form on the official CDC website before boarding flight.",
          "Receipt barcode/QR code must be presented to airline during check-in and CBP upon arrival.",
          "Valid for 6 months for multiple entries from low-risk rabies countries."
        ],
        "protocol": "Carrier check-in screening and CBP port of entry inspection.",
        "sourceName": "US Centers for Disease Control and Prevention (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/dogs/enter-the-us.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "de-us-req-2",
        "category": "MICROCHIP_AND_VACCINE",
        "categoryLabel": "ISO Microchip & Rabies Mandate",
        "title": "ISO Microchip and Rabies Vaccination Verification",
        "severity": "BLOCKING",
        "rules": [
          "Dog must be implanted with an ISO 11784/11785 compliant microchip before rabies vaccination.",
          "Dog must be at least 6 months of age at time of entry into the United States.",
          "Rabies vaccination must be current and documented in EU Pet Passport or official veterinary certificate."
        ],
        "protocol": "Veterinary verification and CBP border inspection.",
        "sourceName": "USDA APHIS Pet Travel to the United States",
        "sourceUrl": "https://www.aphis.usda.gov/aphis/pet-travel/bring-pet-into-the-united-states",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  },
  "france-to-usa": {
    "slug": "france-to-usa",
    "from": "France",
    "to": "United States",
    "fromFlag": "🇫🇷",
    "toFlag": "🇺🇸",
    "originCode": "FR",
    "destCode": "US",
    "region": "European Union → North America",
    "authority": "US Centers for Disease Control and Prevention (CDC) & USDA APHIS",
    "legalBasis": "CDC Dog Import Regulations (42 CFR Part 71) & USDA APHIS 9 CFR Part 94",
    "description": "Statutory non-commercial entry regulations for traveling with pets from France to the United States. Governs mandatory CDC Dog Import Form receipt, ISO microchip verification, valid French EU Pet Passport or DGAL veterinary certificate, and age requirements (minimum 6 months for dogs).",
    "titerRequired": "Exempt / Not Required",
    "titerStatus": "exempt",
    "titerDetail": "France is categorized as rabies-free/low-risk by the CDC. No rabies titer blood test is required for direct travel into the United States.",
    "quarantineDays": "0 Days Quarantine",
    "quarantineDetail": "Direct release upon CBP customs declaration and microchip verification at US port of entry. No quarantine required.",
    "leadTime": "5 to 14 Days",
    "leadTimeDetail": "Online CDC Dog Import Form submission receipt (2–10 days before flight) + airline fit-to-fly health check within 10 days.",
    "certificateType": "CDC Dog Import Form Receipt & French EU Pet Passport",
    "certificateDetail": "Official CDC Dog Import Form receipt + French Passeport Européen pour Animaux de Compagnie with active rabies vaccination records.",
    "entryAirports": [
      "New York JFK (JFK)",
      "Newark (EWR)",
      "Chicago O’Hare (ORD)",
      "Los Angeles (LAX)",
      "San Francisco (SFO)",
      "Atlanta (ATL)",
      "Miami (MIA)",
      "Washington Dulles (IAD)",
      "Boston (BOS)",
      "Houston Intercontinental (IAH)"
    ],
    "restrictedBreeds": [
      "No federal breed bans in the United States; individual airlines and destination states/cities may have local bylaws."
    ],
    "timelineSteps": [
      {
        "step": 1,
        "timing": "Prior to Travel",
        "title": "ISO Microchip Implantation & Rabies Vaccine",
        "description": "Verify 15-digit ISO microchip and active rabies immunization recorded in French EU Pet Passport."
      },
      {
        "step": 2,
        "timing": "2 to 10 Days Before Departure",
        "title": "Submit CDC Dog Import Form",
        "description": "Complete the free online CDC Dog Import Form to generate official entry receipt."
      },
      {
        "step": 3,
        "timing": "Within 10 Days of Departure",
        "title": "French Vet Health Check",
        "description": "Licensed French vet conducts clinical examination and issues airline fit-to-fly certificate."
      },
      {
        "step": 4,
        "timing": "US Arrival Port",
        "title": "CBP Border Inspection",
        "description": "Present CDC Dog Import Form receipt and Passeport Européen to CBP officers."
      }
    ],
    "faqs": [
      {
        "q": "Is there a minimum age for dogs entering the United States from France?",
        "a": "Yes. Under current CDC regulations, all dogs entering the US from any country must be at least 6 months (24 weeks) of age at the time of entry."
      },
      {
        "q": "Do cats traveling from France to the US need rabies certificates?",
        "a": "While the CDC does not federally mandate rabies vaccination for cats, individual US states and airlines do. A valid rabies vaccination and veterinary health certificate are strongly advised."
      }
    ],
    "statutoryRequirements": [
      {
        "id": "fr-us-req-1",
        "category": "CDC_IMPORT_FORM",
        "categoryLabel": "CDC Dog Import Regulation Mandate",
        "title": "Mandatory CDC Dog Import Form Submission",
        "severity": "BLOCKING",
        "rules": [
          "Must complete the free online CDC Dog Import Form before arrival in the United States.",
          "Receipt must be presented to airline staff prior to boarding and to US CBP officers at port of entry.",
          "Dog must be at least 6 months of age on arrival date."
        ],
        "protocol": "Airline boarding document check and CBP port of entry inspection.",
        "sourceName": "US Centers for Disease Control and Prevention (CDC)",
        "sourceUrl": "https://www.cdc.gov/importation/dogs/enter-the-us.html",
        "lastVerifiedAt": "September 21, 2026"
      },
      {
        "id": "fr-us-req-2",
        "category": "MICROCHIP_AND_VACCINE",
        "categoryLabel": "ISO Microchip & Rabies Mandate",
        "title": "ISO Microchip and Rabies Vaccination Verification",
        "severity": "BLOCKING",
        "rules": [
          "Dog must have a 15-digit ISO 11784/11785 compliant microchip implanted before rabies vaccination.",
          "Rabies vaccination must be current and registered in French EU Pet Passport."
        ],
        "protocol": "Veterinary verification and border clearance.",
        "sourceName": "USDA APHIS Pet Travel to the United States",
        "sourceUrl": "https://www.aphis.usda.gov/aphis/pet-travel/bring-pet-into-the-united-states",
        "lastVerifiedAt": "September 21, 2026"
      }
    ]
  }
};
