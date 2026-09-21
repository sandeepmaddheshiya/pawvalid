import { describe, it, expect } from 'vitest';
import { CORRIDORS } from '@/lib/data/corridors';

describe('50 Global Pet Travel Compliance Corridors', () => {
  it('contains exactly 50 validated international corridors', () => {
    const keys = Object.keys(CORRIDORS);
    expect(keys.length).toBe(50);
  });

  it('ensures every corridor contains all mandatory statutory properties', () => {
    Object.entries(CORRIDORS).forEach(([slug, c]) => {
      expect(c.slug, `Mismatch slug for ${slug}`).toBe(slug);
      expect(c.from, `Missing 'from' for ${slug}`).toBeTruthy();
      expect(c.to, `Missing 'to' for ${slug}`).toBeTruthy();
      expect(c.fromFlag, `Missing 'fromFlag' for ${slug}`).toBeTruthy();
      expect(c.toFlag, `Missing 'toFlag' for ${slug}`).toBeTruthy();
      expect(c.originCode, `Missing 'originCode' for ${slug}`).toMatch(/^[A-Z]{2}$/);
      expect(c.destCode, `Missing 'destCode' for ${slug}`).toMatch(/^[A-Z]{2}$/);
      expect(c.authority, `Missing 'authority' for ${slug}`).toBeTruthy();
      expect(c.legalBasis, `Missing 'legalBasis' for ${slug}`).toBeTruthy();
      expect(c.description, `Missing 'description' for ${slug}`).toBeTruthy();
      expect(c.titerStatus, `Invalid 'titerStatus' for ${slug}`).toMatch(/^(exempt|mandatory|conditional)$/);
      expect(c.quarantineDays, `Missing 'quarantineDays' for ${slug}`).toBeTruthy();
      expect(c.leadTime, `Missing 'leadTime' for ${slug}`).toBeTruthy();
      expect(c.certificateType, `Missing 'certificateType' for ${slug}`).toBeTruthy();
      expect(c.entryAirports.length, `Missing 'entryAirports' for ${slug}`).toBeGreaterThanOrEqual(1);
      expect(c.timelineSteps.length, `Must have at least 3 timeline steps for ${slug}`).toBeGreaterThanOrEqual(3);
      expect(c.faqs.length, `Must have at least 2 FAQs for ${slug}`).toBeGreaterThanOrEqual(2);
      expect(c.statutoryRequirements.length, `Must have at least 1 statutory rule for ${slug}`).toBeGreaterThanOrEqual(1);

      // Verify each statutory requirement
      c.statutoryRequirements.forEach((rule) => {
        expect(rule.id, `Missing rule id in ${slug}`).toBeTruthy();
        expect(rule.category, `Missing category in ${slug}`).toBeTruthy();
        expect(rule.categoryLabel, `Missing categoryLabel in ${slug}`).toBeTruthy();
        expect(rule.title, `Missing title in ${slug}`).toBeTruthy();
        expect(rule.severity, `Invalid severity in ${slug}`).toMatch(/^(BLOCKING|NON_BLOCKING)$/);
        expect(rule.rules.length, `Missing rule bullets in ${slug}`).toBeGreaterThanOrEqual(1);
        expect(rule.sourceName, `Missing sourceName in ${slug}`).toBeTruthy();
        expect(rule.sourceUrl, `Missing sourceUrl in ${slug}`).toMatch(/^https?:\/\//);
        expect(rule.lastVerifiedAt, `Outdated lastVerifiedAt in ${slug}`).toBe('September 21, 2026');
      });
    });
  });

  describe('Key International Corridor Groups', () => {
    it('covers all 8 bilateral India routes (inbound & outbound)', () => {
      const indiaRoutes = [
        'india-to-uk',
        'india-to-usa',
        'india-to-canada',
        'india-to-australia',
        'uk-to-india',
        'usa-to-india',
        'canada-to-india',
        'australia-to-india',
      ];
      indiaRoutes.forEach((route) => {
        expect(CORRIDORS[route], `Missing route: ${route}`).toBeDefined();
      });
    });

    it('covers Trans-Tasman routes between Australia and New Zealand', () => {
      const auToNz = CORRIDORS['australia-to-new-zealand'];
      const nzToAu = CORRIDORS['new-zealand-to-australia'];

      expect(auToNz).toBeDefined();
      expect(auToNz.titerStatus).toBe('exempt');
      expect(auToNz.quarantineDays).toContain('0 Days');

      expect(nzToAu).toBeDefined();
      expect(nzToAu.titerStatus).toBe('exempt');
      expect(nzToAu.quarantineDays).toContain('0 Days');
    });

    it('covers key European corridors to and from the UK post-Brexit', () => {
      const routes = [
        'germany-to-uk',
        'france-to-uk',
        'spain-to-uk',
        'italy-to-uk',
        'uk-to-germany',
        'uk-to-italy',
        'uk-to-ireland',
      ];
      routes.forEach((route) => {
        const corridor = CORRIDORS[route];
        expect(corridor, `Missing EU route: ${route}`).toBeDefined();
      });
    });

    it('covers key Asia and Middle East hubs (Singapore, UAE, Japan)', () => {
      const routes = [
        'usa-to-singapore',
        'singapore-to-usa',
        'uk-to-singapore',
        'singapore-to-uk',
        'uk-to-uae',
        'uae-to-uk',
        'usa-to-uae',
        'uk-to-japan',
        'japan-to-usa',
      ];
      routes.forEach((route) => {
        expect(CORRIDORS[route], `Missing route: ${route}`).toBeDefined();
      });
    });

    it('covers transatlantic and North American routes (Germany->USA, France->USA, Canada->UK, UK->Canada)', () => {
      const routes = [
        'germany-to-usa',
        'france-to-usa',
        'canada-to-uk',
        'uk-to-canada',
        'usa-to-switzerland',
        'usa-to-netherlands',
        'usa-to-new-zealand',
        'new-zealand-to-usa',
        'uk-to-new-zealand',
      ];
      routes.forEach((route) => {
        expect(CORRIDORS[route], `Missing route: ${route}`).toBeDefined();
      });
    });
  });
});
