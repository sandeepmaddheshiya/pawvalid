import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { AIRLINES } from '@/lib/data/airlines';
import { GUIDES } from '@/lib/data/guides';
import { CORRIDORS } from '@/lib/data/corridors';
import { COUNTRIES } from '@/lib/data/countries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';
  const now = new Date();

  // 1. Core High-Priority Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/checker`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/countries`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/pet-travel`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/airlines`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/editorial-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/en/refund-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // 2. Programmatic Destination Countries (Top 15 Destinations)
  const countryPages: MetadataRoute.Sitemap = Object.keys(COUNTRIES).map((slug) => ({
    url: `${baseUrl}/en/countries/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Programmatic Corridors (All 19 Routes + DB)
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

  const corridorPages: MetadataRoute.Sitemap = routeSlugs.map((slug) => ({
    url: `${baseUrl}/en/pet-travel/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Programmatic Airline Guides (10 International Airlines)
  const airlinePages: MetadataRoute.Sitemap = AIRLINES.map((airline) => ({
    url: `${baseUrl}/en/airlines/${airline.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 5. Regulatory Knowledge Guides (4 In-Depth Guides)
  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/en/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...corePages, ...countryPages, ...corridorPages, ...airlinePages, ...guidePages];
}
