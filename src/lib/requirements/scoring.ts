/**
 * Scoring Engine (PRD §15)
 *
 * Computes the overall assessment verdict from individual item verdicts.
 *
 * Verdict logic:
 *   Any blocking requirement failed/missing/unknown  → 🔴 ACTION REQUIRED
 *   All blocking satisfied, some non-blocking pending → 🟡 MOSTLY READY
 *   All blocking + non-blocking satisfied             → 🟢 APPEARS READY
 *
 * "Appears" is deliberate wording per PRD §6 — never "certified ready."
 */

import { ItemVerdict, OverallVerdict } from './schema';

export function scoreOverall(items: ItemVerdict[]): OverallVerdict {
  // If there are no items, we can't determine anything
  if (items.length === 0) {
    return 'UNABLE_TO_DETERMINE';
  }

  let hasBlockingProblem = false;
  let hasNonBlockingProblem = false;
  let hasUnableToDetermine = false;

  for (const item of items) {
    const isFailing =
      item.status === 'PROBLEM' ||
      item.status === 'MISSING' ||
      item.status === 'UNABLE_TO_DETERMINE';

    if (!isFailing) continue;

    if (item.status === 'UNABLE_TO_DETERMINE') {
      hasUnableToDetermine = true;
    }

    switch (item.severity) {
      case 'BLOCKING':
        hasBlockingProblem = true;
        break;
      case 'NON_BLOCKING':
        hasNonBlockingProblem = true;
        break;
      case 'INFORMATIONAL':
        // Informational items don't affect the overall verdict
        break;
    }
  }

  // If any blocking item has an issue, we can't proceed
  if (hasBlockingProblem) {
    // If we can't even determine blocking items, that's different from a known failure
    if (hasUnableToDetermine && !items.some(
      i => i.severity === 'BLOCKING' && (i.status === 'PROBLEM' || i.status === 'MISSING')
    )) {
      return 'UNABLE_TO_DETERMINE';
    }
    return 'ACTION_REQUIRED';
  }

  // All blocking satisfied, check non-blocking
  if (hasNonBlockingProblem) {
    return 'MOSTLY_READY';
  }

  // Everything passed
  return 'APPEARS_READY';
}

/**
 * Groups item verdicts by category for display purposes.
 */
export function groupByCategory(items: ItemVerdict[]): Record<string, ItemVerdict[]> {
  const groups: Record<string, ItemVerdict[]> = {};
  for (const item of items) {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
  }
  return groups;
}

/**
 * Returns a summary count of item statuses.
 */
export function summarizeItems(items: ItemVerdict[]): {
  satisfied: number;
  problems: number;
  missing: number;
  undetermined: number;
  total: number;
} {
  let satisfied = 0;
  let problems = 0;
  let missing = 0;
  let undetermined = 0;

  for (const item of items) {
    switch (item.status) {
      case 'SATISFIED':
        satisfied++;
        break;
      case 'PROBLEM':
        problems++;
        break;
      case 'MISSING':
        missing++;
        break;
      case 'UNABLE_TO_DETERMINE':
        undetermined++;
        break;
    }
  }

  return { satisfied, problems, missing, undetermined, total: items.length };
}
