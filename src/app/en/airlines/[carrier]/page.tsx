import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AIRLINES, type AirlinePolicy } from '@/lib/data/airlines';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';

interface Props {
  params: Promise<{ carrier: string }>;
}

export async function generateStaticParams() {
  return AIRLINES.map((a) => ({
    carrier: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carrier } = await params;
  const airline = AIRLINES.find((a) => a.slug === carrier);
  if (!airline) return { title: 'Airline Pet Policy Not Found | PawValid' };

  const title = `${airline.name} Pet Travel Policy & Crate Rules (2026) | PawValid`;
  const description = `Verified 2026 pet travel rules for ${airline.name} (${airline.code}). In-cabin weight limits (${airline.inCabinAllowed ? `${airline.inCabinMaxWeightKg}kg max` : 'Cargo only'}), kennel dimensions, fees, and snub-nosed breed restrictions.`;

  return {
    title,
    description,
    keywords: [
      `${airline.name} pet policy`,
      `flying with dog ${airline.name}`,
      `${airline.name} in cabin pet`,
      `${airline.name} pet fee`,
      `${airline.name} pet cargo`,
      `${airline.code} pet travel`,
      'iata crate requirements',
    ],
    alternates: {
      canonical: `https://pawvalid.online/en/airlines/${airline.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://pawvalid.online/en/airlines/${airline.slug}`,
      type: 'article',
      images: [
        {
          url: '/hero-dog-airport.jpg',
          width: 1200,
          height: 630,
          alt: `${airline.name} Pet Travel Policy 2026`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero-dog-airport.jpg'],
    },
  };
}

export default async function AirlineDetailPage({ params }: Props) {
  const { carrier } = await params;
  const airline = AIRLINES.find((a) => a.slug === carrier);
  if (!airline) notFound();

  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Airline Pet Policies', url: '/en/airlines' },
    { name: airline.name, url: `/en/airlines/${airline.slug}` },
  ]);

  const faqLd = getFaqSchema(airline.faqs);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${airline.name} Pet Travel Policy & Guidelines (2026 Update)`,
    description: airline.summary,
    author: {
      '@type': 'Organization',
      name: 'PawValid Regulatory Intelligence Team',
      url: 'https://pawvalid.online',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PawValid',
      logo: 'https://pawvalid.online/globe.svg',
    },
    dateModified: '2026-09-10T10:00:00Z',
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* ─── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-hidden text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/airlines" className="hover:text-zinc-900 transition-colors">Airlines</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900 truncate">{airline.name}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 Tariff &amp; Carrier Verified</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO HEADER ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="section-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 mb-4 text-xs font-semibold text-zinc-700">
            <span className="px-1.5 py-0.5 rounded bg-[#0E2342] text-white text-[11px] font-bold">{airline.code}</span>
            <span>{airline.alliance}</span>
            <span className="text-zinc-300">•</span>
            <span>{airline.headquarters}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
            {airline.name} <span className="text-[#0E2342]">Pet Travel Policy</span> (2026 Guide)
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl leading-relaxed mb-6">
            {airline.summary}
          </p>

          {/* AEO Direct Answer / Key Takeaways Snippet Box */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-200/90 rounded-2xl p-5 sm:p-6 mb-8 shadow-xs">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                AEO Direct Answer / Policy Summary
              </span>
              <span className="text-[11px] text-zinc-500 hidden sm:inline">• Official Airline Regulations</span>
            </div>

            <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed mb-4">
              <strong>Can I fly with a pet on {airline.name}?</strong>{' '}
              {airline.inCabinAllowed
                ? `Yes. ${airline.name} allows small dogs and cats in the passenger cabin provided the pet and carrier weigh no more than ${airline.inCabinMaxWeightKg || 'the under-seat allowance'} kg and fit in a compliant carrier. Larger pets may travel in the cargo hold${airline.holdAllowed ? ' up to ' + airline.holdMaxWeightKg + ' kg' : ''}.`
                : `No companion pets are permitted in the passenger cabin on ${airline.name} (only certified service animals are accepted). All companion dogs and cats must travel as manifest cargo via ${airline.cargoCarrier}.`}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-emerald-200/60 text-xs">
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Cabin Allowed</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">
                  {airline.inCabinAllowed ? `Yes (${airline.inCabinMaxWeightKg} kg)` : 'No (Assistance only)'}
                </span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Cargo Hold</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">
                  {airline.holdAllowed ? `Yes (${airline.holdMaxWeightKg ? `Up to ${airline.holdMaxWeightKg}kg` : 'Manifest Cargo'})` : 'No Civilian Cargo'}
                </span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Fee Range</span>
                <span className="font-bold text-zinc-900 mt-0.5 block truncate" title={airline.inCabinFeeRange}>
                  {airline.inCabinFeeRange}
                </span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Snub-Nosed Rule</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">Hold Restricted</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/en/checker"
              className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-xs"
            >
              <span>Verify Pet Readiness for {airline.name}</span>
              <span className="text-emerald-400">→</span>
            </Link>
            <a
              href="#rules-and-dimensions"
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium px-4 py-3 rounded-xl border border-zinc-300 transition-colors shadow-2xs"
            >
              <span>View Carrier Dimensions</span>
              <span className="text-zinc-400">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 3. DETAILED SPECIFICATIONS ─────────────────────────────────── */}
      <section id="rules-and-dimensions" className="py-12 sm:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Core Rules & Sizing (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Carrier Dimensions Box */}
              <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-4">
                  Carrier Sizing &amp; Dimension Mandates
                </h2>

                {airline.inCabinAllowed && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                      <span>In-Cabin Carry-On Carrier</span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-900 mb-1">
                      {airline.inCabinCarrierDimensions}
                    </p>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Must be waterproof, bite-proof, ventilated on at least 3 sides, and capable of stowing completely under the seat in front of you without compressing your pet.
                    </p>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-slate-50 border border-zinc-200/80">
                  <div className="flex items-center gap-2 text-zinc-700 font-bold text-xs uppercase tracking-wider mb-1">
                    <span>Cargo Hold Rigid Crate (IATA CR-1)</span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">
                    Rigid plastic or fiberglass with metal bolts and nuts
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Wooden crates and plastic side-latches are strictly rejected. The crate must feature 4-sided ventilation, attachable two-compartment food/water dishes accessible from the exterior, and allow the pet to stand fully upright with at least 5 to 7 cm (2–3 in) of ear clearance.
                  </p>
                </div>
              </div>

              {/* Mandatory Carrier Rules Checklist */}
              <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-4">
                  {airline.name} Boarding &amp; Flight Regulations
                </h2>
                <ul className="space-y-3">
                  {airline.keyRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brachycephalic & Banned Breeds Policy */}
              <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-2">
                  Brachycephalic (Snub-Nosed) &amp; Restricted Breeds
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 mb-4 leading-relaxed">
                  Due to elevated risks of respiratory failure, heatstroke, and anatomical airway obstruction during flight changes in cabin pressure, airlines maintain strict breed restrictions:
                </p>
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong>Carrier Policy:</strong> {airline.brachycephalicPolicy}
                </div>
              </div>

              {/* Step-by-Step Booking Protocol */}
              <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-4">
                  Step-by-Step Booking Checklist for {airline.name}
                </h2>
                <div className="space-y-4">
                  {airline.bookingSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#0E2342] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-6">
                  Frequently Asked Questions About {airline.name}
                </h2>
                <div className="space-y-4">
                  {airline.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                      <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Layover Station, Crate CTA, Document Scanner (1 col) */}
            <div className="space-y-6">
              {/* Layover Hub Card */}
              <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                  Transit &amp; Ground Logistics
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-3">
                  Airport Layover Station
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {airline.transitHubCare}
                </p>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/70 text-[11px] text-zinc-500">
                  <strong>Layover Tip:</strong> For flights connecting through non-Schengen or non-domestic hubs, ensure your transit layover duration exceeds 2 hours to permit bonded veterinary transfer between aircraft holds.
                </div>
              </div>

              {/* Interactive IATA Crate Calculator Card */}
              <div className="bg-gradient-to-br from-[#0E2342] to-[#16345E] rounded-2xl p-6 text-white shadow-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Avoid Gate Turnaways
                </span>
                <h3 className="font-serif text-lg font-bold mb-2">
                  Check IATA Crate Sizing
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  Airlines inspect crates at check-in with strict mathematical formulas (Snout-to-tail length + half leg height).
                </p>
                <Link
                  href="/en/checker"
                  className="inline-flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
                >
                  <span>Launch Free Compliance Check</span>
                  <span className="ml-1">→</span>
                </Link>
              </div>

              {/* Document Scanner Promo */}
              <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Pre-Flight Verification
                </span>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                  Upload Pet Documents
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  Upload vaccination records, microchip paperwork, or rabies titer certificates to check if they fulfill destination country laws before paying airline cargo deposits.
                </p>
                <Link
                  href="/#scanner"
                  className="inline-flex items-center justify-center w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs py-2.5 rounded-xl border border-zinc-200 transition-colors"
                >
                  <span>Instant OCR Document Scan</span>
                  <span className="ml-1">↓</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
