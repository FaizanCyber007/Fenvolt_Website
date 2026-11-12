import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { ServiceIndex } from "@/components/sections/service-index";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { ApproachTimeline } from "@/components/sections/approach-timeline";
import { CapabilityMatrix } from "@/components/sections/capability-matrix";
import { PipelinePlate } from "@/components/visuals/pipeline-plate";
import { SectionHead } from "@/components/ui/section-head";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { principles } from "@/constants/company";
import { site } from "@/constants/site";

const evidence = [
  { value: "11,341", label: "judgments and statutes indexed" },
  { value: "03", label: "scripts in one pipeline" },
  { value: "1:1", label: "claim to source page, enforced" },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* 01 — why the practice exists */}
      <section className="border-t border-rule py-[clamp(4.5rem,9vw,8.75rem)]">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className="eyebrow">01 / Why this exists</p>
          </div>

          <div className="lg:col-span-9">
            <Reveal>
              <p className="display max-w-[24ch] text-[clamp(1.9rem,3.6vw,3.3rem)] leading-[1.06]">
                Most AI projects fail at the seam between the model and the rest
                of the system.{" "}
                <em className="display-italic text-accent-ink">
                  That seam is where we work.
                </em>
              </p>
            </Reveal>

            <div className="mt-12 grid gap-x-8 gap-y-6 border-t border-rule pt-6 sm:grid-cols-3">
              {evidence.map((item) => (
                <div key={item.label}>
                  <p className="display text-[2.1rem] leading-none">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[24ch] text-[0.8125rem] leading-relaxed text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
              Figures from the SPECTER build, not aggregated across clients.
            </p>
          </div>
        </div>
      </section>

      <ServiceIndex />

      {/* 03 — the pipeline, as an interactive reel */}
      <section
        aria-labelledby="reel"
        className="border-t border-rule bg-paper-deep/40 py-[clamp(4.5rem,9vw,8.75rem)]"
      >
        <div className="shell">
          <SectionHead
            index="03"
            label="Systems reel"
            id="reel"
            title={
              <>
                The pipeline, <em className="display-italic">stage by stage</em>.
              </>
            }
            lede="The same path a document takes through a Fenvolt system. Select a stage to see what it does and where it fails."
            align="split"
          />
          <Reveal className="mt-12">
            <PipelinePlate />
          </Reveal>
        </div>
      </section>

      <WorkShowcase />
      <ApproachTimeline />
      <CapabilityMatrix />

      {/* 07 — company */}
      <section className="border-t border-rule py-[clamp(4.5rem,9vw,8.75rem)]">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow">07 / Company</p>
            <h2 className="display mt-5 max-w-[15ch] text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.02]">
              Built by the people who do the work.
            </h2>
            <p className="lede mt-5 max-w-[42ch]">
              Fenvolt is led by {site.founder}, an AI/ML engineer working on
              retrieval and document intelligence systems. The company exists
              because the engineering and the delivery are usually sold
              separately, by people who do neither.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink href="/company" variant="ghost">
                About Fenvolt
              </ButtonLink>
              <Link
                href={site.socials[0].href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-line inline-flex items-center gap-1.5 text-[0.875rem] text-muted-strong"
              >
                GitHub
                <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-rule">
              {principles.slice(0, 4).map((principle) => (
                <Reveal key={principle.index} as="li">
                  <div className="grid grid-cols-[2rem_1fr] gap-4 border-b border-rule py-5">
                    <span className="font-mono text-[0.625rem] tracking-[0.1em] text-muted">
                      {principle.index}
                    </span>
                    <div>
                      <h3 className="text-[1rem] font-medium">{principle.title}</h3>
                      <p className="mt-1.5 max-w-[48ch] text-[0.875rem] leading-relaxed text-muted">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Link
              href="/company#principles"
              className="link-line mt-6 inline-flex text-[0.875rem] text-muted-strong"
            >
              All six principles
              <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
