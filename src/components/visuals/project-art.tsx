import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectArtProps = {
  visual: "specter" | "parser" | "agents";
  className?: string;
  priority?: boolean;
};

export function ProjectArt({ visual, className, priority }: ProjectArtProps) {
  if (visual === "specter") {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-plate",
          className,
        )}
      >
        <Image
          src="/work/specter-citation.jpg"
          alt="The SPECTER source viewer: page 16 of a judgment with the cited passage highlighted."
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          priority={priority}
          className="object-cover object-left"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-black/70 px-3 py-2 backdrop-blur-[2px]">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-[#f2f0e9]">
            Page 16 of 24 · source verified
          </span>
          <span className="size-1.5 rounded-full bg-accent" />
        </div>
      </div>
    );
  }

  if (visual === "parser") {
    return (
      <div
        className={cn(
          "relative flex flex-col justify-between overflow-hidden bg-plate p-5",
          className,
        )}
      >
        <div className="flex items-center justify-between font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-white/60">
          <span>2014LHC1525.pdf</span>
          <span>24 pages</span>
        </div>

        <div className="relative mt-6 flex items-end gap-1.5">
          <svg
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-5 w-full"
          >
            <path
              d="M96 18 H44 V4"
              fill="none"
              stroke="rgba(6,182,212,0.55)"
              strokeWidth="0.7"
              strokeDasharray="2 2"
            />
          </svg>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <div key={n} className="flex-1">
              <div
                className={cn(
                  "mb-2 h-14 border-t",
                  n === 7
                    ? "border-accent/60 bg-accent/10"
                    : "border-white/25 bg-white/[0.07]",
                )}
              />
              <span className="font-mono text-[0.5rem] tracking-[0.08em] text-white/60">
                {String(n).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[0.5625rem] uppercase tracking-[0.1em]">
          <span className="text-white/60">Seven phases</span>
          <span className="text-accent">Self-correction pass</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden bg-plate p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-white/60">
        <span>Document intake</span>
        <span className="text-accent">Supervisor</span>
      </div>

      <div className="mt-5 grid grid-cols-[1.1fr_auto_1fr] items-center gap-3">
        <div className="space-y-1.5">
          {["Invoice", "Security log", "Questionnaire"].map((item) => (
            <div
              key={item}
              className="border border-white/12 px-2 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.06em] text-white/55"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <span className="h-px w-5 bg-white/20" />
          <span className="-ml-1 size-1 rotate-45 border-r border-t border-white/30" />
        </div>

        <div className="space-y-1.5">
          {["Route", "Tools", "Result"].map((item, i) => (
            <div
              key={item}
              className={cn(
                "flex items-center justify-between border px-2 py-1.5 font-mono text-[0.5rem] uppercase tracking-[0.06em]",
                i === 1
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-white/12 text-white/55",
              )}
            >
              {item}
              <span className="size-1 rounded-full bg-white/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[0.5625rem] uppercase tracking-[0.1em]">
        <span className="text-white/60">Structured payload</span>
        <span className="text-white/55">5 discrepancies</span>
      </div>
    </div>
  );
}
