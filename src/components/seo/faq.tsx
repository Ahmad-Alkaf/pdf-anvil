"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { ToolFaq } from "@/lib/tools";

export function Faq({ items, title }: { items: readonly ToolFaq[]; title: string }) {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());
  const idPrefix = useId();

  function toggleQuestion(index: number) {
    setOpenQuestions((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold">
        {title}
      </h2>
      <div className="mt-5 divide-y rounded-xl border bg-card">
        {items.map((item, index) => {
          const isOpen = openQuestions.has(index);
          const answerId = `${idPrefix}-answer-${index}`;

          return (
            <div key={item.q} className="px-5 py-1">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-md py-3 text-start font-semibold transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleQuestion(index)}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180" : "rotate-0"}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={answerId}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="min-h-0">
                  <p className="pb-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
