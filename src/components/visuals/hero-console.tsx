"use client";

import Image from "next/image";
import { useRef } from "react";

const stages = [
  { label: "Query", value: "falsification of evidence" },
  { label: "Hybrid", value: "BM25 + vector" },
  { label: "Rerank", value: "top-k → passages" },
];

/**
 * Hero console: a frame from the actual SPECTER build, presented as the
 * citation viewer it is. The moving sweep and signal bars are decorative;
 * nothing here states a metric that is not in the screenshot.
 */
export function HeroConsole() {
  const panelRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    panel.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div className="relative" data-cursor-label="Inspect">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(55%_55%_at_60%_35%,rgba(34,211,238,0.2),transparent_72%)] blur-2xl"
      />

      <div
        ref={panelRef}
        onPointerMove={onPointerMove}
        className="group glass relative rounded-[16px] p-[6px]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 40%), rgba(34,211,238,0.12), transparent 72%)",
          }}
        />

        <div className="relative overflow-hidden rounded-[11px] border border-white/10 bg-[#04070a]">
          {/* chrome */}
          <div className="flex h-9 items-center justify-between gap-3 border-b border-white/8 bg-white/[0.02] px-3">
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-white/20" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
              specter / citation viewer
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/60">
              <span className="chip-dot" aria-hidden="true" />
              build
            </span>
          </div>

          {/* document frame */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/work/specter-citation.jpg"
              alt="A judgment page inside SPECTER with the cited paragraph highlighted."
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 560px"
              className="object-cover object-top opacity-90"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#04070a] via-transparent to-[#04070a]/50"
            />

            {/* scan sweep */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-accent/20 to-transparent [animation:scan-sweep_7s_ease-in-out_infinite]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent [animation:scan-sweep_7s_ease-in-out_infinite]"
            />

            <span className="absolute right-3 top-3 rounded-[4px] border border-white/12 bg-black/45 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/75 backdrop-blur-md">
              En + Ur
            </span>

            <p className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.14em] text-white/60">
              Source: SPECTER build · judgment corpus
            </p>
          </div>

          {/* stages */}
          <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8">
            {stages.map((stage, i) => (
              <div key={stage.label} className="px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/60">
                    {stage.label}
                  </p>
                  <span aria-hidden="true" className="flex items-end gap-[2px]">
                    {[0, 1, 2].map((bar) => (
                      <span
                        key={bar}
                        className="w-[2px] origin-bottom bg-accent/80"
                        style={{
                          height: `${5 + bar * 3}px`,
                          animation: "signal-pulse 2.4s ease-in-out infinite",
                          animationDelay: `${i * 0.25 + bar * 0.18}s`,
                        }}
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-1 truncate font-mono text-[9px] tracking-[0.02em] text-white/70">
                  {stage.value}
                </p>
              </div>
            ))}
          </div>

          {/* grounded answer */}
          <div className="m-2.5 rounded-[8px] border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent-ink">
                Grounded answer
              </p>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/60">
                1:1
              </p>
            </div>
            <div aria-hidden="true" className="mt-2.5 space-y-1.5">
              <span className="block h-1.5 w-[94%] rounded-full bg-white/12" />
              <span className="block h-1.5 w-[78%] rounded-full bg-white/10" />
              <span className="block h-1.5 w-[52%] rounded-full bg-white/8" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-accent/30 bg-accent/10 px-1.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-accent-ink">
                <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                page 16
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/60">
                citation locked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* floating spec chips */}
      <div className="glass absolute -right-3 -top-4 hidden items-center gap-2 rounded-[8px] px-3 py-2 sm:flex motion-safe:[animation:float-soft_9s_ease-in-out_infinite]">
        <span className="chip-dot" aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/80">
          11,341 judgments indexed
        </span>
      </div>

      <div className="glass absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-[8px] px-3 py-2 sm:flex motion-safe:[animation:float-soft_11s_ease-in-out_infinite_0.8s]">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/80">
          claim → page, enforced
        </span>
      </div>
    </div>
  );
}
