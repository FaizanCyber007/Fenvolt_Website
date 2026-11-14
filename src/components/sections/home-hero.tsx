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
      <PageFrame />
      <div aria-hidden="true" className="hero-wash" />

      <div className="shell relative pt-24 md:pt-32">
        <div className="flex items-center justify-between gap-4 border-b border-rule-soft pb-3">
          <p className="eyebrow">AI engineering practice</p>
          <p className="eyebrow hidden sm:block">Lahore · Pakistan</p>
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
                      <span className="mono text-[0.6875rem] text-muted-faint">
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
        <div className="shell grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="media media-grain relative aspect-[1584/884] w-full overflow-hidden border border-rule-soft lg:col-span-9">
            <Image
              src="/work/specter-answer.jpg"
              alt="SPECTER: a legal question answered with a conclusion, key rule, application and a numbered list of authorities, each checked against its source page."
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/45 via-transparent to-transparent"
            />
          </div>

          <figcaption className="flex flex-col justify-between gap-6 border-rule-soft text-[0.75rem] text-muted lg:col-span-3 lg:border-l lg:pl-6">
            <div>
              <p className="eyebrow">SPECTER / cited answer</p>
              <p className="mt-3 max-w-[34ch] text-[0.8125rem] leading-relaxed">
                Every claim carries a numbered authority. Every citation is
                checked against the page before the answer is shown.
              </p>
            </div>

            <div>
              <dl className="border-t border-rule-soft">
                {[
                  ["Corpus", "11,341 judgments"],
                  ["Checked", "10 authorities"],
                  ["Scripts", "Urdu · English · Roman"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-3 border-b border-rule-soft py-2"
                  >
                    <dt className="text-[0.75rem] text-muted-faint">{label}</dt>
                    <dd className="text-right text-[0.75rem] text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/work/specter"
                className="arrow-link mt-4 text-[0.8125rem] text-muted-strong hover:text-ink"
              >
                Open the case study
                <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </figcaption>
        </div>
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
