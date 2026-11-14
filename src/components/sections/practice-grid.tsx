"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { practices } from "@/constants/practices";
import { cn } from "@/lib/utils";

function PracticeCard({ practice }: { practice: (typeof practices)[number] }) {
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  function play() {
    setActive(true);
    const video = videoRef.current;
    if (video) void video.play().catch(() => undefined);
  }

  function stop() {
    setActive(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  return (
    <Link
      href={`/services#${practice.id}`}
      className="group block"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <div className="media relative aspect-[16/10] w-full overflow-hidden border border-rule-soft">
        <Image
          src={practice.media.poster}
          alt={practice.media.alt}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className={cn(
            "object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]",
            active && !reduce ? "opacity-0" : "opacity-100",
          )}
        />
        {reduce ? null : (
          <video
            ref={videoRef}
            aria-hidden="true"
            muted
            loop
            playsInline
            preload="none"
            poster={practice.media.poster}
            disablePictureInPicture
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-700",
              active ? "opacity-100" : "opacity-0",
            )}
            onMouseEnter={play}
            onMouseLeave={stop}
          >
            <source src={practice.media.src} type="video/webm" />
          </video>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/45 via-transparent to-transparent"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="mono rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
            {practice.index} — {practice.kicker}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-rule-soft pt-4">
        <div>
          <h3 className="display text-[clamp(1.5rem,2.2vw,1.95rem)] leading-none tracking-[-0.04em]">
            {practice.name}
          </h3>
          <p className="mt-2 max-w-[38ch] text-[0.875rem] leading-relaxed text-muted">
            {practice.headline}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.25}
          className="mt-1 size-5 shrink-0 text-muted-faint transition-all duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
        />
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
        {practice.services.slice(0, 3).map((service) => (
          <li
            key={service.name}
            className="text-[0.75rem] text-muted-strong after:ml-2.5 after:text-rule-strong after:content-['·'] last:after:content-none"
          >
            {service.name}
          </li>
        ))}
        <li className="text-[0.75rem] text-muted-faint">
          +{practice.services.length - 3} more
        </li>
      </ul>
    </Link>
  );
}

export function PracticeGrid() {
  return (
    <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2">
      {practices.map((practice) => (
        <PracticeCard key={practice.id} practice={practice} />
      ))}
    </div>
  );
}
