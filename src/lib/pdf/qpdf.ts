// The only file that knows where the qpdf runtime assets live.
// scripts/copy-pdf-assets.mjs writes the glue and the wasm of the pdfstudio
// package to public/qpdf/<version>/. Nothing is loaded until the first call,
// so pages that do not need qpdf never download the 2.2 MB wasm.
//
// Runs qpdf in a Web Worker so the page stays responsive. Falls back to the
// main thread when workers are not available.
import { PdfError } from "./errors";
import {
  isEncryptedWith,
  loadEngine,
  protectWith,
  runWithEngine,
  unlockWith,
  type QpdfRun,
  type RunQpdf,
} from "./qpdf-core";
import type { ProtectOptions } from "./qpdf-args";
import type { QpdfRequest, QpdfResponse } from "./qpdf.worker";

export type { ProtectOptions } from "./qpdf-args";

/** Version of the `pdfstudio` package in package.json. __tests__/qpdf.test.ts checks that they match. */
export const QPDF_VERSION = "0.4.0";

function assetUrls() {
  const base = `/qpdf/${QPDF_VERSION}/`;
  return {
    glueUrl: new URL(`${base}qpdf.js`, window.location.href).href,
    wasmUrl: new URL(`${base}qpdf.wasm`, window.location.href).href,
  };
}

let runPromise: Promise<RunQpdf> | null = null;

function getRun(): Promise<RunQpdf> {
  runPromise ??= Promise.resolve().then(() => (typeof Worker === "undefined" ? mainThreadRun() : workerRun()));
  return runPromise;
}

async function mainThreadRun(): Promise<RunQpdf> {
  const { glueUrl, wasmUrl } = assetUrls();
  const engine = await loadEngine(glueUrl, wasmUrl);
  return (input, args) => runWithEngine(engine, input, args);
}

function workerRun(): RunQpdf {
  const { glueUrl, wasmUrl } = assetUrls();
  const worker = new Worker(new URL("./qpdf.worker.ts", import.meta.url), { type: "module" });
  const pending = new Map<number, { resolve: (run: QpdfRun) => void; reject: (err: Error) => void }>();
  let nextId = 1;

  const failAll = (message: string) => {
    for (const { reject } of pending.values()) reject(new PdfError("unknown", message));
    pending.clear();
    runPromise = null; // the next call starts a new worker
    worker.terminate();
  };

  worker.addEventListener("message", (event: MessageEvent<QpdfResponse>) => {
    const entry = pending.get(event.data.id);
    if (!entry) return;
    pending.delete(event.data.id);
    if (event.data.ok) entry.resolve(event.data.run);
    else entry.reject(new PdfError("unknown", event.data.message));
  });
  worker.addEventListener("error", (event) => failAll(event.message || "qpdf worker failed"));

  return (input, args) =>
    new Promise<QpdfRun>((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      // Transfer a copy so the caller keeps its bytes.
      const copy = input.slice();
      const request: QpdfRequest = { id, glueUrl, wasmUrl, input: copy, args };
      worker.postMessage(request, [copy.buffer]);
    });
}

/** True when the PDF has a password. Throws a PdfError for a file that is not a PDF or is damaged. */
export async function isEncryptedPdf(bytes: Uint8Array): Promise<boolean> {
  return isEncryptedWith(await getRun(), bytes);
}

/** Remove the password from a PDF. `password` is the user or the owner password. */
export async function unlockPdf(bytes: Uint8Array, password: string): Promise<Uint8Array> {
  return unlockWith(await getRun(), bytes, password);
}

/** Add an AES-256 password to a PDF, with permissions for the user-password reader. */
export async function protectPdf(bytes: Uint8Array, options: ProtectOptions): Promise<Uint8Array> {
  return protectWith(await getRun(), bytes, options);
}
