import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { archiveProjects, projects } from "@/constants/projects";
import { ProjectArt } from "@/components/visuals/project-art";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Reveal } from "@/components/motion/reveal";
import { indexLabel } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected engineering work: SPECTER legal document intelligence, the open-source Document-Parser, and OpsNexus document operations agents.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="pb-[clamp(2.5rem,5vw,4rem)] pt-[calc(4rem+clamp(2.5rem,6vw,5rem))] md:pt-[calc(4.75rem+clamp(2.5rem,6vw,5rem))]">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
            <p className="eyebrow">Selected work</p>
            <p className="eyebrow hidden sm:block">
              {indexLabel(projects.length)} systems · {archiveProjects.length} archive entries
            </p>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-12 lg:gap-8">
            <h1 className="display max-w-[20ch] text-[clamp(2.6rem,5.8vw,5.2rem)] leading-[0.95] lg:col-span-8">
              Work that had to survive{" "}
              <em className="display-italic">real documents</em>.
            </h1>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Three systems, each with the constraints, the architecture and
                the decisions that made it work. No invented adoption numbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="shell">
          {projects.map((project, i) => (
            <Reveal key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                data-cursor-label="View case"
                className="group grid gap-6 border-b border-rule py-10 transition-colors duration-300 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-14"
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <ProjectArt
                    visual={project.visual}
                    priority={i === 0}
                    className="aspect-[16/10] w-full border border-rule"
                  />
                </div>

                <div
                  className={`lg:col-span-6 ${
                    i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="min-w-0 truncate font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                      {indexLabel(i + 1)} / {project.category}
                    </span>
                    <span className="shrink-0 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
                      {project.year}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-5">
                    <h2 className="display text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.02]">
                      {project.shortTitle}
                    </h2>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="mt-1 size-6 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </div>

                  <p className="mt-3 max-w-[50ch] text-[0.9375rem] leading-relaxed text-muted-strong">
                    {project.cardLine}
                  </p>

                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-rule pt-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-muted">
                          {metric.label}
                        </dt>
                        <dd className="mt-1 text-[0.75rem] leading-snug text-ink">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="archive"
        className="bg-paper-deep/35 py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Archive</p>
              <h2
                id="archive"
                className="display mt-4 max-w-[22ch] text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.03]"
              >
                Earlier work, kept honest.
              </h2>
            </div>
            <p className="max-w-[38ch] text-[0.875rem] leading-relaxed text-muted">
              Smaller projects and experiments that are still useful evidence of
              how the work gets done. No links where no public repository exists.
            </p>
          </div>

          <ul className="mt-10 border-t border-rule-strong">
            {archiveProjects.map((item, i) => (
              <Reveal key={item.title} as="li">
                <div className="grid gap-3 border-b border-rule py-5 sm:grid-cols-12 sm:gap-6">
                  <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-muted sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-5">
                    <h3 className="text-[0.9375rem] font-medium leading-snug">
                      {item.title}
                    </h3>
                    <p className="mono mt-1 text-[0.5625rem] uppercase tracking-[0.08em] text-muted">
                      {item.year} · {item.stack}
                    </p>
                  </div>
                  <p className="max-w-[56ch] text-[0.8125rem] leading-relaxed text-muted sm:col-span-6">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        index="08"
        title={
          <>
            Your system could be
            <br className="hidden sm:block" /> the next one{" "}
            <em className="display-italic">here</em>.
          </>
        }
        body="We publish the architecture, not just the outcome. If you want that level of detail applied to your problem, start with a short brief."
      />
    </>
  );
}
