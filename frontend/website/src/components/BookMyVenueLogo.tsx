type BookMyVenueLogoProps = {
  consoleLabel: string;
  subtitle: string;
};

export default function BookMyVenueLogo({ consoleLabel, subtitle }: BookMyVenueLogoProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="bmv-brand-mark flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
        <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 42 42">
          <path d="M8 31V17.5C8 13.8 9.8 11 12.8 9L21 3.8L29.4 9.4" stroke="#086C6C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
          <path d="M16 31V19.4C16 15.7 18.6 13.2 22.2 13.2C25.5 13.2 27.8 15 29.3 18" stroke="#086C6C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
          <path d="M20 21.2C24.6 22.2 27.7 26 29.1 32.2C31.8 23.9 35 17.5 39 11.6" stroke="#086C6C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        </svg>
      </div>

      <div className="min-w-0">
        <p className="text-lg font-semibold leading-tight text-[#086C6C] sm:text-xl">
          Book My <span className="font-bold">Venue</span>
        </p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#7A6050]">
          {consoleLabel} · {subtitle}
        </p>
      </div>
    </div>
  );
}
