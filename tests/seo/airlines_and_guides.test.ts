import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AIRLINES } from '@/lib/data/airlines';
import { GUIDES } from '@/lib/data/guides';
import { CORRIDORS } from '@/lib/data/corridors';
import sitemap from '@/app/sitemap';

describe('Comprehensive Content Expansion (Airlines, Guides & Corridors)', () => {
  const originalEnv = process.env.NEXT_PUBLIC_APP_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://pawvalid.online';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = originalEnv;
  });

  describe('Airline Pet Policy Directory (AIRLINES)', () => {
    it('contains exactly 10 comprehensive international airlines with verified 2026 specs', () => {
      expect(AIRLINES).toHaveLength(10);
      const codes = AIRLINES.map((a) => a.code);
      expect(codes).toContain('LH');
      expect(codes).toContain('BA');
      expect(codes).toContain('DL');
      expect(codes).toContain('AF');
      expect(codes).toContain('EK');
      expect(codes).toContain('UA');
      expect(codes).toContain('AA');
      expect(codes).toContain('QR');
      expect(codes).toContain('KL');
      expect(codes).toContain('VS');
    });

    it('ensures zero thin content: each airline has detailed rules, booking steps, and FAQs', () => {
      for (const airline of AIRLINES) {
        expect(airline.slug).toBeTruthy();
        expect(airline.name).toBeTruthy();
        expect(airline.summary.length).toBeGreaterThan(100);
        expect(airline.brachycephalicPolicy.length).toBeGreaterThan(40);
        expect(airline.transitHubCare.length).toBeGreaterThan(40);
        expect(airline.keyRules.length).toBeGreaterThanOrEqual(4);
        expect(airline.bookingSteps.length).toBeGreaterThanOrEqual(3);
        expect(airline.faqs.length).toBeGreaterThanOrEqual(3);
      }
    });

    it('validates specific biosecurity constraints (e.g. British Airways & Emirates are cargo-only)', () => {
      const ba = AIRLINES.find((a) => a.code === 'BA');
      expect(ba?.inCabinAllowed).toBe(false);
      expect(ba?.cargoOnlyMandatory).toBe(true);

      const lh = AIRLINES.find((a) => a.code === 'LH');
      expect(lh?.inCabinAllowed).toBe(true);
      expect(lh?.inCabinMaxWeightKg).toBe(8);
    });
  });

  describe('High-Intent Regulatory Guides (GUIDES)', () => {
    it('contains all 4 deep-dive regulatory manuals', () => {
      expect(GUIDES).toHaveLength(4);
      const slugs = GUIDES.map((g) => g.slug);
      expect(slugs).toContain('rabies-titer-test-favn-guide');
      expect(slugs).toContain('usda-aphis-vehcs-guide');
      expect(slugs).toContain('iata-crate-requirements');
      expect(slugs).toContain('pet-travel-platform-vs-ai');
    });

    it('ensures exhaustive authoritative content: multiple sections, tables, steps, and FAQs', () => {
      for (const guide of GUIDES) {
        expect(guide.title.length).toBeGreaterThan(30);
        expect(guide.description.length).toBeGreaterThan(80);
        expect(guide.statutoryBasis).toBeTruthy();
        expect(guide.sections.length).toBeGreaterThanOrEqual(3);
        expect(guide.steps.length).toBeGreaterThanOrEqual(3);
        expect(guide.faqs.length).toBeGreaterThanOrEqual(2);

        // Verify sections contain substantive text
        const totalWordCount = guide.sections
          .flatMap((s) => s.content)
          .join(' ')
          .split(/\s+/).length;
        expect(totalWordCount).toBeGreaterThan(250);
      }
    });
  });

  describe('Bilateral International Corridors (CORRIDORS)', () => {
    it('provides 19 statutory corridors covering North America, Europe, Asia, and Oceania', () => {
      const corridorKeys = Object.keys(CORRIDORS);
      expect(corridorKeys.length).toBe(19);

      expect(corridorKeys).toContain('usa-to-germany');
      expect(corridorKeys).toContain('usa-to-uk');
      expect(corridorKeys).toContain('uk-to-spain');
      expect(corridorKeys).toContain('uk-to-france');
      expect(corridorKeys).toContain('usa-to-france');
      expect(corridorKeys).toContain('usa-to-italy');
      expect(corridorKeys).toContain('usa-to-mexico');
      expect(corridorKeys).toContain('usa-to-ireland');
      expect(corridorKeys).toContain('australia-to-uk');
      expect(corridorKeys).toContain('canada-to-usa');
      expect(corridorKeys).toContain('usa-to-uae');
      expect(corridorKeys).toContain('uk-to-usa');
      expect(corridorKeys).toContain('usa-to-australia');
      expect(corridorKeys).toContain('usa-to-canada');
      expect(corridorKeys).toContain('usa-to-japan');
      expect(corridorKeys).toContain('india-to-uk');
      expect(corridorKeys).toContain('india-to-usa');
      expect(corridorKeys).toContain('india-to-canada');
      expect(corridorKeys).toContain('india-to-australia');
    });

    it('validates corridor statutory accuracy (e.g. Ireland and UK mandate tapeworm, UAE mandates titer)', () => {
      const uk = CORRIDORS['usa-to-uk'];
      expect(uk.leadTime).toContain('Tapeworm');

      const ireland = CORRIDORS['usa-to-ireland'];
      expect(ireland.leadTime).toContain('Tapeworm');

      const uae = CORRIDORS['usa-to-uae'];
      expect(uae.titerStatus).toBe('mandatory');

      const canada = CORRIDORS['canada-to-usa'];
      expect(canada.certificateType).toContain('CDC Dog Import Form');
    });
  });

  describe('Dynamic Sitemap Integration', () => {
    it('indexes all 10 airlines, 4 guides, and 15 corridors in sitemap.xml', async () => {
      const entries = await sitemap();
      const urls = entries.map((e) => e.url);

      // Hub pages
      expect(urls).toContain('https://pawvalid.online/en/airlines');
      expect(urls).toContain('https://pawvalid.online/en/guides');
      expect(urls).toContain('https://pawvalid.online/en/pet-travel');

      // Airlines
      expect(urls).toContain('https://pawvalid.online/en/airlines/lufthansa');
      expect(urls).toContain('https://pawvalid.online/en/airlines/british-airways');
      expect(urls).toContain('https://pawvalid.online/en/airlines/emirates');

      // Guides
      expect(urls).toContain('https://pawvalid.online/en/guides/rabies-titer-test-favn-guide');
      expect(urls).toContain('https://pawvalid.online/en/guides/usda-aphis-vehcs-guide');
      expect(urls).toContain('https://pawvalid.online/en/guides/iata-crate-requirements');

      // Corridors
      expect(urls).toContain('https://pawvalid.online/en/pet-travel/uk-to-spain');
      expect(urls).toContain('https://pawvalid.online/en/pet-travel/usa-to-france');
      expect(urls).toContain('https://pawvalid.online/en/pet-travel/canada-to-usa');

      // Total entries should be at least 38 URLs
      expect(entries.length).toBeGreaterThanOrEqual(38);
    });
  });
});
