import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TOOLS, type CalculatorTool } from '@/lib/data/tools';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';
import { RabiesWaitingPeriodCalculator } from '@/components/tools/RabiesWaitingPeriodCalculator';
import { FavnTiterCalculator } from '@/components/tools/FavnTiterCalculator';
import { QuarantineRiskChecker } from '@/components/tools/QuarantineRiskChecker';

interface Props {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((t) => ({
    tool: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return { title: 'Tool Not Found | PawValid' };

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: [
      tool.slug.replace(/-/g, ' '),
      'pet travel calculator',
      'pet quarantine rules',
      'rabies waiting period',
      'favn titer clock',
    ],
    alternates: {
      canonical: `https://pawvalid.online/en/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://pawvalid.online/en/tools/${tool.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { tool: slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Free Calculators & Tools', url: '/en/tools' },
    { name: tool.name, url: `/en/tools/${tool.slug}` },
  ]);

  const faqLd = getFaqSchema(tool.faqs);

  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.seoDescription,
    url: `https://pawvalid.online/en/tools/${tool.slug}`,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans pb-20">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />

      {/* Hero Header */}
      <section className="bg-[#0A192F] text-white pt-12 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,169,88,0.12),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/en/tools" className="hover:text-white transition-colors">
              Free Tools
            </Link>
            <span>/</span>
            <span className="text-zinc-200">{tool.name}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#0FA958] text-xs font-semibold uppercase tracking-wider mb-4">
            ⚡ {tool.badge}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            {tool.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
            {tool.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mt-6 pt-6 border-t border-zinc-800">
            <div>
              <span className="text-zinc-500">Authority:</span> <span className="text-zinc-200 font-medium">{tool.authority}</span>
            </div>
            <div>•</div>
            <div>
              <span className="text-zinc-500">Legal Basis:</span> <span className="text-zinc-200 font-medium">{tool.statutoryBasis}</span>
            </div>
            <div>•</div>
            <div>
              <span className="text-zinc-500">Verified:</span> <span className="text-emerald-400 font-medium">{tool.dateModified}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {slug === 'rabies-waiting-period-calculator' && <RabiesWaitingPeriodCalculator />}
        {slug === 'favn-titer-calculator' && <FavnTiterCalculator />}
        {slug === 'quarantine-risk-checker' && <QuarantineRiskChecker />}
      </section>

      {/* Statutory Explanation & Rules */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#0E2342] mb-3">Statutory Regulatory Framework</h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {tool.overview}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-800 mb-4">
              Key Compliance Mandates:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.keyRules.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-start gap-2.5">
                  <span className="text-[#0FA958] font-bold text-sm shrink-0">✓</span>
                  <span className="text-xs text-zinc-700 leading-normal">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guide Cross-Linking Banner */}
          <div className="bg-gradient-to-r from-[#0E2342] to-[#16345E] text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Official Regulatory Manual
              </span>
              <h4 className="font-serif text-base font-bold text-white mb-1">
                FAVN Rabies Titer Test: Comprehensive 2026 Travel Guide
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
                Read our in-depth manual covering the ≥ 0.50 IU/mL threshold, approved reference labs (KSU, Auburn, ANSES), 90 vs 180-day waiting clocks, and average testing costs ($280–$450).
              </p>
            </div>
            <Link
              href="/en/guides/rabies-titer-test-favn-guide"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0FA958] hover:bg-[#0D8E4A] text-white font-bold text-xs shadow-md transition-all active:scale-98 shrink-0 whitespace-nowrap"
            >
              <span>Read FAVN Guide</span>
              <span>→</span>
            </Link>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-xl font-bold text-[#0E2342] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {tool.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80">
                  <h4 className="text-sm font-bold text-zinc-900 mb-2">{faq.q}</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Tools Cross-Navigation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <h3 className="text-lg font-bold text-[#0E2342] mb-4">Explore More Free Compliance Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.filter((t) => t.slug !== slug).map((other) => (
            <Link
              key={other.slug}
              href={`/en/tools/${other.slug}`}
              className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-emerald-500/50 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-bold uppercase text-[#0FA958] tracking-wider mb-1">
                {other.badge}
              </div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-[#0FA958] transition-colors mb-1">
                {other.name}
              </div>
              <div className="text-xs text-zinc-500 line-clamp-2">{other.tagline}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
