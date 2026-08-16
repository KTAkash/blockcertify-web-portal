"use client";

import jsQR from 'jsqr';
import { useEffect, useRef, useState } from 'react';

function QRScanIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VerifierPortal() {
  const [token, setToken] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [isCameraSupported, setIsCameraSupported] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!scanning) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!video || !canvas || !context) {
      setError('Scanner is not ready.');
      setScanning(false);
      return;
    }

    const stopStream = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };

    const scanFrame = () => {
      if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
        animationRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'attemptBoth',
      });

      if (code?.data) {
        setScanResult(code.data);
        setToken(code.data);
        setScanning(false);
        stopStream();
        return;
      }

      animationRef.current = requestAnimationFrame(scanFrame);
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        video.srcObject = stream;
        await video.play();
        setError(null);
        animationRef.current = requestAnimationFrame(scanFrame);
      } catch (err) {
        setError('Unable to access camera. Please allow camera permission or use a supported device.');
        setScanning(false);
      }
    };

    startCamera();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      stopStream();
    };
  }, [scanning]);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia) {
      setIsCameraSupported(true);
    }
  }, []);

  const toggleScanner = () => {
    setError(null);
    setScanResult(null);
    setScanning((current) => !current);
  };

  return (
    <section className="space-y-6" id="verifier-portal">
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Verifier portal</h2>
          <p className="mt-1 text-sm text-[#7A7290]">Cross-institution credential authentication service</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* QR Code Section */}
        <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="relative mb-6 h-64 w-64 overflow-hidden rounded-[20px] border border-[#E4DEF2] bg-[#E4DEF2]">
              {scanning ? (
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#7C3AED]">
                  <QRScanIcon />
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
              <div className="pointer-events-none absolute inset-4 rounded-[20px] border-2 border-white/70" />
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-[#7A7290] font-[family-name:var(--font-display)]">Scan QR Code</div>
              <div className="mt-1 text-xs text-[#7A7290]">Position credential QR within frame</div>
            </div>

            <button
              type="button"
              disabled={!isCameraSupported}
              onClick={toggleScanner}
              className="mt-5 rounded-[10px] bg-[#5B21B6] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(91,33,182,0.2)] transition hover:bg-[#4C1D95] disabled:cursor-not-allowed disabled:bg-[#E4DEF2] font-[family-name:var(--font-display)]"
            >
              {scanning ? 'Stop Scanner' : 'Start Scanner'}
            </button>

            {scanResult ? (
              <p className="mt-4 rounded-[10px] bg-emerald-50 px-4 py-3 text-sm text-emerald-700 font-[family-name:var(--font-display)]">
                Scanned QR value: <span className="font-semibold text-[#1D1330]">{scanResult}</span>
              </p>
            ) : null}

            {error ? (
              <p className="mt-4 rounded-[10px] bg-rose-50 px-4 py-3 text-sm text-rose-700 font-[family-name:var(--font-display)]">
                {error}
              </p>
            ) : null}
          </div>
        </div>

        {/* Manual Entry Section */}
        <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)]">
          <div className="mb-6">
            <div className="mb-4 text-sm font-medium text-[#7A7290] font-[family-name:var(--font-display)]">
              Manual token entry
            </div>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="TK-XXXXXX"
              className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#E4DEF2] px-5 py-4 text-sm font-medium text-[#1D1330] placeholder:text-[#7A7290] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 font-[family-name:var(--font-display)]"
            />
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#5B21B6] px-5 py-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(91,33,182,0.18)] transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]">
            <CheckIcon />
            Verify Credential
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A7290] font-[family-name:var(--font-display)]">
            <span>Token</span>
            <span className="text-[#E4DEF2]">→</span>
            <span>Blockchain</span>
            <span className="text-[#E4DEF2]">→</span>
            <span>Result</span>
          </div>
        </div>
      </div>
    </section>
  );
}
