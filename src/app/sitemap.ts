import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { alternateLanguages, staticRoutes } from "@/locales";

export const dynamic = "force-static";

/** Every page of every locale, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes().map((r) => ({
    url: r.path.length === 0 ? SITE_URL : `${SITE_URL}/${r.path.join("/")}`,
    alternates: { languages: alternateLanguages(r.id, SITE_URL) },
  }));
}
