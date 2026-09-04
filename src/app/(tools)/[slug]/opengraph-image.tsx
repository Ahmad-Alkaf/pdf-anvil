import { OG_SIZE, renderOg } from "@/lib/og";
import { getTool, TOOLS } from "@/lib/tools";

export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  return renderOg({
    title: tool?.h1 ?? "Free PDF tools",
    subtitle: tool ? tool.intro.split(". ")[0] + "." : "In your browser.",
  });
}
