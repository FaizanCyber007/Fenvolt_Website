import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { notInScope, principles } from "@/constants/company";
import { site } from "@/constants/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { PageFrame } from "@/components/visuals/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArchivePlate } from "@/components/visuals/archive-plate";

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
  "Founder and principal engineer at Fenvolt: retrieval, document intelligence and agent systems.",
  "Built SPECTER, a bilingual legal document intelligence system over 11,341 judgments and statutes with citation-level grounding.",
  "Author of Document-Parser, an open-source bilingual legal parsing pipeline benchmarked against LlamaParse and Reducto.",
  "BS Computer Science, COMSATS University Islamabad, 2023–2027.",
  "Certified in applied AI and data engineering — DeepLearning.AI, IBM, Cisco.",
];

const studio = [
  { label: "Office", value: site.location },
  { label: "Hours", value: site.hours },
  { label: "Time zone", value: `${site.timezone} · same day as the Gulf` },
  { label: "Coordinates", value: site.coordinates },
  { label: "Visits", value: "By appointment — address on confirmation" },
  { label: "Engagements", value: "Embedded, squad, fixed scope, retainer" },
];

export default function CompanyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule-soft">
        <PageFrame />

        <div className="shell relative page-top pb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft pb-3">
            <p className="eyebrow">Company</p>
            <p className="eyebrow hidden sm:block">
              Independent practice · Lahore
            </p>
          </div>

          <h1 className="display mt-8 max-w-[22ch] text-[clamp(2.9rem,7vw,6.6rem)] leading-[0.9] tracking-[-0.055em]">
            An engineering company,
            <br />
            <span className="display-dim">based in Lahore.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-rule-soft pt-7 lg:grid-cols-12 lg:gap-8">
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-strong lg:col-span-5">
              Two things, done properly: putting senior engineers inside a product
              team, and building the AI systems that team cannot staff yet. Same
              office, same engineers, same standard.
            </p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-4 lg:col-start-7">
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
                  Founder
                </dt>
                <dd className="mt-1.5 text-[0.875rem]">{site.founder}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
                  Based
                </dt>
                <dd className="mt-1.5 text-[0.875rem]">Lahore · PKT (UTC+5)</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
                  Focus
                </dt>
                <dd className="mt-1.5 text-[0.875rem]">Retrieval · Documents</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
                  Model
                </dt>
                <dd className="mt-1.5 text-[0.875rem]">Embedded or fixed scope</dd>
              </div>
            </dl>

            <div className="lg:col-span-2 lg:col-start-11 lg:justify-self-end">
              <ButtonLink href="/contact" variant="ghost">
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="index-label">01 — Philosophy</p>
            <h2 className="display mt-7 max-w-[16ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.02]">
              The model is the smallest part of the system.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
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

            <div className="mt-10 grid gap-x-8 border-t border-rule-soft sm:grid-cols-2">
              {workingNotes.map((note) => (
                <div key={note.label} className="border-b border-rule-soft py-4">
                  <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
                    {note.label}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-strong">
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
        className="theme-bone paper-grain relative scroll-mt-24 border-t border-rule-soft"
      >
        <div className="shell section-pad">
          <SectionHeading
            index="02"
            label="Principles"
            title={
              <span id="principles-title">
                Six rules we actually use.
              </span>
            }
            note="These are working constraints, not values on a wall. Each one changes how a build is scoped."
          />

          <ol className="mt-10 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, i) => (
              <Reveal key={principle.index} as="li" delay={i * 0.03}>
                <div className="h-full border-b border-rule-soft py-6 sm:pr-8 sm:[&:nth-child(2n)]:pl-8 sm:[&:nth-child(2n+1)]:border-r lg:[&:nth-child(2n)]:pl-0 lg:[&:nth-child(3n-1)]:px-8 lg:[&:nth-child(3n+1)]:pr-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="mono text-[0.625rem] text-muted-faint">
                      {principle.index}
                    </span>
                    <span aria-hidden="true" className="h-px w-8 bg-rule" />
                  </div>
                  <h3 className="mt-6 text-[1.0625rem] font-medium leading-snug">
                    {principle.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">
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
        className="theme-bone paper-grain relative border-t border-rule-soft"
      >
        <div className="shell section-pad grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className="index-label">03 — Who you work with</p>
            <ArchivePlate
              className="mt-7"
              src="/brand/founder.jpg"
              width={1200}
              height={1500}
              alt="Portrait of Faizan Javed, founder of Fenvolt."
              label={site.founder}
              caption="Founder · AI/ML engineer"
              credit="Lahore, Pakistan"
              sizes="(min-width: 1024px) 22vw, 100vw"
            />
          </div>

          <div className="lg:col-span-4 lg:col-start-5">
            <p className="eyebrow">Founder · Principal engineer</p>
            <h2
              id="founder"
              className="display mt-4 max-w-[15ch] text-[clamp(2.4rem,4.2vw,3.6rem)] leading-[0.98]"
            >
              {site.founder}
            </h2>
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted">
              Fenvolt is led by {site.founder}, who writes the retrieval
              pipelines and the services around them. The person who scopes the
              work is the person who ships it — and the one who answers the
              phone when a build is live.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
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
                href={`mailto:${site.founderEmail}`}
                className="link-line text-[0.875rem] text-muted-strong"
              >
                {site.founderEmail}
              </a>
              <a
                href={`tel:${site.telephone.replace(/[^+\d]/g, "")}`}
                className="text-[0.875rem] text-muted"
              >
                {site.telephone}
              </a>
            </div>

            <ul className="tag-row mt-7 border-t border-rule-soft pt-4">
              {["English", "Urdu", "Punjabi"].map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Background</p>
            <ul className="mt-4 border-t border-rule">
              {background.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule-soft py-3 text-[0.875rem] leading-relaxed text-muted-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="studio"
        className="relative scroll-mt-24 border-t border-rule-soft"
      >
        <div className="shell section-pad grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="index-label">04 — The office</p>
            <h2
              id="studio"
              className="display mt-7 max-w-[15ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.02]"
            >
              A real office,
              <br />
              <span className="display-dim">open to clients.</span>
            </h2>
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
              Fenvolt works from a studio in Lahore, in the same time zone as
              Karachi, Dubai and Riyadh. Clients visit; the team is here.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={`mailto:${site.email}`} className="link-line text-[0.875rem] text-muted-strong">
                {site.email}
              </a>
              <a
                href={`tel:${site.telephone.replace(/[^+\d]/g, "")}`}
                className="text-[0.875rem] text-muted"
              >
                {site.telephone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="grid border-t border-rule sm:grid-cols-2">
              {studio.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-rule-soft py-4 sm:pr-6 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(even)]:pl-6"
                >
                  <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
              <div className="border-b border-rule-soft py-4 sm:col-span-2 sm:pr-6">
                <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
                  Working with
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">
                  Teams in Pakistan, the Gulf, the UK and North America — async
                  by default, with a standing call in your working hours.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="limits" className="border-t border-rule-soft">
        <div className="shell section-pad grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="index-label">05 — Limits</p>
            <h2
              id="limits"
              className="display mt-7 max-w-[16ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.02]"
            >
              What we do not do.
            </h2>
            <p className="mt-5 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">
              We would rather decline than sell a quarter we cannot deliver. The
              boundary is stated up front, in writing.
            </p>

            <div className="mt-7 flex flex-col items-start gap-4">
              <ButtonLink href="/services" variant="ghost">
                Read the services
              </ButtonLink>
              <Link href="/work" className="link-line text-[0.875rem] text-muted-strong">
                Or the work
              </Link>
            </div>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {notInScope.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-5 border-b border-rule-soft py-4 first:border-t"
              >
                <span className="mono text-[0.5625rem] text-muted-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-muted-strong">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">06 — Next</p>
              <h2 className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.94]">
                A short call is
                <br />
                <span className="display-dim">usually enough.</span>
              </h2>
            </div>
            <div className="flex max-w-[40ch] flex-col items-start gap-5">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Bring the problem, the constraints and what you have already
                tried. We will tell you what we would do first, whether or not
                you hire us.
              </p>
              <ButtonLink href="/contact">Book a scoping call</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
