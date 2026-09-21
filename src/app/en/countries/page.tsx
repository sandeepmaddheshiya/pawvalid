import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCountries } from '@/lib/data/countries';
import CountryDirectorySearch from '@/components/CountryDirectorySearch';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Pet Import Rules by Country — Statutory Destination Guides (2026) | PawValid',
  description:
    'Comprehensive statutory pet import requirements, quarantine periods, blood titer testing rules, and official government health certificate protocols for the top 15 international pet travel destinations.',
  alternates: {
    canonical: 'https://pawvalid.online/en/countries',
  },
};

const DIRECTORY_FAQS = [
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
    { name: 'Destination Countries', url: '/en/countries' },
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
            <span className="font-semibold text-zinc-900">Destination Countries</span>
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
              Statutory Entry Protocols
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-3">
              Pet Import Requirements by Destination Country
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Authoritative border control protocols, blood titer requirements, mandatory quarantine rules, and government health certificate procedures for international dog and cat arrivals across the top 15 global destinations.
            </p>
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
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              Destination Country Pet Import FAQs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIRECTORY_FAQS.map((faq, i) => (
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
        </div>
      </section>

      {/* ─── 6. CONVERSION BANNER ────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-[#08162A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                Automated Route Scanner
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                Unsure if your pet meets your destination country\'s laws?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                Upload your pet\'s vaccination certificate and microchip records. We verify rabies vaccination timelines, 21-day latency clocks, and government health certificate deadlines in seconds.
              </p>
              <Link
                href="/en/assessment"
                className="inline-flex items-center gap-2 bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Run Free Route Compliance Assessment</span>
                <span>→</span>
              </Link>
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-400 flex-wrap">
                <span>✓ Verified to Official Border Statutes</span>
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
