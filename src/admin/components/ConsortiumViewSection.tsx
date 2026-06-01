"use client";

import React from 'react';

function InstitutionIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3L3 10H5V21H19V10H21L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="15" r="1" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="currentColor" strokeWidth="1" />
      <circle cx="15" cy="15" r="1" fill="currentColor" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const institutions = [
  {
    name: 'TECH UNIVERSITY',
    status: 'PEER_ONLINE',
    statusColor: 'bg-emerald-400',
  },
  {
    name: 'GLOBAL SCHOOL OF ARTS',
    status: 'PEER_PEERING',
    statusColor: 'bg-amber-400',
  },
  {
    name: 'NATIONAL MEDICAL CENTER',
    status: 'PEER_ONLINE',
    statusColor: 'bg-emerald-400',
  },
];

export default function ConsortiumViewSection() {
  return (
    <section className="h-full w-full">
      <div className="flex min-h-[600px] flex-col items-center justify-center rounded-[2rem] bg-[#0f172a] p-10 shadow-2xl">
        <div className="mb-20 text-center">
          <h2 className="text-[36px] font-black tracking-tight text-white sm:text-[42px]">
            CONSORTIUM NETWORK
          </h2>
          <p className="mt-4 text-[15px] font-medium tracking-wide text-blue-200/70">
            Multi-Institution Proof-of-Authority Federation
          </p>
        </div>

        <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {institutions.map((inst, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-3xl bg-[#1e293b]/60 px-6 py-12 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div className="mb-8 text-blue-500">
                <InstitutionIcon />
              </div>
              
              <h3 className="mb-6 text-center text-[13px] font-black uppercase tracking-widest text-white">
                {inst.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${inst.statusColor}`} />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {inst.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
