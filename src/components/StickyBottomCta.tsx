'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyBottomCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero (> 480px)
      if (window.scrollY > 480) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Quick travel requirements check" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-zinc-200/90 shadow-[0_-8px_20px_rgba(0,0,0,0.08)] transition-all animate-fade-in">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
            Instant Route Check
          </span>
          <span className="text-xs font-bold text-zinc-900 leading-tight">
            Avoid Airport Grounding
          </span>
        </div>

        <Link
          href="#scanner"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <span>Check Requirements</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
