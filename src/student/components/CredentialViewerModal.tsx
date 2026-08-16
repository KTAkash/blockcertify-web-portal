"use client";


type CredentialViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  credential: {
    title: string;
    issuer: string;
    issuedDate: string;
    refId: string;
    studentName: string;
  };
};

function ShieldCheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BuildingGradCapIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3L2 7L12 11L22 7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17L12 21L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L12 16L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 8V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 8V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CredentialViewerModal({ isOpen, onClose, credential }: CredentialViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex h-full max-h-175 w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
        {/* Left Section - Dark Background */}
        <div className="flex w-full flex-col justify-between bg-[#120B24] p-8 lg:w-2/5">
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED]/20 text-[#9F75F2]">
              <ShieldCheckIcon />
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
              Immutable Cryptographic Record
            </h2>
            <p className="text-sm leading-relaxed text-[#D9CCF7]">
              This document is secured using a hybrid storage model. The certificate binary is stored on IPFS, while the hash and audit trail are anchored to Hyperledger Fabric.
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-transparent px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 font-[family-name:var(--font-display)]"
          >
            <CloseIcon />
            Close Viewer
          </button>
        </div>

        {/* Right Section - White Background */}
        <div className="flex w-full flex-col bg-[#FAF9FC] lg:w-3/5">
          {/* Purple Header Bar */}
          <div className="flex items-center gap-3 bg-[#5B21B6] px-8 py-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
              <BuildingGradCapIcon />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-display)]">Official Certificate of Graduation</h3>
              <p className="text-sm text-[#D9CCF7]">{credential.issuer}</p>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="space-y-8">
              <div className="text-center">
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  This is to certify that
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
                  {credential.studentName}
                </h2>
              </div>

              <div className="rounded-2xl border border-[#E4DEF2] bg-[#E4DEF2] p-6">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Degree Awarded
                </div>
                <div className="text-xl font-bold text-[#1D1330] font-[family-name:var(--font-display)]">{credential.title}</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#E4DEF2] bg-[#E4DEF2] p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
                    Issuing Institution
                  </div>
                  <div className="font-medium text-[#1D1330] font-[family-name:var(--font-display)]">{credential.issuer}</div>
                </div>
                <div className="rounded-2xl border border-[#E4DEF2] bg-[#E4DEF2] p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
                    Date of Issue
                  </div>
                  <div className="font-medium text-[#1D1330] font-[family-name:var(--font-display)]">{credential.issuedDate}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DEF2] bg-[#E4DEF2] p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Reference ID
                </div>
                <div className="font-mono text-sm font-medium text-[#1D1330]">{credential.refId}</div>
              </div>

              <div className="rounded-2xl border border-[#E4DEF2] bg-[#E4DEF2] p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Blockchain Verification
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-[#1D1330] font-[family-name:var(--font-display)]">Verified on Hyperledger Fabric</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
