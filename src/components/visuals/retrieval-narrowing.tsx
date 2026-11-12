import { Plate } from "@/components/visuals/plate";

const rows = [
  { label: "Full corpus", width: "100%", tone: "bg-white/15" },
  { label: "Hybrid candidates", width: "62%", tone: "bg-white/25" },
  { label: "Reranked passages", width: "30%", tone: "bg-accent/45" },
  { label: "Cited claims", width: "12%", tone: "bg-accent" },
];

export function RetrievalNarrowing() {
  return (
    <Plate
      label={
        <>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-ink-muted">
            Fig. 05 — retrieval funnel
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/60">
            Conceptual
          </span>
        </>
      }
      caption="The shape of a grounded retrieval pipeline. Widths are illustrative: each stage exists to make the next one smaller and more defensible."
    >
      <div className="px-5 py-7 sm:px-7">
        <ol className="space-y-5">
          {rows.map((row, i) => (
            <li key={row.label} className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-on-ink-muted">
                    {row.label}
                  </span>
                  <span className="font-mono text-[0.5625rem] tracking-[0.08em] text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="h-6 w-full border-l border-white/10">
                  <div className={`h-full ${row.tone}`} style={{ width: row.width }} />
                </div>
              </div>
              <span
                aria-hidden="true"
                className="font-mono text-[0.5625rem] tracking-[0.1em] text-white/60"
              >
                ↓
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Plate>
  );
}
