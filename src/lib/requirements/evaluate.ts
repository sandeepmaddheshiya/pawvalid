/**
 * Rule Engine Evaluator (TRD §5)
 *
 * Pure function — no DB access, no side effects.
 * Takes already-fetched RequirementVersions and a Facts object, returns verdicts.
 *
 * This purity makes it independently unit-testable and reusable identically
 * across the checker UI, API, and PDF generator.
 *
 * FAIL-SAFE (PRD §26): Any exception during evaluation returns UNABLE_TO_DETERMINE,
 * never a false positive.
 */

import { Facts } from './facts';
import {
  RequirementVersionForEval,
  ItemVerdict,
  ItemStatus,
  RuleType,
  RequiredParams,
  MinWaitParams,
  DateWindowParams,
  DateBeforeParams,
  DateAfterParams,
  DocumentRequiredParams,
} from './schema';
import { evalRequired } from './rules/required';
import { evalMinWait } from './rules/minWait';
import { evalDateWindow } from './rules/dateWindow';
import { evalDateBefore } from './rules/dateBefore';
import { evalDateAfter } from './rules/dateAfter';
import { evalDocumentRequired } from './rules/documentRequired';

/**
 * Evaluates a single requirement version against the provided facts.
 */
function evaluateRule(
  rv: RequirementVersionForEval,
  facts: Facts,
  arrivalDatetime: string
): { status: ItemStatus; detail: string; deadlineIfApplicable?: string } {
  const ruleType: RuleType = rv.ruleType;

  switch (ruleType) {
    case 'REQUIRED':
      return evalRequired(rv.ruleParams as RequiredParams, facts);

    case 'MIN_WAIT':
      return evalMinWait(rv.ruleParams as MinWaitParams, facts, arrivalDatetime);

    case 'DATE_WINDOW':
      return evalDateWindow(rv.ruleParams as DateWindowParams, facts, arrivalDatetime);

    case 'DATE_BEFORE':
      return evalDateBefore(rv.ruleParams as DateBeforeParams, facts, arrivalDatetime);

    case 'DATE_AFTER':
      return evalDateAfter(rv.ruleParams as DateAfterParams, facts, arrivalDatetime);

    case 'DOCUMENT_REQUIRED':
      return evalDocumentRequired(rv.ruleParams as DocumentRequiredParams, facts);

    default: {
      // Unknown rule type — fail safe
      const _exhaustive: never = ruleType;
      return {
        status: 'UNABLE_TO_DETERMINE' as ItemStatus,
        detail: `Unknown rule type: ${_exhaustive}`,
      };
    }
  }
}

/**
 * Evaluates all requirement versions against the provided facts.
 *
 * FAIL-SAFE: wraps each individual rule evaluation in try/catch.
 * A single rule failure doesn't poison the entire assessment — it marks
 * that specific item as UNABLE_TO_DETERMINE.
 */
export function evaluate(
  requirementVersions: RequirementVersionForEval[],
  facts: Facts,
  tripArrivalDatetime: string
): ItemVerdict[] {
  return requirementVersions.map((rv) => {
    try {
      const result = evaluateRule(rv, facts, tripArrivalDatetime);

      return {
        requirementId: rv.requirementId,
        requirementVersionId: rv.id,
        status: result.status,
        severity: rv.severity,
        category: rv.category,
        ruleText: rv.ruleText,
        detail: result.detail,
        deadlineIfApplicable: result.deadlineIfApplicable,
        confidence: rv.confidence,
        source: {
          publisher: rv.source.publisher,
          url: rv.source.url,
          lastVerifiedAt: rv.lastVerifiedAt,
        },
      };
    } catch (error) {
      // FAIL-SAFE: any exception → UNABLE_TO_DETERMINE, never a false positive
      console.error(
        `[evaluate] Error evaluating requirement ${rv.requirementId} (version ${rv.id}):`,
        error
      );
      return {
        requirementId: rv.requirementId,
        requirementVersionId: rv.id,
        status: 'UNABLE_TO_DETERMINE' as ItemStatus,
        severity: rv.severity,
        category: rv.category,
        ruleText: rv.ruleText,
        detail: 'An error occurred during evaluation — unable to determine compliance',
        confidence: rv.confidence,
        source: {
          publisher: rv.source.publisher,
          url: rv.source.url,
          lastVerifiedAt: rv.lastVerifiedAt,
        },
      };
    }
  });
}
