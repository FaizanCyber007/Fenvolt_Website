import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { LineReveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { PageFrame } from "@/components/visuals/page-frame";
import { serviceLinks } from "@/constants/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <PageFrame arc />

      <div className="shell relative pt-24 md:pt-32">
        <div className="flex items-center justify-between gap-4 border-b border-rule-soft pb-3">
          <p className="eyebrow">AI engineering practice</p>
          <p className="eyebrow hidden sm:block">Lahore · Working remotely</p>
        </div>

        <div className="pt-[clamp(2.75rem,6vw,5.5rem)]">
          <LineReveal
            as="h1"
            delay={0.15}
            lines={[
              "Engineering",
              "capacity for",
              <span key="dim" className="display-dim">
                the hard parts.
              </span>,
            ]}
            className="display text-[clamp(3.05rem,8.9vw,8.6rem)] leading-[0.88]"
            lineClassName="tracking-[-0.055em]"
          />
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-8 border-t border-rule-soft pt-7 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="lede max-w-[44ch]">
              Fenvolt puts senior engineers inside product teams, and builds the
              AI systems those teams cannot staff yet: retrieval, document
              intelligence and agent workflows.
            </p>
            <p className="mt-5 text-[0.875rem] text-muted">
              Scoped and shipped by the same people.
            </p>
          </div>

          <nav aria-label="Capabilities" className="lg:col-span-4 lg:col-start-7">
            <ul className="border-t border-rule-soft">
              {serviceLinks.slice(0, 4).map((service, i) => (
                <li key={service.href} className="border-b border-rule-soft">
                  <Link
                    href={service.href}
                    className="group flex items-baseline justify-between gap-4 py-2.5 text-[0.9375rem] text-muted-strong transition-colors hover:text-ink"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="mono text-[0.625rem] text-muted-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {service.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.4}
                      className="size-3.5 shrink-0 text-muted-faint transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4 lg:col-span-2 lg:col-start-11 lg:justify-self-end">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <Link href="/work" className="link-line text-[0.875rem] text-muted">
              See the work
            </Link>
          </div>
        </div>
      </div>

      <figure className="relative mt-[clamp(2.5rem,5vw,4.5rem)]">
        <div className="shell">
          <div className="media media-grain relative h-[clamp(15rem,46vw,34rem)] w-full border border-rule-soft">
            <Image
              src="/work/specter-citation.jpg"
              alt="SPECTER's source viewer: a cited passage highlighted on page 16 of a judgment, with the document file name and page count alongside it."
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/45 via-transparent to-transparent"
            />
          </div>
        </div>

        <figcaption className="shell mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-[0.75rem] text-muted">
          <span className="max-w-[62ch]">
            SPECTER — a citation checked against page 16 of the original
            judgment before the answer is shown.
          </span>
          <Link
            href="/work/specter"
            className="arrow-link text-muted-strong hover:text-ink"
          >
            Open the case study
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          </Link>
        </figcaption>
      </figure>

      <div className="shell relative mt-[clamp(2.5rem,4vw,3.5rem)]">
        <Link
          href="#statement"
          className="group flex items-center gap-3 pb-6 text-[0.75rem] text-muted transition-colors hover:text-ink"
        >
          <span className="grid size-8 place-items-center rounded-full border border-rule-strong transition-colors group-hover:border-ink">
            <ArrowDown
              aria-hidden="true"
              className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
              strokeWidth={1.4}
            />
          </span>
          Scroll
        </Link>
      </div>
    </section>
  );
}
