import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { notInScope, principles } from "@/constants/company";
import { site } from "@/constants/site";
import { ButtonLink } from "@/components/ui/button-link";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description:
    "Fenvolt is an engineering practice: senior capacity for product teams, and applied AI systems built by the engineers who scoped them.",
  path: "/company",
});

const workingNotes = [
  {
    label: "Communication",
    body: "A written weekly note: what shipped, what is blocked, what changed. No status theatre.",
  },
  {
    label: "Repository",
    body: "We work in your repo, with your review process, from the first pull request.",
  },
  {
    label: "Demos",
    body: "Working software against real records every week. A slide is not a demo.",
  },
  {
    label: "Handover",
    body: "Architecture notes, deployment steps and tests are part of the deliverable.",
  },
];

const background = [
  "AI/ML engineer, currently building production agentic systems at Arbisoft.",
  "Applied research on SPECTER in the MPVIR group at COMSATS University Islamabad.",
  "Author of Document-Parser, an open-source bilingual legal parsing pipeline.",
  "Machine learning engineering at Flyrank.ai, and freelance full-stack delivery since 2022.",
];

export default function CompanyPage() {
  return (
    <>
      <section className="pb-[clamp(2.5rem,5vw,4rem)] pt-[calc(4rem+clamp(2.5rem,6vw,5rem))] md:pt-[calc(4.75rem+clamp(2.5rem,6vw,5rem))]">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
            <p className="eyebrow">Company</p>
            <p className="eyebrow hidden sm:block">Lahore · remote</p>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-12 lg:gap-8">
            <h1 className="display max-w-[19ch] text-[clamp(2.6rem,5.8vw,5.2rem)] leading-[0.95] lg:col-span-8">
              An engineering practice, not a{" "}
              <em className="display-italic">talent marketplace</em>.
            </h1>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Two things, done properly: adding senior capacity to a team, and
                building the AI systems that team cannot staff yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule py-[clamp(3.5rem,7vw,6rem)]">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">01 / Philosophy</p>
            <h2 className="display mt-4 max-w-[16ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.03]">
              The model is the smallest part of the system.
            </h2>
          </div>

          <div className="max-w-[62ch] lg:col-span-7 lg:col-start-6">
            <div className="prose-fv">
              <p>
                A working AI product is mostly not a model. It is ingestion, a
                schema, a retrieval layer, an API, a review screen and a way to
                tell when the answer is wrong. Most of the failure modes live in
                those parts, and most of them are ordinary engineering.
              </p>
              <p>
                That is why the two halves of Fenvolt sit together. The same
                discipline that keeps a retrieval pipeline honest is the
                discipline that makes an embedded engineer useful in week one:
                read the system, write the design down, and ship in slices that
                can be checked.
              </p>
              <p>
                We are deliberately specific about what we do. If the work needs
                a different kind of team, saying so early is cheaper for both
                sides.
              </p>
            </div>

            <div className="mt-10 grid gap-4 border-t border-rule pt-6 sm:grid-cols-2">
              {workingNotes.map((note) => (
                <div key={note.label}>
                  <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
                    {note.label}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted-strong">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="principles"
        aria-labelledby="principles-title"
        className="scroll-mt-24 border-t border-rule bg-paper-deep/35 py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">02 / Principles</p>
              <h2
                id="principles-title"
                className="display mt-4 max-w-[20ch] text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.02]"
              >
                Six rules we actually use.
              </h2>
            </div>
            <p className="max-w-[36ch] text-[0.875rem] leading-relaxed text-muted">
              These are working constraints, not values on a wall. Each one
              changes how a build is scoped.
            </p>
          </div>

          <ol className="mt-10 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, i) => (
              <Reveal key={principle.index} as="li" delay={i * 0.03}>
                <div className="h-full bg-paper p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[0.625rem] tracking-[0.12em] text-accent-ink">
                      {principle.index}
                    </span>
                    <span className="h-px w-8 bg-rule-strong" />
                  </div>
                  <h3 className="mt-5 text-[1.0625rem] font-medium leading-snug">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="founder"
        className="border-t border-rule py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow">03 / Who you work with</p>
            <h2
              id="founder"
              className="display mt-4 max-w-[15ch] text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.02]"
            >
              {site.founder}
            </h2>
            <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
              Founder · AI/ML engineer
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line inline-flex items-center gap-1.5 text-[0.875rem]"
                >
                  {social.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="link-line text-[0.875rem] text-muted-strong"
              >
                Email
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="prose-fv">
              <p>
                Fenvolt is led by {site.founder}, who writes the retrieval
                pipelines and the services around them. The company is built
                around that: the person who scopes the work is the person who
                ships it.
              </p>
            </div>

            <div className="mt-8 border-t border-rule pt-5">
              <p className="eyebrow">Background</p>
              <ul className="mt-4 space-y-3">
                {background.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.875rem] leading-relaxed text-muted-strong"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-2.5 shrink-0 bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="limits"
        className="border-t border-rule py-[clamp(3.5rem,7vw,6rem)]"
      >
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">04 / Limits</p>
            <h2
              id="limits"
              className="display mt-4 max-w-[16ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.03]"
            >
              What we do not do.
            </h2>
            <p className="mt-4 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">
              A clear no is part of the offer. It saves both sides a quarter.
            </p>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {notInScope.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-5 border-b border-rule py-4 first:border-t"
              >
                <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-muted-strong">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shell mt-10">
          <ButtonLink href="/services" variant="ghost">
            Read the services
          </ButtonLink>
          <Link
            href="/work"
            className="link-line ml-5 inline-flex text-[0.875rem] text-muted-strong"
          >
            Or the work
          </Link>
        </div>
      </section>

      <ClosingCta
        index="05"
        title={
          <>
            A short call is
            <br className="hidden sm:block" /> usually{" "}
            <em className="display-italic">enough</em>.
          </>
        }
        body="Bring the problem, the constraints and what you have already tried. We will tell you what we would do first, whether or not you hire us."
      />
    </>
  );
}
