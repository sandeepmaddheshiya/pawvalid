'use client';

import React from 'react';
import type { DashboardTab } from './DashboardSidebar';

interface DashboardMobileNavProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
}

export default function DashboardMobileNav({
  activeTab,
  onSelectTab,
}: DashboardMobileNavProps) {
  const items: Array<{ id: DashboardTab; label: string; icon: string }> = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'timeline', label: 'Timeline', icon: '⏳' },
    { id: 'checklist', label: 'Checklist', icon: '📋' },
    { id: 'vault', label: 'Vault', icon: '📁' },
    { id: 'vetsheet', label: 'Vet Sheet', icon: '👨‍⚕️' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 py-1.5 px-2 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors cursor-pointer ${
              isActive ? 'text-emerald-700 font-bold' : 'text-zinc-500'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
