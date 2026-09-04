import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/about` },
    ...TOOLS.map((tool) => ({
      url: `${SITE_URL}/${tool.slug}`,
    })),
  ];
}
