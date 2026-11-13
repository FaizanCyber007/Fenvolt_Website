"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A short, silent loop of a plate being read. Visitors who ask for reduced
 * motion get the still frame instead of the video.
 */
export function MotionPlate({
  src,
  poster,
  alt,
  className,
  sizes = "(min-width: 1024px) 34vw, 100vw",
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <video
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      disablePictureInPicture
      className={cn("size-full object-cover", className)}
    >
      <source src={src} type="video/webm" />
    </video>
  );
}
