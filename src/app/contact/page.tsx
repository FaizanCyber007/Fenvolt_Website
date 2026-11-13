import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { elsewhereLinks, site } from "@/constants/site";
import { ContactForm } from "@/components/forms/contact-form";
import { PageFrame } from "@/components/visuals/page-frame";
import { ArchivePlate } from "@/components/visuals/archive-plate";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you are building. A technical scoping call, then a written scope with architecture, estimate and the parts we would not build.",
  path: "/contact",
});

const steps = [
  {
    index: "01",
    title: "We read the brief",
    body: "An engineer reads the message, not a sales inbox. If the fit is unclear, we ask one or two questions first.",
  },
  {
    index: "02",
    title: "A technical call",
    body: "Thirty minutes on the problem, the data and the constraints. Bring a document or a repository if you can.",
  },
  {
    index: "03",
    title: "A written scope",
    body: "Architecture, milestones and an estimate. It is yours whether or not the engagement proceeds.",
  },
];

const include = [
  "What the system has to do, in one paragraph.",
  "The documents or data it has to handle.",
  "What already exists — code, vendors, deadlines.",
  "What a correct outcome looks like.",
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule-soft">
        <PageFrame />

        <div className="shell relative page-top pb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft pb-3">
            <p className="eyebrow">Contact</p>
            <p className="eyebrow hidden sm:block">Scoping call · 30 minutes</p>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="display text-[clamp(3rem,7.6vw,7.4rem)] leading-[0.86] tracking-[-0.06em]">
                Let&rsquo;s connect.
              </h1>

              <div className="mt-10 grid gap-8 border-t border-rule-soft pt-7 sm:grid-cols-2 lg:grid-cols-8 lg:gap-8">
                <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted-strong lg:col-span-4">
                  A short brief is enough to start. If we are the wrong fit for
                  the work, the first call will say so.
                </p>
                <p className="text-[0.875rem] text-muted lg:col-span-4">
                  Replies from an engineer, usually within two working days.
                  <a
                    href={`mailto:${site.email}`}
                    className="link-line mt-3 flex w-fit text-[0.875rem] text-ink"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </div>

            <ArchivePlate
              className="max-w-[15rem] lg:col-span-3 lg:col-start-10 lg:max-w-none lg:justify-self-end"
              src="/brand/founder.jpg"
              width={1200}
              height={1500}
              alt="Portrait of Faizan Javed, founder of Fenvolt."
              label="Who replies"
              caption="Faizan Javed — founder. The brief is read by the person who would build it."
              credit="Lahore, Pakistan"
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 24vw, 60vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="theme-bone paper-grain relative">
        <div className="shell py-[clamp(3rem,6vw,5.5rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
              <h2 className="display text-[clamp(1.6rem,2.5vw,2rem)] leading-none">
                Tell us about the work
              </h2>
              <span className="mono text-[0.5625rem] uppercase text-muted-faint">
                Form
              </span>
            </div>
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="mb-8 flex items-start justify-between gap-4 border-b border-rule pb-4 text-[0.8125rem]">
                <p className="max-w-[24ch] leading-relaxed text-muted-strong">
                  One inbox. No sales team in between.
                </p>
                <Link href="/company#founder" className="arrow-link shrink-0 text-[0.75rem] text-muted hover:text-ink">
                  Founder
                  <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.5} />
                </Link>
              </div>

              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-4 border-t border-rule">
                {steps.map((step) => (
                  <li key={step.index} className="border-b border-rule-soft py-4">
                    <div className="flex items-baseline gap-3">
                      <span className="mono text-[0.5625rem] text-muted-faint">
                        {step.index}
                      </span>
                      <h3 className="text-[0.9375rem] font-medium">{step.title}</h3>
                    </div>
                    <p className="mt-1.5 pl-[1.7rem] text-[0.8125rem] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <h2 className="eyebrow">Direct</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="link-line mt-3 inline-flex text-[0.9375rem]"
                >
                  {site.email}
                </a>
                <div className="mt-4 flex flex-wrap items-center gap-5">
                  {elsewhereLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-line inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-strong"
                    >
                      {social.label}
                      <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-rule-soft pt-5">
                <h2 className="eyebrow">Studio</h2>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                  {site.location} — {site.hours}. Visits by appointment.
                </p>
                <p className="mono mt-2 text-[0.5625rem] uppercase tracking-[0.1em] text-muted-faint">
                  {site.coordinates}
                </p>
              </div>

              <div className="mt-8 border-t border-rule-soft pt-5">
                <h2 className="eyebrow">Worth including</h2>
                <ul className="mt-3">
                  {include.map((item) => (
                    <li
                      key={item}
                      className="border-b border-rule-soft py-2.5 text-[0.8125rem] leading-relaxed text-muted last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
          </div>
        </div>
      </section>
    </>
  );
}
