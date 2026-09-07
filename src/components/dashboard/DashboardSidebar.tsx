'use client';

import React from 'react';

export type DashboardTab =
  | 'overview'
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
}

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  blockersCount,
  docsCount,
}: DashboardSidebarProps) {
  const navItems = [
    {
      id: 'overview' as DashboardTab,
      label: 'Overview',
      icon: '📊',
      badge: blockersCount > 0 ? `${blockersCount} Blockers` : undefined,
      badgeColor: blockersCount > 0 ? 'bg-red-100 text-red-800' : undefined,
    },
    {
      id: 'timeline' as DashboardTab,
      label: 'Timeline & Milestones',
      icon: '⏳',
    },
    {
      id: 'checklist' as DashboardTab,
      label: 'Regulatory Checklist',
      icon: '📋',
    },
    {
      id: 'vault' as DashboardTab,
      label: 'Document Vault',
      icon: '📁',
      badge: docsCount > 0 ? `${docsCount} files` : undefined,
      badgeColor: 'bg-zinc-100 text-zinc-700',
    },
    {
      id: 'vetsheet' as DashboardTab,
      label: 'Instructions for Vet',
      icon: '👨‍⚕️',
    },
    {
      id: 'crate' as DashboardTab,
      label: 'Airline & Crate Guide',
      icon: '✈️',
    },
    {
      id: 'concierge' as DashboardTab,
      label: 'Specialist Concierge',
      icon: '🛡️',
      badge: 'Expert',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-zinc-200 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] p-4 justify-between overflow-y-auto">
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-2">
          Trip Navigation
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Official Statute Trust Footer */}
      <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-[11px] text-zinc-500 space-y-1">
        <div className="font-bold text-zinc-800 flex items-center gap-1.5">
          <span>⚖️</span>
          <span>Verified Standard</span>
        </div>
        <p className="leading-relaxed">
          European Reg (EU) 2026/131, USDA APHIS, and IATA Live Animals Regulations (LAR).
        </p>
      </div>
    </aside>
  );
}
