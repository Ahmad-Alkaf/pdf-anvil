"use client";

import { useState } from "react";
import { Undo2 } from "lucide-react";
import { Dropzone } from "../dropzone";
import { PageGrid } from "../page-grid";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { Button } from "@/components/ui/button";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { organizePdf } from "@/lib/pdf/organize";
import type { RotationDelta } from "@/lib/pdf/rotate";
import { bytesToBlob } from "@/lib/download";
import { baseName } from "@/lib/files";
import type { ToolDef } from "@/lib/tools";

const norm = (deg: number): RotationDelta => ((((deg % 360) + 360) % 360) as RotationDelta);

export function OrganizeTool({ tool }: { tool: ToolDef }) {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [rotations, setRotations] = useState<Record<number, RotationDelta>>({});
  const [history, setHistory] = useState<number[][]>([]);
  const pdf = usePdfDocument(file);
  const runner = useToolRunner();

  // Reset edits when a new document arrives (state adjusted during render).
  const [trackedDoc, setTrackedDoc] = useState(pdf.doc);
  if (pdf.doc !== trackedDoc) {
    setTrackedDoc(pdf.doc);
    setOrder(Array.from({ length: pdf.pageCount }, (_, i) => i));
    setRotations({});
    setHistory([]);
  }

  const original = Array.from({ length: pdf.pageCount }, (_, i) => i);
  const changed =
    order.length !== original.length ||
    order.some((v, i) => v !== original[i]) ||
    Object.values(rotations).some((d) => d !== 0);
  const deletedCount = pdf.pageCount - order.length;

  const pushHistory = () => setHistory((h) => [...h.slice(-19), order]);

  const reorder = (next: number[]) => {
    pushHistory();
    setOrder(next);
  };
  const remove = (index: number) => {
    pushHistory();
    setOrder((prev) => prev.filter((i) => i !== index));
  };
  const rotate = (index: number, delta: 90 | -90) =>
    setRotations((prev) => ({ ...prev, [index]: norm((prev[index] ?? 0) + delta) }));
  const undo = () => {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((h) => h.slice(0, -1));
    setOrder(last);
  };
  const resetEdits = () => {
    setOrder(original);
    setRotations({});
    setHistory([]);
  };
  const reset = () => {
    setFile(null);
    runner.reset();
  };

  async function run() {
    if (!file) return;
    await runner.run(
      async () => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const out = await organizePdf(bytes, { order, rotations });
        return [{ name: `${baseName(file.name)}-organized.pdf`, blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.slug, files: 1, pages: order.length, output: "pdf" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return <ResultPanel results={runner.results} zipName="organized.zip" onStartOver={reset} />;
  }

  return (
    <div className="space-y-4">
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset}>
        <span className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={undo} disabled={history.length === 0 || runner.busy}>
            <Undo2 className="size-4" aria-hidden="true" /> Undo
          </Button>
          {changed && (
            <Button variant="ghost" size="sm" onClick={resetEdits} disabled={runner.busy}>
              Reset
            </Button>
          )}
        </span>
      </FileHeader>
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}
      <p className="text-sm text-muted-foreground">
        Drag pages to reorder. Hover a page to rotate or delete it.
        {deletedCount > 0 && ` ${deletedCount} page${deletedCount === 1 ? "" : "s"} will be removed.`}
      </p>

      {pdf.doc && order.length > 0 && (
        <PageGrid
          doc={pdf.doc}
          order={order}
          sortable
          onReorder={reorder}
          rotations={rotations}
          onRotate={rotate}
          onDelete={remove}
          disabled={runner.busy}
        />
      )}

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={!pdf.doc || !changed || order.length === 0}
        busy={runner.busy}
        progress={runner.progress}
        hint={!changed ? "Move, rotate, or delete a page to continue." : `${order.length} pages in the output`}
      />
    </div>
  );
}
