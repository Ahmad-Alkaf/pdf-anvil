"use client";

import { useMemo, useState } from "react";
import { Dropzone } from "../dropzone";
import { PageGrid } from "../page-grid";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { Segmented } from "@/components/ui/segmented";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { splitPdf, type SplitMode } from "@/lib/pdf/split";
import { parseRanges } from "@/lib/pdf/ranges";
import { bytesToBlob } from "@/lib/download";
import { baseName } from "@/lib/files";
import type { ToolDef } from "@/lib/tools";

export function SplitTool({ tool }: { tool: ToolDef }) {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<SplitMode>("each");
  const [ranges, setRanges] = useState("");
  const pdf = usePdfDocument(file);
  const runner = useToolRunner();

  const order = useMemo(() => Array.from({ length: pdf.pageCount }, (_, i) => i), [pdf.pageCount]);

  const rangeError = useMemo(() => {
    if (mode !== "ranges" || !pdf.pageCount || !ranges.trim()) return null;
    try {
      parseRanges(ranges, pdf.pageCount);
      return null;
    } catch (err) {
      return (err as Error).message;
    }
  }, [mode, ranges, pdf.pageCount]);

  const reset = () => {
    setFile(null);
    setRanges("");
    runner.reset();
  };

  async function run() {
    if (!file) return;
    await runner.run(
      async (onProgress) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const parts = await splitPdf(bytes, { mode, ranges }, onProgress);
        const base = baseName(file.name);
        return parts.map((p) => ({ name: `${base}-${p.label}.pdf`, blob: bytesToBlob(p.bytes, "application/pdf") }));
      },
      { tool: tool.slug, files: 1, pages: pdf.pageCount, output: "pdfs" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return <ResultPanel results={runner.results} zipName={`${baseName(file.name)}-split.zip`} onStartOver={reset} />;
  }

  const ready = !!pdf.doc && !rangeError && (mode === "each" || ranges.trim().length > 0);

  return (
    <div className="space-y-4">
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset} />
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}

      <div className="flex flex-wrap items-end gap-4 rounded-xl border bg-card p-4">
        <Segmented<SplitMode>
          label="Split by"
          value={mode}
          onChange={setMode}
          disabled={runner.busy}
          options={[
            { value: "each", label: "Every page", hint: "One PDF per page" },
            { value: "ranges", label: "Page ranges", hint: "Pick pages" },
          ]}
        />
        {mode === "ranges" && (
          <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs font-medium text-muted-foreground">
            Pages (example: 1-3, 5, 8-)
            <input
              type="text"
              inputMode="numeric"
              value={ranges}
              onChange={(e) => setRanges(e.target.value)}
              placeholder={pdf.pageCount ? `1-${Math.min(3, pdf.pageCount)}, ${pdf.pageCount}` : "1-3, 5"}
              disabled={runner.busy}
              aria-invalid={!!rangeError}
              className="h-10 rounded-lg border bg-background px-3 text-base text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-[invalid=true]:border-destructive"
            />
            {rangeError && <span className="text-destructive">{rangeError}</span>}
          </label>
        )}
      </div>

      {pdf.doc && <PageGrid doc={pdf.doc} order={order} />}

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={!ready}
        busy={runner.busy}
        progress={runner.progress}
        hint={mode === "each" && pdf.pageCount ? `Makes ${pdf.pageCount} file${pdf.pageCount === 1 ? "" : "s"}` : undefined}
      />
    </div>
  );
}
