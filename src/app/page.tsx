import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { PracticeGrid } from "@/components/sections/practice-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { approach, capabilities, principles } from "@/constants/company";
import { projects } from "@/constants/projects";
import { site } from "@/constants/site";
import { ProjectPlate } from "@/components/visuals/project-plate";
import { ArchivePlate } from "@/components/visuals/archive-plate";
import { MotionPlate } from "@/components/visuals/motion-plate";
import { Parallax } from "@/components/motion/parallax";

const figures = [
  {
    value: "11,341",
    label: "Judgments & statutes indexed",
    note: "SPECTER corpus",
  },
  {
    value: "7",
    label: "Parser phases, plus a correction loop",
    note: "Document-Parser",
  },
  {
    value: "3",
    label: "Scripts in one index",
    note: "Urdu · English · Roman Urdu",
  },
  {
    value: "1:1",
    label: "Citation to page, before display",
    note: "Grounding rule",
  },
];

const [specter, parser] = projects;

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* 01 — statement, printed on bone stock */}
      <section
        id="statement"
        className="theme-bone paper-grain relative scroll-mt-24 border-t border-rule-soft"
      >
        <div className="shell section-pad">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
            <p className="index-label">01 — Position</p>
            <p className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              The problem, not the model
            </p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="display max-w-[24ch] text-[clamp(1.85rem,3.8vw,3.5rem)] leading-[1.06] tracking-[-0.035em]">
                  Most AI products fail in the parts that are not the model: the
                  ingestion, the schema, the review screen, the citation.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-8 border-t border-rule-soft pt-7 sm:grid-cols-2">
                <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
                  That is the work Fenvolt takes on. Senior engineers who read the
                  system before proposing a stack, write the design down, and ship
                  in slices you can run against your own records.
                </p>
                <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
                  Two halves, one practice: adding capacity to a product team, and
                  building the AI systems that team cannot staff yet.
                </p>
              </div>
            </div>

            <figure className="lg:col-span-4 lg:col-start-9">
              <div className="media relative aspect-[4/3] w-full overflow-hidden border border-rule">
                <MotionPlate
                  src="/media/tughra-loop.webm"
                  poster="/media/tughra-poster.jpg"
                  alt="Detail of an imperial tughra: interlaced calligraphy over illuminated paper."
                />
              </div>
              <figcaption className="mt-3 border-t border-rule-soft pt-3 text-[0.75rem] leading-relaxed text-muted">
                <span className="mono uppercase tracking-[0.1em] text-muted-strong">
                  Plate 01 — Tughra of Sultan Süleiman
                </span>
                <span className="mt-1.5 block max-w-[42ch]">
                  A decree carries its authority in three places: the seal, the
                  hand, the margin. Extraction fails in the same three places.
                </span>
                <span className="mt-1.5 block text-muted-faint">
                  Ink, opaque watercolour and gold on paper, ca. 1555–60. The
                  Metropolitan Museum of Art, open access.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 — selected work */}
      <section id="work" className="scroll-mt-24 border-t border-rule-soft">
        <div className="shell section-pad">
          <SectionHeading
            index="02"
            label="Selected work"
            title={
              <>
                Delivered systems,
                <br />
                <span className="display-dim">not concepts.</span>
              </>
            }
            note="Three delivered builds. Each one has its own page, with the architecture and the result."
            action={
              <Link href="/work" className="arrow-link text-[0.875rem] text-muted-strong hover:text-ink">
                All work
                <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              </Link>
            }
          />

          <div className="mt-12 md:mt-16">
            <Link href={`/work/${specter.slug}`} className="group grid gap-7 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <div className="media relative aspect-[4/3] w-full overflow-hidden border border-rule-soft sm:aspect-[16/10]">
                  <Image
                    src="/work/specter-answer.jpg"
                    alt="SPECTER answering a question with a structured, cited answer and a list of checked authorities."
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover object-left-top"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:border-l lg:border-rule-soft lg:pl-8">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="eyebrow">{specter.category}</p>
                    <span className="mono text-[0.6875rem] text-muted-faint">{specter.year}</span>
                  </div>
                  <h3 className="display mt-5 text-[clamp(2.8rem,5vw,4.6rem)] leading-none tracking-[-0.055em]">
                    {specter.shortTitle}
                  </h3>
                  <p className="mt-5 max-w-[40ch] text-[1rem] leading-relaxed text-muted-strong">
                    {specter.cardLine}
                  </p>
                </div>

                <div>
                  <ul className="tag-row border-t border-rule-soft pt-4">
                    {specter.stack.slice(0, 5).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <span className="arrow-link mt-5 text-[0.875rem]">
                    Read the case study
                    <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.4} />
                  </span>
                </div>
              </div>
            </Link>

            <div className="mt-14 grid gap-8 border-t border-rule-soft pt-10 sm:grid-cols-2 md:mt-20 md:gap-10">
              {[parser, projects[2]].map((project, i) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="group">
                  <div className="media relative aspect-[16/10] w-full overflow-hidden border border-rule-soft">
                    <ProjectPlate visual={project.visual} />
                  </div>

                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <p className="eyebrow">{String(i + 2).padStart(2, "0")} — {project.category}</p>
                    <span className="mono text-[0.6875rem] text-muted-faint">{project.year}</span>
                  </div>

                  <h3 className="display mt-3 text-[clamp(1.7rem,2.5vw,2.35rem)] leading-none tracking-[-0.04em]">
                    {project.shortTitle}
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-[0.875rem] leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <span className="arrow-link mt-4 text-[0.8125rem] text-muted-strong group-hover:text-ink">
                    View project
                    <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* plate — a document older than the software reading it */}
      <section
        aria-label="Plate: a Mughal-era firman, seal, hand and margin"
        className="border-t border-rule-soft"
      >
        <div className="media media-grain relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
          <Parallax className="absolute inset-0">
            <MotionPlate
              src="/media/firman-loop.webm"
              poster="/media/firman-poster.jpg"
              alt="A slow pass across a 1649 Mughal firman: the seal at the head, the illuminated panel and the scribe's hand below."
              sizes="100vw"
            />
          </Parallax>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-transparent to-transparent"
          />
        </div>
        <div className="shell flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="eyebrow">Plate 02 — Seal, hand and margin · 1649</p>
          <p className="max-w-[58ch] text-[0.875rem] leading-relaxed text-muted">
            The parts of a document that carry its authority are the parts an OCR
            pass drops first. That is the argument for reading the page, not just
            the text on it.
          </p>
        </div>
      </section>

      {/* 03 — services */}
      <section
        id="services"
        className="rule-field scroll-mt-24 border-t border-rule-soft bg-paper-deep/60"
      >
        <div className="shell section-pad">
          <SectionHeading
            index="03"
            label="What we do"
            title={
              <>
                Four practices.
                <br />
                <span className="display-dim">Nine ways in.</span>
              </>
            }
            note="Technology, design, strategy and growth — and nine detailed engagements inside them. Every one starts with the documents or the repository, not a deck."
            action={
              <Link href="/services" className="arrow-link text-[0.875rem] text-muted-strong hover:text-ink">
                Services
                <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              </Link>
            }
          />

          <div className="mt-10 md:mt-14">
            <PracticeGrid />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule-soft pt-5">
            <Link
              href="/services"
              className="arrow-link text-[0.875rem] text-muted-strong hover:text-ink"
            >
              All services, in detail
            </Link>
            <p className="text-[0.8125rem] text-muted-faint">
              Each practice is listed with its five services, deliverables and
              the engagement it is bought as.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — figures, printed on bone stock */}
      <section className="theme-bone paper-grain relative border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="eyebrow">04 — In the systems</p>
            <p className="max-w-[42ch] text-[0.8125rem] leading-relaxed text-muted">
              Numbers from the delivered systems, not projections. Each one has a
              case study behind it.
            </p>
          </div>

          <div className="col-rules mt-10 grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
            {figures.map((figure, i) => (
              <div key={figure.value} className="border-b border-rule-soft pb-7 pt-6 lg:border-b-0 lg:pr-8 lg:pl-8 lg:first:pl-0">
                <span className="mono text-[0.6875rem] text-muted-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="num mt-8 text-[clamp(2.9rem,5.2vw,4.6rem)] font-medium leading-none tracking-[-0.05em] lg:mt-16">
                  {figure.value}
                </p>
                <p className="mt-4 max-w-[22ch] text-[0.875rem] leading-snug text-muted-strong">
                  {figure.label}
                </p>
                <p className="mt-2 text-[0.75rem] text-muted-faint">{figure.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — approach */}
      <section className="border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="index-label">05 — How it runs</p>
                <h2 className="display mt-7 text-[clamp(2.2rem,3.7vw,3.4rem)] leading-[1.02]">
                  Read the system.
                  <br />
                  Write the design.
                  <br />
                  <span className="display-dim">Ship in slices.</span>
                </h2>
                <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
                  The same five steps whether the work is a two-week build or an
                  engineer inside your team.
                </p>
                <ButtonLink href="/company" variant="ghost" className="mt-7">
                  How we work
                </ButtonLink>
              </div>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {approach.map((step) => (
                <li key={step.index} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-rule-soft py-6 first:border-t md:grid-cols-[3rem_1fr_auto] md:gap-6 md:py-7">
                  <span className="mono pt-1 text-[0.6875rem] text-muted-faint">{step.index}</span>
                  <div>
                    <h3 className="text-[1.1875rem] font-medium tracking-[-0.015em]">{step.title}</h3>
                    <p className="mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                  <span className="hidden self-start pt-1.5 text-[0.75rem] text-muted-faint md:block">
                    {step.meta}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 06 — capability index */}
      <section className="border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-5">
            <p className="eyebrow">06 — Capability index</p>
            <p className="max-w-[42ch] text-[0.8125rem] leading-relaxed text-muted">
              Tools used in the delivered systems. The list is selective, not
              exhaustive.
            </p>
          </div>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((group) => (
              <div
                key={group.area}
                className="border-b border-rule-soft py-7 sm:border-r sm:pr-6 sm:last:border-r-0 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <h3 className="text-[0.9375rem] font-medium">{group.area}</h3>
                <p className="mt-2 max-w-[24ch] text-[0.8125rem] leading-relaxed text-muted">
                  {group.detail}
                </p>
                <ul className="mt-5 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[0.8125rem] text-muted-strong">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — the practice, with the founder on paper */}
      <section className="theme-bone paper-grain relative border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
            <p className="index-label">07 — The practice</p>
            <p className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              Founder-led practice
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <ArchivePlate
              className="lg:col-span-3"
              src="/brand/founder.jpg"
              width={1200}
              height={1500}
              alt="Portrait of Faizan Javed, founder of Fenvolt."
              label="Faizan Javed"
              caption="Founder and AI/ML engineer. Scopes the work, writes the retrieval pipelines, ships it."
              credit="Lahore, Pakistan"
              sizes="(min-width: 1024px) 22vw, 100vw"
            />

            <div className="lg:col-span-4 lg:col-start-5">
              <h2 className="display max-w-[16ch] text-[clamp(2.1rem,3.6vw,3.2rem)] leading-[1.0]">
                An engineering company, run by its engineers.
              </h2>
              <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted">
                Fenvolt is led by {site.founder}, who scopes the work and writes
                the retrieval pipelines. The person who proposes the architecture
                is the person who ships it.
              </p>
              <ButtonLink href="/company" variant="ghost" className="mt-7">
                About Fenvolt
              </ButtonLink>
            </div>

            <ol className="lg:col-span-4 lg:col-start-9">
              {principles.slice(0, 3).map((principle) => (
                <li key={principle.index} className="border-b border-rule-soft py-5 first:border-t">
                  <div className="flex items-baseline gap-4">
                    <span className="mono text-[0.6875rem] text-muted-faint">{principle.index}</span>
                    <div>
                      <h3 className="text-[1rem] font-medium">{principle.title}</h3>
                      <p className="mt-1.5 max-w-[42ch] text-[0.875rem] leading-relaxed text-muted">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              <li className="pt-5">
                <Link href="/company#principles" className="arrow-link text-[0.8125rem] text-muted-strong hover:text-ink">
                  All six principles
                  <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 08 — close */}
      <section className="border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <p className="eyebrow">08 — Next</p>
              <h2 className="display mt-8 text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.92]">
                Bring us the
                <br />
                <span className="display-dim">hard part.</span>
              </h2>
            </div>

            <div className="flex flex-col justify-end gap-6 lg:col-span-4">
              <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted">
                A paragraph about the problem is enough. We will tell you what we
                would do first, whether or not you hire us.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <ButtonLink href="/contact">Start a project</ButtonLink>
                <a href={`mailto:${site.email}`} className="link-line text-[0.875rem] text-muted">
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
