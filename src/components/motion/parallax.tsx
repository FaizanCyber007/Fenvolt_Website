"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A small counter-scroll on a full-bleed plate. The child is scaled slightly
 * so the edges never show; reduced-motion visitors get the still frame.
 */
export function Parallax({
  children,
  className,
  distance = 26,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="relative size-full scale-[1.08]"
      >
        {children}
      </motion.div>
    </div>
  );
}
