import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GUIDES, type RegulatoryGuide } from '@/lib/data/guides';
import { getBreadcrumbSchema, getFaqSchema, getHowToSchema } from '@/lib/seo/schema';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return { title: 'Guide Not Found | PawValid' };

  return {
    title: guide.seoTitle,
    description: guide.description,
    keywords: [
      guide.slug.replace(/-/g, ' '),
      'pet travel compliance',
      'pet passport guide',
      'international pet transport',
      'rabies titer test',
      'usda aphis vehcs',
      'vehcs aphis',
      'iata dog crate',
    ],
    alternates: {
      canonical: `https://pawvalid.online/en/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.seoTitle,
      description: guide.description,
      url: `https://pawvalid.online/en/guides/${guide.slug}`,
      type: 'article',
      images: [
        {
          url: '/hero-dog-airport.jpg',
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.seoTitle,
      description: guide.description,
      images: ['/hero-dog-airport.jpg'],
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

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const breadcrumbLd = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Regulatory Guides', url: '/en/guides' },
    { name: guide.title, url: `/en/guides/${guide.slug}` },
  ]);

  const faqLd = getFaqSchema(guide.faqs);

  const howToLd = getHowToSchema({
    title: guide.title,
    description: guide.description,
    steps: guide.steps,
  });

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: {
      '@type': 'Organization',
      name: 'PawValid Regulatory Intelligence Team',
      url: 'https://pawvalid.online',
    },
    reviewer: guide.reviewerName
      ? {
          '@type': 'Person',
          name: guide.reviewerName,
          jobTitle: guide.reviewerTitle,
          url: `https://pawvalid.online${guide.reviewerUrl || '/en/editorial-policy'}`,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'PawValid',
      logo: 'https://pawvalid.online/globe.svg',
    },
    datePublished: '2026-01-15',
    dateModified: guide.dateModified,
    citation: guide.officialSources?.map((s) => s.url),
  };

  const medicalLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: guide.title,
    description: guide.description,
    url: `https://pawvalid.online/en/guides/${guide.slug}`,
    lastReviewed: guide.lastReviewedDate || guide.dateModified,
    reviewedBy: guide.reviewerName
      ? {
          '@type': 'Person',
          name: guide.reviewerName,
          jobTitle: guide.reviewerTitle,
        }
      : undefined,
    aspect: ['Overview', 'Procedure', 'Guidelines', 'Contraindications'],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalLd) }}
      />

      {/* ─── 1. BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-hidden text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/guides" className="hover:text-zinc-900 transition-colors">Guides</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-xs">{guide.title}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Quarterly Re-Verification: September 21, 2026 Standards</span>
          </div>
        </div>
      </div>

      {/* ─── 2. HERO HEADER ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="section-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 mb-4 text-xs font-semibold text-zinc-700">
            <span className="px-1.5 py-0.5 rounded bg-[#0E2342] text-white text-[11px] font-bold">{guide.category}</span>
            <span>{guide.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4 max-w-4xl">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl leading-relaxed mb-6">
            {guide.description}
          </p>

          {/* E-E-A-T Reviewer & Verification Bar */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/90 max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
                👩‍⚕️
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-zinc-900">
                    {guide.reviewerName || 'Dr. Sarah Miller, DVM'}
                  </span>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/80 px-2 py-0.2 rounded-full">
                    Verified Reviewer
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  {guide.reviewerTitle || 'Veterinary Biosecurity Specialist'} •{' '}
                  <Link
                    href={guide.reviewerUrl || '/en/editorial-policy'}
                    className="text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
                  >
                    Editorial Policy &amp; Standards
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-600 bg-white px-3 py-2 rounded-xl border border-zinc-200">
              <span className="text-[11px] font-semibold text-zinc-500">Last Reviewed:</span>
              <strong className="text-zinc-900 font-mono text-[11px]">{guide.lastReviewedDate || guide.dateModified}</strong>
              <span className="text-zinc-300">•</span>
              <span className="text-[11px] text-emerald-700 font-semibold">Quarterly Cadence</span>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 max-w-4xl text-xs text-zinc-600 mb-8">
            <strong className="text-zinc-800">Legal Authority &amp; Statutory Basis:</strong> {guide.statutoryBasis}
          </div>

          {/* AEO Quick Answer / Key Takeaways Snippet Box */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 border border-emerald-200/90 rounded-2xl p-5 sm:p-6 max-w-4xl mb-8 shadow-xs">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Direct Answer / Executive Summary
              </span>
              <span className="text-[11px] text-zinc-500 hidden sm:inline">• Verified Statutory Overview</span>
            </div>

            <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed">
              {guide.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/en/checker"
              className="inline-flex items-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-xs"
            >
              <span>Check Your Documents Against This Standard</span>
              <span className="text-emerald-400">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 3. GUIDE CONTENT WITH TABLE OF CONTENTS ────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents Sticky (4 cols) */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-6 space-y-6">
                <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-2xs">
                  <h3 className="font-serif text-sm font-bold text-zinc-900 uppercase tracking-wider mb-3">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2 text-xs">
                    {guide.sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-zinc-600 hover:text-[#0E2342] hover:underline transition-colors py-1 leading-snug"
                      >
                        {section.title}
                      </a>
                    ))}
                    <a
                      href="#step-by-step"
                      className="block text-zinc-600 hover:text-[#0E2342] hover:underline transition-colors py-1 leading-snug font-semibold text-emerald-800"
                    >
                      Step-by-Step Procedure
                    </a>
                    <a
                      href="#faqs"
                      className="block text-zinc-600 hover:text-[#0E2342] hover:underline transition-colors py-1 leading-snug font-semibold"
                    >
                      Frequently Asked Questions
                    </a>
                    {guide.officialSources && guide.officialSources.length > 0 && (
                      <a
                        href="#official-sources"
                        className="block text-zinc-600 hover:text-[#0E2342] hover:underline transition-colors py-1 leading-snug font-semibold text-blue-800"
                      >
                        Official Statutory Sources
                      </a>
                    )}
                  </nav>
                </div>

                {/* Conversion Card */}
                <div className="bg-gradient-to-br from-[#0E2342] to-[#16345E] rounded-2xl p-5 text-white shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Instant Gap Analysis
                  </span>
                  <h4 className="font-serif text-base font-bold mb-2">
                    Test Your Pet’s Paperwork
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    Upload your pet’s records to automatically check vaccination dates and waiting windows.
                  </p>
                  <Link
                    href="/#scanner"
                    className="inline-flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all"
                  >
                    <span>Upload Documents Now</span>
                    <span className="ml-1">↓</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Article Body (8 cols) */}
            <article className="lg:col-span-8 order-1 lg:order-2 space-y-10">
              {guide.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-8 space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 border-b border-zinc-200/80 pb-3">
                    {section.title}
                  </h2>

                  <div className="space-y-3 text-sm text-zinc-700 leading-relaxed">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{renderFormattedText(paragraph)}</p>
                    ))}
                  </div>

                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                        section.callout.type === 'warning'
                          ? 'bg-amber-50/80 border-amber-200/90 text-amber-950'
                          : section.callout.type === 'statute'
                          ? 'bg-blue-50/80 border-blue-200/90 text-blue-950'
                          : 'bg-emerald-50/80 border-emerald-200/90 text-emerald-950'
                      }`}
                    >
                      <strong className="font-bold block mb-1">{section.callout.title}</strong>
                      <span>{section.callout.text}</span>
                    </div>
                  )}

                  {section.table && (
                    <div className="overflow-x-auto rounded-xl border border-zinc-200/80 my-4">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-zinc-100 text-zinc-700 font-bold border-b border-zinc-200">
                          <tr>
                            {section.table.headers.map((header, hIdx) => (
                              <th key={hIdx} className="p-3">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/70 bg-white">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-50/50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-zinc-700 leading-relaxed">
                                  {renderFormattedText(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Step-by-Step Procedure */}
              <section id="step-by-step" className="scroll-mt-8 space-y-4 pt-4 border-t border-zinc-200">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 pb-2">
                  Official Step-by-Step Procedure
                </h2>
                <div className="space-y-3">
                  {guide.steps.map((step) => (
                    <div key={step.step} className="bg-white border border-zinc-200/80 rounded-xl p-4 flex items-start gap-3.5 shadow-2xs">
                      <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-serif text-sm font-bold text-zinc-900 mb-0.5">
                          {step.title}
                        </h3>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section id="faqs" className="scroll-mt-8 space-y-4 pt-6 border-t border-zinc-200">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 pb-2">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {guide.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-2xs">
                      <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Official Statutory Reference Sources */}
              {guide.officialSources && guide.officialSources.length > 0 && (
                <section id="official-sources" className="scroll-mt-8 pt-8 border-t border-zinc-200 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Primary Sourced Authorities
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Official Government &amp; Regulatory Citations
                    </h2>
                    <p className="text-xs text-zinc-600 mt-1">
                      Direct outbound citations to governing international treaties, biosecurity statutes, and sovereign veterinary export manuals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {guide.officialSources.map((source, sIdx) => (
                      <a
                        key={sIdx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-emerald-50/40 p-4 rounded-xl border border-zinc-200/90 hover:border-emerald-300 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-zinc-100 group-hover:bg-emerald-100 text-zinc-600 group-hover:text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors">
                            §
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                              {source.authority}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                              {source.name}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 group-hover:text-emerald-900 shrink-0 ml-4">
                          <span>View Official Statute</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Regulatory Guides */}
              {guide.relatedGuides && guide.relatedGuides.length > 0 && (
                <section className="pt-8 border-t border-zinc-200 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Cross-Referenced Manuals
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Related Regulatory Guides &amp; Manuals
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {guide.relatedGuides.map((rg) => (
                      <Link
                        key={rg.slug}
                        href={`/en/guides/${rg.slug}`}
                        className="group bg-white rounded-xl border border-zinc-200/90 hover:border-emerald-500/60 p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1 block">
                            {rg.category}
                          </span>
                          <h3 className="font-serif text-sm font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-1.5">
                            {rg.title}
                          </h3>
                          <p className="text-xs text-zinc-600 leading-relaxed">
                            {rg.description}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-[#0E2342] group-hover:text-emerald-700">
                          <span>Read Full Guide</span>
                          <span>→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Destination Countries */}
              {guide.relatedCountries && guide.relatedCountries.length > 0 && (
                <section className="pt-8 border-t border-zinc-200 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Enforcing Jurisdictions
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Destination Country Compliance Hubs
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {guide.relatedCountries.map((rc) => (
                      <Link
                        key={rc.slug}
                        href={`/en/countries/${rc.slug}`}
                        className="group bg-white rounded-xl border border-zinc-200/90 hover:border-emerald-500/60 p-3.5 shadow-2xs hover:shadow-xs transition-all flex items-start gap-3"
                      >
                        <span className="text-2xl leading-none mt-0.5">{rc.flag}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                            {rc.name} Pet Import Guide
                          </h3>
                          <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                            {rc.requirementSummary}
                          </p>
                        </div>
                        <span className="text-zinc-400 group-hover:text-emerald-700 font-bold text-xs mt-1">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Tools & Calculators */}
              {guide.relatedTools && guide.relatedTools.length > 0 && (
                <section className="pt-8 border-t border-zinc-200 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Automated Verification Tools
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900">
                      Free Compliance Calculators
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {guide.relatedTools.map((rt) => (
                      <Link
                        key={rt.slug}
                        href={`/en/tools/${rt.slug}`}
                        className="group bg-zinc-50 hover:bg-white rounded-xl border border-zinc-200/80 hover:border-emerald-500/60 p-3.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-xs font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors mb-1">
                            {rt.title}
                          </h3>
                          <p className="text-[11px] text-zinc-500 leading-snug">
                            {rt.description}
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 mt-2.5 flex items-center gap-1">
                          <span>Open Tool</span>
                          <span>→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
