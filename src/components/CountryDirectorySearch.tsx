'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DestinationCountryIntelligence } from '@/lib/data/countries';

interface CountryDirectorySearchProps {
  countries: DestinationCountryIntelligence[];
}

export default function CountryDirectorySearch({ countries }: CountryDirectorySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedTiter, setSelectedTiter] = useState<string>('ALL');

  // Extract unique regions
  const regions = useMemo(() => {
    const list = new Set<string>();
    countries.forEach((c) => {
      const mainRegion = c.region.split('/')[0].trim();
      list.add(mainRegion);
    });
    return Array.from(list);
  }, [countries]);

  // Filtered countries
  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.headline.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === 'ALL' || c.region.toLowerCase().includes(selectedRegion.toLowerCase());

      const matchesTiter =
        selectedTiter === 'ALL' || c.titerStatus === selectedTiter;

      return matchesSearch && matchesRegion && matchesTiter;
    });
  }, [countries, searchTerm, selectedRegion, selectedTiter]);

  return (
    <div>
      {/* ─── SEARCH & FILTER CONTROLS ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search destination country, ISO code, or authority (e.g. Germany, UK, USDA, BMEL)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Dropdown */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="ALL">All Regions ({countries.length})</option>
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>

            {/* Rabies Filter */}
            <select
              value={selectedTiter}
              onChange={(e) => setSelectedTiter(e.target.value)}
              className="px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="ALL">All Rabies Rules</option>
              <option value="exempt">Titer Exempt (Controlled Origins)</option>
              <option value="conditional">Conditional / Origin-Specific</option>
              <option value="mandatory">Mandatory RNATT Blood Titer</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Pill Summary */}
        <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 flex-wrap gap-2">
          <span>
            Showing <strong className="font-bold text-zinc-900">{filteredCountries.length}</strong> of{' '}
            <strong className="font-bold text-zinc-900">{countries.length}</strong> destination countries
          </span>
          {(searchTerm || selectedRegion !== 'ALL' || selectedTiter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRegion('ALL');
                setSelectedTiter('ALL');
              }}
              className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer text-xs"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* ─── COUNTRIES GRID ─────────────────────────────────────────────── */}
      {filteredCountries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
            🔍
          </div>
          <h3 className="text-base font-bold text-zinc-900 mb-1">No destination countries match your criteria</h3>
          <p className="text-xs text-zinc-500 mb-4">Try searching for a different country or clear active filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRegion('ALL');
              setSelectedTiter('ALL');
            }}
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCountries.map((country) => {
            const titerBadgeColor =
              country.titerStatus === 'exempt'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                : country.titerStatus === 'mandatory'
                ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                : 'bg-blue-50 text-blue-800 border-blue-200/80';

            return (
              <Link
                key={country.slug}
                href={`/en/countries/${country.slug}`}
                className="group bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-500/60 p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Flag & ISO Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-200/80 text-xs font-semibold text-zinc-700">
                      <span className="text-xl leading-none">{country.flag}</span>
                      <span className="font-mono font-bold text-zinc-900">{country.code}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${titerBadgeColor}`}>
                      {country.titerStatus === 'exempt'
                        ? 'Titer Exempt'
                        : country.titerStatus === 'mandatory'
                        ? 'RNATT Titer Required'
                        : 'Conditional Titer'}
                    </span>
                  </div>

                  {/* Title & Region */}
                  <h3 className="font-serif text-lg font-bold text-zinc-900 group-hover:text-[#0E2342] transition-colors mb-0.5">
                    {country.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-3 line-clamp-1">
                    {country.region}
                  </p>

                  {/* Headline snippet */}
                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                    {country.headline}
                  </p>

                  {/* Fast Specs Matrix */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-100 text-left mb-4">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Quarantine</span>
                      <strong className="text-xs font-bold text-zinc-900 block truncate">
                        {country.quarantineDays}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Min Lead Time</span>
                      <strong className="text-xs font-bold text-zinc-900 block truncate">
                        {country.leadTime}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Authority</span>
                      <strong className="text-xs font-bold text-zinc-900 block truncate">
                        {country.authority.split('(')[1]?.replace(')', '') || country.code}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-zinc-700 group-hover:text-emerald-700 transition-colors">
                  <span>
                    {country.inboundCorridors.length > 0
                      ? `${country.inboundCorridors.length} Verified Flight Routes`
                      : 'View Statutory Guide'}
                  </span>
                  <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
