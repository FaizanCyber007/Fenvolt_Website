"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { approach } from "@/constants/company";
import { SectionHead } from "@/components/ui/section-head";

export function ApproachTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.55"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <section className="border-t border-rule py-[clamp(4.5rem,9vw,8.75rem)]">
      <div className="shell">
        <SectionHead
          index="05"
          label="How we work"
          title={
            <>
              From a brief to a system <em className="display-italic">in production</em>.
            </>
          }
          lede="Five stages. Each one ends with something written down, so the next one has a contract to build against."
          align="split"
        />

        <div ref={ref} className="mt-14 lg:mt-20">
          <div className="relative">
            <div className="absolute left-[7px] top-0 h-full w-px bg-rule lg:left-0 lg:top-[7px] lg:h-px lg:w-full">
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 origin-top bg-ink lg:hidden"
                style={reduce ? { transform: "scaleY(1)" } : { scaleY: progress }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 hidden origin-left bg-ink lg:block"
                style={reduce ? { transform: "scaleX(1)" } : { scaleX: progress }}
              />
            </div>

            <ol className="grid gap-10 pl-8 lg:grid-cols-5 lg:gap-6 lg:pl-0">
              {approach.map((step) => (
                <li key={step.index} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-[3px] size-[7px] rounded-full border border-ink bg-paper lg:left-0 lg:top-[4px]"
                  />
                  <div className="flex items-baseline gap-3 lg:mt-6">
                    <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted">
                      {step.index}
                    </span>
                    <span className="font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-muted">
                      {step.meta}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[1.0625rem] font-medium leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
