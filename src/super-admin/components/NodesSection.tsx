const nodes = [
  {
    name: 'peer0.tech-uni.fabric.net',
    region: 'Silicon Valley',
    status: 'Consensus Reached',
    latency: '24 ms',
  },
  {
    name: 'peer0.global-arts.fabric.net',
    region: 'London',
    status: 'Syncing',
    latency: '31 ms',
  },
  {
    name: 'peer0.nat-med.fabric.net',
    region: 'Berlin',
    status: 'Online',
    latency: '27 ms',
  },
];

export default function NodesSection() {
  return (
    <section className="space-y-6" id="nodes">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Network
        </p>
        <h2 className="mt-2 text-[28px] font-black tracking-tight text-slate-900">
          Geo-Distributed Nodes
        </h2>
        <p className="mt-1 max-w-2xl text-[15px] text-slate-500">
          Track regional peers and health status across the consortium.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {nodes.map((node) => (
          <article key={node.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-900">{node.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {node.region}
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-600">
                {node.status}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">Latency</p>
                <p className="mt-2 text-[18px] font-bold text-slate-900">{node.latency}</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">Health</p>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: node.status === 'Syncing' ? '72%' : '90%' }} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}