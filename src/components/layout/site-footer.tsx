import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import {
  elsewhereLinks,
  navigation,
  serviceLinks,
  site,
} from "@/constants/site";

const year = 2026;

export function SiteFooter() {
  return (
    <footer className="theme-bone paper-grain relative overflow-hidden border-t border-rule">
      <div className="shell relative">
        {/* sheet head */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule py-5">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.035em]"
          >
            <Image
              src="/brand/fenvolt-chip@2x.png"
              alt=""
              width={28}
              height={28}
              className="size-6 shrink-0"
            />
            {site.name}
          </Link>
          <p className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            {site.location} · PKT (UTC+5)
          </p>
        </div>

        {/* enquiry + index */}
        <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">New business</p>
            <a
              href={`mailto:${site.email}`}
              className="display mt-5 block break-words text-[clamp(1.5rem,4.2vw,3.1rem)] leading-[1.04] tracking-[-0.045em] transition-opacity hover:opacity-65"
            >
              {site.email}
            </a>
            <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted">
              A paragraph about the problem is enough. An engineer reads it and
              answers, usually within two working days.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/contact" variant="ghost">
                Start a project
              </ButtonLink>
              <a
                href={`tel:${site.telephone.replace(/[^+\d]/g, "")}`}
                className="link-line text-[0.875rem] text-muted-strong"
              >
                {site.telephone}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-8">
            <nav aria-label="Footer">
              <h2 className="eyebrow">Index</h2>
              <ul className="mt-4 space-y-2.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.875rem] text-muted-strong transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="eyebrow">Services</h2>
              <ul className="mt-4 space-y-2.5">
                {serviceLinks.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.875rem] text-muted-strong transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Elsewhere</h2>
              <ul className="mt-4 space-y-2.5">
                {elsewhereLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-start gap-1.5 text-[0.875rem] text-muted-strong transition-colors hover:text-ink"
                    >
                      {social.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-0.5 size-3 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* imprint */}
        <div className="flex flex-col gap-3 border-t border-rule py-6 text-[0.75rem] text-muted-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Lahore, Pakistan. All rights reserved.
          </p>
          <p className="hidden md:block">{site.tagline}</p>
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
