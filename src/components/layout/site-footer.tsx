import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, serviceLinks, site } from "@/constants/site";

const year = 2026;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-deep text-on-ink">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
      />
      <div className="shell relative">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/brand/fenvolt-chip.png"
                alt=""
                width={36}
                height={36}
                className="size-9 mix-blend-screen"
              />
              <span className="text-[1.125rem] font-semibold tracking-[-0.025em]">
                Fenvolt
              </span>
            </Link>

            <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-on-ink-muted">
              Senior engineering capacity and applied AI systems — built by the
              people who scoped them.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="link-line mt-8 inline-flex text-[1.0625rem]"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <h2 className="eyebrow mb-5">Navigate</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-on-ink-muted transition-colors hover:text-on-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-5">Capabilities</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              {serviceLinks.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-on-ink-muted transition-colors hover:text-on-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow mb-5">Elsewhere</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 text-on-ink-muted transition-colors hover:text-on-ink"
                  >
                    {social.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[0.75rem] text-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="mono text-[0.6875rem] tracking-[0.08em]">
            {site.location} · Working remotely with teams worldwide
          </p>
          <Link
            href="#top"
            className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-on-ink-muted transition-colors hover:text-on-ink"
          >
            Back to top
          </Link>
        </div>
      </div>

      <div aria-hidden="true" className="shell pointer-events-none select-none">
        <svg
          viewBox="0 0 1000 190"
          className="w-full translate-y-[0.14em] text-white/[0.045]"
          fill="currentColor"
        >
          <text
            x="0"
            y="160"
            fontFamily="var(--font-display), Georgia, serif"
            fontSize="210"
            letterSpacing="-6"
          >
            Fenvolt
          </text>
        </svg>
      </div>
    </footer>
  );
}
