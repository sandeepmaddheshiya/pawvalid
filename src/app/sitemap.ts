import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';

const STATIC_ROUTES = [
  'usa-to-germany',
  'usa-to-uk',
  'usa-to-australia',
  'usa-to-canada',
  'usa-to-japan',
];

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
      url: `${baseUrl}/en/pet-travel`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
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
  ];

  // 2. Dynamic Statutory Corridor Pages
  let routeSlugs = STATIC_ROUTES;
  try {
    const dbRoutes = await db.route.findMany({
      where: { status: 'SUPPORTED' },
      select: { slug: true },
    });
    if (dbRoutes && dbRoutes.length > 0) {
      const set = new Set([...STATIC_ROUTES, ...dbRoutes.map((r) => r.slug)]);
      routeSlugs = Array.from(set);
    }
  } catch {
    // Fall back to STATIC_ROUTES if DB is unavailable during static generation
  }

  const corridorPages: MetadataRoute.Sitemap = routeSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/en/pet-travel/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ]);

  return [...corePages, ...corridorPages];
}
