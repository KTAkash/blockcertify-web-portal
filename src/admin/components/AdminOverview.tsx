type StatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div className="text-sm font-medium text-slate-500">{label}</div>
        <div className="rounded-xl bg-slate-50 p-2 text-slate-500">{icon}</div>
      </div>
      <div className="text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L5 5V11C5 16 8.5 20.5 12 22C15.5 20.5 19 16 19 11V5L12 2Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 11.5L11.2 13.2L14.5 9.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 3C15.5 6.5 15.5 17.5 12 21C8.5 17.5 8.5 6.5 12 3Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="6.5" ry="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 5V12C5.5 13.38 8.41 14.5 12 14.5C15.59 14.5 18.5 13.38 18.5 12V5" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 12V19C5.5 20.38 8.41 21.5 12 21.5C15.59 21.5 18.5 20.38 18.5 19V12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 3L16 7L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 13L8 17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const stats = [
  { label: 'Total Issued', value: '1', icon: <ShieldIcon /> },
  { label: 'Active Nodes', value: '2', icon: <GlobeIcon /> },
  { label: 'Network Load', value: '12%', icon: <DatabaseIcon /> },
  { label: 'Last Block', value: '#892KB', icon: <ShieldIcon /> },
];

const certificates = [
  {
    student: 'Alex Johnson',
    id: 'STU-101',
    credential: 'Bachelor of Computer Science',
    issueDate: '2024-03-15',
    status: 'Active',
  },
];

export default function AdminOverview() {
  return (
    <section className="space-y-6" id="overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ShieldIcon />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">Credential keys</h3>
          </div>

          <div className="rounded-3xl bg-slate-50 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-500">PUB_KEY_ED25519_2024</div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  Cryptographic material used for signing multi-institution credentials across the consortium.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                Active
              </span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800">
            Rotate authority keys
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ArrowsIcon />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">Node connectivity</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <span className="text-sm font-medium text-slate-500">Endpoint</span>
              <span className="text-sm font-medium text-slate-700">peer0.tech-uni.fabric.net</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <span className="text-sm font-medium text-slate-500">Status</span>
              <span className="text-sm font-semibold text-emerald-600">Consensus reached</span>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Connection strength</span>
                <span>75%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[75%] rounded-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]" id="credentials">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <h3 className="text-lg font-bold tracking-tight text-slate-900">Issued Certificates</h3>
          <button className="text-sm font-bold uppercase tracking-[0.14em] text-blue-600 transition-colors hover:text-blue-700">
            Download Registry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Credential</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id} className="border-b border-slate-50 last:border-b-0">
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-900">{certificate.student}</div>
                    <div className="text-sm text-slate-400">{certificate.id}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">{certificate.credential}</td>
                  <td className="px-6 py-5 text-sm text-slate-600">{certificate.issueDate}</td>
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-600">
                      {certificate.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50">
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}