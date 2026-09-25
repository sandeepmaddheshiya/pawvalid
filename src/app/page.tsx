import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import HomeScannerSection from '@/components/HomeScannerSection';
import LiveSampleReportCard from '@/components/LiveSampleReportCard';
import FaqAccordion from '@/components/FaqAccordion';
import PricingSection from '@/components/PricingSection';
import DigitalPetPassportSection from '@/components/DigitalPetPassportSection';
import CustomsQrSection from '@/components/CustomsQrSection';
import { getFaqSchema } from '@/lib/seo/schema';
import { HOME_FAQS } from '@/lib/seo/faqs';

export const metadata: Metadata = {
  title: 'Pet Document Verification & Travel Compliance | PawValid',
  description:
    "Instant pet document verification against official international entry statutes. Upload your pet's vaccination records, microchip paperwork, and health certificates for automated compliance verification.",
  alternates: {
    canonical: 'https://pawvalid.online',
  },
};

const POPULAR_COUNTRIES = [
  { flag: '🇬🇧', name: 'United Kingdom', slug: 'united-kingdom' },
  { flag: '🇺🇸', name: 'United States', slug: 'united-states' },
  { flag: '🇸🇬', name: 'Singapore', slug: 'singapore' },
  { flag: '🇩🇪', name: 'Germany', slug: 'germany' },
  { flag: '🇫🇷', name: 'France', slug: 'france' },
  { flag: '🇯🇵', name: 'Japan', slug: 'japan' },
  { flag: '🇦🇺', name: 'Australia', slug: 'australia' },
  { flag: '🇦🇪', name: 'United Arab Emirates', slug: 'united-arab-emirates' },
  { flag: '🇨🇦', name: 'Canada', slug: 'canada' },
];

