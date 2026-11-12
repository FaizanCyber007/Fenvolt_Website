import { ButtonLink } from "@/components/ui/button-link";
import { HeroConsole } from "@/components/visuals/hero-console";
import { LineReveal, Reveal } from "@/components/motion/reveal";

const capabilities = [
  "Retrieval systems",
  "Document intelligence",
  "Agent workflows",
  "Embedded engineers",
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-[clamp(3.5rem,6vw,5.5rem)] pt-[calc(4.5rem+clamp(2.5rem,5.5vw,4.5rem))] md:pt-[calc(5.25rem+clamp(2.5rem,5.5vw,4.5rem))]">
      <div className="shell">
        <Reveal y={10} className="flex flex-wrap items-center justify-between gap-3">
          <span className="chip">
            <span className="chip-dot" aria-hidden="true" />
            AI engineering &amp; engineering capacity
          </span>
          <span className="mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
            Lahore · working remotely
          </span>
        </Reveal>

        <div className="mt-10 grid items-start gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <LineReveal
              lines={[
                "Engineering capacity",
                <>
                  for the{" "}
                  <em className="display-italic text-accent-ink">hard</em> parts.
                </>,
              ]}
              delay={0.1}
              className="display text-[clamp(2.45rem,5.6vw,5.3rem)] leading-[0.92] tracking-[-0.03em]"
            />

            <Reveal delay={0.34}>
              <p className="lede mt-7 max-w-[45ch]">
                Fenvolt places senior engineers inside product teams, and builds
                the AI systems those teams cannot staff yet — retrieval, document
                intelligence and agent workflows that run on real records.
              </p>
            </Reveal>

            <Reveal delay={0.44} className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact">Discuss a project</ButtonLink>
              <ButtonLink href="/work" variant="ghost">
                Read the work
              </ButtonLink>
            </Reveal>

            <Reveal
              delay={0.52}
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] text-muted"
            >
              <span>Technical scoping call.</span>
              <span aria-hidden="true" className="h-px w-6 bg-white/20" />
              <span>No deck required.</span>
            </Reveal>
          </div>

          <Reveal delay={0.22} y={26} className="lg:col-span-5">
            <HeroConsole />
          </Reveal>
        </div>

        <Reveal
          delay={0.4}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-4 lg:mt-20"
        >
          {capabilities.map((label, i) => (
            <div
              key={label}
              className="group bg-[#070a0e]/95 px-4 py-4 backdrop-blur-sm transition-colors duration-300 hover:bg-[#0b1117]"
            >
              <p className="font-mono text-[0.5625rem] tracking-[0.16em] text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1.5 text-[0.8125rem] tracking-[-0.005em] text-muted-strong transition-colors group-hover:text-ink">
                {label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
