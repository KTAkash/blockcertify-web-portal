'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiClient } from '@/src/apiHelper/api';

type Student = {
  id: string;
  name: string;
  email: string;
  indexNo: string;
};

type ViewStudentModalProps = {
  studentId: string;
  onClose: () => void;
};

export default function ViewStudentModal({ studentId, onClose }: ViewStudentModalProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [certificatesLoading, setCertificatesLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewMimeType, setPreviewMimeType] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    loadStudentData();
  }, [studentId]);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      const students = await apiClient.getStudents();
      const foundStudent = students.find(s => s.id === studentId);
      setStudent(foundStudent || null);
      
      if (foundStudent) {
        setCertificatesLoading(true);
        try {
          const studentCertificates = await apiClient.getCertificatesByStudentId(studentId);
          setCertificates(studentCertificates);
        } catch (error) {
          console.error('Failed to load student certificates:', error);
        } finally {
          setCertificatesLoading(false);
        }
      }
    } catch (error) {
      console.error('Failed to load student:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewCertificate = async (certificate: any) => {
    if (!certificate.cid || !certificate.hash) {
      setPreviewError('Certificate data incomplete for preview');
      return;
    }

    try {
      setPreviewLoading(true);
      setPreviewError(null);
      
      const blob = await apiClient.previewFile(certificate.cid, certificate.hash);
      const url = URL.createObjectURL(blob);
      setPreviewUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return url;
      });
      setPreviewMimeType(blob.type);
    } catch (error) {
      console.error('Failed to preview certificate:', error);
      setPreviewError('Failed to load certificate preview');
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleClosePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPreviewMimeType(null);
    setPreviewError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_30px_60px_rgba(30,14,66,0.35)]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
            Student Details
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4DEF2] bg-white text-[#7A7290] transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#7C3AED] border-t-transparent"></div>
              <p className="mt-4 text-sm text-[#7A7290]">Loading student details...</p>
            </div>
          </div>
        ) : !student ? (
          <div className="py-12 text-center text-sm text-[#7A7290]">
            Student not found
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-[12px] border border-[#E4DEF2] bg-white p-5">
              <h3 className="mb-4 text-lg font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">
                Personal Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290]">Student ID</p>
                  <p className="mt-1 text-sm font-medium text-[#1D1330]">{student.id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290]">Index Number</p>
                  <p className="mt-1 text-sm font-medium text-[#1D1330]">{student.indexNo}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290]">Full Name</p>
                  <p className="mt-1 text-sm font-medium text-[#1D1330]">{student.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A7290]">Email Address</p>
                  <p className="mt-1 text-sm font-medium text-[#1D1330]">{student.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] border border-[#E4DEF2] bg-white p-5">
              <h3 className="mb-4 text-lg font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">
                Certificates ({certificates.length})
              </h3>
              {certificatesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-[#7C3AED] border-t-transparent"></div>
                    <p className="mt-3 text-sm text-[#7A7290]">Loading certificates...</p>
                  </div>
                </div>
              ) : certificates.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#7A7290]">No certificates issued yet</p>
              ) : (
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div 
                      key={cert.id || cert.certificateId} 
                      className="cursor-pointer rounded-[8px] border border-[#E4DEF2] bg-[#FAF9FC] p-4 transition-colors hover:border-[#7C3AED] hover:bg-[#F0EDFF]"
                      onClick={() => handlePreviewCertificate(cert)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-[#1D1330]">{cert.certificateTitle || cert.title}</p>
                          <p className="mt-1 text-xs text-[#7A7290]">ID: {cert.certificateId || cert.id}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          cert.status === 'ISSUED' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={onClose}
                className="rounded-[10px] bg-[#5B21B6] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4">
            <div className="flex h-[90vh] w-full max-w-7xl flex-col rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_30px_60px_rgba(30,14,66,0.35)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1D1330] font-[family-name:var(--font-display)]">Certificate Preview</h3>
                <button
                  onClick={handleClosePreview}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4DEF2] bg-white text-[#7A7290] transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {previewError ? (
                <div className="rounded-[12px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {previewError}
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-hidden rounded-[10px] border border-[#E4DEF2] bg-white">
                  {previewMimeType?.startsWith('image/') ? (
                    <div className="relative h-full w-full">
                      <Image src={previewUrl} alt="Certificate Preview" fill unoptimized className="object-contain" />
                    </div>
                  ) : (
                    <iframe src={`${previewUrl}#view=FitH`} className="h-full w-full" title="Certificate Preview" />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
