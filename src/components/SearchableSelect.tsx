'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';

export interface SearchableOption {
  value: string;
  label: string;
  flag?: string;
  subtext?: string;
  keywords?: string[];
}

export type SearchableSelectOption = string | SearchableOption;

export interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SearchableSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  allowCustom?: boolean;
  clearable?: boolean;
  className?: string;
  id?: string;
}

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  searchPlaceholder = 'Type to search...',
  disabled = false,
  allowCustom = true,
  clearable = true,
  className = '',
  id,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Normalize options to structured objects
  const normalizedOptions = useMemo<SearchableOption[]>(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  // Selected item object
  const selectedOption = normalizedOptions.find(
    (opt) => opt.value.toLowerCase() === (value || '').toLowerCase()
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input on open and highlight current value
  useEffect(() => {
    if (isOpen) {
      if (value) {
        const idx = normalizedOptions.findIndex(
          (opt) => opt.value.toLowerCase() === value.toLowerCase()
        );
        if (idx >= 0) setHighlightedIndex(idx);
      }
      // Small timeout to guarantee DOM is rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
      setHighlightedIndex(0);
    }
  }, [isOpen, value, normalizedOptions]);

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Filter options based on search query (matching label, value, subtext or keywords)
  const filteredOptions = normalizedOptions.filter((opt) => {
    if (!cleanQuery) return true;
    return (
      opt.label.toLowerCase().includes(cleanQuery) ||
      opt.value.toLowerCase().includes(cleanQuery) ||
      (opt.subtext && opt.subtext.toLowerCase().includes(cleanQuery)) ||
      (opt.keywords && opt.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery)))
    );
  });

  const exactMatchExists = normalizedOptions.some(
    (opt) =>
      opt.label.toLowerCase() === cleanQuery ||
      opt.value.toLowerCase() === cleanQuery
  );

  const showCustomOption =
    allowCustom && cleanQuery.length > 0 && !exactMatchExists;

  const totalNavigableCount =
    filteredOptions.length + (showCustomOption ? 1 : 0);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setSearchQuery('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < totalNavigableCount - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : Math.max(0, totalNavigableCount - 1)
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showCustomOption && highlightedIndex === filteredOptions.length) {
        handleSelect(searchQuery.trim());
      } else if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex].value);
      } else if (showCustomOption) {
        handleSelect(searchQuery.trim());
      }
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Select2 Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between rounded-xl border bg-zinc-50/50 hover:bg-white px-3 py-2 text-xs font-semibold text-left transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen
            ? 'border-[#0E2342] bg-white ring-2 ring-[#0E2342]/10 shadow-xs'
            : 'border-zinc-200 hover:border-zinc-300'
        }`}
      >
        <div className="flex items-center gap-1.5 truncate min-w-0 pr-2">
          {selectedOption?.flag && (
            <span className="text-sm shrink-0 leading-none">
              {selectedOption.flag}
            </span>
          )}
          <span
            className={`truncate ${
              value ? 'text-zinc-800 font-semibold' : 'text-zinc-400 font-normal'
            }`}
          >
            {selectedOption ? selectedOption.label : value || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Clear button (when clearable and has value) */}
          {clearable && value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClear(e as unknown as React.MouseEvent);
                }
              }}
              title="Clear selection"
              className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-full p-0.5 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}

          {/* Chevron */}
          <svg
            className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-zinc-600' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Select2 Popover Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-zinc-200 bg-white shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100 min-w-[240px]">
          {/* Search Box Header */}
          <div className="p-2 border-b border-zinc-100 bg-zinc-50/80">
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-2.5 text-zinc-400">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-800 placeholder-zinc-400 focus:border-[#0E2342] focus:ring-1 focus:ring-[#0E2342]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Options List */}
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-56 overflow-y-auto py-1 divide-y divide-zinc-50 focus:outline-none"
          >
            {filteredOptions.length === 0 && !showCustomOption && (
              <li className="px-3 py-3 text-center text-xs text-zinc-400 font-medium">
                No matching results found
              </li>
            )}

            {filteredOptions.map((opt, idx) => {
              const isSelected =
                opt.value.toLowerCase() === (value || '').toLowerCase();
              const isHighlighted = idx === highlightedIndex;

              return (
                <li
                  key={`${opt.value}-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-3 py-2 text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    isHighlighted
                      ? 'bg-zinc-100 text-zinc-900'
                      : isSelected
                      ? 'bg-zinc-50 text-[#0E2342] font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {opt.flag && (
                      <span className="text-sm shrink-0 leading-none">
                        {opt.flag}
                      </span>
                    )}
                    <span className="truncate">{opt.label}</span>
                    {opt.subtext && (
                      <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                        ({opt.subtext})
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-[#0FA958] shrink-0 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </li>
              );
            })}

            {/* Custom Entry Option */}
            {showCustomOption && (
              <li
                role="option"
                aria-selected={false}
                onMouseEnter={() =>
                  setHighlightedIndex(filteredOptions.length)
                }
                onClick={() => handleSelect(searchQuery.trim())}
                className={`px-3 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                  highlightedIndex === filteredOptions.length
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span className="text-emerald-600 text-sm">✨</span>
                <span className="truncate">
                  Use custom entry: &ldquo;
                  <span className="underline font-bold">
                    {searchQuery.trim()}
                  </span>
                  &rdquo;
                </span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
