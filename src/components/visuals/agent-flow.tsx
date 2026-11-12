import { Plate } from "@/components/visuals/plate";

const trace = [
  { index: "01", step: "Supervisor classified the document", meta: "route: invoice_reconciliation" },
  { index: "02", step: "get_open_purchase_orders", meta: "PO-1078 · limit $25,000" },
  { index: "03", step: "submit_invoice_reconciliation", meta: "5 discrepancies · pending review" },
];

export function AgentFlow() {
  return (
    <Plate
      label={
        <>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-ink-muted">
            Fig. 04 — agent routing
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/60">
            Supervisor + tools
          </span>
        </>
      }
      caption="From the OpsNexus build. The supervisor chooses a route; specialist tools do the deterministic work; the trace stays attached to the document."
    >
      <div className="px-5 py-7 sm:px-7">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1.25fr_auto_1.1fr] lg:items-center">
          <div className="rounded-[2px] border border-white/15 p-4">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/60">
              Input
            </p>
            <p className="mt-2 text-[0.8125rem] text-on-ink">
              Invoice · log · questionnaire
            </p>
            <p className="mt-1 font-mono text-[0.625rem] text-on-ink-muted">
              pdf / docx / csv / txt
            </p>
          </div>

          <Arrow />

          <div className="rounded-[2px] border border-accent/50 bg-accent/[0.07] p-4">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-accent">
              Supervisor
            </p>
            <p className="mt-2 text-[0.8125rem] text-on-ink">
              Classifies, then routes
            </p>
            <p className="mt-1 font-mono text-[0.625rem] text-on-ink-muted">
              structured output · strict schema
            </p>
          </div>

          <Arrow />

          <div className="space-y-2">
            {[
              "Purchase-order lookup",
              "Policy retrieval",
              "Line-item reconciliation",
            ].map((tool) => (
              <div
                key={tool}
                className="flex items-center justify-between gap-3 rounded-[2px] border border-white/12 px-3 py-2"
              >
                <span className="text-[0.75rem] text-on-ink-muted">{tool}</span>
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full border border-accent/70"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/60">
            Execution trace
          </p>
          <ol className="mt-3 grid gap-2 lg:grid-cols-3">
            {trace.map((item) => (
              <li
                key={item.index}
                className="flex gap-3 border-l border-white/15 pl-3"
              >
                <span className="font-mono text-[0.625rem] text-accent">
                  {item.index}
                </span>
                <div>
                  <p className="text-[0.75rem] leading-snug text-on-ink">
                    {item.step}
                  </p>
                  <p className="mono mt-1 text-[0.5625rem] tracking-[0.04em] text-white/60">
                    {item.meta}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-on-ink-muted">
          Output — discrepancies found · payment pending review · audit payload stored
        </p>
      </div>
    </Plate>
  );
}

function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="hidden items-center justify-center lg:flex"
    >
      <span className="h-px w-8 bg-white/20" />
      <span className="-ml-1 size-1.5 rotate-45 border-r border-t border-white/30" />
    </div>
  );
}
