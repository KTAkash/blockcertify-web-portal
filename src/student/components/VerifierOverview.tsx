"use client";

import { useState } from 'react';
import VerificationCard from './VerificationCard';

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VerifierOverview() {
  const [verifiedCertificates, setVerifiedCertificates] = useState<any[]>([]);

  const handleVerification = (certificateId: string) => {
    // Mock verification - in real app, this would call an API
    const mockResult = {
      certificateId,
      title: 'Bachelor of Science',
      issuer: 'University of Colombo',
      issuedDate: '2024-03-15',
      status: 'Verified',
      studentName: 'John Doe',
      cid: 'CERT-001',
      hash: '0x1234567890abcdef',
    };
    
    setVerifiedCertificates(prev => [...prev, mockResult]);
  };

  return (
    <section className="space-y-6" id="overview">
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Certificate verification</h2>
            <p className="mt-1 text-sm text-[#7A7290]">
              Multi-institution credential verification
            </p>
          </div>
          <button className="rounded-full bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]">
            Blockchain verified
          </button>
        </div>
      </div>

      <VerificationCard onVerify={handleVerification} />

      {verifiedCertificates.length > 0 && (
        <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Recently verified</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {verifiedCertificates.map((cert, index) => (
              <div key={index} className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4DEF2] text-[#7C3AED]">
                      <ShieldIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{cert.title}</h4>
                      <p className="text-sm text-[#7A7290]">Issuer: {cert.issuer}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600 font-[family-name:var(--font-display)]">
                    {cert.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-[#7A7290]">
                  <p>Issued: {cert.issuedDate}</p>
                  <p>Student: {cert.studentName}</p>
                  <p>Certificate ID: {cert.certificateId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}