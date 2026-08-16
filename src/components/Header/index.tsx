
type HeaderProps = {
  title: string;
  subtitle?: string;
  statusLabel: string;
  onToggleSidebar: () => void;
};

function ShieldLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header({ title, subtitle, statusLabel, onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-transparent backdrop-blur-sm border-b border-[#E4DEF2]/50">
      <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-foreground transition-colors hover:bg-surface-soft"
          >
            <HamburgerIcon />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-accent shadow-sm">
            <ShieldLogo />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground font-[family-name:var(--font-display)]">
              {title}
            </div>
            {subtitle ? (
              <div className="text-sm text-muted">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-accent font-[family-name:var(--font-display)] border border-surface-soft">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          {statusLabel}
        </div>
      </div>
    </header>
  );
}