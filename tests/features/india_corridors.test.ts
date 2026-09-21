import { describe, it, expect } from 'vitest';
import { CORRIDORS } from '@/lib/data/corridors';

describe('India Outbound Pet Travel Corridors', () => {
  const indiaCorridorKeys = [
    'india-to-uk',
    'india-to-usa',
    'india-to-canada',
    'india-to-australia',
  ];

  it('contains all 4 India-origin corridors with valid metadata', () => {
    indiaCorridorKeys.forEach((key) => {
      const corridor = CORRIDORS[key];
      expect(corridor, `Missing corridor: ${key}`).toBeDefined();
      expect(corridor.from).toBe('India');
      expect(corridor.originCode).toBe('IN');
      expect(corridor.fromFlag).toBe('🇮🇳');
      expect(corridor.authority).toContain('AQCS');
      expect(corridor.timelineSteps.length).toBeGreaterThanOrEqual(4);
      expect(corridor.faqs.length).toBeGreaterThanOrEqual(3);
      expect(corridor.statutoryRequirements.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('enforces 3-month titer latency rule for India to UK', () => {
    const uk = CORRIDORS['india-to-uk'];
    expect(uk.titerStatus).toBe('mandatory');
    expect(uk.destCode).toBe('GB');
    expect(uk.statutoryRequirements.some((r) => r.category === 'TITER_TEST')).toBe(true);
    expect(uk.statutoryRequirements.some((r) => r.category === 'TAPEWORM_TREATMENT')).toBe(true);
  });

  it('enforces CDC high-risk August 2024 regulations for India to USA', () => {
    const usa = CORRIDORS['india-to-usa'];
    expect(usa.destCode).toBe('US');
    expect(usa.legalBasis).toContain('CDC');
    expect(usa.statutoryRequirements.some((r) => r.category === 'AGE_REQUIREMENT')).toBe(true);
  });

  it('enforces CFIA health and rabies regulations for India to Canada', () => {
    const canada = CORRIDORS['india-to-canada'];
    expect(canada.destCode).toBe('CA');
    expect(canada.authority).toContain('CFIA');
    expect(canada.statutoryRequirements.some((r) => r.category === 'RABIES_VACCINATION')).toBe(true);
  });

  it('flags mandatory 180-day intermediate country residency for India to Australia', () => {
    const aus = CORRIDORS['india-to-australia'];
    expect(aus.destCode).toBe('AU');
    expect(aus.titerStatus).toBe('mandatory');
    expect(aus.quarantineDays).toContain('10–30 Days');
    expect(aus.description).toContain('non-approved country');
  });
});
