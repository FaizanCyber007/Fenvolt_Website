"use client";

import { useEffect, useRef } from "react";

/**
 * Two-layer cursor: a precise dot and a spring-following ring.
 * Only mounts for fine pointers with motion enabled. Never blocks input.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.body.dataset.customCursor = "on";

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;
    let scale = 1;
    let currentScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ringX = targetX;
        ringY = targetY;
        dotX = targetX;
        dotY = targetY;
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        "a, button, [data-cursor-label]",
      );
      if (!interactive) {
        scale = 1;
        label.dataset.visible = "false";
        return;
      }
      const text = interactive.dataset.cursorLabel;
      if (text) {
        label.textContent = text;
        label.dataset.visible = "true";
        scale = 1.75;
      } else {
        label.dataset.visible = "false";
        scale = 1.55;
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => {
      scale *= 0.86;
    };
    const onUp = () => {
      onOver({ target: document.elementFromPoint(targetX, targetY) } as PointerEvent);
    };

    const tick = () => {
      dotX += (targetX - dotX) * 0.55;
      dotY += (targetY - dotY) * 0.55;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      currentScale += (scale - currentScale) * 0.14;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      label.style.transform = `translate3d(${ringX + 26}px, ${ringY + 20}px, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      delete document.body.dataset.customCursor;
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 size-9 rounded-full border border-[#f2f0e9] opacity-0 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <span
        ref={labelRef}
        data-visible="false"
        className="pointer-events-none fixed left-0 top-0 whitespace-nowrap rounded-[2px] bg-[#f2f0e9] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#101314] opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-[5px] rounded-full bg-[#f2f0e9] opacity-0 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
