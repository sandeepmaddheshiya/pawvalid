import { describe, it, expect } from 'vitest';
import { CATALOG_RULES, getDeclarativeRequirements, normalizeIsoCode } from '@/lib/requirements/rulesCatalog';
import { getCurrentRequirementVersions } from '@/lib/requirements/queries';
import { evaluate } from '@/lib/requirements/evaluate';
import { scoreOverall } from '@/lib/requirements/scoring';

describe('Unified Compliance Engine (Item 21)', () => {
  it('contains master declarative rules with valid schemas', () => {
    expect(CATALOG_RULES.length).toBeGreaterThanOrEqual(10);
    CATALOG_RULES.forEach((rule) => {
      expect(rule.rule_id).toMatch(/^[A-Z0-9_]+$/);
      expect(rule.name).toBeTruthy();
      expect(rule.category).toBeTruthy();
      expect(rule.scope).toMatch(/^(LEAVING|TRANSIT|ARRIVING|LOGISTICS)$/);
      expect(rule.jurisdiction).toBeTruthy();
      expect(rule.source).toBeTruthy();
      expect(rule.source_url).toMatch(/^https?:\/\//);
      expect(rule.ruleType).toMatch(/^(REQUIRED|MIN_WAIT|DATE_WINDOW|DATE_BEFORE|DATE_AFTER|DOCUMENT_REQUIRED)$/);
      expect(rule.severity).toMatch(/^(BLOCKING|NON_BLOCKING|INFORMATIONAL)$/);
    });
  });

  it('normalizes various country representations accurately', () => {
    expect(normalizeIsoCode('United States')).toBe('US');
    expect(normalizeIsoCode('USA')).toBe('US');
    expect(normalizeIsoCode('united kingdom')).toBe('GB');
    expect(normalizeIsoCode('UK')).toBe('GB');
    expect(normalizeIsoCode('Germany')).toBe('DE');
    expect(normalizeIsoCode('Singapore')).toBe('SG');
    expect(normalizeIsoCode('Australia')).toBe('AU');
    expect(normalizeIsoCode('India')).toBe('IN');
    expect(normalizeIsoCode('CA')).toBe('CA');
  });

  it('generates declarative requirement versions for unseeded routes without error', async () => {
    const reqs = await getCurrentRequirementVersions('india-to-uk', 'DOG');
    expect(reqs.length).toBeGreaterThanOrEqual(2);

    const rabiesReq = reqs.find((r) => r.category === 'RABIES_VACCINATION' || r.category === 'RABIES_TITER');
    expect(rabiesReq).toBeDefined();
  });

  it('evaluates compliant pet travel facts into APPEARS_READY verdict', () => {
    const reqs = getDeclarativeRequirements('US', 'DE', [], 'DOG');
    const arrival = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();

    const facts = {
      species: 'DOG',
      microchip_number: '985141001234567',
      microchip_date: '2025-01-01T00:00:00.000Z',
      rabies_vaccination_date: '2025-02-01T00:00:00.000Z',
      has_health_certificate: true,
      origin_country: 'US',
      destination_country: 'DE',
      airline: 'lufthansa',
    };

    const items = evaluate(reqs, facts, arrival);
    const overallVerdict = scoreOverall(items);

    expect(overallVerdict).toBe('APPEARS_READY');
  });

  it('flags missing microchip as ACTION_REQUIRED blocker', () => {
    const reqs = getDeclarativeRequirements('US', 'DE', [], 'DOG');
    const arrival = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();

    const facts = {
      species: 'DOG',
      microchip_number: undefined,
      has_health_certificate: true,
      origin_country: 'US',
      destination_country: 'DE',
      airline: 'lufthansa',
    };

    const items = evaluate(reqs, facts, arrival);
    const microchipItem = items.find((i) => i.category === 'MICROCHIP');

    expect(microchipItem?.status).toBe('MISSING');
    expect(scoreOverall(items)).toBe('ACTION_REQUIRED');
  });
});
