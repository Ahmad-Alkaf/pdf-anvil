import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolShell } from "@/components/tool/tool-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { HowItWorks } from "@/components/seo/how-it-works";
import { Faq } from "@/components/seo/faq";
import { PrivacyNote } from "@/components/seo/privacy-note";
import { RelatedTools } from "@/components/seo/related-tools";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getTool, TOOLS } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `${SITE_URL}/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `/${tool.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const url = `${SITE_URL}/${tool.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${tool.name} – ${SITE_NAME}`,
      url,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript",
      description: tool.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isAccessibleForFree: true,
      publisher: { "@type": "Organization", name: "KafLabs", url: "https://kaflabs.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to ${tool.name.toLowerCase()} online for free`,
      description: tool.intro,
      totalTime: "PT1M",
      step: tool.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: tool.name, item: url },
      ],
    },
  ];

  return (
    <article className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <JsonLd data={jsonLd} />
      <header className="py-8 text-center sm:py-12">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{tool.h1}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{tool.intro}</p>
      </header>

      <ToolShell tool={tool} />

      <div className="mx-auto mt-16 max-w-4xl space-y-14">
        <HowItWorks steps={tool.steps} />
        <PrivacyNote />
        <Faq items={tool.faq} />
        <RelatedTools slugs={tool.related} />
      </div>
    </article>
  );
}
