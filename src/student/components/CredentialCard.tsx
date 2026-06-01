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
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            {icon}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
            {status}
          </span>
        </div>

        <h3 className="mb-6 text-xl font-semibold tracking-tight text-slate-900">{title}</h3>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-slate-500">Issuer</div>
            <div className="mt-1 text-sm font-medium text-slate-700">{issuer}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Issued</div>
            <div className="mt-1 text-sm font-medium text-slate-700">{issuedDate}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Ref ID</div>
            <div className="mt-1 text-sm font-medium text-slate-700">{refId}</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            View
          </button>
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700"
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
