import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navigation, serviceLinks, site } from "@/constants/site";

const year = 2026;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-rule-soft bg-paper">
      <div className="shell">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-0 lg:py-16">
          <div className="lg:col-span-5 lg:pr-10">
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="text-[1.375rem] font-semibold tracking-[-0.04em]"
            >
              {site.name}
            </Link>
            <p className="mt-5 max-w-[32ch] text-[0.9375rem] leading-relaxed text-muted">
              Senior engineering capacity and applied AI systems, built by the
              people who scoped them.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="link-line mt-7 inline-flex text-[1.0625rem]"
            >
              {site.email}
            </a>

            <p className="mt-3 text-[0.8125rem] text-muted-faint">
              {site.location} · remote
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="lg:col-span-3 lg:border-l lg:border-rule-soft lg:px-8"
          >
            <h2 className="eyebrow">Index</h2>
            <ul className="mt-5 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted-strong transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2 lg:border-l lg:border-rule-soft lg:px-8">
            <h2 className="eyebrow">Services</h2>
            <ul className="mt-5 space-y-2.5">
              {serviceLinks.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted-strong transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:border-l lg:border-rule-soft lg:pl-8">
            <h2 className="eyebrow">Elsewhere</h2>
            <ul className="mt-5 space-y-2.5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-muted-strong transition-colors hover:text-ink"
                  >
                    {social.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.4}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="arrow-link mt-7 hidden text-[0.8125rem] text-muted-strong hover:text-ink lg:inline-flex"
            >
              Start a project
              <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative select-none overflow-hidden border-t border-rule-soft"
      >
        <div className="shell">
          <svg viewBox="0 0 1000 200" className="block w-full" focusable="false">
            <text
              x="0"
              y="190"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="var(--font-display)"
              fontSize="228"
              fontWeight="500"
              fill="#1b1b19"
            >
              Fenvolt
            </text>
          </svg>
        </div>
      </div>

      <div className="shell">
        <div className="flex flex-col gap-3 border-t border-rule-soft py-6 text-[0.75rem] text-muted-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="hidden md:block">
            Built in Lahore. Working wherever the team is.
          </p>
          <Link
            href="#top"
            className="group inline-flex items-center gap-2 text-[0.75rem] text-muted transition-colors hover:text-ink"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
