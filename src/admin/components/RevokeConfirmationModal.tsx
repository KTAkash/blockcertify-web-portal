'use client';

import { useState } from 'react';

type RevokeConfirmationModalProps = {
  isOpen: boolean;
  studentName: string;
  certificateTitle: string;
  currentStatus: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

export default function RevokeConfirmationModal({
  isOpen,
  studentName,
  certificateTitle,
  currentStatus,
  onCancel,
  onConfirm,
  isLoading,
}: RevokeConfirmationModalProps) {
  const [typedName, setTypedName] = useState('');
  const isRevoke = currentStatus === 'ISSUED';
  const actionText = isRevoke ? 'REVOKED' : 'ISSUED';
  const actionDescription = isRevoke ? 'revoke' : 'restore';

  const isConfirmEnabled = typedName.trim() === studentName.trim();

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm();
      setTypedName('');
    }
  };

  const handleClose = () => {
    setTypedName('');
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_30px_60px_rgba(30,14,66,0.35)]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
            {actionText} Certificate
          </h2>
          <p className="mt-2 text-sm text-[#7A7290]">
            Are you sure you want to {actionDescription} this certificate?
          </p>
        </div>

        <div className="mb-6 rounded-[12px] border border-[#E4DEF2] bg-white p-4">
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290]">Certificate</p>
            <p className="mt-1 text-sm font-medium text-[#1D1330]">{certificateTitle}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290]">Student</p>
            <p className="mt-1 text-sm font-medium text-[#1D1330]">{studentName}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">
            Type student name to confirm
          </label>
          <input
            type="text"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder={studentName}
            className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#FAF9FC] px-4 py-3 text-sm text-[#1D1330] placeholder:text-[#7A7290] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] font-[family-name:var(--font-body)]"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 rounded-[10px] border border-[#E4DEF2] bg-white px-4 py-3 text-sm font-semibold text-[#7A7290] transition-colors hover:bg-[#E4DEF2] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmEnabled || isLoading}
            className={`flex-1 rounded-[10px] px-4 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)] ${
              isRevoke
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#5B21B6] hover:bg-[#4C1D95]'
            }`}
          >
            {isLoading ? 'Processing...' : actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
