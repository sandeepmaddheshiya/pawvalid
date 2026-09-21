import type { MetadataRoute } from 'next';
import { AIRLINES } from '@/lib/data/airlines';
import { GUIDES } from '@/lib/data/guides';
import { CORRIDORS } from '@/lib/data/corridors';
import { COUNTRIES } from '@/lib/data/countries';
import { TOOLS } from '@/lib/data/tools';
import { BLOG_POSTS } from '@/lib/data/blog';
import { db } from '@/lib/db';

export const dynamic = 'force-static';

function parseDate(dateStr: string | undefined, fallback: string): Date {
  if (!dateStr) return new Date(fallback);
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date(fallback) : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';

  // 1. Core High-Intent Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/checker`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/countries`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/pet-travel`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/airlines`,
      lastModified: new Date('2026-09-18T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/guides`,
      lastModified: new Date('2026-09-16T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/tools`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/editorial-policy`,
      lastModified: new Date('2026-09-21T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date('2026-09-01T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date('2026-09-01T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date('2026-09-01T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date('2026-09-01T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/en/refund-policy`,
      lastModified: new Date('2026-09-01T00:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // 2. Programmatic Destination Countries (Top 15 Destinations)
  const countryPages: MetadataRoute.Sitemap = Object.entries(COUNTRIES).map(([slug, country]) => {
    let lastModified = new Date('2026-09-21T00:00:00.000Z');
    if (country.statutoryRequirements && country.statutoryRequirements.length > 0) {
      const timestamps = country.statutoryRequirements
        .map((r) => new Date(r.lastVerifiedAt).getTime())
        .filter((t) => !isNaN(t));
      if (timestamps.length > 0) {
        lastModified = new Date(Math.max(...timestamps));
      }
    }
    return {
      url: `${baseUrl}/en/countries/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    };
  });

  // 3. Programmatic Corridors (All 50 Routes + DB)
  let routeSlugs = Object.keys(CORRIDORS);
  try {
    const dbRoutes = await db.route.findMany({
      where: { status: 'SUPPORTED' },
      select: { slug: true },
    });
    if (dbRoutes && dbRoutes.length > 0) {
      const set = new Set([...routeSlugs, ...dbRoutes.map((r) => r.slug)]);
      routeSlugs = Array.from(set);
    }
  } catch {
    // Fall back to CORRIDORS if DB is unavailable during static build
  }

  const corridorPages: MetadataRoute.Sitemap = routeSlugs.map((slug) => {
    const corridor = CORRIDORS[slug];
    let lastModified = new Date('2026-09-21T00:00:00.000Z');
    if (corridor && corridor.statutoryRequirements && corridor.statutoryRequirements.length > 0) {
      const timestamps = corridor.statutoryRequirements
        .map((r) => new Date(r.lastVerifiedAt).getTime())
        .filter((t) => !isNaN(t));
      if (timestamps.length > 0) {
        lastModified = new Date(Math.max(...timestamps));
      }
    }
    return {
      url: `${baseUrl}/en/pet-travel/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    };
  });

  // 4. Programmatic Airline Guides (10 International Airlines)
  const airlinePages: MetadataRoute.Sitemap = AIRLINES.map((airline) => ({
    url: `${baseUrl}/en/airlines/${airline.slug}`,
    lastModified: new Date('2026-09-18T00:00:00.000Z'),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 5. Regulatory Knowledge Guides (4 In-Depth Guides)
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/en/guides/${guide.slug}`,
    lastModified: parseDate(guide.dateModified, '2026-09-16T00:00:00.000Z'),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 6. Free Compliance Calculators (3 Interactive Tools)
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/en/tools/${tool.slug}`,
    lastModified: parseDate(tool.dateModified, '2026-09-21T00:00:00.000Z'),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 7. Evidence-Based Blog Posts (5 Articles)
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/en/blog/${post.slug}`,
    lastModified: parseDate(post.dateModified, '2026-09-21T00:00:00.000Z'),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [
    ...corePages,
    ...countryPages,
    ...corridorPages,
    ...airlinePages,
    ...guidePages,
    ...toolPages,
    ...blogPages,
  ];
}
