import { Plate } from "@/components/visuals/plate";

const lanes = [
  {
    label: "Sources",
    note: "what arrives",
    nodes: ["Scanned FIRs", "Judgment PDFs", "Court records", "Statutes"],
  },
  {
    label: "Ingestion",
    note: "file → text",
    nodes: ["Type triage", "OCR / VLM pass", "Layout + tables", "Urdu → English"],
  },
  {
    label: "Index",
    note: "text → vectors",
    nodes: ["Structure chunking", "Embeddings", "Vector index", "Page anchor"],
  },
  {
    label: "Retrieval",
    note: "query → evidence",
    nodes: ["Hybrid search", "Rerank + cut", "Model routing", "Citation check"],
  },
  {
    label: "Application",
    note: "evidence → answer",
    nodes: ["Ask + court filters", "Matter + diary", "Source viewer", "Lawyer review"],
  },
];

export function SpecterArchitecture() {
  return (
    <Plate
      label={
        <>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-ink-muted">
            Fig. 02 — SPECTER system map
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/60">
            Five lanes
          </span>
        </>
      }
      caption="Simplified from the project's service layout. The page anchor is created at ingestion and is required again before an answer is returned."
    >
      <div
        className="overflow-x-auto"
        role="region"
        aria-label="SPECTER architecture diagram. Scroll horizontally on narrow screens."
        tabIndex={0}
      >
        <div className="min-w-[920px] px-5 py-7 sm:px-7">
          <div className="grid grid-cols-5 gap-px bg-white/10">
            {lanes.map((lane, laneIndex) => (
              <div key={lane.label} className="relative bg-[#0b1118] p-4">
                <div className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-on-ink">
                    {String(laneIndex + 1).padStart(2, "0")} {lane.label}
                  </span>
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-white/60">
                    {lane.note}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {lane.nodes.map((node) => (
                    <li
                      key={node}
                      className="flex items-center justify-between gap-2 rounded-[2px] border border-white/10 px-2.5 py-2 text-[0.6875rem] leading-tight text-on-ink-muted"
                    >
                      {node}
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-accent/60"
                      />
                    </li>
                  ))}
                </ul>
                {laneIndex < lanes.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute -right-1 top-1/2 hidden h-2 w-2 rotate-45 border-r border-t border-white/30"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border border-dashed border-white/15 px-4 py-3">
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/60">
              Cross-cutting
            </span>
            {[
              "Clerk sign-in",
              "Per-matter access",
              "Row-level security",
              "Per-firm key",
              "PII masked in logs",
            ].map((item) => (
              <span
                key={item}
                className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-on-ink-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Plate>
  );
}
