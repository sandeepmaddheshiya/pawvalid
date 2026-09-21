import Link from 'next/link';
import type { Metadata } from 'next';
import { TOOLS } from '@/lib/data/tools';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Free Pet Travel Calculators & Biosecurity Tools | PawValid',
  description:
    'Free interactive pet travel calculators: Rabies 21-day waiting period calculator, FAVN rabies titer latency calculator, and international quarantine risk diagnostic.',
  keywords: [
    'pet travel calculator',
    'rabies waiting period calculator',
    'favn titer calculator',
    'pet quarantine checker',
    'dog travel rules calculator',
    'pet passport tools',
  ],
  alternates: {
    canonical: 'https://pawvalid.online/en/tools',
  },
};

export default function ToolsHubPage() {
  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Free Calculators & Tools', url: '/en/tools' },
  ]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero Header */}
      <section className="bg-[#0A192F] text-white pt-16 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,169,88,0.12),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#0FA958] text-xs font-semibold uppercase tracking-wider mb-5">
            ⚡ Free Interactive Compliance Tools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Pet Travel Timelines &amp; Biosecurity Calculators
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base leading-relaxed">
            Eliminate guesswork before booking flights. Instant, statutory calculators calibrated against official EU, UK DEFRA, USDA APHIS, and Australian DAFF border regulations.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <div
              key={tool.slug}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#0FA958] font-bold text-[11px] uppercase tracking-wider mb-4 border border-emerald-100">
                  {tool.badge}
                </div>
                <h2 className="text-lg font-bold text-[#0E2342] group-hover:text-[#0FA958] transition-colors mb-2">
                  {tool.name}
                </h2>
                <p className="text-xs text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                  {tool.tagline}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-zinc-100">
                  <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Statutory Framework
                  </div>
                  <div className="text-xs font-medium text-zinc-800 line-clamp-2">
                    {tool.authority}
                  </div>
                </div>
              </div>

              <Link
                href={`/en/tools/${tool.slug}`}
                className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-[#0FA958] text-white font-semibold text-xs text-center transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>Launch Calculator</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Link Banner to Full Assessment */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-gradient-to-br from-[#0E2342] to-[#16345E] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
              Need Complete Route Verification with Official Dossiers?
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm">
              Our automated compliance engine audits your exact departure route across 50 international corridors, airline crate specs, and microchip timelines in 45 seconds.
            </p>
          </div>
          <Link
            href="/en/checker"
            className="px-6 py-3.5 rounded-xl bg-[#0FA958] hover:bg-[#0d8f4a] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
          >
            Start Full Route Assessment →
          </Link>
        </div>
      </section>
    </div>
  );
}
