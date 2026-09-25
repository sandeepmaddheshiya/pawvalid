export interface GuideSection {
  id: string;
  title: string;
  content: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: 'warning' | 'info' | 'statute';
    title: string;
    text: string;
  };
}

export interface RelatedGuideLink {
  slug: string;
  title: string;
  category: string;
  description: string;
}

export interface RelatedCountryLink {
  slug: string;
  name: string;
  flag: string;
  requirementSummary: string;
}

export interface RelatedToolLink {
  slug: string;
  title: string;
  description: string;
}

export interface OfficialSourceLink {
  name: string;
  url: string;
  authority: string;
  statuteRef?: string;
}

export interface RegulatoryGuide {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  readTime: string;
  category: 'Veterinary Testing' | 'Government Endorsement' | 'Aviation & Crates' | 'Regulatory Intelligence';
  dateModified: string;
  lastReviewedDate?: string;
  reviewerName?: string;
  reviewerTitle?: string;
  reviewerUrl?: string;
  statutoryBasis: string;
  officialSources?: OfficialSourceLink[];
  summary: string;
  sections: GuideSection[];
  steps: Array<{ step: number; title: string; description: string }>;
  faqs: Array<{ q: string; a: string }>;
  relatedGuides?: RelatedGuideLink[];
  relatedCountries?: RelatedCountryLink[];
  relatedTools?: RelatedToolLink[];
}

