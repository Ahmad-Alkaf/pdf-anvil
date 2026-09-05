// Open Graph images as static files: /og/_site.png, /og/merge-pdf.png,
// /og/es/_site.png, /og/es/unir-pdf.png. A metadata image file cannot follow
// the optional catch-all page segment, so this Route Handler renders the same
// image and the page metadata points at it (src/lib/seo.ts).

import { renderOg } from "@/lib/og";
import { ogImageParams, parseOgPath } from "@/lib/seo";
import { getLocaleBundle } from "@/locales";
import { firstSentence } from "@/locales/format";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogImageParams();
}

export async function GET(_request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const target = parseOgPath((await params).path ?? []);
  if (!target) return new Response("Not found", { status: 404 });
  const { common } = getLocaleBundle(target.locale).messages;
  if (target.route.kind === "tool") {
    return renderOg({ title: target.route.page.h1, subtitle: firstSentence(target.route.page.intro), footer: common.ogFooter });
  }
  return renderOg({ title: common.tagline, subtitle: common.ogSubtitle, footer: common.ogFooter });
}
