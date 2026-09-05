"use client";

import { useState } from "react";
import { Dropzone } from "../dropzone";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { compressPdf, type CompressLevel, type CompressResult } from "@/lib/pdf/compress";
import { bytesToBlob } from "@/lib/download";
import { formatBytes } from "@/lib/files";
import { outputName } from "@/lib/names";
import { cn } from "@/lib/utils";
import type { ToolDef } from "@/lib/tools";

const LEVEL_OPTIONS: { value: CompressLevel; label: string; hint: string }[] = [
  {
    value: "lossless",
    label: "Lossless",
    hint: "Cleans the file structure and removes unused data. Every image stays exactly as it is.",
  },
  {
    value: "balanced",
    label: "Balanced (recommended)",
    hint: "Large photos are limited to 1600 px and saved as JPEG at 75% quality. Sharp on screen and in print.",
  },
  {
    value: "small",
    label: "Smallest",
    hint: "Large photos are limited to 1100 px and saved as JPEG at 60% quality. Best for email and upload limits.",
  },
];

type Summary = Pick<CompressResult, "before" | "after" | "imagesProcessed" | "imagesFound">;

export function CompressTool({ tool }: { tool: ToolDef }) {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressLevel>("balanced");
  const [summary, setSummary] = useState<Summary | null>(null);
  const pdf = usePdfDocument(file);
  const runner = useToolRunner();

  const reset = () => {
    setFile(null);
    setSummary(null);
    runner.reset();
  };

  async function run() {
    if (!file) return;
    await runner.run(
      async (onProgress) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const result = await compressPdf(bytes, { level }, onProgress);
        // When nothing was gained, hand back the original so the user never gets a larger file.
        const out = result.after < result.before ? result.bytes : bytes;
        setSummary({ ...result, after: out.length });
        return [{ name: outputName(file.name), blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.slug, files: 1, pages: pdf.pageCount, output: "pdf" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done" && summary) {
    const saved = summary.before > 0 ? Math.max(0, 1 - summary.after / summary.before) : 0;
    const pct = `${Math.round(saved * 100)}%`;
    const note =
      summary.after >= summary.before
        ? "The file was already compact. It has no large images to re-encode, or they are already small. The original file was kept."
        : level === "lossless"
          ? "Images were not changed. Only the file structure was cleaned."
          : summary.imagesProcessed > 0
            ? `${summary.imagesProcessed} image${summary.imagesProcessed === 1 ? "" : "s"} re-encoded. Text and vector graphics were not changed.`
            : "No image was large enough to re-encode. Only the file structure was cleaned.";
    return (
      <ResultPanel
        results={runner.results}
        zipName="compressed.zip"
        onStartOver={reset}
        stats={[
          { label: "Before", value: formatBytes(summary.before) },
          { label: "After", value: formatBytes(summary.after) },
          { label: "Saved", value: pct },
        ]}
        note={note}
      />
    );
  }

  return (
    <div className="space-y-4">
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset} />
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}

      <fieldset className="rounded-xl border bg-card p-4" disabled={runner.busy}>
        <legend className="px-1 text-xs font-medium text-muted-foreground">Compression level</legend>
        <div role="radiogroup" className="grid gap-2 sm:grid-cols-3">
          {LEVEL_OPTIONS.map((opt) => {
            const active = opt.value === level;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setLevel(opt.value)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  active ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-muted/50",
                  runner.busy && "opacity-60",
                )}
              >
                <span className="block text-sm font-semibold">{opt.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={!pdf.doc}
        busy={runner.busy}
        progress={runner.progress}
        hint={`${formatBytes(file.size)} · ${LEVEL_OPTIONS.find((o) => o.value === level)?.label}`}
      />
    </div>
  );
}
