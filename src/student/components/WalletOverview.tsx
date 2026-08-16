import CredentialCard from './CredentialCard';
import ExternalCredentialsCard from './ExternalCredentialsCard';

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WalletOverview() {
  return (
    <section className="space-y-6" id="overview">
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Digital wallet</h2>
            <p className="mt-1 text-sm text-[#7A7290]">
              Multi-institution credential vault
            </p>
          </div>
          <button className="rounded-full bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]">
            SSI protected
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CredentialCard
          title="Bachelor of Computer Science"
          issuer="Tech University"
          issuedDate="2024-03-15"
          refId="#001"
          status="Active"
          icon={<ShieldIcon />}
        />
        <ExternalCredentialsCard />
      </div>
    </section>
  );
}
