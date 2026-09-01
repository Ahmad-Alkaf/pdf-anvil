"use client";

import { FileText, Loader2, X } from "lucide-react";
import { formatBytes } from "@/lib/files";

interface Props {
  file: File;
  pageCount?: number;
  loading?: boolean;
  onRemove: () => void;
  children?: React.ReactNode; // right-side controls
}

export function FileHeader({ file, pageCount, loading, onRemove, children }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-3">
      <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <FileText className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{file.name}</span>
        <span className="block text-xs text-muted-foreground">
          {formatBytes(file.size)}
          {loading ? (
            <>
              {" · "}
              <Loader2 className="inline size-3 animate-spin align-[-2px]" aria-hidden="true" /> Reading pages
            </>
          ) : pageCount ? (
            ` · ${pageCount} page${pageCount === 1 ? "" : "s"}`
          ) : null}
        </span>
      </span>
      {children}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove file"
        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
