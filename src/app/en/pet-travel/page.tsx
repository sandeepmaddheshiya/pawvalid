import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Travel Route Directory — Sourced Statutory Guides | PawValid',
  description: 'Browse route-specific pet travel requirements, quarantine rules, and government health certificate protocols verified against official border authorities.',
};

interface RouteCard {
  slug: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  originCode: string;
  destCode: string;
  region: string;
  titer: string;
  quarantine: string;
  leadTime: string;
  authority: string;
}

const ROUTES: RouteCard[] = [
  {
    slug: 'usa-to-germany',
    from: 'United States',
    to: 'Germany',
    fromFlag: '🇺🇸',
    toFlag: '🇩🇪',
    originCode: 'US',
    destCode: 'DE',
    region: 'North America → European Union',
    titer: 'Exempt',
    quarantine: '0 Days',
    leadTime: '21 Days',
    authority: 'German BMEL & EU Reg 576/2013',
  },
  {
    slug: 'usa-to-uk',
    from: 'United States',
    to: 'United Kingdom',
    fromFlag: '🇺🇸',
    toFlag: '🇬🇧',
    originCode: 'US',
    destCode: 'GB',
    region: 'North America → Great Britain',
    titer: 'Exempt',
    quarantine: '0 Days',
    leadTime: '21 Days + Tapeworm',
    authority: 'UK APHA & DEFRA',
  },
  {
    slug: 'usa-to-australia',
    from: 'United States',
    to: 'Australia',
    fromFlag: '🇺🇸',
    toFlag: '🇦🇺',
    originCode: 'US',
    destCode: 'AU',
    region: 'North America → Oceania',
    titer: 'Mandatory (180d wait)',
    quarantine: '10–30 Days PEQ',
    leadTime: '7 Months',
    authority: 'Australian DAFF',
  },
  {
    slug: 'usa-to-canada',
    from: 'United States',
    to: 'Canada',
    fromFlag: '🇺🇸',
    toFlag: '🇨🇦',
    originCode: 'US',
    destCode: 'CA',
    region: 'North America Cross-Border',
    titer: 'Exempt',
    quarantine: '0 Days',
    leadTime: 'Current Vaccine',
    authority: 'Canadian CFIA',
  },
  {
    slug: 'usa-to-japan',
    from: 'United States',
    to: 'Japan',
    fromFlag: '🇺🇸',
    toFlag: '🇯🇵',
    originCode: 'US',
    destCode: 'JP',
    region: 'North America → East Asia',
    titer: 'Mandatory FAVN (180d)',
    quarantine: '0–12h (if compliant)',
    leadTime: '7–8 Months',
    authority: 'Japan MAFF AQS',
  },
];

export default function PetTravelIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* ─── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">Pet Travel Route Directory</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Official Government Rules Verified</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HEADER ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="section-container">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
            Global Compliance Network
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-3">
            Pet Travel Route Directory
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
            Select your international travel corridor to access route-specific statutory import rules, blood titer exemptions, quarantine durations, and government health certificate protocols.
          </p>
        </div>
      </section>

      {/* ─── 3. ROUTES GRID ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROUTES.map((route) => (
              <Link
                key={route.slug}
                href={`/en/pet-travel/${route.slug}`}
                className="group bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Flag & Region Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200/80 text-xs font-semibold text-zinc-700">
                      <span className="text-base leading-none">{route.fromFlag}</span>
                      <span>{route.originCode}</span>
                      <span className="text-zinc-400">→</span>
                      <span className="text-base leading-none">{route.toFlag}</span>
                      <span>{route.destCode}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-zinc-400 tracking-wider uppercase">
                      Air &amp; Cargo
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-zinc-900 group-hover:text-[#0E2342] transition-colors mb-1">
                    {route.from} to {route.to}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4">
                    {route.region}
                  </p>

                  {/* Fast Specs Matrix */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-100 text-left mb-4">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Titer Test</span>
                      <strong className={`text-xs font-bold block truncate ${
                        route.titer === 'Exempt' ? 'text-emerald-700' : 'text-zinc-900'
                      }`}>
                        {route.titer}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Quarantine</span>
                      <strong className="text-xs font-bold text-zinc-900 block truncate">
                        {route.quarantine}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Lead Time</span>
                      <strong className="text-xs font-bold text-zinc-900 block truncate">
                        {route.leadTime}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700 pt-1">
                  <span className="text-[11px] text-zinc-500 font-normal truncate max-w-[170px]">
                    {route.authority}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Guide</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
