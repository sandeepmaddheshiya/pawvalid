import Link from 'next/link';
import type { Metadata } from 'next';
import { getHreflangAlternates } from '@/lib/seo/hreflang';
import { getBreadcrumbSchema, BASE_URL } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Editorial & Statutory Verification Policy | PawValid',
  description:
    'Our statutory sourcing hierarchy, dual-peer veterinary verification methodology, update frequency SLAs, and public correction process for international pet travel compliance.',
  alternates: getHreflangAlternates('/editorial-policy'),
  openGraph: {
    title: 'Editorial & Statutory Verification Policy | PawValid',
    description:
      'Transparency standards, primary source requirements, and regulatory audit workflows governing the PawValid compliance engine.',
    url: `${BASE_URL}/en/editorial-policy`,
    siteName: 'PawValid',
    type: 'website',
  },
};

export default function EditorialPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Editorial & Verification Policy', url: '/en/editorial-policy' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  const policyPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'PawValid Editorial & Verification Policy',
    description:
      'Statutory verification standards, primary source hierarchy, and review processes governing PawValid compliance rules.',
    url: `${BASE_URL}/en/editorial-policy`,
    publisher: {
      '@type': 'Organization',
      name: 'PawValid',
      url: BASE_URL,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(policyPageSchema) }}
      />

      {/* ─── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">Editorial &amp; Verification Policy</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Policy Current as of September 2026</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO / COMMITMENT ────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Statutory Integrity &amp; Transparency
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
              Editorial, Sourcing &amp; Verification Policy
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              When traveling across international borders with pets, compliance is not a matter of opinion—it is governed by rigid sovereign statutes. This document details how PawValid sources, models, audits, and maintains regulatory accuracy across our platform.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-100">
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Source Mandate</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">Tier-1 Only</strong>
              <span className="text-[11px] text-zinc-400">Official Gov Ministries</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Update SLA</span>
              <strong className="text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5 block">&lt; 24 Hours</strong>
              <span className="text-[11px] text-zinc-400">Emergency Hotfixes</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Dual Audit</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">100% Rules</strong>
              <span className="text-[11px] text-zinc-400">Peer Reviewed</span>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
              <span className="text-[11px] font-semibold text-zinc-500 block uppercase">AI Transparency</span>
              <strong className="text-xl sm:text-2xl font-bold text-zinc-900 mt-0.5 block">Deterministic</strong>
              <span className="text-[11px] text-zinc-400">Zero Rule Hallucination</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. SOURCING HIERARCHY ───────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Data Quality Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              1. Our Statutory Sourcing Hierarchy
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
              We enforce a strict hierarchical threshold for all regulatory data incorporated into the PawValid rules engine.
            </p>
          </div>

          <div className="space-y-4">
            {/* Tier 1 */}
            <div className="bg-white rounded-2xl border border-emerald-200/90 p-6 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Tier 1: Mandatory Primary Authority (Primary Legal Standard)
                </span>
                <span className="text-xs font-semibold text-zinc-400">100% Required for Rule Deployment</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-3">
                All statutory rules, quarantine durations, and health certificate protocols must be directly cited from official sovereign publications. Examples include:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-600 font-mono">
                <li className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  • <strong>United Kingdom</strong>: DEFRA &amp; APHA (Retained EU Reg 576/2013)
                </li>
                <li className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  • <strong>United States</strong>: CDC (42 CFR 71.51) &amp; USDA APHIS
                </li>
                <li className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  • <strong>European Union</strong>: DG SANTE &amp; Commission Regulation 577/2013
                </li>
                <li className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  • <strong>Australia</strong>: DAFF Biosecurity Act 2015 &amp; BICON System
                </li>
                <li className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  • <strong>Canada</strong>: CFIA &amp; CBSA (Health of Animals Regulations)
                </li>
                <li className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  • <strong>Singapore</strong>: Animal &amp; Veterinary Service (AVS / NParks)
                </li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Tier 2: Transport &amp; Port Infrastructure Standards
                </span>
                <span className="text-xs font-semibold text-zinc-400">Operational Verification</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Carrier and airport requirements are cross-referenced directly against <strong>IATA Live Animals Regulations (LAR)</strong> and official Border Inspection Post (BIP) procedural manuals (e.g. Heathrow Animal Reception Centre - HARC, Frankfurt BIP, Mickleham PEQ).
              </p>
            </div>

            {/* Prohibited Sources */}
            <div className="bg-red-50/50 rounded-2xl border border-red-200/80 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 bg-red-100/70 px-2.5 py-1 rounded-full border border-red-200">
                  🚫 Prohibited Sources (Strictly Barred from Rule Catalog)
                </span>
              </div>
              <p className="text-xs text-red-950 leading-relaxed">
                Under no circumstances does PawValid cite or ingest secondary travel blogs, community forums (Reddit, Facebook groups), AI chatbots, or promotional commercial pet relocation brochures. Rules must withstand legal and border inspection scrutiny.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. VERIFICATION PIPELINE ────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Quality Assurance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              2. The 4-Step Verification &amp; Audit Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
              Every rule in our database undergoes an immutable four-stage verification protocol before entering production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-[#0E2342] text-white font-bold text-xs flex items-center justify-center mb-3">
                  1
                </span>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Primary Capture
                </span>
                <h4 className="font-bold text-sm text-zinc-900 mb-1.5">
                  Statutory Extraction
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Legal text is extracted verbatim from official government notices, recording exact clause citations and authority URLs.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-[#0E2342] text-white font-bold text-xs flex items-center justify-center mb-3">
                  2
                </span>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Logic Modeling
                </span>
                <h4 className="font-bold text-sm text-zinc-900 mb-1.5">
                  Deterministic Math
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Translating timing requirements into code: e.g. Day-0 latency equations, microchip preceding vaccine sequence validation, and FAVN 180-day clocks.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-[#0E2342] text-white font-bold text-xs flex items-center justify-center mb-3">
                  3
                </span>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Peer Audit
                </span>
                <h4 className="font-bold text-sm text-zinc-900 mb-1.5">
                  Dual Review
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  A second compliance auditor independently verifies the rule against original government publications before staging deployment.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  4
                </span>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Live Versioning
                </span>
                <h4 className="font-bold text-sm text-zinc-900 mb-1.5">
                  Timestamped Rule ID
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Rule is deployed with immutable ID and public <code className="text-[11px] text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded font-mono">lastVerifiedAt</code> timestamp displayed on all passenger reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. UPDATE CADENCE & CORRECTIONS SLA ─────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Update Frequency */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Monitoring Protocols
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                Update Frequency &amp; Emergency Hotfixes
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-700">
                <li className="flex items-start gap-2">
                  <strong className="text-emerald-700 shrink-0">Daily:</strong>
                  <span>Automated uptime and change-detection monitors on sovereign veterinary health portals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <strong className="text-emerald-700 shrink-0">Monthly:</strong>
                  <span>Comprehensive review of all 19 supported travel corridors and 15 destination country rules catalogs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <strong className="text-emerald-700 shrink-0">&lt; 24h SLA:</strong>
                  <span>Emergency hotfix deployment when sovereign agencies issue abrupt policy shifts (e.g. temporary breed bans or revised rabies certificates).</span>
                </li>
              </ul>
            </div>

            {/* Public Corrections Channel */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Public Accountability
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                Public Corrections &amp; Feedback Desk
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                We invite veterinarians, USDA/DEFRA official certifiers, and pet owners to report any discrepancy observed at customs or airline desks.
              </p>
              <div className="text-xs text-zinc-800 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 space-y-1">
                <div>• Dedicated Correction Desk: <a href="mailto:regulatory@pawvalid.online" className="text-emerald-700 font-semibold underline">regulatory@pawvalid.online</a></div>
                <div>• Guaranteed Response Time: <strong>Within 24 business hours</strong></div>
                <div>• Process: Immediate review → Rule patch → Public changelog update</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. AI DISCLOSURE & GOVERNANCE ──────────────────────────────── */}
      <section className="py-12 bg-white border-y border-zinc-200/80">
        <div className="section-container max-w-4xl">
          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
              AI &amp; Technology Governance
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-3">
              How Artificial Intelligence is Used (and Controlled) at PawValid
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
              <p>
                <strong>Multimodal OCR &amp; Document Parsing:</strong> PawValid uses specialized vision models to extract structured text (microchip numbers, vaccine manufacturers, batch numbers, endorsement seals, and vet signatures) from photographed or scanned records.
              </p>
              <p>
                <strong>Zero Hallucination Guarantee:</strong> AI models <em>never</em> determine whether a pet passes or fails compliance. Once document fields are digitized, they are evaluated exclusively by deterministic Python/TypeScript logic engines comparing against codified statutory rules.
              </p>
              <p>
                <strong>Fail-Safe Principle:</strong> If a document image is blurred, cropped, or ambiguous, the engine immediately assigns a <code className="text-xs bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">REVIEW_REQUIRED</code> or <code className="text-xs bg-red-100 text-red-900 px-1 py-0.5 rounded font-mono">BLOCKING</code> verdict rather than making assumptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. CONVERSION CTA ───────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="section-container">
          <div className="bg-[#08162A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                Audited Compliance Engine
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                Experience deterministic pet travel readiness
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                Upload your pet&apos;s vaccination records and microchip details. We check your paperwork against 100% verified sovereign border rules.
              </p>
              <Link
                href="/en/assessment"
                className="inline-flex items-center gap-2 bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Run Free Sourced Compliance Assessment</span>
                <span>→</span>
              </Link>
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-400 flex-wrap">
                <span>✓ Sourced from Official Legislation</span>
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
