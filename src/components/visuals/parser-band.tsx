import { Plate } from "@/components/visuals/plate";

const phases = [
  {
    index: "01",
    title: "Triage",
    body: "File type, text layer and language are read before a parser is chosen.",
  },
  {
    index: "02",
    title: "Layout",
    body: "DocLayout-YOLO separates headings, body, tables and footnotes.",
  },
  {
    index: "03",
    title: "OCR routing",
    body: "Local OCR first. Cloud or a vision model only where quality demands it.",
  },
  {
    index: "04",
    title: "Section tagging",
    body: "An LLM assigns semantic sections; every block keeps its page number.",
  },
  {
    index: "05",
    title: "Metadata",
    body: "Case number, parties, dates and citations extracted to a typed schema.",
  },
  {
    index: "06",
    title: "Citation graph",
    body: "Deterministic regex extraction. No model in the loop for citations.",
  },
  {
    index: "07",
    title: "Self-correction",
    body: "Five detectors re-check structure, anchors and citation validity.",
  },
];

export function ParserBand() {
  return (
    <Plate
      label={
        <>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-ink-muted">
            Fig. 03 — parsing pipeline
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/60">
            Seven phases
          </span>
        </>
      }
      caption="Each phase is a separate module with its own tests. Phase 07 can send a document back to 03 when OCR confidence or an anchor check fails."
    >
      <div className="px-5 py-7 sm:px-7">
        <div className="hidden lg:block">
          <svg
            viewBox="0 0 980 44"
            aria-hidden="true"
            className="mb-4 h-11 w-full"
          >
            <path
              d="M900 30 H455 V16"
              fill="none"
              stroke="rgba(6,182,212,0.5)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path d="M455 16 l-4 7 h8 z" fill="rgba(6,182,212,0.7)" />
            <text
              x="470"
              y="41"
              fontSize="8"
              letterSpacing="1.4"
              fill="rgba(237,235,228,0.35)"
              className="mono"
            >
              FAILED CHECK RETURNS TO OCR ROUTING
            </text>
          </svg>
        </div>

        <ol className="grid overflow-hidden rounded-[2px] border border-white/10 sm:grid-cols-2 lg:grid-cols-7 lg:border-0">
          {phases.map((phase) => (
            <li
              key={phase.index}
              className="relative border-b border-white/10 px-4 py-4 last:border-b-0 sm:border-r lg:border-b-0 lg:border-l lg:border-r-0 lg:px-3.5 lg:py-0 lg:first:border-l-0"
            >
              <span className="mono block text-[0.625rem] tracking-[0.14em] text-accent">
                {phase.index}
              </span>
              <h3 className="mt-2 text-[0.8125rem] font-medium leading-tight text-on-ink">
                {phase.title}
              </h3>
              <p className="mt-2 text-[0.6875rem] leading-[1.5] text-on-ink-muted lg:min-h-[7.5rem]">
                {phase.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Plate>
  );
}
