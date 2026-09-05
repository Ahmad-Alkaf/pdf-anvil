"use client";

import { useMemo, useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
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
import { rotatePdf, type RotationDelta } from "@/lib/pdf/rotate";
import { bytesToBlob } from "@/lib/download";
import { outputName } from "@/lib/names";
import { useMessages } from "@/locales/context";
import type { ToolPage } from "@/locales/types";

const norm = (deg: number): RotationDelta => ((((deg % 360) + 360) % 360) as RotationDelta);

export function RotateTool({ tool }: { tool: ToolPage }) {
  const messages = useMessages();
  const m = messages.rotate;
  const [file, setFile] = useState<File | null>(null);
  const [rotations, setRotations] = useState<Record<number, RotationDelta>>({});
  const pdf = usePdfDocument(file);
  const runner = useToolRunner();

  const order = useMemo(() => Array.from({ length: pdf.pageCount }, (_, i) => i), [pdf.pageCount]);
  const changed = Object.values(rotations).some((d) => d !== 0);

  const rotateOne = (index: number, delta: 90 | -90) =>
    setRotations((prev) => ({ ...prev, [index]: norm((prev[index] ?? 0) + delta) }));

  const rotateAll = (delta: 90 | -90) =>
    setRotations((prev) => {
      const next: Record<number, RotationDelta> = {};
      for (const i of order) next[i] = norm((prev[i] ?? 0) + delta);
      return next;
    });

  const reset = () => {
    setFile(null);
    setRotations({});
    runner.reset();
  };

  async function run() {
    if (!file) return;
    await runner.run(
      async () => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const out = await rotatePdf(bytes, { deltas: rotations });
        return [{ name: outputName(file.name), blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.id, files: 1, pages: pdf.pageCount, output: "pdf" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return <ResultPanel results={runner.results} zipName="rotated.zip" onStartOver={reset} />;
  }

  return (
    <div className="space-y-4">
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset}>
        <span className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => rotateAll(-90)} disabled={!pdf.doc || runner.busy}>
            <RotateCcw className="size-4" aria-hidden="true" /> {m.allLeft}
          </Button>
          <Button variant="outline" size="sm" onClick={() => rotateAll(90)} disabled={!pdf.doc || runner.busy}>
            <RotateCw className="size-4" aria-hidden="true" /> {m.allRight}
          </Button>
          {changed && (
            <Button variant="ghost" size="sm" onClick={() => setRotations({})} disabled={runner.busy}>
              {messages.common.reset}
            </Button>
          )}
        </span>
      </FileHeader>
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}
      <p className="text-sm text-muted-foreground">{m.hint}</p>

      {pdf.doc && (
        <PageGrid doc={pdf.doc} order={order} rotations={rotations} onRotate={rotateOne} disabled={runner.busy} />
      )}

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={!pdf.doc || !changed}
        busy={runner.busy}
        progress={runner.progress}
        hint={!changed ? m.rotateOne : undefined}
      />
    </div>
  );
}
