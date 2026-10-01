import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COUNTRIES, getCountryBySlug } from '@/lib/data/countries';
import BrowseRequirementsChecklist from '@/components/BrowseRequirementsChecklist';
import CountryRouteFinder from '@/components/CountryRouteFinder';
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

  const checkerHref = `/en/checker?destination=${country.code}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
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

      {/* ─── TOP BREADCRUMB & VERIFICATION BAR ──────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-2.5 text-xs text-zinc-500 sticky top-0 z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs font-medium">
            <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/countries" className="hover:text-zinc-900 transition-colors">
              Pet Import Hub
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900 flex items-center gap-1">
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Statutory Regulations Verified • September 2026</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION: DUAL-COLUMN WITH EDITORIAL PHOTOGRAPHY ───────── */}
      <section className="bg-white border-b border-zinc-200/80 pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading, Executive Summary, Authority Trust & Actions */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Country Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0E2342] text-white text-xs font-semibold shadow-2xs">
                  <span className="text-base leading-none">{country.flag}</span>
                  <span>{country.name}</span>
                </span>
                <span className="px-2 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono font-bold border border-zinc-200">
                  ISO: {country.code}
                </span>
                <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/60">
                  {country.region}
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
                  {country.name} Pet Import &amp; Biosecurity Regulations
                </h1>
                <p className="text-sm font-semibold text-emerald-700 mt-1.5 uppercase tracking-wider">
                  Official Statutory Guidelines (2026 Standards)
                </p>
              </div>

              {/* Clear Executive Summary */}
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                Official biosecurity entry protocols for domestic dogs and cats traveling to <strong>{country.name}</strong>. Enforces mandatory ISO 11784/11785 microchipping, rabies serology titer tests, authorized veterinary health certificates, and airport border inspection procedures.
              </p>

              {/* Regulatory Authority Metadata Box */}
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-xs text-zinc-600 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900">National Authority:</span>
                  <a
                    href={country.authorityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 inline-flex items-center gap-1"
                  >
                    <span>{country.authority}</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="pt-2 border-t border-zinc-200/80 flex items-center justify-between text-xs text-zinc-500 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-zinc-700">Statute:</span>
                    <span className="font-mono text-[11px] text-zinc-600">{country.legalBasis}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Reviewed by</span>
                    <Link
                      href="/en/editorial-policy#review-board"
                      className="font-semibold text-zinc-900 hover:text-emerald-700 hover:underline"
                    >
                      Dr. Sarah Miller, DVM
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href={checkerHref}
                  className="inline-flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg shadow-xs hover:shadow transition-all active:scale-[0.99] cursor-pointer text-center"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Scan {country.name} Travel Documents</span>
                </Link>

                <a
                  href="#checklist"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-xs sm:text-sm px-4 py-3 rounded-lg border border-zinc-200 shadow-2xs hover:border-zinc-300 transition-all text-center"
                >
                  <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>Interactive Checklist</span>
                </a>
              </div>

            </div>

            {/* Right Column: High-Resolution Travel Photography */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl border border-zinc-200/90 overflow-hidden shadow-xs bg-zinc-100 group">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-200">
                  <Image
                    src="/country-hero-travel.jpg"
                    alt={`International pet travel preparation and clearance for ${country.name}`}
                    width={800}
                    height={600}
                    priority
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-white border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1.5 font-medium text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>IATA &amp; {country.authority} Travel Standards</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-600 font-semibold uppercase">2026 Verified</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── QUICK NAVIGATION SUB-NAV ────────────────────────────────────── */}
      <div className="bg-white border-b border-zinc-200/80 py-2.5 sticky top-10 z-20 shadow-2xs">
        <div className="section-container">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-semibold text-zinc-600">
            <span className="text-zinc-400 uppercase tracking-wider text-[10px] shrink-0 mr-1">Jump to:</span>
            <a href="#pillars" className="px-2.5 py-1 rounded-md hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors">
              The 4 Pillars
            </a>
            <a href="#checklist" className="px-2.5 py-1 rounded-md hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors">
              Statutory Checklist
            </a>
            {country.inboundCorridors.length > 0 && (
              <a href="#corridors" className="px-2.5 py-1 rounded-md hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors">
                Inbound Corridors ({country.inboundCorridors.length})
              </a>
            )}
            <a href="#ports-breeds" className="px-2.5 py-1 rounded-md hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors">
              Entry Ports &amp; Breeds
            </a>
            <a href="#cats" className="px-2.5 py-1 rounded-md hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors">
              Cat Travel Guide
            </a>
            <a href="#guides" className="px-2.5 py-1 rounded-md hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors">
              Regulatory Manuals
            </a>
            <a href="#faqs" className="px-2.5 py-1 rounded-md hover:bg-zinc-100 hover:text-zinc-900 whitespace-nowrap transition-colors">
              FAQs
            </a>
          </div>
        </div>
      </div>

      {/* ─── SECTION: THE 4 STATUTORY PILLARS ────────────────────────────── */}
      <section id="pillars" className="py-10 sm:py-14 scroll-mt-24">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Core Biosecurity Parameters
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              The 4 Pillars of {country.name} Pet Entry
            </h2>
            <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
              Every dog or cat imported into {country.name} is assessed against these 4 statutory requirements under {country.legalBasis}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 1: Rabies Titer */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    country.titerStatus === 'exempt'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : country.titerStatus === 'mandatory'
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-zinc-100 text-zinc-800 border-zinc-200'
                  }`}>
                    {country.titerStatus.toUpperCase()}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  1. Rabies Titer (RNATT)
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5 leading-snug">
                  {country.titerRequired}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {country.titerDetail}
                </p>
              </div>

              {country.titerStatus !== 'exempt' && (
                <div className="pt-3 mt-3 border-t border-zinc-100">
                  <Link
                    href="/en/guides/rabies-titer-test-favn-guide"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center justify-between group transition-colors"
                  >
                    <span>FAVN rabies titer testing guide</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Pillar 2: Quarantine */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-[#0E2342] flex items-center justify-center font-bold text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                    BIOSECURITY
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  2. Quarantine Duration
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5 leading-snug">
                  {country.quarantineDays}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {country.quarantineDetail}
                </p>
              </div>
            </div>

            {/* Pillar 3: Lead Time */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-[#0E2342] flex items-center justify-center font-bold text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                    TIMELINE
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  3. Preparation Window
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5 leading-snug">
                  {country.leadTime}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {country.leadTimeDetail}
                </p>
              </div>
            </div>

            {/* Pillar 4: Health Certificate */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                    OFFICIAL
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  4. Authorized Certificate
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5 leading-snug">
                  {country.certificateType}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {country.certificateDetail}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-100">
                <Link
                  href="/en/guides/usda-aphis-vehcs-guide"
                  className="text-xs font-semibold text-zinc-800 hover:text-emerald-700 flex items-center justify-between group transition-colors"
                >
                  <span>Official endorsement process</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION: INBOUND FLIGHT CORRIDORS ───────────────────────────── */}
      {country.inboundCorridors.length > 0 && (
        <section id="corridors" className="py-10 bg-white border-y border-zinc-200/80 scroll-mt-24">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  Origin-Specific Routes
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  Verified Inbound Corridors to {country.name}
                </h2>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200 self-start sm:self-auto">
                {country.inboundCorridors.length} Verified Corridors
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5">
                <CountryRouteFinder
                  destName={country.name}
                  destCode={country.code}
                  destFlag={country.flag}
                  inboundCorridors={country.inboundCorridors}
                />
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {country.inboundCorridors.map((c) => (
                  <Link
                    key={c.corridorSlug}
                    href={`/en/pet-travel/${c.corridorSlug}`}
                    className="group bg-zinc-50 hover:bg-white rounded-xl border border-zinc-200/90 hover:border-emerald-500/60 p-4 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl leading-none">{c.originFlag}</div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                          {c.originName} → {country.name}
                        </h3>
                        <span className="text-xs text-zinc-500">Lead time: {c.leadTime}</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-md bg-white group-hover:bg-emerald-50 text-zinc-400 group-hover:text-emerald-700 flex items-center justify-center font-bold text-xs border border-zinc-200 group-hover:border-emerald-200 transition-all shrink-0">
                      →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── SECTION: INTERACTIVE REQUIREMENTS CHECKLIST ─────────────────── */}
      <section id="checklist" className="py-12 sm:py-16 scroll-mt-24">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Interactive Self-Audit
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {country.name} Statutory Requirements Checklist
            </h2>
            <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
              Check off your pet&apos;s veterinary records against {country.authority} rules to spot timing gaps and missing certifications before departure. Your progress is saved locally.
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

      {/* ─── SECTION: ENTRY AIRPORTS & BREED RESTRICTIONS ────────────────── */}
      <section id="ports-breeds" className="py-10 bg-white border-y border-zinc-200/80 scroll-mt-24">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Approved Entry Ports */}
            <div className="p-5 sm:p-6 rounded-xl bg-zinc-50 border border-zinc-200/90 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Border Control Posts (BIPs)
                  </span>
                  <h3 className="text-base font-bold text-zinc-900">
                    Approved Ports of Entry in {country.name}
                  </h3>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Pets must arrive at designated international airports or seaports equipped with sovereign veterinary border inspection posts:
              </p>
              
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-800 font-medium">
                {country.entryAirports.map((port, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 bg-white p-2.5 rounded-lg border border-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span>{port}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Breed Restrictions or Biosecurity Notice */}
            <div className="p-5 sm:p-6 rounded-xl bg-zinc-50 border border-zinc-200/90 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Statutory Breed Restrictions
                  </span>
                  <h3 className="text-base font-bold text-zinc-900">
                    Restricted Breeds &amp; Prohibitions
                  </h3>
                </div>
              </div>

              {country.restrictedBreeds && country.restrictedBreeds.length > 0 ? (
                <>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    National legislation strictly prohibits or restricts the entry of specific dog breeds and feline hybrids:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {country.restrictedBreeds.map((breed, bIdx) => (
                      <span key={bIdx} className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-semibold">
                        {breed}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white p-3.5 rounded-lg border border-zinc-200 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {country.name} does not enforce an outright statutory ban on specific dog breeds for non-commercial companion animals, provided standard ISO microchip, rabies vaccination, and health certificate protocols are fulfilled.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION: DEDICATED CAT PASSPORT & FELINE REGULATIONS ────────── */}
      <section id="cats" className="py-12 bg-gradient-to-b from-[#F3F7F5] to-[#FAFAFA] border-b border-zinc-200/80 scroll-mt-24">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🐱 Species-Specific Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {country.catGuidance?.headline || `Cat Passport & Feline Travel Rules for ${country.name}`}
            </h2>
            <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
              {country.catGuidance?.summary ||
                `Official statutory entry guidelines for domestic cats and kittens entering ${country.name}. Covers rabies vaccination, microchip requirements, pet passport validity, and quarantine exemptions.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            
            {/* 1. Rabies & Age */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200 inline-block mb-2.5">
                Rabies &amp; Age
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1">
                Rabies Vaccine &amp; Kittens
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.rabiesRules ||
                  `Standard rabies vaccination required for cats 3 months of age or older before entering ${country.name}.`}
              </p>
            </div>

            {/* 2. Microchip Standard */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200 inline-block mb-2.5">
                Identification
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1">
                Cat Microchip Standard
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.microchipRules ||
                  `ISO 11784/11785 15-digit microchip is strongly recommended and mandatory for airline transport.`}
              </p>
            </div>

            {/* 3. Quarantine & Titer */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-2.5">
                Quarantine &amp; Titer
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1">
                Quarantine Duration
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.quarantineRules || country.quarantineDetail}
              </p>
            </div>

            {/* 4. Health Certificate & Passports */}
            <div className="bg-white rounded-xl border border-zinc-200/90 p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200 inline-block mb-2.5">
                Documentation
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-1">
                Cat Passport &amp; Health Cert
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {country.catGuidance?.healthCertRules || country.certificateDetail}
              </p>
            </div>

          </div>

          {/* Checklist & Hybrid Breeds Callout */}
          <div className="bg-white rounded-xl border border-emerald-200 p-5 sm:p-6 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                Statutory Cat Travel Checklist ({country.name})
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
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

            <div className="lg:col-span-5 bg-zinc-50 rounded-lg p-4 border border-zinc-200 text-xs space-y-2.5">
              <span className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] block">
                Hybrid Cat Breeds (Bengal &amp; Savannah)
              </span>
              <p className="text-zinc-600 leading-relaxed">
                {country.catGuidance?.hybridCatRules ||
                  `Domestic cat crosses with wild species (such as F1–F4 Bengal or Savannah cats) may require CITES permits. Check wildlife import regulations prior to flight.`}
              </p>
              <div className="pt-1">
                <Link
                  href={checkerHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                >
                  <span>Verify Cat Documents with Document Checker</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: OFFICIAL REGULATORY MANUALS ────────────────────────── */}
      <section id="guides" className="py-12 bg-white border-b border-zinc-200/80 scroll-mt-24">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Official Regulatory Manuals
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                Recommended Pet Travel Guides for {country.name}
              </h2>
            </div>
            <Link
              href="/en/guides"
              className="text-xs font-semibold text-zinc-900 hover:text-emerald-700 transition-colors"
            >
              Browse All Regulatory Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Guide 1: FAVN Titer Guide */}
            <Link
              href="/en/guides/rabies-titer-test-favn-guide"
              className="group bg-zinc-50 hover:bg-white rounded-xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Veterinary Testing
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium">9 min read</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  FAVN Rabies Titer Test Guide (2026)
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Understand the ≥ 0.50 IU/mL antibody threshold, approved international laboratories (KSU, Auburn, ANSES), and post-draw waiting clocks enforced by {country.authority}.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-emerald-700">
                <span>FAVN rabies titer requirements</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Guide 2: USDA APHIS VEHCS Guide */}
            <Link
              href="/en/guides/usda-aphis-vehcs-guide"
              className="group bg-zinc-50 hover:bg-white rounded-xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-200/80 text-zinc-800 border border-zinc-300">
                    Government Endorsement
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium">8 min read</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  USDA APHIS VEHCS Endorsement Guide
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  How to obtain sovereign veterinary endorsement for international health certificates within the mandatory 10-day pre-flight examination window.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-emerald-700">
                <span>VEHCS endorsement process</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Guide 3: IATA Crate Guide */}
            <Link
              href="/en/guides/iata-crate-requirements"
              className="group bg-zinc-50 hover:bg-white rounded-xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-200/80 text-zinc-800 border border-zinc-300">
                    Aviation &amp; Crates
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium">10 min read</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                  IATA-Approved Dog Crate Requirements
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Official mathematical sizing formulas (CR-1), mandatory metal nuts and bolts hardware, four-sided ventilation, and dangerous breed CR-82 guidelines.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-emerald-700">
                <span>Read IATA Crate Guide</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION: FREQUENTLY ASKED QUESTIONS ─────────────────────────── */}
      <section id="faqs" className="py-12 sm:py-16 scroll-mt-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Practical Guidance</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              Frequently Asked Questions: {country.name} Pet Import
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {country.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-zinc-200/90 p-5 shadow-2xs hover:shadow-xs transition-all space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold text-base leading-none">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION: GLOBAL DIRECTORY BACKLINK ───────────────────────────── */}
      <section className="py-7 bg-zinc-100/70 border-t border-zinc-200/80">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-900">
              Need Pet Import Requirements for Other Destinations?
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">
              Compare biosecurity protocols, rabies titer rules, and quarantine lead times across 15+ destination guides.
            </p>
          </div>
          <Link
            href="/en/countries"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 hover:text-emerald-800 bg-white hover:bg-zinc-50 border border-zinc-200 px-3.5 py-2 rounded-lg transition-all shadow-2xs whitespace-nowrap"
          >
            <span>← Browse All Country Guides</span>
          </Link>
        </div>
      </section>

      {/* ─── SECTION: BOTTOM HIGH-CONVERTING CTA BANNER ──────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-gradient-to-br from-[#08162A] via-[#0E2342] to-[#0A1A30] text-white rounded-2xl p-7 sm:p-10 border border-zinc-800 shadow-lg text-center relative overflow-hidden">
            
            {/* Background decorative glow circles */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0E2342]/30 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

            <div className="max-w-2xl mx-auto relative z-10 space-y-3.5">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                Destination Compliance Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Traveling to {country.name} with your pet?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl mx-auto">
                Upload your pet&apos;s vaccination records and microchip certificate. We scan your paperwork against official {country.authority} border rules to verify date sequences, rabies latency, and health certificate deadlines.
              </p>
              
              <div className="pt-2">
                <Link
                  href={checkerHref}
                  className="inline-flex items-center gap-2 bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-md hover:shadow-emerald-500/25 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>Run Free {country.name} Compliance Assessment</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3 text-[11px] text-zinc-400 flex-wrap">
                <span>✓ Verified against {country.legalBasis.split('&')[0].trim()}</span>
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
