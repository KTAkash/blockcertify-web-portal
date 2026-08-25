'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import { apiClient } from '@/src/apiHelper/api';
import CredentialViewerModal from '@/src/student/components/CredentialViewerModal';

const portalNavMap = {
  'super-admin': {
    items: [
      { label: 'Network Overview', href: '/super-admin/network-overview' },
      { label: 'Consortium Registry', href: '/super-admin/consortium' },
      { label: 'Geo-Distributed Nodes', href: '/super-admin/nodes' },
      { label: 'Student Certificates', href: '/super-admin/student-certificates' },
      { label: 'Certificate Preview', href: '/super-admin/certificate-preview' },
    ],
  },
};

export default function CertificatePreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewMimeType, setPreviewMimeType] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [credentialInfo, setCredentialInfo] = useState<any>(null);

  const cid = searchParams.get('cid');
  const hash = searchParams.get('hash');

  useEffect(() => {
    const loadPreview = async () => {
      if (!cid) {
        setError('Certificate ID (CID) is required');
        setIsPreviewLoading(false);
        return;
      }

      try {
        setIsPreviewLoading(true);
        setError(null);
        
        const previewBlob = await apiClient.previewFile(cid, hash || undefined);
        const objectUrl = URL.createObjectURL(previewBlob);

        setPreviewUrl((currentUrl) => {
          if (currentUrl) URL.revokeObjectURL(currentUrl);
          return objectUrl;
        });
        setPreviewMimeType(previewBlob.type);
        
        // Set basic credential info for the modal
        setCredentialInfo({
          title: 'Certificate',
          issuer: 'Unknown',
          issuedDate: 'Not available',
          refId: cid,
          studentName: 'Student',
        });
      } catch (error) {
        console.error('Failed to load certificate preview:', error);
        setError('Unable to load this certificate preview. The file may not be available.');
      } finally {
        setIsPreviewLoading(false);
      }
    };

    loadPreview();

    // Cleanup on unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [cid, hash]);

  const handleBack = () => {
    router.back();
  };

  const handleClosePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setPreviewMimeType(null);
    router.back();
  };

  return (
    <main className="min-h-screen bg-[#F5F3FF] text-foreground">
      <div className={`grid min-h-screen grid-cols-1 ${isSidebarOpen ? 'lg:grid-cols-[288px_1fr]' : 'lg:grid-cols-[80px_1fr]'}`}>
        <NavBar 
          portal="super-admin" 
          role="Super Admin" 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        <div className="flex min-w-0 flex-col">
          <Header 
            title="Certificate Preview" 
            subtitle="Super Admin Portal" 
            statusLabel="Hyperledger Fabric Mainnet"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {isPreviewLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED]" />
              </div>
            ) : error ? (
              <div className="rounded-[20px] border border-rose-200 bg-rose-50 p-8 text-center">
                <div className="text-rose-600 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-rose-800 mb-2">Unable to Load Certificate</h3>
                <p className="text-rose-600 mb-4">{error}</p>
                <button
                  onClick={handleBack}
                  className="rounded-xl bg-[#5B21B6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95]"
                >
                  Go Back
                </button>
              </div>
            ) : previewUrl ? (
              <CredentialViewerModal
                isOpen={true}
                onClose={handleClosePreview}
                previewUrl={previewUrl}
                previewMimeType={previewMimeType}
                credential={credentialInfo}
              />
            ) : (
              <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-8 text-center">
                <p className="text-[#7A7290]">No certificate data available.</p>
                <button
                  onClick={handleBack}
                  className="mt-4 rounded-xl bg-[#5B21B6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95]"
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}