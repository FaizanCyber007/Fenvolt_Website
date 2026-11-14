import { cn } from "@/lib/utils";

const specterLanes = [
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

const parserPhases = [
  { title: "Triage", body: "File type, text layer and language are read before a parser is chosen." },
  { title: "Layout", body: "DocLayout-YOLO separates headings, body, tables and footnotes." },
  { title: "OCR routing", body: "Local OCR first; cloud or vision model only where quality demands it." },
  { title: "Section tagging", body: "A model assigns semantic sections; every block keeps its page number." },
  { title: "Metadata", body: "Case number, parties, dates and citations extracted to a typed schema." },
  { title: "Citation graph", body: "Deterministic regex extraction. No model in the loop for citations." },
  { title: "Correction", body: "Five detectors re-check structure, anchors and citation validity." },
];

const trace = [
  {
    step: "Supervisor classified the document",
    meta: "route: invoice_reconciliation",
  },
  { step: "get_open_purchase_orders", meta: "PO-1078 · limit $25,000" },
  {
    step: "submit_invoice_reconciliation",
    meta: "5 discrepancies · pending review",
  },
];

export function CaseFigure({ variant }: { variant: "specter" | "parser" | "agents" }) {
  if (variant === "specter") {
    return (
      <figure className="border border-rule-soft bg-[#0d0d0c]">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft px-5 py-3 md:px-7">
          <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            Fig. 02 — SPECTER system map
          </span>
          <span className="mono text-[0.75rem] uppercase tracking-[0.12em] text-muted-faint">
            Five lanes
          </span>
        </div>

        <div className="grid grid-cols-2 gap-px bg-rule-soft sm:grid-cols-3 lg:grid-cols-5">
          {specterLanes.map((lane, laneIndex) => (
            <div key={lane.label} className="bg-[#0d0d0c] p-4 md:p-5">
              <div className="flex items-baseline justify-between gap-2 border-b border-rule-soft pb-3">
                <span className="text-[0.75rem] text-ink">
                  {String(laneIndex + 1).padStart(2, "0")} {lane.label}
                </span>
              </div>
              <p className="mono mt-2 text-[0.5rem] uppercase tracking-[0.1em] text-muted-faint">
                {lane.note}
              </p>
              <ul className="mt-3">
                {lane.nodes.map((node) => (
                  <li
                    key={node}
                    className="border-t border-rule-soft py-2 text-[0.75rem] leading-tight text-muted last:border-b"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule-soft px-5 py-3 md:px-7">
          <span className="mono text-[0.5rem] uppercase tracking-[0.14em] text-muted-faint">
            Cross-cutting
          </span>
          {[
            "Clerk sign-in",
            "Per-matter access",
            "Row-level security",
            "Per-firm key",
            "PII masked in logs",
          ].map((item) => (
            <span key={item} className="text-[0.75rem] text-muted">
              {item}
            </span>
          ))}
        </div>
      </figure>
    );
  }

  if (variant === "parser") {
    return (
      <figure className="border border-rule-soft bg-[#0d0d0c]">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft px-5 py-3 md:px-7">
          <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            Fig. 03 — parsing pipeline
          </span>
          <span className="mono text-[0.75rem] uppercase tracking-[0.12em] text-muted-faint">
            Seven phases
          </span>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-7">
          {parserPhases.map((phase, i) => (
            <li
              key={phase.title}
              className={cn(
                "border-b border-rule-soft p-4 sm:border-r lg:border-b-0 lg:last:border-r-0",
                i === 6 && "bg-ink/[0.035]",
              )}
            >
              <span className="mono text-[0.75rem] text-muted-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[0.8125rem] leading-tight text-ink">{phase.title}</h3>
              <p className="mt-2 text-[0.75rem] leading-[1.5] text-muted">{phase.body}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule-soft px-5 py-3 md:px-7">
          <span className="mono text-[0.5rem] uppercase tracking-[0.12em] text-muted-faint">
            Failed check returns to 03
          </span>
          <span className="mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">
            Deterministic citation graph
          </span>
        </div>
      </figure>
    );
  }

  return (
    <figure className="border border-rule-soft bg-[#0d0d0c]">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft px-5 py-3 md:px-7">
        <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
          Fig. 04 — agent routing
        </span>
        <span className="mono text-[0.75rem] uppercase tracking-[0.12em] text-muted-faint">
          Supervisor + tools
        </span>
      </div>

      <div className="p-5 md:p-7">
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1.3fr_auto_1.1fr] md:items-center">
          <div className="border border-rule-soft p-4">
            <p className="mono text-[0.5rem] uppercase tracking-[0.14em] text-muted-faint">
              Input
            </p>
            <p className="mt-2 text-[0.8125rem] text-ink">
              Invoice · log · questionnaire
            </p>
            <p className="mono mt-1 text-[0.75rem] text-muted">pdf / docx / csv / txt</p>
          </div>

          <span aria-hidden="true" className="hidden h-px w-6 bg-rule-strong md:block" />

          <div className="border border-rule-strong bg-ink/[0.05] p-4">
            <p className="mono text-[0.5rem] uppercase tracking-[0.14em] text-muted">
              Supervisor
            </p>
            <p className="mt-2 text-[0.8125rem] text-ink">Classifies, then routes</p>
            <p className="mono mt-1 text-[0.75rem] text-muted">
              structured output · strict schema
            </p>
          </div>

          <span aria-hidden="true" className="hidden h-px w-6 bg-rule-strong md:block" />

          <ul className="space-y-1.5">
            {["Purchase-order lookup", "Policy retrieval", "Line-item reconciliation"].map(
              (tool) => (
                <li
                  key={tool}
                  className="flex items-center justify-between gap-3 border border-rule-soft px-3 py-2 text-[0.75rem] text-muted"
                >
                  {tool}
                  <span className="size-1 rounded-full bg-ink/50" />
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="mt-6 border-t border-rule-soft pt-5">
          <p className="mono text-[0.5rem] uppercase tracking-[0.14em] text-muted-faint">
            Execution trace
          </p>
          <ol className="mt-3 grid gap-3 md:grid-cols-3">
            {trace.map((item, i) => (
              <li key={item.step} className="border-l border-rule-strong pl-3">
                <span className="mono text-[0.75rem] text-muted-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-[0.75rem] leading-snug text-ink">{item.step}</p>
                <p className="mono mt-1 text-[0.75rem] text-muted">{item.meta}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mono mt-5 border-t border-rule-soft pt-4 text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Output — discrepancies found · payment pending review · audit payload stored
        </p>
      </div>
    </figure>
  );
}
