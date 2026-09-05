// Web Worker that runs qpdf off the main thread. One engine per worker; one
// fresh wasm instance per run. Started by src/lib/pdf/qpdf.ts, which also
// tells it where the glue and the wasm live.
import { loadEngine, runWithEngine, type QpdfEngine, type QpdfRun } from "./qpdf-core";

export interface QpdfRequest {
  id: number;
  glueUrl: string;
  wasmUrl: string;
  input: Uint8Array;
  args: string[];
}

export type QpdfResponse = { id: number; ok: true; run: QpdfRun } | { id: number; ok: false; message: string };

// The tsconfig lib is "dom"; this file runs in a worker scope.
const ctx = self as unknown as {
  postMessage(message: QpdfResponse, transfer?: Transferable[]): void;
  addEventListener(type: "message", listener: (event: MessageEvent<QpdfRequest>) => void): void;
};

let enginePromise: Promise<QpdfEngine> | null = null;

ctx.addEventListener("message", async (event) => {
  const { id, glueUrl, wasmUrl, input, args } = event.data;
  try {
    enginePromise ??= loadEngine(glueUrl, wasmUrl);
    const engine = await enginePromise.catch((err) => {
      enginePromise = null; // let the next request try again
      throw err;
    });
    const run = await runWithEngine(engine, input, args);
    ctx.postMessage({ id, ok: true, run }, run.output ? [run.output.buffer] : []);
  } catch (err) {
    const message = (err as { message?: string })?.message ?? String(err);
    ctx.postMessage({ id, ok: false, message });
  }
});
