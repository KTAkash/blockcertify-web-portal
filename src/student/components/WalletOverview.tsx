"use client";

import { useEffect, useState } from 'react';
import CredentialCard from './CredentialCard';
import ExternalCredentialsCard from './ExternalCredentialsCard';
import { apiClient } from '@/src/apiHelper/api';
import type { StudentCertificate, StudentProfile } from '@/src/interfaces/auth';

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WalletOverview() {
  const [certificates, setCertificates] = useState<StudentCertificate[]>([]);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const studentProfile = await apiClient.getStudentProfile();
        setProfile(studentProfile);

        const details = await apiClient.getStudentCertificates(studentProfile.indexNo);
        setCertificates(details.certificates ?? []);
      } catch (loadError) {
        console.error('Failed to load wallet certificates:', loadError);
        setError('Unable to load your certificates. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadWallet();
  }, []);

  return (
    <section className="space-y-6" id="overview">
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Digital wallet</h2>
            <p className="mt-1 text-sm text-[#7A7290]">
              Multi-institution credential vault
            </p>
          </div>
          <button className="rounded-full bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4C1D95] font-[family-name:var(--font-display)]">
            SSI protected
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-96 animate-pulse rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC]" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-[20px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">{error}</div>
      ) : certificates.length === 0 ? (
        <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-8 text-center text-sm text-[#7A7290]">
          No certificates have been issued to your wallet yet.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {certificates.map((certificate) => (
            <CredentialCard
              key={certificate.certificateId}
              title={certificate.certificateTitle}
              issuer={certificate.issuedBy}
              issuedDate={formatIssuedDate(certificate.issuedAt)}
              refId={certificate.certificateId}
              status={certificate.status}
              icon={<ShieldIcon />}
              studentName={profile ? `${profile.firstName} ${profile.lastName}` : undefined}
              cid={certificate.cid}
              hash={certificate.hash}
            />
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <ExternalCredentialsCard />
      </div>
    </section>
  );
}

function formatIssuedDate(issuedAt: string | null): string {
  if (!issuedAt) return 'Not available';

  const date = new Date(issuedAt);
  return Number.isNaN(date.getTime()) ? issuedAt : date.toLocaleDateString();
}
