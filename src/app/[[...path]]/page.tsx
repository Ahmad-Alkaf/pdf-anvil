import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/home-page";
import { AboutPage } from "@/components/pages/about-page";
import { ToolPage } from "@/components/pages/tool-page";
import { aboutMetadata, homeMetadata, toolMetadata } from "@/lib/seo";
import { resolveRoute } from "@/locales";

type Props = { params: Promise<{ path?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = resolveRoute((await params).path ?? []);
  if (!route) return {};
  switch (route.kind) {
    case "home":
      return homeMetadata(route.locale);
    case "about":
      return aboutMetadata(route.locale);
    case "tool":
      return toolMetadata(route.locale, route.page);
  }
}

export default async function Page({ params }: Props) {
  const route = resolveRoute((await params).path ?? []);
  if (!route) notFound();
  switch (route.kind) {
    case "home":
      return <HomePage locale={route.locale} />;
    case "about":
      return <AboutPage locale={route.locale} />;
    case "tool":
      return <ToolPage locale={route.locale} page={route.page} />;
  }
}
