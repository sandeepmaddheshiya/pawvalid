/**
 * DATE_BEFORE rule handler
 *
 * Checks that a date occurs before a reference date, optionally within N days.
 * Example: { field: "health_certificate_date", before: "arrival_datetime", max_days: 10 }
 *   → health certificate must be issued no more than 10 days before arrival
 */

import { Facts } from '../facts';
import { DateBeforeParams, ItemStatus } from '../schema';

function diffDays(from: Date, to: Date): number {
  const msPerDay = 86400000;
  return Math.floor((to.getTime() - from.getTime()) / msPerDay);
}

export function evalDateBefore(
  params: DateBeforeParams,
  facts: Facts,
  arrivalDatetime: string
): { status: ItemStatus; detail: string; deadlineIfApplicable?: string } {
  const fieldVal = facts[params.field];
  let beforeVal: string | number | boolean | 'unknown' | undefined;
  if (params.before === 'arrival_datetime') {
    beforeVal = arrivalDatetime;
  } else if (params.before === 'departure_datetime') {
    beforeVal = facts['departure_datetime'];
  } else {
    beforeVal = facts[params.before];
  }

  if (fieldVal === undefined) {
    return {
      status: 'MISSING',
      detail: `Required date not provided: ${params.field}`,
    };
  }
  if (beforeVal === undefined) {
    return {
      status: 'MISSING',
      detail: `Reference date not available: ${params.before}`,
    };
  }
  if (fieldVal === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine compliance — "${params.field}" is unknown`,
    };
  }
  if (beforeVal === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine compliance — "${params.before}" is unknown`,
    };
  }

  const fieldDate = new Date(String(fieldVal));
  const beforeDate = new Date(String(beforeVal));

  if (isNaN(fieldDate.getTime()) || isNaN(beforeDate.getTime())) {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Invalid date format for ${params.field} or ${params.before}`,
    };
  }

  // Field date must be before reference date
  if (fieldDate >= beforeDate) {
    return {
      status: 'PROBLEM',
      detail: `"${params.field}" must occur before "${params.before}"`,
    };
  }

  // If max_days specified, check the field is within N days before
  if (params.max_days !== undefined) {
    const daysBefore = diffDays(fieldDate, beforeDate);
    if (daysBefore > params.max_days) {
      const deadline = new Date(beforeDate);
      deadline.setDate(deadline.getDate() - params.max_days);
      return {
        status: 'PROBLEM',
        detail: `"${params.field}" is ${daysBefore} days before "${params.before}" — must be within ${params.max_days} days`,
        deadlineIfApplicable: deadline.toISOString(),
      };
    }
  }

  return {
    status: 'SATISFIED',
    detail: `"${params.field}" is correctly dated before "${params.before}"`,
  };
}
