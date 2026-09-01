// The only file that knows where pdf.js runtime assets live.
// scripts/copy-pdf-assets.mjs writes them to public/pdfjs/<version>/.
// Client-only: pdf.js touches DOM globals at module scope, so it is loaded
// with a dynamic import and never during SSR.

import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";

type Pdfjs = typeof import("pdfjs-dist");

let pdfjsPromise: Promise<Pdfjs> | null = null;
const tasks = new WeakMap<PDFDocumentProxy, PDFDocumentLoadingTask>();

export function loadPdfjs(): Promise<Pdfjs> {
  pdfjsPromise ??= import("pdfjs-dist").then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/${pdfjs.version}/pdf.worker.min.mjs`;
    return pdfjs;
  });
  return pdfjsPromise;
}

/**
 * Open a PDF with pdf.js. The `data` buffer is transferred to the worker and
 * becomes detached; pass a copy if the caller still needs the bytes.
 */
export async function openPdf(data: Uint8Array, password?: string): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfjs();
  const base = `/pdfjs/${pdfjs.version}/`;
  const task = pdfjs.getDocument({
    data,
    password,
    cMapUrl: base + "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: base + "standard_fonts/",
    wasmUrl: base + "wasm/",
    iccUrl: base + "iccs/",
  });
  const doc = await task.promise;
  tasks.set(doc, task);
  return doc;
}

/** Release the document and its worker-side resources. */
export async function closePdf(doc: PDFDocumentProxy): Promise<void> {
  const task = tasks.get(doc);
  tasks.delete(doc);
  try {
    if (task) await task.destroy();
    else await doc.cleanup();
  } catch {
    // already destroyed
  }
}

export type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
