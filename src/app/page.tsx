import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeroTripForm from '@/components/HeroTripForm';
import HomeScannerSection from '@/components/HomeScannerSection';
import LiveSampleReportCard from '@/components/LiveSampleReportCard';
import FaqAccordion from '@/components/FaqAccordion';
import PricingSection from '@/components/PricingSection';
import StickyBottomCta from '@/components/StickyBottomCta';
import DigitalPetPassportSection from '@/components/DigitalPetPassportSection';
import CustomsQrSection from '@/components/CustomsQrSection';

export const metadata: Metadata = {
  title: 'Petvia — Is Your Pet Ready to Travel? | Pet Travel Document Checker',
  description:
    "Upload your pet's documents and we'll check them against route-specific requirements, identify what's missing, flag potential issues, and give you a clear travel timeline.",
};

const POPULAR_COUNTRIES = [
  { flag: '🇬🇧', name: 'United Kingdom' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇯🇵', name: 'Japan' },
  { flag: '🇺🇸', name: 'United States' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇸🇬', name: 'Singapore' },
];

export default function HomePage() {
  return (
    <div className="bg-[#F8FAFB] text-zinc-900 overflow-hidden font-sans">
      {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#F8FAFB] overflow-hidden">
        {/* Right-Side Desktop Backdrop Image with Golden Retriever, Airplane & Suitcase */}
        <div
          className="hidden lg:block absolute top-0 right-0 bottom-0 w-[86%] xl:w-[88%] z-0 pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 14%, black 28%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 14%, black 28%, black 100%)',
          }}
        >
          <Image
            src="/hero-clean-terminal.jpg"
            alt="Golden retriever at airport departure gate with travel suitcase and airplane on tarmac"
            fill
            priority
            className="object-cover object-[right_bottom]"
            sizes="88vw"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:min-h-[540px]">
            {/* Left Column: Heading, Subtitle & Value Pills */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-5 text-left pt-2">
              {/* Pill Label */}
              <div className="inline-flex items-center text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                PET TRAVEL DOCUMENT CHECKER
              </div>

              {/* Main Headline (Editorial Serif) */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] text-[#0E2342]">
                Is Your Pet Ready<br />
                to Travel?
              </h1>

              {/* Subheading */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-lg">
                Upload your pet&apos;s documents and we&apos;ll check them against route-specific requirements, identify what&apos;s missing, flag potential issues, and give you a clear travel timeline.
              </p>

              {/* 4 Feature Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                {/* 1. Official source */}
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-medium text-zinc-600 leading-tight">
                    Official source requirements
                  </p>
                </div>

                {/* 2. 120+ countries */}
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-medium text-zinc-600 leading-tight">
                    120+ countries &amp; territories
                  </p>
                </div>

                {/* 3. Document verification */}
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-medium text-zinc-600 leading-tight">
                    Document verification
                  </p>
                </div>

                {/* 4. Clear next steps */}
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <p className="text-[11px] font-medium text-zinc-600 leading-tight">
                    Clear next steps
                  </p>
                </div>
              </div>

              {/* Hero CTA Button */}
              <div className="pt-2">
                <Link
                  href="#hero-form"
                  className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
                >
                  <span>Check My Pet&apos;s Requirements →</span>
                </Link>
                <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-zinc-400">
                  <span>🔒</span>
                  <span>Your documents stay private and secure</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Form Card */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-end pt-2 lg:pt-3">
              {/* Mobile hero image banner */}
              <div className="lg:hidden w-full relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-4 shadow-md">
                <Image
                  src="/hero-clean-terminal.jpg"
                  alt="Golden retriever at airport departure gate"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 88vw"
                />
              </div>

              {/* Floating Form Card */}
              <div className="w-full flex justify-center lg:justify-end">
                <HeroTripForm />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeScannerSection />
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
                    <span className="text-xs">🐾</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Microchip</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">ID &amp; registration</p>
                </div>

                {/* Card 2: Rabies vaccination */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <span className="text-xs">💉</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Rabies vaccination</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Dates &amp; type</p>
                </div>

                {/* Card 3: Titer test */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <span className="text-xs">🧪</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Titer test</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Timing &amp; results</p>
                </div>

                {/* Card 4: Health certificate */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <span className="text-xs">📄</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Health certificate</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Vet verification</p>
                </div>

                {/* Card 5: Waiting periods */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <span className="text-xs">⏱️</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0E2342]">Waiting periods</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">21 / 90 / 120 days</p>
                </div>

                {/* Card 6: Airline requirements */}
                <div className="bg-white rounded-xl border border-zinc-200/80 p-4 text-left shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-[#0E2342] mb-3">
                    <span className="text-xs">✈️</span>
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
                      href="/en/pet-travel"
                      className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 transition-colors text-xs font-semibold text-zinc-800 truncate"
                    >
                      <span className="text-sm">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-zinc-100">
                <Link
                  href="/en/pet-travel"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E2342] hover:text-[#0FA958] transition-colors"
                >
                  <span>View all destinations</span>
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

      {/* ─── 7. PRICING SECTION ───────────────────────────────────────────── */}
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
                href="#hero-form"
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-[#0E2342] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition-all"
              >
                <span>Check Requirements →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. MOBILE STICKY BOTTOM CTA BAR ──────────────────────────────── */}
      <StickyBottomCta />
    </div>
  );
}
