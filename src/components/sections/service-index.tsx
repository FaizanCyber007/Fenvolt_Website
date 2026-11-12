import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/motion/reveal";

const tracks = [
  {
    index: "A",
    title: "Engineering capacity",
    body:
      "Senior engineers who join your team, your standups and your repository. One engineer, a dedicated squad, or white-label delivery behind your brand.",
    detail: "Embedded · Squad · White-label",
    href: "/services#capacity",
  },
  {
    index: "B",
    title: "AI engineering",
    body:
      "Retrieval, document intelligence and agent workflows — scoped, built and deployed by the engineers who designed them.",
    detail: "RAG · OCR · Agents · APIs",
    href: "/services#ai",
  },
];

export function ServiceIndex() {
  return (
    <section
      aria-labelledby="capabilities"
      className="border-t border-rule py-[clamp(4.5rem,9vw,8.75rem)]"
    >
      <div className="shell">
        <SectionHead
          index="02"
          label="Capability"
          id="capabilities"
          title={
            <>
              Two ways to work <em className="display-italic">with us</em>.
            </>
          }
          lede="Most engagements use both: an engineer who understands the system, and a build that has to hold up in production."
          align="split"
        />

        <div className="mt-12 border-t border-rule">
          {tracks.map((track, i) => (
            <Reveal key={track.index} delay={i * 0.06}>
              <Link
                href={track.href}
                data-cursor-label="Explore"
                className="group grid gap-5 border-b border-rule py-8 transition-colors duration-300 hover:bg-paper-deep/50 sm:py-10 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-2"
              >
                <div className="flex items-baseline gap-4 lg:col-span-5">
                  <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted">
                    {track.index}
                  </span>
                  <h3 className="display text-[clamp(1.9rem,3.2vw,3rem)] leading-none transition-transform duration-500 group-hover:translate-x-1">
                    {track.title}
                  </h3>
                </div>

                <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted-strong lg:col-span-4">
                  {track.body}
                </p>

                <div className="flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
                    {track.detail}
                  </span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-rule-strong transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="size-4"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <p className="text-[0.875rem] text-muted lg:col-span-5 lg:col-start-7">
            Not sure which one you need? Describe the problem in a short note;
            the first call is technical either way.
          </p>
        </div>
      </div>
    </section>
  );
}