export default function HomePage() {
  const faqLd = getFaqSchema(
    HOME_FAQS.map((faq) => ({
      q: faq.question,
      a: faq.answer,
    }))
  );

  return (
    <div className="bg-[#F8FAFB] text-zinc-900 overflow-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-12 lg:pt-14 lg:pb-16 bg-[#F8FAFB] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Authentic Editorial Copy & CTA */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-5 text-left">
              {/* Category Label */}
              <div className="inline-flex items-center text-[10px] sm:text-[11px] font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                PET DOCUMENT VERIFICATION &amp; TRAVEL COMPLIANCE
              </div>

              {/* Main Headline (Editorial Serif) */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] text-[#0E2342]">
                Pet Document Verification: <br />
                Is Your Pet Ready to Travel?
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-lg">
                Upload your pet&apos;s vaccination records, microchip paperwork, and health certificates. We verify them against official country entry statutes to prevent airport groundings and quarantine surprises.
              </p>

              {/* Primary CTA Area */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
                <Link
                  href="#scanner"
                  className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-98"
                >
                  <span>Start Document Check</span>
                  <span>↓</span>
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span>Free instant check • Private &amp; secure</span>
                </div>
              </div>

              {/* Verified Sources Trust Signal */}
              <div className="pt-4 border-t border-zinc-200/70 flex flex-wrap items-center gap-2.5 text-xs text-zinc-600">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Beta Launch
                </span>
                <span>
                  Requirements verified against <strong className="font-semibold text-zinc-900">15+ official government sources</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Clean, Authentic Travel Photography */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-lg border border-zinc-200/80 aspect-[4/3] relative bg-zinc-100">
                <Image
                  src="/hero-golden-retriever.jpg"
                  alt="Golden retriever Bailey with official pet passport at airport terminal"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. 4-ITEM TRUST BAR ──────────────────────────────────────────── */}
      <section className="relative z-20 py-5 bg-white border-t border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-zinc-100">
            {/* 1. Trusted in 120+ countries */}
            <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:px-4 first:lg:pl-0">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-[#0E2342] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-zinc-800 leading-snug">
                Trusted by pet parents in 120+ countries
              </p>
            </div>

            {/* 2. Up-to-date regulations */}
            <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:px-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-[#0E2342] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-zinc-800 leading-snug">
                Up-to-date regulations
              </p>
            </div>

            {/* 3. Evidence-based checks */}
            <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:px-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-[#0E2342] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-zinc-800 leading-snug">
                Evidence-based checks
              </p>
            </div>

            {/* 4. Clear, actionable travel plans */}
            <div className="flex items-center gap-3 pt-3 sm:pt-0 lg:px-4 last:lg:pr-0">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-[#0E2342] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-zinc-800 leading-snug">
                Clear, actionable travel plans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. DOCUMENT CHECKER SECTION ─────────────────────────────────── */}
      <section id="scanner" className="py-16 sm:py-20 bg-white border-b border-zinc-200/70 scroll-mt-12">
        <div id="hero-form" className="scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomeScannerSection />
          </div>
        </div>
      </section>

      {/* ─── 4. WHAT WE CHECK & SAMPLE RESULT (SIDE-BY-SIDE) ─────────────── */}
      <section className="py-16 sm:py-20 bg-[#F8FAFB] border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: What We Check & 6 Cards */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider">
                WHAT WE CHECK
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E2342] tracking-tight leading-tight">
                Everything your pet needs for a safe journey
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-lg">
                We verify your documents against route-specific regulations, check for conflicts, and calculate your earliest travel date.
              </p>

              {/* 3x2 Grid of Feature Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                {/* Card 1: Microchip */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Microchip</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">ID &amp; registration</p>
                </div>

                {/* Card 2: Rabies vaccination */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-emerald-700 mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Rabies vaccination</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Dates &amp; type</p>
                </div>

                {/* Card 3: Titer test */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-blue-700 mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L5 14.5" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Titer test</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Timing &amp; results</p>
                </div>

                {/* Card 4: Health certificate */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Health certificate</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Vet verification</p>
                </div>

                {/* Card 5: Waiting periods */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-amber-700 mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Waiting periods</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">21 / 90 / 120 days</p>
                </div>

                {/* Card 6: Airline requirements */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Airline requirements</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Carrier specific</p>
                </div>
              </div>
            </div>

            {/* Right Column: Sample Result Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <LiveSampleReportCard />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. DIGITAL PET PASSPORT ───────────────────────────────────────── */}
      <DigitalPetPassportSection />

      {/* ─── 6. PET VISA QR CODE FOR CUSTOMS ───────────────────────────────── */}
      <CustomsQrSection />

      {/* ─── 7. STEP-BY-STEP HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider mb-3">
            STEP-BY-STEP HOW IT WORKS
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E2342] tracking-tight mb-14">
            From documents to your travel timeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-[#0E2342] shadow-2xs">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#0E2342] text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#0E2342] mb-1">
                Tell us your route
              </h3>
              <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
                Add your origin, destination, transit stops and target date.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-[#0E2342] shadow-2xs">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#0E2342] text-white text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#0E2342] mb-1">
                Upload your documents
              </h3>
              <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
                Securely upload your pet&apos;s travel paperwork.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-[#0E2342] shadow-2xs">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" strokeWidth={1.8} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#0E2342] text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#0E2342] mb-1">
                We check the requirements
              </h3>
              <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
                We verify match and check for conflicts or missing items.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-[#0E2342] shadow-2xs">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={1.8} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#0E2342] text-white text-[10px] font-bold flex items-center justify-center">
                  4
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#0E2342] mb-1">
                Get your travel plan
              </h3>
              <p className="text-[11px] text-zinc-500 max-w-[200px] leading-relaxed">
                See your earliest travel date, full checklist and next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. POPULAR ROUTES & TESTIMONIAL (SIDE-BY-SIDE) ───────────────── */}
      <section className="py-16 sm:py-20 bg-[#F8FAFB] border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Left Card: Popular Routes */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200 shadow-xs p-6 sm:p-7 flex flex-col justify-between text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider mb-3">
                  POPULAR ROUTES
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0E2342] tracking-tight mb-1.5">
                  Trusted by pet parents across the globe
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-5">
                  Check requirements for 120+ countries and territories, including popular routes and transit destinations.
                </p>

                {/* 3x3 Grid of Countries */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {POPULAR_COUNTRIES.map((c) => (
                    <Link
                      key={c.name}
                      href={`/en/countries/${c.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 transition-colors text-xs font-semibold text-zinc-800 truncate group"
                    >
                      <span className="text-sm">{c.flag}</span>
                      <span className="truncate group-hover:text-emerald-700 transition-colors">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  href="/en/countries"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E2342] hover:text-[#0FA958] transition-colors"
                >
                  <span>Browse all 15 pet import country guides</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/en/pet-travel"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
                >
                  <span>Browse 50 flight corridors</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Card: What Pet Parents Say */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200 shadow-xs p-6 sm:p-7 flex flex-col justify-between text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider mb-3">
                  WHAT PET PARENTS SAY
                </div>

                <div className="my-3">
                  <p className="text-xs sm:text-[13px] text-zinc-700 italic leading-relaxed">
                    &ldquo;PawRoute caught that our rabies vaccination date didn&apos;t satisfy the waiting period for Germany. We would have booked the flight too early!&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden relative ring-1 ring-zinc-200">
                    <Image
                      src="/avatar-jessica.jpg"
                      alt="Sarah M."
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#0E2342]">
                      Sarah M.
                    </h5>
                    <p className="text-[10px] text-zinc-400">
                      UK → Germany
                    </p>
                    <div className="flex text-amber-400 text-[11px] mt-0.5">
                      ★★★★★
                    </div>
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E2342]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. FEATURED REGULATORY GUIDES SECTION ────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between max-w-5xl mx-auto mb-10 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider mb-2.5">
                REGULATORY INTELLIGENCE
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E2342] tracking-tight">
                Authoritative Pet Travel Manuals &amp; Guides
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
                Source-backed deep dives into international rabies titer laws, government health certificate endorsements, and airline crate engineering.
              </p>
            </div>

            <Link
              href="/en/guides"
              className="text-xs font-semibold text-[#0E2342] hover:text-[#0FA958] transition-colors self-start sm:self-auto shrink-0"
            >
              Browse all guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {/* Guide Card 1: FAVN Titer */}
            <Link
              href="/en/guides/rabies-titer-test-favn-guide"
              className="group bg-[#F8FAFB] hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    Veterinary Testing
                  </span>
                  <span className="text-[10px] text-zinc-400">9 min</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-[#0E2342] group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
                  FAVN Rabies Titer Test Manual (2026)
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-3">
                  Everything you need to know about RNATT tests, the 0.5 IU/mL standard, and 180-day waiting clocks for Singapore, Japan, and Australia.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read Manual</span>
                <span>→</span>
              </div>
            </Link>

            {/* Guide Card 2: USDA VEHCS */}
            <Link
              href="/en/guides/usda-aphis-vehcs-guide"
              className="group bg-[#F8FAFB] hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80">
                    Endorsement
                  </span>
                  <span className="text-[10px] text-zinc-400">8 min</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-[#0E2342] group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
                  USDA APHIS VEHCS Endorsement Guide
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-3">
                  Step-by-step walkthrough of the 10-day pre-flight exam window, accredited vet submission, and federal endorsement seals.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read Manual</span>
                <span>→</span>
              </div>
            </Link>

            {/* Guide Card 3: IATA Crate */}
            <Link
              href="/en/guides/iata-crate-requirements"
              className="group bg-[#F8FAFB] hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80">
                    Aviation
                  </span>
                  <span className="text-[10px] text-zinc-400">10 min</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-[#0E2342] group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
                  IATA-Approved Dog Crate Guidelines
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-3">
                  Official mathematical crate formulas, mandatory metal nuts/bolts hardware, and four-sided airline ventilation specs.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read Manual</span>
                <span>→</span>
              </div>
            </Link>

            {/* Guide Card 4: AI vs Deterministic */}
            <Link
              href="/en/guides/pet-travel-platform-vs-ai"
              className="group bg-[#F8FAFB] hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200/80">
                    Analysis
                  </span>
                  <span className="text-[10px] text-zinc-400">7 min</span>
                </div>
                <h3 className="font-serif text-sm font-bold text-[#0E2342] group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
                  Why General AI Hallucinates Pet Travel
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-3">
                  Investigative study into why ChatGPT and Gemini miscalculate day-zero rabies math and how deterministic checks prevent quarantine.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read Manual</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. PRICING SECTION ───────────────────────────────────────────── */}
      <PricingSection />

      {/* ─── 8. FAQ ACCORDION SECTION ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-b border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between max-w-5xl mx-auto mb-10 gap-3 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#C6EED8] text-[#0FA958] text-[10px] font-bold uppercase tracking-wider mb-2.5">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E2342] tracking-tight">
                Got questions? We&apos;ve got answers.
              </h2>
            </div>

            <Link
              href="#scanner"
              className="text-xs font-semibold text-[#0E2342] hover:text-[#0FA958] transition-colors self-start sm:self-auto"
            >
              View all FAQs →
            </Link>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* ─── 9. PRE-FOOTER ADVENTURE BANNER ───────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 text-white text-left">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/adventure-banner.jpg"
            alt="Traveler with dog looking out over scenic mountain ranges at sunset"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Subtle overlay gradient to guarantee pristine text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
              Ready for your next adventure?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-md">
              Check your pet&apos;s travel requirements and get started today.
            </p>

            <div className="pt-2">
              <Link
                href="#scanner"
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-[#0E2342] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition-all"
              >
                <span>Check Requirements →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
