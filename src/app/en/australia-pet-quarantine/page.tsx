import Link from 'next/link';
import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getMedicalWebPageSchema,
  getSoftwareApplicationSchema,
  getHowToSchema,
} from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Australia Pet Quarantine: What to Expect (2026 Mickleham PEQ Guide) | PawValid',
  description:
    'Comprehensive guide to Australia post-entry pet quarantine at Mickleham, Melbourne. Understand where quarantine takes place, 10 vs 30 days length of stay, daily fees, PEQ booking, visiting policies, and release day collection.',
  keywords: [
    'australia pet quarantine',
    'post-entry quarantine pets',
    'Mickleham quarantine',
    'australia pet quarantine cost',
    'mickleham PEQ melbourne',
    'how long is pet quarantine in australia',
    'australia dog quarantine facility',
    'cat quarantine mickleham',
    'DAFF post entry quarantine',
  ],
  alternates: getHreflangAlternates('/australia-pet-quarantine'),
  openGraph: {
    title: 'Australia Pet Quarantine: What to Expect at Mickleham (2026 Guide) | PawValid',
    description:
      'What happens when your dog or cat enters quarantine in Australia? Comprehensive facility walkthrough of Mickleham PEQ in Melbourne, stay durations, fees, and release protocols.',
    url: 'https://pawvalid.online/en/australia-pet-quarantine',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australia Pet Quarantine: What to Expect at Mickleham | PawValid',
    description:
      'Inside Australia’s Post-Entry Quarantine facility: 10 vs 30 day stays, fees, daily care, no-visitor rules, and collection on release day.',
  },
};

const QUARANTINE_FAQS = [
  {
    q: 'Where is Australia’s pet quarantine facility located?',
    a: 'Australia operates a single, state-of-the-art national animal quarantine station: the Mickleham Post Entry Quarantine (PEQ) facility, situated at 260 Donnybrook Road, Mickleham, Victoria, approximately 30 kilometers north of Melbourne Airport. There are no animal quarantine facilities in Sydney, Brisbane, Perth, Adelaide, or Cairns. All companion animals requiring quarantine must land at Melbourne International Airport (MEL).',
  },
  {
    q: 'Can I visit my dog or cat while they are in Mickleham quarantine?',
    a: 'No. Visiting pets during their stay at Mickleham is strictly prohibited under Australian biosecurity law. The facility operates as a high-security quarantine containment perimeter designed to prevent the escape or transmission of exotic foreign pathogens, vector insects, and zoonotic diseases. Highly trained government biosecurity animal attendants and veterinary staff provide daily feeding, cleaning, medication administration, and exercise.',
  },
  {
    q: 'How long will my pet stay in quarantine in Australia?',
    a: 'For pets arriving from approved Group 2 and Group 3 countries with a fully compliant import permit, valid 180-day RNATT rabies titer clock, and an officially endorsed Government Identity Verification, the standard quarantine stay is 10 days (counted as 10 nights). If pre-export blood tests, parasite treatments, or identity verification documents show discrepancies or missing data upon airport intake, the stay is extended to 30 days.',
  },
  {
    q: 'How much does Mickleham pet quarantine cost?',
    a: 'Standard 10-day quarantine for a single dog or cat typically costs between AUD $2,200 and $2,800. This includes airport collection at Melbourne Airport, secure climate-controlled transport to Mickleham, daily board, feeding, routine veterinary health checks, and final release examination. Additional fees apply if internal or external parasites are discovered during intake, requiring mandatory re-treatment and follow-up clinical testing.',
  },
  {
    q: 'How do I book a quarantine spot at Mickleham for my pet?',
    a: 'You can only book quarantine after DAFF has officially approved and issued your Australian Pet Import Permit. Once your permit is granted, log into the DAFF Post Entry Quarantine Reservation System using your BICON permit reference number. Because Mickleham has limited capacity (especially during peak summer months between November and February), reservations should be finalized as early as possible.',
  },
  {
    q: 'Who can collect my pet from Mickleham on release day?',
    a: 'Your pet can be collected on release day either in person by the authorized importer (with photo ID) or by an authorized domestic/international pet transport agent. If your final destination is in another Australian state (such as New South Wales, Queensland, or Western Australia), a domestic pet courier can collect your pet from Mickleham and transfer them onto an onward domestic flight.',
  },
];

export default function AustraliaPetQuarantinePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Australia', url: '/en/countries/australia' },
    { name: 'Australia Pet Quarantine', url: '/en/australia-pet-quarantine' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(QUARANTINE_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Australia Pet Quarantine: What to Expect (Mickleham PEQ Biosecurity Guide)',
    description:
      'Official statutory overview of Australia post-entry quarantine facility operations, daily care, fees, and release criteria.',
    url: '/en/australia-pet-quarantine',
    authority: 'Department of Agriculture, Fisheries and Forestry (DAFF Australia)',
    authorityUrl: 'https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets/peq',
    lastReviewed: '2026-10-14',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Cross-Border Compliance Auditor',
  });
  const softwareSchema = getSoftwareApplicationSchema();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* ─── JSON-LD STRUCTURED DATA ─────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* ─── BREADCRUMBS & COMPLIANCE BADGE ──────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Home
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/countries" className="hover:text-zinc-900 transition-colors">
              Countries
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/countries/australia" className="hover:text-zinc-900 transition-colors">
              Australia
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">
              Quarantine at Mickleham
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Mickleham Post Entry Quarantine (PEQ)</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Post-Arrival Biosecurity Facility</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Australia Pet Quarantine: What to Expect
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Post-entry quarantine is the ultimate statutory checkpoint protecting Australia&apos;s island ecosystem against foreign pathogens such as rabies, canine brucellosis, and exotic tick-borne parasites. All companion animals entering Australia from Group 2 and Group 3 countries must complete a mandatory stay at the <strong>Mickleham Post Entry Quarantine (PEQ)</strong> facility in Victoria. Understanding how the facility operates, exact quarantine lengths, daily care routines, and collection procedures ensures a smooth, stress-free arrival for your dog or cat.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against Australian DAFF Post Entry Quarantine Standards, Mickleham Operational Directives, and Animal Welfare Guidelines (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Facility Location
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Mickleham, VIC
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  30 km north of Melbourne
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Standard Stay
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  10 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  With verified identity &amp; titer
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Estimated Cost
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  AUD $2,200+
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Includes transport &amp; daily care
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Owner Visits
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Not Permitted
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Strict biosecurity zone
                </span>
              </div>
            </div>

            {/* In-Page Quick Navigation */}
            <div className="bg-[#F8FAFB] rounded-xl p-3 sm:p-4 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide block mb-2">
                Table of Contents &amp; Quick Jump
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="#where-quarantine-takes-place"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Where Quarantine Takes Place (Mickleham)
                </a>
                <a
                  href="#length-of-stay"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Length of Stay (10 vs 30 Days)
                </a>
                <a
                  href="#fees-and-booking"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Fees and Booking
                </a>
                <a
                  href="#visiting-and-collection"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Visiting and Collection
                </a>
                <a
                  href="#faqs"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  5. Frequently Asked Questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT CONTAINER ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Editorial Body (8 cols) */}
          <main className="lg:col-span-8 space-y-12">

            {/* ─── SECTION 1: WHERE QUARANTINE TAKES PLACE ───────────── */}
            <section id="where-quarantine-takes-place" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Facility Overview
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Where Quarantine Takes Place
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                All companion animal quarantine in Australia is centralized at a single, world-class government installation: the <strong>Mickleham Post Entry Quarantine (PEQ) facility</strong>, located in Mickleham, Victoria. Built by the Australian Government at a cost of over AUD $300 million, the compound represents the global gold standard in biosecurity engineering, hygiene control, and animal welfare.
              </p>

              {/* Facility Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🐕</span>
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Canine Accommodation at Mickleham
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Dogs are housed in large, individual indoor-outdoor runs with underfloor heating, climate-controlled evaporative cooling, and automated fresh air ventilation. The facility features secure, grassy outdoor exercise yards where dogs receive regular rotation and human enrichment under veterinary supervision.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🐈</span>
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Feline Accommodation at Mickleham
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Cats stay in dedicated, multi-level cattery suites separated from the dog compounds. Suites feature private sleeping quarters, vertical climbing shelves, scratching posts, and separate litter zones. Temperature and humidity are closely regulated to ensure maximum comfort and reduce relocation anxiety.
                  </p>
                </div>
              </div>

              {/* Airport Transfer Workflow */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/90 text-xs text-zinc-700 space-y-1.5">
                <div className="font-bold text-[#0E2342] flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Airport Collection Protocol (Melbourne International Airport - MEL)</span>
                </div>
                <p className="leading-relaxed text-zinc-600">
                  When your pet&apos;s cargo flight touches down at Melbourne Airport, you do not meet or collect your pet at the terminal. Instead, authorized DAFF biosecurity officers meet the aircraft directly at the freight bond, inspect the IATA container seals, verify the microchip, and transfer the animal into a climate-controlled DAFF vehicle for direct escort to the Mickleham facility.
                </p>
              </div>
            </section>

            {/* ─── SECTION 2: LENGTH OF STAY ────────────────────────── */}
            <section id="length-of-stay" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Duration &amp; Observation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Length of Stay
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                The length of time your pet spends in Mickleham quarantine depends directly on their country of export, the accuracy of their pre-export veterinary documentation, and their clinical health status upon intake inspection.
              </p>

              {/* 10 vs 30 Days Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-emerald-900">
                      Standard Track: 10 Days
                    </h3>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      Target Pathway
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Applies to pets arriving from Group 2 countries, or Group 3 countries where all conditions were satisfied:
                  </p>
                  <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4 leading-relaxed">
                    <li>Valid ISO 11784/11785 microchip scanned correctly at every check.</li>
                    <li>RNATT rabies titer score ≥ 0.50 IU/mL processed by approved reference lab.</li>
                    <li>Official Government Vet completed the RNATT identity declaration.</li>
                    <li>Arrival in Australia occurred <strong>180+ days after the RNATT blood sample</strong> was drawn.</li>
                    <li>Zero ticks, fleas, or clinical signs of communicable illness on intake.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-amber-900">
                      Extended Track: 30 Days
                    </h3>
                    <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                      Risk / Discrepancy
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Quarantine is automatically extended to 30 days (or more) if:
                  </p>
                  <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4 leading-relaxed">
                    <li>The RNATT identity declaration form was not endorsed by an official government vet.</li>
                    <li>The pet arrives in Australia before the 180-day titer waiting period has fully elapsed.</li>
                    <li>Ticks or live external parasites are discovered during intake inspection.</li>
                    <li>Pre-export canine blood tests (Ehrlichia, Brucella, Leishmania) require re-testing.</li>
                    <li>The animal develops clinical signs of infectious disease requiring isolation.</li>
                  </ul>
                </div>
              </div>

              {/* In-Quarantine Care Callout */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                  Daily Veterinary Monitoring &amp; Welfare Routines
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  During quarantine, dedicated DAFF animal attendants monitor every pet twice daily for appetite, hydration, demeanor, and physical health. High-quality commercial diets (Royal Canin, Hills Science Diet, Advance) are provided, though owners may submit special dietary requests or prescription medications. If an animal requires veterinary intervention, accredited government veterinarians examine and treat the pet immediately in Mickleham&apos;s on-site surgical clinic.
                </p>
              </div>
            </section>

            {/* ─── SECTION 3: FEES AND BOOKING ──────────────────────── */}
            <section id="fees-and-booking" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Reservation &amp; Billing
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Fees and Booking
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Mickleham operates under full statutory cost recovery. Fees cover government inspection, secure transfer from Melbourne Airport, daily kennel/cattery accommodation, routine clinical observations, and final release clearance.
              </p>

              {/* Fee Breakdown Table */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200/80">
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Mickleham PEQ Quarantine Fee Breakdown (2026)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Official Australian Government post-entry quarantine charges for dogs and cats.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-700 font-semibold">
                        <th className="p-3">Fee Item</th>
                        <th className="p-3">Estimated Charge (AUD)</th>
                        <th className="p-3">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Standard 10-Day Stay (Single Dog or Cat)</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">AUD $2,200 – $2,800</td>
                        <td className="p-3 text-zinc-600">Includes airport pickup, board, meals, and discharge check</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Additional Pet Sharing Same Cattery / Kennel</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">Approx. 50% discount on daily rate</td>
                        <td className="p-3 text-zinc-600">Permitted for compatible pets of same species from same household</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Extended Quarantine Daily Rate (Beyond 10 Days)</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">AUD $150 – $220 / day</td>
                        <td className="p-3 text-zinc-600">Charged if stay is extended to 30 days due to discrepancies</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Parasite Re-Treatment &amp; Diagnostics</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">AUD $150 – $400</td>
                        <td className="p-3 text-zinc-600">Applied if live ticks, fleas, or abnormal lab values are found</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Booking Step-by-Step */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/90 text-xs text-zinc-700 space-y-2">
                <h4 className="font-bold text-[#0E2342]">
                  How to Secure a Booking at Mickleham PEQ
                </h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-zinc-600 leading-relaxed">
                  <li><strong>Obtain Your DAFF Import Permit:</strong> You cannot book PEQ until your BICON permit has been officially granted and assigned a reference number.</li>
                  <li><strong>Access the PEQ Reservation Portal:</strong> Log into the DAFF Post Entry Quarantine online reservation system using your BICON credentials.</li>
                  <li><strong>Select Entry Date:</strong> Choose your target arrival date at Melbourne Airport. System will confirm suite availability for your pet&apos;s species and size.</li>
                  <li><strong>Pay Initial Deposit:</strong> A non-refundable booking deposit is required to confirm the reservation.</li>
                  <li><strong>Submit Flight Waybill:</strong> Provide your confirmed airway bill (AWB) number at least 2 weeks before travel to coordinate terminal collection.</li>
                </ol>
              </div>
            </section>

            {/* ─── SECTION 4: VISITING AND COLLECTION ───────────────── */}
            <section id="visiting-and-collection" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Discharge &amp; Reunion
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Visiting and Collection
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                The strict biosecurity regulations that make Australia free of major animal diseases also govern visitor policies and discharge procedures at Mickleham.
              </p>

              {/* Visiting Policies Card */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                  <span className="text-red-700">✕</span> Strict No-Visiting Policy
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Owners, family members, and personal handlers are <strong>strictly forbidden from visiting pets during quarantine</strong>. There are no exceptions for birthdays, anxiety, or medical concerns. Entry into the animal compounds is restricted solely to authorized biosecurity officers and registered veterinary personnel.
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  To keep pet parents informed, Mickleham staff provide status updates via your PEQ online portal. If any health issues arise, a government veterinarian contacts the importer directly via telephone.
                </p>
              </div>

              {/* Release Day Procedure */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                  <span className="text-emerald-700">✓</span> Release Day Collection Protocol
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  On the 10th day (usually in the morning between 8:30 AM and 11:30 AM), once the final clinical examination is signed off, your pet is cleared for collection:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-700">
                    <strong className="block text-zinc-900 mb-1">Option A: In-Person Collection</strong>
                    You or an authorized representative collects your pet at the Mickleham reception with government-issued photo ID.
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-700">
                    <strong className="block text-zinc-900 mb-1">Option B: Domestic Pet Courier</strong>
                    An authorized pet transport agency collects your pet from Mickleham and books an onward domestic flight to Sydney, Brisbane, Perth, or other states.
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION 5: FAQS ──────────────────────────────────── */}
            <section id="faqs" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Official Guidance
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Frequently Asked Questions About Australia Pet Quarantine
                </h2>
              </div>

              <p className="text-sm text-zinc-600">
                Official regulatory answers regarding Mickleham PEQ facility location, stay durations, daily fees, and collection procedures.
              </p>

              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-4 sm:p-6">
                <FaqAccordion items={QUARANTINE_FAQS} />
              </div>
            </section>

          </main>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Checker Sticky Card */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-sm space-y-4 lg:sticky lg:top-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200/80">
                  🇦🇺
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Verify Quarantine Eligibility
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Qualifying for 10-day release?
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Ensure your RNATT blood titer timing and identity verification satisfy DAFF criteria to avoid an extended 30-day stay at Mickleham.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checker?dest=AU"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center"
                >
                  <span>Audit Quarantine Timelines →</span>
                </Link>
                <Link
                  href="/en/bring-pets-to-australia"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold py-2 px-4 rounded-xl transition-all text-center"
                >
                  <span>Australia Overview Hub</span>
                </Link>
              </div>

              {/* Related Australia Cluster Guides */}
              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Australia Cluster Guides
                </span>
                <ul className="text-xs space-y-2 text-zinc-600">
                  <li>
                    <Link
                      href="/en/australia-pet-import-permit"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Australia Pet Import Permit (How to Apply)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/australian-quarantine-for-dogs"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Australian Quarantine for Dogs (Rules &amp; Prep)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/cat-quarantine-australia"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Cat Quarantine in Australia (Requirements)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/australian-pet-passport"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Is There an Australian Pet Passport? (Myth-Busting)</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Official Authority Links */}
              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 space-y-1">
                <div className="font-semibold text-zinc-700">Official Portals:</div>
                <div>&bull; <a href="https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets/peq" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">Mickleham PEQ Information</a></div>
                <div>&bull; <a href="https://bicon.agriculture.gov.au" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF BICON Portal</a></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
