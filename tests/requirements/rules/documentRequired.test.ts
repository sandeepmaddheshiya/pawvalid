/**
 * DOCUMENT_REQUIRED Rule Tests
 */

import { describe, it, expect } from 'vitest';
import { evalDocumentRequired } from '@/lib/requirements/rules/documentRequired';
import type { DocumentRequiredParams } from '@/lib/requirements/schema';
import type { Facts } from '@/lib/requirements/facts';

const params: DocumentRequiredParams = {
  document_type: 'health_certificate',
  field: 'has_health_certificate',
};

describe('evalDocumentRequired', () => {
  it('should SATISFY when document is present (boolean true)', () => {
    const facts: Facts = { has_health_certificate: true };
    const result = evalDocumentRequired(params, facts);
    expect(result.status).toBe('SATISFIED');
  });

  it('should SATISFY when document is present (string "true")', () => {
    const facts: Facts = { has_health_certificate: 'true' };
    const result = evalDocumentRequired(params, facts);
    expect(result.status).toBe('SATISFIED');
  });

  it('should PROBLEM when document is not present', () => {
    const facts: Facts = { has_health_certificate: false };
    const result = evalDocumentRequired(params, facts);
    expect(result.status).toBe('PROBLEM');
  });

  it('should return MISSING when fact is undefined', () => {
    const facts: Facts = {};
    const result = evalDocumentRequired(params, facts);
    expect(result.status).toBe('MISSING');
  });

  it('should return UNABLE_TO_DETERMINE when fact is unknown', () => {
    const facts: Facts = { has_health_certificate: 'unknown' };
    const result = evalDocumentRequired(params, facts);
    expect(result.status).toBe('UNABLE_TO_DETERMINE');
  });
});
