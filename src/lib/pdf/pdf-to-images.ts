import { closePdf, openPdf } from "./pdfjs";
import { toPdfError } from "./errors";
import type { Progress } from "./merge";

export type ImageFormat = "jpg" | "png";
export type Dpi = 72 | 150 | 300;

export interface PdfToImagesOptions {
  format: ImageFormat;
  dpi: Dpi;
  /** JPG quality 0..1 */
  quality?: number;
  /** 0-based page indices. Omit for all pages. */
  pages?: number[];
}

export interface ImageResult {
  pageNumber: number; // 1-based
  blob: Blob;
  width: number;
  height: number;
  /** True when the page was downscaled to stay under the canvas pixel cap. */
  capped: boolean;
}

// Safari refuses canvases above ~16.7 M pixels. Stay under it.
const MAX_PIXELS = 16_000_000;

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), type, quality),
  );
}

export async function pdfToImages(
  input: Uint8Array,
  options: PdfToImagesOptions,
  onProgress?: Progress,
): Promise<ImageResult[]> {
  let doc;
  try {
    doc = await openPdf(input);
  } catch (err) {
    throw toPdfError(err);
  }

  const indices = options.pages ?? Array.from({ length: doc.numPages }, (_, i) => i);
  const type = options.format === "png" ? "image/png" : "image/jpeg";
  const quality = options.format === "png" ? undefined : (options.quality ?? 0.9);
  const results: ImageResult[] = [];

  try {
    for (let i = 0; i < indices.length; i++) {
      const pageNumber = indices[i] + 1;
      onProgress?.(i, indices.length, `Rendering page ${pageNumber}`);
      const page = await doc.getPage(pageNumber);
      let scale = options.dpi / 72;
      let viewport = page.getViewport({ scale });
      let capped = false;
      if (viewport.width * viewport.height > MAX_PIXELS) {
        scale *= Math.sqrt(MAX_PIXELS / (viewport.width * viewport.height));
        viewport = page.getViewport({ scale });
        capped = true;
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) throw new Error("canvas not available");
      if (type === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;
      const blob = await canvasToBlob(canvas, type, quality);
      results.push({ pageNumber, blob, width: canvas.width, height: canvas.height, capped });
      page.cleanup();
      canvas.width = 0;
      canvas.height = 0;
      // Let the UI paint progress between pages.
      await new Promise((r) => setTimeout(r, 0));
    }
  } finally {
    await closePdf(doc);
  }

  onProgress?.(indices.length, indices.length);
  return results;
}
