// The 404 page for URLs that match no route: exported as out/404.html and
// served by Cloudflare (`not_found_handling: "404-page"` in wrangler.jsonc).
// The root layout lives under a dynamic segment, so Next cannot compose a 404
// from layout + not-found; this file renders the whole document itself with
// the same shell as every other page (English, the x-default language).

import type { Metadata, Viewport } from "next";
import { SiteDocument } from "@/components/layout/site-document";
import { NotFoundView } from "@/components/pages/not-found-view";
import { rootMetadata, SITE_VIEWPORT } from "@/lib/seo";
import { HOME_ID } from "@/locales";

export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = SITE_VIEWPORT;

export default function GlobalNotFound() {
  return (
    <SiteDocument locale="en" pageId={HOME_ID}>
      <NotFoundView />
    </SiteDocument>
  );
}
