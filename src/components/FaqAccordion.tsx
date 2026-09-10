'use client';

import { useState } from 'react';
import { LEFT_FAQS, RIGHT_FAQS, HOME_FAQS, type FaqItem } from '@/lib/seo/faqs';

export { LEFT_FAQS, RIGHT_FAQS, HOME_FAQS, type FaqItem };

export default function FaqAccordion() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto text-left">
      {/* Left Column */}
      <div className="space-y-3">
        {LEFT_FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`border rounded-xl transition-all duration-200 ${
                isOpen
                  ? 'bg-white border-zinc-300 shadow-xs'
                  : 'bg-white border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                aria-expanded={isOpen}
              >
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#0E2342] leading-snug">
                  {faq.question}
                </h4>
                <span className="text-sm font-bold text-zinc-400 shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Column */}
      <div className="space-y-3">
        {RIGHT_FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`border rounded-xl transition-all duration-200 ${
                isOpen
                  ? 'bg-white border-zinc-300 shadow-xs'
                  : 'bg-white border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                aria-expanded={isOpen}
              >
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#0E2342] leading-snug">
                  {faq.question}
                </h4>
                <span className="text-sm font-bold text-zinc-400 shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100">
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
