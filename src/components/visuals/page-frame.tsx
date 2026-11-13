import { cn } from "@/lib/utils";

/**
 * Construction marks: a visible column grid with trim marks at the sheet
 * corners, the way a plate is registered before printing. It replaces the
 * oversized circular arcs of the reference sites and sits behind the content
 * without intercepting pointer events.
 */
export function PageFrame({
  className,
  columns = true,
  marks = true,
}: {
  className?: string;
  columns?: boolean;
  marks?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {columns ? (
        <div className="shell relative h-full">
          <span className="absolute inset-y-0 left-1/4 hidden w-px bg-rule-soft md:block" />
          <span className="absolute inset-y-0 left-1/2 hidden w-px bg-rule-soft lg:block" />
          <span className="absolute inset-y-0 left-3/4 hidden w-px bg-rule-soft md:block" />
        </div>
      ) : null}

      {marks ? (
        <>
          <TrimMark className="left-[max(0.75rem,calc(var(--gutter)-1.75rem))] top-[6.75rem]" />
          <TrimMark className="right-[max(0.75rem,calc(var(--gutter)-1.75rem))] top-[6.75rem]" />
          <TrimMark className="bottom-5 left-[max(0.75rem,calc(var(--gutter)-1.75rem))]" />
          <TrimMark className="bottom-5 right-[max(0.75rem,calc(var(--gutter)-1.75rem))]" />
        </>
      ) : null}
    </div>
  );
}

function TrimMark({ className }: { className?: string }) {
  return (
    <span className={cn("absolute size-2.5 opacity-70", className)}>
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-rule-strong" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-rule-strong" />
    </span>
  );
}

/** Small horizontal rule used to separate a chapter label from its content. */
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-px w-full bg-rule-soft", className)} />;
}
