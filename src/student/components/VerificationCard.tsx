"use client";

import { useState } from 'react';

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type VerificationCardProps = {
  onVerify: (certificateId: string) => void;
};

export default function VerificationCard({ onVerify }: VerificationCardProps) {
  const [certificateId, setCertificateId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setIsVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      onVerify(certificateId);
      setCertificateId('');
      setIsVerifying(false);
    }, 1000);
  };

  return (
    <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E4DEF2] text-[#7C3AED]">
          <SearchIcon />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">Verify certificate</h3>
          <p className="text-sm text-[#7A7290]">Enter certificate ID to verify authenticity</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1D1330] font-[family-name:var(--font-display)]">
            Certificate ID
          </label>
          <input
            type="text"
            placeholder="Enter certificate ID (e.g., CERT-001)"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full rounded-xl border border-[#E4DEF2] px-4 py-3 text-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 transition-colors"
            disabled={isVerifying}
          />
        </div>

        <button
          type="submit"
          disabled={isVerifying || !certificateId.trim()}
          className="w-full rounded-xl bg-[#5B21B6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95] disabled:cursor-not-allowed disabled:opacity-70 font-[family-name:var(--font-display)]"
        >
          {isVerifying ? 'Verifying...' : 'Verify Certificate'}
        </button>
      </form>

      <div className="mt-6 rounded-xl bg-[#E4DEF2] p-4">
        <p className="text-xs text-[#7A7290]">
          <span className="font-semibold text-[#7C3AED]">Tip:</span> Certificate IDs are typically formatted like CERT-XXX or can be found on the physical certificate document.
        </p>
      </div>
    </div>
  );
}