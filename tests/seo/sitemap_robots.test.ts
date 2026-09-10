import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('Search Engine & AI Discovery Config (Robots & Sitemap)', () => {
  const originalEnv = process.env.NEXT_PUBLIC_APP_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://pawvalid.online';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = originalEnv;
  });

  describe('robots.ts', () => {
    it('provides correct directives for general web crawlers and AI answer engines', () => {
      const config = robots();
      expect(config.sitemap).toBe('https://pawvalid.online/sitemap.xml');
      expect(config.host).toBe('https://pawvalid.online');

      const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
      expect(rules.length).toBeGreaterThanOrEqual(2);

      // Rule for general search crawlers
      const generalRule = rules.find((r) => r.userAgent === '*');
      expect(generalRule).toBeDefined();
      expect(generalRule?.allow).toBe('/');
      expect(generalRule?.disallow).toContain('/api/');
      expect(generalRule?.disallow).toContain('/dashboard/');

      // Rule for AI answer bots (AEO)
      const aiRule = rules.find(
        (r) => Array.isArray(r.userAgent) && r.userAgent.includes('GPTBot')
      );
      expect(aiRule).toBeDefined();
      expect(aiRule?.allow).toContain('/en/pet-travel');
      expect(aiRule?.disallow).toContain('/api/');
    });
  });

  describe('sitemap.ts', () => {
    it('includes all critical landing pages, legal E-E-A-T pages, and corridors', async () => {
      const entries = await sitemap();
      expect(Array.isArray(entries)).toBe(true);
      expect(entries.length).toBeGreaterThanOrEqual(8);

      const urls = entries.map((e) => e.url);

      // High-priority core pages
      expect(urls).toContain('https://pawvalid.online');
      expect(urls).toContain('https://pawvalid.online/en/checker');
      expect(urls).toContain('https://pawvalid.online/en/pet-travel');

      // Legal & Trust compliance pages
      expect(urls).toContain('https://pawvalid.online/en/privacy');
      expect(urls).toContain('https://pawvalid.online/en/terms');

      // Corridor pages
      expect(urls).toContain('https://pawvalid.online/en/pet-travel/usa-to-germany');
      expect(urls).toContain('https://pawvalid.online/en/pet-travel/usa-to-uk');
      expect(urls).toContain('https://pawvalid.online/en/pet-travel/usa-to-australia');

      // Check priorities
      const homeEntry = entries.find((e) => e.url === 'https://pawvalid.online');
      expect(homeEntry?.priority).toBe(1.0);

      const checkerEntry = entries.find((e) => e.url === 'https://pawvalid.online/en/checker');
      expect(checkerEntry?.priority).toBe(0.9);
    });
  });
});
