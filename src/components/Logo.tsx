import Link from 'next/link';

export default function Logo({ size = 'default' }: { size?: 'small' | 'default' }) {
  const isSmall = size === 'small';

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
      {/* Brand Paw Badge */}
      <div
        className={`${
          isSmall ? 'w-8 h-8' : 'w-10 h-10'
        } rounded-xl bg-[#e6f7f0] border border-[#a8e8cc] flex items-center justify-center text-[#10b981] group-hover:scale-105 transition-transform shadow-xs shrink-0`}
      >
        <svg
          className={isSmall ? 'w-5 h-5' : 'w-6 h-6'}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Main paw pad */}
          <path d="M12 11c-2.4 0-4 1.8-4 3.5 0 2.2 2 3.5 4 3.5s4-1.3 4-3.5C16 12.8 14.4 11 12 11z" />
          {/* Left bottom toe */}
          <ellipse cx="6.5" cy="11.5" rx="1.8" ry="2.2" />
          {/* Left top toe */}
          <ellipse cx="9.2" cy="7" rx="1.8" ry="2.2" />
          {/* Right top toe */}
          <ellipse cx="14.8" cy="7" rx="1.8" ry="2.2" />
          {/* Right bottom toe */}
          <ellipse cx="17.5" cy="11.5" rx="1.8" ry="2.2" />
        </svg>
      </div>

      {/* Brand text */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-display ${
            isSmall ? 'text-lg' : 'text-xl'
          } font-black text-[#0f172a] tracking-tight`}
        >
          PetTravel
        </span>
        <span
          className={`font-sans ${
            isSmall ? 'text-[11px]' : 'text-xs'
          } font-bold text-[#10b981] tracking-wide`}
        >
          Compliance
        </span>
      </div>
    </Link>
  );
}
