"use client";

import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RegisterUniversityRequest } from '@/src/interfaces/auth';

type AddInstitutionModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onRegister: (payload: RegisterUniversityRequest) => void;
};

function InstitutionIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 20V8H10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20V4H18V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8H15M13 12H15M13 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function AddInstitutionModal({ isOpen, onCancel, onRegister }: AddInstitutionModalProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mspId, setMspId] = useState('');
  const [certPem, setCertPem] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [peerEndpoint, setPeerEndpoint] = useState('');
  const [peerTlsCertPem, setPeerTlsCertPem] = useState('');
  const [peerHostnameOverride, setPeerHostnameOverride] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setName('');
        setUsername('');
        setPassword('');
        setMspId('');
        setCertPem('');
        setPrivateKey('');
        setPeerEndpoint('');
        setPeerTlsCertPem('');
        setPeerHostnameOverride('');
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onCancel]);

  if (!isMounted || !isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedMspId = mspId.trim();
    const trimmedCertPem = certPem.trim();
    const trimmedPrivateKey = privateKey.trim();
    const trimmedPeerEndpoint = peerEndpoint.trim();
    const trimmedPeerTlsCertPem = peerTlsCertPem.trim();
    const trimmedPeerHostnameOverride = peerHostnameOverride.trim();

    if (
      !trimmedName ||
      !trimmedUsername ||
      !trimmedPassword ||
      !trimmedMspId ||
      !trimmedCertPem ||
      !trimmedPrivateKey ||
      !trimmedPeerEndpoint ||
      !trimmedPeerTlsCertPem ||
      !trimmedPeerHostnameOverride
    ) {
      return;
    }

    onRegister({
      name: trimmedName,
      username: trimmedUsername,
      password: trimmedPassword,
      mspId: trimmedMspId,
      certPem: trimmedCertPem,
      privateKey: trimmedPrivateKey,
      peerEndpoint: trimmedPeerEndpoint,
      peerTlsCertPem: trimmedPeerTlsCertPem,
      peerHostnameOverride: trimmedPeerHostnameOverride,
    });

    setName('');
    setUsername('');
    setPassword('');
    setMspId('');
    setCertPem('');
    setPrivateKey('');
    setPeerEndpoint('');
    setPeerTlsCertPem('');
    setPeerHostnameOverride('');
  };

  const handleCancel = () => {
    setName('');
    setUsername('');
    setPassword('');
    setMspId('');
    setCertPem('');
    setPrivateKey('');
    setPeerEndpoint('');
    setPeerTlsCertPem('');
    setPeerHostnameOverride('');
    onCancel();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 px-6 py-10 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={handleCancel}
    >
      <div
        className="w-full max-w-5xl my-auto max-h-[85vh] flex flex-col rounded-[28px] bg-[#FAF9FC] p-7 sm:p-9 shadow-[0_30px_80px_rgba(29,19,48,0.35)] relative"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close X button */}
        <button
          type="button"
          onClick={handleCancel}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-rose-500 transition-colors hover:bg-rose-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-6 shrink-0">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E4DEF2] text-[#7C3AED]">
            <InstitutionIcon />
          </span>
          <div>
            <h2 className="text-[26px] leading-tight font-black tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
              Onboard Institution
            </h2>
            <p className="mt-1 text-sm text-[#7A7290]">
              Register new university credentials onto the consortium ledger.
            </p>
          </div>
        </div>

        <form className="flex flex-col flex-1 min-h-0" onSubmit={handleSubmit}>
          <div
            className="space-y-6 overflow-y-auto flex-1 pr-3 -mr-3
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#D6CFEA]
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:hover:bg-[#C0B6E0]"
          >
            {/* Row 1 - all short fields together */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Institution Name
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Oxford Academic"
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-base font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Username
                </span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="e.g. admin"
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-base font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-base font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  MSP ID
                </span>
                <input
                  value={mspId}
                  onChange={(event) => setMspId(event.target.value)}
                  placeholder="e.g. OxfordMSP"
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-base font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Peer Endpoint
                </span>
                <input
                  value={peerEndpoint}
                  onChange={(event) => setPeerEndpoint(event.target.value)}
                  placeholder="e.g. peer0.oxford.ac.uk:7051"
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-base font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Peer Hostname Override
                </span>
                <input
                  value={peerHostnameOverride}
                  onChange={(event) => setPeerHostnameOverride(event.target.value)}
                  placeholder="e.g. peer0.oxford.ac.uk"
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-base font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)]"
                />
              </label>
            </div>

            {/* Row 2 - the three PEM blocks side by side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Cert PEM
                </span>
                <textarea
                  value={certPem}
                  onChange={(event) => setCertPem(event.target.value)}
                  placeholder="-----BEGIN CERTIFICATE----- ..."
                  rows={6}
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)] resize-vertical"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Private Key
                </span>
                <textarea
                  value={privateKey}
                  onChange={(event) => setPrivateKey(event.target.value)}
                  placeholder="-----BEGIN PRIVATE KEY----- ..."
                  rows={6}
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)] resize-vertical"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  Peer TLS Cert PEM
                </span>
                <textarea
                  value={peerTlsCertPem}
                  onChange={(event) => setPeerTlsCertPem(event.target.value)}
                  placeholder="-----BEGIN CERTIFICATE----- ..."
                  rows={6}
                  className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm font-semibold text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED] font-[family-name:var(--font-display)] resize-vertical"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-5 shrink-0">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-12 items-center justify-center rounded-2xl px-7 text-sm font-bold uppercase tracking-[0.14em] text-[#7A7290] transition-colors hover:bg-[#E4DEF2] font-[family-name:var(--font-display)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-[10px] bg-[#5B21B6] px-8 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(91,33,182,0.25)] transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]"
            >
              Register Node
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}