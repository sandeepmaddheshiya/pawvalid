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
      case 'LEAVING': return '🛫 Leaving (Export)';
      case 'TRANSIT': return '🔀 Transit';
      case 'ARRIVING': return '🛬 Arriving (Import)';
      case 'LOGISTICS': return '📦 Airline Logistics';
      default: return scope;
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
              Multi-Jurisdictional Statute Registry
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
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 pb-4">
          {(['ALL', 'LEAVING', 'TRANSIT', 'ARRIVING', 'LOGISTICS'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterScope(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterScope === s
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
              }`}
            >
              {s === 'ALL' ? `All Rules (${items.length})` : getScopeBadge(s)}
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
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700">
                    {getScopeBadge(item.scope)}
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
