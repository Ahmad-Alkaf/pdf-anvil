import { ChevronDown } from "lucide-react";
import type { ToolFaq } from "@/lib/tools";

export function Faq({ items, title = "Frequently asked questions" }: { items: readonly ToolFaq[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold">
        {title}
      </h2>
      <div className="mt-5 divide-y rounded-xl border bg-card">
        {items.map((item) => (
          <details key={item.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
