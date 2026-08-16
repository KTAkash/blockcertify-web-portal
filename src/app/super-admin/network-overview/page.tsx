'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import NetworkOverview from '@/src/super-admin/components/NetworkOverview';

const portalNavMap = {
  'super-admin': {
    items: [
      { label: 'Network Overview', href: '/super-admin/network-overview' },
      { label: 'Consortium Registry', href: '/super-admin/consortium' },
      { label: 'Geo-Distributed Nodes', href: '/super-admin/nodes' },
    ],
  },
};

export default function NetworkOverviewPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  
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

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <NetworkOverview />
          </div>
        </div>
      </div>
    </main>
  );
}