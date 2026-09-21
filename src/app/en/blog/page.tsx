import Link from 'next/link';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/data/blog';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Pet Travel Compliance Blog & Regulatory Analysis | PawValid',
  description:
    'Authoritative regulatory guides, emergency protocols, titer latency breakdowns, and USDA/EU certification analysis for pet parents traveling internationally.',
  keywords: [
    'pet travel blog',
    'usda pet certificate guide',
    'pet rejected at airport',
    'pet travel from india',
    'eu annex iv guide',
    'rabies titer test clock',
    'international pet transport guides',
  ],
  alternates: {
    canonical: 'https://pawvalid.online/en/blog',
  },
};

export default function BlogHubPage() {
  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Regulatory Blog & Articles', url: '/en/blog' },
  ]);

  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

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
            📖 Regulatory Intelligence &amp; Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Pet Travel Compliance &amp; Biosecurity Articles
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base leading-relaxed">
            Evidence-based international pet relocation analysis, statutory certification breakdowns, and emergency protocols written by our veterinary compliance specialists.
          </p>
        </div>
      </section>

      {/* Featured Post Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-md hover:shadow-lg transition-all group">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#0FA958] font-bold text-xs uppercase tracking-wider border border-emerald-100">
                  Featured Guide
                </span>
                <span className="text-xs text-zinc-400">•</span>
                <span className="text-xs font-medium text-zinc-500">{featuredPost.readTime}</span>
                <span className="text-xs text-zinc-400">•</span>
                <span className="text-xs font-medium text-zinc-500">Updated {featuredPost.dateModified}</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0E2342] group-hover:text-[#0FA958] transition-colors mb-3">
                <Link href={`/en/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                {featuredPost.description}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  PV
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">{featuredPost.author.name}</div>
                  <div className="text-[11px] text-zinc-500">{featuredPost.author.role}</div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <Link
                href={`/en/blog/${featuredPost.slug}`}
                className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-[#0E2342] hover:bg-[#0FA958] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Read Full Article</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining Articles Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
        <h2 className="text-xl font-bold text-[#0E2342] mb-6">Latest Regulatory Articles &amp; Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {remainingPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 font-bold text-[11px] uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-zinc-400">{post.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0E2342] group-hover:text-[#0FA958] transition-colors mb-2">
                  <Link href={`/en/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-zinc-400">
                  Updated {post.dateModified}
                </span>
                <Link
                  href={`/en/blog/${post.slug}`}
                  className="text-xs font-bold text-[#0E2342] group-hover:text-[#0FA958] transition-colors flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Free Tools Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-gradient-to-br from-[#0E2342] to-[#16345E] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
              Calculate Your Exact Rabies &amp; Titer Travel Timeline
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm">
              Use our 3 free interactive calculators for instant countdowns on the 21-day rabies waiting period, 90/180-day FAVN titer clocks, and quarantine risk scores.
            </p>
          </div>
          <Link
            href="/en/tools"
            className="px-6 py-3.5 rounded-xl bg-[#0FA958] hover:bg-[#0d8f4a] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
          >
            Explore Free Tools →
          </Link>
        </div>
      </section>
    </div>
  );
}
