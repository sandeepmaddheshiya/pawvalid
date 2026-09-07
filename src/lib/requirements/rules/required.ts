/**
 * REQUIRED rule handler
 *
 * Checks that a specified fact field is present and not unknown.
 * Example: { field: "microchip_number" } → microchip must be present
 */

import { Facts } from '../facts';
import { RequiredParams, ItemStatus } from '../schema';

export function evalRequired(
  params: RequiredParams,
  facts: Facts
): { status: ItemStatus; detail: string } {
  const value = facts[params.field];

  if (value === undefined) {
    return {
      status: 'MISSING',
      detail: `Required information not provided: ${params.field}`,
    };
  }

  if (value === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine compliance — "${params.field}" was marked as unknown`,
    };
  }

  // Value exists and is not unknown
  return {
    status: 'SATISFIED',
    detail: `Required field "${params.field}" is present`,
  };
}
