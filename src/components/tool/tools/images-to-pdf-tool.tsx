"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dropzone } from "../dropzone";
import { FileList, type FileItem } from "../file-list";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { Segmented } from "@/components/ui/segmented";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { imagesToPdf, type OrientationOption, type PageSizeOption } from "@/lib/pdf/images-to-pdf";
import { bytesToBlob } from "@/lib/download";
import { combinedName } from "@/lib/names";
import type { ToolDef } from "@/lib/tools";

let seq = 0;
const nextId = () => `i${Date.now().toString(36)}-${seq++}`;

export function ImagesToPdfTool({ tool }: { tool: ToolDef }) {
  const [items, setItems] = useState<FileItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSizeOption>("a4");
  const [orientation, setOrientation] = useState<OrientationOption>("auto");
  const [margin, setMargin] = useState<number>(36);
  const runner = useToolRunner();
  const urls = useRef(new Map<string, string>());

  useEffect(() => {
    const map = urls.current;
    return () => {
      for (const url of map.values()) URL.revokeObjectURL(url);
      map.clear();
    };
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      runner.reset();
      const added = files.map((file) => {
        const id = nextId();
        const url = URL.createObjectURL(file);
        urls.current.set(id, url);
        return { id, file, previewUrl: url };
      });
      setItems((prev) => [...prev, ...added]);
      // Read pixel size for the meta line.
      for (const item of added) {
        const img = new Image();
        img.onload = () =>
          setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, meta: `${img.naturalWidth}×${img.naturalHeight}` } : p)));
        img.src = item.previewUrl;
      }
    },
    [runner],
  );

  const remove = (id: string) => {
    const url = urls.current.get(id);
    if (url) URL.revokeObjectURL(url);
    urls.current.delete(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };
  const reset = () => {
    for (const id of Array.from(urls.current.keys())) remove(id);
    setItems([]);
    runner.reset();
  };

  const totalBytes = items.reduce((n, i) => n + i.file.size, 0);

  async function run() {
    await runner.run(
      async (onProgress) => {
        const out = await imagesToPdf(
          items.map((i) => i.file),
          { pageSize, orientation, margin },
          onProgress,
        );
        return [{ name: combinedName(items.map((i) => i.file.name)), blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.slug, files: items.length, pages: items.length, output: "pdf" },
    );
  }

  if (runner.status === "done") {
    return <ResultPanel results={runner.results} zipName="images.zip" onStartOver={reset} />;
  }

  if (items.length === 0) return <Dropzone accept={tool.accept} multiple onFiles={addFiles} />;

  return (
    <div className="space-y-4">
      <SizeWarning bytes={totalBytes} />
      <div className="flex flex-wrap gap-4 rounded-xl border bg-card p-4">
        <Segmented<PageSizeOption>
          label="Page size"
          value={pageSize}
          onChange={setPageSize}
          disabled={runner.busy}
          options={[
            { value: "a4", label: "A4" },
            { value: "letter", label: "Letter" },
            { value: "fit", label: "Fit to image", hint: "Page = image size, no margins" },
          ]}
        />
        {pageSize !== "fit" && (
          <>
            <Segmented<OrientationOption>
              label="Orientation"
              value={orientation}
              onChange={setOrientation}
              disabled={runner.busy}
              options={[
                { value: "auto", label: "Auto" },
                { value: "portrait", label: "Portrait" },
                { value: "landscape", label: "Landscape" },
              ]}
            />
            <Segmented<number>
              label="Margin"
              value={margin}
              onChange={setMargin}
              disabled={runner.busy}
              options={[
                { value: 0, label: "None" },
                { value: 36, label: "Small" },
                { value: 72, label: "Large" },
              ]}
            />
          </>
        )}
      </div>

      <FileList items={items} onReorder={setItems} onRemove={remove} disabled={runner.busy} />
      <Dropzone accept={tool.accept} multiple onFiles={addFiles} compact label="Add more images" disabled={runner.busy} />

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={items.length === 0}
        busy={runner.busy}
        progress={runner.progress}
        hint={`${items.length} image${items.length === 1 ? "" : "s"} · ${items.length} page${items.length === 1 ? "" : "s"}`}
      />
    </div>
  );
}
