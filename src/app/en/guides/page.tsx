import Link from 'next/link';
import type { Metadata } from 'next';
import { GUIDES } from '@/lib/data/guides';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Pet Travel Regulatory Guides & Manuals (2026) | PawValid',
  description:
    'Authoritative, source-backed manuals on international pet travel compliance: FAVN rabies titer testing, USDA APHIS VEHCS endorsements, IATA crate requirements, and biosecurity rules.',
  keywords: [
    'pet travel guide',
    'favn rabies titer guide',
    'usda vehcs endorsement',
    'iata crate sizing',
    'international pet relocation',
    'pet passport requirements',
  ],
  alternates: {
    canonical: 'https://pawvalid.online/en/guides',
  },
};

export default function GuidesIndexPage() {
  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Regulatory Guides', url: '/en/guides' },
  ]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ─── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-hidden text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">Regulatory Guides</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Statutory Knowledge Hub • 2026</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 pt-12 pb-14 sm:pt-16 sm:pb-18">
        <div className="section-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 mb-4 text-xs font-semibold text-zinc-700">
            <span>Official Biosecurity &amp; Flight Procedures</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
            International Pet Travel <span className="text-[#0E2342]">Regulatory Guides</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl leading-relaxed mb-8">
            Detailed, step-by-step documentation for veterinarians and pet parents navigating complex cross-border biosecurity protocols. Backed by official WOAH, USDA APHIS, DEFRA, and IATA legal statutes.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Titer Threshold</span>
              <span className="text-lg font-bold text-zinc-900 mt-0.5 block">≥ 0.50 IU/mL</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">WOAH universal standard</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">VEHCS Window</span>
              <span className="text-lg font-bold text-zinc-900 mt-0.5 block">10-Day Window</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">Pre-arrival exam mandate</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Crate Standard</span>
              <span className="text-lg font-bold text-zinc-900 mt-0.5 block">IATA CR-1</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">Metal hardware mandatory</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Verification</span>
              <span className="text-lg font-bold text-emerald-700 mt-0.5 block">Deterministic</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">Zero AI hallucination</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. GUIDES LIST ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="space-y-6">
            {GUIDES.map((guide) => (
              <article
                key={guide.slug}
                className="bg-white border border-zinc-200/90 hover:border-zinc-300 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-bold uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-500">{guide.readTime}</span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-400">Updated {guide.dateModified}</span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-3 hover:text-[#0E2342] transition-colors">
                  <Link href={`/en/guides/${guide.slug}`}>
                    {guide.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5 max-w-4xl">
                  {guide.description}
                </p>

                <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200/60 mb-6 text-xs text-emerald-950 font-medium leading-relaxed">
                  <strong className="text-emerald-900">Statutory Basis:</strong> {guide.statutoryBasis}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                  <span className="text-xs text-zinc-500">Official PawValid Reference Manual</span>
                  <Link
                    href={`/en/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E2342] hover:text-[#16345E] transition-colors"
                  >
                    <span>Read Full Guide &amp; Checklist</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
