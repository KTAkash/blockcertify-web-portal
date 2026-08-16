"use client";

import React, { useState } from 'react';
import CredentialViewerModal from './CredentialViewerModal';
import QRShareModal from './QRShareModal';

type CredentialCardProps = {
  title: string;
  issuer: string;
  issuedDate: string;
  refId: string;
  status: string;
  icon: React.ReactNode;
  studentName?: string;
  accessToken?: string;
};

function QRCodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14H17V17H14V14Z" stroke="currentColor" strokeWidth="2" />
      <path d="M18 18H21V21H18V18Z" stroke="currentColor" strokeWidth="2" />
      <path d="M18 14H21V17H18V14Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 18H17V21H14V18Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function CredentialCard({ title, issuer, issuedDate, refId, status, icon, studentName = 'Alex Johnson', accessToken = 'TK-VWFV9K' }: CredentialCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4DEF2] text-[#7C3AED]">
            {icon}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600 font-[family-name:var(--font-display)]">
            {status}
          </span>
        </div>

        <h3 className="mb-6 text-xl font-semibold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">{title}</h3>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-[#7A7290] font-[family-name:var(--font-display)]">Issuer</div>
            <div className="mt-1 text-sm font-medium text-[#1D1330] font-[family-name:var(--font-display)]">{issuer}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#7A7290] font-[family-name:var(--font-display)]">Issued</div>
            <div className="mt-1 text-sm font-medium text-[#1D1330] font-[family-name:var(--font-display)]">{issuedDate}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#7A7290] font-[family-name:var(--font-display)]">Ref ID</div>
            <div className="mt-1 text-sm font-medium text-[#1D1330] font-[family-name:var(--font-display)]">{refId}</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 rounded-[10px] bg-[#5B21B6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]"
          >
            View
          </button>
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#5B21B6] text-white shadow-sm transition-colors hover:bg-[#4C1D95]"
          >
            <QRCodeIcon />
          </button>
        </div>
      </div>

      <CredentialViewerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        credential={{
          title,
          issuer,
          issuedDate,
          refId,
          studentName,
        }}
      />

      <QRShareModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        accessToken={accessToken}
      />
    </>
  );
}
