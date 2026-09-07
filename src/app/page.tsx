import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeroTripForm from '@/components/HeroTripForm';
import HomeScannerSection from '@/components/HomeScannerSection';
import PricingSection from '@/components/PricingSection';

export const metadata: Metadata = {
  title: 'PetTravel Compliance — Stress-free pet travel starts with the right paperwork',
  description:
    'Get a personalized pet travel compliance report for any country. We check the rules, documents, timelines & requirements so you can travel with confidence.',
};

export default function HomePage() {
  return (
    <div className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* ─── 1. HERO SECTION (MATCHING REFERENCE SCREENSHOT) ───────────── */}
      <section className="relative pt-6 pb-12 lg:pt-8 lg:pb-16 bg-[#FAFCFB] overflow-hidden">
        {/* Right-Side Angled Airport Dog Backdrop for Desktop */}
        <div
          className="hidden lg:block absolute top-0 right-0 bottom-0 w-[54%] z-0 pointer-events-none"
          style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          <Image
            src="/hero-golden-retriever-portrait.jpg"
            alt="Happy golden retriever dog at airport departure gate with travel bag and pet passport"
            fill
            priority
            className="object-cover object-[center_top]"
            sizes="55vw"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:min-h-[640px]">
            {/* Left Column: Heading, Subtitle & Bullets */}
            <div className="lg:col-span-6 space-y-6 pt-2 pb-6 flex flex-col justify-center">
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs self-start">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden relative ring-1 ring-white">
                    <Image
                      src="/avatar-jessica.jpg"
                      alt="Pet parent"
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full overflow-hidden relative ring-1 ring-white">
                    <Image
                      src="/avatar-david.jpg"
                      alt="Pet parent"
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full overflow-hidden relative ring-1 ring-white">
                    <Image
                      src="/avatar-priya.jpg"
                      alt="Pet parent"
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-zinc-700">
                  Trusted by pet parents in 120+ countries
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.1] text-[#0f172a]">
                Stress-free pet<br />
                travel starts with<br />
                the <span className="text-[#10B981]">right</span> paperwork
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-lg">
                Get a personalized <strong className="text-zinc-800 font-semibold">pet travel compliance report</strong> for any country. We check the rules, documents, timelines &amp; requirements so you can travel with confidence.
              </p>

              {/* 3 Checkpoint Bullets */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <div className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Official government requirements</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <div className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Airline &amp; destination rules</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <div className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Step-by-step guidance &amp; checklist</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dog in upper half, Form aligned to lower half */}
            <div className="lg:col-span-6 flex flex-col justify-end items-center lg:items-end lg:h-[640px] pt-4 lg:pt-0 pb-2">
              {/* Mobile hero image banner */}
              <div className="lg:hidden w-full relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-4 shadow-md">
                <Image
                  src="/hero-golden-retriever-portrait.jpg"
                  alt="Golden retriever at airport departure gate"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Floating Form Card sitting in lower portion */}
              <div className="w-full flex justify-center lg:justify-end">
                <HeroTripForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. TRUST / VALUE BADGES BAR ─────────────────────────────────── */}
      <section className="relative z-20 -mt-6 sm:-mt-8 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-md px-6 py-6 sm:py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-zinc-100">
              {/* 1. Accurate */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4 first:lg:pl-0">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] border border-[#BCECD7] text-[#10B981] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    Accurate &amp; Up-to-date
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    We monitor official government sources 24/7
                  </p>
                </div>
              </div>

              {/* 2. Accepted by Airlines */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] border border-[#BCECD7] text-[#10B981] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    Accepted by Airlines
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    Our checklists follow IATA &amp; airline guidelines
                  </p>
                </div>
              </div>

              {/* 3. Save Time & Money */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] border border-[#BCECD7] text-[#10B981] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    Save Time &amp; Money
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    Avoid surprises, delays &amp; expensive mistakes
                  </p>
                </div>
              </div>

              {/* 4. 100% Pet Parent Friendly */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4 last:lg:pr-0">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7F0] border border-[#BCECD7] text-[#10B981] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    100% Pet Parent Friendly
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    Plain language. No jargon. Just what you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2.5 AI DOCUMENT SCANNER SECTION (COMPETITOR EXPERIENCED HOOK) ── */}
      <section id="scanner" className="py-12 sm:py-16 bg-[#FAFCFB] border-t border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeScannerSection />
        </div>
      </section>

      {/* ─── 3. THREE SIMPLE STEPS TO HASSLE-FREE TRAVEL ──────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEFAF3] border border-[#C4EDD5] text-[#10B981] text-[11px] font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            HOW IT WORKS
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mb-16">
            3 simple steps to{' '}
            <span className="text-[#10B981]">hassle-free</span> travel
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-[118px] left-[15%] right-[15%] h-[1px] bg-zinc-200 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#EBF5FB] flex items-center justify-center mb-3 shadow-inner">
                  <svg className="w-12 h-12 text-[#2B86D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <circle cx="12" cy="8" r="2" fill="#2B86D4" stroke="none" />
                  </svg>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-xs">
                  1
                </div>

                <h3 className="font-bold text-zinc-900 text-base mb-1.5">
                  Tell us your trip
                </h3>
                <p className="text-xs text-zinc-500 max-w-[220px] leading-relaxed">
                  Enter your origin, destination, pet type &amp; travel date.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#EBF5FB] flex items-center justify-center mb-3 shadow-inner">
                  <svg className="w-12 h-12 text-[#2B86D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="m9 14 2 2 4-4M9 10l2 2 4-4" />
                  </svg>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-xs">
                  2
                </div>

                <h3 className="font-bold text-zinc-900 text-base mb-1.5">
                  We do the research
                </h3>
                <p className="text-xs text-zinc-500 max-w-[220px] leading-relaxed">
                  We check the latest rules, documents, vaccines, &amp; timelines for you.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#EBF5FB] flex items-center justify-center mb-3 shadow-inner">
                  <svg className="w-12 h-12 text-[#2B86D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    <path d="M12 11h6M12 15h4" />
                  </svg>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center mb-3 shadow-xs">
                  3
                </div>

                <h3 className="font-bold text-zinc-900 text-base mb-1.5">
                  Get your report
                </h3>
                <p className="text-xs text-zinc-500 max-w-[220px] leading-relaxed">
                  Receive your personalized compliance report &amp; checklist instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. EVERYTHING YOU NEED, IN ONE PLACE ─────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEFAF3] border border-[#C4EDD5] text-[#10B981] text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              YOUR REPORT INCLUDES
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Everything you need, in <span className="text-[#10B981]">one place</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
            <div className="bg-white border border-zinc-200/80 rounded-xl p-5 text-center flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[#2563EB] mb-3">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                Entry Requirements
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Official rules from government &amp; authorities
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-xl p-5 text-center flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[#0D9488] mb-3">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                Document Checklist
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Personalized list of all required documents
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-xl p-5 text-center flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[#2563EB] mb-3">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="m18 2 4 4-12 12-4-4L18 2zM14 6l4 4M2 22l4-4" />
                </svg>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                Vaccination Guide
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Required vaccines, tests &amp; waiting periods
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-xl p-5 text-center flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center text-[#2563EB] mb-3">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="12" cy="13" r="8" />
                  <path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3" />
                </svg>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                Timeline Planner
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Step-by-step timeline so you don&apos;t miss anything
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-xl p-5 text-center flex flex-col items-center col-span-2 sm:col-span-1">
              <div className="w-10 h-10 flex items-center justify-center text-[#2563EB] mb-3">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                Airline Requirements
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Pet policies &amp; documents for your airline
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#EEFAF3] border border-[#D0EFE0] px-6 py-5 sm:px-8 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                  Travel with confidence
                </h3>
                <p className="text-xs text-zinc-600 max-w-md leading-relaxed mt-0.5">
                  Our reports are based on official government sources, embassy updates, IATA guidelines, and airline policies.
                </p>
              </div>
            </div>

            <div className="relative w-36 h-20 sm:w-44 sm:h-24 rounded-lg overflow-hidden shrink-0">
              <Image
                src="/dog-cat-friends.jpg"
                alt="Happy dog and cat"
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>

            <Link
              href="/en/pet-travel/usa-to-germany"
              className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 hover:border-emerald-400 text-zinc-800 text-xs font-semibold px-4 py-2 rounded-lg shadow-2xs transition-all shrink-0"
            >
              <span>See Sample Report</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. REAL STORIES FROM REAL PET PARENTS ────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEFAF3] border border-[#C4EDD5] text-[#10B981] text-[11px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                LOVED BY PET PARENTS
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                Real stories from real <span className="text-[#10B981]">pet parents</span>.
              </h2>
            </div>

            <Link
              href="/en/pet-travel"
              className="inline-flex items-center gap-1 border border-zinc-200 hover:border-zinc-300 text-xs font-semibold text-zinc-700 px-3.5 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
            >
              <span>View more reviews</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3 text-xs">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed mb-6 font-normal">
                  &ldquo;The report was super detailed and easy to follow. Our dog&apos;s trip to Germany went smoothly, no surprises at the airport!&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                  <Image
                    src="/avatar-jessica.jpg"
                    alt="Jessica M."
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-zinc-900">
                    Jessica M.
                  </h5>
                  <p className="text-[10px] text-zinc-500">
                    New York, USA
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3 text-xs">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed mb-6 font-normal">
                  &ldquo;Worth every penny! It saved us so much time and stress. Everything was exactly as described in the report.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                  <Image
                    src="/avatar-david.jpg"
                    alt="David P."
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-zinc-900">
                    David P.
                  </h5>
                  <p className="text-[10px] text-zinc-500">
                    Toronto, Canada
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3 text-xs">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed mb-6 font-normal">
                  &ldquo;Finally, a service that tells you exactly what you need. Clear, accurate and updated. Highly recommend!&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                  <Image
                    src="/avatar-priya.jpg"
                    alt="Priya S."
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-zinc-900">
                    Priya S.
                  </h5>
                  <p className="text-[10px] text-zinc-500">
                    Bangalore, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5.5 PRICING & PACKAGING SECTION (3-TIER) ────────────────────── */}
      <PricingSection />

      {/* ─── 6. CTA BANNER (READY FOR YOUR NEXT ADVENTURE?) ───────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0B1528] px-6 py-8 sm:px-10 sm:py-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-md">
                <Image
                  src="/pet-passport.jpg"
                  alt="Pet passport and tickets"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                  Ready for your next adventure?
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm max-w-md leading-relaxed">
                  Get your pet&apos;s compliance report now and travel worry-free.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-2 shrink-0">
              <Link
                href="/en/checker"
                className="inline-flex items-center gap-2 bg-[#20B26C] hover:bg-[#1CA061] text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition-all text-xs sm:text-sm"
              >
                <span>Get My Report Now</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <span className="text-[11px] text-zinc-400">
                Instant • Accurate • Reliable
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
