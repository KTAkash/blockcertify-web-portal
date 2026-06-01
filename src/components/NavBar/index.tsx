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

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    ],
  },
  admin: {
    userName: 'University Admin',
    userStatus: 'Connected',
    userInitials: 'U',
    items: [
      { label: 'Admin Overview', href: '/admin', icon: <GridIcon /> },
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
      { label: 'Profile', href: '/student/profile', icon: <ProfileIcon /> },
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

export default function NavBar({ portal, role }: NavBarProps) {
  const config = portalNavMap[portal];
  const pathname = usePathname();

  return (
    <aside className="flex min-h-full w-full flex-col border-r border-slate-200 bg-[#f8fafc]">
      <div className="px-5 py-5">
        <div className="mb-6">
          <div className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            {role}
          </div>
          <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Portal menu
          </div>
        </div>

        <nav className="space-y-3">
          {config.items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-slate-100 text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    active ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="leading-tight text-slate-700">
                  {item.label}
                </span>
                <span className="ml-auto text-current/60">
                  <ChevronIcon />
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-200 p-5">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {config.userInitials}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">{config.userName}</div>
            <div className="text-xs text-slate-500">{config.userStatus}</div>
          </div>
        </div>

        <Link href="/" className="mt-4 flex w-full items-center justify-start gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          Log out
        </Link>
      </div>
    </aside>
  );
}
