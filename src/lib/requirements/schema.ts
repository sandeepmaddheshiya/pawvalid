/**
 * Rule Engine Schema & Types
 * Typed vocabulary for the requirement evaluation system (PRD §10)
 *
 * This is the trust-critical type layer — no `any` allowed.
 */

// ─── Rule Types (MVP subset per PRD §10) ───────────────────────────────────────

export type RuleType =
  | 'REQUIRED'
  | 'MIN_WAIT'
  | 'DATE_WINDOW'
  | 'DATE_BEFORE'
  | 'DATE_AFTER'
  | 'DOCUMENT_REQUIRED';

// ─── Rule Param Types ──────────────────────────────────────────────────────────

export interface RequiredParams {
  field: string; // fact field that must be present
}

export interface MinWaitParams {
  value: number;
  unit: 'days' | 'months' | 'years';
  from: string; // fact field name
  to: string;   // fact field name or 'arrival_datetime'
}

export interface DateWindowParams {
  min_days?: number;
  max_days?: number;
  from: string; // fact field name
  to: string;   // fact field name or 'arrival_datetime'
}

export interface DateBeforeParams {
  field: string;    // fact field
  before: string;   // fact field or 'arrival_datetime' or 'departure_datetime'
  max_days?: number; // optional: must be within N days before
}

export interface DateAfterParams {
  field: string;   // fact field
  after: string;   // fact field or 'arrival_datetime' or 'departure_datetime'
  min_days?: number;
}

export interface DocumentRequiredParams {
  document_type: string; // e.g. 'health_certificate', 'import_permit'
  field: string;         // fact field that indicates document presence
}

export type RuleParams =
  | RequiredParams
  | MinWaitParams
  | DateWindowParams
  | DateBeforeParams
  | DateAfterParams
  | DocumentRequiredParams;

// ─── Item Status (per-requirement evaluation result) ───────────────────────────

export type ItemStatus =
  | 'SATISFIED'
  | 'PROBLEM'
  | 'MISSING'
  | 'UNABLE_TO_DETERMINE';

// ─── Verdict (overall assessment result, PRD §15) ──────────────────────────────

export type OverallVerdict =
  | 'APPEARS_READY'
  | 'MOSTLY_READY'
  | 'ACTION_REQUIRED'
  | 'UNABLE_TO_DETERMINE';

// ─── Severity (PRD §15) ───────────────────────────────────────────────────────

export type Severity = 'BLOCKING' | 'NON_BLOCKING' | 'INFORMATIONAL';

// ─── Confidence ────────────────────────────────────────────────────────────────

export type ConfidenceLevel =
  | 'VERIFIED'
  | 'NEEDS_REVIEW'
  | 'UNKNOWN'
  | 'CONDITIONAL'
  | 'CONFLICTING';

// ─── Requirement Version (application-layer typed view) ────────────────────────

export interface RequirementVersionForEval {
  id: string;
  requirementId: string;
  version: number;
  ruleType: RuleType;
  ruleParams: RuleParams;
  ruleText: string;
  severity: Severity;
  category: string;
  confidence: ConfidenceLevel;
  lastVerifiedAt: string; // ISO date
  source: {
    publisher: string;
    url: string;
    authorityTier: number;
  };
}

// ─── Item Verdict (per-requirement result with details) ────────────────────────

export interface ItemVerdict {
  requirementId: string;
  requirementVersionId: string;
  status: ItemStatus;
  severity: Severity;
  category: string;
  ruleText: string;
  detail: string;
  deadlineIfApplicable?: string; // ISO date
  confidence: ConfidenceLevel;
  source: {
    publisher: string;
    url: string;
    lastVerifiedAt: string;
  };
}
