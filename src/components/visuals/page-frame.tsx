import { cn } from "@/lib/utils";

/**
 * Construction lines: the references draw every page on a visible column grid
 * with hairline verticals and a large circle that runs off the canvas. It sits
 * behind the content and never intercepts pointer events.
 */
export function PageFrame({
  className,
  arc = true,
  columns = true,
}: {
  className?: string;
  arc?: boolean;
  columns?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {columns ? (
        <div className="shell relative h-full">
          <span className="absolute inset-y-0 left-[25%] hidden w-px bg-[rgba(239,237,231,0.055)] md:block" />
          <span className="absolute inset-y-0 left-1/2 hidden w-px bg-[rgba(239,237,231,0.045)] lg:block" />
          <span className="absolute inset-y-0 left-[75%] hidden w-px bg-[rgba(239,237,231,0.055)] md:block" />
        </div>
      ) : null}

      {arc ? (
        <>
          <span className="absolute -right-[34vw] top-[6%] hidden size-[74vw] rounded-full border border-[rgba(239,237,231,0.07)] sm:block" />
          <span className="absolute -right-[24vw] top-[16%] hidden size-[50vw] rounded-full border border-[rgba(239,237,231,0.05)] sm:block" />
        </>
      ) : null}
    </div>
  );
}

/** Small horizontal rule used to separate a chapter label from its content. */
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-px w-full bg-rule-soft", className)} />;
}
