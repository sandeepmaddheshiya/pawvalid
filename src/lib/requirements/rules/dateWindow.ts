/**
 * DATE_WINDOW rule handler
 *
 * Checks that a date falls within a specific window (min_days to max_days) relative to another date.
 * Example: { min_days: 1, max_days: 10, from: "health_certificate_date", to: "arrival_datetime" }
 *   → health certificate must be issued 1–10 days before arrival
 */

import { Facts } from '../facts';
import { DateWindowParams, ItemStatus } from '../schema';

function diffDays(from: Date, to: Date): number {
  const msPerDay = 86400000;
  return Math.floor((to.getTime() - from.getTime()) / msPerDay);
}

export function evalDateWindow(
  params: DateWindowParams,
  facts: Facts,
  arrivalDatetime: string
): { status: ItemStatus; detail: string; deadlineIfApplicable?: string } {
  const fromVal = facts[params.from];
  const toVal = params.to === 'arrival_datetime' ? arrivalDatetime : facts[params.to];

  // Missing data
  if (fromVal === undefined) {
    return {
      status: 'MISSING',
      detail: `Required date not provided: ${params.from}`,
    };
  }
  if (toVal === undefined) {
    return {
      status: 'MISSING',
      detail: `Reference date not available: ${params.to}`,
    };
  }

  // Unknown data
  if (fromVal === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine compliance — "${params.from}" is unknown`,
    };
  }
  if (toVal === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine compliance — "${params.to}" is unknown`,
    };
  }

  const fromDate = new Date(String(fromVal));
  const toDate = new Date(String(toVal));

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Invalid date format for ${params.from} or ${params.to}`,
    };
  }

  const elapsed = diffDays(fromDate, toDate);

  // Build window description
  const windowParts: string[] = [];
  if (params.min_days !== undefined) windowParts.push(`≥${params.min_days} days`);
  if (params.max_days !== undefined) windowParts.push(`≤${params.max_days} days`);
  const windowDesc = windowParts.join(' and ');

  // Check min bound
  if (params.min_days !== undefined && elapsed < params.min_days) {
    return {
      status: 'PROBLEM',
      detail: `Date window not met — ${elapsed} days elapsed, need ${windowDesc} before reference date`,
    };
  }

  // Check max bound
  if (params.max_days !== undefined && elapsed > params.max_days) {
    // Calculate when the window opens (latest acceptable date)
    const latestDate = new Date(toDate);
    latestDate.setDate(latestDate.getDate() - (params.min_days ?? 0));

    return {
      status: 'PROBLEM',
      detail: `Date window expired — ${elapsed} days elapsed, must be ${windowDesc} before reference date`,
      deadlineIfApplicable: latestDate.toISOString(),
    };
  }

  return {
    status: 'SATISFIED',
    detail: `Date window requirement satisfied (${elapsed} days within ${windowDesc} window)`,
  };
}
