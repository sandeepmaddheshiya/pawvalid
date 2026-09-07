/**
 * MIN_WAIT Rule Tests (TRD §7)
 *
 * Boundary: exactly 21 days, 20 days, 22 days, unknown, missing
 */

import { describe, it, expect } from 'vitest';
import { evalMinWait } from '@/lib/requirements/rules/minWait';
import type { MinWaitParams } from '@/lib/requirements/schema';
import type { Facts } from '@/lib/requirements/facts';

const params: MinWaitParams = {
  value: 21,
  unit: 'days',
  from: 'rabies_vaccination_date',
  to: 'arrival_datetime',
};

const arrival = '2026-10-01T12:00:00.000Z';

describe('evalMinWait', () => {
  it('should SATISFY when exactly 21 days have elapsed', () => {
    // Sept 10 to Oct 1 = 21 days
    const facts: Facts = {
      rabies_vaccination_date: '2026-09-10T12:00:00.000Z',
    };
    const result = evalMinWait(params, facts, arrival);
    expect(result.status).toBe('SATISFIED');
  });

  it('should PROBLEM when only 20 days have elapsed', () => {
    // Sept 11 to Oct 1 = 20 days
    const facts: Facts = {
      rabies_vaccination_date: '2026-09-11T12:00:00.000Z',
    };
    const result = evalMinWait(params, facts, arrival);
    expect(result.status).toBe('PROBLEM');
    expect(result.detail).toContain('not met');
  });

  it('should SATISFY when 22 days have elapsed', () => {
    // Sept 9 to Oct 1 = 22 days
    const facts: Facts = {
      rabies_vaccination_date: '2026-09-09T12:00:00.000Z',
    };
    const result = evalMinWait(params, facts, arrival);
    expect(result.status).toBe('SATISFIED');
  });

  it('should return UNABLE_TO_DETERMINE when fact is unknown', () => {
    const facts: Facts = {
      rabies_vaccination_date: 'unknown',
    };
    const result = evalMinWait(params, facts, arrival);
    expect(result.status).toBe('UNABLE_TO_DETERMINE');
  });

  it('should return MISSING when fact is undefined', () => {
    const facts: Facts = {};
    const result = evalMinWait(params, facts, arrival);
    expect(result.status).toBe('MISSING');
  });

  it('should return UNABLE_TO_DETERMINE for invalid date', () => {
    const facts: Facts = {
      rabies_vaccination_date: 'not-a-date',
    };
    const result = evalMinWait(params, facts, arrival);
    expect(result.status).toBe('UNABLE_TO_DETERMINE');
  });

  it('should include a deadline in the result', () => {
    const facts: Facts = {
      rabies_vaccination_date: '2026-09-10T12:00:00.000Z',
    };
    const result = evalMinWait(params, facts, arrival);
    expect(result.deadlineIfApplicable).toBeDefined();
  });

  it('should handle month-based waiting periods', () => {
    const monthParams: MinWaitParams = {
      value: 6,
      unit: 'months',
      from: 'rabies_titer_test_date',
      to: 'arrival_datetime',
    };
    // March 1 to Oct 1 = ~214 days, 6 months = 180 days
    const facts: Facts = {
      rabies_titer_test_date: '2026-03-01T00:00:00.000Z',
    };
    const result = evalMinWait(monthParams, facts, arrival);
    expect(result.status).toBe('SATISFIED');
  });
});
