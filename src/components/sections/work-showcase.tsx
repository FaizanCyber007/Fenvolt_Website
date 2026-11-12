"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/constants/projects";
import { ProjectArt } from "@/components/visuals/project-art";
import { SectionHead } from "@/components/ui/section-head";
import { indexLabel } from "@/lib/utils";

export function WorkShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const getDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
        });

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() + 80}`,
          pin: true,
          scrub: 0.7,
          animation: tween,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${Math.max(
                0.02,
                self.progress,
              )})`;
            }
          },
        });

        return () => {
          trigger.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="selected-work"
      className="relative overflow-hidden border-t border-rule bg-paper-deep/40 lg:py-20 motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:flex-col motion-safe:lg:justify-center motion-safe:lg:py-0"
    >
      <div className="shell pt-16">
        <SectionHead
          index="04"
          label="Selected work"
          id="selected-work"
          title={
            <>
              Three systems, <em className="display-italic">documented</em>.
            </>
          }
          lede="Each project below is presented with its constraints, its architecture and the decisions that made it work. No invented metrics."
          align="split"
        />

        <div className="mt-8 hidden items-center justify-between border-t border-rule pt-4 lg:flex">
          <p className="mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            Scroll to advance
          </p>
          <div className="flex items-center gap-3">
            <span className="relative block h-px w-28 bg-rule-strong">
              <span
                ref={progressRef}
                className="absolute inset-0 origin-left bg-ink"
                style={{ transform: "scaleX(0.02)" }}
              />
            </span>
            <span className="mono text-[0.625rem] tracking-[0.12em] text-muted">
              {indexLabel(projects.length)} projects
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full overflow-hidden pb-16 lg:mt-10 lg:pb-0">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-[var(--gutter)] motion-safe:lg:w-max motion-safe:lg:flex-row motion-safe:lg:gap-8 motion-safe:lg:pr-[var(--gutter)] motion-safe:lg:will-change-transform"
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-cursor-label="View case"
              className="group flex w-full max-w-[42rem] flex-col border border-rule bg-surface transition-colors duration-300 hover:border-ink/40 motion-safe:lg:w-[min(48vw,650px)] motion-safe:lg:max-w-none"
            >
              <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3.5">
                <span className="min-w-0 truncate font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                  {indexLabel(i + 1)} / {project.category}
                </span>
                <span className="shrink-0 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
                  {project.year}
                </span>
              </div>

              <ProjectArt
                visual={project.visual}
                priority={i === 0}
                className="aspect-[16/10] w-full motion-safe:lg:aspect-[16/9] motion-safe:lg:h-[clamp(11rem,24vh,16rem)]"
              />

              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="display text-[clamp(1.75rem,2.2vw,2.15rem)] leading-[1.02]">
                    {project.shortTitle}
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="mt-1 size-6 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </div>
                <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-strong">
                  {project.cardLine}
                </p>
                <ul className="tag-row mt-auto pt-6">
                  {project.stack.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}

          <Link
            href="/work"
            data-cursor-label="All work"
            className="group relative flex min-h-[18rem] w-full max-w-[42rem] flex-col justify-between overflow-hidden rounded-[6px] border border-white/10 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(34,211,238,0.14),transparent_62%)] p-6 transition-colors duration-300 hover:border-accent/40 motion-safe:lg:w-[22rem] motion-safe:lg:max-w-none"
          >
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              Index
            </span>
            <div>
              <p className="display text-[2.4rem] leading-none">
                All work
                <br />
                <em className="display-italic">and archive</em>
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem]">
                Open the index
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
