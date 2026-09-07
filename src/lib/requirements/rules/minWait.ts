/**
 * MIN_WAIT rule handler
 *
 * Checks that a minimum waiting period has elapsed between two dates.
 * Example: { value: 21, unit: "days", from: "rabies_vaccination_date", to: "arrival_datetime" }
 *   → rabies vaccination must be ≥21 days before arrival
 */

import { Facts } from '../facts';
import { MinWaitParams, ItemStatus } from '../schema';

function addDuration(date: Date, value: number, unit: 'days' | 'months' | 'years'): Date {
  const result = new Date(date);
  switch (unit) {
    case 'days':
      result.setDate(result.getDate() + value);
      break;
    case 'months':
      result.setMonth(result.getMonth() + value);
      break;
    case 'years':
      result.setFullYear(result.getFullYear() + value);
      break;
  }
  return result;
}

function diffDays(from: Date, to: Date): number {
  const msPerDay = 86400000;
  return Math.floor((to.getTime() - from.getTime()) / msPerDay);
}

export function evalMinWait(
  params: MinWaitParams,
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

  // Parse dates
  const fromDate = new Date(String(fromVal));
  const toDate = new Date(String(toVal));

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Invalid date format for ${params.from} or ${params.to}`,
    };
  }

  // Check if minimum wait period has elapsed
  const elapsed = diffDays(fromDate, toDate);
  let requiredDays: number;

  switch (params.unit) {
    case 'days':
      requiredDays = params.value;
      break;
    case 'months':
      requiredDays = params.value * 30; // approximation for display
      break;
    case 'years':
      requiredDays = params.value * 365;
      break;
  }

  const deadline = addDuration(fromDate, params.value, params.unit);

  if (elapsed >= requiredDays) {
    return {
      status: 'SATISFIED',
      detail: `Minimum wait of ${params.value} ${params.unit} satisfied (${elapsed} days elapsed)`,
      deadlineIfApplicable: deadline.toISOString(),
    };
  }

  return {
    status: 'PROBLEM',
    detail: `Minimum wait of ${params.value} ${params.unit} not met — only ${elapsed} days elapsed, need ${requiredDays}`,
    deadlineIfApplicable: deadline.toISOString(),
  };
}
