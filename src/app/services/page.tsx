import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import {
  aiServices,
  capacityServices,
  engagementModels,
  fitCriteria,
  type Service,
} from "@/constants/services";
import { ClosingCta } from "@/components/sections/closing-cta";
import { RetrievalNarrowing } from "@/components/visuals/retrieval-narrowing";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Embedded engineers, dedicated squads and white-label delivery, plus retrieval, document intelligence, agent workflows and the backend around them.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="pb-[clamp(3rem,5vw,4rem)] pt-[calc(4rem+clamp(3rem,7vw,6rem))] md:pt-[calc(4.75rem+clamp(3rem,7vw,6rem))]">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
            <p className="eyebrow">Services</p>
            <p className="eyebrow hidden sm:block">Engagement models</p>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="display max-w-[18ch] text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.96]">
                Capacity, or the system.{" "}
                <em className="display-italic">Usually both.</em>
              </h1>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Two ways to work with Fenvolt. Most engagements start with one
                and end up using the other.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <a href="#capacity" className="link-line text-[0.875rem]">
                  A — Engineering capacity
                </a>
                <a href="#ai" className="link-line text-[0.875rem]">
                  B — AI engineering
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="capacity"
        aria-labelledby="capacity-title"
        className="scroll-mt-24 border-t border-rule bg-paper-deep/30 py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="index-label">
                <span>A</span>
                <span aria-hidden="true" className="text-warm">
                  /
                </span>
                <span>Track one</span>
              </p>
              <h2
                id="capacity-title"
                className="display mt-4 text-[clamp(2.2rem,4.2vw,3.8rem)] leading-none"
              >
                Engineering capacity
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="lede max-w-[50ch]">
                Senior engineers who join your team and take tickets. We match
                the stack and the domain before the first call, not after a
                month of onboarding.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-rule-strong">
            {capacityServices.map((service, i) => (
              <ServiceRow key={service.id} service={service} delay={i * 0.04} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="ai"
        aria-labelledby="ai-title"
        className="scroll-mt-24 border-t border-rule py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="index-label">
                <span>B</span>
                <span aria-hidden="true" className="text-warm">
                  /
                </span>
                <span>Track two</span>
              </p>
              <h2
                id="ai-title"
                className="display mt-4 text-[clamp(2.2rem,4.2vw,3.8rem)] leading-none"
              >
                AI engineering
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="lede max-w-[50ch]">
                Systems, not prompts. We scope the failure modes first, then
                build the pipeline, the service and the interface around it.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <RetrievalNarrowing />
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border-t border-rule-strong">
                {aiServices.map((service, i) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    delay={i * 0.03}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="engagement"
        className="border-t border-rule bg-paper-deep/35 py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Engagement models</p>
              <h2
                id="engagement"
                className="display mt-4 max-w-[22ch] text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.02]"
              >
                Four shapes. One standard.
              </h2>
            </div>
            <p className="max-w-[38ch] text-[0.875rem] leading-relaxed text-muted">
              Scope determines the shape. We quote after the technical call,
              once the work is understood well enough to estimate honestly.
            </p>
          </div>

          <div
            className="mt-9 overflow-x-auto"
            role="region"
            aria-label="Engagement models table. Scroll horizontally on narrow screens."
            tabIndex={0}
          >
            <table className="spec-table min-w-[720px]">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Shape</th>
                  <th scope="col">Best for</th>
                  <th scope="col">How it starts</th>
                  <th scope="col">What you get</th>
                </tr>
              </thead>
              <tbody>
                {engagementModels.map((model) => (
                  <tr key={model.name}>
                    <td>{model.name}</td>
                    <td>{model.shape}</td>
                    <td>{model.bestFor}</td>
                    <td>{model.starts}</td>
                    <td>{model.youGet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="fit"
        className="border-t border-rule py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Fit</p>
            <h2
              id="fit"
              className="display mt-4 max-w-[16ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.03]"
            >
              A good fit is a two-way test.
            </h2>
            <p className="mt-4 max-w-[36ch] text-[0.875rem] leading-relaxed text-muted">
              We would rather say no on the first call than discover the mismatch
              in month two.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            <FitList title="We are a good fit if" items={fitCriteria.good} tone="good" />
            <FitList title="Probably not us if" items={fitCriteria.not} tone="not" />
          </div>
        </div>
      </section>

      <ClosingCta
        index="08"
        title={
          <>
            Tell us which half
            <br className="hidden sm:block" /> is{" "}
            <em className="display-italic">missing</em>.
          </>
        }
        body="A committed roadmap with a gap, a document pipeline that keeps failing, or a system that works on the demo data and nowhere else. All three are useful starting points."
      />
    </>
  );
}

function ServiceRow({
  service,
  delay,
  compact,
}: {
  service: Service;
  delay: number;
  compact?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <article
        id={service.id}
        className="scroll-mt-24 border-b border-rule py-8 sm:py-10"
      >
        <div className={compact ? "grid gap-5" : "grid gap-6 lg:grid-cols-12 lg:gap-8"}>
          <div className={compact ? "" : "lg:col-span-4"}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[0.625rem] tracking-[0.12em] text-accent-ink">
                {service.index}
              </span>
              <h3 className="display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-none">
                {service.name}
              </h3>
            </div>
            <p className="mt-3 max-w-[34ch] text-[0.9375rem] text-muted-strong">
              {service.headline}
            </p>
            <p className="mono mt-4 text-[0.5625rem] uppercase tracking-[0.1em] text-muted">
              {service.engagement}
            </p>
          </div>

          <div className={compact ? "grid gap-6 sm:grid-cols-2" : "lg:col-span-5"}>
            <p className="max-w-[52ch] text-[0.875rem] leading-relaxed text-muted-strong">
              {service.what}
            </p>

            <div className="mt-4">
              <p className="eyebrow">The problem</p>
              <p className="mt-2 max-w-[52ch] text-[0.875rem] leading-relaxed text-muted">
                {service.problem}
              </p>
            </div>

            <div className="mt-5">
              <p className="eyebrow">Approach</p>
              <ul className="mt-2 space-y-2">
                {service.approach.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted-strong"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-px w-2.5 shrink-0 bg-accent-ink"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={compact ? "" : "lg:col-span-3"}>
            <p className="eyebrow">Stack</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {service.stack.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="link-line mt-6 inline-flex items-center gap-1.5 text-[0.8125rem]"
            >
              Discuss {service.name.toLowerCase()}
              <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function FitList({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "good" | "not";
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 border-b border-rule pb-3">
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full ${
            tone === "good" ? "bg-accent-ink" : "bg-rule-strong"
          }`}
        />
        <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
          {title}
        </h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="text-[0.875rem] leading-relaxed text-muted-strong">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
