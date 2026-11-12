import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a 1-based index as the two-digit label used across the site. */
export function indexLabel(value: number) {
  return String(value).padStart(2, "0");
}

export function absoluteUrl(path = "/") {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fenvolt.com"
  ).replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
