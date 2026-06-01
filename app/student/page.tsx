import WalletOverview from '@/src/student/components/WalletOverview';
import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';

export default function StudentPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[288px_1fr]">
        <NavBar portal="student" role="Student" />

        <div className="flex min-w-0 flex-col">
          <Header title="Overview" subtitle="Student Portal" statusLabel="Hyperledger Fabric Mainnet" />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <WalletOverview />
          </div>
        </div>
      </div>
    </main>
  );
}
