import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getCurrentRequirementVersions } from '@/lib/requirements/queries';
import FreshnessIndicator from '@/components/FreshnessIndicator';

// Route config for SEO and display
const ROUTE_DISPLAY: Record<
  string,
  {
    from: string;
    to: string;
    fromFlag: string;
    toFlag: string;
    originCode: string;
    destCode: string;
    description: string;
  }
> = {
  'usa-to-germany': {
    from: 'United States',
    to: 'Germany',
    fromFlag: '🇺🇸',
    toFlag: '🇩🇪',
    originCode: 'US',
    destCode: 'DE',
    description: 'Complete guide to pet import requirements for traveling from the USA to Germany with your dog or cat.',
  },
  'usa-to-uk': {
    from: 'United States',
    to: 'United Kingdom',
    fromFlag: '🇺🇸',
    toFlag: '🇬🇧',
    originCode: 'US',
    destCode: 'GB',
    description: 'Everything you need to know about UK pet import regulations when traveling from the USA.',
  },
  'usa-to-australia': {
    from: 'United States',
    to: 'Australia',
    fromFlag: '🇺🇸',
    toFlag: '🇦🇺',
    originCode: 'US',
    destCode: 'AU',
    description: 'Australia has some of the strictest pet import rules. Get the complete requirement list.',
  },
  'usa-to-canada': {
    from: 'United States',
    to: 'Canada',
    fromFlag: '🇺🇸',
    toFlag: '🇨🇦',
    originCode: 'US',
    destCode: 'CA',
    description: 'Requirements for bringing your pet across the US-Canada border.',
  },
  'usa-to-japan': {
    from: 'United States',
    to: 'Japan',
    fromFlag: '🇺🇸',
    toFlag: '🇯🇵',
    originCode: 'US',
    destCode: 'JP',
    description: 'Japan\'s pet import process is thorough — here are all the requirements.',
  },
};

interface RoutePageProps {
  params: Promise<{ route: string }>;
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { route } = await params;
  const display = ROUTE_DISPLAY[route];

  if (!display) {
    return { title: 'Route Not Found' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://petvia.com';
  const pageUrl = `${appUrl}/en/pet-travel/${route}`;
  const title = `Pet Travel: ${display.from} → ${display.to} — Requirements & Checklist | Petvia`;

  return {
    title,
    description: display.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description: display.description,
      url: pageUrl,
      siteName: 'Petvia Pet Travel Compliance',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: display.description,
    },
  };
}

export async function generateStaticParams() {
  // Only generate pages for SUPPORTED routes (TRD §8)
  try {
    const routes = await db.route.findMany({
      where: { status: 'SUPPORTED' },
      select: { slug: true },
    });
    return routes.map((r) => ({ route: r.slug }));
  } catch {
    // During build without DB, return all known routes
    return Object.keys(ROUTE_DISPLAY).map((slug) => ({ route: slug }));
  }
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { route } = await params;
  const display = ROUTE_DISPLAY[route];

  if (!display) {
    return (
      <div className="section-container py-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Route Not Found</h1>
        <p className="text-zinc-500">This route is not yet supported.</p>
        <Link href="/en" className="btn-primary mt-6 inline-block">
          Browse Routes
        </Link>
      </div>
    );
  }

  // Try to fetch live requirements
  let requirements: Awaited<ReturnType<typeof getCurrentRequirementVersions>> = [];
  try {
    requirements = await getCurrentRequirementVersions(route, 'DOG');
  } catch {
    // DB not available during build — that's fine
  }

  const categoryLabels: Record<string, string> = {
    MICROCHIP: 'Microchip',
    RABIES_VACCINATION: 'Rabies Vaccination',
    RABIES_TITER: 'Rabies Titer Test',
    HEALTH_CERTIFICATE: 'Health Certificate',
    TAPEWORM_TREATMENT: 'Tapeworm Treatment',
    IMPORT_PERMIT: 'Import Permit',
  };

  const severityOrder = { BLOCKING: 0, NON_BLOCKING: 1, INFORMATIONAL: 2 };

  const checkerHref = `/en/checker?origin=${display.originCode}&destination=${display.destCode}&petType=DOG`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Guide',
    name: `Pet Travel Requirements: ${display.from} to ${display.to}`,
    description: display.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Petvia',
      url: process.env.NEXT_PUBLIC_APP_URL || 'https://petvia.com',
    },
    about: {
      '@type': 'Thing',
      name: `Pet Travel ${display.from} to ${display.to}`,
    },
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-primary-950/10">
        <div className="section-container py-16 sm:py-20">
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <span className="text-4xl">{display.fromFlag}</span>
            <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            <span className="text-4xl">{display.toFlag}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4 animate-fade-up">
            Pet Travel: {display.from} → {display.to}
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mb-8 animate-fade-up animate-delay-100">
            {display.description}
          </p>

          <Link href={checkerHref} className="btn-primary animate-fade-up animate-delay-200">
            Check Your Pet&apos;s Readiness for This Route →
          </Link>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <h2 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-8">
            Requirements for Dogs
          </h2>

          {requirements.length > 0 ? (
            <div className="space-y-4">
              {[...requirements]
                .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
                .map((req) => (
                  <div key={req.id} className="card p-5 border-l-4 border-l-primary-500">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                            {categoryLabels[req.category] || req.category}
                          </span>
                          <span className={`text-2xs px-2 py-0.5 rounded-full font-medium ${
                            req.severity === 'BLOCKING'
                              ? 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                              : req.severity === 'NON_BLOCKING'
                                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                                : 'bg-zinc-50 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}>
                            {req.severity === 'BLOCKING' ? 'Required' : req.severity === 'NON_BLOCKING' ? 'Recommended' : 'Info'}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                          {req.ruleText}
                        </p>
                        <div className="mt-3 flex items-center gap-4 flex-wrap">
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            Source: {req.source.publisher}
                          </span>
                          <FreshnessIndicator lastVerifiedAt={req.lastVerifiedAt} compact />
                          <a
                            href={req.source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                          >
                            View source →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                Requirement data for this route is being compiled and verified.
                Check back soon or start a readiness check to see available assessments.
              </p>
              <Link href={checkerHref} className="btn-primary text-sm">
                Start Readiness Check →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-50 dark:bg-surface-900">
        <div className="section-container text-center">
          <h2 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-4">
            Ready to check your pet&apos;s compliance?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Get a personalized assessment for your specific trip details.
          </p>
          <Link href={checkerHref} className="btn-primary">
            Start Free Check ✨
          </Link>
        </div>
      </section>
    </div>
  );
}
