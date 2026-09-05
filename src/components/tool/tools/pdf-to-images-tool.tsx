"use client";

import { useMemo, useState } from "react";
import { Dropzone } from "../dropzone";
import { PageGrid } from "../page-grid";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { pdfToImages, type Dpi, type ImageFormat } from "@/lib/pdf/pdf-to-images";
import { outputName, pageName } from "@/lib/names";
import type { ToolDef } from "@/lib/tools";

export function PdfToImagesTool({ tool }: { tool: ToolDef }) {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<ImageFormat>(tool.defaults?.format ?? "jpg");
  const [dpi, setDpi] = useState<Dpi>(150);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [capped, setCapped] = useState(false);
  const pdf = usePdfDocument(file);
  const runner = useToolRunner();

  const order = useMemo(() => Array.from({ length: pdf.pageCount }, (_, i) => i), [pdf.pageCount]);

  // Select every page when a new document arrives (state adjusted during render).
  const [trackedDoc, setTrackedDoc] = useState(pdf.doc);
  if (pdf.doc !== trackedDoc) {
    setTrackedDoc(pdf.doc);
    setSelected(new Set(order));
  }

  const toggle = (index: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const reset = () => {
    setFile(null);
    setCapped(false);
    runner.reset();
  };

  async function run() {
    if (!file) return;
    const pages = order.filter((i) => selected.has(i));
    await runner.run(
      async (onProgress) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const images = await pdfToImages(bytes, { format, dpi, pages }, onProgress);
        setCapped(images.some((i) => i.capped));
        const width = String(pdf.pageCount).length;
        return images.map((img) => ({ name: pageName(file.name, img.pageNumber, format, width), blob: img.blob }));
      },
      { tool: tool.slug, files: 1, pages: pages.length, output: "images" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return (
      <ResultPanel
        results={runner.results}
        zipName={outputName(file.name, "zip")}
        onStartOver={reset}
        previews
        note={capped ? "Some pages were very large and were rendered at a lower resolution to fit browser limits." : undefined}
      />
    );
  }

  const count = selected.size;

  return (
    <div className="space-y-4">
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset} />
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}

      <div className="flex flex-wrap items-end gap-4 rounded-xl border bg-card p-4">
        <Segmented<ImageFormat>
          label="Format"
          value={format}
          onChange={setFormat}
          disabled={runner.busy}
          options={[
            { value: "jpg", label: "JPG", hint: "Smaller, best for photos and scans" },
            { value: "png", label: "PNG", hint: "Lossless, best for text and diagrams" },
          ]}
        />
        <Segmented<Dpi>
          label="Resolution"
          value={dpi}
          onChange={setDpi}
          disabled={runner.busy}
          options={[
            { value: 72, label: "72 DPI", hint: "Web" },
            { value: 150, label: "150 DPI", hint: "Screen" },
            { value: 300, label: "300 DPI", hint: "Print" },
          ]}
        />
        {pdf.pageCount > 1 && (
          <span className="ml-auto flex items-center gap-1 text-sm">
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set(order))} disabled={runner.busy}>
              Select all
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())} disabled={runner.busy}>
              Clear
            </Button>
          </span>
        )}
      </div>

      {pdf.doc && pdf.pageCount > 1 && (
        <p className="text-sm text-muted-foreground">Click pages to choose which ones to convert.</p>
      )}
      {pdf.doc && <PageGrid doc={pdf.doc} order={order} selectable selected={selected} onToggle={toggle} disabled={runner.busy} />}

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={!pdf.doc || count === 0}
        busy={runner.busy}
        progress={runner.progress}
        hint={count === 0 ? "Select at least one page." : `${count} page${count === 1 ? "" : "s"} → ${format.toUpperCase()} at ${dpi} DPI`}
      />
    </div>
  );
}
