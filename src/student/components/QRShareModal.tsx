"use client";

import React from 'react';

type QRShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string;
};

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 12V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12V16C4 18.8284 4 20.2426 4.87868 21.1213C5.75736 22 7.17157 22 10 22H14C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 7L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 17L15 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
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

function QRCodePlaceholder() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="10" width="50" height="50" fill="currentColor" />
      <rect x="140" y="10" width="50" height="50" fill="currentColor" />
      <rect x="10" y="140" width="50" height="50" fill="currentColor" />
      <rect x="70" y="10" width="20" height="20" fill="currentColor" />
      <rect x="110" y="10" width="20" height="20" fill="currentColor" />
      <rect x="70" y="40" width="20" height="20" fill="currentColor" />
      <rect x="110" y="40" width="20" height="20" fill="currentColor" />
      <rect x="70" y="70" width="20" height="20" fill="currentColor" />
      <rect x="110" y="70" width="20" height="20" fill="currentColor" />
      <rect x="70" y="100" width="20" height="20" fill="currentColor" />
      <rect x="110" y="100" width="20" height="20" fill="currentColor" />
      <rect x="70" y="130" width="20" height="20" fill="currentColor" />
      <rect x="110" y="130" width="20" height="20" fill="currentColor" />
      <rect x="70" y="160" width="20" height="20" fill="currentColor" />
      <rect x="110" y="160" width="20" height="20" fill="currentColor" />
      <rect x="140" y="70" width="20" height="20" fill="currentColor" />
      <rect x="170" y="70" width="20" height="20" fill="currentColor" />
      <rect x="140" y="100" width="20" height="20" fill="currentColor" />
      <rect x="170" y="100" width="20" height="20" fill="currentColor" />
      <rect x="140" y="130" width="20" height="20" fill="currentColor" />
      <rect x="170" y="130" width="20" height="20" fill="currentColor" />
      <rect x="140" y="160" width="20" height="20" fill="currentColor" />
      <rect x="170" y="160" width="20" height="20" fill="currentColor" />
      <rect x="10" y="70" width="20" height="20" fill="currentColor" />
      <rect x="40" y="70" width="20" height="20" fill="currentColor" />
      <rect x="10" y="100" width="20" height="20" fill="currentColor" />
      <rect x="40" y="100" width="20" height="20" fill="currentColor" />
      <rect x="10" y="130" width="20" height="20" fill="currentColor" />
      <rect x="40" y="130" width="20" height="20" fill="currentColor" />
    </svg>
  );
}

export default function QRShareModal({ isOpen, onClose, accessToken }: QRShareModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShareIcon />
            </span>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">Selective Disclosure</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center p-8">
          {/* QR Code */}
          <div className="mb-6 rounded-2xl border-4 border-amber-200 bg-white p-4">
            <div className="text-slate-900">
              <QRCodePlaceholder />
            </div>
          </div>

          {/* Access Token Label */}
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Access Token
          </div>

          {/* Access Token */}
          <div className="mb-6 rounded-2xl bg-slate-100 px-6 py-3">
            <div className="text-2xl font-black tracking-tight text-slate-900">
              {accessToken}
            </div>
          </div>

          {/* Description */}
          <div className="text-center text-sm text-slate-500">
            Contains Access Token + CID (Selective Disclosure)
          </div>
        </div>
      </div>
    </div>
  );
}
