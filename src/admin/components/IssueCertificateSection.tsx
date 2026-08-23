'use client';

import { useState } from 'react';
import { apiClient } from '@/src/apiHelper/api';
import StudentSearchDropdown from './StudentSearchDropdown';
import DegreeTitleDropdown from './DegreeTitleDropdown';

function CloudIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 18H17C19.7614 18 22 15.7614 22 13C22 10.4293 20.0583 8.31278 17.5651 8.03634C16.8466 5.71379 14.6806 4 12.1 4C9.03164 4 6.5118 6.42491 6.35916 9.45538C3.86954 9.77969 2 11.9096 2 14.4412C2 16.9599 4.0401 19 6.55879 19H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 8V12M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Stepper({ currentStep }: { currentStep: number }) {
  const getStepClass = (step: number) => {
    if (step < currentStep) return 'bg-[#5B21B6] text-white';
    if (step === currentStep) return 'bg-[#5B21B6] text-white';
    return 'bg-[#E4DEF2] text-[#7A7290]';
  };

  const getLineClass = (step: number) => {
    if (step < currentStep) return 'bg-[#5B21B6]';
    return 'bg-[#E4DEF2]';
  };

  return (
    <div className="mx-auto flex w-full max-w-190 items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold font-[family-name:var(--font-display)] ${getStepClass(1)}`}>1</span>
        <span className={`h-1 w-16 rounded-full sm:w-24 ${getLineClass(1)}`} />
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold font-[family-name:var(--font-display)] ${getStepClass(2)}`}>2</span>
        <span className={`h-1 w-16 rounded-full sm:w-24 ${getLineClass(2)}`} />
      </div>
      <span className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold font-[family-name:var(--font-display)] ${getStepClass(3)}`}>3</span>
    </div>
  );
}

