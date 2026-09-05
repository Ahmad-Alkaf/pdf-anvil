"use client";

import { useMessages } from "@/locales/context";

export function ErrorView({ reset }: { error: Error; reset: () => void }) {
  const m = useMessages().errorPage;
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">{m.title}</h1>
      <p className="mt-4 text-muted-foreground">{m.text}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        {m.retry}
      </button>
    </div>
  );
}
