import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { practices } from "@/constants/practices";
import { MotionPlate } from "@/components/visuals/motion-plate";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The four practices, presented in full: media, a short argument, and the five
 * services in each. The nine detailed engagements further down are the deep end
 * of this list.
 */
export function PracticeChapters() {
  return (
    <div className="space-y-16 lg:space-y-24">
      {practices.map((practice, i) => {
        const flipped = i % 2 === 1;

        return (
          <Reveal key={practice.id} as="section" y={22}>
            <article
              id={practice.id}
              className="scroll-mt-28 border-t border-rule pt-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="eyebrow">
                  <span className="mono text-[0.75rem] tracking-[0.06em]">
                    {practice.index}
                  </span>{" "}
                  — {practice.name}
                </p>
                <p className="text-[0.75rem] text-muted-faint">{practice.kicker}</p>
              </div>

              <div className="mt-7 grid gap-9 lg:grid-cols-12 lg:gap-8">
                <figure
                  className={cn(
                    "lg:sticky lg:top-28 lg:col-span-5 lg:self-start",
                    flipped
                      ? "lg:order-2 lg:col-start-8"
                      : "lg:order-1 lg:col-start-1",
                  )}
                >
                  <div className="media relative aspect-[4/3] w-full overflow-hidden border border-rule-soft">
                    <MotionPlate
                      src={practice.media.src}
                      poster={practice.media.poster}
                      alt={practice.media.alt}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                  <figcaption className="mt-2.5 border-t border-rule-soft pt-2.5 text-[0.6875rem] text-muted-faint">
                    <span className="mono uppercase tracking-[0.1em]">
                      Plate {practice.index}
                    </span>
                  </figcaption>
                </figure>

                <div
                  className={cn(
                    "lg:col-span-6",
                    flipped
                      ? "lg:order-1 lg:col-start-1"
                      : "lg:order-2 lg:col-start-7",
                  )}
                >
                  <h3 className="display max-w-[22ch] text-[clamp(1.75rem,2.7vw,2.4rem)] leading-[1.03]">
                    {practice.headline}
                  </h3>
                  <p className="mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted">
                    {practice.summary}
                  </p>

                  <ul className="mt-7 border-t border-rule-soft">
                    {practice.services.map((service, index) => (
                      <li
                        key={service.name}
                        className="group grid grid-cols-[1.9rem_1fr] gap-3 border-b border-rule-soft py-4"
                      >
                        <span className="mono pt-0.5 text-[0.6875rem] text-muted-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="flex flex-wrap items-baseline gap-x-2.5 text-[0.9375rem] font-medium leading-snug">
                            {service.href ? (
                              <Link
                                href={service.href}
                                className="link-line decoration-rule-strong hover:text-ink"
                              >
                                {service.name}
                              </Link>
                            ) : (
                              service.name
                            )}
                            {service.href ? (
                              <span className="mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-faint">
                                method
                              </span>
                            ) : null}
                          </h4>
                          <p className="mt-1 max-w-[52ch] text-[0.8125rem] leading-relaxed text-muted">
                            {service.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-faint">
                      Deliverables
                    </span>
                    <ul className="tag-row">
                      {practice.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}

      <p className="flex items-center gap-4 border-t border-rule-soft pt-5 text-[0.8125rem] text-muted">
        <span className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-faint">
          Next
        </span>
        The engagements below are the deep end of these four: how each one is
        scoped, run and handed over.
        <Link
          href="#capacity"
          className="ml-auto hidden shrink-0 items-center gap-1.5 text-muted-strong transition-colors hover:text-ink sm:inline-flex"
        >
          Read them
          <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
        </Link>
      </p>
    </div>
  );
}