export const GUIDES: RegulatoryGuide[] = [
  {
    slug: 'rabies-titer-test-favn-guide',
    title: 'FAVN Rabies Titer Test Guide: Rules, Cost & Wait Times by Country (2026)',
    seoTitle: 'Rabies Titer Test (FAVN & RNATT) Guide: Rules, Cost & Wait Times (2026) | PawValid',
    description:
      'Complete statutory guide to the rabies titer test (FAVN and RNATT serological blood testing) for international dog and cat travel. Official rules for approved reference laboratories (KSU, Auburn, ANSES), the 0.50 IU/mL antibody threshold, 90-day EU vs 180-day Japan and Australia waiting periods, and veterinary health certificate endorsements.',
    readTime: '9 min read',
    category: 'Veterinary Testing',
    dateModified: '2026-09-21',
    lastReviewedDate: '2026-09-21',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Regulatory Reviewer',
    reviewerUrl: '/en/editorial-policy',
    statutoryBasis: 'WOAH / OIE Terrestrial Manual, EU Regulation 576/2013 Annex IV, Singapore Animals & Birds Act, Japan MAFF Rabies Prevention Act, Australian DAFF Biosecurity Act 2015',
    officialSources: [
      {
        name: 'World Organisation for Animal Health (WOAH) Terrestrial Code Chapter 8.14 (Rabies)',
        url: 'https://www.woah.org',
        authority: 'WOAH International Reference Standard',
      },
      {
        name: 'EUR-Lex: Regulation (EU) No 576/2013 Annex IV (Rabies Antibody Titration)',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32013R0576',
        authority: 'European Commission DG SANTE',
      },
      {
        name: 'Japan MAFF Animal Quarantine Service: Import Requirements for Dogs and Cats',
        url: 'https://www.maff.go.jp/aqs/english/animal/dog/index.html',
        authority: 'Ministry of Agriculture, Forestry and Fisheries (MAFF Japan)',
      },
      {
        name: 'Australian Government DAFF: Bringing Cats and Dogs to Australia (RNATT Protocols)',
        url: 'https://www.agriculture.gov.au/biosecurity-trade/cats-dogs',
        authority: 'Department of Agriculture, Fisheries and Forestry (DAFF Australia)',
      },
      {
        name: 'Singapore NParks AVS: Veterinary Conditions for the Importation of Dogs and Cats',
        url: 'https://www.nparks.gov.sg/avs',
        authority: 'Animal & Veterinary Service (AVS Singapore)',
      },
    ],
    summary:
      'A rabies titer test (specifically the FAVN or RNATT serological blood test) measures circulating neutralizing antibody levels in dogs and cats to verify protective immunity against the rabies virus. A rabies titer result of 0.50 IU/mL or greater is universally mandatory for pet travel into rabies-free and rabies-controlled jurisdictions (including Singapore, Japan, Australia, New Zealand, Hawaii, UAE, and unlisted third countries entering the European Union). The blood sample must be drawn at least 30 days after vaccination and processed exclusively at an officially approved reference laboratory.',
    sections: [
      {
        id: 'favn-vs-titer',
        title: '1. Rabies Titer Test vs. FAVN Test: Are They the Same Thing?',
        content: [
          'A "rabies titer test" is the broad medical umbrella term for any serological blood test that measures the concentration of neutralizing rabies antibodies in an animal’s bloodstream.',
          'The FAVN (Fluorescent Antibody Virus Neutralization) test is a specific, standardized laboratory assay method—developed by the CDC and Kansas State University—that is recognized by international veterinary health ministries worldwide. It is the primary assay required by the European Union under [Regulation (EU) No 576/2013](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32013R0576), [Singapore AVS](https://www.nparks.gov.sg/avs), [Japan MAFF](https://www.maff.go.jp/aqs/english/animal/dog/index.html), Hawaii (HDOA), and the United Arab Emirates (MOCCAE).',
          'RNATT (Rabies Neutralising Antibody Titre) is the official terminology mandated by the [Australian DAFF](https://www.agriculture.gov.au/biosecurity-trade/cats-dogs) and New Zealand Ministry for Primary Industries (MPI). While the terminology differs slightly, both FAVN and RNATT assays quantify the exact same antibody threshold: an absolute minimum of 0.50 International Units per milliliter (≥ 0.50 IU/mL) as standardized by the [World Organisation for Animal Health (WOAH)](https://www.woah.org).',
          'In summary: If a destination veterinary authority requests a "rabies titer test," "FAVN test," or "RNATT test," they are all referring to an approved serological blood test meeting the 0.50 IU/mL threshold performed at an accredited international reference laboratory.',
        ],
        callout: {
          type: 'statute',
          title: 'Key Distinction for Pet Owners',
          text: 'Standard in-clinic point-of-care rapid test kits cannot be used for travel compliance. Only serological neutralization titers performed by accredited reference laboratories (such as KSU, Auburn, or ANSES) and accompanied by an official signed laboratory certificate with microchip verification are legally accepted at international borders.',
        },
      },
      {
        id: 'what-is-favn',
        title: '2. Scientific Mechanism: Why Do Countries Require a Rabies Titer Test?',
        content: [
          'While standard rabies vaccination certificates prove that a vaccine was physically administered by a veterinarian, they do not prove that the animal’s immune system mounted an adequate protective immune response. Factors like vaccine storage temperature, immune compromise, or individual genetics can result in vaccine failure.',
          'Rabies-free jurisdictions (such as Australia, New Zealand, Japan, and the UK historically) and territories with strict biosecurity import frameworks (such as Singapore and the European Union) enforce the titer test to ensure zero introduction of the terrestrial rabies virus into their domestic wildlife and human populations.',
          'Under [World Organisation for Animal Health (WOAH)](https://www.woah.org) guidelines, a serum antibody titer of at least 0.50 International Units per milliliter (≥ 0.50 IU/mL) is considered the universal scientific gold standard denoting robust protective immunity.',
        ],
        callout: {
          type: 'statute',
          title: 'WOAH Standard Threshold',
          text: 'Any test result below 0.50 IU/mL is deemed an automatic laboratory failure. If your pet tests at 0.48 IU/mL, border customs will reject the animal or mandate quarantine. A booster vaccine followed by a 30-day redraw window is mandatory.',
        },
      },
      {
        id: 'country-comparison',
        title: '3. Country-by-Country Titer Mandates & Waiting Clocks',
        content: [
          'Different destination countries interpret the titer test with drastically different timeline clocks. The most critical mistake pet parents make is assuming that passing the test permits immediate flight.',
          'Most strict countries enforce a mandatory quarantine observation waiting period that begins on the date the blood was drawn, not the date the lab report was printed.',
          'For travelers exporting pets from the United States, obtaining federal endorsement via USDA APHIS VEHCS is also mandatory once titer results are received.',
        ],
        table: {
          headers: ['Destination Jurisdiction', 'Titer Status', 'Mandatory Post-Draw Waiting Period', 'Key Biosecurity Authority'],
          rows: [
            ['Singapore (Category C & D Origins e.g., USA, Canada, India)', 'Mandatory (≥ 0.5 IU/mL)', '30 Days to 6 Months prior to export (30-day CAPQ quarantine)', 'Singapore AVS / NParks'],
            ['European Union (from US/UK/Canada)', 'Exempt / Not Required', '0 Days (US is Annex II listed third country)', 'European Commission DG SANTE'],
            ['European Union (from Unlisted Countries e.g., Turkey, India, Egypt)', 'Mandatory (≥ 0.5 IU/mL)', '3 Months (90 Days) post-draw waiting period before EU entry', 'Regulation (EU) No 576/2013'],
            ['Japan', 'Mandatory (FAVN)', '180 Days post-draw latency (0-day quarantine if compliant)', 'Japan MAFF Animal Quarantine Service'],
            ['Australia', 'Mandatory (RNATT)', '180 Days post-draw for 10-day PEQ facility stay', 'Australian DAFF Biosecurity'],
            ['New Zealand', 'Mandatory (RNATT)', 'At least 3 months and not more than 24 months before flight', 'Ministry for Primary Industries (MPI)'],
            ['Hawaii (Direct Airport Release)', 'Mandatory (FAVN)', '30 Days post-draw arrival window', 'Hawaii Department of Agriculture (HDOA)'],
            ['United Arab Emirates (Dubai / Abu Dhabi)', 'Mandatory (RNATT)', 'At least 12 weeks before entry', 'MOCCAE UAE'],
          ],
        },
      },
      {
        id: 'approved-laboratories',
        title: '4. Approved International Reference Laboratories (KSU, Auburn, ANSES)',
        content: [
          'You cannot run a rabies titer test at your local veterinary clinic’s in-house laboratory. The blood sample must be centrifuged into serum and shipped to an officially accredited government reference laboratory.',
          'In the United States, the primary reference lab is the Kansas State University (KSU) Rabies Laboratory in Manhattan, Kansas, along with the Auburn University College of Veterinary Medicine and the CDC Rabies Laboratory.',
          'In Europe, recognized reference laboratories include ANSES (France), the Friedrich-Loeffler-Institut (Germany), and the Animal and Plant Health Agency (APHA Weybridge, UK).',
        ],
        callout: {
          type: 'warning',
          title: 'Direct Electronic Transmission',
          text: 'For Singapore, Australia, and Japan, the laboratory must submit the test result electronically directly to the destination government authorities (e.g. KSU submits directly to Singapore AVS, Australia DAFF, and Japan MAFF). Paper copies carried by owners are not accepted unless authenticated in the government database.',
        },
      },
      {
        id: 'common-rejection-causes',
        title: '5. Common Pitfalls That Lead to Airport Rejection',
        content: [
          '1. Microchip scanned AFTER blood draw: The animal’s 15-digit ISO microchip must be verified and recorded on the laboratory requisition form before the blood is drawn. If the microchip date on medical records is after the titer date, the test is legally invalid.',
          '2. Drawing blood too early after primary vaccine: Drawing blood within 14 days of an initial rabies shot frequently yields borderline or failing titers (< 0.5 IU/mL) because the B-cell immune response has not peaked. Always wait at least 21 to 30 days after vaccination before drawing blood.',
          '3. Mismatched pet identification details: Ensure the pet’s breed, sex, color, and age on the KSU/Auburn laboratory submission sheet match the final USDA/DEFRA/AVS health certificate letter-for-letter.',
          '4. Missing government endorsement: Having a passed titer report does not bypass the need for an official sovereign export health certificate (such as USDA VEHCS endorsement for US departures).',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Verify ISO 11784/11785 Microchip',
        description: 'Ensure your veterinarian scans the pet and documents the 15-digit microchip prior to rabies administration or blood collection.',
      },
      {
        step: 2,
        title: 'Administer Rabies Booster & Wait 30 Days',
        description: 'Provide an inactivated or recombinant rabies vaccine. Wait 21–30 days for maximum antibody titer expression.',
      },
      {
        step: 3,
        title: 'Venipuncture & Serum Separation',
        description: 'Veterinarian draws 2–3 mL of whole blood, centrifuges it to extract clear serum, and packs it with frozen ice packs.',
      },
      {
        step: 4,
        title: 'Dispatch to Approved Reference Laboratory',
        description: 'Sample is shipped via overnight courier to KSU, Auburn, or an EU-approved laboratory with proper requisition forms.',
      },
      {
        step: 5,
        title: 'Verify ≥ 0.50 IU/mL Result & Clock Activation',
        description: 'Upon receipt of passing certificate, record the Blood Draw Date. Begin your mandatory waiting period (e.g. 180 days for Japan/Australia, 30 days for Singapore).',
      },
    ],
    faqs: [
      {
        q: 'How long is a rabies titer test valid for international travel?',
        a: 'In the European Union, once an animal passes the titer test (≥ 0.5 IU/mL), the result remains valid for the life of the animal, provided rabies booster vaccinations are administered continuously without any lapse in coverage. For Singapore and Japan, the titer is valid for up to 6 months to 2 years from blood collection. For Australia, the test is valid for 12 months.',
      },
      {
        q: 'What is the cost of an international FAVN rabies titer test?',
        a: 'Veterinary fees for the blood draw and centrifuge typically range from $100 to $180, while laboratory processing fees at Kansas State or Auburn range from $115 to $165. Priority shipping and customs documentation bring the total average cost to $280–$450 USD.',
      },
      {
        q: 'What happens if my dog fails the titer test (< 0.5 IU/mL)?',
        a: 'If the titer is below 0.5 IU/mL, the animal must receive an additional rabies booster injection. You should wait 21–30 days after the booster before re-drawing blood for a new laboratory submission.',
      },
    ],
    relatedGuides: [
      {
        slug: 'usda-aphis-vehcs-guide',
        title: 'USDA APHIS VEHCS Endorsement Guide',
        category: 'Government Endorsement',
        description: 'How to obtain official sovereign export endorsement within the strict 10-day pre-flight window.',
      },
      {
        slug: 'iata-crate-requirements',
        title: 'IATA-Approved Dog Crate Guidelines',
        category: 'Aviation & Crates',
        description: 'Official sizing formulas, metal hardware requirements, and airline container standards.',
      },
      {
        slug: 'pet-travel-platform-vs-ai',
        title: 'Why General AI Hallucinates Pet Travel Rules',
        category: 'Regulatory Intelligence',
        description: 'Investigative report into why LLMs miscalculate rabies waiting periods and day-zero math.',
      },
    ],
    relatedCountries: [
      {
        slug: 'singapore',
        name: 'Singapore',
        flag: '🇸🇬',
        requirementSummary: 'Mandatory RNATT titer test (≥ 0.5 IU/mL) + 30-day CAPQ quarantine for Category C/D origins.',
      },
      {
        slug: 'japan',
        name: 'Japan',
        flag: '🇯🇵',
        requirementSummary: 'Mandatory FAVN titer test + strict 180-day waiting period for 0-day airport release.',
      },
      {
        slug: 'australia',
        name: 'Australia',
        flag: '🇦🇺',
        requirementSummary: 'Mandatory RNATT titer test + 180-day waiting clock for Mickleham PEQ facility clearance.',
      },
      {
        slug: 'united-arab-emirates',
        name: 'United Arab Emirates',
        flag: '🇦🇪',
        requirementSummary: 'Mandatory RNATT titer test + MOCCAE import permit for Dubai and Abu Dhabi entry.',
      },
      {
        slug: 'united-kingdom',
        name: 'United Kingdom',
        flag: '🇬🇧',
        requirementSummary: 'Mandatory RNATT titer (3-month wait) for unlisted third country entries into Great Britain.',
      },
    ],
    relatedTools: [
      {
        slug: 'favn-titer-calculator',
        title: 'FAVN Titer Waiting Period Calculator',
        description: 'Calculate your exact earliest flight date based on blood draw date and destination rules.',
      },
      {
        slug: 'rabies-waiting-period-calculator',
        title: 'Rabies Vaccine Latency Clock',
        description: 'Determine when the 21-day primary vaccination window is fully satisfied.',
      },
      {
        slug: 'quarantine-risk-checker',
        title: 'Quarantine Risk & Exemption Checker',
        description: 'Instantly check quarantine durations for 120+ countries and origin combinations.',
      },
    ],
  },
  {
    slug: 'usda-aphis-vehcs-guide',
    title: 'USDA APHIS VEHCS Endorsement: Step-by-Step 10-Day Pre-Flight Guide (2026)',
    seoTitle: 'USDA APHIS VEHCS Guide (2026): Endorsement Process, Fees & 10-Day Window | PawValid',
    description:
      'Complete statutory manual for obtaining USDA APHIS veterinary health certificate endorsement via the Veterinary Export Health Certification System (VEHCS). Understand the 10-day pre-flight window, accredited veterinarian requirements, and digital vs ink-seal validation.',
    readTime: '8 min read',
    category: 'Government Endorsement',
    dateModified: '2026-09-21',
    lastReviewedDate: '2026-09-21',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Regulatory Reviewer',
    reviewerUrl: '/en/editorial-policy',
    statutoryBasis: 'USDA Animal and Plant Health Inspection Service (APHIS), 9 CFR Part 91, European Commission Implementing Regulation (EU) 2026/131, Singapore AVS Import Requirements',
    officialSources: [
      {
        name: 'USDA APHIS Pet Travel Official Endorsement Portal (VEHCS)',
        url: 'https://www.aphis.usda.gov/pet-travel',
        authority: 'United States Department of Agriculture (USDA APHIS)',
      },
      {
        name: 'eCFR: Title 9 CFR Part 91 (Inspection and Handling of Livestock for Exportation)',
        url: 'https://www.ecfr.gov/current/title-9/chapter-I/subchapter-D/part-91',
        authority: 'US Code of Federal Regulations',
      },
      {
        name: 'eCFR: Title 9 CFR Part 130 (User Fees for Export Health Certificates)',
        url: 'https://www.ecfr.gov/current/title-9/chapter-I/subchapter-G/part-130',
        authority: 'US Code of Federal Regulations',
      },
      {
        name: 'European Commission DG SANTE Implementing Regulation (EU) 2026/131',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32013R0576',
        authority: 'European Union Animal Health Law',
      },
    ],
    summary:
      'The USDA Animal and Plant Health Inspection Service (APHIS) Veterinary Export Health Certification System (VEHCS) is the mandatory federal portal through which international pet travel health certificates issued in the United States are reviewed and legally endorsed. For travel to the European Union, Great Britain, Singapore, Japan, Australia, and most global destinations, a USDA-accredited veterinarian must physically examine your pet and submit the certificate within a strict 10-day window before scheduled arrival. Official federal endorsement validates that the animal meets all receiving nation biosecurity statutes.',
    sections: [
      {
        id: 'what-is-vehcs',
        title: '1. What is VEHCS?',
        content: [
          'VEHCS (Veterinary Export Health Certification System) is the official online federal portal operated by the [USDA Animal and Plant Health Inspection Service (APHIS)](https://www.aphis.usda.gov/pet-travel) through which USDA-accredited veterinarians electronically create, sign, and submit international pet health certificates for sovereign government endorsement.',
          'Under international bilateral agreements and [9 CFR Part 91](https://www.ecfr.gov/current/title-9/chapter-I/subchapter-D/part-91), destination foreign governments (including the European Union, United Kingdom, Singapore, Japan, and Australia) do not accept health certificates signed merely by a private, licensed veterinarian. They require sovereign government-to-government certification from the USDA APHIS Veterinary Services division—the competent veterinary authority of the United States.',
          'Without an official USDA endorsement stamp (either an electronic cryptographic seal or a physical raised embossed ink seal, depending on the receiving country), airline check-in agents will refuse boarding, and destination customs authorities will ground the pet at the border inspection post or mandate immediate repatriation at the owner’s expense.',
        ],
        callout: {
          type: 'statute',
          title: 'USDA Accredited Veterinarian (Category II)',
          text: 'Not all licensed veterinarians can issue an international travel certificate. The veterinarian must hold active USDA Category II Accreditation with up-to-date National Veterinary Accreditation Program (NVAP) modules.',
        },
      },
      {
        id: 'the-10-day-window',
        title: '2. Understanding the Strict 10-Day Endorsement Window',
        content: [
          'For the European Union (Annex IV certificate) and Great Britain (Animal Health Certificate for non-EU travel), statutory regulations dictate that the physical clinical examination by the veterinarian must occur within 10 days of your pet’s scheduled entry through the destination border inspection post.',
          'For Singapore, Japan, and Australia, specific pre-departure clinical inspection windows (ranging from 48 hours to 7–10 days) apply.',
          'This timeline creates an intense logistical crunch in international pet travel:',
          'Day 10 before arrival: Accredited vet conducts clinical exam, verifies microchip, checks vaccine and titer validity, and uploads digital paperwork to USDA VEHCS.',
          'Days 9 to 6: USDA veterinary medical officers review the submission, verify rabies lot numbers, and digitally sign or print/emboss the certificate.',
          'Days 5 to 2: Physical document returns via overnight priority courier (if the destination country requires physical ink endorsement) or is downloaded with digital USDA cryptographic seal.',
        ],
        table: {
          headers: ['Destination Country', 'Endorsement Format', 'USDA Turnaround Average', 'Physical Return Required?'],
          rows: [
            ['European Union (Germany, France, Spain, Italy, etc.)', 'Digital VEHCS PDF with cryptographic watermark', '24 – 48 Hours', 'No (Digital printout accepted at EU borders)'],
            ['United Kingdom (England, Scotland, Wales)', 'Digital VEHCS with official QR validation', '24 – 48 Hours', 'No (Digital printout accepted at HARC / Gatwick)'],
            ['Singapore (AVS / NParks)', 'Digital or physical endorsed AVS certificate', '24 – 48 Hours', 'No (Printout accepted with GoBusiness Licence)'],
            ['Japan (MAFF AQS)', 'Physical embossed ink raised seal', '3 – 5 Business Days', 'Yes (Must ship via FedEx overnight with return envelope)'],
            ['Australia (DAFF)', 'Physical embossed ink seal + electronic pre-clearance', '3 – 5 Business Days', 'Yes (Must be physically attached to crate exterior)'],
            ['Canada (CFIA)', 'Standard rabies certificate (USDA endorsement exempt for personal dogs)', 'Instant', 'No USDA endorsement required for tourist dogs (see Canada pet travel requirements)'],
          ],
        },
      },
      {
        id: 'fee-schedule',
        title: '3. Official USDA APHIS Endorsement User Fees (2026)',
        content: [
          'The USDA charges non-refundable federal user fees for processing each export certificate. These fees are set by federal regulation under 9 CFR Part 130 and are separate from your private veterinarian’s examination charges.',
          '1. Non-commercial certificate with NO diagnostic test verification required (e.g. EU Annex IV from US with no titer): $38.00 USD for the first animal + $7.00 per additional animal.',
          '2. Certificate requiring diagnostic test verification (e.g. destinations mandating [rabies titer test requirements](/en/guides/rabies-titer-test-favn-guide) like Singapore, Japan, Australia, or South Africa): $121.00 USD for the first animal + $12.00 per additional animal.',
        ],
      },
      {
        id: 'rejection-reasons',
        title: '4. The Top 5 USDA Rejection Errors',
        content: [
          '1. Microchip implantation date is blank or listed after rabies vaccination date.',
          '2. Rabies vaccine manufacturer or lot number has typos or does not match veterinary records.',
          '3. The veterinarian used white-out or manual cross-outs on physical forms (automatic rejection).',
          '4. Owner address in destination country is incomplete (missing postal code or hotel address).',
          '5. Primary rabies vaccine was given less than 21 days before departure.',
          '6. Missing rabies titer (FAVN) laboratory documentation for destinations requiring blood tests.',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Verify USDA Accreditation of Your Vet',
        description: 'Confirm your veterinary clinic has a Category II accredited veterinarian with active VEHCS account credentials.',
      },
      {
        step: 2,
        title: 'Calculate Exact 10-Day Countdown',
        description: 'Schedule your pre-flight clinical examination appointment exactly 9 to 10 days before your scheduled overseas arrival date.',
      },
      {
        step: 3,
        title: 'Physical Clinical Exam & VEHCS Submission',
        description: 'Veterinarian inspects pet, scans microchip, verifies rabies vaccine batch numbers, and submits PDF directly into the federal VEHCS portal.',
      },
      {
        step: 4,
        title: 'USDA Officer Review & Federal Fee Payment',
        description: 'USDA veterinary officer reviews statutory compliance. Pay the $38 or $121 federal user fee online.',
      },
      {
        step: 5,
        title: 'Download Authenticated Certificate or Receive Courier',
        description: 'Download the cryptographically endorsed PDF for EU/UK flights, or receive the physical raised-seal document via overnight courier for Japan/Australia.',
      },
    ],
    faqs: [
      {
        q: 'What is USDA APHIS VEHCS?',
        a: 'USDA APHIS VEHCS (Veterinary Export Health Certification System) is the official federal online portal operated by the United States Department of Agriculture Animal and Plant Health Inspection Service. VEHCS enables accredited veterinarians to electronically issue, sign, and submit international pet health certificates for USDA endorsement, validating entry requirements for overseas destinations.',
      },
      {
        q: 'What is VEHCS (Veterinary Export Health Certification System)?',
        a: 'VEHCS (Veterinary Export Health Certification System) is the official online federal system used by Category II USDA-accredited veterinarians and federal veterinary medical officers to issue and validate international veterinary health certificates for international travel.',
      },
      {
        q: 'How does VEHCS APHIS work for pet health certificate endorsement?',
        a: 'In the VEHCS APHIS workflow: (1) A USDA-accredited private veterinarian examines your pet within the destination country’s clinical window (typically 10 days before entry); (2) The vet uploads vaccination, microchip, and diagnostic test records into the VEHCS portal; (3) USDA veterinary officers review statutory compliance; and (4) USDA either applies a cryptographic digital signature and QR code for countries accepting electronic certificates, or prints and stamps a physical raised embossed seal for destinations requiring ink documents.',
      },
      {
        q: 'What is a USDA endorsement and why is it mandatory for pet travel?',
        a: 'A USDA endorsement is official sovereign validation from the United States federal government certifying that your pet’s health certificate is genuine and fully compliant with receiving nation biosecurity statutes. Foreign customs and quarantine officials (such as EU Border Inspection Posts, UK DEFRA, or Japan MAFF) do not accept health certificates signed only by private veterinarians—sovereign government-to-government USDA endorsement is legally mandatory.',
      },
      {
        q: 'Where is my local USDA endorsement office and can I visit in person?',
        a: 'USDA APHIS Endorsement Service Centers (ESC) have transitioned to 100% digital processing via VEHCS. Regional USDA endorsement offices no longer accept walk-in appointments or in-person visits for companion pet health certificates. Your accredited veterinarian submits the certificate online through VEHCS. If the destination country (e.g., Japan, Australia) requires a physical raised embossed seal, your regional USDA endorsement office processes the certificate remotely and returns it via pre-paid overnight courier (FedEx/UPS).',
      },
      {
        q: 'How long does USDA take to endorse a pet health certificate via VEHCS?',
        a: 'For destination countries accepting digital certificates (such as the European Union and Great Britain), electronic endorsement through VEHCS is typically completed within 24 to 48 business hours. For countries requiring physical paper certificates with an embossed raised ink seal (such as Australia or Japan), allow 3 to 5 business days plus overnight courier delivery time.',
      },
      {
        q: 'How do I contact a USDA APHIS Endorsement Service Center for emergency pet travel?',
        a: 'If your flight departure is within 48 to 72 hours and your certificate remains pending in the federal queue, you can contact the USDA APHIS Customer Service Call Center or email your assigned regional Endorsement Service Center (ESC) with your VEHCS Certificate Tracking Number and airline ticket marked "EMERGENCY TRAVEL" in the subject line for expedited triage.',
      },
      {
        q: 'What happens if my flight is delayed past the 10-day USDA endorsement window?',
        a: 'If an airline delay or travel postponement causes your pet to land in the destination country past the statutory 10-day validity window of the initial veterinary examination, the certificate becomes legally invalid. You must have a USDA-accredited veterinarian conduct a new clinical examination and submit a fresh certificate to USDA VEHCS.',
      },
    ],
    relatedGuides: [
      {
        slug: 'rabies-titer-test-favn-guide',
        title: 'FAVN Rabies Titer Test Manual',
        category: 'Veterinary Testing',
        description: 'Comprehensive guide to RNATT titers, 0.5 IU/mL thresholds, and mandatory waiting clocks.',
      },
      {
        slug: 'iata-crate-requirements',
        title: 'IATA-Approved Dog Crate Guidelines',
        category: 'Aviation & Crates',
        description: 'Airline container requirements, sizing formulas, and mandatory metal hardware.',
      },
      {
        slug: 'pet-travel-platform-vs-ai',
        title: 'Why General AI Hallucinates Pet Travel Rules',
        category: 'Regulatory Intelligence',
        description: 'How deterministic compliance checking prevents costly border groundings.',
      },
    ],
    relatedCountries: [
      {
        slug: 'germany',
        name: 'Germany',
        flag: '🇩🇪',
        requirementSummary: 'EU Annex IV endorsement via VEHCS + 21-day rabies latency verification.',
      },
      {
        slug: 'united-kingdom',
        name: 'United Kingdom',
        flag: '🇬🇧',
        requirementSummary: 'Great Britain health certificate via VEHCS + 24–120h tapeworm treatment.',
      },
      {
        slug: 'canada',
        name: 'Canada',
        flag: '🇨🇦',
        requirementSummary: 'CFIA rabies vaccination certificate (USDA endorsement exempt for companion dogs/cats).',
      },
      {
        slug: 'singapore',
        name: 'Singapore',
        flag: '🇸🇬',
        requirementSummary: 'AVS health certificate endorsement via VEHCS + CAPQ quarantine reservation.',
      },
      {
        slug: 'japan',
        name: 'Japan',
        flag: '🇯🇵',
        requirementSummary: 'MAFF Form AC physical embossed ink seal endorsement via USDA APHIS.',
      },
      {
        slug: 'australia',
        name: 'Australia',
        flag: '🇦🇺',
        requirementSummary: 'DAFF Model Certificate physical embossed endorsement + BICON permit verification.',
      },
      {
        slug: 'france',
        name: 'France',
        flag: '🇫🇷',
        requirementSummary: 'EU Annex IV endorsement via VEHCS + Category 1 breed restrictions.',
      },
    ],
    relatedTools: [
      {
        slug: 'rabies-waiting-period-calculator',
        title: 'Rabies Waiting Period Calculator',
        description: 'Calculate exact 21-day latency and expiration timelines for EU/UK endorsement.',
      },
      {
        slug: 'favn-titer-calculator',
        title: 'FAVN Titer Calculator',
        description: 'Track laboratory turnaround times and post-draw departure windows.',
      },
      {
        slug: 'quarantine-risk-checker',
        title: 'Quarantine Risk Checker',
        description: 'Verify if your route qualifies for immediate border release.',
      },
    ],
  },
  {
    slug: 'iata-crate-requirements',
    title: 'IATA-Approved Dog Crate Requirements: The 2026 Sizing, Hardware & Flight Manual',
    seoTitle: 'IATA Dog Crate Guidelines (2026): Dimensions Formula, CR-1 Rules & Bolts | PawValid',
    description:
      'Definitive engineering guide to airline-approved pet travel crates under IATA Live Animals Regulations (LAR) Container Requirement 1 (CR-1). Sizing formulas, metal hardware rules, ventilation percentages, and snub-nosed CR-82 guidelines.',
    readTime: '10 min read',
    category: 'Aviation & Crates',
    dateModified: '2026-09-21',
    lastReviewedDate: '2026-09-21',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity & Compliance Consultant',
    reviewerUrl: '/en/editorial-policy',
    statutoryBasis: 'IATA Live Animals Regulations (LAR) 51st Edition, Container Requirement 1 (CR-1) & Container Requirement 82 (CR-82)',
    summary:
      'The International Air Transport Association (IATA) Live Animals Regulations (LAR) govern the construction, dimensions, ventilation, and hardware of all animal shipping containers traveling on commercial aircraft worldwide. Under Container Requirement 1 (CR-1), a pet crate must permit the animal to stand fully erect with head up without touching the ceiling, turn around 360 degrees effortlessly, and lie down in a natural splayed position. Failure to meet the mathematical IATA crate formula is the leading cause of gate check-in rejections across all international airlines.',
    officialSources: [
      {
        name: 'IATA Live Animals Regulations (LAR)',
        url: 'https://www.iata.org/en/programs/cargo/live-animals/',
        authority: 'International Air Transport Association (IATA)',
        statuteRef: 'Container Requirement 1 (CR-1) & CR-82 Standards',
      },
      {
        name: 'USDA APHIS Animal Welfare Act',
        url: 'https://www.aphis.usda.gov/pet-travel',
        authority: 'USDA Animal and Plant Health Inspection Service',
        statuteRef: '9 CFR Part 3 - Standards for Humane Handling and Transportation of Animals',
      },
      {
        name: 'UK DEFRA / APHA Live Animal Transport Guidance',
        url: 'https://www.gov.uk/bring-pet-to-great-britain',
        authority: 'Department for Environment, Food & Rural Affairs (DEFRA / APHA)',
        statuteRef: 'Welfare of Animals (Transport) (England) Order 2006',
      },
      {
        name: 'WOAH World Organisation for Animal Health',
        url: 'https://www.woah.org',
        authority: 'World Organisation for Animal Health (WOAH)',
        statuteRef: 'Terrestrial Animal Health Code: Animal Welfare During Air Transport',
      },
    ],
    sections: [
      {
        id: 'iata-sizing-formula',
        title: '1. The IATA Mathematical Sizing Formula',
        content: [
          'Airlines do not guess crate sizes by breed name or body weight alone. Gate and cargo agents measure your dog or cat using four anatomical landmarks and compare them against the official IATA dimensional formulas:',
          'Measurement A: Length of pet from tip of nose to base of tail (do not include the tail).',
          'Measurement B: Height from ground to elbow joint of the foreleg.',
          'Measurement C: Width across the widest point of the pet’s shoulders or hips.',
          'Measurement D: Height from ground to highest point of the animal in natural standing stance (top of head or tips of ears if erect).',
        ],
        table: {
          headers: ['Crate Dimension', 'IATA Mathematical Formula', 'Practical Explanation'],
          rows: [
            ['Minimum Length', 'A + (0.5 × B)', 'Length of dog plus half the distance from floor to elbow joint.'],
            ['Minimum Width', 'C × 2', 'Twice the shoulder width of the animal.'],
            ['Minimum Height', 'D + 5 cm to 7 cm (2 to 3 in)', 'Ground to ear tips plus minimum 2 to 3 inches of clear headroom.'],
          ],
        },
        callout: {
          type: 'warning',
          title: 'The Ear Touch Rule',
          text: 'If your dog has erect ears (such as a German Shepherd, French Bulldog, or Corgi) and the tips of the ears brush against the crate ceiling when the dog stands naturally, airline cargo agents are mandated by IATA LAR to deny boarding. Always add at least 3 inches of clearance above the ear tips.',
        },
      },
      {
        id: 'hardware-and-fasteners',
        title: '2. Mandatory Hardware: Why Plastic Clips Are Banned',
        content: [
          'Many commercial crates sold in pet retail stores (e.g. standard Petmate plastic snap-lock crates) use plastic cam-latches or plastic twist-dials to hold the top and bottom halves together.',
          'Under current IATA LAR specifications, crates with plastic latches or plastic wing-nuts are strictly prohibited on international flights.',
          'The upper and lower sections of the crate must be fastened together securely using solid metal nuts and metal bolts with a through-hole design. Nylon lock nuts or metal wing-nuts over steel bolts are mandatory.',
        ],
      },
      {
        id: 'ventilation-and-bowls',
        title: '3. Ventilation & Water Bowl Standards',
        content: [
          '1. Four-Sided Ventilation: For international travel, the container must provide ventilation on all four sides. At least 16% of the total surface area of all four walls must consist of open ventilation grilles.',
          '2. Metal Grilles: Ventilation openings must be covered with heavy-duty metal mesh or welded wire grilles that prevent the animal from protruding its snout or paws.',
          '3. Two-Point Attachable Water Dishes: Two separate bowls (or one divided dual bowl) for water and food must be fastened securely to the inside of the wire door. They must be fillable from the outside without opening the crate door (funnel attached to the door).',
        ],
      },
      {
        id: 'cr82-aggressive-breeds',
        title: '4. Special Container Requirement 82 (CR-82) for Restricted Breeds',
        content: [
          'Breeds categorized as powerful or dangerous (including American Pit Bull Terriers, Staffordshire Bull Terriers, Rottweilers, and Dobermans on certain airlines) cannot travel in standard plastic CR-1 kennels.',
          'They mandate IATA Container Requirement 82 (CR-82): containers constructed entirely of welded steel mesh, hardwood, or reinforced aluminum with heavy-duty sliding bolt locks that cannot be compromised by biting or clawing.',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Measure Your Pet Standing Against a Wall',
        description: 'Take measurements A (nose to tail base), B (floor to elbow), C (shoulder width), and D (floor to erect ear tips).',
      },
      {
        step: 2,
        title: 'Calculate Dimensions with Formula',
        description: 'Length = A + 0.5B; Width = C × 2; Height = D + 7 cm.',
      },
      {
        step: 3,
        title: 'Replace Plastic Latches with Metal Bolts',
        description: 'Remove any plastic fasteners and install heavy-duty metal through-bolts with nylon lock nuts.',
      },
      {
        step: 4,
        title: 'Affix Exterior Fillable Water Bowls & Funnel',
        description: 'Mount metal or heavy plastic bowls to the door mesh with an accessible exterior refill port.',
      },
      {
        step: 5,
        title: 'Attach Official IATA "Live Animals" Green Labels',
        description: 'Apply green IATA "Live Animal" stickers and "This Way Up" orientation arrows on all four sides.',
      },
    ],
    faqs: [
      {
        q: 'Can my dog have a blanket or bed inside the crate during the flight?',
        a: 'Yes, airlines permit an absorbent puppy pad or a thin fleece blanket (no thicker than 3 inches). Thick memory foam beds, bean bags, or heavy duvets are prohibited because they reduce headroom clearance and pose suffocation risks.',
      },
      {
        q: 'Can wheels remain on the pet crate during the flight?',
        a: 'No. Any wheels must be completely removed before check-in, or if retractable, taped securely in the stowed position with heavy-duty duct tape so the crate cannot roll inside the cargo hold.',
      },
      {
        q: 'How do airport baggage handlers provide water to my dog?',
        a: 'Airlines require water bowls to be attached to the inside of the wire door with an exterior funnel attached through the mesh. Ground handlers can pour fresh water into the funnel from outside without opening the crate door.',
      },
    ],
    relatedGuides: [
      {
        slug: 'usda-aphis-vehcs-guide',
        title: 'USDA APHIS VEHCS Endorsement Guide',
        category: 'Government Endorsement',
        description: 'How to prepare and endorse international health certificates for airline check-in.',
      },
      {
        slug: 'rabies-titer-test-favn-guide',
        title: 'FAVN Rabies Titer Test Manual',
        category: 'Veterinary Testing',
        description: 'Mandatory antibody testing protocols and waiting periods for long-haul routes.',
      },
      {
        slug: 'pet-travel-platform-vs-ai',
        title: 'Why General AI Hallucinates Pet Travel Rules',
        category: 'Regulatory Intelligence',
        description: 'Why relying on AI for crate dimensions and airline policies leads to denied boarding.',
      },
    ],
    relatedCountries: [
      {
        slug: 'united-kingdom',
        name: 'United Kingdom',
        flag: '🇬🇧',
        requirementSummary: 'Manifest cargo (AWB) arrival mandatory under DEFRA live animal transport laws.',
      },
      {
        slug: 'australia',
        name: 'Australia',
        flag: '🇦🇺',
        requirementSummary: 'Strict IATA CR-1/CR-82 compliance mandatory for transfer to Mickleham PEQ facility.',
      },
      {
        slug: 'united-states',
        name: 'United States',
        flag: '🇺🇸',
        requirementSummary: 'CDC & USDA cargo/checked pet standards for transatlantic and transpacific flights.',
      },
      {
        slug: 'singapore',
        name: 'Singapore',
        flag: '🇸🇬',
        requirementSummary: 'Manifest cargo arrival and transfer protocols to CAPQ Changi Quarantine Station.',
      },
    ],
    relatedTools: [
      {
        slug: 'quarantine-risk-checker',
        title: 'Quarantine Risk & Border Checker',
        description: 'Verify receiving port facilities and live animal reception procedures.',
      },
    ],
  },
  {
    slug: 'pet-travel-platform-vs-ai',
    title: 'Why General AI (ChatGPT/Gemini) Hallucinates Pet Travel Rules (and How Deterministic Verification Protects Your Pet)',
    seoTitle: 'Why Not to Use AI for Pet Travel Documents (2026 Analysis) | PawValid',
    description:
      'Comprehensive investigative report into why large language models (LLMs) hallucinate international pet quarantine laws, miscalculate rabies timeline days, and recommend banned airlines—and how PawValid uses deterministic statutory checking.',
    readTime: '7 min read',
    category: 'Regulatory Intelligence',
    dateModified: '2026-09-21',
    lastReviewedDate: '2026-09-21',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity & Compliance Consultant',
    reviewerUrl: '/en/editorial-policy',
    statutoryBasis: 'Comparative Biosecurity Audit: LLM Generative Probabilities vs European Commission Regulation 576/2013 & DEFRA Microchip Statutes',
    summary:
      'While general artificial intelligence models like ChatGPT, Claude, and Gemini excel at conversational writing, they operate on probabilistic token prediction rather than deterministic statutory calculation. In international pet travel compliance, where missing a 21-day latency rule by 4 hours results in 4-month quarantine, general AI routinely hallucinates outdated COVID-era border waivers, confuses destination-versus-transit biosecurity protocols, and fails basic Day-Zero vaccine calendar math.',
    officialSources: [
      {
        name: 'European Commission DG SANTE',
        url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32013R0576',
        authority: 'European Commission Directorate-General for Health and Food Safety',
        statuteRef: 'Regulation (EU) No 576/2013 on the non-commercial movement of pet animals',
      },
      {
        name: 'USDA APHIS Pet Travel Regulations',
        url: 'https://www.aphis.usda.gov/pet-travel',
        authority: 'USDA Animal and Plant Health Inspection Service',
        statuteRef: 'USDA APHIS Veterinary Export Health Certification System (VEHCS)',
      },
      {
        name: 'UK Department for Environment, Food & Rural Affairs (DEFRA)',
        url: 'https://www.gov.uk/bring-pet-to-great-britain',
        authority: 'Department for Environment, Food & Rural Affairs (DEFRA)',
        statuteRef: 'Non-Commercial Movement of Pet Animals Order (Northern Ireland & GB)',
      },
      {
        name: 'WOAH World Organisation for Animal Health',
        url: 'https://www.woah.org',
        authority: 'World Organisation for Animal Health (WOAH)',
        statuteRef: 'WOAH Terrestrial Manual Chapter on Rabies Surveillance & Titer Standards',
      },
    ],
    sections: [
      {
        id: 'probabilistic-vs-deterministic',
        title: '1. Probabilistic Guessing vs. Deterministic Verification',
        content: [
          'Large Language Models (LLMs) generate answers by predicting the statistically most likely next word in a sequence based on vast internet scraping. They do not maintain an active mathematical calendar or a legal verification engine.',
          'In contrast, PawValid utilizes a deterministic compliance engine: a rule-based algorithmic parser that evaluates your specific pet’s microchip timestamp, vaccine administration dates, and destination country statutes against immutable legal criteria.',
        ],
        table: {
          headers: ['Compliance Scenario', 'General AI (ChatGPT / Gemini)', 'PawValid Deterministic Engine'],
          rows: [
            ['Rabies Day-Zero Math', 'Frequently counts vaccine day as Day 1, arriving 24 hours early (customs grounds the pet).', 'Enforces strict ISO Day-Zero rule: 21 full 24-hour periods must elapse before travel date.'],
            ['UK In-Cabin Rules', 'Tells travelers to book in-cabin pets on British Airways or Virgin Atlantic.', 'Instantly flags that Great Britain statutory DEFRA law bans in-cabin pets; mandates IAG Cargo booking.'],
            ['Titer Exemption Lists', 'Confuses European Union Annex II rabies-controlled third countries with unlisted countries.', 'Maintains verified ISO 3166 database: US to Germany is exempt; Turkey to Germany mandates 3-month wait.'],
            ['CDC August 2024 / 2026 Dog Rule', 'Hallucinates expired 2021 rabies suspension rules.', 'Applies active CDC Dog Import Form requirements and 6-month microchip rules.'],
          ],
        },
      },
      {
        id: 'real-world-failure-cases',
        title: '2. Real-World Case Studies: How AI Hallucinations Harm Pet Owners',
        content: [
          'Case 1: The London Heathrow In-Cabin Disaster. A traveler asked ChatGPT how to fly a French Bulldog from New York to London. ChatGPT generated a checklist recommending in-cabin travel. The owner arrived at JFK airport, where British Airways denied boarding because UK law requires all companion dogs to enter via manifest cargo through the Heathrow Animal Reception Centre.',
          'Case 2: The Japan 180-Day Titer Trap. Another pet parent asked an AI assistant if their dog could travel to Tokyo after a passed titer test. The AI stated: "Once the titer passes, you are ready to fly!" In reality, Japan MAFF enforces a mandatory 180-day waiting period from the date of blood collection. The dog arrived 4 months too early and was impounded in Yokohama quarantine at a cost of ¥300,000.',
        ],
      },
      {
        id: 'why-pawvalid-is-different',
        title: '3. The PawValid Difference: Source-Backed Proof',
        content: [
          'PawValid eliminates the risk of hallucination by coupling computer vision OCR with authoritative statutory rules:',
          '1. Direct Government Legal Citations: Every single checklist item links directly to official government agriculture ministries (DEFRA, USDA APHIS, BMEL, DAFF, MAFF, Singapore AVS).',
          '2. Optical Character Recognition (OCR): We extract the exact vaccine lot numbers and microchip timestamps directly from your veterinary certificates.',
          '3. Verifiable QR Passports: Customs border officers and veterinarians can scan your pet’s digital pass to inspect the immutable audit trail.',
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: 'Never Rely on Unverified Chatbots for Flight Bookings',
        description: 'Do not base ticket purchases or international veterinary appointments on conversational token output.',
      },
      {
        step: 2,
        title: 'Cross-Check Official Competent Authorities',
        description: 'Verify your pet against direct government border control portals or specialized compliance engines like PawValid.',
      },
      {
        step: 3,
        title: 'Upload Real Records for Algorithmic Verification',
        description: 'Scan your actual vaccination booklet to detect microchip-date inconsistencies and latency conflicts before departure.',
      },
    ],
    faqs: [
      {
        q: 'Can ChatGPT check my pet passport?',
        a: 'While multimodal AI models can visually read text on a pet passport, they do not possess verified access to the live European Commission TRACES database or USDA APHIS regulations, and frequently fail to identify invalid vaccine order-of-events.',
      },
      {
        q: 'What is the biggest risk of using general AI for pet travel?',
        a: 'The greatest risk is unexpected pet impoundment or deportation at the border. If an AI miscalculates a 21-day latency period by a single day, customs officers have no discretion: the animal must be placed in quarantine at your expense or placed on a return flight.',
      },
    ],
    relatedGuides: [
      {
        slug: 'rabies-titer-test-favn-guide',
        title: 'FAVN Rabies Titer Test Manual',
        category: 'Veterinary Testing',
        description: 'Understand the exact 0.5 IU/mL requirements and why AI tools miscalculate the 180-day waiting period.',
      },
      {
        slug: 'usda-aphis-vehcs-guide',
        title: 'USDA APHIS VEHCS Endorsement Guide',
        category: 'Government Endorsement',
        description: 'Step-by-step walkthrough of sovereign government endorsement protocols.',
      },
      {
        slug: 'iata-crate-requirements',
        title: 'IATA-Approved Dog Crate Guidelines',
        category: 'Aviation & Crates',
        description: 'Official mathematical crate formulas that prevent airport gate check-in denials.',
      },
    ],
    relatedCountries: [
      {
        slug: 'singapore',
        name: 'Singapore',
        flag: '🇸🇬',
        requirementSummary: 'Strict AVS Category A/B/C/D biosecurity rules and mandatory CAPQ quarantine reservation.',
      },
      {
        slug: 'japan',
        name: 'Japan',
        flag: '🇯🇵',
        requirementSummary: 'Immutable 180-day titer latency rule and 40-day MAFF advance notification mandate.',
      },
      {
        slug: 'united-kingdom',
        name: 'United Kingdom',
        flag: '🇬🇧',
        requirementSummary: 'DEFRA manifest cargo law and strict 24–120 hour tapeworm administration window.',
      },
    ],
    relatedTools: [
      {
        slug: 'favn-titer-calculator',
        title: 'FAVN Titer Calculator',
        description: 'Deterministic mathematical calculation of your pet’s earliest overseas departure date.',
      },
      {
        slug: 'rabies-waiting-period-calculator',
        title: 'Rabies Waiting Period Calculator',
        description: 'Accurate 21-day ISO latency window computation without AI hallucination risk.',
      },
      {
        slug: 'quarantine-risk-checker',
        title: 'Quarantine Risk Checker',
        description: 'Deterministic biosecurity risk checker for international animal relocations.',
      },
    ],
  },
];
