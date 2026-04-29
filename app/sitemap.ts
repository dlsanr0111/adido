import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { designers } from "@/lib/designers";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = [
  "",
  "/about",
  "/prices",
  "/designers",
  "/gallery",
  "/events",
  "/reviews",
  "/notice",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url.replace(/\/$/, "");

  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : path === "/prices" || path === "/designers" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${path}`])
          ),
        },
      });
    }
  }

  for (const designer of designers) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${base}/${locale}/designers/${designer.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}/designers/${designer.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
