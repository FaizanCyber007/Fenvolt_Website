"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Both references open on a black plate with the mark, then cut to the site.
 * CSS runs the sequence, so it resolves without JavaScript; this only marks
 * the session so a second full load does not replay it.
 */
export function BootSplash() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("fv-booted") === "1") {
        if (ref.current) ref.current.style.display = "none";
      } else {
        sessionStorage.setItem("fv-booted", "1");
      }
    } catch {
      /* storage blocked — let the plate play */
    }
  }, []);

  return (
    <div ref={ref} className="splash" aria-hidden="true">
      <div className="splash-mark">
        <Image
          src="/brand/fenvolt-chip@2x.png"
          alt=""
          width={72}
          height={72}
          className="size-14 md:size-16"
          priority
        />
        <span className="splash-bar" />
      </div>
    </div>
  );
}
