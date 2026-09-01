"use client";

import { useState } from "react";
import { CheckCircle2, Download, FolderArchive, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadBlob, zipFiles } from "@/lib/download";
import { formatBytes } from "@/lib/files";
import type { ResultItem } from "@/hooks/use-tool-runner";

interface Props {
  results: ResultItem[];
  zipName: string;
  onStartOver: () => void;
  note?: string;
  previews?: boolean; // show image thumbnails
}

export function ResultPanel({ results, zipName, onStartOver, note, previews }: Props) {
  const [zipping, setZipping] = useState(false);
  const total = results.reduce((n, r) => n + r.size, 0);
  const single = results.length === 1;

  async function downloadAll() {
    setZipping(true);
    try {
      const blob = await zipFiles(results);
      downloadBlob(blob, zipName);
    } finally {
      setZipping(false);
    }
  }

  return (
    <section aria-labelledby="result-heading" className="animate-fade-in-up rounded-2xl border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="result-heading" className="flex items-center gap-2 text-xl font-bold">
          <CheckCircle2 className="size-6 text-success" aria-hidden="true" />
          Done
        </h2>
        <span className="text-sm text-muted-foreground">
          {results.length} file{single ? "" : "s"} · {formatBytes(total)}
        </span>
      </div>
      {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {single ? (
          <Button size="lg" onClick={() => downloadBlob(results[0].blob, results[0].name)}>
            <Download className="size-4" aria-hidden="true" />
            Download {results[0].name}
          </Button>
        ) : (
          <Button size="lg" onClick={downloadAll} disabled={zipping}>
            {zipping ? <Loader2 className="size-4 animate-spin" /> : <FolderArchive className="size-4" />}
            Download all (.zip)
          </Button>
        )}
        <Button variant="outline" size="lg" onClick={onStartOver}>
          Start over
        </Button>
      </div>

      {!single && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <li key={r.name} className="flex items-center gap-3 rounded-lg border bg-background p-2">
              {previews ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.url} alt="" className="size-12 shrink-0 rounded object-cover" />
              ) : (
                <span className="flex size-12 shrink-0 items-center justify-center rounded bg-accent text-xs font-bold text-accent-foreground">
                  PDF
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{r.name}</span>
                <span className="block text-xs text-muted-foreground">{formatBytes(r.size)}</span>
              </span>
              <Button variant="ghost" size="icon" aria-label={`Download ${r.name}`} onClick={() => downloadBlob(r.blob, r.name)}>
                <Download className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
