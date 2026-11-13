import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { navigation } from "@/constants/site";
import { PageFrame } from "@/components/visuals/page-frame";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden">
      <PageFrame />

      <div className="shell relative py-32">
        <div className="flex items-baseline justify-between border-b border-rule-soft pb-3">
          <p className="eyebrow">Error 404</p>
          <p className="eyebrow hidden sm:block">Not in the index</p>
        </div>

        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1 className="display text-[clamp(2.9rem,7.6vw,7rem)] leading-[0.9] tracking-[-0.055em]">
              This page was
              <br />
              <span className="display-dim">never indexed.</span>
            </h1>
            <p className="mt-8 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
              The link is wrong, the page moved, or it was never here. The work
              and the services are the useful places to go next.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ButtonLink href="/work">Read the work</ButtonLink>
              <ButtonLink href="/" variant="ghost">
                Back home
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Site" className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Or go to</p>
            <ul className="mt-4 border-t border-rule">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-rule-soft">
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-4 py-4 text-[0.9375rem] text-muted-strong transition-colors hover:text-ink"
                  >
                    {item.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 text-muted-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
