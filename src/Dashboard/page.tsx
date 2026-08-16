'use client';

import Link from 'next/link';
import { useState } from 'react';

// Mock data for dashboard roles
const roles = [
  {
    id: 'system-owner',
    title: 'SYSTEM OWNER',
    subtitle: 'Consortium Governance & University Onboarding',
    icon: '🛡️',
    route: '/system-owner',
    description: 'Manage consortium governance and university onboarding',
  },
  {
    id: 'admin',
    title: 'ADMIN',
    subtitle: 'Institutional Authority Node',
    icon: '🏢',
    route: '/admin',
    description: 'Manage institutional authority and operations',
  },
  {
    id: 'wallet',
    title: 'WALLET',
    subtitle: 'Self-Sovereign Credential Hub',
    icon: '👛',
    route: '/student',
    description: 'Manage your self-sovereign credentials',
  },
  {
    id: 'verifier',
    title: 'VERIFIER',
    subtitle: 'Consortium Verification Node',
    icon: '🔍',
    route: '/verifier',
    description: 'Verify and validate credentials',
  },
];

export default function Dashboard() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F5F3FF]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="text-center mb-16">
          <div className="inline-flex rounded-full bg-[#E4DEF2] px-4 py-2 text-sm font-semibold text-[#7C3AED] mb-6 font-[family-name:var(--font-display)]">
            ChainVerify dashboard
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
            Welcome to ChainVerify
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#7A7290]">
            Smooth, secure access for each role in the blockchain verification platform.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const isHovered = hoveredRole === role.id;

            return (
              <Link key={role.id} href={role.route}>
                <div
                  className={`group h-full overflow-hidden rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-7 transition duration-300 ${
                    isHovered ? 'shadow-md' : 'shadow-sm'
                  } hover:-translate-y-0.5 hover:shadow-md`}
                  onMouseEnter={() => setHoveredRole(role.id)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-[12px] text-4xl transition ${
                    isHovered ? 'bg-[#5B21B6] text-white' : 'bg-[#E4DEF2] text-[#7C3AED]'
                  }`}>
                    {role.icon}
                  </div>

                  <div className="space-y-4 text-center">
                    <div>
                      <h2 className="text-xl font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{role.title}</h2>
                      <p className="mt-2 text-sm text-[#7A7290]">{role.subtitle}</p>
                    </div>
                    <div>
                      <span className={`inline-flex rounded-[10px] px-4 py-2 text-sm font-medium transition font-[family-name:var(--font-display)] ${
                        isHovered ? 'bg-[#5B21B6] text-white' : 'bg-[#E4DEF2] text-[#7C3AED]'
                      }`}>
                        Open portal
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Info Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12 border-t border-[#E4DEF2]">
        <div className="text-center text-[#7A7290]">
          <p className="text-sm sm:text-base">
            Select your role to access the ChainVerify system
          </p>
        </div>
      </div>
    </main>
  );
}