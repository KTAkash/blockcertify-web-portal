'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';

const portalNavMap = {
  student: {
    items: [
      { label: 'My Wallet', href: '/student' },
      { label: 'Profile', href: '/student/profile' },
    ],
  },
};

export default function StudentProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  
  const getActiveTitle = () => {
    const items = portalNavMap.student.items;
    const activeItem = items.find(item => item.href === pathname);
    return activeItem ? activeItem.label : 'Profile';
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
            subtitle="Student account settings" 
            statusLabel="Hyperledger Fabric Mainnet"
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <section className="rounded-[20px] border border-surface-soft bg-surface p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground font-[family-name:var(--font-display)]">Student profile</h2>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Manage your account details, credential sharing settings, and secure access preferences.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-2 text-sm font-medium text-foreground">
                  Profile overview
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-[20px] border border-surface-soft bg-[#F3F0FF] p-5">
                  <div className="text-sm font-medium text-muted">Name</div>
                  <div className="mt-2 text-lg font-semibold text-foreground">Alex Johnson</div>
                </div>
                <div className="rounded-[20px] border border-surface-soft bg-[#F3F0FF] p-5">
                  <div className="text-sm font-medium text-muted">Student ID</div>
                  <div className="mt-2 text-lg font-semibold text-foreground">STU-101</div>
                </div>
                <div className="rounded-[20px] border border-surface-soft bg-[#F3F0FF] p-5">
                  <div className="text-sm font-medium text-muted">Email</div>
                  <div className="mt-2 text-lg font-semibold text-foreground">alex.johnson@example.com</div>
                </div>
                <div className="rounded-[20px] border border-surface-soft bg-[#F3F0FF] p-5">
                  <div className="text-sm font-medium text-muted">Account status</div>
                  <div className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    Active
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[20px] border border-surface-soft bg-[#F3F0FF] p-6">
                <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-display)]">Security settings</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Keep your account secure with multi-factor authentication and access approvals for new devices.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}