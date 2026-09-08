'use client';

import React, { useState } from 'react';

interface ChecklistViewProps {
  trip: any;
}

export default function ChecklistView({ trip }: ChecklistViewProps) {
  const [filterScope, setFilterScope] = useState<'ALL' | 'LEAVING' | 'TRANSIT' | 'ARRIVING' | 'LOGISTICS'>('ALL');

  const compliance = trip?.complianceChecklist || {};
  let items: any[] = [];
  if (Array.isArray(compliance)) {
    items = compliance;
  } else if (compliance?.all && Array.isArray(compliance.all)) {
    items = compliance.all;
  }

  const filteredItems = items.filter((item) => {
    if (filterScope === 'ALL') return true;
    return item.scope === filterScope;
  });

  const getScopeBadge = (scope: string) => {
    switch (scope) {
      case 'LEAVING': return 'Export (Origin)';
      case 'TRANSIT': return 'Transit & Layover';
      case 'ARRIVING': return 'Import (Destination)';
      case 'LOGISTICS': return 'Airline & Logistics';
      default: return scope;
    }
  };

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'LEAVING':
        return (
          <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'TRANSIT':
        return (
          <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case 'ARRIVING':
        return (
          <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case 'LOGISTICS':
        return (
          <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    if (status === 'CRITICAL_BLOCKER') return 'bg-red-100 text-red-800 border-red-200';
    if (status === 'REQUIRED_ACTION') return 'bg-amber-100 text-amber-900 border-amber-200';
    if (status === 'SATISFIED' || status === 'COMPLETED') return 'bg-emerald-100 text-emerald-900 border-emerald-200';
    return 'bg-blue-100 text-blue-900 border-blue-200';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Scope Filter Pills */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5 mb-5">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Audited Border Regulations
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-black text-zinc-900 mt-1">
              Regulatory Compliance Checklist
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Every mandate backed by primary government legislation (*Reg 2026/131, USDA APHIS, DAFF, IATA*).
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'LEAVING', 'TRANSIT', 'ARRIVING', 'LOGISTICS'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterScope(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                filterScope === s
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
              }`}
            >
              {s === 'ALL' ? (
                <span>All Rules ({items.length})</span>
              ) : (
                <>
                  {getScopeIcon(s)}
                  <span>{getScopeBadge(s)}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Cards List */}
      <div className="space-y-3">
        {filteredItems.map((item: any, idx: number) => (
          <div
            key={item.ruleId || `rule-${idx}`}
            className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 inline-flex items-center gap-1.5">
                    {getScopeIcon(item.scope)}
                    <span>{getScopeBadge(item.scope)}</span>
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeStyle(item.status)}`}>
                    {item.statusBadge || item.status}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-zinc-900 pt-1">
                  {item.name}
                </h4>
              </div>

              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:underline shrink-0 flex items-center gap-1"
                >
                  <span>Official citation</span>
                  <span>↗</span>
                </a>
              )}
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
              {item.whatToDo}
            </p>
            {item.details && (
              <p className="text-xs text-zinc-500 leading-relaxed">
                {item.details}
              </p>
            )}

            {/* Official Authority Provenance Strip */}
            <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500 font-medium">
              <span>Authority: <strong>{item.authority}</strong></span>
              {item.sourceTitle && (
                <>
                  <span>·</span>
                  <span className="italic">{item.sourceTitle}</span>
                </>
              )}
              {item.ruleVersion && (
                <>
                  <span>·</span>
                  <span>Rule: {item.ruleVersion}</span>
                </>
              )}
              {item.verifiedAt && (
                <>
                  <span>·</span>
                  <span>Verified: {item.verifiedAt}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
