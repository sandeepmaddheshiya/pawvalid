/**
 * DATE_AFTER rule handler
 *
 * Checks that a date occurs after a reference date, optionally with a minimum gap.
 * Example: { field: "rabies_vaccination_date", after: "microchip_date", min_days: 0 }
 *   → rabies vaccination must occur after microchipping
 */

import { Facts } from '../facts';
import { DateAfterParams, ItemStatus } from '../schema';

function diffDays(from: Date, to: Date): number {
  const msPerDay = 86400000;
  return Math.floor((to.getTime() - from.getTime()) / msPerDay);
}

export function evalDateAfter(
  params: DateAfterParams,
  facts: Facts,
  arrivalDatetime: string
): { status: ItemStatus; detail: string; deadlineIfApplicable?: string } {
  const fieldVal = facts[params.field];
  let afterVal: string | number | boolean | 'unknown' | undefined;
  if (params.after === 'arrival_datetime') {
    afterVal = arrivalDatetime;
  } else if (params.after === 'departure_datetime') {
    afterVal = facts['departure_datetime'];
  } else {
    afterVal = facts[params.after];
  }

  if (fieldVal === undefined) {
    return {
      status: 'MISSING',
      detail: `Required date not provided: ${params.field}`,
    };
  }
  if (afterVal === undefined) {
    return {
      status: 'MISSING',
      detail: `Reference date not available: ${params.after}`,
    };
  }
  if (fieldVal === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine compliance — "${params.field}" is unknown`,
    };
  }
  if (afterVal === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine compliance — "${params.after}" is unknown`,
    };
  }

  const fieldDate = new Date(String(fieldVal));
  const afterDate = new Date(String(afterVal));

  if (isNaN(fieldDate.getTime()) || isNaN(afterDate.getTime())) {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Invalid date format for ${params.field} or ${params.after}`,
    };
  }

  // Field date must be after reference date
  if (fieldDate <= afterDate) {
    return {
      status: 'PROBLEM',
      detail: `"${params.field}" must occur after "${params.after}"`,
    };
  }

  // If min_days specified, check the gap
  if (params.min_days !== undefined) {
    const daysAfter = diffDays(afterDate, fieldDate);
    if (daysAfter < params.min_days) {
      return {
        status: 'PROBLEM',
        detail: `"${params.field}" is only ${daysAfter} days after "${params.after}" — need at least ${params.min_days} days`,
      };
    }
  }

  return {
    status: 'SATISFIED',
    detail: `"${params.field}" is correctly dated after "${params.after}"`,
  };
}
