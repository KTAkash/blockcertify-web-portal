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
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A7290] font-[family-name:var(--font-display)]">
          Network
        </p>
        <h2 className="mt-2 text-[28px] font-black tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">
          Geo-Distributed Nodes
        </h2>
        <p className="mt-1 max-w-2xl text-[15px] text-[#7A7290]">
          Track regional peers and health status across the consortium.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {nodes.map((node) => (
          <article key={node.name} className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-[0_10px_30px_rgba(29,19,48,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">{node.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#7A7290] font-[family-name:var(--font-display)]">
                  {node.region}
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-600 font-[family-name:var(--font-display)]">
                {node.status}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E4DEF2] pt-5">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A7290] font-[family-name:var(--font-display)]">Latency</p>
                <p className="mt-2 text-[18px] font-bold text-[#1D1330] font-[family-name:var(--font-display)]">{node.latency}</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A7290] font-[family-name:var(--font-display)]">Health</p>
                <div className="mt-3 h-2 rounded-full bg-[#E4DEF2]">
                  <div className="h-2 rounded-full bg-[#5B21B6]" style={{ width: node.status === 'Syncing' ? '72%' : '90%' }} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}