export default function IssueCertificateSection() {
  const [studentId, setStudentId] = useState('');
  const [CertificateTitle, setCertificateTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [issuedCertificateId, setIssuedCertificateId] = useState<string | null>(null);
  const [uploadedCid, setUploadedCid] = useState<string | null>(null);
  const [uploadedHash, setUploadedHash] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [committing, setCommitting] = useState(false);
  const [blockchainStatus, setBlockchainStatus] = useState<'success' | 'error' | null>(null);
  const [blockchainMessage, setBlockchainMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadAndPreview = async () => {
    if (!file) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please upload a document template');
      return;
    }

    try {
      setUploading(true);
      setSubmissionStatus(null);
      setSubmissionMessage(null);

      // Upload file to get CID and hash
      const fileFormData = new FormData();
      fileFormData.append('file', file);
      const uploadResponse = await apiClient.uploadFile(fileFormData);
      
      console.log('Upload response:', uploadResponse);
      
      const cid = uploadResponse.cid;
      const hash = uploadResponse.hash;
      const gatewayUrl = uploadResponse.gatewayUrl;

      if (!cid || !hash) {
        setSubmissionStatus('error');
        setSubmissionMessage('Failed to get CID or hash from upload response');
        setUploading(false);
        return;
      }

      setUploadedCid(cid);
      setUploadedHash(hash);

      // Reset to step 1 when new file is uploaded
      setCurrentStep(1);
      setSubmissionStatus(null);
      setSubmissionMessage(null);
      setBlockchainStatus(null);
      setBlockchainMessage(null);
      setIssuedCertificateId(null);

      // Preview the file using the CID and hash from the preview API
      const blob = await apiClient.previewFile(cid, hash);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      setUploading(false);
    } catch (error) {
      console.error('Failed to upload or preview file:', error);
      setSubmissionStatus('error');
      setSubmissionMessage('Failed to upload or preview file. Please try again.');
      setUploading(false);
    }
  };

  const handleRemoveFile = async () => {
    if (!uploadedCid) {
      return;
    }

    try {
      setDeleting(true);
      setSubmissionStatus(null);
      setSubmissionMessage(null);
      await apiClient.deleteFile(uploadedCid);
      
      // Clean up state
      setUploadedCid(null);
      setUploadedHash(null);
      setPreviewUrl(null);
      setFile(null);
      setIssuedCertificateId(null);
      setCurrentStep(1);
      setSubmissionStatus(null);
      setSubmissionMessage(null);
      setBlockchainStatus(null);
      setBlockchainMessage(null);
      
      alert('File removed successfully');
    } catch (error) {
      console.error('Failed to remove file:', error);
      alert('Failed to remove file. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedCid || !uploadedHash) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please upload and preview the file first');
      return;
    }

    if (!studentId) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please select a student');
      return;
    }

    try {
      setSubmitting(true);
      setSubmissionStatus(null);
      setSubmissionMessage(null);

      // Issue certificate with CID and hash from upload response
      const issueResponse = await apiClient.issueCertificate({
        studentId: studentId,
        certificateTitle: CertificateTitle,
        cid: uploadedCid,
        hash: uploadedHash,
        status: 'ISSUED',
      });

      console.log('Certificate issue response:', issueResponse);

      // Get the certificateId from the response
      const certificateId = issueResponse.certificateId || issueResponse.id || issueResponse._id;
      console.log('Extracted certificate ID:', certificateId);
      setIssuedCertificateId(certificateId);

      setSubmissionStatus('success');
      setSubmissionMessage('Certificate created successfully!');
      setCurrentStep(2);
    } catch (error) {
      console.error('Failed to issue certificate:', error);
      setSubmissionStatus('error');
      setSubmissionMessage('Failed to issue certificate. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommitToBlockchain = async () => {
    if (!issuedCertificateId || !uploadedCid || !uploadedHash) {
      setBlockchainStatus('error');
      setBlockchainMessage('Certificate data not found. Please create a certificate first.');
      return;
    }

    try {
      setCommitting(true);
      setBlockchainStatus(null);
      setBlockchainMessage(null);

      // Commit to blockchain with the correct payload
      console.log('Committing to blockchain with:', {
        certificateId: issuedCertificateId,
        studentId: studentId,
        cid: uploadedCid,
        hash: uploadedHash,
        status: 'ISSUED',
      });
      
      await apiClient.commitToBlockchain({
        certificateId: issuedCertificateId,
        studentId: studentId,
        cid: uploadedCid,
        hash: uploadedHash,
        status: 'ISSUED',
      });

      setBlockchainStatus('success');
      setBlockchainMessage('Certificate committed to blockchain successfully!');
      setCurrentStep(3);
      
      // Reset form after successful blockchain commit
      setTimeout(() => {
        setStudentId('');
        setCertificateTitle('');
        setFile(null);
        setUploadedCid(null);
        setUploadedHash(null);
        setPreviewUrl(null);
        setIssuedCertificateId(null);
        setSubmissionStatus(null);
        setSubmissionMessage(null);
        setBlockchainStatus(null);
        setBlockchainMessage(null);
        setCurrentStep(1);
      }, 3000);
    } catch (error) {
      console.error('Failed to commit to blockchain:', error);
      setBlockchainStatus('error');
      setBlockchainMessage('Failed to commit to blockchain. Please try again.');
    } finally {
      setCommitting(false);
    }
  };

  return (
    <section className="space-y-10 py-8" id="issue-certificate">
      <Stepper currentStep={currentStep} />

      <div className="mx-auto w-full max-w-190 rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-7 shadow-[0_10px_30px_rgba(29,19,48,0.04)] sm:p-9">
        <h2 className="text-[48px] font-black tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Issue New Academic Credential</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-7">
          <label className={`block ${currentStep !== 1 ? 'opacity-50 pointer-events-none' : ''}`}>
            <span className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">Student Name</span>
            <StudentSearchDropdown
              value={studentId}
              onChange={setStudentId}
              placeholder="Search student by name or index no..."
              disabled={currentStep !== 1}
            />
          </label>

          <label className={`block ${currentStep !== 1 ? 'opacity-50 pointer-events-none' : ''}`}>
            <span className="mb-2 block text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">Certificate Title</span>
            <DegreeTitleDropdown
              value={CertificateTitle}
              onChange={setCertificateTitle}
              placeholder="Select degree title..."
              disabled={currentStep !== 1}
            />
          </label>

          <div className={currentStep !== 1 ? 'opacity-50 pointer-events-none' : ''}>
            <p className="mb-2 text-sm font-semibold text-[#7A7290] font-[family-name:var(--font-display)]">Upload Document Template</p>
            <label className="flex min-h-50 cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#E4DEF2] bg-[#E4DEF2]/40 px-6 text-center text-[#7A7290] transition-colors hover:border-[#7C3AED] hover:bg-[#7C3AED]/30">
              <span className="mb-3 text-[#7C3AED]">
                <CloudIcon />
              </span>
              <p className="text-[30px] font-medium text-[#7A7290]">
                Drag and drop file or <span className="font-bold text-[#7C3AED]">browse</span>
              </p>
              <p className="mt-2 text-sm">PDF, JPG or PNG (max. 10MB)</p>
              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" disabled={currentStep !== 1} />
            </label>
            {file && (
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-[#7C3AED]">Selected: {file.name}</p>
                <button
                  type="button"
                  onClick={handleUploadAndPreview}
                  disabled={uploading || currentStep !== 1}
                  className="rounded-[10px] bg-[#7C3AED] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#5B21B6] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
                >
                  {uploading ? 'Uploading...' : 'Upload & Preview'}
                </button>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1D1330] font-[family-name:var(--font-display)]">File Preview</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#7A7290]">CID: {uploadedCid}</span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={deleting}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#E4DEF2] bg-white text-[#7A7290] transition-all hover:border-red-400 hover:bg-red-100 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove file"
                  >
                    <XIcon />
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-auto rounded-[10px] border border-[#E4DEF2] bg-white">
                {file?.type.startsWith('image/') ? (
                  <img src={previewUrl} alt="Preview" className="w-full object-contain" />
                ) : (
                  <iframe src={previewUrl} className="h-96 w-full" title="File Preview" />
                )}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <>
              <button
                type="submit"
                disabled={submitting || !uploadedCid || !uploadedHash}
                className="w-full rounded-[10px] bg-[#5B21B6] px-6 py-5 text-[40px] font-bold tracking-tight text-white shadow-[0_16px_30px_rgba(91,33,182,0.22)] transition-colors hover:bg-[#4C1D95] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
              >
                {submitting ? 'Processing...' : 'Create Certificate'}
              </button>

              {submissionStatus && (
                <div
                  className={`flex items-center gap-3 rounded-[12px] border px-6 py-4 ${
                    submissionStatus === 'success'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-rose-200 bg-rose-50 text-rose-700'
                  }`}
                >
                  {submissionStatus === 'success' ? (
                    <CheckIcon />
                  ) : (
                    <ErrorIcon />
                  )}
                  <p className="font-medium">{submissionMessage}</p>
                </div>
              )}
            </>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div
                className={`flex items-center gap-3 rounded-[12px] border px-6 py-4 ${
                  submissionStatus === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                {submissionStatus === 'success' ? (
                  <CheckIcon />
                ) : (
                  <ErrorIcon />
                )}
                <div>
                  <p className="font-medium">{submissionMessage}</p>
                  {issuedCertificateId && (
                    <p className="text-sm opacity-75">Certificate ID: {issuedCertificateId}</p>
                  )}
                </div>
              </div>

              <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)]">
                <h3 className="mb-4 text-lg font-bold text-[#1D1330] font-[family-name:var(--font-display)]">Ready to Commit to Blockchain</h3>
                <p className="mb-6 text-sm text-[#7A7290]">
                  The certificate has been created successfully. Click the button below to commit it to the blockchain for permanent verification.
                </p>
                <button
                  type="button"
                  onClick={handleCommitToBlockchain}
                  disabled={committing}
                  className="w-full rounded-[10px] bg-[#5B21B6] px-6 py-4 text-xl font-bold text-white shadow-[0_16px_30px_rgba(91,33,182,0.22)] transition-colors hover:bg-[#4C1D95] disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
                >
                  {committing ? 'Committing...' : 'Confirm & Commit to Blockchain'}
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div
              className={`flex items-center gap-3 rounded-[12px] border px-6 py-4 ${
                blockchainStatus === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-rose-200 bg-rose-50 text-rose-700'
              }`}
            >
              {blockchainStatus === 'success' ? (
                <CheckIcon />
              ) : (
                <ErrorIcon />
              )}
              <p className="font-medium">{blockchainMessage}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}