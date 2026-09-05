"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dropzone } from "../dropzone";
import { FileList, type FileItem } from "../file-list";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { mergePdfs } from "@/lib/pdf/merge";
import { closePdf, openPdf } from "@/lib/pdf/pdfjs";
import { renderThumbnail } from "@/lib/pdf/thumbnails";
import { toPdfError } from "@/lib/pdf/errors";
import { bytesToBlob } from "@/lib/download";
import { looksLikePdf } from "@/lib/files";
import { combinedName } from "@/lib/names";
import type { ToolDef } from "@/lib/tools";

interface MergeItem extends FileItem {
  pages?: number;
}

let seq = 0;
const nextId = () => `f${Date.now().toString(36)}-${seq++}`;

export function MergeTool({ tool }: { tool: ToolDef }) {
  const [items, setItems] = useState<MergeItem[]>([]);
  const runner = useToolRunner();
  const inspected = useRef(new Set<string>());

  // Page count + first-page thumbnail for each new file.
  useEffect(() => {
    for (const item of items) {
      if (inspected.current.has(item.id)) continue;
      inspected.current.add(item.id);
      (async () => {
        try {
          const bytes = new Uint8Array(await item.file.arrayBuffer());
          if (!looksLikePdf(bytes)) throw toPdfError({ name: "InvalidPDFException" });
          const doc = await openPdf(bytes);
          const preview = await renderThumbnail(doc, 1, 96);
          const pages = doc.numPages;
          await closePdf(doc);
          setItems((prev) =>
            prev.map((p) =>
              p.id === item.id ? { ...p, pages, meta: `${pages} page${pages === 1 ? "" : "s"}`, previewUrl: preview } : p,
            ),
          );
        } catch (err) {
          const message = toPdfError(err).message;
          setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, error: message } : p)));
        }
      })();
    }
  }, [items]);

  const addFiles = useCallback(
    (files: File[]) => {
      runner.reset();
      setItems((prev) => [...prev, ...files.map((file) => ({ id: nextId(), file }))]);
    },
    [runner],
  );

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const reset = () => {
    setItems([]);
    runner.reset();
  };

  const totalBytes = items.reduce((n, i) => n + i.file.size, 0);
  const totalPages = items.reduce((n, i) => n + (i.pages ?? 0), 0);
  const ready = items.length >= 2 && items.every((i) => !i.error);

  async function run() {
    await runner.run(
      async (onProgress) => {
        const inputs: Uint8Array[] = [];
        for (const item of items) inputs.push(new Uint8Array(await item.file.arrayBuffer()));
        const out = await mergePdfs(inputs, onProgress);
        return [{ name: combinedName(items.map((i) => i.file.name)), blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.slug, files: items.length, pages: totalPages, output: "pdf" },
    );
  }

  if (runner.status === "done") {
    return <ResultPanel results={runner.results} zipName="merged.zip" onStartOver={reset} />;
  }

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <Dropzone accept={tool.accept} multiple onFiles={addFiles} />
      ) : (
        <>
          <SizeWarning bytes={totalBytes} />
          <FileList items={items} onReorder={setItems} onRemove={remove} disabled={runner.busy} />
          <Dropzone accept={tool.accept} multiple onFiles={addFiles} compact label="Add more PDFs" disabled={runner.busy} />
          {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
          <ActionBar
            label={tool.actionLabel}
            onRun={run}
            onReset={reset}
            disabled={!ready}
            busy={runner.busy}
            progress={runner.progress}
            hint={
              items.length < 2
                ? "Add at least two PDFs."
                : `${items.length} files · ${totalPages} pages`
            }
          />
        </>
      )}
    </div>
  );
}
