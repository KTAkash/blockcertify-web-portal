import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import IssueCertificateSection from '@/src/admin/components/IssueCertificateSection';

export default function AdminIssueCertificatePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[288px_1fr]">
        <NavBar portal="admin" role="University Admin" />
        
        <div className="flex min-w-0 flex-col">
          <Header title="Issue" statusLabel="Hyperledger Fabric Mainnet" />
        
          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <IssueCertificateSection />
          </div>
        </div>
      </div>
    </main>
  );
}