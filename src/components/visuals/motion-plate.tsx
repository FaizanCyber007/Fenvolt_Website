"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A short, silent loop used as a plate. Visitors who ask for reduced motion
 * get the still frame instead of the video; everyone else gets a loop that
 * only plays while it is near the viewport.
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(videoRef, { margin: "240px 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;

    if (inView) {
      void video.play().catch(() => {
        /* autoplay refused — the poster remains, which is fine */
      });
    } else {
      video.pause();
    }
  }, [inView, reduce]);

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
      ref={videoRef}
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
