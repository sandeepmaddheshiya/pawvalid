import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeroTripForm from '@/components/HeroTripForm';
import HomeScannerSection from '@/components/HomeScannerSection';
import TimelineMilestones from '@/components/TimelineMilestones';
import LiveSampleReportCard from '@/components/LiveSampleReportCard';
import FaqAccordion from '@/components/FaqAccordion';
import PricingSection from '@/components/PricingSection';
import StickyBottomCta from '@/components/StickyBottomCta';

export const metadata: Metadata = {
  title: 'Petvia — Stress-free pet travel starts with verified paperwork',
  description:
    'Instant pet travel compliance checks, official document verification, and timeline planning across 120+ countries. Never get turned away at airport border control.',
};

export default function HomePage() {
  return (
    <div className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
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
            {/* Left Column: Headline, Bullets, Authority Badge */}
            <div className="lg:col-span-6 space-y-6 pt-2 pb-6 flex flex-col justify-center">
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-2xs self-start">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden relative ring-1 ring-white">
                    <Image
                      src="/avatar-jessica.jpg"
                      alt="Pet parent Jessica"
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full overflow-hidden relative ring-1 ring-white">
                    <Image
                      src="/avatar-david.jpg"
                      alt="Pet parent David"
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full overflow-hidden relative ring-1 ring-white">
                    <Image
                      src="/avatar-priya.jpg"
                      alt="Pet parent Priya"
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-zinc-700">
                  Trusted across 120+ countries • Official border compliance
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-zinc-900">
                Stress-free pet<br />
                travel starts with<br />
                <span className="text-emerald-600">verified</span> paperwork.
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-lg">
                Instant regulatory compliance checks, official document verification, and timeline planning across 120+ countries. Never get turned away at airport border control.
              </p>

              {/* 3 Checkpoint Bullets */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Official government &amp; border authority requirements</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Route-specific mandatory wait times calculated to the day</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Document validity checks before booking non-refundable tickets</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Form Card */}
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

              {/* Floating Form Card */}
              <div className="w-full flex justify-center lg:justify-end">
                <HeroTripForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. SUBSTANTIATED TRUST / CAPABILITY BAR ───────────────────────── */}
      <section className="relative z-20 -mt-6 sm:-mt-8 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-md px-6 py-6 sm:py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-zinc-100">
              {/* 1. 120+ Destination Country Rules */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4 first:lg:pl-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    120+ Country Rules
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    Monitored against sovereign biosecurity statutes
                  </p>
                </div>
              </div>

              {/* 2. Document Validity Engine */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    Document Verification
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    Validates microchip ISO, vaccines &amp; titers
                  </p>
                </div>
              </div>

              {/* 3. Timeline Milestone Calculation */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    Timeline Calculation
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    Computes exact earliest departure date
                  </p>
                </div>
              </div>

              {/* 4. Official Regulatory Sources */}
              <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4 last:lg:pr-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-[13px] leading-tight">
                    Official Regulations
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                    EU 2026/131, USDA APHIS, DEFRA &amp; MAFF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. STAR SECTION: DOCUMENT VERIFICATION DROPZONE ──────────────── */}
      <section id="scanner" className="py-16 sm:py-20 bg-[#FAFCFB] border-t border-b border-zinc-200/70 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              OFFICIAL VERIFICATION ENGINE
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Verify your documents <span className="text-emerald-600">before booking</span>.
            </h2>
            <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
              Upload your pet&apos;s passport, rabies certificate, or titer lab test. We verify microchip sequence, vaccination validity, and mandatory wait times against destination country statutes.
            </p>
          </div>

          <HomeScannerSection />
        </div>
      </section>

      {/* ─── 4. INTERACTIVE TIMELINE MILESTONES ───────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TimelineMilestones />
        </div>
      </section>

      {/* ─── 5. LIVE SAMPLE COMPLIANCE REPORT CARD ────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F9FBFA] border-t border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              REAL-WORLD AUDIT BREAKDOWN
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              See what a verified <span className="text-emerald-600">Petvia report</span> looks like.
            </h2>
            <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
              Every requirement is audited against official biosecurity standards. Here is an authentic sample audit for a dog relocating from India to Germany.
            </p>
          </div>

          <LiveSampleReportCard />
        </div>
      </section>

      {/* ─── 6. WHAT PETVIA CHECKS: 5 COMPLIANCE PILLARS ─────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              COMPREHENSIVE AUDITING
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              The 5 compliance pillars <span className="text-emerald-600">Petvia checks</span>.
            </h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Border control officials and airline gate staff inspect these exact five standards before allowing any pet to board or clear customs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-3 font-bold">
                  01
                </div>
                <h4 className="font-display font-bold text-sm text-zinc-900 mb-1.5">
                  ISO Microchip Standards
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Verifies 15-digit ISO 11784/11785 transponder implant date strictly precedes all rabies immunizations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-semibold text-zinc-500">
                Rule: Chip before vaccine
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-3 font-bold">
                  02
                </div>
                <h4 className="font-display font-bold text-sm text-zinc-900 mb-1.5">
                  Primary &amp; Booster Vaccines
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Checks authorized vaccine manufacturer, batch number, 21-day primary lag, and 1 or 3-year expiration dates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-semibold text-zinc-500">
                Rule: Zero lapse in booster history
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-3 font-bold">
                  03
                </div>
                <h4 className="font-display font-bold text-sm text-zinc-900 mb-1.5">
                  FAVN / RNATT Blood Titer
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Validates testing by official EU/UK approved laboratory with neutralising antibody titre ≥0.50 IU/mL.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-semibold text-zinc-500">
                Rule: Designated labs only
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-3 font-bold">
                  04
                </div>
                <h4 className="font-display font-bold text-sm text-zinc-900 mb-1.5">
                  Waiting Periods &amp; Windows
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Calculates mandatory 90-day wait (EU/UK from unlisted origin) or 180-day wait (Japan/Australia) to the calendar day.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-semibold text-zinc-500">
                Rule: Mathematical calculation
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-3 font-bold">
                  05
                </div>
                <h4 className="font-display font-bold text-sm text-zinc-900 mb-1.5">
                  Government Health Certs
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Specifies country-specific form (EU Annex IV, USDA APHIS 7001, GB Health Cert) with state veterinary endorsement.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] font-semibold text-zinc-500">
                Rule: Strict 10-day pre-flight window
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. BEFORE VS. AFTER PETVIA COMPARISON TABLE ──────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FAFCFB] border-t border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              THE PETVIA DIFFERENCE
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Before Petvia vs. <span className="text-emerald-600">With Petvia</span>.
            </h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Why thousands of pet owners switch from confusing government PDFs to our verified compliance platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Painful Way Without Petvia */}
            <div className="bg-white rounded-3xl border border-red-200/80 p-6 sm:p-8 shadow-sm relative">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-red-100">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm shrink-0">
                  ✕
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900">
                    Without Petvia
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Confusing, high-risk DIY research
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-zinc-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Reading 40-page outdated PDFs across broken embassy websites</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Guessing whether a 21-day or 90-day waiting period applies to your route</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Local veterinarians accidentally signing obsolete health certificate annexes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Discovering missing bloodwork 48 hours before flight at airline check-in</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-0.5">✕</span>
                  <span>Severe risk of airport pet quarantine, denied boarding, or emergency return flights</span>
                </li>
              </ul>
            </div>

            {/* The Calm, Confident Petvia Way */}
            <div className="bg-white rounded-3xl border-2 border-emerald-500/80 p-6 sm:p-8 shadow-md relative">
              <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                Zero Airport Surprises
              </div>

              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-emerald-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900">
                    With Petvia
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Verified, date-locked compliance clarity
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-zinc-700">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Instant route-specific breakdown decoded into plain, unambiguous language</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Automated mathematical engine calculating your exact earliest legal departure date</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Automated document check catching expired vaccines, microchip date sequencing errors &amp; missing stamps</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>Print-ready veterinary checklist instructions prepared for your state vet endorsement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>100% border compliance confidence backed by active sovereign biosecurity law</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. ROUTE-SPECIFIC REGULATORY TRUST SECTION ───────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              OFFICIAL JURISDICTIONS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Aligned with <span className="text-emerald-600">official statutes</span>.
            </h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Petvia cross-references your origin country&apos;s rabies classification against destination border biosecurity protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* EU */}
            <div className="p-6 rounded-2xl bg-[#FAFCFB] border border-zinc-200/90 shadow-2xs">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-1 rounded-md inline-block mb-3">
                European Union 🇪🇺
              </span>
              <h4 className="font-display font-bold text-sm text-zinc-900 mb-1">
                Regulation (EU) 2026/131
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                Non-commercial movement of pet animals, Annex IV health certificate standards, and EU approved reference lab validation.
              </p>
              <div className="text-[11px] text-zinc-400 font-medium">
                Standard: ISO 11784 &amp; 90-day unlisted rule
              </div>
            </div>

            {/* US */}
            <div className="p-6 rounded-2xl bg-[#FAFCFB] border border-zinc-200/90 shadow-2xs">
              <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200/70 px-2.5 py-1 rounded-md inline-block mb-3">
                United States 🇺🇸
              </span>
              <h4 className="font-display font-bold text-sm text-zinc-900 mb-1">
                USDA APHIS &amp; CDC
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                VEHCS digital endorsement, CDC Dog Import Form, titer requirements from high-risk rabies jurisdictions.
              </p>
              <div className="text-[11px] text-zinc-400 font-medium">
                Standard: USDA Accredited Veterinarian endorsement
              </div>
            </div>

            {/* UK */}
            <div className="p-6 rounded-2xl bg-[#FAFCFB] border border-zinc-200/90 shadow-2xs">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-1 rounded-md inline-block mb-3">
                United Kingdom 🇬🇧
              </span>
              <h4 className="font-display font-bold text-sm text-zinc-900 mb-1">
                DEFRA PETS &amp; APHA
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                Great Britain pet health certificate, approved carrier route guidelines, and Echinococcus tapeworm hour-based windows.
              </p>
              <div className="text-[11px] text-zinc-400 font-medium">
                Standard: 24h to 120h tapeworm administration
              </div>
            </div>

            {/* Japan / Australia */}
            <div className="p-6 rounded-2xl bg-[#FAFCFB] border border-zinc-200/90 shadow-2xs">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-md inline-block mb-3">
                Japan &amp; Australia 🇯🇵 🇦🇺
              </span>
              <h4 className="font-display font-bold text-sm text-zinc-900 mb-1">
                MAFF &amp; DAFF Biosecurity
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                40-day advance notification to Animal Quarantine Service, two rabies vaccines, and 180-day blood titer waiting duration.
              </p>
              <div className="text-[11px] text-zinc-400 font-medium">
                Standard: 180-day titer wait &amp; prior import permit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. REAL HIGH-STAKES TESTIMONIALS ─────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
                VERIFIED PET PARENTS
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                Stories from real <span className="text-emerald-600">relocating families</span>.
              </h2>
            </div>

            <Link
              href="/en/pet-travel"
              className="inline-flex items-center gap-1 border border-zinc-200 hover:border-zinc-300 text-xs font-semibold text-zinc-700 px-3.5 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
            >
              <span>Explore 120+ route guides</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
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
                  &ldquo;Petvia caught that our vet administered the booster 2 days before the microchip was registered on paper. The German border vet would have quarantined Luna for 3 weeks. Petvia saved our relocation.&rdquo;
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
                    Jessica M. &amp; Luna
                  </h5>
                  <p className="text-[10px] text-zinc-500">
                    Relocated New York, USA → Berlin, Germany
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
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
                  &ldquo;I spent 3 weeks reading DEFRA guides and still wasn&apos;t sure if tapeworm treatment had to be within 24-120 hours or 1-5 days. Petvia gave me an exact calendar window with hour-by-hour countdown.&rdquo;
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
                    David P. &amp; Winston
                  </h5>
                  <p className="text-[10px] text-zinc-500">
                    Relocated Toronto, Canada → London, UK
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
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
                  &ldquo;Taking a dog from India to the EU is an absolute nightmare with the 90-day titer wait. Petvia calculated the exact date Max was eligible to fly, and our documents were stamped through Frankfurt airport in 4 minutes.&rdquo;
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
                    Priya S. &amp; Max
                  </h5>
                  <p className="text-[10px] text-zinc-500">
                    Relocated Bangalore, India → Munich, Germany
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. AUTHORITATIVE FAQ SECTION ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FAFCFB] border-t border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Essential answers before <span className="text-emerald-600">you travel</span>.
            </h2>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Clear regulatory answers regarding border control, airline policies, and document validity.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* ─── 11. PRICING & PACKAGING SECTION (3-TIER) ─────────────────────── */}
      <PricingSection />

      {/* ─── 12. FINAL HIGH-CONVERSION CTA BANNER ─────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-zinc-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0B1528] px-6 py-10 sm:px-12 sm:py-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                <Image
                  src="/pet-passport.jpg"
                  alt="Pet passport and travel documents"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  Don&apos;t let missing paperwork ground your pet.
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                  Verify your travel requirements and calculate your legal departure date in 60 seconds.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-2 shrink-0">
              <Link
                href="#hero-form"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all text-xs sm:text-sm"
              >
                <span>Check My Requirements →</span>
              </Link>
              <span className="text-[11px] text-zinc-400">
                Instant • 120+ Countries • Verified Law
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 13. MOBILE STICKY BOTTOM CTA BAR ──────────────────────────────── */}
      <StickyBottomCta />
    </div>
  );
}
