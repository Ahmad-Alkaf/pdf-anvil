// Page rendering for the viewer. Draws one page into a canvas the caller owns,
// sharp on high-DPI screens, with a bounded queue so scrolling stays smooth.

import type { PDFDocumentProxy } from "./pdfjs";
import { RenderQueue } from "./thumbnails";

// Safari refuses canvases above ~16.7 M pixels. Stay under it.
const MAX_PIXELS = 16_000_000;

/** At most two pages render at the same time. */
export const pageQueue = new RenderQueue(2);

/** Page size in PDF points at scale 1, with the page rotation applied. */
export interface PageSize {
  width: number;
  height: number;
}

export async function getPageSize(doc: PDFDocumentProxy, pageNumber: number): Promise<PageSize> {
  const page = await doc.getPage(pageNumber);
  const { width, height } = page.getViewport({ scale: 1 });
  return { width, height };
}

/** Sizes of every page, in order. Stops early and rejects when `signal` aborts. */
export async function readPageSizes(doc: PDFDocumentProxy, signal?: AbortSignal): Promise<PageSize[]> {
  const sizes: PageSize[] = [];
  for (let n = 1; n <= doc.numPages; n++) {
    if (signal?.aborted) throw new DOMException("aborted", "AbortError");
    sizes.push(await getPageSize(doc, n));
  }
  return sizes;
}

/**
 * Draw `pageNumber` into `canvas` at `scale` CSS pixels per PDF point. The
 * canvas bitmap is sized for the device pixel ratio; the caller sets the CSS
 * size. Resolves true when the page was drawn, false when the render was
 * aborted or the document is gone.
 */
export async function renderPageToCanvas(
  doc: PDFDocumentProxy,
  pageNumber: number,
  scale: number,
  canvas: HTMLCanvasElement,
  signal: AbortSignal,
): Promise<boolean> {
  return pageQueue.run(async () => {
    if (signal.aborted) return false;
    try {
      const page = await doc.getPage(pageNumber);
      if (signal.aborted) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let viewport = page.getViewport({ scale: scale * dpr });
      if (viewport.width * viewport.height > MAX_PIXELS) {
        const factor = Math.sqrt(MAX_PIXELS / (viewport.width * viewport.height));
        viewport = page.getViewport({ scale: scale * dpr * factor });
      }
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return false;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const task = page.render({ canvas, canvasContext: ctx, viewport });
      const onAbort = () => task.cancel();
      signal.addEventListener("abort", onAbort, { once: true });
      try {
        await task.promise;
      } finally {
        signal.removeEventListener("abort", onAbort);
      }
      return !signal.aborted;
    } catch {
      // Cancelled render, or the document was closed meanwhile.
      return false;
    }
  });
}
