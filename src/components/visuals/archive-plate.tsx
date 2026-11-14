import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A captioned plate: framed image, a label, an honest caption and the source
 * line. Used for photography and for the historical documents that explain the
 * kind of material the work is built on.
 */
export function ArchivePlate({
  src,
  alt,
  width,
  height,
  label,
  caption,
  credit,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 30vw, 100vw",
  priority = false,
  className,
  frameClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  caption?: React.ReactNode;
  credit: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "media relative w-full overflow-hidden border border-rule",
          aspect,
          frameClassName,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="size-full object-cover"
        />
      </div>

      <figcaption className="mt-3 border-t border-rule-soft pt-3 text-[0.75rem] leading-relaxed text-muted">
        <span className="mono uppercase tracking-[0.1em] text-muted-strong">
          {label}
        </span>
        {caption ? <span className="mt-1.5 block max-w-[42ch]">{caption}</span> : null}
        <span className="mt-1.5 block text-muted-faint">{credit}</span>
      </figcaption>
    </figure>
  );
}
