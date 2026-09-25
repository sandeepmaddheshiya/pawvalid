import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getCurrentRequirementVersions } from '@/lib/requirements/queries';
import BrowseRequirementsChecklist from '@/components/BrowseRequirementsChecklist';
import { getFaqSchema, getBreadcrumbSchema, getHowToSchema } from '@/lib/seo/schema';
import { CORRIDORS, type RouteIntelligence } from '@/lib/data/corridors';
import { COUNTRIES } from '@/lib/data/countries';

export const ROUTE_DATA: Record<string, RouteIntelligence> = CORRIDORS;

interface RoutePageProps {
  params: Promise<{ route: string }>;
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { route } = await params;
  const display = ROUTE_DATA[route];

  if (!display) {
    return { title: 'Route Not Found | PawValid' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';
  const pageUrl = `${appUrl}/en/pet-travel/${route}`;
  const title = `Pet Travel: ${display.from} to ${display.to} — 2026 Requirements & Checklist | PawValid`;

  return {
    title,
    description: display.description,
    keywords: [
      `pet travel ${display.from} to ${display.to}`,
      `dog travel ${display.to}`,
      `cat travel ${display.to}`,
      `rabies titer ${display.to}`,
      `pet health certificate ${display.to}`,
      `pet passport ${display.from} to ${display.to}`,
      'pawvalid compliance',
    ],
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${appUrl}/en/pet-travel/${route}`,
        de: `${appUrl}/de/pet-travel/${route}`,
        fr: `${appUrl}/fr/pet-travel/${route}`,
        es: `${appUrl}/es/pet-travel/${route}`,
        'x-default': `${appUrl}/en/pet-travel/${route}`,
      },
    },
    openGraph: {
      title,
      description: display.description,
      url: pageUrl,
      siteName: 'PawValid Pet Travel Compliance',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/hero-dog-airport.jpg',
          width: 1200,
          height: 630,
          alt: `Pet travel requirements from ${display.from} to ${display.to}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@pawvalid',
      creator: '@pawvalid',
      title,
      description: display.description,
      images: ['/hero-dog-airport.jpg'],
    },
    other: {
      'geo.region': display.destCode,
      'geo.placename': display.to,
    },
  };
}

export async function generateStaticParams() {
  try {
    const routes = await db.route.findMany({
      where: { status: 'SUPPORTED' },
      select: { slug: true },
    });
    const dbSlugs = routes.map((r) => r.slug);
    const combined = Array.from(new Set([...Object.keys(ROUTE_DATA), ...dbSlugs]));
    return combined.map((slug) => ({ route: slug }));
  } catch {
    return Object.keys(ROUTE_DATA).map((slug) => ({ route: slug }));
  }
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { route } = await params;
  const display = ROUTE_DATA[route];

  if (!display) {
    return (
      <div className="section-container py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Route Not Found</h1>
        <p className="text-zinc-500 mb-6">This pet travel route is not currently available in our directory.</p>
        <Link href="/en/pet-travel" className="btn-primary inline-block">
          Browse Supported Routes →
        </Link>
      </div>
    );
  }

  // Fetch live requirements from database
  let dbRequirements: Awaited<ReturnType<typeof getCurrentRequirementVersions>> = [];
  try {
    dbRequirements = await getCurrentRequirementVersions(route, 'DOG');
  } catch {
    // fallback if DB connection fails
  }

  const checkerHref = `/en/checker?origin=${display.originCode}&destination=${display.destCode}&petType=DOG`;

  // Lookup country pages for internal linking
  const originCountry = Object.values(COUNTRIES).find(
    (c) => c.code.toUpperCase() === display.originCode.toUpperCase() || c.name.toLowerCase() === display.from.toLowerCase()
  );
  const destCountry = Object.values(COUNTRIES).find(
    (c) => c.code.toUpperCase() === display.destCode.toUpperCase() || c.name.toLowerCase() === display.to.toLowerCase()
  );

  // Standard category display helper
  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'MICROCHIP':
        return {
          label: 'ISO 11784/11785 Microchip',
          protocol: 'Sequence Mandatory: Microchip MUST be implanted and scanned strictly prior to rabies vaccination.',
        };
      case 'RABIES_VACCINATION':
        return {
          label: 'Rabies Immunization Protocol',
          protocol: 'Validity Window: Primary rabies vaccination requires full latency period before international departure.',
        };
      case 'HEALTH_CERTIFICATE':
        return {
          label: 'Veterinary Health Certificate & Endorsement',
          protocol: 'Government Endorsement: Issued by an accredited vet and officially stamped or digitally endorsed by the sovereign veterinary authority.',
        };
      case 'TAPEWORM_TREATMENT':
        return {
          label: 'Echinococcus Multilocularis Protocol',
          protocol: 'Strict Window: Must be administered by a veterinarian between 24 and 120 hours before arrival.',
        };
      case 'TITER_TEST':
        return {
          label: 'Rabies Neutralising Antibody Titre (RNATT / FAVN)',
          protocol: 'Laboratory Protocol: Blood drawn by accredited veterinarian and tested at an approved government-certified laboratory (result ≥ 0.5 IU/ml).',
        };
      case 'IMPORT_PERMIT':
        return {
          label: 'Government Import Authorization',
          protocol: 'Advance Permit: Formal biosecurity permit granted by destination national authority prior to departure.',
        };
      case 'QUARANTINE_BOOKING':
        return {
          label: 'Post-Entry Quarantine Facility',
          protocol: 'Direct Port Arrival: All companion animals must land at approved port for immediate bonded transfer to the quarantine facility.',
        };
      default:
        return {
          label: cat.replace(/_/g, ' '),
          protocol: 'Compliance standard verified against destination regulatory authority statutes.',
        };
    }
  };

  // Group database requirements by category if present to prevent redundant headers
  const displayRequirements = (() => {
    if (dbRequirements.length > 0) {
      const grouped: Array<{
        id: string;
        category: string;
        categoryLabel: string;
        title: string;
        severity: 'BLOCKING' | 'NON_BLOCKING';
        applicableSpecies?: 'DOG' | 'CAT' | 'BOTH';
        rules: string[];
        protocol: string;
        sourceName: string;
        sourceUrl: string;
        lastVerifiedAt: string;
      }> = [];

      for (const req of dbRequirements) {
        const meta = getCategoryMeta(req.category);
        const existing = grouped.find((g) => g.category === req.category);
        if (existing) {
          if (!existing.rules.includes(req.ruleText)) {
            existing.rules.push(req.ruleText);
          }
          if (req.severity === 'BLOCKING') existing.severity = 'BLOCKING';
        } else {
          grouped.push({
            id: req.id,
            category: req.category,
            categoryLabel: meta.label,
            title: req.category.replace(/_/g, ' '),
            severity: req.severity === 'BLOCKING' ? 'BLOCKING' : 'NON_BLOCKING',
            applicableSpecies: 'BOTH',
            rules: [req.ruleText],
            protocol: meta.protocol,
            sourceName: req.source.publisher,
            sourceUrl: req.source.url,
            lastVerifiedAt: typeof req.lastVerifiedAt === 'string' ? req.lastVerifiedAt : new Date(req.lastVerifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          });
        }
      }
      return grouped;
    }
    // Fall back to comprehensive curated route statutory requirements
    return display.statutoryRequirements;
  })();

  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pet Travel Routes', url: '/en/pet-travel' },
    { name: `${display.from} to ${display.to}`, url: `/en/pet-travel/${route}` },
  ]);

  const faqLd = getFaqSchema(display.faqs);

  const howToLd = getHowToSchema({
    title: `How to Travel with a Pet from ${display.from} to ${display.to}`,
    description: `Official regulatory step-by-step checklist to transport a dog or cat from ${display.from} to ${display.to} under ${display.legalBasis}.`,
    steps: display.timelineSteps.map((s) => ({
      step: s.step,
      title: s.title,
      description: `${s.timing}: ${s.description}`,
    })),
  });

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Pet Travel Requirements: ${display.from} to ${display.to}`,
    description: display.description,
    mainEntity: {
      '@type': 'GovernmentService',
      name: `Veterinary Pet Movement from ${display.from} to ${display.to}`,
      provider: {
        '@type': 'GovernmentOrganization',
        name: display.authority,
      },
      serviceType: 'International Animal Movement Compliance',
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />

      {/* ─── 1. BREADCRUMB & REGULATORY VERIFICATION BAR ────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-hidden text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/pet-travel" className="hover:text-zinc-900 transition-colors">Routes</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900 truncate">{display.from} → {display.to}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Verified Regulatory Directory • Updated 2026</span>
          </div>
        </div>
      </div>

      {/* ─── 2. ROUTE HERO HEADER ────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="section-container">
          {/* ISO Country Badges & Corridor Scope */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 mb-4 text-xs font-semibold text-zinc-700">
            <span className="px-1.5 py-0.5 rounded bg-[#0E2342] text-white text-[11px] font-bold tracking-wider">{display.originCode}</span>
            <span className="text-zinc-400">→</span>
            <span className="px-1.5 py-0.5 rounded bg-[#0E2342] text-white text-[11px] font-bold tracking-wider">{display.destCode}</span>
            <span className="text-zinc-300 font-normal">|</span>
            <span className="text-zinc-600 font-medium">{display.region}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
            Pet Travel Requirements:{' '}
            <span className="text-[#0E2342]">{display.from}</span> to{' '}
            <span className="text-[#0E2342]">{display.to}</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl leading-relaxed mb-6">
            {display.description}
          </p>

          {/* AEO Quick Answer / AI Direct Snippet Box */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-200/90 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Direct Answer / Statutory Summary
              </span>
              <span className="text-[11px] text-zinc-500 hidden sm:inline">• Verified for 2026 Entry</span>
            </div>
            
            <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed mb-4">
              <strong>Can I travel with my pet from {display.from} to {display.to}?</strong> Yes. Companion dogs and cats can enter {display.to} from {display.from} under non-commercial regulations established by {display.authority} ({display.legalBasis}). Entry requires an ISO 11784/11785 microchip, rabies vaccination with a {display.leadTime.toLowerCase()} waiting period, {display.titerRequired.toLowerCase()}, and an endorsed {display.certificateType}. Compliant pets are eligible for {display.quarantineDays.toLowerCase()}.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-emerald-200/60 text-xs">
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Rabies Titer</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">{display.titerRequired}</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Lead Time</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">{display.leadTime}</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Quarantine</span>
                <span className="font-bold text-zinc-900 mt-0.5 block">{display.quarantineDays}</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2.5 border border-zinc-200/70">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Certificate</span>
                <span className="font-bold text-zinc-900 mt-0.5 block truncate" title={display.certificateType}>{display.certificateType}</span>
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation Links */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-zinc-400 font-medium mr-1">Authority Hubs:</span>
            {originCountry && (
              <Link
                href={`/en/countries/${originCountry.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold transition-colors"
              >
                <span>{originCountry.flag}</span>
                <span>{display.from} Export &amp; Guide</span>
                <span className="text-zinc-400">→</span>
              </Link>
            )}
            {destCountry && (
              <Link
                href={`/en/countries/${destCountry.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 font-semibold transition-colors"
              >
                <span>{destCountry.flag}</span>
                <span>{display.to} Pet Import Rules</span>
                <span className="text-emerald-600">→</span>
              </Link>
            )}
          </div>

          {/* Quick Authority Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span><strong>Authority:</strong> {display.authority}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span><strong>Statute:</strong> {display.legalBasis}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={checkerHref}
              className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-xs hover:shadow active:scale-98"
            >
              <span>Check Your Pet&apos;s Readiness for This Route</span>
              <span className="text-emerald-400">→</span>
            </Link>
            <a
              href="#statutory-checklist"
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium px-4 py-3 rounded-xl border border-zinc-300 transition-colors shadow-2xs"
            >
              <span>View Requirement Checklist</span>
              <span className="text-zinc-400">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 3. QUICK DECISION SUMMARY CARDS (4 PILLARS) ────────────────── */}
      <section className="py-10 bg-zinc-50/50 border-b border-zinc-200/80">
        <div className="section-container">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Quick Decision Summary</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              Key Route Factors at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Rabies Titer Test */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Rabies Titer (RNATT)</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  display.titerStatus === 'exempt'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {display.titerStatus === 'exempt' ? 'EXEMPT' : 'MANDATORY'}
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.titerRequired}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.titerDetail}
              </p>
            </div>

            {/* Card 2: Border Quarantine */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Border Quarantine</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  display.quarantineDays.startsWith('0')
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {display.quarantineDays.startsWith('0') ? 'FREE ENTRY' : 'MANDATORY PEQ'}
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.quarantineDays}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.quarantineDetail}
              </p>
            </div>

            {/* Card 3: Lead Time */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Preparation Window</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  MANDATORY
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.leadTime}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.leadTimeDetail}
              </p>
            </div>

            {/* Card 4: Required Document */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Required Document</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                  GOV SEAL
                </span>
              </div>
              <p className="text-base font-bold text-zinc-900 leading-tight mb-2">
                {display.certificateType}
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {display.certificateDetail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. AIRLINE POLICIES & CARRIER OPTIONS ────────────────────────── */}
      {display.airlinePolicies && display.airlinePolicies.length > 0 && (
        <section className="py-12 sm:py-16 bg-white border-b border-zinc-200/80">
          <div className="section-container">
            <div className="max-w-3xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Aviation &amp; Transport</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
                Airline Policies &amp; Transport Options: {display.from} → {display.to}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Verified carrier rules flying this specific corridor, including in-cabin eligibility, manifest cargo requirements, weight caps, and estimated fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {display.airlinePolicies.map((airline, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200/90 bg-zinc-50/50 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#0E2342] text-white text-[10px] font-bold uppercase tracking-wider">
                            {airline.code}
                          </span>
                          <h3 className="font-serif text-base sm:text-lg font-bold text-zinc-900">
                            {airline.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {airline.inCabinAllowed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                            <svg className="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            In-Cabin Allowed {airline.maxInCabinWeightKg ? `(≤ ${airline.maxInCabinWeightKg}kg)` : ''}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold">
                            In-Cabin Prohibited (Cargo / Ferry Only)
                          </span>
                        )}

                        {airline.cargoAllowed && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-medium">
                            Cargo / Hold Supported
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                      {airline.notes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-200/70 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">Estimated Carrier Fee</span>
                      <span className="font-bold text-zinc-900">{airline.feeEstimate}</span>
                    </div>

                    {airline.airlineGuideSlug && (
                      <Link
                        href={`/en/airlines/${airline.airlineGuideSlug}`}
                        className="text-xs font-semibold text-[#0E2342] hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                      >
                        <span>View {airline.name} Pet Guide</span>
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 5. TRANSIT, LAYOVERS & BORDER CROSSING ADVICE ───────────────── */}
      {display.transitAdvice && (
        <section className="py-12 sm:py-16 bg-zinc-50 border-b border-zinc-200/80">
          <div className="section-container">
            <div className="max-w-3xl mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Corridor Route Intelligence</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
                {display.transitAdvice.headline}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Practical navigation advice for direct flights, layovers, land border vehicle crossings, and climate temperature embargoes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Direct vs Transit Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                    ✈
                  </div>
                  <h3 className="font-serif text-base font-bold text-zinc-900">
                    Direct Flights vs Connections
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {display.transitAdvice.directVsTransit}
                </p>
              </div>

              {/* Layover Rules Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    🛡
                  </div>
                  <h3 className="font-serif text-base font-bold text-zinc-900">
                    Layover &amp; Transit Biosecurity Rules
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {display.transitAdvice.layoverRules}
                </p>
              </div>

              {/* Land Border Crossing Option if present */}
              {display.transitAdvice.landBorderOption && (
                <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 sm:p-6 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs">
                      🚗
                    </div>
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Driving &amp; Surface Transit Options
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {display.transitAdvice.landBorderOption}
                  </p>
                </div>
              )}

              {/* Climate & Embargo Warnings if present */}
              {display.transitAdvice.climateRestrictions && (
                <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 sm:p-6 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold text-xs">
                      🌡
                    </div>
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Climate &amp; Temperature Embargoes
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {display.transitAdvice.climateRestrictions}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. STATUTORY REQUIREMENTS CHECKLIST ───────────────────────── */}
      <section id="statutory-checklist" className="py-12 sm:py-16 bg-white border-b border-zinc-200/80">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Official Regulatory Standard</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
                Statutory Requirements Checklist
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Every requirement must be met in strict chronological order before departure.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-2xs">
                <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span>Interactive Self-Assessment</span>
              </div>
            </div>
          </div>

          <BrowseRequirementsChecklist
            routeSlug={route}
            origin={display.from}
            destination={display.to}
            originCode={display.originCode}
            destCode={display.destCode}
            authority={display.authority}
            legalBasis={display.legalBasis}
            leadTime={display.leadTime}
            titerRequired={display.titerRequired}
            quarantineDays={display.quarantineDays}
            certificateType={display.certificateType}
            requirements={displayRequirements}
            restrictedBreeds={display.restrictedBreeds}
          />
        </div>
      </section>

      {/* ─── 7. STEP-BY-STEP CHRONOLOGICAL ROADMAP ──────────────────────── */}
      <section className="py-12 sm:py-16 bg-zinc-50 border-b border-zinc-200/80">
        <div className="section-container">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Chronological Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              The Preparation Timeline for {display.from} → {display.to}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1.5">
              Follow this verified corridor timeline to prevent border delays or invalid document rejections.
            </p>
          </div>

          <div className={`grid grid-cols-1 ${display.timelineSteps.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'} gap-4 relative`}>
            {display.timelineSteps.map((step) => (
              <div key={step.step} className="p-5 rounded-2xl bg-white border border-zinc-200 relative flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="w-7 h-7 rounded-full bg-[#0E2342] text-white font-bold text-xs flex items-center justify-center mb-3">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    {step.timing}
                  </span>
                  <h4 className="font-bold text-sm text-zinc-900 mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. RELATED REGULATORY MANUALS & DEEP DIVES ──────────────── */}
      <section className="py-10 bg-white border-b border-zinc-200/80">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Official Compliance Manuals
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                Recommended Regulatory Guides for {display.from} → {display.to}
              </h2>
            </div>
            <Link
              href="/en/guides"
              className="text-xs font-semibold text-[#0E2342] hover:text-emerald-700 transition-colors"
            >
              Browse All Regulatory Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/en/guides/rabies-titer-test-favn-guide"
              className="group bg-zinc-50/50 hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    Veterinary Testing
                  </span>
                  <span className="text-[11px] text-zinc-400">9 min read</span>
                </div>
                <h3 className="font-serif text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-2">
                  FAVN Rabies Titer Test Manual
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Learn about the 0.5 IU/mL antibody threshold, approved testing laboratories (KSU, Auburn, ANSES), and mandatory post-draw waiting periods.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read FAVN Guide</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              href="/en/guides/usda-aphis-vehcs-guide"
              className="group bg-zinc-50/50 hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80">
                    Government Endorsement
                  </span>
                  <span className="text-[11px] text-zinc-400">8 min read</span>
                </div>
                <h3 className="font-serif text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-2">
                  USDA APHIS VEHCS Guide
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  How accredited veterinarians submit export certificates for sovereign government review and validation within 10 days of travel.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read VEHCS Guide</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              href="/en/guides/iata-crate-requirements"
              className="group bg-zinc-50/50 hover:bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80">
                    Aviation &amp; Crates
                  </span>
                  <span className="text-[11px] text-zinc-400">10 min read</span>
                </div>
                <h3 className="font-serif text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-2">
                  IATA Dog Crate Requirements
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Container Requirement 1 (CR-1) sizing formulas, metal hardware specifications, and ventilation percentages for international flights.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                <span>Read Crate Guide</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 9. ROUTE SPECIFIC FAQS & ADVISORIES ────────────────────────── */}
      <section className="py-12 sm:py-16 bg-zinc-50">
        <div className="section-container">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Practical Guidance</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              Frequently Asked Questions: {display.from} to {display.to}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {display.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs">
                <h4 className="font-bold text-sm text-zinc-900 mb-2 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Breed Restriction Alert Box if present */}
          {display.restrictedBreeds && display.restrictedBreeds.length > 0 && (
            <div className="mt-6 p-4.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <strong className="font-bold block text-sm text-amber-950 mb-1">
                  Statutory Breed Import Restrictions
                </strong>
                <p className="text-xs text-amber-900 leading-relaxed mb-1.5">
                  Government regulations strictly prohibit or restrict the import of specific dog breeds into {display.to}:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-900">
                  {display.restrictedBreeds.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── 10. TWO-WAY COUNTRY AUTHORITY HUB NAVIGATION ────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Official National Hubs</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight mt-0.5">
              Explore Sovereign Country Compliance Hubs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {originCountry && (
              <Link
                href={`/en/countries/${originCountry.slug}`}
                className="p-5 rounded-2xl border border-zinc-200 hover:border-emerald-500/50 bg-zinc-50/50 hover:bg-white transition-all flex items-start justify-between gap-4 shadow-2xs group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">{originCountry.flag}</span>
                    <span className="font-serif font-bold text-base text-zinc-900 group-hover:text-emerald-800 transition-colors">
                      {originCountry.name} Authority Directory
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 mb-2">
                    {originCountry.headline}
                  </p>
                  <span className="text-[11px] font-semibold text-[#0E2342] group-hover:text-emerald-700 flex items-center gap-1">
                    <span>View {originCountry.name} Regulations</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            )}

            {destCountry && (
              <Link
                href={`/en/countries/${destCountry.slug}`}
                className="p-5 rounded-2xl border border-zinc-200 hover:border-emerald-500/50 bg-zinc-50/50 hover:bg-white transition-all flex items-start justify-between gap-4 shadow-2xs group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-2xl">{destCountry.flag}</span>
                    <span className="font-serif font-bold text-base text-zinc-900 group-hover:text-emerald-800 transition-colors">
                      {destCountry.name} Import Hub
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 mb-2">
                    {destCountry.headline}
                  </p>
                  <span className="text-[11px] font-semibold text-[#0E2342] group-hover:text-emerald-700 flex items-center gap-1">
                    <span>View {destCountry.name} Biosecurity Rules</span>
                    <span>→</span>
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ─── 11. EXECUTIVE CONVERSION CTA BANNER ─────────────────────────── */}
      <section className="py-12 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-[#08162A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                Route Assessment Engine
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                Traveling from {display.from} to {display.to} with your pet?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                Upload your pet&apos;s vaccination records and microchip certificate. We verify vaccination dates, 21-day latency windows, and government health certificate deadlines against official {display.authority} rules in seconds.
              </p>
              <Link
                href={checkerHref}
                className="inline-flex items-center gap-2 bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Run Free Route Compliance Assessment</span>
                <span>→</span>
              </Link>
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-zinc-400 flex-wrap">
                <span>✓ Sourced to {display.legalBasis.split('&')[0].trim()}</span>
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
