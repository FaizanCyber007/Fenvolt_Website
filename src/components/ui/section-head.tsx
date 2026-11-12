import { cn } from "@/lib/utils";

type SectionHeadProps = {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "split";
  className?: string;
  titleClassName?: string;
  id?: string;
};

export function SectionHead({
  index,
  label,
  title,
  lede,
  align = "left",
  className,
  titleClassName,
  id,
}: SectionHeadProps) {
  return (
    <header className={cn("relative", className)}>
      <div className="index-label mb-5">
        <span>{index}</span>
        <span aria-hidden="true" className="text-warm">
          /
        </span>
        <span>{label}</span>
      </div>

      <div
        className={cn(
          "gap-x-10 gap-y-6",
          align === "split" && "lg:flex lg:items-end lg:justify-between",
        )}
      >
        <h2
          id={id}
          className={cn(
            "display text-[clamp(2.1rem,3.9vw,3.6rem)] max-w-[20ch]",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {lede ? (
          <p
            className={cn(
              "lede measure-tight",
              align === "split" && "lg:max-w-[38ch] lg:pb-2",
            )}
          >
            {lede}
          </p>
        ) : null}
      </div>
    </header>
  );
}
