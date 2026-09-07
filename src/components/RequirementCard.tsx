'use client';

import { useState } from 'react';
import type { ItemVerdict } from '@/lib/requirements/schema';
import FreshnessIndicator from './FreshnessIndicator';

interface RequirementCardProps {
  item: ItemVerdict;
}

const statusConfig = {
  SATISFIED: {
    icon: '✓',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconText: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-l-emerald-500',
  },
  PROBLEM: {
    icon: '✕',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconText: 'text-red-600 dark:text-red-400',
    borderColor: 'border-l-red-500',
  },
  MISSING: {
    icon: '?',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconText: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-l-amber-500',
  },
  UNABLE_TO_DETERMINE: {
    icon: '—',
    iconBg: 'bg-gray-100 dark:bg-gray-900/30',
    iconText: 'text-gray-600 dark:text-gray-400',
    borderColor: 'border-l-gray-400',
  },
};

const severityLabels = {
  BLOCKING: { label: 'Required', class: 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400' },
  NON_BLOCKING: { label: 'Recommended', class: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' },
  INFORMATIONAL: { label: 'Info', class: 'bg-zinc-50 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
};

export default function RequirementCard({ item }: RequirementCardProps) {
  const [expanded, setExpanded] = useState(false);
  const sConfig = statusConfig[item.status];
  const sevConfig = severityLabels[item.severity];

  return (
    <div
      className={`
        card border-l-4 ${sConfig.borderColor} overflow-hidden
        transition-all duration-200 hover:shadow-card-hover
      `}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-start gap-3 text-left"
        aria-expanded={expanded}
      >
        {/* Status Icon */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${sConfig.iconBg} flex items-center justify-center`}>
          <span className={`text-sm font-bold ${sConfig.iconText}`}>{sConfig.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              {item.ruleText}
            </h4>
            <span className={`text-2xs px-2 py-0.5 rounded-full font-medium ${sevConfig.class}`}>
              {sevConfig.label}
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {item.detail}
          </p>
        </div>

        {/* Expand Arrow */}
        <svg
          className={`flex-shrink-0 w-4 h-4 text-zinc-400 transition-transform duration-200 mt-1 ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Expanded Details (PRD §23) */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 ml-11 animate-fade-in">
          <div className="space-y-3 border-t border-zinc-100 dark:border-zinc-800 pt-3">
            {/* Source */}
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider min-w-[60px]">
                Source
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {item.source.publisher}
              </span>
            </div>

            {/* Freshness */}
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider min-w-[60px]">
                Verified
              </span>
              <FreshnessIndicator lastVerifiedAt={item.source.lastVerifiedAt} compact />
            </div>

            {/* Source Link */}
            {item.source.url && (
              <a
                href={item.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                View source →
              </a>
            )}

            {/* Deadline */}
            {item.deadlineIfApplicable && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider min-w-[60px]">
                  Deadline
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {new Date(item.deadlineIfApplicable).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
