import { ShieldCheck, WifiOff, Zap } from "lucide-react";
import type { TitledText } from "@/locales";

const ICONS = [ShieldCheck, WifiOff, Zap] as const;

export function PrivacyNote({ heading, points }: { heading: string; points: readonly TitledText[] }) {
  return (
    <section aria-labelledby="privacy-heading" className="rounded-2xl border bg-muted/40 p-6">
      <h2 id="privacy-heading" className="text-2xl font-bold">
        {heading}
      </h2>
      <ul className="mt-5 grid gap-5 sm:grid-cols-3">
        {points.map((p, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={p.title} className="flex gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block font-semibold">{p.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{p.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
