import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/constants/site";
import { ContactForm } from "@/components/forms/contact-form";

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
      <section className="pb-[clamp(2rem,4vw,3rem)] pt-[calc(4rem+clamp(2.5rem,5vw,4rem))] md:pt-[calc(4.75rem+clamp(2.5rem,5vw,4rem))]">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
            <p className="eyebrow">Contact</p>
            <p className="eyebrow hidden sm:block">Scoping call</p>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-12 lg:gap-8">
            <h1 className="display max-w-[18ch] text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.95] lg:col-span-7">
              Tell us what you are{" "}
              <em className="display-italic">building</em>.
            </h1>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                A short brief is enough to start. If we are the wrong fit for the
                work, the first call will say so.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[clamp(3.5rem,7vw,6rem)]">
        <div className="shell grid gap-12 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-4 border-t border-rule">
                {steps.map((step) => (
                  <li key={step.index} className="border-b border-rule py-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-accent-ink">
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
                  {site.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-line inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-strong"
                    >
                      {social.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3"
                        strokeWidth={1.5}
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-rule pt-5">
                <h2 className="eyebrow">Worth including</h2>
                <ul className="mt-3 space-y-2.5">
                  {include.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65em] h-px w-2.5 shrink-0 bg-warm"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
