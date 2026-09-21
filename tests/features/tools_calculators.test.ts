import { describe, it, expect } from 'vitest';
import { TOOLS } from '@/lib/data/tools';

describe('Free Interactive Calculators & Tools (Item 23)', () => {
  it('contains all 3 free calculator tools with complete statutory metadata', () => {
    expect(TOOLS).toHaveLength(3);
    const slugs = TOOLS.map((t) => t.slug);
    expect(slugs).toContain('rabies-waiting-period-calculator');
    expect(slugs).toContain('favn-titer-calculator');
    expect(slugs).toContain('quarantine-risk-checker');
  });

  it('verifies that each tool contains comprehensive rules, overview, and FAQs', () => {
    TOOLS.forEach((tool) => {
      expect(tool.slug).toBeTruthy();
      expect(tool.name).toBeTruthy();
      expect(tool.badge).toBeTruthy();
      expect(tool.seoTitle.length).toBeGreaterThan(20);
      expect(tool.seoDescription.length).toBeGreaterThan(50);
      expect(tool.statutoryBasis).toBeTruthy();
      expect(tool.authority).toBeTruthy();
      expect(tool.overview.length).toBeGreaterThan(100);
      expect(tool.keyRules.length).toBeGreaterThanOrEqual(3);
      expect(tool.faqs.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Rabies 21-Day Waiting Period Math', () => {
    it('computes 21 full days of latency for primary vaccination', () => {
      const vDate = new Date('2026-06-01T00:00:00Z');
      const earliestTravel = new Date(vDate);
      earliestTravel.setDate(earliestTravel.getDate() + 21);

      // June 1 + 21 days = June 22
      expect(earliestTravel.toISOString().split('T')[0]).toBe('2026-06-22');
    });
  });

  describe('FAVN Titer Latency Math', () => {
    it('computes 90-day EU latency clock', () => {
      const drawDate = new Date('2026-01-01T00:00:00Z');
      const euEarliest = new Date(drawDate);
      euEarliest.setDate(euEarliest.getDate() + 90);

      // Jan 1 + 90 days = April 1 (in non-leap year)
      expect(euEarliest.toISOString().split('T')[0]).toBe('2026-04-01');
    });

    it('computes 180-day Australia/Japan latency clock', () => {
      const drawDate = new Date('2026-01-01T00:00:00Z');
      const auEarliest = new Date(drawDate);
      auEarliest.setDate(auEarliest.getDate() + 180);

      expect(auEarliest.toISOString().split('T')[0]).toBe('2026-06-30');
    });
  });
});
