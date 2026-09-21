import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pawvalid.online';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/admin/', '/verify/pass-'],
      },
      // Explicitly allow AI Answer Engine web crawlers for AEO indexation
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended'],
        allow: ['/', '/en/about', '/en/editorial-policy', '/en/countries', '/en/pet-travel', '/en/airlines', '/en/guides', '/en/checker'],
        disallow: ['/api/', '/dashboard/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
