import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/constants/case-studies";
import { getProject, projects } from "@/constants/projects";
import { pageMetadata } from "@/lib/metadata";
import { CaseFigure } from "@/components/visuals/case-figure";
import { ButtonLink } from "@/components/ui/button-link";
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
  const heroVariant = study.hero === "parser" ? "parser" : study.hero === "agents" ? "agents" : "specter";

  return (
    <article>
      <header className="shell page-top">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-soft pb-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[0.75rem] text-muted"
          >
            <Link href="/work" className="transition-colors hover:text-ink">
              Work
            </Link>
            <span aria-hidden="true" className="text-muted-faint">
              /
            </span>
            <span aria-current="page" className="text-muted-strong">
              {study.title}
            </span>
          </nav>
          <p className="eyebrow">{study.eyebrow}</p>
        </div>

        <h1 className="display mt-8 break-words text-[clamp(3.1rem,10.5vw,10rem)] leading-[0.86] tracking-[-0.06em]">
          {study.title}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-rule-soft pt-7 lg:grid-cols-12 lg:gap-8">
          <p className="max-w-[52ch] text-[clamp(1.0625rem,1.45vw,1.3125rem)] leading-[1.5] text-muted-strong lg:col-span-7">
            {study.dek}
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-4 lg:col-start-9">
            {study.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-faint">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-[0.8125rem] leading-snug text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="shell mt-10 md:mt-14">
        {heroImage ? (
          <figure>
            <div className="media media-grain relative aspect-[1584/884] w-full overflow-hidden border border-rule-soft">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1680px) 1568px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-3 text-[0.75rem] leading-relaxed text-muted">
              <span className="max-w-[76ch]">{heroImage.caption}</span>
              <span className="mono shrink-0 text-[0.5625rem] uppercase text-muted-faint">
                Fig. 00
              </span>
            </figcaption>
          </figure>
        ) : (
          <CaseFigure variant={heroVariant} />
        )}
      </div>

      <div className="shell py-[clamp(3.5rem,7vw,6.5rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">In this study</p>
              <ol className="mt-4 border-t border-rule">
                {study.sections.map((section) => (
                  <li key={section.id} className="border-b border-rule-soft">
                    <a
                      href={`#${section.id}`}
                      className="group flex items-baseline justify-between gap-3 py-2.5 text-[0.8125rem] text-muted transition-colors hover:text-ink"
                    >
                      <span>{section.label}</span>
                      <span className="mono text-[0.5625rem] text-muted-faint">
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

              <p className="mt-6 max-w-[28ch] border-t border-rule-soft pt-4 text-[0.75rem] leading-relaxed text-muted">
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
                className="scroll-mt-28 border-t border-rule pb-12 pt-6 first:border-t-0 first:pt-0"
              >
                <p className="index-label">
                  <span className="mono text-[0.625rem]">{section.index}</span>
                  {section.label}
                </p>

                <h2
                  id={`${section.id}-title`}
                  className="display mt-4 max-w-[24ch] text-[clamp(1.75rem,2.9vw,2.5rem)] leading-[1.04]"
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
                  <ul className="mt-7 grid gap-x-8 border-t border-rule-soft sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet.title}
                        className="border-b border-rule-soft py-4"
                      >
                        <h3 className="text-[0.875rem] font-medium text-ink">
                          {bullet.title}
                        </h3>
                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                          {bullet.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.visual ? (
                  <div className="mt-8">
                    <CaseFigure variant={section.visual} />
                  </div>
                ) : null}

              </section>
            ))}

            {study.evidence?.[0] ? (
              <Reveal>
                <figure className="border-t border-rule pt-8">
                  <div className="media relative overflow-hidden border border-rule-soft">
                    <Image
                      src={study.evidence[0].src}
                      alt={study.evidence[0].alt}
                      width={study.evidence[0].width}
                      height={study.evidence[0].height}
                      sizes="(min-width: 1024px) 860px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-3 text-[0.75rem] leading-relaxed text-muted">
                    <span className="max-w-[70ch]">{study.evidence[0].caption}</span>
                    <span className="mono shrink-0 text-[0.5625rem] uppercase text-muted-faint">
                      Fig. 05
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ) : null}

            <div className="mt-10 border-t border-rule pt-6">
              <p className="eyebrow">Stack</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {study.stack.map((item) => (
                  <li
                    key={item}
                    className="border-b border-rule-soft py-2 text-[0.8125rem] text-muted-strong"
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

              {project ? (
                <p className="mt-6 max-w-[52ch] text-[0.8125rem] leading-relaxed text-muted">
                  Role — {project.role}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="group block border-t border-rule-soft bg-paper-deep/60"
        >
          <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between md:py-12">
            <div>
              <p className="eyebrow">Next study</p>
              <p className="display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-none transition-transform duration-500 group-hover:translate-x-1.5">
                {next.shortTitle}
              </p>
              <p className="mt-3 max-w-[46ch] text-[0.8125rem] text-muted">
                {next.category}
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-rule-strong transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.25} />
            </span>
          </div>
        </Link>
      ) : null}

      <section className="border-t border-rule-soft">
        <div className="shell section-pad">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="display max-w-[20ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96]">
              Have a corpus that
              <br />
              <span className="display-dim">refuses to behave?</span>
            </h2>
            <div className="flex flex-col items-start gap-4">
              <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted">
                Describe the documents, the volume and what a correct answer looks
                like. We will tell you whether retrieval is the right tool before
                proposing a build.
              </p>
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
