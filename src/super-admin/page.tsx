'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import Link from 'next/link';

const portalNavMap = {
  'super-admin': {
    items: [
      { label: 'Network Overview', href: '/super-admin/network-overview' },
      { label: 'Consortium Registry', href: '/super-admin/consortium' },
      { label: 'Geo-Distributed Nodes', href: '/super-admin/nodes' },
    ],
  },
};

const quickLinks = [
  {
    title: 'Network Overview',
    description: 'View network health, nodes, and key issuance status.',
    href: '/super-admin/network-overview',
  },
  {
    title: 'Consortium Registry',
    description: 'Manage institutions and onboarding records.',
    href: '/super-admin/consortium',
  },
  {
    title: 'Geo-Distributed Nodes',
    description: 'Inspect peer connectivity and node latency.',
    href: '/super-admin/nodes',
  },
];

export default function SuperAdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  
  // Get active page title
  const getActiveTitle = () => {
    const items = portalNavMap['super-admin'].items;
    const activeItem = items.find(item => item.href === pathname);
    return activeItem ? activeItem.label : 'ChainVerify';
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
            title={getActiveTitle()} 
            subtitle="Super Admin Portal" 
            statusLabel="Hyperledger Fabric Mainnet"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <section id="overview" className="rounded-[20px] border border-surface-soft bg-surface p-6 shadow-sm">
              <p className="text-sm font-medium text-muted">
                Overview
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground font-[family-name:var(--font-display)]">
                Super admin home
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Use the sidebar to open a dedicated screen for each super-admin task.
              </p>
            </section>

            <section className="grid gap-5 md:grid-cols-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[20px] border border-surface-soft bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-sm font-medium text-muted">
                    Open
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground font-[family-name:var(--font-display)]">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {link.description}
                  </p>
                </Link>
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}