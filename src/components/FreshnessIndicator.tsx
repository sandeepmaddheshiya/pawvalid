import { getFreshnessStatus, freshnessConfig } from '@/lib/design/tokens';

interface FreshnessIndicatorProps {
  lastVerifiedAt: string;
  compact?: boolean;
}

export default function FreshnessIndicator({ lastVerifiedAt, compact = false }: FreshnessIndicatorProps) {
  const status = getFreshnessStatus(lastVerifiedAt);
  const config = freshnessConfig[status];
  const date = new Date(lastVerifiedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
        <span>{config.emoji}</span>
        <span>{formattedDate}</span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{config.emoji}</span>
      <span className="text-zinc-600 dark:text-zinc-300">
        Last verified: {formattedDate}
      </span>
      <span className="text-xs text-zinc-400 dark:text-zinc-500">
        [{config.label}]
      </span>
    </div>
  );
}
