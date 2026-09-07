import { verdictConfig } from '@/lib/design/tokens';
import type { OverallVerdict } from '@/lib/requirements/schema';

interface VerdictBadgeProps {
  verdict: OverallVerdict;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function VerdictBadge({ verdict, size = 'md', showLabel = true }: VerdictBadgeProps) {
  const config = verdictConfig[verdict];

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full
        ${config.bgClass} ${config.textClass} border ${config.borderClass}
        ${sizeClasses[size]}
        animate-fade-in
      `}
    >
      <span className="animate-pulse-soft">{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

/**
 * Large verdict display for assessment results
 */
export function VerdictHero({ verdict }: { verdict: OverallVerdict }) {
  const config = verdictConfig[verdict];

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-8
        ${config.bgClass} border ${config.borderClass}
        animate-fade-up
      `}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${config.color}, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center gap-4">
        <span className="text-5xl animate-pulse-soft">{config.emoji}</span>
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Overall Verdict
          </p>
          <h2 className={`text-2xl font-bold ${config.textClass}`}>
            {config.label}
          </h2>
        </div>
      </div>
    </div>
  );
}
