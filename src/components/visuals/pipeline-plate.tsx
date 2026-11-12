"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plate } from "@/components/visuals/plate";
import { cn } from "@/lib/utils";

type Stage = {
  id: string;
  index: string;
  label: string;
  detail: string;
  spec: string;
  x: number;
  y: number;
};

const stages: Stage[] = [
  {
    id: "ingest",
    index: "01",
    label: "Ingest",
    detail:
      "PDFs, Word files and phone photographs of documents enter one queue. File type, page count and text layer are read before any model runs.",
    spec: "PyMuPDF · type triage",
    x: 40,
    y: 70,
  },
  {
    id: "parse",
    index: "02",
    label: "Parse",
    detail:
      "Layout blocks are separated from running text. Urdu scans go through OCR, and every extracted block keeps the page coordinates it came from.",
    spec: "DocLayout-YOLO · Qwen3-VL",
    x: 305,
    y: 70,
  },
  {
    id: "embed",
    index: "03",
    label: "Chunk + embed",
    detail:
      "Sections are chunked by structure rather than a fixed token window, embedded, and written to the index with the page anchor attached.",
    spec: "FAISS · pgvector · LanceDB",
    x: 570,
    y: 70,
  },
  {
    id: "retrieve",
    index: "04",
    label: "Retrieve",
    detail:
      "Lexical and vector search run together. Court, year and document-type filters narrow the candidate set before anything is shown to the model.",
    spec: "BM25 + cosine · metadata filters",
    x: 240,
    y: 210,
  },
  {
    id: "rerank",
    index: "05",
    label: "Rerank",
    detail:
      "The candidate set is reranked and cut down to the passages that can actually support an answer, not just mention the query.",
    spec: "Reranker · top-k cut",
    x: 505,
    y: 210,
  },
  {
    id: "answer",
    index: "06",
    label: "Grounded answer",
    detail:
      "The model answers only from the selected passages. A claim that cannot be traced to one is removed before the answer leaves the service.",
    spec: "Claude / GPT-4o / Llama · citation check",
    x: 770,
    y: 210,
  },
];

const nodeWidth = 150;
const nodeHeight = 54;

export function PipelinePlate() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);

  const current = stages[active];

  useEffect(() => {
    if (reduce || touched) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(wrap);

    const timer = window.setInterval(() => {
      if (!visibleRef.current) return;
      setActive((value) => (value + 1) % stages.length);
    }, 4600);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [reduce, touched]);

  const select = (index: number) => {
    setTouched(true);
    setActive(index);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = active;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (active + 1) % stages.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (active - 1 + stages.length) % stages.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = stages.length - 1;
    select(next);
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    buttons?.[next]?.focus();
  };

  return (
    <Plate
      label={
        <>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-on-ink-muted">
            Fig. 01 — SPECTER retrieval path
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-on-ink-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            Research system
          </span>
        </>
      }
      caption="Documented pipeline from the SPECTER build. Stages are the actual services; select one to read what it does."
    >
      <div ref={wrapRef}>
        {/* schematic — desktop only; the stage list is the diagram on small screens */}
        <div className="hidden px-6 pt-6 lg:block lg:px-8">
          <svg
            viewBox="0 0 960 320"
            role="img"
            aria-label="Schematic: ingest, parse and embed run left to right; retrieval, reranking and the grounded answer continue on a second row."
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="pipe-arrow"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L8,4 L0,8 z" fill="rgba(237,235,228,0.4)" />
              </marker>
            </defs>

            {/* frame ticks */}
            <g stroke="rgba(237,235,228,0.18)" strokeWidth="1">
              <path d="M0 12 h10 M12 0 v10" />
              <path d="M960 12 h-10 M948 0 v10" />
              <path d="M0 308 h10 M12 320 v-10" />
              <path d="M960 308 h-10 M948 320 v-10" />
            </g>

            <g
              fill="none"
              stroke="rgba(237,235,228,0.22)"
              strokeWidth="1"
              markerEnd="url(#pipe-arrow)"
            >
              <path d="M190 97 H299" />
              <path d="M455 97 H564" />
              <path
                d="M645 124 V158 H315 V204"
                className={cn(
                  "transition-colors duration-500",
                  active >= 3 && "stroke-accent/60",
                )}
              />
              <path d="M390 237 H499" />
              <path d="M655 237 H764" />
            </g>

            <text
              x="480"
              y="136"
              textAnchor="middle"
              className="mono"
              fontSize="9"
              letterSpacing="1.6"
              fill="rgba(237,235,228,0.32)"
            >
              PAGE ANCHOR TRAVELS WITH EVERY CHUNK
            </text>

            {stages.map((stage, i) => {
              const isActive = i === active;
              return (
                <g
                  key={stage.id}
                  transform={`translate(${stage.x} ${stage.y})`}
                  className="cursor-pointer"
                  onClick={() => select(i)}
                  aria-hidden="true"
                >
                  <rect
                    width={nodeWidth}
                    height={nodeHeight}
                    rx="2"
                    className={cn(
                      "transition-all duration-500",
                      isActive
                        ? "fill-accent"
                        : "fill-white/[0.03] stroke-white/20",
                    )}
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="21"
                    className="mono"
                    fontSize="8.5"
                    letterSpacing="1.4"
                    fill={isActive ? "rgba(16,19,20,0.62)" : "rgba(237,235,228,0.4)"}
                  >
                    {stage.index}
                  </text>
                  <text
                    x="12"
                    y="39"
                    className="mono"
                    fontSize="11"
                    letterSpacing="0.8"
                    fill={isActive ? "#101314" : "rgba(237,235,228,0.9)"}
                  >
                    {stage.label.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid gap-0 px-5 pb-6 pt-5 sm:px-7 lg:grid-cols-12 lg:gap-8 lg:pt-6 lg:px-8">
          <div ref={listRef} className="lg:col-span-5">
            <div
              role="tablist"
              aria-label="Pipeline stages"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="border-t border-white/10"
            >
              {stages.map((stage, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={stage.id}
                    role="tab"
                    id={`${baseId}-tab-${stage.id}`}
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(i)}
                    onMouseEnter={() => {
                      setTouched(true);
                      setActive(i);
                    }}
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 border-b border-white/10 py-3 text-left transition-colors",
                      isActive ? "text-on-ink" : "text-on-ink-muted hover:text-on-ink",
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          "mono text-[0.625rem] tracking-[0.12em]",
                          isActive ? "text-accent" : "text-white/60",
                        )}
                      >
                        {stage.index}
                      </span>
                      <span className="text-[0.9375rem]">{stage.label}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px transition-all duration-500",
                        isActive ? "w-8 bg-accent" : "w-4 bg-white/20",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 lg:col-span-7 lg:mt-0">
            <div
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${current.id}`}
              className="min-h-[9.5rem]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="eyebrow !text-white/60">
                    Stage {current.index}
                  </p>
                  <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-on-ink">
                    {current.detail}
                  </p>
                  <p className="mono mt-4 text-[0.65rem] uppercase tracking-[0.1em] text-accent">
                    {current.spec}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Plate>
  );
}
