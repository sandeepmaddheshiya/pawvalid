import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COUNTRIES, getCountryBySlug } from '@/lib/data/countries';
import { CORRIDORS } from '@/lib/data/corridors';
import BrowseRequirementsChecklist from '@/components/BrowseRequirementsChecklist';
import CountryRouteFinder from '@/components/CountryRouteFinder';
import FaqAccordion from '@/components/FaqAccordion';
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
        <section id="corridors" className="py-12 bg-white border-y border-zinc-200/80 scroll-mt-24">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                  Origin-Specific Routes
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                  Verified Inbound Corridors to {country.name}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Statutory entry timelines, titer rules, and quarantine mandates from major departure hubs.
                </p>
              </div>
              <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-md border border-zinc-200 self-start sm:self-auto shrink-0">
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

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {country.inboundCorridors.map((c) => {
                  const corr = CORRIDORS[c.corridorSlug];
                  const isDirectRelease =
                    corr?.quarantineDays?.toLowerCase().startsWith('0') ||
                    corr?.quarantineDays?.toLowerCase().includes('direct release') ||
                    corr?.quarantineDays?.toLowerCase().includes('0 days');
                  
                  const quarantineBadge = isDirectRelease
                    ? '0-Day Release'
                    : corr?.quarantineDays
                    ? corr.quarantineDays.split('(')[0].trim()
                    : 'Route Specific';

                  const titerLabel = corr?.titerStatus === 'exempt'
                    ? 'Exempt'
                    : corr?.titerStatus === 'mandatory'
                    ? 'Mandatory RNATT'
                    : 'Conditional';

                  return (
                    <Link
                      key={c.corridorSlug}
                      href={`/en/pet-travel/${c.corridorSlug}`}
                      className="group bg-zinc-50/70 hover:bg-white rounded-xl border border-zinc-200/90 hover:border-zinc-300 p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-xl leading-none shrink-0">{c.originFlag}</span>
                            <span className="text-zinc-300 font-bold text-xs">→</span>
                            <span className="text-xl leading-none shrink-0">{country.flag}</span>
                            <h3 className="text-xs font-bold text-zinc-900 truncate group-hover:text-emerald-800 transition-colors">
                              {c.originName}
                            </h3>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                              isDirectRelease
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                                : 'bg-amber-50 text-amber-800 border border-amber-200/80'
                            }`}
                          >
                            {quarantineBadge}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-zinc-200/70 text-[11px]">
                          <div>
                            <span className="text-zinc-400 block font-medium">Rabies Titer:</span>
                            <span className="font-semibold text-zinc-800 truncate block">
                              {titerLabel}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block font-medium">Lead Time:</span>
                            <span className="font-semibold text-zinc-800 block">
                              {c.leadTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-zinc-200/70 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700 transition-colors">
                        <span>View Statutory Guide</span>
                        <span className="group-hover:translate-x-1 transition-transform font-bold text-zinc-400 group-hover:text-emerald-700">→</span>
                      </div>
                    </Link>
                  );
                })}
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
      <section id="ports-breeds" className="py-12 bg-white border-y border-zinc-200/80 scroll-mt-24">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Ports &amp; Breed Policies
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Entry Ports &amp; Breed Restrictions
            </h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Designated international entry airports equipped with veterinary inspection posts, plus statutory breed bans enforced under {country.legalBasis}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Approved Entry Ports */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 text-[#0E2342] flex items-center justify-center font-bold text-sm shrink-0 border border-zinc-200/60">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      Approved Ports of Entry
                    </h3>
                    <span className="text-xs text-zinc-500">
                      Authorized Border Inspection Posts (BIPs)
                    </span>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  All pets entering <strong>{country.name}</strong> must arrive at a designated international border post with on-site veterinary inspection:
                </p>
                
                <div className="space-y-2.5">
                  {country.entryAirports.map((port, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-zinc-50/80 p-3.5 rounded-xl border border-zinc-200/70 text-xs text-zinc-900">
                      <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✈
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold block text-zinc-900">{port}</span>
                        <span className="text-[11px] text-zinc-500 block mt-0.5">Official Veterinary Inspection Facility</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/70 text-xs text-zinc-600 space-y-1">
                <span className="font-semibold text-zinc-800 block">Inspection Appointment:</span>
                <span className="text-[11px] text-zinc-500 leading-relaxed block">
                  Port veterinary inspection appointments must be reserved at least 5 working days prior to arrival via {country.authority} procedures.
                </span>
              </div>
            </div>

            {/* Right Column: Statutory Breed Restrictions */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0 border border-amber-200/60">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">
                    Restricted &amp; Prohibited Breeds
                  </h3>
                  <span className="text-xs text-zinc-500">
                    Sovereign import prohibitions &amp; hybrid rules
                  </span>
                </div>
              </div>

              {country.restrictedBreeds && country.restrictedBreeds.length > 0 ? (
                <>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Under biosecurity regulations in <strong>{country.name}</strong>, importing the following breeds, their direct crosses, and wild feline hybrids is prohibited:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {country.restrictedBreeds.map((breed, bIdx) => (
                      <div
                        key={bIdx}
                        className="flex items-start gap-2.5 bg-zinc-50/80 px-3.5 py-2.5 rounded-xl border border-zinc-200/70 text-xs font-medium text-zinc-800"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5"></span>
                        <span className="leading-snug">{breed}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200/70 text-xs text-rose-950 flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <span className="font-bold">Border Enforcement Notice:</span>
                      <span className="ml-1 text-rose-900/90 leading-relaxed block sm:inline">
                        Prohibited breeds detected during border inspection will be refused entry and subject to mandatory re-export at the owner&apos;s expense.
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/70 text-xs text-zinc-600 leading-relaxed space-y-2">
                  <p className="font-semibold text-zinc-800">No Outright Breed Prohibitions</p>
                  <p>
                    {country.name} does not enforce an outright statutory ban on specific domestic dog breeds for companion animals, provided standard ISO microchip, rabies vaccination, and health certificate protocols are fulfilled.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION: CAT PASSPORT & FELINE REGULATIONS ─────────────────── */}
      <section id="cats" className="py-12 bg-[#FAFAFA] border-b border-zinc-200/80 scroll-mt-24">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Cat Travel Guidelines
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              {country.catGuidance?.headline || `Cat Passport & Travel Requirements for ${country.name}`}
            </h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              {country.catGuidance?.summary ||
                `Official statutory entry guidelines for domestic cats and kittens entering ${country.name}. Covers core feline immunization (FVRCP), ISO microchip verification, pet passport validity, and quarantine rules.`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Core Feline Health Protocols */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 text-[#0E2342] flex items-center justify-center font-bold text-sm shrink-0 border border-zinc-200/60">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      Veterinary Health Protocols
                    </h3>
                    <p className="text-xs text-zinc-500">Core requirements for feline entry</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md">
                  4 Key Protocols
                </span>
              </div>

              <div className="space-y-4 divide-y divide-zinc-100">
                
                {/* 1. Identification & Microchip */}
                <div className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200/60">
                      1
                    </span>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900">
                        ISO 11784/11785 Microchip Standard
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {country.catGuidance?.microchipRules ||
                          `Mandatory 15-digit ISO 11784/11785 transponder (134.2 kHz) implanted prior to any rabies or core feline vaccinations.`}
                      </p>
                      {country.catGuidance?.ageRestrictions && (
                        <div className="mt-2 text-xs text-zinc-600 bg-zinc-50 border border-zinc-200/70 rounded-lg px-3 py-2 flex items-start gap-2">
                          <span className="font-semibold text-zinc-900 shrink-0">Age Limit:</span>
                          <span>{country.catGuidance.ageRestrictions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Core Vaccines & Rabies */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200/60">
                      2
                    </span>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900">
                        FVRCP &amp; Rabies Immunization
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {country.catGuidance?.rabiesRules ||
                          `Core feline vaccination (FVRCP) and valid rabies immunization administered according to sovereign biosecurity intervals.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Quarantine Duration & Accommodations */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200/60">
                      3
                    </span>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900">
                        Quarantine &amp; Direct Release Assessment
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {country.catGuidance?.quarantineRules || country.quarantineDetail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Veterinary Certificate & Permits */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200/60">
                      4
                    </span>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900">
                        Official Health Certificate &amp; Import Licences
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {country.catGuidance?.healthCertRules || country.certificateDetail}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Pre-Travel Checklist & Advisory */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Pre-Travel Checklist */}
              <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <h3 className="text-sm font-bold text-zinc-900">
                      Pre-Travel Checklist
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    {(country.catGuidance?.checklist || [1, 2, 3, 4, 5]).length} Steps
                  </span>
                </div>

                <div className="space-y-3">
                  {(country.catGuidance?.checklist || [
                    `15-digit ISO 11784/11785 microchip implanted before any vaccinations or blood draws.`,
                    `FVRCP core feline immunization (Feline Rhinotracheitis, Calicivirus, Panleukopenia) administered prior to export.`,
                    `Valid rabies vaccination certificate with vaccine manufacturer and lot number.`,
                    `Official veterinary health certificate endorsed by exporting government authority.`,
                    `Statutory customs port inspection upon airport arrival at designated Border Inspection Post.`,
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center font-semibold text-[11px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-zinc-100 space-y-2">
                  {country.slug === 'singapore' && (
                    <Link
                      href="/en/importing-cats-to-singapore"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center"
                    >
                      <span>Read Full Singapore Cat Import Guide</span>
                      <span>→</span>
                    </Link>
                  )}
                  <Link
                    href={checkerHref}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer text-center"
                  >
                    <span>Check Cat Travel Compliance</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Hybrid Cat Restrictions Callout (Clean Alert) */}
              {country.catGuidance?.hybridCatRules && (
                <div className="bg-amber-50/60 rounded-xl border border-amber-200/80 p-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                      Prohibited Hybrid Breeds (Bengal &amp; Savannah)
                    </h4>
                  </div>
                  <p className="text-zinc-700 leading-relaxed text-[11px] sm:text-xs">
                    {country.catGuidance.hybridCatRules}
                  </p>
                </div>
              )}

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
            {country.slug === 'singapore' && (
              <Link
                href="/en/import-pet-to-singapore"
                className="group bg-emerald-50/50 hover:bg-white rounded-xl border border-emerald-200/90 hover:border-emerald-600/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                      AVS Master Guide
                    </span>
                    <span className="text-[11px] text-zinc-500 font-medium">12 min read</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                    How to Import a Pet to Singapore (2026)
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Complete AVS category rules, GoBusiness licence filing, Sembawang SAQS quarantine reservation, and dog licensing.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:text-emerald-700">
                  <span>Read Singapore Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            )}

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
          <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Practical Guidance
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Frequently Asked Questions: {country.name} Pet Import
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2">
              Key biosecurity rules, quarantine exemptions, and veterinary documentation explained.
            </p>
          </div>

          <FaqAccordion items={country.faqs} defaultOpenIndex={0} />
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

      {/* ─── SECTION: BOTTOM CTA ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-zinc-50/90 rounded-2xl border border-zinc-200/90 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Document Pre-Screening</span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                    Verify Your Pet&apos;s Documents for {country.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Upload your pet&apos;s vaccination records, titer reports, and microchip certificates. We check date sequences and mandatory waiting periods against official {country.authority} rules before your veterinary appointment.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href={checkerHref}
                    className="inline-flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                  >
                    <span>Check Travel Compliance Free</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="pt-1 flex items-center gap-4 text-xs text-zinc-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>No credit card required</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Instant date sequence check</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{country.code} 2026 standards</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Clean White Verification Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-xl border border-zinc-200/90 p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                    <span className="text-xs font-bold text-zinc-800">
                      Automated Pre-Check
                    </span>
                    <span className="text-xs font-medium text-zinc-500">
                      {country.flag} {country.name}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-zinc-600">
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">
                        ✓
                      </span>
                      <span>Microchip implantation preceding rabies vaccinations</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">
                        ✓
                      </span>
                      <span>Rabies titer threshold (≥ 0.50 IU/mL) &amp; waiting clocks</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">
                        ✓
                      </span>
                      <span>Official health certificate timeline and endorsement window</span>
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
