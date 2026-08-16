function InfoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ExternalCredentialsCard() {
  return (
    <div className="flex min-h-90 flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#E4DEF2] bg-[#E4DEF2]/50 p-6">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E4DEF2] text-[#7C3AED]">
        <InfoIcon />
      </span>
      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
        View & Share Only
      </h3>
      <p className="max-w-xs text-center text-sm leading-6 text-[#7A7290]">
        External credentials from verified institutions appear here automatically.
      </p>
    </div>
  );
}
