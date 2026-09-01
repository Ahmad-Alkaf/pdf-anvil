"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { OutputFile } from "@/lib/download";
import { toPdfError } from "@/lib/pdf/errors";

export type RunStatus = "idle" | "processing" | "done" | "error";

export interface RunProgress {
  done: number;
  total: number;
  label?: string;
}

export interface ResultItem extends OutputFile {
  url: string;
  size: number;
}

export interface RunMeta {
  tool: string;
  files: number;
  pages?: number;
  output: "pdf" | "pdfs" | "images";
}

export function useToolRunner() {
  const [status, setStatus] = useState<RunStatus>("idle");
  const [progress, setProgress] = useState<RunProgress>({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultItem[]>([]);
  const urlsRef = useRef<string[]>([]);

  const revokeAll = useCallback(() => {
    for (const url of urlsRef.current) URL.revokeObjectURL(url);
    urlsRef.current = [];
  }, []);

  useEffect(() => revokeAll, [revokeAll]);

  const reset = useCallback(() => {
    revokeAll();
    setResults([]);
    setError(null);
    setProgress({ done: 0, total: 0 });
    setStatus("idle");
  }, [revokeAll]);

  const run = useCallback(
    async (
      task: (onProgress: (done: number, total: number, label?: string) => void) => Promise<OutputFile[]>,
      meta: RunMeta,
    ) => {
      revokeAll();
      setResults([]);
      setError(null);
      setStatus("processing");
      setProgress({ done: 0, total: 0, label: "Starting" });
      const started = performance.now();
      try {
        const files = await task((done, total, label) => setProgress({ done, total, label }));
        const items: ResultItem[] = files.map((f) => {
          const url = URL.createObjectURL(f.blob);
          urlsRef.current.push(url);
          return { ...f, url, size: f.blob.size };
        });
        setResults(items);
        setStatus("done");
        track("tool_run", {
          tool: meta.tool,
          files: meta.files,
          pages: meta.pages ?? 0,
          output: meta.output,
          ms: Math.round(performance.now() - started),
        });
      } catch (err) {
        setError(toPdfError(err).message);
        setStatus("error");
      }
    },
    [revokeAll],
  );

  return { status, progress, error, results, run, reset, busy: status === "processing" };
}
