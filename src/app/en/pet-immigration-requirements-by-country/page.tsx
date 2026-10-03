import Link from 'next/link';
import type { Metadata } from 'next';
import PetImmigrationComparisonTable from '@/components/PetImmigrationComparisonTable';
import FaqAccordion from '@/components/FaqAccordion';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Pet Immigration Requirements by Country: 2026 Comparison & Rules | PawValid',
  description:
    'Compare pet immigration requirements by country. Comprehensive comparison of entry permits, quarantine mandates, rabies titer timelines, and biosecurity rules across Australia, Singapore, Japan, EU, UK, Canada, and the USA.',
  keywords: [
    'pet immigration requirements by country',
    'pet immigration rules',
    'country pet entry requirements',
    'pet entry rules by country',
    'pet immigration canada',
    'pet immigration uk',
    'pet relocation rules',
    'international pet immigration',
    'dog immigration requirements',
    'cat immigration requirements',
    'pet quarantine by country',
    'pet import permit requirements',
  ],
  alternates: getHreflangAlternates('/pet-immigration-requirements-by-country'),
  openGraph: {
    title: 'Pet Immigration Requirements by Country (2026 Comparison Matrix) | PawValid',
    description:
      'Compare global pet immigration rules: mandatory permits, post-entry quarantine durations, rabies blood titer timelines, and official veterinary certificates across 15+ sovereign jurisdictions.',
    url: 'https://pawvalid.online/en/pet-immigration-requirements-by-country',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Immigration Requirements by Country: 2026 Rules & Comparison | PawValid',
    description:
      'Everything you need to know about pet immigration rules by country — compare permits, quarantine, timelines, and titer tests across Australia, Singapore, Japan, EU, UK, Canada, and the USA.',
  },
};

const PET_IMMIGRATION_FAQS = [
  {
    q: 'What is the difference between pet travel and permanent pet immigration?',
    a: 'While temporary travel and permanent relocation share fundamental biosecurity requirements (ISO microchipping, rabies vaccination, health certificates), permanent pet immigration often involves additional statutory requirements. These include registering the animal with the local municipal authority upon arrival (e.g., AVS dog licensing in Singapore, municipal dog tax in Germany, local council registration in Australia), transferring microchip registration to national pet databases (e.g., Identibase/Petlog in the UK, TASSO in Germany), and adhering to long-term breed restriction laws and residential zoning limits.',
  },
  {
    q: 'Which countries have the strictest pet immigration rules and mandatory quarantine?',
    a: 'Australia, New Zealand, Japan, and Singapore enforce the strictest pet immigration protocols in the world due to their rabies-free island biosecurity status. Australia mandates an advance DAFF BICON import permit, a 180-day waiting period following a FAVN rabies titer test, and a mandatory 10- to 30-day quarantine at the Mickleham Post Entry Quarantine (PEQ) facility in Melbourne. Singapore requires an AVS GoBusiness licence and 10 to 30 days quarantine at the Sembawang Animal Quarantine Centre for pets arriving from Category C and D origins. Japan requires 40-day advance notification and a 180-day titer wait to avoid 180-day government quarantine upon landing.',
  },
  {
    q: 'Which countries have simpler pet immigration rules with 0 days quarantine?',
    a: 'Canada, the European Union member states (Germany, France, Spain, Italy, Netherlands), Great Britain (UK), the United States, and Mexico operate streamlined, low-friction pet immigration frameworks when pets arrive from rabies-controlled or low-risk countries. Under these rules, pets do not require a separate advance import permit and qualify for direct release (0 days quarantine) at the port of entry upon presenting an endorsed Veterinary Health Certificate confirming an ISO 11784/11785 microchip and compliant rabies vaccination.',
  },
  {
    q: 'Do I need a rabies antibody titer blood test (FAVN/RNATT) for every country?',
    a: 'No. Rabies antibody titer testing (confirming antibody levels ≥ 0.50 IU/mL) is only mandatory for high-biosecurity rabies-free island states (Australia, Japan, Singapore, New Zealand) or when moving a dog or cat from a high-rabies endemic country into the EU, UK, or USA. Pets relocating between rabies-controlled nations (for instance, moving from the USA or Canada to the UK or European Union) are statutorily exempt from rabies titer blood tests.',
  },
  {
    q: 'What are the pet immigration requirements for moving a dog to Canada?',
    a: 'Immigrating to Canada with a personal companion dog or cat under Canadian Food Inspection Agency (CFIA) and Canada Border Services Agency (CBSA) rules requires a valid rabies vaccination certificate signed by a licensed veterinarian (specifying the animal’s breed, weight, color, microchip number, vaccine trade name, lot number, and expiration date). Canada does not mandate an advance import permit, rabies titer test, or post-arrival quarantine for personal pets. A nominal CBSA documentary inspection fee (approx. $30 CAD + tax) is payable at the port of entry.',
  },
  {
    q: 'What are the pet immigration rules for moving a pet to the United Kingdom?',
    a: 'Relocating a dog or cat to Great Britain (England, Scotland, Wales) under DEFRA / APHA regulations requires: (1) a 15-digit ISO 11784/11785 microchip; (2) a valid rabies vaccination administered after microchipping with a 21-day latency period; (3) an official Great Britain Pet Health Certificate endorsed by the exporting government authority (e.g., USDA APHIS in the US or CFIA in Canada); (4) for dogs, a mandatory tapeworm treatment containing Praziquantel administered by a vet strictly 24 to 120 hours before arrival; and (5) entry via an approved route and port, transported as manifest cargo on commercial airlines.',
  },
  {
    q: 'How far in advance must I begin pet immigration preparations?',
    a: 'For destinations with strict biosecurity protocols (Australia, Japan, Singapore, New Zealand), you must begin preparations 6 to 7 months (approx. 210 days) prior to your intended relocation date. This lead time is necessitated by the mandatory 180-day waiting period following the rabies blood titer draw. For standard destinations (EU, UK, Canada, USA, Mexico), preparing 30 to 60 days before departure is generally sufficient, as primary rabies vaccines require a 21-day post-inoculation latency window before travel.',
  },
  {
    q: 'What happens if my pet arrives with non-compliant paperwork or expired vaccinations?',
    a: 'Border biosecurity officers at international ports of entry have statutory legal jurisdiction to take three enforcement actions if documents are non-compliant: (1) refuse entry and issue an immediate deportation order returning the pet to the origin country at the owner’s sole expense; (2) place the animal into mandatory government quarantine at an approved holding facility at the owner’s expense until full compliance is established; or (3) in extreme biosecurity breach scenarios where disease risk cannot be mitigated, subject the animal to euthanasia. Using PawValid’s automated document verification scanner before departure eliminates this risk.',
  },
];

export default function PetImmigrationRequirementsByCountryPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Pet Immigration Requirements by Country', url: '/en/pet-immigration-requirements-by-country' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(PET_IMMIGRATION_FAQS);

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

      {/* ─── BREADCRUMBS & COMPLIANCE BADGE ──────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Home
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">
              Pet Immigration Requirements by Country
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 Global Biosecurity &amp; Immigration Matrix</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Cross-Border Pet Relocation Framework</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
              Pet Immigration Requirements by Country
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Immigrating or permanently relocating across international borders with a dog or cat requires strict adherence to sovereign veterinary entry statutes. Global biosecurity frameworks vary dramatically based on the destination country’s rabies classification, island geography, and agricultural risk profile. This definitive master comparison evaluates <strong>pet immigration rules</strong> worldwide—contrasting mandatory government permits, post-entry quarantine durations, blood titer waiting periods, and endorsement timelines across strict jurisdictions (Australia, Singapore, Japan) and streamlined destinations (European Union, United Kingdom, Canada, United States).
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Jurisdictions
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  15+ Sovereign Hubs
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Full statutory comparison
                </span>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Quarantine Spectrum
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  0 to 30+ Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Origin &amp; destination tiered
                </span>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Preparation Windows
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  21 Days to 7 Mo
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Titer latency dependent
                </span>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Import Permits
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Mandatory vs Exempt
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Detailed statutory analysis
                </span>
              </div>
            </div>

            {/* In-Page Quick Navigation */}
            <div className="bg-zinc-50 rounded-xl p-3 sm:p-4 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide block mb-2">
                Table of Contents &amp; Quick Sections
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="#comparison-table"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Comparison Table
                </a>
                <a
                  href="#rabies-free-vs-controlled"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Rabies-Free vs. Rabies-Controlled
                </a>
                <a
                  href="#strict-rules"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Countries With Strict Rules
                </a>
                <a
                  href="#simpler-rules"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Countries With Simpler Rules
                </a>
                <a
                  href="#species-differences"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  5. Dogs vs. Cats Nuances
                </a>
                <a
                  href="#immigration-faqs"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  6. Frequently Asked Questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: COMPARISON TABLE ────────────────────────────── */}
      <section id="comparison-table" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Statutory Benchmark
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Comparison Table
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Use this interactive comparison matrix to cross-reference <strong>country pet entry requirements</strong> across primary global destinations. Filter by rule strictness, permit mandates, or species-specific criteria to identify exact regulatory steps for your international pet relocation.
            </p>
          </div>

          {/* Interactive Comparison Component */}
          <PetImmigrationComparisonTable />
        </div>
      </section>

      {/* ─── SECTION 2: RABIES-FREE VS RABIES-CONTROLLED COUNTRIES ────── */}
      <section
        id="rabies-free-vs-controlled"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Global Biosecurity Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Rabies-Free vs. Rabies-Controlled Countries
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Every country’s pet immigration laws are anchored by international animal health standards established by the <strong>World Organisation for Animal Health (WOAH)</strong>. Sovereign nations categorize origin jurisdictions into three distinct biosecurity tiers, which dictate whether your pet needs a rabies titer blood test, an advance import permit, or post-arrival quarantine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Category 1: Rabies-Free */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-4">
                  <span>Category 1: Rabies-Free</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                  Zero Rabies Endemicity
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  Jurisdictions that have eliminated indigenous terrestrial rabies (typically island or isolated biosecurity zones). Enforce extreme border controls to protect native fauna and domestic livestock.
                </p>
                <div className="bg-white rounded-xl p-3.5 border border-zinc-200/80 text-xs space-y-2 text-zinc-700">
                  <div>
                    <strong className="text-zinc-900 block">Representative Nations:</strong>
                    <span>Australia, New Zealand, Japan, Singapore, United Kingdom, Republic of Ireland, Hawaii, Guam.</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-100">
                    <strong className="text-zinc-900 block">Immigration Protocols:</strong>
                    <span>Mandatory FAVN/RNATT titer test + 180-day waiting clocks, strict advance import permits, and mandatory 10–30 days quarantine unless arriving from reciprocal rabies-free peers.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: Rabies-Controlled */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 mb-4">
                  <span>Category 2: Rabies-Controlled</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                  Controlled Wildlife Reservoirs
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  Developed nations with robust veterinary infrastructure, active surveillance, and high domestic vaccination rates, where urban/canine rabies has been successfully eradicated.
                </p>
                <div className="bg-white rounded-xl p-3.5 border border-zinc-200/80 text-xs space-y-2 text-zinc-700">
                  <div>
                    <strong className="text-zinc-900 block">Representative Nations:</strong>
                    <span>United States, Canada, European Union member states (Germany, France, Spain, Italy), Switzerland, Norway.</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-100">
                    <strong className="text-zinc-900 block">Immigration Protocols:</strong>
                    <span>Direct release with 0 days quarantine. Valid primary or booster rabies vaccine (21-day latency) + ISO microchip. Titer tests exempt between Category 2 nations.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Rabies-Endemic */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-4">
                  <span>Category 3: High-Risk / Endemic</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                  Active Canine Rabies Risk
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  Countries where dog-mediated rabies virus remains endemic or where veterinary surveillance systems do not meet WOAH reporting standards.
                </p>
                <div className="bg-white rounded-xl p-3.5 border border-zinc-200/80 text-xs space-y-2 text-zinc-700">
                  <div>
                    <strong className="text-zinc-900 block">Representative Regions:</strong>
                    <span>Parts of South Asia, Southeast Asia, Central &amp; South America, the Middle East, and Sub-Saharan Africa.</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-100">
                    <strong className="text-zinc-900 block">Immigration Protocols:</strong>
                    <span>Mandatory rabies titer blood test (≥ 0.50 IU/mL) processed by an approved international reference laboratory, followed by a mandatory 3-month (90-day) or 6-month (180-day) quarantine waiting window.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Border Migration Flow Matrix */}
          <div className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
            <h4 className="font-serif text-lg font-bold text-zinc-900 mb-3">
              Cross-Tier Relocation Rules Matrix
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
              When immigrating with your pet, the statutory rule set is determined by the intersection of your <strong>Origin Tier</strong> and your <strong>Destination Tier</strong>:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-zinc-200/80 text-zinc-900 text-[11px] uppercase tracking-wider font-bold">
                    <th className="py-3 px-4 rounded-tl-xl">Relocation Corridor</th>
                    <th className="py-3 px-4">Titer Test Required?</th>
                    <th className="py-3 px-4">Import Permit?</th>
                    <th className="py-3 px-4">Post-Entry Quarantine</th>
                    <th className="py-3 px-4 rounded-tr-xl">Required Lead Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/70 bg-white">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">
                      Category 1 → Category 1 <br />
                      <span className="text-[11px] font-normal text-zinc-500">(e.g. UK to Australia or NZ)</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px]">Exempt / Minimal</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">Yes (BICON / MPI)</td>
                    <td className="py-3.5 px-4 text-zinc-700">0 to 10 Days</td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">1 to 2 Months</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">
                      Category 2 → Category 1 <br />
                      <span className="text-[11px] font-normal text-zinc-500">(e.g. USA / EU to Australia / Japan)</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">
                      <span className="px-2 py-0.5 rounded bg-red-50 text-red-800 font-bold text-[11px]">Mandatory FAVN (≥0.50 IU/mL)</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">Mandatory Advance Permit</td>
                    <td className="py-3.5 px-4 text-zinc-700">10–30 Days (AU) or 0 Days with 180d wait (JP)</td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">6 to 7 Months</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">
                      Category 2 → Category 2 <br />
                      <span className="text-[11px] font-normal text-zinc-500">(e.g. USA to UK / EU / Canada)</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px]">Exempt</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">No Permit (Health Cert Only)</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-800">0 Days (Direct Release)</td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">21 to 30 Days</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">
                      Category 3 → Category 2 <br />
                      <span className="text-[11px] font-normal text-zinc-500">(e.g. India / Brazil to EU / UK)</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">
                      <span className="px-2 py-0.5 rounded bg-red-50 text-red-800 font-bold text-[11px]">Mandatory FAVN + 90-Day Wait</span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700">Health Cert + Titer Lab Report</td>
                    <td className="py-3.5 px-4 text-zinc-700">0 Days (if 90-day wait fulfilled)</td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900">3 to 4 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: COUNTRIES WITH STRICT RULES ─────────────────── */}
      <section id="strict-rules" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 block mb-1">
              High-Biosecurity Island Destinations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Countries With Strict Rules
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              These jurisdictions enforce comprehensive, multi-month statutory protocols. Failure to execute every step in precise sequential order will result in prolonged quarantine confinement, flight refusal, or immediate return deportation at the owner’s sole expense.
            </p>
          </div>

          <div className="space-y-8">
            {/* H3: Australia */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label="Australia">
                    🇦🇺
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Australia
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">
                      Authority: Department of Agriculture, Fisheries and Forestry (DAFF) • Biosecurity Act 2015
                    </span>
                  </div>
                </div>
                <Link
                  href="/en/countries/australia"
                  className="px-3.5 py-1.5 rounded-lg bg-[#0E2342] text-white hover:bg-[#16345E] text-xs font-semibold transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  Full Australia Import Guide →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Core Statutory Requirements</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>ISO 11784/11785 Microchip:</strong> Must be implanted strictly before the qualifying rabies vaccine.
                    </li>
                    <li>
                      <strong>RNATT / FAVN Blood Titer Test:</strong> Blood sample must be drawn and tested at a DAFF-approved reference laboratory. Neutralizing antibody titer must measure ≥ 0.50 IU/mL.
                    </li>
                    <li>
                      <strong>Mandatory 180-Day Waiting Period:</strong> Pet is not legally eligible to enter Australia until exactly 180 calendar days have passed from the laboratory blood draw date.
                    </li>
                    <li>
                      <strong>DAFF BICON Import Permit:</strong> Must be applied for online via the BICON system after receiving passing titer results. Valid for 12 months.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Quarantine &amp; Logistics</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>Mickleham PEQ Facility:</strong> All pets entering Australia from Group 3 origins must complete a mandatory <strong>10 to 30 days quarantine</strong> at the Mickleham Post Entry Quarantine Facility in Melbourne.
                    </li>
                    <li>
                      <strong>Melbourne Airport (MEL) Only:</strong> Pets must arrive directly into Melbourne Tullamarine Airport as manifest cargo booked through an approved pet shipping agent.
                    </li>
                    <li>
                      <strong>Canine Blood Panels:</strong> Mandatory serological testing for <em>Brucella canis</em>, <em>Leishmania infantum</em>, <em>Ehrlichia canis</em>, and <em>Leptospira interrogans</em> within 45 days of departure.
                    </li>
                    <li>
                      <strong>Banned Breeds:</strong> Dogo Argentino, Fila Brasileiro, Japanese Tosa, Pit Bull Terrier, and Presa Canario are strictly prohibited.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <span className="text-base shrink-0">⚠️</span>
                <div>
                  <strong>Australia Non-Direct Origin Ban:</strong> Australia does not permit direct pet import from unapproved non-listed countries (e.g. India, South Africa, China, UAE). Pets from these regions must reside in an approved Group 3 country (such as the UK, USA, or Singapore) for at least 6 consecutive months before qualifying for DAFF import.
                </div>
              </div>
            </div>

            {/* H3: Singapore */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label="Singapore">
                    🇸🇬
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Singapore
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">
                      Authority: Animal &amp; Veterinary Service (AVS / NParks) • Animals and Birds Act
                    </span>
                  </div>
                </div>
                <Link
                  href="/en/countries/singapore"
                  className="px-3.5 py-1.5 rounded-lg bg-[#0E2342] text-white hover:bg-[#16345E] text-xs font-semibold transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  Full Singapore Import Guide →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Four-Tier Origin Classification</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>Category A (Rabies-Free):</strong> Australia, New Zealand, UK, Republic of Ireland — <strong>0 days quarantine</strong>, no titer test required.
                    </li>
                    <li>
                      <strong>Category B (Controlled):</strong> Cayman Islands, Hong Kong, Japan, Norway, Sweden, Switzerland, USA (Hawaii &amp; Guam) — <strong>0 days quarantine</strong> with compliant vaccinations.
                    </li>
                    <li>
                      <strong>Category C (Low-Risk):</strong> Austria, Belgium, Canada, France, Germany, Italy, Netherlands, Spain, USA (mainland) — <strong>10 to 30 days quarantine</strong>, mandatory RNATT titer test.
                    </li>
                    <li>
                      <strong>Category D (Unlisted / Endemic):</strong> All other origins — <strong>30 days mandatory quarantine</strong> at Sembawang Animal Quarantine Centre (AQC).
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Permits &amp; Housing Rules</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>GoBusiness AVS Licence:</strong> Mandatory Electronic Import Licence obtained via GoBusiness within 30 days of arrival.
                    </li>
                    <li>
                      <strong>CAPQ / Sembawang Booking:</strong> Quarantine space at Sembawang AQC or inspection appointment at Changi Animal &amp; Plant Quarantine Station (CAPQ) must be confirmed prior to flight booking.
                    </li>
                    <li>
                      <strong>Mandatory Dog Licensing:</strong> All dogs must obtain an AVS dog licence before the import licence is issued.
                    </li>
                    <li>
                      <strong>Housing Restrictions:</strong> Housing &amp; Development Board (HDB) residential flats allow a maximum of 1 small approved dog breed or up to 2 approved cats under Project Love CATS.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80 text-xs text-zinc-700">
                <strong>Timeline Recommendation:</strong> For Category C &amp; D origins (including the US and Europe), begin preparations at least <strong>4 to 6 months</strong> prior to travel due to limited quarantine facility capacity at Sembawang AQC.
              </div>
            </div>

            {/* H3: Japan */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label="Japan">
                    🇯🇵
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Japan
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">
                      Authority: Ministry of Agriculture, Forestry and Fisheries (MAFF / AQS) • Rabies Prevention Law
                    </span>
                  </div>
                </div>
                <Link
                  href="/en/countries/japan"
                  className="px-3.5 py-1.5 rounded-lg bg-[#0E2342] text-white hover:bg-[#16345E] text-xs font-semibold transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  Full Japan Import Guide →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Sequential Statutory Protocol</h4>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>
                      <strong>ISO Microchip Implantation:</strong> Must occur before or concurrently with the first rabies vaccine.
                    </li>
                    <li>
                      <strong>Two Rabies Inoculations:</strong> Pet must receive 2 separate inactivated rabies vaccinations at least 30 days apart (within vaccine validity).
                    </li>
                    <li>
                      <strong>FAVN Rabies Titer Test:</strong> Blood draw on or after the second vaccine, tested at a MAFF-designated international laboratory (≥ 0.50 IU/mL).
                    </li>
                    <li>
                      <strong>180-Day Standstill Window:</strong> Pet must remain in the exporting country for at least 180 days post-blood draw to qualify for <strong>under 12-hour quarantine release</strong>.
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">MAFF Advance Approval &amp; Forms</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>40-Day Advance Notification:</strong> Must submit the official Notification for Import of Dogs/Cats to the Animal Quarantine Service (AQS) at the intended port of entry at least 40 days before landing.
                    </li>
                    <li>
                      <strong>Approval of Import Notification:</strong> MAFF issues an official Approval Certificate that must be presented at airline check-in and border customs.
                    </li>
                    <li>
                      <strong>MAFF Form A &amp; Form C:</strong> Endorsed clinical health certificates issued within 10 days of departure by USDA APHIS, CFIA, or DEFRA.
                    </li>
                    <li>
                      <strong>Quarantine Penalty:</strong> Arriving before the 180-day titer waiting period expires results in mandatory holding in a MAFF facility for the remainder of the 180-day window.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200/80 text-xs text-blue-900">
                <strong>Designated Japanese Entry Airports:</strong> Tokyo Narita (NRT), Tokyo Haneda (HND), Osaka Kansai (KIX), Nagoya Chubu (NGO), and Fukuoka (FUK). Arrivals at non-designated regional airports are strictly prohibited.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: COUNTRIES WITH SIMPLER RULES ────────────────── */}
      <section
        id="simpler-rules"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Streamlined Cross-Border Relocation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Countries With Simpler Rules
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              These sovereign jurisdictions offer low-friction entry frameworks for companion animals. When arriving from rabies-controlled or listed origin countries, pets do not require an advance import permit and qualify for immediate <strong>0-day direct clearance</strong> upon arrival.
            </p>
          </div>

          <div className="space-y-8">
            {/* H3: EU */}
            <div className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-200/70">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label="European Union">
                    🇪🇺
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      European Union (EU Member States)
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">
                      Authority: European Commission • Regulation (EU) No 576/2013 Harmonized Standard
                    </span>
                  </div>
                </div>
                <Link
                  href="/en/countries/germany"
                  className="px-3.5 py-1.5 rounded-lg bg-[#0E2342] text-white hover:bg-[#16345E] text-xs font-semibold transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  Explore EU Country Guides →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Harmonized 27-Nation Architecture</h4>
                  <p className="mb-3">
                    Under Regulation (EU) 576/2013, the exact same statutory rules apply whether you are immigrating to <strong>Germany, France, Spain, Italy, the Netherlands, Portugal, or Austria</strong>:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>ISO 11784/11785 Microchip:</strong> 15-digit transponder operating at 134.2 kHz.
                    </li>
                    <li>
                      <strong>Rabies Vaccination:</strong> Administered after microchipping. 21-day latency period required for primary vaccinations. 3-year boosters recognized if documentation is continuous.
                    </li>
                    <li>
                      <strong>No Import Permit Required:</strong> No government permit needed for personal non-commercial pet travel (up to 5 animals).
                    </li>
                    <li>
                      <strong>0 Days Quarantine:</strong> Direct entry and immediate release at all designated EU Border Inspection Posts (BIPs).
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">EU Health Certificate &amp; Exceptions</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>Annex IV Health Certificate:</strong> Standard bilingual non-commercial health certificate issued by a licensed vet and officially endorsed by USDA APHIS (via VEHCS digital seal) or CFIA within 10 days of arrival.
                    </li>
                    <li>
                      <strong>Rabies Titer Exemption:</strong> Pets arriving from Annex II Part 1 and Part 2 listed countries (e.g. USA, Canada, UK, Australia, Switzerland) are completely exempt from titer blood tests.
                    </li>
                    <li>
                      <strong>Tapeworm Exception:</strong> Dogs immigrating into <strong>Ireland, Malta, or Finland</strong> require a certified Praziquantel tapeworm treatment administered 24 to 120 hours before scheduled arrival.
                    </li>
                    <li>
                      <strong>EU Pet Passport:</strong> Once resident in an EU member state, a local authorized veterinarian can issue a standardized EU Pet Passport for seamless lifetime border crossings.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-zinc-200/80 text-xs text-zinc-700">
                <strong>EU High-Risk Origin Rule:</strong> If immigrating from an unlisted high-rabies nation (e.g. India, South Africa, Egypt, Colombia), the pet must pass a FAVN titer test followed by a mandatory <strong>3-month (90-day) waiting period</strong> in the origin country before EU entry is permitted.
              </div>
            </div>

            {/* H3: UK */}
            <div className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-200/70">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label="United Kingdom">
                    🇬🇧
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      United Kingdom (Great Britain)
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">
                      Authority: Department for Environment, Food &amp; Rural Affairs (DEFRA / APHA) • Animal Health Act
                    </span>
                  </div>
                </div>
                <Link
                  href="/en/countries/united-kingdom"
                  className="px-3.5 py-1.5 rounded-lg bg-[#0E2342] text-white hover:bg-[#16345E] text-xs font-semibold transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  Full UK Pet Immigration Guide →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Great Britain Pet Travel Scheme (GB PTS)</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>No Import Permit Needed:</strong> Great Britain does not issue advance pet import permits for personal relocation.
                    </li>
                    <li>
                      <strong>0 Days Quarantine:</strong> Compliant dogs and cats pass through border customs directly at London Heathrow (LHR HARC), Gatwick (LGW), or Manchester (MAN).
                    </li>
                    <li>
                      <strong>Microchip &amp; Rabies:</strong> ISO 11784/11785 microchip + rabies vaccination with a 21-day post-vaccination wait.
                    </li>
                    <li>
                      <strong>Great Britain Pet Health Certificate:</strong> Official GB health certificate endorsed by USDA APHIS, CFIA, or national agricultural ministry within 10 days of entry.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Mandatory UK Canine Rules &amp; Flight Logistics</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>Mandatory Tapeworm (Praziquantel) Treatment:</strong> All dogs must be treated for <em>Echinococcus multilocularis</em> by a licensed vet strictly <strong>24 to 120 hours (1 to 5 days)</strong> prior to arrival in the UK.
                    </li>
                    <li>
                      <strong>Manifest Cargo Mandate:</strong> Commercial airlines flying into the UK cannot carry pets in the passenger cabin or as checked baggage; animals must arrive as manifest cargo booked via an IPATA agent.
                    </li>
                    <li>
                      <strong>Banned Breeds:</strong> Pit Bull Terrier, Japanese Tosa, Dogo Argentino, Fila Brasileiro, and XL Bully (without certificate of exemption) are strictly prohibited.
                    </li>
                    <li>
                      <strong>UK Microchip Registration:</strong> Owners must register their pet’s microchip on a DEFRA-compliant UK database (e.g. Petlog, Identibase) within 30 days of arrival.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200/80 text-xs text-emerald-900">
                <strong>EU Pet Passport Note:</strong> Great Britain recognizes valid EU Pet Passports issued in EU member states for direct entry without requiring a separate GB Health Certificate.
              </div>
            </div>

            {/* Parent Comparison: Canada & United States */}
            <div className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-200/70">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label="North America">
                    🇨🇦 🇺🇸
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Canada &amp; United States (North American Framework)
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">
                      Authorities: CFIA / CBSA (Canada) &amp; CDC / USDA APHIS (USA)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/en/countries/canada"
                    className="px-3 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 text-xs font-semibold transition-colors"
                  >
                    Canada Guide
                  </Link>
                  <Link
                    href="/en/countries/united-states"
                    className="px-3 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 text-xs font-semibold transition-colors"
                  >
                    USA Guide
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">Canada Pet Immigration (CFIA / CBSA)</h4>
                  <p className="mb-2">
                    Canada offers one of the most streamlined pet immigration processes globally:
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li><strong>No Import Permit:</strong> Personal companion dogs/cats do not require an import permit.</li>
                    <li><strong>0 Days Quarantine:</strong> Direct clearance at Canada Border Services Agency (CBSA) ports.</li>
                    <li><strong>Rabies Certificate:</strong> Valid rabies vaccination certificate signed by a licensed veterinarian.</li>
                    <li><strong>Inspection Fee:</strong> Flat CBSA documentary inspection fee (~$30 CAD + tax) upon entry.</li>
                    <li><strong>Titer Test:</strong> Not required for personal pets.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-2">United States Pet Immigration (CDC 2024–2026)</h4>
                  <p className="mb-2">
                    Under updated CDC dog import regulations enforced nationwide:
                  </p>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li><strong>CDC Dog Import Form:</strong> Mandatory free online submission receipt required for all dogs.</li>
                    <li><strong>Minimum Age:</strong> Dogs must be at least 6 months old at time of entry.</li>
                    <li><strong>ISO Microchip:</strong> Mandatory 15-digit microchip implanted before rabies vaccination.</li>
                    <li><strong>Low-Risk Origins:</strong> 0 days quarantine with CDC Dog Import receipt and valid microchip.</li>
                    <li><strong>High-Risk Origins:</strong> Requires CDC Foreign Rabies Form + titer or revaccination at CDC facility.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: DOGS VS CATS NUANCES ─────────────────────────── */}
      <section id="species-differences" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Species-Specific Statutes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Dogs vs. Cats: Key Regulatory Differences
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Veterinary entry protocols differ significantly between canines and felines. Understanding these statutory nuances prevents border inspection delays or quarantine detentions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Canine Profile */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl border border-emerald-200/80">
                  🐕
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900">
                  Canine Immigration Rules (Dogs)
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>Tapeworm (Echinococcus multilocularis):</strong> Mandatory Praziquantel treatment 24–120 hours before arrival for UK, Ireland, Finland, Malta, and Norway.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>Breed-Specific Legislation (BSL):</strong> Strict bans or mandatory temperament testing on Pit Bulls, Dogo Argentinos, Fila Brasileiros, Japanese Tosas, and XL Bullies in the UK, Australia, Singapore, UAE, Germany, and Ontario.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>Serological Blood Panels:</strong> Mandatory Brucella canis, Leishmania infantum, and Ehrlichia canis antibody tests for Australia, New Zealand, and South Africa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>CDC 6-Month Age Rule:</strong> The United States enforces a strict 6-month minimum age requirement for all imported dogs.</span>
                </li>
              </ul>
            </div>

            {/* Feline Profile */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center text-xl border border-indigo-200/80">
                  🐈
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900">
                  Feline Immigration Rules (Cats)
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>Exemption from Tapeworm:</strong> Cats are universally exempt from Echinococcus multilocularis tapeworm treatments across all European and UK jurisdictions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>Hybrid Cat Restrictions:</strong> Savannah cats, Bengal cats, Safari cats, and Chausies within generations F1 to F4 are strictly banned or restricted in Australia, Singapore, UK, and EU member states.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>Core Feline Vaccines (FVRCP):</strong> Singapore, UAE, Japan, and Australia require certification of Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia vaccination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-zinc-900 shrink-0">•</span>
                  <span><strong>Rabies Exemption in Canada:</strong> Cats imported into Canada from officially recognized rabies-free countries do not require rabies vaccination.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT READINESS CHECK CTA ──────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white border-t border-zinc-200/80 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFB] rounded-2xl border border-zinc-200/90 p-7 sm:p-10 lg:p-12 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Authentic Problem-Solving Copy */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Pre-Departure Document Check</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0E2342] leading-tight">
                  Is your pet&apos;s paperwork ready for departure?
                </h2>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
                  A single misplaced date, unendorsed health certificate, or incorrect vaccination sequence can lead to flight denials or unexpected quarantine. Check your paperwork against official entry rules before you travel.
                </p>

                {/* 3 Practical Feature Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-700">
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Microchip &amp; rabies sequence verification</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Quarantine risk &amp; titer clock validation</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Tapeworm &amp; endorsement deadlines</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean White Action Card */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-zinc-200/90 shadow-sm space-y-4 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Free Instant Check
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#0E2342] mb-1.5">
                    Verify Your Pet&apos;s Travel Dossier
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Upload your pet&apos;s vaccination records, vet certificate, or titer report to receive a route-specific readiness breakdown.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <Link
                    href="/en/checker"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.99]"
                  >
                    <span>Start Document Check</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <Link
                    href="/en/pet-travel"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80 font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>Browse 50+ Flight Corridors</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>100% Private</span>
                  </span>
                  <span>⚡ Instant Check</span>
                  <span>📋 Official Statutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FAQS ─────────────────────────────────────────── */}
      <section id="immigration-faqs" className="py-12 sm:py-16 bg-white border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Regulatory Guidance &amp; Clarifications
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Frequently Asked Questions About Pet Immigration
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Authoritative answers to common questions regarding international pet immigration requirements, import permit workflows, quarantine waiting windows, and government health certificates.
            </p>
          </div>

          <FaqAccordion items={PET_IMMIGRATION_FAQS} columns={2} defaultOpenIndex={0} />
        </div>
      </section>
    </div>
  );
}
