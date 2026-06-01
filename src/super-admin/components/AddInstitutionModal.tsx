"use client";

import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type AddInstitutionModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onRegister: (payload: { name: string; location: string }) => void;
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
  const [location, setLocation] = useState('');
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
        setLocation('');
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
    const trimmedLocation = location.trim();

    if (!trimmedName || !trimmedLocation) {
      return;
    }

    onRegister({ name: trimmedName, location: trimmedLocation });
    setName('');
    setLocation('');
  };

  const handleCancel = () => {
    setName('');
    setLocation('');
    onCancel();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={handleCancel}
    >
      <div
        className="w-full max-w-125 rounded-4xl bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex justify-center">
          <span className="flex h-18 w-18 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
            <InstitutionIcon />
          </span>
        </div>

        <div className="text-center">
          <h2 className="text-[42px] font-black tracking-tight text-slate-900">Onboard Institution</h2>
          <p className="mt-2 text-sm text-slate-400">
            Register new university credentials onto the consortium ledger.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Institution Name
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Oxford Academic"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg font-semibold text-slate-700 outline-none transition-colors focus:border-blue-300"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Location
            </span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Oxford, UK"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg font-semibold text-slate-700 outline-none transition-colors focus:border-blue-300"
            />
          </label>

          <div className="flex items-center justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-14 items-center justify-center rounded-2xl px-7 text-sm font-bold uppercase tracking-[0.14em] text-slate-500 transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-blue-400 px-8 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(59,130,246,0.25)] transition-colors hover:bg-blue-500"
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
