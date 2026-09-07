/**
 * Fail-Safe Tests (PRD §26, TRD §7)
 *
 * Verifies that system errors, missing data, or evaluation exceptions
 * NEVER produce a positive ("READY") verdict.
 */

import { describe, it, expect } from 'vitest';
import { evaluate } from '@/lib/requirements/evaluate';
import { scoreOverall } from '@/lib/requirements/scoring';
import type { RequirementVersionForEval } from '@/lib/requirements/schema';
import type { Facts } from '@/lib/requirements/facts';

function makeReqVersion(overrides: Partial<RequirementVersionForEval>): RequirementVersionForEval {
  return {
    id: 'rv-1',
    requirementId: 'req-1',
    version: 1,
    ruleType: 'REQUIRED',
    ruleParams: { field: 'microchip_number' },
    ruleText: 'Test requirement',
    severity: 'BLOCKING',
    category: 'MICROCHIP',
    confidence: 'VERIFIED',
    lastVerifiedAt: '2026-09-01T00:00:00.000Z',
    source: {
      publisher: 'Test',
      url: 'https://test.com',
      authorityTier: 1,
    },
    ...overrides,
  };
}

describe('Fail-Safe Principle', () => {
  it('should return UNABLE_TO_DETERMINE when evaluate gets an unknown rule type', () => {
    const rvs = [
      makeReqVersion({ ruleType: 'UNKNOWN_TYPE' as RequirementVersionForEval['ruleType'] }),
    ];
    const facts: Facts = { microchip_number: '123456789012345' };
    const items = evaluate(rvs, facts, '2026-10-01T12:00:00.000Z');
    expect(items[0].status).toBe('UNABLE_TO_DETERMINE');
  });

  it('should never return APPEARS_READY when requirements are empty', () => {
    const items = evaluate([], {}, '2026-10-01T12:00:00.000Z');
    const verdict = scoreOverall(items);
    expect(verdict).toBe('UNABLE_TO_DETERMINE');
    expect(verdict).not.toBe('APPEARS_READY');
  });

  it('should return UNABLE_TO_DETERMINE when rule params cause an error', () => {
    const rvs = [
      makeReqVersion({
        ruleType: 'MIN_WAIT',
        ruleParams: { value: 21, unit: 'days', from: 'rabies_vaccination_date', to: 'arrival_datetime' },
      }),
    ];
    // Give it a fact that will cause issues
    const facts: Facts = { rabies_vaccination_date: 'not-a-valid-date' };
    const items = evaluate(rvs, facts, '2026-10-01T12:00:00.000Z');
    // Should not be SATISFIED
    expect(items[0].status).not.toBe('SATISFIED');
  });

  it('should never produce APPEARS_READY when any blocking item is missing', () => {
    const rvs = [
      makeReqVersion({ requirementId: 'req-1' }),
      makeReqVersion({ requirementId: 'req-2', id: 'rv-2', ruleParams: { field: 'nonexistent_field' } }),
    ];
    const facts: Facts = { microchip_number: '123456789012345' };
    const items = evaluate(rvs, facts, '2026-10-01T12:00:00.000Z');
    const verdict = scoreOverall(items);
    expect(verdict).not.toBe('APPEARS_READY');
  });

  it('should handle rule evaluation throwing an exception gracefully', () => {
    const rvs = [
      makeReqVersion({
        ruleType: 'DATE_WINDOW',
        // Intentionally malformed params
        ruleParams: null as unknown as RequirementVersionForEval['ruleParams'],
      }),
    ];
    const facts: Facts = {};
    // Should not throw
    const items = evaluate(rvs, facts, '2026-10-01T12:00:00.000Z');
    expect(items[0].status).toBe('UNABLE_TO_DETERMINE');
    expect(items[0].detail).toContain('error');
  });
});
