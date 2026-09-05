"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RunProgress } from "@/hooks/use-tool-runner";
import { useMessages } from "@/locales/context";
import { format } from "@/locales/format";

interface Props {
  label: string;
  onRun: () => void;
  onReset: () => void;
  disabled?: boolean;
  busy: boolean;
  progress: RunProgress;
  hint?: string;
}

export function ActionBar({ label, onRun, onReset, disabled, busy, progress, hint }: Props) {
  const m = useMessages();
  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : null;
  return (
    <div className="sticky bottom-0 z-30 -mx-4 border-t bg-background/90 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:rounded-xl sm:border sm:bg-card sm:px-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg" onClick={onRun} disabled={disabled || busy} className="min-w-44">
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {progress.label ?? m.toolShell.actionBar.working}
              {pct !== null && ` ${pct}%`}
            </>
          ) : (
            label
          )}
        </Button>
        <Button variant="ghost" onClick={onReset} disabled={busy}>
          {m.common.startOver}
        </Button>
        {hint && <span className="text-sm text-muted-foreground">{hint}</span>}
      </div>
      {busy && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div
            className={pct === null ? "h-full w-1/3 animate-pulse rounded-full bg-primary" : "h-full rounded-full bg-primary transition-[width]"}
            style={pct === null ? undefined : { width: `${pct}%` }}
          />
        </div>
      )}
      {busy && (
        <p className="sr-only" aria-live="polite">
          {progress.label} {pct !== null ? format(m.toolShell.actionBar.percent, { pct }) : ""}
        </p>
      )}
    </div>
  );
}
