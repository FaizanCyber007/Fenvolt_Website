import type { Metadata } from "next";
import Image from "next/image";
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
import { site } from "@/constants/site";
import { ButtonLink } from "@/components/ui/button-link";
import { PageFrame } from "@/components/visuals/page-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticeChapters } from "@/components/sections/practice-chapters";
import { MediaBand } from "@/components/visuals/media-band";
import { practices } from "@/constants/practices";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Four practices — technology, experience, strategy and growth — with nine detailed engagements inside them: embedded engineers, squads, retrieval, document intelligence, agent workflows and evaluation.",
  path: "/services",
});

const allServices = [...capacityServices, ...aiServices];

function ServiceChapter({
  service,
  plate = false,
}: {
  service: Service;
  plate?: boolean;
}) {
  return (
    <article id={service.id} className="scroll-mt-28 border-t border-rule pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="eyebrow">
          {service.index} — {service.name}
        </p>
        <p className="text-[0.75rem] text-muted-faint">{service.engagement}</p>
      </div>

      <h3 className="display mt-5 max-w-[24ch] text-[clamp(1.8rem,2.9vw,2.6rem)] leading-[1.03]">
        {service.headline}
      </h3>

      <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-strong">
            {service.what}
          </p>

          <div className="mt-7 border-t border-rule-soft pt-5">
            <p className="eyebrow">The problem</p>
            <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted">
              {service.problem}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow">How it runs</p>
          <ul className="mt-3 border-t border-rule-soft">
            {service.approach.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 border-b border-rule-soft py-3.5 text-[0.875rem] leading-relaxed text-muted"
              >
                <span className="mono pt-1 text-[0.75rem] text-muted-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <ul className="tag-row mt-4">
            {service.stack.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {plate ? (
        <figure className="mt-9 grid gap-6 border-t border-rule-soft pt-7 lg:grid-cols-12 lg:gap-8">
          <div className="media relative aspect-[4/3] w-full overflow-hidden border border-rule lg:col-span-5">
            <Image
              src="/archive/firman-seal.jpg"
              alt="Detail of a 1550 decree: a round seal, an illuminated gold heading and the opening lines of text on aged paper."
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-[0.8125rem] leading-relaxed text-muted lg:col-span-6 lg:col-start-7 lg:pt-1">
            <span className="mono uppercase tracking-[0.1em] text-muted-strong">
              Plate 02 — Illuminated firman
            </span>
            <span className="mt-2 block max-w-[46ch]">
              A decree opens with a seal and an illuminated heading, not a title
              field. The structure is implied by the page, and reading it is the
              first task of the build rather than a preprocessing step.
            </span>
            <span className="mt-2 block text-muted-faint">
              Ink, opaque watercolour and gold on paper, 957 AH / 1550 CE. The
              Metropolitan Museum of Art, open access.
            </span>
          </figcaption>
        </figure>
      ) : null}
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule-soft">
        <PageFrame />

        <div className="shell relative page-top">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft pb-3">
            <p className="eyebrow">Services</p>
            <p className="eyebrow hidden sm:block">Four practices · Nine engagements</p>
          </div>

          <h1 className="display mt-8 text-[clamp(2.9rem,7.4vw,7rem)] leading-[0.9] tracking-[-0.055em]">
            Four practices.
            <br />
            <span className="display-dim">One accountable team.</span>
          </h1>

          <div className="mt-10 grid gap-8 border-t border-rule-soft pt-7 lg:grid-cols-12 lg:gap-8">
            <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted-strong lg:col-span-5">
              Technology, experience, strategy and growth: the whole path from a
              rough problem to a system people use. Nine detailed engagements sit
              inside that, each with its own method and a written scope.
            </p>

            <div className="lg:col-span-3 lg:col-start-7">
              <p className="eyebrow">Engagements</p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                Month to month, defined milestones, a fixed-scope build, or a
                short assessment with a document at the end.
              </p>
            </div>

            <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
              <ButtonLink href="/contact">Start a scoping call</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-[clamp(3.5rem,6vw,6rem)]">
        <SectionHeading
          index="01"
          label="What we do"
          title={
            <>
              The work around a system,
              <br />
              <span className="display-dim">not just the code.</span>
            </>
          }
          note="Each practice can be bought on its own. Most builds use two or three of them, and the same lead stays on the account throughout."
        />

        <div className="mt-12 lg:mt-16">
          <PracticeChapters />
        </div>
      </section>

      <MediaBand
        src="/media/ink.webm"
        poster="/media/ink.jpg"
        alt="Black ink spreading through pale water in slow motion."
        label="Plate — Every system is a reading problem first"
        note="A document, a repository, a dashboard: someone has to read it before it can be automated. The rest is plumbing and judgement."
      />

      <section id="capacity" className="shell scroll-mt-24 py-[clamp(3.5rem,6vw,6rem)]">
        <div className="mb-10 border-b border-rule pb-5 lg:mb-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="eyebrow">02 — The nine engagements</p>
            <p className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
              Scope · Method · Handover
            </p>
          </div>
          <h2 className="display mt-6 max-w-[18ch] text-[clamp(2.1rem,3.6vw,3.1rem)] leading-[1.0]">
            The deep end of
            <br />
            <span className="display-dim">the four practices.</span>
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:col-span-2 lg:block">
            <nav aria-label="Service index" className="sticky top-28">
              <p className="eyebrow">Practices</p>
              <ol className="mt-4 border-t border-rule-soft">
                {practices.map((practice) => (
                  <li key={practice.id} className="border-b border-rule-soft">
                    <a
                      href={`#${practice.id}`}
                      className="group flex gap-2.5 py-2 text-[0.75rem] leading-snug text-muted transition-colors hover:text-ink"
                    >
                      <span className="mono text-[0.75rem] text-muted-faint">
                        {practice.index}
                      </span>
                      <span>{practice.name}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <p className="eyebrow mt-6">Engagements</p>
              <ol className="mt-4 border-t border-rule-soft">
                {allServices.map((service) => (
                  <li key={service.id} className="border-b border-rule-soft">
                    <a
                      href={`#${service.id}`}
                      className="group flex gap-2.5 py-2 text-[0.75rem] leading-snug text-muted transition-colors hover:text-ink"
                    >
                      <span className="mono text-[0.75rem] text-muted-faint">
                        {service.index}
                      </span>
                      <span>{service.name}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-9 lg:col-start-4">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
              <h2 className="display text-[clamp(1.9rem,3.2vw,2.9rem)] leading-none">
                Capacity
              </h2>
              <span className="mono text-[0.6875rem] text-muted">A1 — A3</span>
            </div>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
              Engineers who join the team and work in your repository, under your
              review process, from the first pull request.
            </p>

            <div className="mt-10 space-y-14">
              {capacityServices.map((service) => (
                <ServiceChapter key={service.id} service={service} />
              ))}
            </div>

            <div className="mt-20 flex items-baseline justify-between gap-4 border-b border-rule pb-4">
              <h2 className="display text-[clamp(1.9rem,3.2vw,2.9rem)] leading-none">
                Applied AI
              </h2>
              <span className="mono text-[0.6875rem] text-muted">B1 — B6</span>
            </div>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
              Fixed-scope systems that run on real records. Architecture,
              implementation, tests and handover are part of the same engagement.
            </p>

            <div className="mt-10 space-y-14">
              {aiServices.map((service) => (
                <ServiceChapter
                  key={service.id}
                  service={service}
                  plate={service.id === "documents"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="theme-bone paper-grain relative border-t border-rule-soft">
        <div className="shell section-pad">
          <SectionHeading
            index="10"
            label="Engagement models"
            title="Four ways the work is bought."
            note="Same engineers, same review process. The shape changes with what you need to staff."
          />

          <div
            className="mt-10 overflow-x-auto"
            role="region"
            aria-label="Engagement models — scrollable table"
            tabIndex={0}
          >
            <table className="spec-table min-w-[46rem]">
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

      <section className="border-t border-rule-soft">
        <div className="shell section-pad grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className="eyebrow">Fit</p>
            <h2 className="display mt-5 max-w-[14ch] text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.02]">
              A clear no is part of the offer.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-5">
            <p className="eyebrow">Works well when</p>
            <ul className="mt-4 border-t border-rule">
              {fitCriteria.good.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule-soft py-4 text-[0.9375rem] leading-relaxed text-muted-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Not the right fit when</p>
            <ul className="mt-4 border-t border-rule">
              {fitCriteria.not.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule-soft py-4 text-[0.9375rem] leading-relaxed text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="display max-w-[16ch] text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.94]">
              Tell us which one,
              <br />
              <span className="display-dim">or that we are wrong.</span>
            </h2>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/contact">Start a scoping call</ButtonLink>
              <a href={`mailto:${site.email}`} className="link-line text-[0.875rem] text-muted">
                Or email directly
              </a>
            </div>
          </div>

          <p className="mt-8 text-[0.8125rem] text-muted-faint">
            Prefer to see the work first?{" "}
            <Link href="/work" className="text-muted-strong underline decoration-rule-strong underline-offset-4 hover:text-ink">
              Read the case studies
              <ArrowUpRight aria-hidden="true" className="ml-1 inline size-3.5" strokeWidth={1.5} />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
