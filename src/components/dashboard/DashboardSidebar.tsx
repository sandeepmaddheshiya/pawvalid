'use client';

import React from 'react';

export type DashboardTab =
  | 'overview'
  | 'passport'
  | 'timeline'
  | 'checklist'
  | 'vault'
  | 'vetsheet'
  | 'crate'
  | 'concierge';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  blockersCount: number;
  docsCount: number;
  tier?: string;
}

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  blockersCount,
  docsCount,
  tier,
}: DashboardSidebarProps) {
  const isPaid = tier === 'CERTIFIED_PASS' || tier === 'CONCIERGE';

  const navItems = [
    {
      id: 'overview' as DashboardTab,
      label: 'Overview',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      badge: blockersCount > 0 ? `${blockersCount} Action` : undefined,
      badgeStyle: 'bg-red-50 text-red-700 border border-red-200/80',
    },
    {
      id: 'passport' as DashboardTab,
      label: 'Digital Pet Passport',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.169.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.337 0z" />
        </svg>
      ),
      badge: isPaid ? 'Verified' : 'Plan',
      badgeStyle: isPaid
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
        : 'bg-amber-50 text-amber-800 border border-amber-200/80',
    },
    {
      id: 'timeline' as DashboardTab,
      label: 'Timeline & Milestones',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'checklist' as DashboardTab,
      label: 'Regulatory Checklist',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'vault' as DashboardTab,
      label: 'Document Vault',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      ),
      badge: docsCount > 0 ? `${docsCount}` : undefined,
      badgeStyle: 'bg-zinc-100 text-zinc-600 border border-zinc-200/60 font-mono',
    },
    {
      id: 'vetsheet' as DashboardTab,
      label: 'Instructions for Vet',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      id: 'crate' as DashboardTab,
      label: 'Airline & Crate Guide',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
    },
    {
      id: 'concierge' as DashboardTab,
      label: 'Priority Expert Review',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      badge: 'Expert',
      badgeStyle: 'bg-amber-50 text-amber-900 border border-amber-200/80',
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-68 bg-white border-r border-zinc-200/80 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] p-3.5 justify-between overflow-y-auto font-sans">
      <div className="space-y-1">
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-3 py-2">
          Trip Navigation
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`group relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100/90 text-zinc-900 font-bold shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50/90'
                }`}
              >
                {/* Active Left Indicator Pill */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#0FA958] rounded-r-full" />
                )}

                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className={`transition-colors shrink-0 ${
                      isActive
                        ? 'text-[#0FA958]'
                        : 'text-zinc-400 group-hover:text-zinc-700'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`shrink-0 ml-2 px-2 py-0.5 rounded-md text-[10px] font-semibold ${item.badgeStyle}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Official Statute Trust Footer (with bottom clearance for browser badges) */}
      <div className="pt-4 pb-6 border-t border-zinc-100">
        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-[11px] text-zinc-600 space-y-1">
          <div className="font-bold text-zinc-800 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span>Verified Regulatory Standard</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            EU Reg 2026/131 · USDA APHIS · IATA Live Animals Regulations (LAR 50th Ed).
          </p>
        </div>
      </div>
    </aside>
  );
}
