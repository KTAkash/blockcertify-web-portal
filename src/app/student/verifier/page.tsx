'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import VerifierOverview from '@/src/student/components/VerifierOverview';

const portalNavMap = {
  student: {
    items: [
      { label: 'My Wallet', href: '/student' },
      { label: 'Verifier', href: '/student/verifier' },
    ],
  },
};

export default function StudentVerifierPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  
  const getActiveTitle = () => {
    const items = portalNavMap.student.items;
    const activeItem = items.find(item => item.href === pathname);
    return activeItem ? activeItem.label : 'Verifier';
  };

  return (
    <main className="min-h-screen bg-[#F5F3FF] text-foreground">
      <div className={`grid min-h-screen grid-cols-1 ${isSidebarOpen ? 'lg:grid-cols-[288px_1fr]' : 'lg:grid-cols-[80px_1fr]'}`}>
        <NavBar 
          portal="student" 
          role="Student" 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        <div className="flex min-w-0 flex-col">
          <Header 
            title={getActiveTitle()} 
            subtitle="Student Portal" 
            statusLabel="Hyperledger Fabric Mainnet"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <VerifierOverview />
          </div>
        </div>
      </div>
    </main>
  );
}