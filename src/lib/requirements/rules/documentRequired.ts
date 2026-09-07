/**
 * DOCUMENT_REQUIRED rule handler
 *
 * Checks that a required document is indicated as present in the facts.
 * Example: { document_type: "health_certificate", field: "has_health_certificate" }
 */

import { Facts } from '../facts';
import { DocumentRequiredParams, ItemStatus } from '../schema';

export function evalDocumentRequired(
  params: DocumentRequiredParams,
  facts: Facts
): { status: ItemStatus; detail: string } {
  const value = facts[params.field];

  if (value === undefined) {
    return {
      status: 'MISSING',
      detail: `Document status not provided: ${params.document_type}`,
    };
  }

  if (value === 'unknown') {
    return {
      status: 'UNABLE_TO_DETERMINE',
      detail: `Cannot determine if ${params.document_type} is available — marked as unknown`,
    };
  }

  // Check for truthy / "yes" / true values
  if (value === true || value === 'true' || value === 'yes' || value === '1') {
    return {
      status: 'SATISFIED',
      detail: `Required document "${params.document_type}" is indicated as available`,
    };
  }

  return {
    status: 'PROBLEM',
    detail: `Required document "${params.document_type}" is not available — you must obtain this document before travel`,
  };
}
