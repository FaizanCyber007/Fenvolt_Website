import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/constants/site";
import { Reveal } from "@/components/motion/reveal";

type ClosingCtaProps = {
  index?: string;
  title?: React.ReactNode;
  body?: string;
  note?: string;
};

export function ClosingCta({
  index = "08",
  title,
  body = "Tell us what you are building, what is already in place, and where it is stuck. If we are the wrong fit, the first call will make that clear.",
  note = "Every enquiry is read before it is answered.",
}: ClosingCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-deep text-on-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 size-[34rem] -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="shell relative py-[clamp(4.5rem,9vw,8rem)]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">{index} / Start here</p>
          <p className="eyebrow hidden sm:block">Scoping call</p>
        </div>

        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[0.98]">
                {title ?? (
                  <>
                    Bring us the part you
                    <br className="hidden sm:block" /> cannot{" "}
                    <em className="display-italic">staff</em>.
                  </>
                )}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-on-ink-muted">
              {body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <ButtonLink href="/contact">Discuss a project</ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="link-line px-1 py-3 text-[0.9375rem] text-on-ink-muted"
              >
                {site.email}
              </a>
            </div>

            <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-white/60">
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
