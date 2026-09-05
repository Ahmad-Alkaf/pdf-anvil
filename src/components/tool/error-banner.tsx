"use client";

import { CircleAlert, X } from "lucide-react";
import { useMessages } from "@/locales/context";

export function ErrorBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  const m = useMessages();
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-foreground"
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label={m.common.dismiss} className="rounded p-0.5 hover:bg-muted">
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
