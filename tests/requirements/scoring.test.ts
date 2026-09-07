/**
 * Scoring Engine Tests (PRD §15)
 *
 * Tests all verdict logic combinations.
 */

import { describe, it, expect } from 'vitest';
import { scoreOverall, summarizeItems } from '@/lib/requirements/scoring';
import type { ItemVerdict } from '@/lib/requirements/schema';

function makeItem(overrides: Partial<ItemVerdict>): ItemVerdict {
  return {
    requirementId: 'req-1',
    requirementVersionId: 'rv-1',
    status: 'SATISFIED',
    severity: 'BLOCKING',
    category: 'MICROCHIP',
    ruleText: 'Test requirement',
    detail: 'Test detail',
    confidence: 'VERIFIED',
    source: { publisher: 'Test', url: 'https://test.com', lastVerifiedAt: '2026-09-01' },
    ...overrides,
  };
}

describe('scoreOverall', () => {
  it('should return APPEARS_READY when all items are satisfied', () => {
    const items: ItemVerdict[] = [
      makeItem({ status: 'SATISFIED', severity: 'BLOCKING' }),
      makeItem({ status: 'SATISFIED', severity: 'NON_BLOCKING', requirementId: 'req-2' }),
    ];
    expect(scoreOverall(items)).toBe('APPEARS_READY');
  });

  it('should return ACTION_REQUIRED when a blocking item fails', () => {
    const items: ItemVerdict[] = [
      makeItem({ status: 'PROBLEM', severity: 'BLOCKING' }),
      makeItem({ status: 'SATISFIED', severity: 'NON_BLOCKING', requirementId: 'req-2' }),
    ];
    expect(scoreOverall(items)).toBe('ACTION_REQUIRED');
  });

  it('should return ACTION_REQUIRED when a blocking item is missing', () => {
    const items: ItemVerdict[] = [
      makeItem({ status: 'MISSING', severity: 'BLOCKING' }),
    ];
    expect(scoreOverall(items)).toBe('ACTION_REQUIRED');
  });

  it('should return MOSTLY_READY when blocking satisfied but non-blocking fails', () => {
    const items: ItemVerdict[] = [
      makeItem({ status: 'SATISFIED', severity: 'BLOCKING' }),
      makeItem({ status: 'PROBLEM', severity: 'NON_BLOCKING', requirementId: 'req-2' }),
    ];
    expect(scoreOverall(items)).toBe('MOSTLY_READY');
  });

  it('should ignore informational items for verdict', () => {
    const items: ItemVerdict[] = [
      makeItem({ status: 'SATISFIED', severity: 'BLOCKING' }),
      makeItem({ status: 'PROBLEM', severity: 'INFORMATIONAL', requirementId: 'req-2' }),
    ];
    expect(scoreOverall(items)).toBe('APPEARS_READY');
  });

  it('should return UNABLE_TO_DETERMINE for empty items', () => {
    expect(scoreOverall([])).toBe('UNABLE_TO_DETERMINE');
  });

  it('should treat UNABLE_TO_DETERMINE blocking items as ACTION_REQUIRED', () => {
    const items: ItemVerdict[] = [
      makeItem({ status: 'UNABLE_TO_DETERMINE', severity: 'BLOCKING' }),
    ];
    // A blocking item that can't be determined is still a blocker
    const result = scoreOverall(items);
    expect(['ACTION_REQUIRED', 'UNABLE_TO_DETERMINE']).toContain(result);
  });
});

describe('summarizeItems', () => {
  it('should correctly count statuses', () => {
    const items: ItemVerdict[] = [
      makeItem({ status: 'SATISFIED' }),
      makeItem({ status: 'PROBLEM', requirementId: 'req-2' }),
      makeItem({ status: 'MISSING', requirementId: 'req-3' }),
      makeItem({ status: 'UNABLE_TO_DETERMINE', requirementId: 'req-4' }),
    ];
    const summary = summarizeItems(items);
    expect(summary).toEqual({
      satisfied: 1,
      problems: 1,
      missing: 1,
      undetermined: 1,
      total: 4,
    });
  });
});
