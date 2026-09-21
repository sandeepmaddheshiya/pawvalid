export interface ToolFaq {
  q: string;
  a: string;
}

export interface CalculatorTool {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  readTime: string;
  dateModified: string;
  statutoryBasis: string;
  authority: string;
  overview: string;
  keyRules: string[];
  faqs: ToolFaq[];
}

export const TOOLS: CalculatorTool[] = [
  {
    slug: 'rabies-waiting-period-calculator',
    name: 'Rabies Waiting Period Calculator',
    badge: 'Statutory 21-Day Latency',
    tagline: 'Calculate exact 21-day primary vaccination latency, booster validity, and earliest compliant flight date.',
    seoTitle: 'Rabies Waiting Period Calculator (2026): 21-Day Rule & Travel Readiness | PawValid',
    seoDescription:
      'Free interactive rabies vaccination waiting period calculator. Computes the mandatory 21-day latency period for EU, UK, and international pet travel to prevent border refusal.',
    readTime: '3 min tool',
    dateModified: '2026-09-21',
    statutoryBasis: 'Regulation (EU) No 576/2013 Annex III & The Non-Commercial Movement of Pet Animals Order 2011',
    authority: 'European Commission (DG SANTE) & UK DEFRA / APHA',
    overview:
      'Under international biosecurity statutes, a primary rabies vaccination is not legally valid for international travel until an exact 21-day incubation window has elapsed. Day 0 is the day of injection; travel is authorized beginning on Day 22. If your pet received a timely booster within the previous vaccine\'s active validity, the 21-day waiting period is exempt.',
    keyRules: [
      'Primary Rabies Shot: Mandatory 21 full days must elapse before boarding international flights.',
      'Booster Rabies Shot: No 21-day waiting period if administered before the previous vaccine expired.',
      'Microchip Prerequisite: The microchip MUST be implanted before or on the same day as the rabies vaccine.',
      'Minimum Age: Puppies/kittens must be at least 12 weeks old at the time of primary vaccination.',
    ],
    faqs: [
      {
        q: 'How is the 21-day waiting period counted under EU and UK law?',
        a: 'The day the rabies vaccine is administered is counted as Day 0. The 21-day clock runs through Day 21. Your pet is legally eligible to travel starting on Day 22. Traveling on Day 20 or Day 21 will result in border confiscation or mandatory quarantine.',
      },
      {
        q: 'Does a 3-year rabies booster require a 21-day wait?',
        a: 'No, as long as the booster was administered on or before the expiration date of the previous rabies vaccine. If the previous vaccine lapsed by even a single day, the new shot is legally classified as a primary vaccination and resets the 21-day waiting clock.',
      },
      {
        q: 'What happens if my pet was microchipped AFTER the rabies vaccine?',
        a: 'Border authorities will treat the rabies vaccination as legally void. You must have a new rabies vaccination administered after the microchip is in place, which restarts the 21-day waiting period.',
      },
    ],
  },
  {
    slug: 'favn-titer-calculator',
    name: 'FAVN Rabies Titer Waiting Period Calculator',
    badge: '90 vs 180-Day Latency Clock',
    tagline: 'Calculate mandatory post-blood draw waiting periods for EU (90 days), Japan (180 days), Australia (180 days), and Hawaii (30 days).',
    seoTitle: 'FAVN Titer Waiting Period Calculator: 90 vs 180 Day Clocks | PawValid',
    seoDescription:
      'Calculate the mandatory post-blood draw waiting period for your pet\'s FAVN rabies titer test. Instant statutory countdown for EU, Australia, Japan, New Zealand, Hawaii, and UAE.',
    readTime: '4 min tool',
    dateModified: '2026-09-21',
    statutoryBasis: 'WOAH Terrestrial Manual, Japan MAFF Rabies Prevention Act, Australian DAFF Biosecurity Act 2015',
    authority: 'WOAH, Australian DAFF, Japan MAFF, Hawaii HDOA, EU DG SANTE',
    overview:
      'The Fluorescent Antibody Virus Neutralization (FAVN) or RNATT rabies titer test measures neutralizing antibodies in blood serum. Rabies-free and strictly controlled countries enforce mandatory post-blood draw observation periods before entry: 90 calendar days for unlisted countries entering the EU, 180 days for Australia and Japan, 30 days for Hawaii, and 3 months for New Zealand. The clock starts on the day the blood sample is drawn by your veterinarian.',
    keyRules: [
      'Minimum Threshold: Antibody level must be ≥ 0.50 IU/mL to pass.',
      'Clock Start Date: Waiting period begins on the blood draw date, NOT the date the lab report is issued.',
      'EU Unlisted Entry: 3 calendar months (90 days) waiting period before entering the European Union.',
      'Australia & Japan: 180 days waiting period required for zero or 10-day quarantine release.',
      'Approved Lab Only: Test must be processed at an officially accredited reference laboratory (e.g. KSU, Auburn, APHA Weybridge).',
    ],
    faqs: [
      {
        q: 'Does the titer waiting clock start on the blood draw date or the report date?',
        a: 'The waiting clock strictly starts on the exact date the veterinary blood sample was drawn, as recorded on the official laboratory submission form.',
      },
      {
        q: 'What happens if my pet scores 0.48 IU/mL on the FAVN test?',
        a: 'A score below 0.50 IU/mL is an automatic failure. You must administer a rabies booster shot, wait 21 to 30 days for antibody titers to rise, and draw a new blood sample, which resets the entire waiting clock.',
      },
      {
        q: 'How long is a passing rabies titer test valid for international travel?',
        a: 'For the European Union, a passing titer test is valid for the pet\'s entire lifetime, provided rabies booster vaccinations are kept up to date without any lapse. For Australia and Japan, the test is valid for 24 months (2 years) from the blood draw date.',
      },
    ],
  },
  {
    slug: 'quarantine-risk-checker',
    name: 'Quarantine Risk & Isolation Checker',
    badge: 'Biosecurity Risk Diagnostic',
    tagline: 'Interactive risk diagnostic: Determine whether your route requires 0 days, 10–30 days quarantine, or carries entry refusal risk.',
    seoTitle: 'Pet Travel Quarantine Risk Checker (2026): Instant Biosecurity Assessment | PawValid',
    seoDescription:
      'Free pet travel quarantine risk assessment tool. Evaluates origin, destination, transit stops, rabies titer latency, and breed restrictions to predict quarantine duration.',
    readTime: '3 min tool',
    dateModified: '2026-09-21',
    statutoryBasis: 'WOAH Biosecurity Standards, Australian Biosecurity Act 2015, Singapore Animals and Birds Act',
    authority: 'Australian DAFF, Singapore AVS, NZ MPI, UK DEFRA, US CDC',
    overview:
      'Pet quarantine requirements vary dramatically depending on your origin country’s rabies classification, destination biosecurity tier, transit flight layovers, and dog breed. This diagnostic tool checks your travel route parameters against international biosecurity laws to determine whether your pet qualifies for direct airport release (0 days quarantine) or requires booking a government post-entry quarantine facility (PEQ).',
    keyRules: [
      'Rabies-Free Destinations (Australia, New Zealand, Japan): Strict quarantine unless 180-day titer latency and advance import permits are fully secured.',
      'Transit Contamination Risk: Transiting through high-risk rabies countries can void rabies-free exemption without official transit seals.',
      'Banned Breeds: Specific dog breeds (Pit Bull Terriers, Japanese Tosa, Dogo Argentino, Fila Brasileiro, XL Bully) face immediate border refusal or seizure.',
      'Post-Entry Quarantine Booking: Australian Mickleham PEQ facility must be booked 3 to 6 months in advance due to limited space.',
    ],
    faqs: [
      {
        q: 'Which countries always require post-entry quarantine for pets?',
        a: 'Australia (minimum 10 to 30 days at Mickleham PEQ facility), New Zealand (minimum 10 days at private quarantine facility), and Singapore (Category C/D origins require 30 days quarantine). However, direct travel from approved rabies-free countries (e.g. New Zealand to Australia) requires 0 days quarantine.',
      },
      {
        q: 'Can transiting through a third country trigger quarantine?',
        a: 'Yes. If you are traveling from a rabies-free origin (like the UK or Australia) but transit through a rabies-endemic country without an official transshipment container seal, your pet may be reclassified as originating from a high-risk region, triggering mandatory quarantine.',
      },
      {
        q: 'How can I avoid quarantine when moving a pet to Australia?',
        a: 'Ensure the RNATT rabies titer blood draw occurs at least 180 days before flight, secure a DAFF import permit, and complete all pre-export parasite treatments. This minimizes Australia quarantine to the statutory 10-day minimum stay.',
      },
    ],
  },
];
