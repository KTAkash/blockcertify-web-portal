type StatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-8 flex items-start justify-between">
        <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          {label}
        </div>
        <div className="rounded-xl bg-slate-50 p-2 text-slate-500">{icon}</div>
      </div>
      <div className="text-[30px] font-bold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}

function KeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 10H21V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 13V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="2" />
      <path d="M4 5V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V5" stroke="currentColor" strokeWidth="2" />
      <path d="M4 12V19C4 20.66 7.58 22 12 22C16.42 22 20 20.66 20 19V12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2L5 5V11C5 16 8.5 20.5 12 22C15.5 20.5 19 16 19 11V5L12 2Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const stats = [
  { label: 'Total Issued', value: '1', icon: <KeyIcon /> },
  { label: 'Active Nodes', value: '2', icon: <DatabaseIcon /> },
  { label: 'Network Load', value: '12%', icon: <ShieldIcon /> },
  { label: 'Last Block', value: '#892KB', icon: <ShieldIcon /> },
];

function EndpointIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type CertificateRow = {
  student: string;
  id: string;
  credential: string;
  issueDate: string;
  status: 'Active' | 'Pending' | 'Revoked';
};

const certificates: CertificateRow[] = [
  {
    student: 'Alex Johnson',
    id: 'STU-101',
    credential: 'Bachelor of Computer Science',
    issueDate: '2024-03-15',
    status: 'Active',
  },
  {
    student: 'Maria Garcia',
    id: 'STU-142',
    credential: 'Master of Data Science',
    issueDate: '2024-04-02',
    status: 'Pending',
  },
  {
    student: 'David Kim',
    id: 'STU-203',
    credential: 'Diploma in Cybersecurity',
    issueDate: '2024-04-18',
    status: 'Revoked',
  },
];

function StatusPill({ status }: { status: CertificateRow['status'] }) {
  const classes =
    status === 'Active'
      ? 'bg-emerald-50 text-emerald-600'
      : status === 'Pending'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-rose-50 text-rose-600';

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${classes}`}>
      {status}
    </span>
  );
}

export default function NetworkOverview() {
  return (
    <section className="space-y-6" id="overview">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <KeyIcon />
            </span>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Credential Keys</h3>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  PUB_KEY_ED25519_2024
                </div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  Cryptographic material used for signing multi-institution credentials across the consortium.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold uppercase tracking-[0.12em] text-emerald-600">
                Active
              </span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.18)] transition-colors hover:bg-blue-700">
            Rotate Authority Keys
          </button>
        </div>

        <div id="nodes" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <EndpointIcon />
            </span>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Node Connectivity</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Endpoint</span>
              <span className="text-sm font-medium text-slate-700">peer0.tech-uni.fabric.net</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Status</span>
              <span className="text-sm font-bold uppercase tracking-[0.12em] text-emerald-600">Consensus Reached</span>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span>Connection Strength</span>
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
                    <StatusPill status={certificate.status} />
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