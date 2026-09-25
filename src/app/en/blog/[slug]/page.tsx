import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BLOG_POSTS, type BlogPost } from '@/lib/data/blog';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found | PawValid' };

  return {
    title: post.seoTitle,
    description: post.description,
    keywords: [
      post.slug.replace(/-/g, ' '),
      'pet travel compliance',
      'pet travel blog',
      'international dog transport',
      'pet health certificate',
    ],
    alternates: {
      canonical: `https://pawvalid.online/en/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: `https://pawvalid.online/en/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.dateModified,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.description,
    },
  };
}

function renderFormattedText(text: string) {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\[(.*?)\]\(([^\s)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const isInternal = match[2].startsWith('/');
    if (isInternal) {
      parts.push(
        <Link
          key={match.index}
          href={match[2]}
          className="text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2"
        >
          {match[1]}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2 inline-flex items-center gap-0.5"
        >
          <span>{match[1]}</span>
          <svg className="w-3 h-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/en/blog' },
    { name: post.title, url: `/en/blog/${post.slug}` },
  ]);

  const faqLd = getFaqSchema(post.faqs);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.dateModified,
    author: {
      '@type': 'Organization',
      name: post.author.name,
      url: 'https://pawvalid.online',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PawValid',
      logo: 'https://pawvalid.online/globe.svg',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pawvalid.online/en/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans pb-24">
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
            <Link href="/en/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-zinc-200 line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#0FA958] text-xs font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-300">{post.readTime}</span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-300">Updated {post.dateModified}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-6 border-t border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              PV
            </div>
            <div>
              <div className="text-sm font-bold text-white">{post.author.name}</div>
              <div className="text-xs text-zinc-400">{post.author.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/90 shadow-sm space-y-10">
          {/* Executive Summary */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-emerald-950">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0FA958] mb-2">
              Executive Regulatory Summary
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">{post.summary}</p>
          </div>

          {/* Key Takeaways */}
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-800 mb-4">
              Key Compliance Takeaways
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-start gap-2.5">
                  <span className="text-[#0FA958] font-bold text-sm shrink-0">✓</span>
                  <span className="text-xs text-zinc-700 leading-normal">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Article Sections */}
          <div className="space-y-10 pt-4 border-t border-zinc-100">
            {post.sections.map((section) => (
              <div key={section.id} id={section.id} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0E2342] tracking-tight">
                  {section.heading}
                </h2>

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    {renderFormattedText(para)}
                  </p>
                ))}

                {section.callout && (
                  <div
                    className={`p-5 rounded-2xl border flex items-start gap-3.5 my-4 ${
                      section.callout.type === 'warning'
                        ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                        : section.callout.type === 'statute'
                        ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                        : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">
                      {section.callout.type === 'warning' ? '⚠️' : section.callout.type === 'statute' ? '⚖️' : '💡'}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{section.callout.title}</h4>
                      <p className="text-xs leading-relaxed">{renderFormattedText(section.callout.text)}</p>
                    </div>
                  </div>
                )}

                {section.table && (
                  <div className="overflow-x-auto my-4 rounded-2xl border border-zinc-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-100/80 text-zinc-900 border-b border-zinc-200">
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5 font-bold uppercase tracking-wider text-[11px]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-50/60 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3.5 text-zinc-700">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="pt-8 border-t border-zinc-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0E2342] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80">
                  <h3 className="text-sm font-bold text-zinc-900 mb-2">{faq.q}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Author Credential Bio */}
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0E2342] text-white flex items-center justify-center font-bold text-base shrink-0">
              PV
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900">{post.author.name}</div>
              <div className="text-xs text-zinc-500">{post.author.role}</div>
              <div className="text-[11px] text-zinc-400 mt-1">
                Verified against official USDA APHIS, DEFRA, European Commission DG SANTE, and DAFF statutes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Link Conversion Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-gradient-to-br from-[#0E2342] to-[#16345E] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
              Ready to Audit Your Pet&apos;s Travel Documents?
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm">
              Upload your vaccination records and flight itinerary to get an instant statutory compliance verdict across 50 international routes.
            </p>
          </div>
          <Link
            href="/en/checker"
            className="px-6 py-3.5 rounded-xl bg-[#0FA958] hover:bg-[#0d8f4a] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0"
          >
            Start Compliance Check →
          </Link>
        </div>
      </section>
    </div>
  );
}
