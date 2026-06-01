'use client';

import Link from 'next/link';
import { useState } from 'react';

const ShieldIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21M5 21V5H8V3H16V5H19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7H15M9 11H15M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WalletIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7C3 5.9 3.9 5 5 5H19C20.1 5 21 5.9 21 7V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21M17 14H17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MagnifyingGlassIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const roles = [
  {
    id: 'system-owner',
    title: 'System owner',
    subtitle: 'Consortium governance and university onboarding',
    icon: ShieldIcon,
    route: '/super-admin',
  },
  {
    id: 'admin',
    title: 'Admin',
    subtitle: 'Institutional authority node',
    icon: BuildingIcon,
    route: '/admin',
  },
  {
    id: 'wallet',
    title: 'Wallet',
    subtitle: 'Self-sovereign credential hub',
    icon: WalletIcon,
    route: '/student',
  },
  {
    id: 'verifier',
    title: 'Verifier',
    subtitle: 'Consortium verification node',
    icon: MagnifyingGlassIcon,
    route: '/verifier',
  },
];

export default function Home() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 mb-6">
            ChainVerify portal
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-3">
            ChainVerify
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
            Blockchain-based credential verification for institutions, students, and verifiers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isHovered = hoveredRole === role.id;

            return (
              <Link key={role.id} href={role.route}>
                <div
                  className={`group h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 transition duration-300 ${
                    isHovered ? 'shadow-md' : 'shadow-sm'
                  } hover:-translate-y-0.5 hover:shadow-md`}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  <div className={`mb-6 p-4 rounded-3xl ${isHovered ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <IconComponent />
                  </div>

                  <div className="space-y-3 text-center">
                    <h2 className="text-lg font-semibold text-slate-900">{role.title}</h2>
                    <p className="text-sm text-slate-600">{role.subtitle}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
