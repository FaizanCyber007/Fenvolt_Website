import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Chapter header used across the site: index, rule, oversized title and an
 * optional note or action sitting on the baseline grid.
 */
export function SectionHeading({
  index,
  label,
  title,
  note,
  action,
  className,
  id,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  note?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("border-t border-rule pt-4", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="index-label">
          <span className="mono text-[0.75rem] tracking-[0.06em]">{index}</span>
          {label}
        </p>
        {action}
      </div>

      <Reveal className="mt-7 grid gap-6 md:mt-10 lg:grid-cols-12 lg:gap-8" y={12}>
        <h2 className="display col-span-full text-[clamp(2.35rem,4.7vw,4.3rem)] leading-[0.97] lg:col-span-8">
          {title}
        </h2>
        {note ? (
          <div className="max-w-[40ch] self-end text-[0.9375rem] leading-relaxed text-muted lg:col-span-4">
            {note}
          </div>
        ) : null}
      </Reveal>
    </div>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("link-line text-[0.875rem] text-muted-strong", className)}>
      {children}
    </Link>
  );
}
