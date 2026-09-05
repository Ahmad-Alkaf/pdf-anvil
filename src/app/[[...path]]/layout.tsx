// Root layout of every page. One optional catch-all segment serves the
// English pages at the root (/, /about, /merge-pdf) and every other locale
// under its code (/es, /es/about, /es/unir-pdf), so the html `lang` and `dir`
// come from the URL and navigation between any two pages stays client-side.
//
// Two dynamic segments with different names cannot share one URL depth in
// Next.js ("/[slug]" next to "/[locale]"), which is why the English tool pages
// and the locale home pages are resolved here from the same path.

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteDocument } from "@/components/layout/site-document";
import { rootMetadata, SITE_VIEWPORT } from "@/lib/seo";
import { resolveRoute, staticRoutes } from "@/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticRoutes().map((r) => ({ path: r.path }));
}

type Props = { params: Promise<{ path?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = resolveRoute((await params).path ?? []);
  return rootMetadata(route?.locale ?? "en");
}

export const viewport: Viewport = SITE_VIEWPORT;

export default async function RootLayout({ children, params }: Props & { children: React.ReactNode }) {
  const route = resolveRoute((await params).path ?? []);
  if (!route) notFound();
  return (
    <SiteDocument locale={route.locale} pageId={route.id}>
      {children}
    </SiteDocument>
  );
}
