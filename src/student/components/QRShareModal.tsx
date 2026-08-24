"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toDataURL } from 'qrcode';

type QRShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cid: string;
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

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3V15M12 15L7 10M12 15L17 10M5 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QRShareModal({ isOpen, onClose, cid }: QRShareModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isCurrent = true;

    toDataURL(cid, { width: 200, margin: 1, errorCorrectionLevel: 'M' })
      .then((url) => {
        if (isCurrent) setQrCodeUrl(url);
      })
      .catch((error) => {
        console.error('Failed to generate certificate QR code:', error);
        if (isCurrent) setQrError(true);
      });

    return () => {
      isCurrent = false;
    };
  }, [cid, isOpen]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'certificate-cid-qr.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleShare = async () => {
    if (!qrCodeUrl || !navigator.share) return;

    try {
      const imageBlob = await (await fetch(qrCodeUrl)).blob();
      const imageFile = new File([imageBlob], 'certificate-cid-qr.png', { type: 'image/png' });
      const shareData = {
        title: 'Certificate QR code',
        text: `Certificate CID: ${cid}`,
        files: [imageFile],
      };

      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.share({ title: shareData.title, text: shareData.text });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error('Failed to share certificate QR code:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-[#FAF9FC] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E4DEF2] px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4DEF2] text-[#7C3AED]">
              <ShareIcon />
            </span>
            <h2 className="text-lg font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Selective Disclosure</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7A7290] transition-colors hover:bg-[#E4DEF2] hover:text-[#1D1330]"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center p-8">
          {/* QR Code */}
          <div className="mb-6 rounded-2xl border-4 border-[#E4DEF2] bg-white p-4 text-[#1D1330]">
            {qrCodeUrl ? (
              <Image src={qrCodeUrl} alt="QR code for this certificate CID" width={200} height={200} unoptimized />
            ) : (
              <div className="flex h-[200px] w-[200px] items-center justify-center text-sm text-[#7A7290]">
                {qrError ? 'Unable to generate QR code' : 'Generating QR code...'}
              </div>
            )}
          </div>

          {/* Certificate CID Label */}
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
            Certificate CID
          </div>

          {/* Certificate CID */}
          <div className="mb-6 w-full rounded-2xl bg-[#E4DEF2] px-6 py-3">
            <div className="break-all text-center text-sm font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
              {cid}
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!qrCodeUrl}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#5B21B6] px-4 py-3 text-sm font-semibold text-[#5B21B6] transition-colors hover:bg-[#EDE9FE] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <DownloadIcon />
              Download
            </button>
            <button
              type="button"
              onClick={handleShare}
              disabled={!qrCodeUrl || typeof navigator === 'undefined' || !navigator.share}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#5B21B6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShareIcon />
              Share
            </button>
          </div>

          {/* Description */}
          <div className="mt-6 text-center text-sm text-[#7A7290]">
            Scan to retrieve this certificate&apos;s CID.
          </div>
        </div>
      </div>
    </div>
  );
}
