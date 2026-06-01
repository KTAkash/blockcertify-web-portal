import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';
import Link from 'next/link';

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
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[288px_1fr]">
        <NavBar portal="super-admin" role="Super Admin" />

        <div className="flex min-w-0 flex-col">
          <Header
            title="ChainVerify"
            subtitle="Super Admin Portal"
            statusLabel="Hyperledger Fabric Mainnet"
          />

          <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            <section id="overview" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Overview
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Super admin home
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Use the sidebar to open a dedicated screen for each super-admin task.
              </p>
            </section>

            <section className="grid gap-5 md:grid-cols-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-sm font-medium text-slate-500">
                    Open
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
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