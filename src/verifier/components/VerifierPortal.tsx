"use client";

import jsQR from 'jsqr';
import { apiClient } from '@/src/apiHelper/api';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type BarcodeDetectorInstance = { detect: (source: CanvasImageSource) => Promise<Array<{ rawValue: string }>> };
type BarcodeDetectorConstructor = new (options?: { formats?: string[] }) => BarcodeDetectorInstance;

function QRScanIcon() { return <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" /><rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" /><rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" /><rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" /><path d="M12 7V17M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function CheckIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function RefreshIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11A8 8 0 1 0 17.65 17M20 4V11H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

const cameraConstraints: MediaStreamConstraints = { video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } }, audio: false };

export default function VerifierPortal() {
  const [token, setToken] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [cameraSupported] = useState(() => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia);
  const [verifying, setVerifying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewMimeType, setPreviewMimeType] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const detectorRef = useRef<BarcodeDetectorInstance | null>(null);
  const detectingRef = useRef(false);

  const clearPreview = () => {
    setPreviewUrl((current) => { if (current) URL.revokeObjectURL(current); return null; });
    setPreviewMimeType(null);
  };
  const acceptValue = (value: string) => {
    const cid = value.trim();
    if (!cid) return;
    setScanResult(cid); setToken(cid); setScanning(false); setError(null); clearPreview();
  };
  const scanAnother = () => {
    setScanResult(null); setToken(''); setError(null); clearPreview(); setScanning(true);
  };

  useEffect(() => () => clearPreview(), []);

  useEffect(() => {
    if (!scanning) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { willReadFrequently: true });
    if (!video || !canvas || !context) { setError('Scanner is not ready. Please try again.'); setScanning(false); return; }
    const stopStream = () => { streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null; };
    const scanFrame = () => {
      if (video.readyState !== video.HAVE_ENOUGH_DATA) { animationRef.current = requestAnimationFrame(scanFrame); return; }
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const jsQrValue = jsQR(pixels.data, pixels.width, pixels.height, { inversionAttempts: 'attemptBoth' })?.data;
      if (jsQrValue) { acceptValue(jsQrValue); stopStream(); return; }
      if (detectorRef.current && !detectingRef.current) {
        detectingRef.current = true;
        detectorRef.current.detect(video).then((codes) => { if (codes[0]?.rawValue) acceptValue(codes[0].rawValue); }).catch(() => {}).finally(() => { detectingRef.current = false; });
      }
      animationRef.current = requestAnimationFrame(scanFrame);
    };
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(cameraConstraints);
        streamRef.current = stream;
        const track = stream.getVideoTracks()[0];
        const caps = track?.getCapabilities?.() as MediaTrackCapabilities & { focusMode?: string[] };
        if (track && caps?.focusMode?.includes('continuous')) await track.applyConstraints({ advanced: [{ focusMode: 'continuous' } as MediaTrackConstraintSet] });
        const Detector = (window as unknown as { BarcodeDetector?: BarcodeDetectorConstructor }).BarcodeDetector;
        detectorRef.current = Detector ? new Detector({ formats: ['qr_code'] }) : null;
        video.srcObject = stream; await video.play(); setError(null); animationRef.current = requestAnimationFrame(scanFrame);
      } catch (cause) { console.error('Unable to start QR scanner:', cause); setError('Unable to access a suitable camera. Allow permission, or upload the QR image below.'); setScanning(false); }
    };
    void startCamera();
    return () => { if (animationRef.current !== null) cancelAnimationFrame(animationRef.current); stopStream(); };
  }, [scanning]);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    setError(null);
    const image = new Image(); const url = URL.createObjectURL(file);
    try {
      await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error('The selected file is not a readable image.')); image.src = url; });
      const canvas = document.createElement('canvas'); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) throw new Error('Image decoder is unavailable.');
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const value = jsQR(pixels.data, pixels.width, pixels.height, { inversionAttempts: 'attemptBoth' })?.data;
      if (!value) throw new Error('No readable QR code was found in that image.');
      acceptValue(value);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to read the QR image.'); }
    finally { URL.revokeObjectURL(url); }
  };

  const handleVerify = async () => {
    const cid = token.trim();
    if (!cid) { setError('Scan a QR code or enter a CID first.'); return; }
    setVerifying(true); setError(null); clearPreview();
    try {
      // The preview endpoint resolves the file directly from the scanned CID.
      // Do not call GET /api/certificates: this backend does not support that method.
      const preview = await apiClient.previewFile(cid);
      setPreviewMimeType(preview.type); setPreviewUrl(URL.createObjectURL(preview));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to verify this credential.'); }
    finally { setVerifying(false); }
  };

  return <section className="space-y-6" id="verifier-portal">
    <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm"><h2 className="text-2xl font-semibold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Verifier portal</h2><p className="mt-1 text-sm text-[#7A7290]">Cross-institution credential authentication service</p></div>
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm"><div className="flex flex-col items-center">
        <div className="relative mb-6 h-72 w-72 max-w-full overflow-hidden rounded-[20px] border border-[#E4DEF2] bg-[#E4DEF2]">{scanning ? <video ref={videoRef} className="h-full w-full object-cover" muted playsInline /> : <div className="flex h-full w-full items-center justify-center text-[#7C3AED]"><QRScanIcon /></div>}<canvas ref={canvasRef} className="hidden" /><div className="pointer-events-none absolute inset-4 rounded-[20px] border-2 border-white/70" />{scanResult && <button type="button" onClick={scanAnother} className="absolute inset-0 flex items-center justify-center bg-[#1D1330]/35 text-white transition hover:bg-[#1D1330]/50" aria-label="Scan another QR code"><span className="flex flex-col items-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-4 text-sm font-semibold shadow-lg"><RefreshIcon />Scan another</span></button>}</div>
        <div className="text-center"><div className="text-sm font-medium text-[#7A7290]">Scan QR Code</div><div className="mt-1 text-xs text-[#7A7290]">Hold the phone 30–50 cm away and fill the frame. For a blurry webcam, upload a screenshot of the QR instead.</div></div>
        <div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" disabled={!cameraSupported} onClick={() => { setError(null); setScanning((current) => !current); }} className="rounded-[10px] bg-[#5B21B6] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(91,33,182,0.2)] transition hover:bg-[#4C1D95] disabled:cursor-not-allowed disabled:bg-[#E4DEF2]">{scanning ? 'Stop Scanner' : 'Start Scanner'}</button><button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-[10px] border border-[#5B21B6] px-5 py-3 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#EDE9FE]">Upload QR image</button><input ref={fileInputRef} className="hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageUpload} /></div>
        {scanResult && <p className="mt-4 max-w-full break-all rounded-[10px] bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Scanned CID: <span className="font-semibold text-[#1D1330]">{scanResult}</span></p>}
      </div></div>
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)]"><div className="mb-6"><label htmlFor="credential-cid" className="mb-4 block text-sm font-medium text-[#7A7290]">Credential CID</label><input id="credential-cid" type="text" value={token} onChange={(event) => setToken(event.target.value)} placeholder="bafy..." className="w-full rounded-[10px] border border-[#E4DEF2] bg-[#E4DEF2] px-5 py-4 text-sm font-medium text-[#1D1330] placeholder:text-[#7A7290] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20" /></div><button type="button" onClick={handleVerify} disabled={verifying} className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#5B21B6] px-5 py-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(91,33,182,0.18)] transition-colors hover:bg-[#4C1D95] disabled:cursor-wait disabled:opacity-60"><CheckIcon />{verifying ? 'Loading preview...' : 'Verify & Preview Credential'}</button><div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A7290]"><span>CID</span><span className="text-[#E4DEF2]">→</span><span>Record</span><span className="text-[#E4DEF2]">→</span><span>Preview</span></div>{error && <p className="mt-4 rounded-[10px] bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}{previewUrl && <div className="mt-5 overflow-hidden rounded-xl border border-[#E4DEF2] bg-white"><div className="border-b border-[#E4DEF2] px-4 py-3 text-sm font-semibold text-[#1D1330]">Certificate preview</div>{previewMimeType?.startsWith('image/') ? <img src={previewUrl} alt="Verified certificate preview" className="max-h-[28rem] w-full object-contain" /> : <iframe src={`${previewUrl}#view=FitH`} title="Verified certificate preview" className="h-96 w-full" />}</div>}</div>
    </div>
  </section>;
}
