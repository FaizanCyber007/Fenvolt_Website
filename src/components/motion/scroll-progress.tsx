"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * A two-pixel reading line at the top of the page, in the cyan from the mark.
 * It gives scroll position without a floating widget, and it is the one place
 * colour is allowed to sit on top of the content.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand/75"
    />
  );
}
