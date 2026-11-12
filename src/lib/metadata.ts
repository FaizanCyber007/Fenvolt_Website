import type { Metadata } from "next";
import { site } from "@/constants/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMeta): Metadata {
  const url = `${site.url.replace(/\/$/, "")}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}
