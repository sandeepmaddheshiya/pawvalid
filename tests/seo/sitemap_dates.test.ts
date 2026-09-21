import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { GUIDES } from '@/lib/data/guides';

describe('Sitemap Data-Driven Modification Dates', () => {
  it('generates non-empty sitemap with valid lastModified Date objects', async () => {
    const entries = await sitemap();
    expect(entries.length).toBeGreaterThan(45);

    for (const entry of entries) {
      expect(entry.url).toBeTruthy();
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(isNaN((entry.lastModified as Date).getTime())).toBe(false);
    }
  });

  it('contains varied, data-driven lastModified dates per page type', async () => {
    const entries = await sitemap();
    const timestamps = new Set(entries.map((e) => (e.lastModified as Date).toISOString()));

    // Must have multiple distinct timestamps across the sitemap (not a single monolithic new Date())
    expect(timestamps.size).toBeGreaterThan(3);
  });

  it('matches guide dates to dateModified in GUIDES catalog', async () => {
    const entries = await sitemap();
    const guideEntries = entries.filter((e) => e.url.includes('/en/guides/'));

    expect(guideEntries.length).toBe(GUIDES.length);
    for (const guide of GUIDES) {
      const entry = guideEntries.find((e) => e.url.endsWith(`/en/guides/${guide.slug}`));
      expect(entry).toBeDefined();
      const expectedYear = new Date(guide.dateModified).getUTCFullYear();
      expect((entry?.lastModified as Date).getUTCFullYear()).toBe(expectedYear);
    }
  });
});
