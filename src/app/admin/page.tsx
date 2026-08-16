'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import AdminOverview from '@/src/admin/components/AdminOverview';

const portalNavMap = {
  admin: {
    items: [
      { label: 'Admin Overview', href: '/admin' },
      { label: 'Students', href: '/admin/students' },
      { label: 'Issue Certificate', href: '/admin/issue-certificate' },
      { label: 'Consortium View', href: '/admin/consortium-view' },
    ],
  },
};

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  
  const getActiveTitle = () => {
    const items = portalNavMap.admin.items;
    const activeItem = items.find(item => item.href === pathname);
    return activeItem ? activeItem.label : 'Overview';
  };

  return (
    <main className="min-h-screen bg-[#F5F3FF] text-foreground">
      <div className={`grid min-h-screen grid-cols-1 ${isSidebarOpen ? 'lg:grid-cols-[288px_1fr]' : 'lg:grid-cols-[80px_1fr]'}`}>
        <NavBar 
          portal="admin" 
          role="University Admin" 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        <div className="flex min-w-0 flex-col">
          <Header 
            title={getActiveTitle()} 
            subtitle="Admin Portal" 
            statusLabel="Hyperledger Fabric Mainnet"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <AdminOverview />
          </div>
        </div>
      </div>
    </main>
  );
}