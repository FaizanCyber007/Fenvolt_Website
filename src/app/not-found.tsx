import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { navigation } from "@/constants/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[78vh] items-center py-24">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-rule pb-4">
          <p className="eyebrow">Error 404</p>
          <p className="eyebrow hidden sm:block">Not in the index</p>
        </div>

        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="display text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
              This page was
              <br />
              <em className="display-italic">never indexed.</em>
            </h1>
            <p className="lede mt-6 max-w-[42ch]">
              The link is wrong, the page moved, or it was never here. The work
              and the services are the useful places to go next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 py-4 text-[0.9375rem]"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.5625rem] text-muted"
                    >
                      →
                    </span>
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
