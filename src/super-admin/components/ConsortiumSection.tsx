"use client";

import AddInstitutionModal from '@/src/super-admin/components/AddInstitutionModal';
import { useState } from 'react';

type ConsortiumInstitution = {
  name: string;
  location: string;
  endpoint: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
};

const initialInstitutions: ConsortiumInstitution[] = [
  {
    name: 'Tech University',
    location: 'Silicon Valley, USA',
    endpoint: 'peer0.tech-uni.fabric.net:7051',
    joinedDate: '2023-01-10',
    status: 'active',
  },
  {
    name: 'Global School of Arts',
    location: 'London, UK',
    endpoint: 'peer0.global-arts.fabric.net:7051',
    joinedDate: '2023-05-12',
    status: 'pending',
  },
  {
    name: 'National Medical Center',
    location: 'Berlin, Germany',
    endpoint: 'peer0.nat-med.fabric.net:7051',
    joinedDate: '2023-11-20',
    status: 'active',
  },
];

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

export default function ConsortiumSection() {
  const [institutions, setInstitutions] = useState<ConsortiumInstitution[]>(initialInstitutions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterInstitution = (payload: { name: string; location: string }) => {
    const endpointBase = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const today = new Date();
    const joinedDate = today.toISOString().slice(0, 10);

    const newInstitution: ConsortiumInstitution = {
      name: payload.name,
      location: payload.location,
      endpoint: `peer0.${endpointBase}.fabric.net:7051`,
      joinedDate,
      status: 'active',
    };

    setInstitutions((previous) => [newInstitution, ...previous]);
    setIsModalOpen(false);
  };

  return (
    <section id="registry" className="space-y-5">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Registry
          </p>
          <h2 className="mt-2 text-[28px] font-black tracking-tight text-slate-900">
            Consortium Management
          </h2>
          <p className="mt-1 max-w-2xl text-[15px] text-slate-500">
            Onboard and manage educational institutions in the network
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(37,99,235,0.2)] transition-colors hover:bg-blue-700"
        >
          <span className="text-xl leading-none">+</span>
          Add Institution
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {institutions.map((institution) => (
          <article
            key={institution.name}
            className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
          >
            <StatusDot status={institution.status} />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <InstitutionIcon />
            </div>

            <div className="mt-10 border-b border-slate-100 pb-7">
              <h3 className="text-[24px] font-black tracking-tight text-slate-900">
                {institution.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                <LocationIcon />
                <span>{institution.location}</span>
              </div>
            </div>

            <div className="mt-7 space-y-6">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Node Endpoint
                </p>
                <p className="mt-2 text-[13px] font-semibold text-blue-600">
                  {institution.endpoint}
                </p>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Joined Date
                  </p>
                  <p className="mt-2 text-[15px] font-bold tracking-tight text-slate-900">
                    {institution.joinedDate}
                  </p>
                </div>

                <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-400 text-rose-500 transition-colors hover:bg-rose-50">
                  <span className="text-[18px] leading-none">×</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <AddInstitutionModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onRegister={handleRegisterInstitution}
      />
    </section>
  );
}