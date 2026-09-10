import Link from 'next/link';
import type { Metadata } from 'next';
import { AIRLINES } from '@/lib/data/airlines';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'International Airline Pet Policies & Crate Guidelines (2026) | PawValid',
  description:
    'Compare in-cabin weight limits, carrier dimensions, hold fees, and snub-nosed breed restrictions across major international airlines including Lufthansa, British Airways, Delta, and Emirates.',
  keywords: [
    'airline pet policy',
    'flying with a dog',
    'pet in cabin weight limit',
    'lufthansa pet travel',
    'british airways pet policy',
    'delta pet fee',
    'emirates skycargo pet',
    'airline approved pet carrier',
    'iata crate calculator',
  ],
  alternates: {
    canonical: 'https://pawvalid.online/en/airlines',
  },
};

export default function AirlinesIndexPage() {
  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Airline Pet Policies', url: '/en/airlines' },
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
            <span className="font-semibold text-zinc-900">Airline Pet Policies</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Verified 2026 Carrier Regulations</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 pt-12 pb-14 sm:pt-16 sm:pb-18">
        <div className="section-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 mb-4 text-xs font-semibold text-zinc-700">
            <span>Global Aviation Biosecurity Directory</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
            International Airline <span className="text-[#0E2342]">Pet Policies</span> &amp; Crate Rules
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl leading-relaxed mb-8">
            Every airline enforces unique in-cabin weight ceilings, maximum soft-sided carrier dimensions, and cargo hold restrictions. Compare verified 2026 carrier protocols to ensure your pet is never turned away at check-in.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">In-Cabin Average</span>
              <span className="text-lg font-bold text-zinc-900 mt-0.5 block">8 kg (17.6 lbs)</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">Including soft carrier</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Typical Carry-On Fee</span>
              <span className="text-lg font-bold text-zinc-900 mt-0.5 block">$95 – $200</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">Each way per kennel</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Cargo Max Weight</span>
              <span className="text-lg font-bold text-zinc-900 mt-0.5 block">Up to 75 kg</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">Pet + rigid IATA crate</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Snub-Nosed Rule</span>
              <span className="text-lg font-bold text-red-700 mt-0.5 block">Hold Banned</span>
              <span className="text-[11px] text-zinc-500 mt-0.5 block">Most international carriers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. AIRLINE COMPARISON DIRECTORY ────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900">
                Major International Carriers
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                Select an airline to view full in-cabin specifications, crate sizing, layover handling, and booking protocols.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AIRLINES.map((airline) => (
              <div
                key={airline.slug}
                className="bg-white border border-zinc-200/90 hover:border-zinc-300 rounded-2xl p-6 transition-all hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0E2342] text-white flex items-center justify-center font-bold text-sm tracking-wider shrink-0">
                        {airline.logoText}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-zinc-900">
                          {airline.name}
                        </h3>
                        <span className="text-xs text-zinc-500">
                          {airline.alliance} • {airline.headquarters}
                        </span>
                      </div>
                    </div>
                    {airline.inCabinAllowed ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold shrink-0">
                        In-Cabin Allowed
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold shrink-0">
                        Cargo / Hold Only
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed mb-4 line-clamp-3">
                    {airline.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-5 bg-zinc-50/70 p-3 rounded-xl border border-zinc-200/60">
                    <div>
                      <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">In-Cabin Max</span>
                      <span className="font-semibold text-zinc-800">
                        {airline.inCabinAllowed ? `${airline.inCabinMaxWeightKg || 'Seat fit'} kg limit` : 'Assistance only'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Estimated Fee</span>
                      <span className="font-semibold text-zinc-800 truncate block" title={airline.inCabinFeeRange}>
                        {airline.inCabinFeeRange}
                      </span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-zinc-200/60">
                      <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Transit Hub Care</span>
                      <span className="font-medium text-zinc-700 truncate block text-[11px]" title={airline.transitHubCare}>
                        {airline.transitHubCare}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                  <span className="text-[11px] text-zinc-500 font-medium">Verified 2026</span>
                  <Link
                    href={`/en/airlines/${airline.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E2342] hover:text-[#16345E] transition-colors"
                  >
                    <span>View Full Policy &amp; Rules</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CRATE CALCULATOR CROSS-PROMOTION ────────────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-gradient-to-br from-[#0E2342] to-[#16345E] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div className="max-w-xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                IATA Compliance Sizing
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Not sure if your crate will pass airline inspection?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Airlines enforce strict IATA Container Requirement 1 formulas. If your pet’s ears touch the roof or they cannot turn around naturally, airlines will refuse boarding at the gate.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/en/checker"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm"
              >
                <span>Check Your Pet&apos;s Readiness</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
