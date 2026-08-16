"use client";

import AddInstitutionModal from '@/src/super-admin/components/AddInstitutionModal';
import ConfirmationModal from '@/src/super-admin/components/ConfirmationModal';
import { apiClient } from '@/src/apiHelper/api';
import { University, RegisterUniversityRequest } from '@/src/interfaces/auth';
import { useEffect, useState } from 'react';

type ConsortiumInstitution = {
  id: string;
  name: string;
  location: string;
  endpoint: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
  mspId: string;
};

function InstitutionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 20V8H10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20V4H18V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8H15M13 12H15M13 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 21C12 21 19 14.5 19 9.5C19 5.63401 16.3137 3 12 3C7.68629 3 5 5.63401 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function StatusDot({ status }: { status: ConsortiumInstitution['status'] }) {
  const className =
    status === 'active'
      ? 'bg-emerald-400'
      : status === 'pending'
        ? 'bg-amber-300'
        : 'bg-rose-400';

  return <span className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${className}`} />;
}

type ModalState = {
  isOpen: boolean;
  type: 'delete' | 'deactivate' | 'activate';
  id: string;
  name: string;
} | null;

export default function ConsortiumSection() {
  const [institutions, setInstitutions] = useState<ConsortiumInstitution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await apiClient.getUniversities();
        console.log('Universities data from API:', data);
        // Map the API data to our UI format
        const mappedInstitutions: ConsortiumInstitution[] = data.map((uni: any, index: number) => {
          console.log(`University ${index} raw data:`, uni);
          // Try all possible id fields
          const universityId = uni.id || uni._id || uni.universityId || uni.university_id || uni.ID;
          console.log(`University ${index} using id:`, universityId);
          return {
            id: universityId,
            name: uni.name,
            location: '', // API doesn't provide location yet
            endpoint: uni.peerEndpoint,
            joinedDate: '', // API doesn't provide joined date yet
            status: uni.active ? 'active' : 'inactive',
            mspId: uni.mspId,
          };
        });
        console.log('Mapped institutions:', mappedInstitutions);
        setInstitutions(mappedInstitutions);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const handleRegisterInstitution = async (payload: RegisterUniversityRequest) => {
    setIsRegistering(true);
    try {
      const newUniversity = await apiClient.registerUniversity(payload);
      
      const newInstitution: ConsortiumInstitution = {
        id: newUniversity.id,
        name: newUniversity.name,
        location: '', // Not provided by API
        endpoint: newUniversity.peerEndpoint,
        joinedDate: '', // Not provided by API
        status: newUniversity.active ? 'active' : 'inactive',
        mspId: newUniversity.mspId,
      };

      setInstitutions((previous) => [newInstitution, ...previous]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to register university:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleDeleteUniversity = async () => {
    if (!modalState) return;
    console.log('handleDeleteUniversity called with modalState:', modalState);
    setProcessingId(modalState.id);
    try {
      await apiClient.deleteUniversity(modalState.id);
      setInstitutions((prev) => prev.filter((inst) => inst.id !== modalState.id));
      setModalState(null);
    } catch (error) {
      console.error('Failed to delete university:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReactivateUniversity = async () => {
    if (!modalState) return;
    console.log('handleReactivateUniversity called with modalState:', modalState);
    setProcessingId(modalState.id);
    try {
      const updatedUni = await apiClient.reactivateUniversity(modalState.id);
      setInstitutions((prev) =>
        prev.map((inst) =>
          inst.id === modalState.id
            ? {
                ...inst,
                status: updatedUni.active ? 'active' : 'inactive',
              }
            : inst
        )
      );
      setModalState(null);
    } catch (error) {
      console.error('Failed to reactivate university:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeactivateUniversity = async () => {
    if (!modalState) return;
    console.log('handleDeactivateUniversity called with modalState:', modalState);
    setProcessingId(modalState.id);
    try {
      const updatedUni = await apiClient.deactivateUniversity(modalState.id);
      setInstitutions((prev) =>
        prev.map((inst) =>
          inst.id === modalState.id
            ? {
                ...inst,
                status: updatedUni.active ? 'active' : 'inactive',
              }
            : inst
        )
      );
      setModalState(null);
    } catch (error) {
      console.error('Failed to deactivate university:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirmAction = () => {
    if (!modalState) return;
    switch (modalState.type) {
      case 'delete':
        handleDeleteUniversity();
        break;
      case 'activate':
        handleReactivateUniversity();
        break;
      case 'deactivate':
        handleDeactivateUniversity();
        break;
    }
  };

  return (
    <section id="registry" className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A7290] font-[family-name:var(--font-display)]">
            Registry
          </p>
          <h2 className="mt-2 text-[28px] font-black tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
            Consortium Management
          </h2>
          <p className="mt-1 max-w-2xl text-[15px] text-[#7A7290]">
            Onboard and manage educational institutions in the network
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isRegistering}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-[#5B21B6] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(91,33,182,0.2)] transition-colors hover:bg-[#4C1D95] disabled:opacity-70 disabled:cursor-not-allowed font-[family-name:var(--font-display)]"
        >
          <span className="text-xl leading-none">+</span>
          Add Institution
        </button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-[#7A7290]">Loading universities...</p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-3">
          {institutions.map((institution, index) => (
            <article
              key={institution.id || index}
              className="relative rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)]"
            >
              <StatusDot status={institution.status} />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4DEF2] text-[#7C3AED]">
                <InstitutionIcon />
              </div>

              <div className="mt-10 border-b border-[#E4DEF2] pb-7">
                <h3 className="text-[24px] font-black tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
                  {institution.name}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  <span>{institution.mspId}</span>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A7290] font-[family-name:var(--font-display)]">
                    Node Endpoint
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-[#7C3AED]">
                    {institution.endpoint}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    {institution.status === 'inactive' ? (
                      <button
                        onClick={() => {
                          console.log('Setting activate modal for institution:', institution);
                          setModalState({
                            isOpen: true,
                            type: 'activate',
                            id: institution.id,
                            name: institution.name,
                          });
                        }}
                        disabled={processingId === institution.id}
                        className="inline-flex items-center justify-center gap-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
                      >
                        {processingId === institution.id && (
                          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {processingId === institution.id ? '...' : 'Activate'}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          console.log('Setting deactivate modal for institution:', institution);
                          setModalState({
                            isOpen: true,
                            type: 'deactivate',
                            id: institution.id,
                            name: institution.name,
                          });
                        }}
                        disabled={processingId === institution.id}
                        className="inline-flex items-center justify-center gap-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
                      >
                        {processingId === institution.id && (
                          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {processingId === institution.id ? '...' : 'Deactivate'}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      console.log('Setting delete modal for institution:', institution);
                      setModalState({
                        isOpen: true,
                        type: 'delete',
                        id: institution.id,
                        name: institution.name,
                      });
                    }}
                    disabled={processingId === institution.id}
                    className="inline-flex items-center justify-center gap-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white bg-rose-600 hover:bg-rose-700 transition-colors disabled:opacity-50"
                  >
                    {processingId === institution.id && (
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {processingId === institution.id ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <AddInstitutionModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onRegister={handleRegisterInstitution}
      />

      {modalState && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          title={
            modalState.type === 'delete'
              ? 'Delete Institution'
              : modalState.type === 'activate'
              ? 'Activate Institution'
              : 'Deactivate Institution'
          }
          message={
            modalState.type === 'delete'
              ? `Are you sure you want to delete "${modalState.name}"?`
              : modalState.type === 'activate'
              ? `Are you sure you want to activate "${modalState.name}"?`
              : `Are you sure you want to deactivate "${modalState.name}"?`
          }
          confirmButtonText={
            modalState.type === 'delete' ? 'Delete' : 'Confirm'
          }
          confirmButtonColor={
            modalState.type === 'delete' ? 'red' : 'emerald'
          }
          icon={
            modalState.type === 'delete' ? 'delete' : 'deactivate'
          }
          onCancel={() => setModalState(null)}
          onConfirm={handleConfirmAction}
        />
      )}
    </section>
  );
}