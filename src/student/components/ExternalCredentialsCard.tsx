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
    <div className="flex min-h-90 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <InfoIcon />
      </span>
      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
        View & Share Only
      </h3>
      <p className="max-w-xs text-center text-sm leading-6 text-slate-400">
        External credentials from verified institutions appear here automatically.
      </p>
    </div>
  );
}
