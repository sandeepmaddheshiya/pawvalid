'use client';

import React, { useState } from 'react';
import { LEFT_FAQS, RIGHT_FAQS, HOME_FAQS, type FaqItem } from '@/lib/seo/faqs';

export { LEFT_FAQS, RIGHT_FAQS, HOME_FAQS, type FaqItem };

export interface FaqEntry {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
  id?: string;
}

export interface FaqAccordionProps {
  items?: FaqEntry[];
  columns?: 1 | 2;
  defaultOpenIndex?: number;
  className?: string;
}

export default function FaqAccordion({
  items,
  columns,
  defaultOpenIndex,
  className = '',
}: FaqAccordionProps) {
  // Normalize items
  const normalizedItems: Array<{ id: string; question: string; answer: string }> =
    items && items.length > 0
      ? items.map((item, idx) => ({
          id: item.id || `faq-${idx}`,
          question: item.question || item.q || '',
          answer: item.answer || item.a || '',
        }))
      : [...LEFT_FAQS, ...RIGHT_FAQS];

  // Initialize state
  const initialOpen =
    defaultOpenIndex !== undefined && normalizedItems[defaultOpenIndex]
      ? [normalizedItems[defaultOpenIndex].id]
      : [];

  const [openIds, setOpenIds] = useState<string[]>(initialOpen);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Determine layout mode: 1 column or 2 columns
  const shouldSplit = columns === 2 || (columns === undefined && normalizedItems.length >= 4);

  if (shouldSplit) {
    const midpoint = Math.ceil(normalizedItems.length / 2);
    const leftColumn = normalizedItems.slice(0, midpoint);
    const rightColumn = normalizedItems.slice(midpoint);

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-5xl mx-auto text-left ${className}`}>
        {/* Left Column */}
        <div className="space-y-3.5 sm:space-y-4">
          {leftColumn.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-zinc-300 shadow-xs ring-1 ring-zinc-200/50'
                    : 'border-zinc-200/80 hover:border-zinc-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-3.5 focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {faq.question}
                  </h3>
                  <span
                    className={`w-6 h-6 rounded-full bg-zinc-100 group-hover:bg-zinc-200/70 text-zinc-500 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-zinc-900 bg-zinc-200/80' : ''
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4.5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-in fade-in-50 duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3.5 sm:space-y-4">
          {rightColumn.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-zinc-300 shadow-xs ring-1 ring-zinc-200/50'
                    : 'border-zinc-200/80 hover:border-zinc-300 shadow-2xs hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-3.5 focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {faq.question}
                  </h3>
                  <span
                    className={`w-6 h-6 rounded-full bg-zinc-100 group-hover:bg-zinc-200/70 text-zinc-500 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-zinc-900 bg-zinc-200/80' : ''
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4.5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-in fade-in-50 duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Single Column layout
  return (
    <div className={`space-y-3 max-w-3xl mx-auto text-left ${className}`}>
      {normalizedItems.map((faq) => {
        const isOpen = openIds.includes(faq.id);
        return (
          <div
            key={faq.id}
            className={`bg-white rounded-2xl border transition-all duration-200 ${
              isOpen
                ? 'border-zinc-300 shadow-xs ring-1 ring-zinc-200/50'
                : 'border-zinc-200/80 hover:border-zinc-300 shadow-2xs hover:shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-3.5 focus:outline-none group cursor-pointer"
              aria-expanded={isOpen}
            >
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug group-hover:text-emerald-800 transition-colors">
                {faq.question}
              </h3>
              <span
                className={`w-6 h-6 rounded-full bg-zinc-100 group-hover:bg-zinc-200/70 text-zinc-500 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-zinc-900 bg-zinc-200/80' : ''
                }`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-4.5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 animate-in fade-in-50 duration-150">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
