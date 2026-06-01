import Header from '@/src/components/Header/index';
import NavBar from '@/src/components/NavBar/index';

export default function StudentProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[288px_1fr]">
        <NavBar portal="student" role="Student" />

        <div className="flex min-w-0 flex-col">
          <Header title="Profile" subtitle="Student account settings" statusLabel="Hyperledger Fabric Mainnet" />

          <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Student profile</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Manage your account details, credential sharing settings, and secure access preferences.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  Profile overview
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-medium text-slate-500">Name</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">Alex Johnson</div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-medium text-slate-500">Student ID</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">STU-101</div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-medium text-slate-500">Email</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">alex.johnson@example.com</div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-medium text-slate-500">Account status</div>
                  <div className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    Active
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Security settings</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
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
