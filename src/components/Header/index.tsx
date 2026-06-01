
type HeaderProps = {
  title: string;
  subtitle?: string;
  statusLabel: string;
};

function ShieldLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header({ title, subtitle, statusLabel }: HeaderProps) {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
            <ShieldLogo />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {title}
            </div>
            {subtitle ? (
              <div className="text-sm text-slate-500">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          {statusLabel}
        </div>
      </div>
    </header>
  );
}