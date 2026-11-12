"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { aiServices, capacityServices } from "@/constants/services";
import { cn } from "@/lib/utils";

const rows = [
  capacityServices[0],
  capacityServices[1],
  aiServices[0],
  aiServices[1],
  aiServices[2],
  aiServices[4],
];

export function ServicesIndex() {
  const [open, setOpen] = useState<string>(rows[0].id);
  const [active, setActive] = useState<string>(rows[0].id);
  const reduce = useReducedMotion();
  const baseId = useId();

  const current = rows.find((row) => row.id === active) ?? rows[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-8">
        <ul className="border-t border-rule">
          {rows.map((row) => {
            const expanded = open === row.id;
            const panelId = `${baseId}-${row.id}-panel`;
            const buttonId = `${baseId}-${row.id}-button`;

            return (
              <li
                key={row.id}
                className="border-b border-rule-soft"
                onMouseEnter={() => setActive(row.id)}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => {
                      setOpen(expanded ? "" : row.id);
                      setActive(row.id);
                    }}
                    onFocus={() => setActive(row.id)}
                    className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 py-5 text-left md:gap-5 md:py-6"
                  >
                    <span
                      className={cn(
                        "mono text-[0.625rem] transition-colors",
                        expanded || active === row.id
                          ? "text-muted-strong"
                          : "text-muted-faint",
                      )}
                    >
                      {row.index}
                    </span>
                    <span
                      className={cn(
                        "display text-[clamp(1.6rem,3.1vw,2.7rem)] leading-none tracking-[-0.04em] transition-colors duration-300",
                        expanded || active === row.id
                          ? "text-ink"
                          : "text-muted-strong",
                      )}
                    >
                      {row.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-8 place-items-center rounded-full border transition-all duration-500",
                        expanded
                          ? "rotate-45 border-ink text-ink"
                          : "border-rule text-muted group-hover:border-rule-strong group-hover:text-ink",
                      )}
                    >
                      <Plus className="size-3.5" strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-7 pl-[2.6rem] md:grid-cols-12 md:gap-8 md:pl-[3.3rem]">
                        <div className="md:col-span-7">
                          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-strong">
                            {row.what}
                          </p>
                          <p className="mt-4 text-[0.8125rem] text-muted">
                            {row.engagement}
                          </p>
                        </div>
                        <ul className="space-y-2.5 border-l border-rule-soft pl-5 md:col-span-4 md:col-start-9">
                          {row.approach.slice(0, 2).map((item) => (
                            <li
                              key={item}
                              className="text-[0.8125rem] leading-relaxed text-muted"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center gap-5">
          <Link
            href="/services"
            className="arrow-link text-[0.875rem] text-muted-strong hover:text-ink"
          >
            All services in detail
          </Link>
          <span aria-hidden="true" className="h-px flex-1 bg-rule-soft" />
        </div>
      </div>

      {/* desktop index plate: the selected service, set large */}
      <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
        <div className="sticky top-28 border-t border-rule pt-5">
          <span aria-hidden="true" className="chapter-num block">
            {current.index}
          </span>
          <p className="mt-6 text-[1.0625rem] font-medium leading-snug">
            {current.headline}
          </p>
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
            {current.problem}
          </p>

          <div className="mt-6 border-t border-rule-soft pt-4">
            <p className="eyebrow">Typical stack</p>
            <ul className="mt-3 space-y-1.5">
              {current.stack.slice(0, 4).map((item) => (
                <li key={item} className="text-[0.8125rem] text-muted-strong">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
