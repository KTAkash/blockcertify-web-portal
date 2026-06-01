import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import NetworkOverview from '@/src/super-admin/components/NetworkOverview';

export default function NetworkOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[288px_1fr]">
        <NavBar portal="super-admin" role="Super Admin" />

        <div className="flex min-w-0 flex-col">
          <Header title="ChainVerify" subtitle="Super Admin Portal" statusLabel="Hyperledger Fabric Mainnet" />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <NetworkOverview />
          </div>
        </div>
      </div>
    </main>
  );
}