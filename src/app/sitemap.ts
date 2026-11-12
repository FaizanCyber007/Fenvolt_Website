import type { MetadataRoute } from "next";
import { caseStudies } from "@/constants/case-studies";
import { site } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const routes = ["", "/services", "/work", "/company", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const studies = caseStudies.map((study) => ({
    url: `${base}/work/${study.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...studies];
}
