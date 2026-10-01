import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCountries } from '@/lib/data/countries';
import CountryDirectorySearch from '@/components/CountryDirectorySearch';
import FaqAccordion from '@/components/FaqAccordion';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Pet Import Requirements by Country: 2026 Global Directory | PawValid',
  description:
    'Comprehensive statutory pet import requirements, quarantine periods, blood titer testing rules, and official government health certificate protocols for the top 15 international pet travel destinations.',
  keywords: [
    'pet import',
    'pet import requirements',
    'pet import rules by country',
    'dog import',
    'cat import',
    'international pet import guide',
    'veterinary health certificate import',
  ],
  alternates: getHreflangAlternates('/countries'),
  openGraph: {
    title: 'Pet Import Requirements by Country: 2026 Global Directory | PawValid',
    description:
      'Comprehensive statutory pet import requirements, quarantine periods, blood titer testing rules, and official government health certificate protocols for international dog and cat arrivals.',
    url: 'https://pawvalid.online/en/countries',
    siteName: 'PawValid',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Import Requirements by Country: 2026 Global Directory | PawValid',
    description:
      'Comprehensive statutory pet import requirements, quarantine periods, blood titer testing rules, and official government health certificate protocols.',
  },
};

const DIRECTORY_FAQS = [
  {
    q: 'What is pet import and what documents are required?',
    a: 'Pet import refers to the legal, veterinary, and customs process of transporting a domestic companion animal (such as a dog or cat) into a sovereign nation or territory. Standard statutory requirements across all countries include an ISO 11784/11785 compliant microchip, an up-to-date rabies vaccination administered after microchipping, an endorsed Veterinary Health Certificate (or electronic VEHCS submission), and, where mandated by biosecurity law, advance import permits, rabies titer (FAVN/RNATT) testing, and internal/external parasite treatments.',
  },
  {
    q: 'Why do pet import rules vary significantly by destination country?',
    a: 'Pet entry regulations are established by each sovereign country\'s national veterinary authority (e.g., DEFRA in the UK, USDA APHIS in the US, DAFF in Australia, BMEL in Germany) to protect domestic animal populations and public health against rabies, Echinococcus multilocularis tapeworms, screw-worm, and other communicable zoonotic diseases.',
  },
  {
    q: 'What is the difference between Rabies-Free, Rabies-Controlled, and High-Rabies destination rules?',
    a: 'Rabies-free island territories like Australia, Japan, and Singapore enforce strict mandatory RNATT blood titer testing and post-arrival quarantine. Rabies-controlled countries like the United States, United Kingdom, and European Union member states permit direct entry with accredited health certificates and standard rabies vaccinations from qualifying origins without quarantine.',
  },
  {
    q: 'How far in advance should I start preparing my pet for international travel?',
    a: 'Preparation lead time ranges from 21 days (for standard rabies vaccination latency into the EU or Mexico) to 6–7 months (for strict biosecurity destinations like Australia, Japan, or Singapore requiring RNATT blood titer testing and post-titer waiting periods).',
  },
  {
    q: 'What official document is required to board an international flight with a dog or cat?',
    a: 'A destination-specific bilingual Veterinary Health Certificate issued by an accredited veterinarian and officially endorsed (with physical ink stamp or electronic VEHCS seal) by the national agricultural or veterinary ministry of the exporting country.',
  },
];

