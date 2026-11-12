"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/constants/site";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);
  const toggle = () => setOpenOn(open ? null : pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    focusables?.[0]?.focus();

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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell pt-3 md:pt-4">
        <div
          className={cn(
            "relative z-50 flex h-14 items-center justify-between gap-4 rounded-[10px] border px-3 transition-all duration-500 md:h-[60px] md:px-4",
            scrolled || open
              ? "border-white/12 bg-[rgba(6,9,13,0.82)] shadow-[0_24px_70px_-40px_rgba(0,0,0,1)] backdrop-blur-2xl"
              : "border-white/8 bg-white/[0.025] backdrop-blur-xl",
          )}
        >
          <Link
            href="/"
            onClick={close}
            aria-label={`${site.name} — home`}
            className="group flex items-center gap-2.5"
          >
            <Image
              src="/brand/fenvolt-chip.png"
              alt=""
              width={30}
              height={30}
              priority
              className="size-[26px] shrink-0 rounded-[5px] ring-1 ring-white/15 md:size-[28px]"
            />
            <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">
              Fenvolt
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative inline-block py-2 text-[0.8125rem] tracking-[-0.005em] transition-colors",
                      isActive(item.href)
                        ? "text-ink"
                        : "text-muted-strong hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-[3px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-300",
                        isActive(item.href)
                          ? "opacity-100 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                          : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ButtonLink href="/contact" className="btn-sm">
                Book a call
              </ButtonLink>
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-[6px] border border-white/12 bg-white/[0.04] md:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
              ) : (
                <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            ref={panelRef}
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[rgba(5,7,10,0.96)] pt-[4.75rem] backdrop-blur-2xl md:hidden"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <span className="absolute -top-24 right-0 size-72 rounded-full bg-accent/15 blur-[100px]" />
            </div>
            <nav aria-label="Mobile" className="shell relative flex min-h-full flex-col pb-10 pt-8">
              <ul className="flex-1">
                {navigation.map((item, i) => (
                  <li key={item.href} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-baseline justify-between gap-4 py-5"
                    >
                      <span className="display text-[2.15rem] leading-none">
                        {item.label}
                      </span>
                      <span className="mono text-[0.625rem] tracking-[0.14em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-5">
                <div onClick={close}>
                  <ButtonLink href="/contact" className="w-full">
                    Book a scoping call
                  </ButtonLink>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="link-line text-[0.9375rem] text-muted-strong"
                  >
                    {site.email}
                  </a>
                  <ul className="flex items-center gap-5">
                    {site.socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-line text-[0.8125rem] text-muted"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
