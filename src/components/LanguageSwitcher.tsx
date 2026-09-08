'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, TRANSIT_HUBS, type AppLocale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer' | 'compact' | 'topbar';
}

export default function LanguageSwitcher({ variant = 'header' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '';
  const router = useRouter();

  // Detect current locale from pathname (e.g. /de/checker -> 'de')
  const detectedLocale = locales.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  ) || 'en';

  const currentHub = TRANSIT_HUBS[detectedLocale];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocale = (newLocale: AppLocale) => {
    setIsOpen(false);
    if (newLocale === detectedLocale) return;

    // Save in storage & cookie
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('petvia_locale', newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      } catch {
        // Ignore storage errors
      }
    }

    // Determine new path
    let newPath = pathname;
    const hasLocalePrefix = locales.some(
      (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );

    if (hasLocalePrefix) {
      newPath = pathname.replace(/^\/(en|de|fr|es)/, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}/checker`;
    }

    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={
          variant === 'topbar'
            ? 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none'
            : `inline-flex items-center gap-1.5 rounded-lg border transition-all cursor-pointer font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                variant === 'footer'
                  ? 'bg-zinc-50 dark:bg-surface-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 hover:bg-zinc-100'
                  : 'bg-white border-zinc-200 text-zinc-700 px-2.5 py-1.5 hover:bg-zinc-50 hover:border-zinc-300'
              }`
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`Transit Hub: ${currentHub.primaryHub}`}
      >
        {variant === 'topbar' && (
          <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        )}
        <span className="text-sm leading-none">{currentHub.flag}</span>
        <span className={variant === 'topbar' ? 'font-medium text-zinc-200' : 'font-semibold uppercase tracking-wider text-[11px] sm:text-xs'}>
          {variant === 'topbar' ? currentHub.nativeName : detectedLocale}
        </span>
        <svg
          className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white dark:bg-surface-900 shadow-xl border border-zinc-200 dark:border-zinc-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              European Transit Hub &amp; Language
            </p>
          </div>

          <div className="py-1">
            {locales.map((loc) => {
              const hub = TRANSIT_HUBS[loc];
              const isSelected = loc === detectedLocale;

              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleSelectLocale(loc)}
                  className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 text-xs sm:text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-surface-800'
                  }`}
                >
                  <span className="text-lg mt-0.5 shrink-0">{hub.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {hub.nativeName}
                      </span>
                      {isSelected && (
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      Hub: {hub.primaryHub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
