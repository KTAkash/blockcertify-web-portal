"use client";

import Image from 'next/image';

type CredentialViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  previewUrl: string | null;
  previewMimeType: string | null;
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

export default function CredentialViewerModal({ isOpen, onClose, previewUrl, previewMimeType, credential }: CredentialViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex h-[90vh] w-full max-w-7xl overflow-hidden rounded-3xl shadow-2xl">
        {/* Left Section - Dark Background */}
        <div className="flex w-full flex-col justify-between bg-[#120B24] p-8 lg:w-1/4">
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
        <div className="flex min-w-0 flex-1 flex-col bg-[#FAF9FC]">
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

          {/* Certificate Preview */}
          <div className="min-h-0 flex-1 p-4">
            {previewUrl ? (
              previewMimeType?.startsWith('image/') ? (
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#E4DEF2] bg-white">
                  <Image src={previewUrl} alt={`${credential.title} preview`} fill unoptimized className="object-contain" />
                </div>
              ) : (
                <iframe src={`${previewUrl}#view=FitH`} className="h-full w-full rounded-xl border border-[#E4DEF2] bg-white" title={`${credential.title} preview`} />
              )
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border border-[#E4DEF2] bg-white p-6 text-center text-sm text-[#7A7290]">
                Certificate preview is unavailable.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
