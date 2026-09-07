/**
 * DATE_WINDOW Rule Tests
 */

import { describe, it, expect } from 'vitest';
import { evalDateWindow } from '@/lib/requirements/rules/dateWindow';
import type { DateWindowParams } from '@/lib/requirements/schema';
import type { Facts } from '@/lib/requirements/facts';

const arrival = '2026-10-01T12:00:00.000Z';

describe('evalDateWindow', () => {
  it('should SATISFY when date falls within window', () => {
    const params: DateWindowParams = { min_days: 1, max_days: 10, from: 'health_certificate_date', to: 'arrival_datetime' };
    // Sept 25 to Oct 1 = 6 days (within 1-10)
    const facts: Facts = { health_certificate_date: '2026-09-25T12:00:00.000Z' };
    const result = evalDateWindow(params, facts, arrival);
    expect(result.status).toBe('SATISFIED');
  });

  it('should PROBLEM when date is too early (outside max)', () => {
    const params: DateWindowParams = { min_days: 1, max_days: 10, from: 'health_certificate_date', to: 'arrival_datetime' };
    // Sept 15 to Oct 1 = 16 days (outside 1-10)
    const facts: Facts = { health_certificate_date: '2026-09-15T12:00:00.000Z' };
    const result = evalDateWindow(params, facts, arrival);
    expect(result.status).toBe('PROBLEM');
  });

  it('should PROBLEM when date is too recent (under min)', () => {
    const params: DateWindowParams = { min_days: 5, max_days: 30, from: 'health_certificate_date', to: 'arrival_datetime' };
    // Sept 29 to Oct 1 = 2 days (under min 5)
    const facts: Facts = { health_certificate_date: '2026-09-29T12:00:00.000Z' };
    const result = evalDateWindow(params, facts, arrival);
    expect(result.status).toBe('PROBLEM');
  });

  it('should return MISSING when fact is undefined', () => {
    const params: DateWindowParams = { min_days: 1, max_days: 10, from: 'health_certificate_date', to: 'arrival_datetime' };
    const facts: Facts = {};
    const result = evalDateWindow(params, facts, arrival);
    expect(result.status).toBe('MISSING');
  });

  it('should return UNABLE_TO_DETERMINE when fact is unknown', () => {
    const params: DateWindowParams = { min_days: 1, max_days: 10, from: 'health_certificate_date', to: 'arrival_datetime' };
    const facts: Facts = { health_certificate_date: 'unknown' };
    const result = evalDateWindow(params, facts, arrival);
    expect(result.status).toBe('UNABLE_TO_DETERMINE');
  });

  it('should handle window with only max_days (no min)', () => {
    const params: DateWindowParams = { max_days: 10, from: 'health_certificate_date', to: 'arrival_datetime' };
    const facts: Facts = { health_certificate_date: '2026-09-25T12:00:00.000Z' };
    const result = evalDateWindow(params, facts, arrival);
    expect(result.status).toBe('SATISFIED');
  });
});
