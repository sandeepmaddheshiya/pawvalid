import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Travel Routes — Petvia',
  description: 'Browse all supported pet travel routes with verified, sourced regulatory requirements.',
};

const ROUTES = [
  { slug: 'usa-to-germany', from: '🇺🇸 USA', to: '🇩🇪 Germany', reqCount: '~12' },
  { slug: 'usa-to-uk', from: '🇺🇸 USA', to: '🇬🇧 United Kingdom', reqCount: '~15' },
  { slug: 'usa-to-australia', from: '🇺🇸 USA', to: '🇦🇺 Australia', reqCount: '~20' },
  { slug: 'usa-to-canada', from: '🇺🇸 USA', to: '🇨🇦 Canada', reqCount: '~8' },
  { slug: 'usa-to-japan', from: '🇺🇸 USA', to: '🇯🇵 Japan', reqCount: '~18' },
];

export default function PetTravelIndexPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-white dark:bg-surface-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="section-container py-12">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-3">
            Pet Travel Routes
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Each route is backed by verified, sourced regulatory data.
          </p>
        </div>
      </section>

      <div className="section-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROUTES.map((route) => (
            <Link
              key={route.slug}
              href={`/en/pet-travel/${route.slug}`}
              className="card p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{route.from.split(' ')[0]}</span>
                <svg className="w-4 h-4 text-zinc-400 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <span className="text-2xl">{route.to.split(' ')[0]}</span>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {route.from.split(' ').slice(1).join(' ')} → {route.to.split(' ').slice(1).join(' ')}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-zinc-400">{route.reqCount} requirements</span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
