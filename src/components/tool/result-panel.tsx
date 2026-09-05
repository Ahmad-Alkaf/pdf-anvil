"use client";

import { useEffect, useRef, useState } from "react";
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
  /** Small figures shown under the file name, such as before/after sizes. */
  stats?: { label: string; value: string }[];
}

type AutoState = "pending" | "started" | "failed";

export function ResultPanel({ results, zipName, onStartOver, note, previews, stats }: Props) {
  const [zipping, setZipping] = useState(false);
  const [auto, setAuto] = useState<AutoState>("pending");
  // The ZIP is built once and reused when the user clicks "Download all" again.
  const zipRef = useRef<{ for: ResultItem[]; blob: Blob } | null>(null);
  const autoRef = useRef<ResultItem[] | null>(null);

  const total = results.reduce((n, r) => n + r.size, 0);
  const single = results.length === 1;
  const mainName = single ? results[0].name : zipName;

  async function getZip(): Promise<Blob> {
    if (zipRef.current?.for === results) return zipRef.current.blob;
    setZipping(true);
    try {
      const blob = await zipFiles(results);
      zipRef.current = { for: results, blob };
      return blob;
    } finally {
      setZipping(false);
    }
  }

  async function downloadMain() {
    if (single) {
      downloadBlob(results[0].blob, results[0].name);
      return;
    }
    downloadBlob(await getZip(), zipName);
  }

  // Start the download as soon as the result is ready. The button stays as a fallback
  // for browsers that block a download that did not come from a click.
  useEffect(() => {
    if (autoRef.current === results) return;
    autoRef.current = results;
    setAuto("pending");
    downloadMain()
      .then(() => setAuto("started"))
      .catch(() => setAuto("failed"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const autoText =
    auto === "pending"
      ? single
        ? "Starting the download..."
        : "Packing the files into a ZIP..."
      : auto === "started"
        ? "The download started. If your browser did not save the file, click Download again."
        : "The download did not start. Click Download to save the file.";

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

      <p className="mt-3 flex min-w-0 items-center gap-2 text-sm">
        <span className="truncate font-medium" title={mainName}>
          {mainName}
        </span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground" role="status" aria-live="polite">
        {autoText}
      </p>
      {stats && stats.length > 0 && (
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border bg-background px-2 py-2">
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="text-lg font-bold tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="lg" onClick={downloadMain} disabled={zipping}>
          {zipping ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : single ? (
            <Download className="size-4" aria-hidden="true" />
          ) : (
            <FolderArchive className="size-4" aria-hidden="true" />
          )}
          {auto === "started" ? (single ? "Download again" : "Download ZIP again") : single ? "Download" : "Download all (.zip)"}
        </Button>
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
