import Link from "next/link";
import { ToolIconGlyph } from "@/components/tool-icon";
import { getTool, type ToolSlug } from "@/lib/tools";

export function RelatedTools({ slugs }: { slugs: readonly ToolSlug[] }) {
  const tools = slugs.map(getTool).filter((t) => t !== undefined);
  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold">
        More PDF tools
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/${tool.slug}`}
              className="flex h-full items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <ToolIconGlyph icon={tool.icon} className="size-5" />
              </span>
              <span>
                <span className="block font-semibold">{tool.name}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{tool.intro.split(". ")[0]}.</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
