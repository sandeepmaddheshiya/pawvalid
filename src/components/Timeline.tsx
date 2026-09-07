import type { ItemVerdict } from '@/lib/requirements/schema';
import { buildTimeline, formatDaysUntil, getNextDeadline } from '@/lib/requirements/timeline';

interface TimelineProps {
  items: ItemVerdict[];
}

export default function Timeline({ items }: TimelineProps) {
  const timeline = buildTimeline(items);
  const nextDeadline = getNextDeadline(timeline);

  if (timeline.length === 0) return null;

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
        📅 Action Timeline
        {nextDeadline && (
          <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
            — Next: {formatDaysUntil(nextDeadline.daysUntil)}
          </span>
        )}
      </h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-700" />

        <div className="space-y-4">
          {timeline.map((item, index) => {
            const statusColors = {
              completed: {
                dot: 'bg-emerald-500',
                text: 'text-emerald-600 dark:text-emerald-400',
                line: 'line-through opacity-60',
              },
              upcoming: {
                dot: 'bg-primary-500 animate-pulse-soft',
                text: 'text-zinc-700 dark:text-zinc-300',
                line: '',
              },
              overdue: {
                dot: 'bg-red-500 animate-pulse-soft',
                text: 'text-red-600 dark:text-red-400',
                line: '',
              },
            };

            const colors = statusColors[item.status];

            return (
              <div
                key={`${item.requirementId}-${index}`}
                className="relative pl-10 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Dot */}
                <div className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-surface-800 ${colors.dot}`} />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-sm font-medium ${colors.text} ${colors.line}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className={`text-sm font-semibold ${colors.text}`}>
                      {formatDaysUntil(item.daysUntil)}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
