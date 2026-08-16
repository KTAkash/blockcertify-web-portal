'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/src/Dashboard/page';

const SESSION_KEY = 'blockcertify-session';

export default function DashboardRoute() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = window.localStorage.getItem(SESSION_KEY);
    if (!session) {
      router.replace('/');
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return <div className="min-h-screen bg-[#F5F3FF]" />;
  }

  return <Dashboard />;
}