import { cn } from "@/lib/utils";

const parserPhases = [
  "Triage",
  "Layout",
  "OCR",
  "Sections",
  "Metadata",
  "Citations",
  "Correct",
] as const;

/**
 * Monochrome technical plates, drawn rather than photographed. They carry the
 * project's actual structure (seven phases, a routing table) and behave like
 * the manuals a studio would print alongside a system.
 */
export function ProjectPlate({
  visual,
  className,
}: {
  visual: "specter" | "parser" | "agents";
  className?: string;
}) {
  if (visual === "parser") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-[#161615] p-5 sm:p-7",
          className,
        )}
      >
        <div className="flex items-baseline justify-between gap-4 border-b border-rule-soft pb-3">
          <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            2014LHC1525.pdf
          </span>
          <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-faint">
            24 pages
          </span>
        </div>

        <div className="my-6">
          <div className="relative grid grid-cols-7 gap-px">
            {parserPhases.map((phase, i) => (
              <div key={phase} className="flex flex-col justify-end">
                <div
                  className={cn(
                    "w-full border-t",                      i === 6 ? "border-ink bg-ink/[0.14]" : "border-ink/30 bg-ink/[0.055]",
                  )}
                  style={{ height: `${46 + i * 9}px` }}
                />
                <span className="mono mt-2 text-[0.5rem] uppercase tracking-[0.08em] text-muted-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[0.75rem] leading-tight text-muted">
                  {phase}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="mono text-[0.5rem] uppercase tracking-[0.12em] text-muted-faint">
              Failed check
            </span>
            <span className="h-px flex-1 border-t border-dashed border-rule-strong" />
            <span className="mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">
              → OCR routing
            </span>
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-rule-soft pt-3">
          <span className="text-[0.75rem] text-muted-strong">Seven phases</span>
          <span className="mono text-[0.75rem] uppercase tracking-[0.1em] text-muted">
            Self-correction
          </span>
        </div>
      </div>
    );
  }

  if (visual === "agents") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-[#161615] p-5 sm:p-7",
          className,
        )}
      >
        <div className="flex items-baseline justify-between gap-4 border-b border-rule-soft pb-3">
          <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-muted">
            Document intake
          </span>
          <span className="mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-faint">
            Supervisor
          </span>
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr_auto_1.15fr] items-center gap-2 sm:gap-3">
          <ul className="space-y-1.5">
            {["Invoice", "Security log", "Questionnaire"].map((item) => (
              <li
                key={item}
                className="border border-rule-soft px-2 py-1.5 text-[0.75rem] uppercase tracking-[0.08em] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <span className="h-px w-3 bg-rule-strong sm:w-5" />

          <div className="border border-rule-strong bg-ink/[0.06] p-2.5">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-ink">
              Route
            </p>
            <p className="mt-1 text-[0.5rem] leading-tight text-muted">
              classify
            </p>
          </div>

          <span className="h-px w-3 bg-rule-strong sm:w-5" />

          <ul className="space-y-1.5">
            {["Tools", "Checks", "Trace"].map((item, i) => (
              <li
                key={item}
                className={cn(
                  "flex items-center justify-between border px-2 py-1.5 text-[0.5rem] uppercase tracking-[0.08em]",
                  i === 1 ? "border-ink/40 text-ink" : "border-rule-soft text-muted",
                )}
              >
                {item}
                <span className="size-1 rounded-full bg-current opacity-50" />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-rule-soft pt-3">
          <span className="text-[0.75rem] text-muted-strong">Auditable payload</span>
          <span className="mono text-[0.75rem] uppercase tracking-[0.1em] text-muted">
            5 discrepancies
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 bg-[#161615] p-6", className)}
    >
      <div className="grid h-full grid-cols-5 gap-px bg-rule-soft">
        {["Sources", "Ingestion", "Index", "Retrieval", "Application"].map((lane, i) => (
          <div key={lane} className="flex flex-col bg-[#161615] p-2">
            <span className="mono text-[0.5rem] uppercase tracking-[0.1em] text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 text-[0.6875rem] leading-tight text-muted-strong">{lane}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
