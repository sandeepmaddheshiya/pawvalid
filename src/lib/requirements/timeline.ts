/**
 * Timeline & Deadline Calculator
 *
 * Extracts actionable deadlines from item verdicts and produces
 * a chronologically-ordered action timeline for the assessment report (PRD §14).
 */

import { ItemVerdict } from './schema';

export interface TimelineItem {
  date: string;          // ISO date
  label: string;         // human-readable description
  category: string;
  requirementId: string;
  status: 'upcoming' | 'overdue' | 'completed';
  daysUntil: number;     // negative = overdue
}

/**
 * Builds a deadline timeline from item verdicts, relative to the current date.
 */
export function buildTimeline(
  items: ItemVerdict[],
  referenceDate: Date = new Date()
): TimelineItem[] {
  const timeline: TimelineItem[] = [];

  for (const item of items) {
    if (!item.deadlineIfApplicable) continue;

    const deadlineDate = new Date(item.deadlineIfApplicable);
    if (isNaN(deadlineDate.getTime())) continue;

    const msPerDay = 86400000;
    const daysUntil = Math.ceil((deadlineDate.getTime() - referenceDate.getTime()) / msPerDay);

    let status: TimelineItem['status'];
    if (item.status === 'SATISFIED') {
      status = 'completed';
    } else if (daysUntil < 0) {
      status = 'overdue';
    } else {
      status = 'upcoming';
    }

    timeline.push({
      date: deadlineDate.toISOString(),
      label: item.ruleText,
      category: item.category,
      requirementId: item.requirementId,
      status,
      daysUntil,
    });
  }

  // Sort chronologically
  timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return timeline;
}

/**
 * Returns the most urgent deadline (earliest upcoming/overdue).
 */
export function getNextDeadline(timeline: TimelineItem[]): TimelineItem | null {
  const pending = timeline.filter(t => t.status !== 'completed');
  return pending.length > 0 ? pending[0] : null;
}

/**
 * Formats days until a deadline as a human-readable string.
 */
export function formatDaysUntil(days: number): string {
  if (days < 0) {
    const abs = Math.abs(days);
    return abs === 1 ? '1 day overdue' : `${abs} days overdue`;
  }
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return `${days} days`;
  if (days <= 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week' : `${weeks} weeks`;
  }
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month' : `${months} months`;
}
