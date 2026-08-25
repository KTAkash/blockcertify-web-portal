"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type PortalNavConfig = {
  items: NavItem[];
  userName: string;
  userStatus: string;
  userInitials: string;
};

type NavBarProps = {
  portal: 'super-admin' | 'admin' | 'student' | 'verifier';
  role: string;
  isOpen: boolean;
  onToggle: () => void;
};

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14H20V20H14V14Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RegistryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 5H20V19H4V5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M8 9H16M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 3C15.5 6.5 15.5 17.5 12 21C8.5 17.5 8.5 6.5 12 3Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PlusCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 7H4V17H20V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 9H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20C4 15.58 7.58 12 12 12C16.42 12 20 15.58 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FlowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="6.5" ry="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 5V12C5.5 13.38 8.41 14.5 12 14.5C15.59 14.5 18.5 13.38 18.5 12V5" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 12V19C5.5 20.38 8.41 21.5 12 21.5C15.59 21.5 18.5 20.38 18.5 19V12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20C4 15.58 7.58 12 12 12C16.42 12 20 15.58 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifierIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StudentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const portalNavMap: Record<NavBarProps['portal'], PortalNavConfig> = {
  'super-admin': {
    userName: 'Super Admin',
    userStatus: 'Connected',
    userInitials: 'SA',
    items: [
      { label: 'Network Overview', href: '/super-admin/network-overview', icon: <GridIcon /> },
      { label: 'Consortium Registry', href: '/super-admin/consortium', icon: <RegistryIcon /> },
      { label: 'Geo-Distributed Nodes', href: '/super-admin/nodes', icon: <GlobeIcon /> },
      { label: 'Student Certificates', href: '/super-admin/student-certificates', icon: <StudentIcon /> },
    ],
  },
  admin: {
    userName: 'University Admin',
    userStatus: 'Connected',
    userInitials: 'U',
    items: [
      { label: 'Admin Overview', href: '/admin', icon: <GridIcon /> },
      { label: 'Students', href: '/admin/students', icon: <UserIcon /> },
      { label: 'Issue Certificate', href: '/admin/issue-certificate', icon: <PlusCircleIcon /> },
      { label: 'Consortium View', href: '/admin/consortium-view', icon: <GlobeIcon /> },
    ],
  },
  student: {
    userName: 'Student',
    userStatus: 'Connected',
    userInitials: 'S',
    items: [
      { label: 'My Wallet', href: '/student', icon: <WalletIcon /> },
      { label: 'Verifier', href: '/student/verifier', icon: <VerifierIcon /> },
    ],
  },
  verifier: {
    userName: 'Verifier',
    userStatus: 'Online',
    userInitials: 'V',
    items: [
      { label: 'Verification Queue', href: '/verifier', icon: <GridIcon /> },
    ],
  },
};

export default function NavBar({ portal, role, isOpen, onToggle }: NavBarProps) {
  const config = portalNavMap[portal];
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside 
        className={`
          fixed lg:static z-50 h-full flex flex-col border-r border-[#E4DEF2]/50 bg-transparent shadow-lg transition-all duration-300
          ${isOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-16'}
        `}
      >
        <div className={`px-5 py-5 ${!isOpen ? 'lg:px-0' : ''}`}>
          <div className="mb-6 flex items-center justify-between">
            <div className={`${isOpen ? 'block' : 'lg:hidden'}`}>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-muted font-[family-name:var(--font-display)]">
                {role}
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight text-foreground font-[family-name:var(--font-display)]">
                Portal menu
              </div>
            </div>
            <button 
              onClick={onToggle}
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-foreground transition-colors hover:bg-surface-soft ${isOpen ? 'hidden lg:flex' : 'mx-auto'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d={`${isOpen ? 'M15 18L9 12L15 6' : 'M9 18L15 12L9 6'}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <nav className="space-y-3">
            {config.items.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-medium transition-colors font-[family-name:var(--font-display)] ${
                    active
                      ? 'bg-surface text-[#5B21B6] shadow-sm border border-surface-soft'
                      : 'text-muted hover:bg-surface/50 hover:text-foreground'
                  } ${!isOpen ? 'lg:justify-center lg:px-2' : ''}`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl flex-shrink-0 ${
                      active ? 'bg-[#E4DEF2] text-[#5B21B6]' : 'bg-surface text-accent'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className={`leading-tight ${isOpen ? 'block' : 'lg:hidden'}`}>
                    {item.label}
                  </span>
                  <span className={`ml-auto text-current/60 ${isOpen ? 'block' : 'lg:hidden'}`}>
                    <ChevronIcon />
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={`mt-auto border-t border-[#E4DEF2]/50 p-5 ${!isOpen ? 'lg:px-0' : ''}`}>
          <div className={`flex items-center gap-3 rounded-2xl bg-surface px-4 py-4 shadow-sm border border-surface-soft ${!isOpen ? 'lg:justify-center lg:px-2' : ''}`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-sm font-bold text-accent font-[family-name:var(--font-display)] flex-shrink-0">
              {config.userInitials}
            </div>
            <div className={`${isOpen ? 'block' : 'lg:hidden'}`}>
              <div className="text-sm font-semibold text-foreground font-[family-name:var(--font-display)]">{config.userName}</div>
              <div className="text-xs text-muted">{config.userStatus}</div>
            </div>
          </div>

          <Link href="/" className={`mt-4 flex w-full items-center justify-start gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface/50 hover:text-foreground font-[family-name:var(--font-display)] ${!isOpen ? 'lg:justify-center lg:px-2' : ''}`}>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-surface flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M21 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className={`${isOpen ? 'block' : 'lg:hidden'}`}>Log out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
