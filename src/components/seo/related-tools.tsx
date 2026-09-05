import Link from "next/link";
import { ToolIconGlyph } from "@/components/tool-icon";
import { KIND_SPEC, localeHref, type Locale, type LocalePage } from "@/locales";
import { firstSentence } from "@/locales/format";

export function RelatedTools({ locale, pages, title }: { locale: Locale; pages: readonly LocalePage[]; title: string }) {
  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {pages.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={localeHref(locale, tool)}
              className="flex h-full items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <ToolIconGlyph icon={KIND_SPEC[tool.kind].icon} className="size-5" />
              </span>
              <span>
                <span className="block font-semibold">{tool.name}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{firstSentence(tool.intro)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
