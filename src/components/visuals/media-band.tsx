import { MotionPlate } from "@/components/visuals/motion-plate";
import { Parallax } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

/**
 * A full-bleed moving plate with its caption set on the page, not over the
 * image. Used to break long runs of text without adding a section of copy.
 */
export function MediaBand({
  src,
  poster,
  alt,
  label,
  note,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  label: string;
  note: string;
  className?: string;
}) {
  return (
    <section aria-label={label} className={cn("border-t border-rule-soft", className)}>
      <div className="media media-grain relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
        <Parallax className="absolute inset-0">
          <MotionPlate
            src={src}
            poster={poster}
            alt={alt}
            sizes="100vw"
            className="scale-[1.02]"
          />
        </Parallax>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent"
        />
      </div>
      <div className="shell flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-4">
        <p className="eyebrow">{label}</p>
        <p className="max-w-[62ch] text-[0.875rem] leading-relaxed text-muted">{note}</p>
      </div>
    </section>
  );
}
