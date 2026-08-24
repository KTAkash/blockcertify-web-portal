'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import { apiClient } from '@/src/apiHelper/api';
import type { StudentProfile } from '@/src/interfaces/auth';

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
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiClient.getStudentProfile();
        setProfile(data);
      } catch (loadError) {
        console.error('Failed to load student profile:', loadError);
        setError('Unable to load your profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);
  
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

              {isLoading ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-24 animate-pulse rounded-[20px] border border-surface-soft bg-[#F3F0FF]" />
                  ))}
                </div>
              ) : error ? (
                <div className="mt-8 rounded-[20px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
                  {error}
                </div>
              ) : profile ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <ProfileField label="Name" value={`${profile.firstName} ${profile.lastName}`} />
                  <ProfileField label="Student ID" value={profile.indexNo} />
                  <ProfileField label="Email" value={profile.email} />
                  <ProfileField label="Mobile number" value={profile.mobileNo} />
                  <ProfileField label="Gender" value={profile.gender} />
                  <ProfileField label="Role" value={profile.role} />
                  <ProfileField label="Account created" value={new Date(profile.createdAt).toLocaleDateString()} />
                </div>
              ) : null}

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

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-surface-soft bg-[#F3F0FF] p-5">
      <div className="text-sm font-medium text-muted">{label}</div>
      <div className="mt-2 break-words text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}
