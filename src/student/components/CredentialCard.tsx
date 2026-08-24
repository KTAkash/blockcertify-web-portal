"use client";

import React, { useState } from 'react';
import CredentialViewerModal from './CredentialViewerModal';
import QRShareModal from './QRShareModal';
import { apiClient } from '@/src/apiHelper/api';

type CredentialCardProps = {
  title: string;
  issuer: string;
  issuedDate: string;
  refId: string;
  status: string;
  icon: React.ReactNode;
  studentName?: string;
  cid: string;
  hash: string;
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

export default function CredentialCard({ title, issuer, issuedDate, refId, status, icon, studentName = 'Alex Johnson', cid, hash }: CredentialCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewMimeType, setPreviewMimeType] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const handlePreview = async () => {
    try {
      setIsPreviewLoading(true);
      setPreviewError(null);
      const previewBlob = await apiClient.previewFile(cid, hash);
      const objectUrl = URL.createObjectURL(previewBlob);

      setPreviewUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return objectUrl;
      });
      setPreviewMimeType(previewBlob.type);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to preview certificate:', error);
      setPreviewError('Unable to load this certificate preview.');
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleClosePreview = () => {
    setIsModalOpen(false);
    setPreviewUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return null;
    });
    setPreviewMimeType(null);
  };

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
            type="button"
            onClick={handlePreview}
            disabled={isPreviewLoading}
            className="flex-1 rounded-[10px] bg-[#5B21B6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4C1D95] disabled:cursor-not-allowed disabled:opacity-60 font-[family-name:var(--font-display)]"
          >
            {isPreviewLoading ? 'Loading...' : 'View'}
          </button>
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#5B21B6] text-white shadow-sm transition-colors hover:bg-[#4C1D95]"
          >
            <QRCodeIcon />
          </button>
        </div>
        {previewError && <p className="mt-3 text-sm text-rose-600">{previewError}</p>}
      </div>

      <CredentialViewerModal
        isOpen={isModalOpen}
        onClose={handleClosePreview}
        previewUrl={previewUrl}
        previewMimeType={previewMimeType}
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
        cid={cid}
      />
    </>
  );
}
