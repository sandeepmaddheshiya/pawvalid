import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COUNTRIES, getCountryBySlug } from '@/lib/data/countries';
import FreshnessIndicator from '@/components/FreshnessIndicator';
import BrowseRequirementsChecklist from '@/components/BrowseRequirementsChecklist';
import {
  getFaqSchema,
  getBreadcrumbSchema,
  getMedicalWebPageSchema,
  BASE_URL,
} from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

interface CountryPageProps {
  params: Promise<{
    country: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(COUNTRIES).map((slug) => ({
    country: slug,
  }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    return {
      title: 'Destination Pet Import Guide Not Found | PawValid',
    };
  }

  const title = `Pet Travel & Import Requirements for ${country.name} (2026 Guide) | PawValid`;
  const description = `Official statutory entry regulations for dogs and cats traveling to ${country.name}. Quarantine periods, rabies titer testing, authorized veterinary health certificates, and border inspection protocols verified against ${country.authority}.`;

  return {
    title,
    description,
    keywords: [
      `pet import ${country.name.toLowerCase()}`,
      `pet travel ${country.name.toLowerCase()}`,
      `pet travel to ${country.name.toLowerCase()}`,
      country.slug === 'australia' ? 'australian pet passport' : `${country.name.toLowerCase()} pet passport`,
      `dog import ${country.name.toLowerCase()}`,
      `cat passport ${country.name.toLowerCase()}`,
      `${country.name.toLowerCase()} pet quarantine`,
      `${country.authority.toLowerCase()}`,
    ],
    alternates: getHreflangAlternates(`/countries/${country.slug}`),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/en/countries/${country.slug}`,
      siteName: 'PawValid',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function DestinationCountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Pet Import Directory', url: '/en/countries' },
    { name: country.name, url: `/en/countries/${country.slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(country.faqs);
  const medicalWebPageSchema = getMedicalWebPageSchema({
    name: `${country.name} Pet Import & Travel Compliance Standard`,
    description: country.description,
    url: `/en/countries/${country.slug}`,
    authority: country.authority,
    authorityUrl: country.authorityUrl,
    lastReviewed: '2026-09-21',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity & Compliance Consultant',
  });

  const checkerHref = `/en/assessment?destCountry=${country.code}`;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />

      {/* ─── 1. BREADCRUMBS & VERIFICATION HEADER ───────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/countries" className="hover:text-zinc-900 transition-colors font-medium">Pet Import Hub</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">{country.name}</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Border Statutes Verified: September 21, 2026</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO / DIRECT ANSWER INTRO ──────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-10 sm:py-14">
        <div className="section-container">
          <div className="max-w-4xl">
            {/* Country Flag & Code Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl leading-none">{country.flag}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-xs font-mono font-bold">
                ISO: {country.code}
              </span>
              <span className="text-xs text-zinc-500 font-semibold">• {country.region}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-3">
              {country.headline}
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              {country.description}
            </p>

            {/* Regulatory Authority Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900">National Veterinary Authority:</span>
                  <a
                    href={country.authorityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>{country.authority}</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="w-full sm:w-auto flex items-center gap-2 text-zinc-500">
                  <span className="font-semibold text-zinc-700">Legal Basis:</span>
                  <span className="font-mono text-[11px] text-zinc-600">{country.legalBasis}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200 w-full sm:w-auto">
                <span>Clinical Review:</span>
                <Link
                  href="/en/editorial-policy#review-board"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Dr. Sarah Miller, DVM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. DIRECT ANSWER / AEO FAST SUMMARY ────────────────────────── */}
      <section className="py-8 bg-emerald-50/40 border-b border-emerald-100">
        <div className="section-container">
          <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 sm:p-8 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                ⚡
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                  Direct Statutory Compliance Summary
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-zinc-900 mb-2">
                  What is required to enter {country.name} with a dog or cat?
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  To import a dog or cat into <strong>{country.name}</strong>, pets must have an ISO 11784/11785 15-digit microchip implanted <em>prior</em> to rabies vaccination. Rabies titer testing is <strong>{country.titerRequired}</strong>. Standard quarantine duration is <strong>{country.quarantineDays}</strong> when all official health certificate protocols are fulfilled. Minimum preparation lead time is <strong>{country.leadTime}</strong>. Entry documents must be issued on an official <strong>{country.certificateType}</strong> endorsed by the exporting government.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. FOUR DECISION PILLARS ───────────────────────────────────── */}
      <section className="py-10 sm:py-12">
        <div className="section-container">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Core Compliance Parameters
            </span>
            <h2 className="text-2xl font-serif font-bold text-zinc-900 tracking-tight">
              The 4 Pillars of {country.name} Pet Entry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pillar 1: Rabies Titer */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">1. Rabies Titer</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    country.titerStatus === 'exempt'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : country.titerStatus === 'mandatory'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}>
                    {country.titerStatus.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5">{country.titerRequired}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{country.titerDetail}</p>
                {country.titerStatus !== 'exempt' && (
                  <div className="pt-2.5 mt-2.5 border-t border-zinc-100">
                    <Link
                      href="/en/guides/rabies-titer-test-favn-guide"
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
                    >
                      <span>FAVN rabies titer requirements guide</span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Pillar 2: Quarantine */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">2. Quarantine</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                    BIOSECURITY
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5">{country.quarantineDays}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{country.quarantineDetail}</p>
              </div>
            </div>

            {/* Pillar 3: Lead Time */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">3. Lead Time</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                    LATENCY
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5">{country.leadTime}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{country.leadTimeDetail}</p>
              </div>
            </div>

            {/* Pillar 4: Health Certificate */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">4. Health Certificate</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                    OFFICIAL
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5">{country.certificateType}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{country.certificateDetail}</p>
                <div className="pt-2.5 mt-2.5 border-t border-zinc-100">
                  <Link
                    href="/en/guides/usda-aphis-vehcs-guide"
                    className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition-colors"
                  >
                    <span>USDA APHIS VEHCS endorsement process</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. INBOUND FLIGHT CORRIDORS (IF PRESENT) ──────────────────── */}
      {country.inboundCorridors.length > 0 && (
        <section className="py-8 bg-zinc-100/70 border-y border-zinc-200/80">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Origin-Specific Guides
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                  Verified Inbound Routes to {country.name}
                </h2>
              </div>
              <span className="text-xs text-zinc-500 font-semibold">
                {country.inboundCorridors.length} Verified Corridors Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {country.inboundCorridors.map((c) => (
                <Link
                  key={c.corridorSlug}
                  href={`/en/pet-travel/${c.corridorSlug}`}
                  className="group bg-white rounded-xl border border-zinc-200/90 hover:border-emerald-500/60 p-4 shadow-2xs hover:shadow-sm transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl leading-none">{c.originFlag}</div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                        {c.originName} to {country.name}
                      </h3>
                      <span className="text-[11px] text-zinc-500">Lead time: {c.leadTime}</span>
                    </div>
                  </div>
                  <span className="text-zinc-400 group-hover:text-emerald-700 transition-colors font-bold">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. INTERACTIVE REQUIREMENTS CHECKLIST ───────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Interactive Compliance Checker
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
              {country.name} Statutory Requirements Checklist
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Check off your pet&apos;s veterinary records to identify compliance gaps before departure. Your progress is saved locally.
            </p>
          </div>

          <BrowseRequirementsChecklist
            routeSlug={`destination-${country.slug}`}
            origin="International Origins (Global)"
            destination={country.name}
            originCode="GLOBAL"
            destCode={country.code}
            authority={country.authority}
            legalBasis={country.legalBasis}
            leadTime={country.leadTime}
            titerRequired={country.titerRequired}
            quarantineDays={country.quarantineDays}
            certificateType={country.certificateType}
            requirements={country.statutoryRequirements}
            restrictedBreeds={country.restrictedBreeds}
          />
        </div>
      </section>

      {/* ─── 7. ENTRY AIRPORTS & BREED RESTRICTIONS ──────────────────────── */}
      <section className="py-10 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Approved Entry Ports */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Designated Border Control Posts
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                Approved Ports of Entry in {country.name}
              </h3>
              <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
                Pets must arrive at designated international airports or ports equipped with official veterinary border inspection posts (BIPs):
              </p>
              <ul className="space-y-1 text-xs text-zinc-800 font-medium">
                {country.entryAirports.map((port, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>{port}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Breed Restrictions or Biosecurity Notice */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Statutory Breed &amp; Welfare Restrictions
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                Restricted Dog Breeds &amp; Exceptions
              </h3>
              {country.restrictedBreeds && country.restrictedBreeds.length > 0 ? (
                <>
                  <p className="text-xs text-amber-900 mb-3 leading-relaxed">
                    National legislation prohibits or strictly conditions the importation of specific breeds:
                  </p>
                  <ul className="space-y-1 text-xs text-amber-950 font-medium">
                    {country.restrictedBreeds.map((breed, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>{breed}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {country.name} does not maintain an outright statutory ban on specific dog breeds for non-commercial entry, provided all standard health certificate, microchip, and rabies vaccination statutes are strictly fulfilled.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. DEDICATED CAT PASSPORT & FELINE REGULATIONS ─────────────── */}
      <section id="cats" className="py-12 bg-[#F3F7F5] border-t border-emerald-900/10 scroll-mt-6">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-2">
              <span>🐱 Species-Specific Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
              {country.catGuidance?.headline || `Cat Passport & Feline Travel Rules for ${country.name}`}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              {country.catGuidance?.summary ||
                `Official statutory entry guidelines for domestic cats and kittens entering ${country.name}. Covers rabies vaccination, microchip requirements, pet passport validity, and quarantine exemptions.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* 1. Rabies & Kittens */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200/80">
                  Rabies &amp; Age
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-zinc-900 mb-1.5">
                Rabies Vaccine &amp; Kittens
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.rabiesRules ||
                  `Standard rabies vaccination required for cats 3 months of age or older before entering ${country.name}.`}
              </p>
            </div>

            {/* 2. Microchip Policy */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80">
                  Identification
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-zinc-900 mb-1.5">
                Cat Microchip Standard
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.microchipRules ||
                  `ISO 11784/11785 15-digit microchip is strongly recommended and mandatory for airline transport.`}
              </p>
            </div>

            {/* 3. Quarantine & Titer */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  Quarantine &amp; Titer
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-zinc-900 mb-1.5">
                Quarantine Duration
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.quarantineRules || country.quarantineDetail}
              </p>
            </div>

            {/* 4. Health Certificate & Passports */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80">
                  Documentation
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-zinc-900 mb-1.5">
                Cat Passport &amp; Health Cert
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.healthCertRules || country.certificateDetail}
              </p>
            </div>
          </div>

          {/* Checklist & Hybrid Breeds Callout */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-3">
              <h3 className="font-serif text-base font-bold text-zinc-900">
                Statutory Cat Travel Checklist ({country.name})
              </h3>
              <ul className="space-y-2 text-xs text-zinc-700">
                {(country.catGuidance?.checklist || [
                  `Official bilingual veterinary health certificate or pet passport.`,
                  `Valid rabies vaccination certificate with vaccine manufacturer and lot number.`,
                  `15-digit ISO microchip recorded on all veterinary paperwork.`,
                  `Statutory customs port inspection upon airport arrival.`,
                ]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-xs space-y-2">
              <span className="font-bold text-zinc-900 uppercase tracking-wider text-[10px] block">
                Hybrid Cat Breeds (Bengal &amp; Savannah)
              </span>
              <p className="text-zinc-600 leading-relaxed">
                {country.catGuidance?.hybridCatRules ||
                  `Domestic cat crosses with wild species (such as F1–F4 Bengal or Savannah cats) may require CITES permits. Check wildlife import regulations prior to flight.`}
              </p>
              <div className="pt-2">
                <Link
                  href={`/en/checker`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline underline-offset-2"
                >
                  <span>Verify Cat Documents with AI Checker</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. OFFICIAL BIOSECURITY GUIDES & MANUALS ─────────────────── */}
      <section className="py-10 bg-zinc-50 border-t border-zinc-200/80">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Official Regulatory Manuals
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                Recommended Pet Travel Guides for {country.name}
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
            {/* Guide 1: FAVN Titer Guide */}
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
                  FAVN Rabies Titer Test Guide (2026)
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Understand the ≥ 0.50 IU/mL antibody threshold, approved international laboratories (KSU, Auburn, ANSES), and post-draw waiting clocks enforced by {country.authority}.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>FAVN rabies titer requirements</span>
                <span>→</span>
              </div>
            </Link>

            {/* Guide 2: USDA APHIS VEHCS Guide */}
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
                  USDA APHIS VEHCS Endorsement Guide
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  How to obtain sovereign veterinary endorsement for international health certificates within the mandatory 10-day pre-flight examination window.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>USDA APHIS VEHCS endorsement process</span>
                <span>→</span>
              </div>
            </Link>

            {/* Guide 3: IATA Crate Guide */}
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
                  IATA-Approved Dog Crate Requirements
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Official mathematical sizing formulas (CR-1), mandatory metal nuts and bolts hardware, four-sided ventilation, and dangerous breed CR-82 guidelines.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read IATA Crate Guide</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 9. DESTINATION FAQS ────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Practical Guidance</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              Frequently Asked Questions: {country.name} Pet Import
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {country.faqs.map((faq, i) => (
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

      {/* ─── 9. GLOBAL PET IMPORT HUB BACKLINK ─────────────────────────── */}
      <section className="py-8 bg-zinc-50 border-t border-zinc-200/80">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-base font-bold text-zinc-900">
              Need Pet Import Requirements for Other Countries?
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">
              Compare biosecurity protocols, rabies titer rules, and quarantine lead times across 15+ destination guides.
            </p>
          </div>
          <Link
            href="/en/countries"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 border border-zinc-200 hover:border-emerald-300 px-4 py-2.5 rounded-xl transition-all shadow-2xs whitespace-nowrap"
          >
            <span>← Browse All Pet Import Requirements &amp; Guides</span>
          </Link>
        </div>
      </section>

      {/* ─── 10. CONVERSION CTA BANNER ──────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-[#08162A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                Destination Compliance Engine
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                Traveling to {country.name} with your pet?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                Upload your pet&apos;s vaccination records and microchip certificate. We scan your paperwork against official {country.authority} border rules to verify date sequences, rabies latency, and health certificate deadlines.
              </p>
              <Link
                href={checkerHref}
                className="inline-flex items-center gap-2 bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Run Free {country.name} Compliance Assessment</span>
                <span>→</span>
              </Link>
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-400 flex-wrap">
                <span>✓ Verified to {country.legalBasis.split('&')[0].trim()}</span>
                <span>•</span>
                <span>✓ Instant PDF Gap Analysis</span>
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
