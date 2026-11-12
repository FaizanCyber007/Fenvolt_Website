import { cn } from "@/lib/utils";

type PlateProps = {
  children: React.ReactNode;
  className?: string;
  caption?: React.ReactNode;
  label?: React.ReactNode;
  id?: string;
};

export function Plate({ children, className, caption, label, id }: PlateProps) {
  return (
    <figure
      id={id}
      className={cn(
        "on-ink relative overflow-hidden rounded-[6px] border border-white/12 bg-plate text-on-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_40px_80px_-60px_rgba(0,0,0,1)]",
        className,
      )}
    >
      <CornerMarks />
      {label ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 sm:px-7">
          {label}
        </div>
      ) : null}
      {children}
      {caption ? (
        <figcaption className="border-t border-white/10 px-5 py-4 font-mono text-[0.6875rem] leading-relaxed tracking-[0.04em] text-on-ink-muted sm:px-7">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function CornerMarks() {
  const base =
    "pointer-events-none absolute h-2.5 w-2.5 border-[#f2f0e9]/25";
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={cn(base, "left-2 top-2 border-l border-t")} />
      <span className={cn(base, "right-2 top-2 border-r border-t")} />
      <span className={cn(base, "bottom-2 left-2 border-b border-l")} />
      <span className={cn(base, "bottom-2 right-2 border-b border-r")} />
    </span>
  );
}
