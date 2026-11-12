import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/constants/case-studies";
import { getProject, projects } from "@/constants/projects";
import { pageMetadata } from "@/lib/metadata";
import { SpecterArchitecture } from "@/components/visuals/specter-architecture";
import { ParserBand } from "@/components/visuals/parser-band";
import { AgentFlow } from "@/components/visuals/agent-flow";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Reveal } from "@/components/motion/reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return pageMetadata({
      title: "Case study",
      description: "Selected engineering work by Fenvolt.",
      path: `/work/${slug}`,
      type: "article",
    });
  }

  return pageMetadata({
    title: study.title,
    description: study.dek,
    path: `/work/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const project = getProject(slug);
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const heroImage = study.heroImage;

  return (
    <article>
      <header className="pt-[calc(4rem+clamp(2.5rem,6vw,5rem))] md:pt-[calc(4.75rem+clamp(2.5rem,6vw,5rem))]">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            <Link href="/work" className="transition-colors hover:text-ink">
              Work
            </Link>
            <span aria-hidden="true" className="text-warm">
              /
            </span>
            <span aria-current="page" className="text-ink">
              {study.title}
            </span>
          </nav>

          <p className="eyebrow mt-8">{study.eyebrow}</p>

          <h1 className="display mt-4 text-[clamp(3rem,7.5vw,6.4rem)] leading-[0.92]">
            {study.title}
          </h1>

          <div className="mt-9 grid gap-8 border-t border-rule pt-8 lg:grid-cols-12 lg:gap-8">
            <p className="max-w-[52ch] text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-[1.5] text-muted-strong lg:col-span-7">
              {study.dek}
            </p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-4 lg:col-start-9">
              {study.meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.8125rem] leading-snug text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <div className="shell mt-10 md:mt-14">
        {study.hero === "specter-image" && heroImage ? (
          <figure>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] border border-white/12 bg-plate md:aspect-[2/1]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1440px) 1376px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-muted">
              <span className="max-w-[70ch]">{heroImage.caption}</span>
              <span className="uppercase tracking-[0.12em]">Fig. 00</span>
            </figcaption>
          </figure>
        ) : study.hero === "parser" ? (
          <ParserBand />
        ) : (
          <AgentFlow />
        )}
      </div>

      <div className="shell py-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="min-w-0 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">In this study</p>
              <ol className="mt-4 border-t border-rule">
                {study.sections.map((section) => (
                  <li key={section.id} className="border-b border-rule">
                    <a
                      href={`#${section.id}`}
                      className="flex items-baseline justify-between gap-3 py-2.5 text-[0.8125rem] text-muted transition-colors hover:text-ink"
                    >
                      <span>{section.label}</span>
                      <span className="font-mono text-[0.5625rem] text-muted">
                        {section.index}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>

              {study.repository ? (
                <a
                  href={study.repository.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line mt-6 inline-flex items-center gap-1.5 text-[0.75rem] text-muted-strong"
                >
                  Repository
                  <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                </a>
              ) : null}

              <p className="mt-6 max-w-[26ch] font-mono text-[0.5625rem] leading-relaxed tracking-[0.06em] text-muted">
                {study.statusNote}
              </p>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            {study.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-28 border-t border-rule pb-12 pt-8 first:border-t-0 first:pt-0"
              >
                <p className="eyebrow">
                  {section.index} / {section.label}
                </p>
                <h2
                  id={`${section.id}-title`}
                  className="display mt-3 max-w-[24ch] text-[clamp(1.8rem,3.2vw,2.7rem)] leading-[1.04]"
                >
                  {section.title}
                </h2>

                {section.paragraphs?.length ? (
                  <div className="prose-fv mt-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {section.bullets ? (
                  <ul className="mt-7 grid gap-x-8 gap-y-5 border-t border-rule pt-5 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet.title}>
                        <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink">
                          {bullet.title}
                        </h3>
                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                          {bullet.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.visual === "specter" ? (
                  <div className="mt-8">
                    <SpecterArchitecture />
                  </div>
                ) : null}

                {section.future ? (
                  <p className="mt-6 border-l-2 border-accent pl-4 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-muted">
                    No accuracy, latency or adoption figures are published here
                    because none were supplied to this site.
                  </p>
                ) : null}
              </section>
            ))}

            {study.evidence?.[0] ? (
              <Reveal>
                <figure className="border-t border-rule pt-8">
                  <div className="overflow-hidden rounded-[6px] border border-white/12 bg-plate">
                    <Image
                      src={study.evidence[0].src}
                      alt={study.evidence[0].alt}
                      width={study.evidence[0].width}
                      height={study.evidence[0].height}
                      sizes="(min-width: 1024px) 800px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-muted">
                    {study.evidence[0].caption}
                  </figcaption>
                </figure>
              </Reveal>
            ) : null}

            <div className="mt-4 border-t border-rule pt-8">
              <p className="eyebrow">Stack</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                {study.stack.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted-strong"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {study.repository ? (
                <a
                  href={study.repository.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line mt-6 inline-flex items-center gap-2 text-[0.875rem]"
                >
                  {study.repository.label}
                  <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group block border-y border-rule bg-paper-deep/40"
        >
          <div className="shell flex flex-col gap-4 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Next study</p>
              <p className="display mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-none transition-transform duration-500 group-hover:translate-x-1">
                {next.shortTitle}
              </p>
              <p className="mt-2 max-w-[46ch] text-[0.875rem] text-muted">
                {next.category}
              </p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-full border border-rule-strong transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.25} />
            </span>
          </div>
        </Link>
      ) : null}

      {project ? (
        <p className="shell py-6 text-[0.75rem] text-muted">{project.role}</p>
      ) : null}

      <ClosingCta
        index="08"
        title={
          <>
            Have a corpus
            <br className="hidden sm:block" /> that refuses to behave?
          </>
        }
        body="Describe the documents, the volume and what a correct answer looks like. We will tell you whether retrieval is the right tool before proposing a build."
      />
    </article>
  );
}