export default function CountriesIndexPage() {
  const countries = getAllCountries();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Pet Import Directory', url: '/en/countries' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(DIRECTORY_FAQS);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* ─── JSON-LD SCHEMAS ────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">Pet Import Directory</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Verified to September 21, 2026 Standards</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO HEADER ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Global Pet Import Hub &amp; Statutory Entry Protocols
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-3">
              Pet Import Requirements by Destination Country
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Authoritative border control protocols, blood titer requirements, mandatory quarantine rules, and government health certificate procedures for international dog and cat arrivals across the top 15 global destinations.
            </p>

            {/* Direct Definition Callout Box */}
            <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-5 sm:p-6 text-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  Direct Answer • Pet Import Definition &amp; Statutory Basics
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-700">
                <strong>What is pet import?</strong> Pet import is the formal process of legally transporting a dog, cat, or other domestic animal into a foreign country in compliance with national veterinary public health laws. Every destination enforces specific requirements—including <strong>ISO 15-digit microchipping</strong>, <strong>rabies vaccination timelines</strong>, <strong>FAVN blood titer tests</strong>, <strong>tapeworm deworming</strong>, and <strong>government-endorsed health certificates</strong>—to prevent the entry of communicable diseases.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-100">
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Destinations</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">15 Countries</strong>
              <span className="text-[11px] text-zinc-400">Global Coverage</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Legal Basis</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">100% Sourced</strong>
              <span className="text-[11px] text-zinc-400">Official Gov Statutes</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Verification</span>
              <strong className="text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5 block">Current</strong>
              <span className="text-[11px] text-zinc-400">Sept 21, 2026</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Flight Corridors</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">15+ Routes</strong>
              <span className="text-[11px] text-zinc-400">Linked Checklists</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. INTERACTIVE SEARCH & COUNTRY CARDS ───────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="section-container">
          <CountryDirectorySearch countries={countries} />
        </div>
      </section>

      {/* ─── 4. REGULATORY FRAMEWORK GUIDE ───────────────────────────────── */}
      <section className="py-12 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Global Biosecurity Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Understanding Destination Country Classifications
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
              Every country categorizes arriving pets based on rabies prevalence in the origin country and strict biosecurity frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-2">
                Rabies-Free &amp; Controlled Entries
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                Destinations like the United Kingdom, European Union (Germany, France, Spain, Italy), and Canada permit direct import without quarantine if your pet has a valid ISO microchip, rabies vaccine, and endorsed health certificate.
              </p>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Typical Lead Time: 21–30 Days
              </span>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-2">
                Mandatory RNATT Titer &amp; Quarantine
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                High-biosecurity island nations such as Australia, Japan, and Singapore require an approved FAVN/RNATT rabies titer blood test (≥ 0.5 IU/ml) and a statutory waiting period of up to 180 days, plus mandatory post-arrival quarantine stays.
              </p>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                Typical Lead Time: 4–7 Months
              </span>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-2">
                Import Permits &amp; Border Inspection
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                Countries like the UAE (MOCCAE), Australia (BICON), and Singapore (AVS) require advance electronic import permits issued prior to departure. Unpermitted animals are refused entry at the port of arrival and returned at owner expense.
              </p>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Permit Validity: 30–60 Days
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. FREQUENTLY ASKED QUESTIONS ──────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Destination Country Pet Import FAQs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              Learn about global biosecurity tiers, quarantine waiting periods, and airline paperwork.
            </p>
          </div>

          <FaqAccordion items={DIRECTORY_FAQS} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ─── 6. CONVERSION BANNER ────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-zinc-50/90 rounded-2xl border border-zinc-200/90 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Automated Route Scanner</span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                    Unsure if your pet meets international entry laws?
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Upload your pet&apos;s vaccination records and microchip certificates. We verify rabies vaccination dates, mandatory 21-day latency clocks, titer windows, and sovereign health certificate deadlines in seconds.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/en/checker"
                    className="inline-flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                  >
                    <span>Run Route Assessment Free</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="pt-1 flex items-center gap-4 text-xs text-zinc-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Verified border statutes</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Instant date gap analysis</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>No credit card required</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white rounded-xl border border-zinc-200/90 p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                    <span className="text-xs font-bold text-zinc-800">
                      Automated Verification
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      120+ Destinations
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-zinc-600">
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">
                        ✓
                      </span>
                      <span>Origin risk tier classification (Rabies-free, controlled, unlisted)</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">
                        ✓
                      </span>
                      <span>Quarantine avoidance eligibility (0-day direct release checks)</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">
                        ✓
                      </span>
                      <span>Endorsement checklist and mandatory pre-flight timeline</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
