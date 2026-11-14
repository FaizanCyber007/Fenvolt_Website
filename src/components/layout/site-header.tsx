"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { elsewhereLinks, navigation, site } from "@/constants/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const reduce = useReducedMotion();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.removeAttribute("data-menu-open");
      return;
    }

    document.body.dataset.menuOpen = "true";
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    window.setTimeout(() => focusables?.[0]?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOn(null);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.removeAttribute("data-menu-open");
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <header
      className="site-header"
      data-scrolled={scrolled}
      data-open={open}
    >
      <div className="shell">
        <div className="flex h-16 items-center gap-5 md:h-[5.25rem] md:gap-8">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="flex shrink-0 items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.035em]"
          >
            <Image
              src="/brand/fenvolt-chip@2x.png"
              alt=""
              width={32}
              height={32}
              priority
              className="size-[1.55rem] shrink-0 md:size-7"
            />
            {site.name}
          </Link>

          <span aria-hidden="true" className="hidden h-3.5 w-px bg-rule md:block" />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navigation.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="nav-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-5">
            <span className="hidden items-center gap-2 text-[0.75rem] text-muted-strong xl:flex">
              <span aria-hidden="true" className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-brand/35 blur-[2px]" />
                <span className="relative size-1.5 rounded-full bg-brand" />
              </span>
              Booking Q1 2027
            </span>

            <Link href="/contact" className="btn btn-sm hidden sm:inline-flex">
              <span>Start a project</span>
              <span className="btn-arrow">
                <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
              </span>
            </Link>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="menu-button -mr-1 p-1"
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="menu-lines" data-open={open} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            ref={panelRef}
            initial={reduce ? undefined : { opacity: 0, y: -8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper md:top-[5.25rem]"
          >
            <div className="shell flex min-h-full flex-col pb-10 pt-8 md:pt-14">
              <div className="grid flex-1 gap-12 lg:grid-cols-12 lg:gap-8">
                <nav aria-label="Site" className="lg:col-span-8">
                  <ul className="border-t border-rule-soft">
                    {navigation.map((item, i) => (
                      <li key={item.href} className="border-b border-rule-soft">
                        <Link
                          href={item.href}
                          onClick={() => setOpenOn(null)}
                          className="group flex items-baseline justify-between gap-6 py-4 md:py-5"
                        >
                          <span className="flex items-baseline gap-4 md:gap-8">
                            <span className="mono text-[0.6875rem] text-muted-faint">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="display text-[clamp(2.4rem,5vw,4.6rem)] leading-none tracking-[-0.05em] transition-colors group-hover:text-muted-strong">
                              {item.label}
                            </span>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            strokeWidth={1.25}
                            className="size-5 shrink-0 self-center text-muted transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink md:size-7"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
                  <div>
                    <p className="eyebrow">Direct</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-line mt-3 inline-flex text-[0.9375rem]"
                    >
                      {site.email}
                    </a>
                    <a
                      href={`tel:${site.telephone.replace(/[^+\d]/g, "")}`}
                      className="mt-2 block text-[0.9375rem] text-muted"
                    >
                      {site.telephone}
                    </a>
                  </div>

                  <div>
                    <p className="eyebrow">Elsewhere</p>
                    <ul className="mt-3 space-y-2">
                      {elsewhereLinks.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-line text-[0.9375rem] text-muted-strong"
                          >
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="eyebrow">Studio</p>
                    <p className="mt-3 max-w-[26ch] text-[0.875rem] leading-relaxed text-muted">
                      {site.location}. Mon–Fri, 10:00–19:00 PKT. Studio visits by
                      appointment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-t border-rule-soft pt-5">
                <p className="text-[0.8125rem] text-muted">
                  {"Senior engineering and applied AI — scoped and shipped by the same people."}
                </p>
                <Link href="/contact" className="btn btn-sm" onClick={() => setOpenOn(null)}>
                  <span>Tell us about the work</span>
                  <span className="btn-arrow">
                    <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
