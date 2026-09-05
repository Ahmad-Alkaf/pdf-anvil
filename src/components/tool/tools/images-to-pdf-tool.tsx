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
import { useMessages } from "@/locales/context";
import { format, plural } from "@/locales/format";
import type { ToolPage } from "@/locales/types";

let seq = 0;
const nextId = () => `i${Date.now().toString(36)}-${seq++}`;

export function ImagesToPdfTool({ tool }: { tool: ToolPage }) {
  const messages = useMessages();
  const m = messages.imagesToPdf;
  const [items, setItems] = useState<FileItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSizeOption>(tool.defaults?.pageSize ?? "a4");
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
      { tool: tool.id, files: items.length, pages: items.length, output: "pdf" },
    );
  }

  if (runner.status === "done") {
    return <ResultPanel results={runner.results} zipName="images.zip" onStartOver={reset} />;
  }

  if (items.length === 0) return <Dropzone accept={tool.accept} multiple onFiles={addFiles} capture={tool.capture} />;

  return (
    <div className="space-y-4">
      <SizeWarning bytes={totalBytes} />
      <div className="flex flex-wrap gap-4 rounded-xl border bg-card p-4">
        <Segmented<PageSizeOption>
          label={m.pageSize}
          value={pageSize}
          onChange={setPageSize}
          disabled={runner.busy}
          options={[
            { value: "a4", label: m.a4 },
            { value: "letter", label: m.letter },
            { value: "fit", label: m.fit, hint: m.fitHint },
          ]}
        />
        {pageSize !== "fit" && (
          <>
            <Segmented<OrientationOption>
              label={m.orientation}
              value={orientation}
              onChange={setOrientation}
              disabled={runner.busy}
              options={[
                { value: "auto", label: m.auto },
                { value: "portrait", label: m.portrait },
                { value: "landscape", label: m.landscape },
              ]}
            />
            <Segmented<number>
              label={m.margin}
              value={margin}
              onChange={setMargin}
              disabled={runner.busy}
              options={[
                { value: 0, label: m.none },
                { value: 36, label: m.small },
                { value: 72, label: m.large },
              ]}
            />
          </>
        )}
      </div>

      <FileList items={items} onReorder={setItems} onRemove={remove} disabled={runner.busy} />
      <Dropzone
        accept={tool.accept}
        multiple
        onFiles={addFiles}
        compact
        label={m.addMore}
        disabled={runner.busy}
        capture={tool.capture}
      />

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={items.length === 0}
        busy={runner.busy}
        progress={runner.progress}
        hint={format(m.summary, {
          images: plural(messages.common.imageCount, items.length),
          pages: plural(messages.common.pageCount, items.length),
        })}
      />
    </div>
  );
}
