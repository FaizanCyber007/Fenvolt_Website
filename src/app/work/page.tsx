import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { archiveProjects, projects } from "@/constants/projects";
import { ProjectPlate } from "@/components/visuals/project-plate";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { PageFrame } from "@/components/visuals/page-frame";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Delivered engineering work from Fenvolt: SPECTER legal document intelligence, the open-source Document-Parser, and OpsNexus document operations agents.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule-soft">
        <PageFrame />

        <div className="shell relative page-top pb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft pb-3">
            <p className="eyebrow">Selected work</p>
            <p className="eyebrow hidden sm:block">
              {String(projects.length).padStart(2, "0")} systems ·{" "}
              {String(archiveProjects.length).padStart(2, "0")} archive entries
            </p>
          </div>

          <h1 className="display mt-8 text-[clamp(2.9rem,7.2vw,6.8rem)] leading-[0.9] tracking-[-0.055em]">
            Work that had to survive
            <br />
            <span className="display-dim">real documents.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-rule-soft pt-7 lg:grid-cols-12 lg:gap-8">
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-strong lg:col-span-5">
              Three delivered systems, each with the constraints, the architecture
              and the decisions that made it work. All three were scoped, built and
              shipped by Fenvolt.
            </p>
            <p className="max-w-[34ch] text-[0.875rem] leading-relaxed text-muted lg:col-span-3 lg:col-start-7">
              Every case study shows what was built, how it runs and the method
              behind each number.
            </p>
            <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
              <ButtonLink href="/contact">Discuss a build</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        {projects.map((project, i) => {
          const flipped = i % 2 === 1;

          return (
            <Reveal key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid gap-7 border-b border-rule-soft py-12 lg:grid-cols-12 lg:items-start lg:gap-8 lg:py-16"
              >
                <div
                  className={
                    flipped
                      ? "lg:order-2 lg:col-span-7 lg:col-start-6"
                      : "lg:col-span-7"
                  }
                >
                  <div className="media relative aspect-[16/10] w-full overflow-hidden border border-rule-soft">
                    {project.visual === "specter" ? (
                      <Image
                        src="/work/specter-answer.jpg"
                        alt="SPECTER answering a legal question with a structured, cited answer and a checked list of authorities."
                        fill
                        priority={i === 0}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover object-left-top"
                      />
                    ) : (
                      <ProjectPlate visual={project.visual} />
                    )}
                  </div>
                </div>

                <div
                  className={
                    flipped
                      ? "lg:order-1 lg:col-span-4 lg:col-start-1"
                      : "lg:col-span-4 lg:col-start-9"
                  }
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="eyebrow">
                      {String(i + 1).padStart(2, "0")} — {project.category}
                    </p>
                    <span className="mono shrink-0 text-[0.6875rem] text-muted-faint">
                      Completed · {project.year}
                    </span>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <h2 className="display text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.045em]">
                      {project.shortTitle}
                    </h2>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="mt-1 size-5 shrink-0 text-muted transition-all duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                    />
                  </div>

                  <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted-strong">
                    {project.cardLine}
                  </p>

                  <dl className="mt-7 border-t border-rule-soft">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-baseline justify-between gap-4 border-b border-rule-soft py-2.5"
                      >
                        <dt className="text-[0.75rem] text-muted">{metric.label}</dt>
                        <dd className="text-right text-[0.75rem] text-ink">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="arrow-link mt-5 text-[0.8125rem] text-muted-strong group-hover:text-ink">
                    Read the case study
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>

      <section
        aria-labelledby="archive"
        className="theme-bone paper-grain relative border-t border-rule-soft"
      >
        <div className="shell section-pad">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-rule pb-6">
            <div>
              <p className="eyebrow">Archive</p>
              <h2
                id="archive"
                className="display mt-5 max-w-[20ch] text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.02]"
              >
                Earlier work, kept honest.
              </h2>
            </div>
            <p className="max-w-[38ch] text-[0.875rem] leading-relaxed text-muted">
              Earlier Fenvolt builds, kept as evidence of range: OCR, retrieval,
              detection and data modelling. Source is linked wherever it can be published.
            </p>
          </div>

          <ul>
            {archiveProjects.map((item, i) => (
              <Reveal key={item.title} as="li">
                <div className="grid gap-3 border-b border-rule-soft py-5 sm:grid-cols-12 sm:gap-6">
                  <span className="mono text-[0.75rem] text-muted-faint sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-5">
                    <h3 className="max-w-[34ch] text-[0.9375rem] font-medium leading-snug">
                      {item.title}
                    </h3>
                    <p className="mono mt-1.5 text-[0.75rem] uppercase tracking-[0.06em] text-muted">
                      {item.year} · {item.stack}
                    </p>
                  </div>
                  <p className="max-w-[58ch] text-[0.8125rem] leading-relaxed text-muted sm:col-span-6">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="display max-w-[18ch] text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.94]">
              Your system could be
              <br />
              <span className="display-dim">the next one here.</span>
            </h2>
            <div className="flex flex-col items-start gap-4">
              <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted">
                We publish the architecture, not just the outcome. If you want
                that level of detail applied to your problem, start with a short
                brief.
              </p>
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
