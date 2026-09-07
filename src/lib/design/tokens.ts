/**
 * Design Tokens (TRD §2)
 *
 * Single source of truth for design values.
 * These are consumed by Tailwind config and directly by components.
 */

export const tokens = {
  colors: {
    primary: {
      main: '#7c6bf1',
      light: '#a5a4fc',
      dark: '#5f3fcb',
    },
    accent: {
      main: '#f59e0b',
      light: '#fde68a',
      dark: '#d97706',
    },
    verdict: {
      ready: '#10b981',
      mostly: '#f59e0b',
      action: '#ef4444',
      unknown: '#6b7280',
    },
    freshness: {
      fresh: '#10b981',
      due: '#f59e0b',
      overdue: '#ef4444',
    },
  },
  spacing: {
    page: {
      maxWidth: '1200px',
      padding: '1.5rem',
    },
    section: {
      gap: '4rem',
    },
  },
  transitions: {
    default: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    spring: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

/**
 * Verdict display configuration
 */
export const verdictConfig = {
  APPEARS_READY: {
    emoji: '🟢',
    label: 'Appears Ready',
    color: tokens.colors.verdict.ready,
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
    textClass: 'text-emerald-700 dark:text-emerald-400',
    borderClass: 'border-emerald-200 dark:border-emerald-800',
  },
  MOSTLY_READY: {
    emoji: '🟡',
    label: 'Mostly Ready — Action Recommended',
    color: tokens.colors.verdict.mostly,
    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
    textClass: 'text-amber-700 dark:text-amber-400',
    borderClass: 'border-amber-200 dark:border-amber-800',
  },
  ACTION_REQUIRED: {
    emoji: '🔴',
    label: 'Action Required',
    color: tokens.colors.verdict.action,
    bgClass: 'bg-red-50 dark:bg-red-950/30',
    textClass: 'text-red-700 dark:text-red-400',
    borderClass: 'border-red-200 dark:border-red-800',
  },
  UNABLE_TO_DETERMINE: {
    emoji: '⚪',
    label: 'Unable to Determine',
    color: tokens.colors.verdict.unknown,
    bgClass: 'bg-gray-50 dark:bg-gray-950/30',
    textClass: 'text-gray-700 dark:text-gray-400',
    borderClass: 'border-gray-200 dark:border-gray-800',
  },
} as const;

/**
 * Freshness display configuration (PRD §23)
 */
export const freshnessConfig = {
  fresh: {
    emoji: '🟢',
    label: 'Verified recently',
    maxDays: 60,
  },
  due: {
    emoji: '🟡',
    label: 'Verification due soon',
    maxDays: 90,
  },
  overdue: {
    emoji: '🔴',
    label: 'Verification overdue',
    maxDays: Infinity,
  },
} as const;

export function getFreshnessStatus(lastVerifiedAt: string | Date): keyof typeof freshnessConfig {
  const verified = new Date(lastVerifiedAt);
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - verified.getTime()) / 86400000);

  if (daysSince <= 60) return 'fresh';
  if (daysSince <= 90) return 'due';
  return 'overdue';
}
