import Link from 'next/link';
import type { Metadata } from 'next';
import { getHreflangAlternates } from '@/lib/seo/hreflang';
import { getBreadcrumbSchema, BASE_URL } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'About PawValid — Mission, Founder & Compliance Methodology | PawValid',
  description:
    'Learn about PawValid, our founder Sandeep Maddheshiya, and our strict primary-source compliance methodology for international pet travel and cross-border biosecurity.',
  alternates: getHreflangAlternates('/about'),
  openGraph: {
    title: 'About PawValid — Sourced Pet Travel Compliance',
    description:
      'Our mission, founder story, and 4-pillar regulatory verification methodology for international pet relocation.',
    url: `${BASE_URL}/en/about`,
    siteName: 'PawValid',
    type: 'website',
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About PawValid', url: '/en/about' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About PawValid',
    description:
      'Independent global pet travel compliance platform verifying pet relocation documents against official DEFRA, USDA APHIS, EU DG SANTE, and DAFF border regulations.',
    url: `${BASE_URL}/en/about`,
    mainEntity: {
      '@type': 'Person',
      name: 'Sandeep Maddheshiya',
      jobTitle: 'Founder & Lead Compliance Architect',
      url: `${BASE_URL}/en/about`,
      sameAs: [
        'https://github.com/sandeepmaddheshiya',
        'https://twitter.com/pawvalid',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'PawValid',
        url: BASE_URL,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* ─── JSON-LD SCHEMAS ────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      {/* ─── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">About PawValid</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Independent Compliance Platform</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO / MISSION ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Our Mission &amp; Purpose
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
              Making International Pet Travel Deterministic, Safe, and Transparent
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              PawValid was created to eliminate the anxiety, ambiguity, and high risk of document rejection when relocating across international borders with dogs and cats. We replace confusing government portals and generic forum advice with codified, source-backed compliance automation.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-100">
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Authorities</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">15+ Gov Bodies</strong>
              <span className="text-[11px] text-zinc-400">Directly Audited</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Legal Standards</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">100% Primary</strong>
              <span className="text-[11px] text-zinc-400">Statutory Citations</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Independence</span>
              <strong className="text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5 block">Zero Bias</strong>
              <span className="text-[11px] text-zinc-400">No Airline Affiliates</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Accuracy SLA</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">Current</strong>
              <span className="text-[11px] text-zinc-400">Continuous Monitoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FOUNDER STORY & LETTER ──────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-8 sm:p-12 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Founder Bio Card */}
              <div className="lg:col-span-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-200 text-center">
                <div className="w-24 h-24 rounded-full bg-[#0E2342] text-white flex items-center justify-center text-3xl font-serif font-bold mx-auto mb-4 shadow-sm">
                  SM
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900">
                  Sandeep Maddheshiya
                </h3>
                <p className="text-xs font-semibold text-emerald-700 mb-2">
                  Founder &amp; Lead Compliance Architect
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  Full-stack software architect and international compliance researcher focusing on deterministic regulatory verification engines.
                </p>
                <div className="pt-3 border-t border-zinc-200 flex items-center justify-center gap-3 text-xs text-zinc-600">
                  <a
                    href="https://github.com/sandeepmaddheshiya/pawvalid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    GitHub
                  </a>
                  <span>•</span>
                  <a
                    href="mailto:support@pawvalid.online"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>

              {/* Founder Letter Content */}
              <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Why I Built PawValid
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                  A Letter from Our Founder
                </h2>

                <p>
                  Traveling abroad with a companion animal is one of the most emotionally charged journeys a pet parent can take. Yet, the current regulatory landscape is notoriously fragmented. A single missing microchip timestamp, a rabies vaccine administered on the same day as a chip implantation, or an unendorsed USDA health certificate can lead to immediate airline boarding denial, thousands of dollars in emergency quarantine fees, or forced deportation of a pet.
                </p>

                <p>
                  When researching pet relocations, I discovered that pet owners were forced to navigate a labyrinth of contradictory information: outdated blogs, unverified social media threads, and opaque government websites written in dense legal terminology without clear timing clocks.
                </p>

                <p>
                  I built <strong>PawValid</strong> to solve this fundamental trust crisis. By translating statutory legal frameworks (such as EU Regulation 576/2013, the CDC August 2024 Dog Import Rule, UK DEFRA statutes, and Australian Biosecurity Acts) into deterministic code, PawValid provides pet parents and veterinarians with clear, instant, and mathematically verifiable compliance assessments.
                </p>

                <blockquote className="p-4 bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-xl text-zinc-800 italic my-4 text-xs sm:text-sm">
                  &ldquo;Compliance shouldn&apos;t be a guessing game. When animals and families are crossing borders, precision and statutory honesty are everything.&rdquo;
                </blockquote>

                <p>
                  PawValid remains completely independent. We do not accept referral fees or kickbacks from commercial pet transport companies. Our sole commitment is providing pet parents with the most reliable, up-to-date compliance technology available.
                </p>

                <div className="pt-4">
                  <strong className="block text-zinc-900 font-bold">Sandeep Maddheshiya</strong>
                  <span className="text-xs text-zinc-500">Founder, PawValid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THE 4-PILLAR METHODOLOGY ─────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Rigorous Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Our 4-Pillar Regulatory Compliance Methodology
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
              Every rule, requirement, and deadline in PawValid is grounded in verifiable legal standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3">
                01
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-1.5">
                Primary Government Source Exclusivity
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                We never scrape or rely on secondary travel blogs, forums, or commercial moving agencies. Every statutory rule in our engine links directly to its official origin (e.g. DEFRA, USDA APHIS, EU DG SANTE, Australian DAFF, CFIA, SENASICA, Singapore AVS).
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs mb-3">
                02
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-1.5">
                Deterministic Date &amp; Latency Logic
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Compliance failures almost always happen in the calendar math. Our engine models exact statutory rules: 21-day rabies latency windows (Day 0 + 21), 24–120 hour tapeworm treatment windows, and 180-day post-titer antibody waiting clocks.
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs mb-3">
                03
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-1.5">
                Continuous Regulatory Auditing
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                International biosecurity policies change constantly (such as the CDC&apos;s August 1, 2024 dog import rules and post-Brexit Great Britain requirements). We audit border notices and update rules catalogs with timestamped verification dates.
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs mb-3">
                04
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-1.5">
                Fail-Safe Verification Principles
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                If a document is unreadable, an endorsement date is ambiguous, or a required vaccine is not documented, PawValid explicitly flags the gap as a blocking item rather than making dangerous assumptions that could leave a pet stranded at customs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. CONTACT & EDITORIAL OVERSIGHT ────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Transparency &amp; Governance
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                Editorial Review Board &amp; Corrections
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                We maintain an active regulatory corrections desk. If an airline updates their pet crate embargoes or a government ministry alters its import health certificate, our team investigates and patches the rules engine within 24 hours.
              </p>
              <div className="text-xs text-zinc-700 space-y-1 font-medium">
                <div>• Editorial Inquiries: <a href="mailto:regulatory@pawvalid.online" className="text-emerald-700 underline">regulatory@pawvalid.online</a></div>
                <div>• General Support: <a href="mailto:support@pawvalid.online" className="text-emerald-700 underline">support@pawvalid.online</a></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Zero Conflict of Interest
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                Our Independence Guarantee
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                PawValid does not sell animal relocation services, airline tickets, or veterinary pharmaceuticals. Because we do not earn referral commissions from pet transport agencies, our compliance assessments remain 100% objective and focused solely on passenger readiness.
              </p>
              <div className="text-[11px] text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                🔒 Privacy First: Pet medical records and microchip documents uploaded to PawValid are encrypted and never shared with third-party marketers.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CALL TO ACTION ───────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-[#08162A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                Ready to Fly?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                Check your pet&apos;s travel readiness in seconds
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                Upload your pet&apos;s vaccination records and microchip details. Get an instant, statutory gap analysis backed by official government rules.
              </p>
              <Link
                href="/en/assessment"
                className="inline-flex items-center gap-2 bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Run Free Compliance Assessment</span>
                <span>→</span>
              </Link>
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-400 flex-wrap">
                <span>✓ Sourced from 15+ Governments</span>
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
