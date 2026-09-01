import { PageSizes, type PDFImage } from "pdf-lib";
import { createPdf, saveStamped } from "./load";
import { PdfError } from "./errors";
import type { Progress } from "./merge";

export type PageSizeOption = "fit" | "a4" | "letter";
export type OrientationOption = "auto" | "portrait" | "landscape";

export interface ImagesToPdfOptions {
  pageSize: PageSizeOption;
  orientation: OrientationOption;
  /** Margin in points (72 pt = 1 inch). Ignored for "fit". */
  margin: number;
}

async function decodeToPng(file: File): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new PdfError("unsupported-image", "canvas not available");
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const blob = await canvas.convertToBlob({ type: "image/png" });
  return new Uint8Array(await blob.arrayBuffer());
}

function kind(file: File): "jpg" | "png" | "other" {
  const name = file.name.toLowerCase();
  if (file.type === "image/jpeg" || name.endsWith(".jpg") || name.endsWith(".jpeg")) return "jpg";
  if (file.type === "image/png" || name.endsWith(".png")) return "png";
  return "other";
}

/**
 * Convert images to one PDF. JPG and PNG embed directly. WebP (and anything
 * else the browser can decode) is re-encoded to PNG first.
 * Known v1 limit: EXIF-rotated JPEGs embed unrotated.
 */
export async function imagesToPdf(
  files: File[],
  options: ImagesToPdfOptions,
  onProgress?: Progress,
): Promise<Uint8Array> {
  const doc = await createPdf();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i, files.length, `Adding ${file.name}`);
    let image: PDFImage;
    try {
      const k = kind(file);
      if (k === "jpg") image = await doc.embedJpg(new Uint8Array(await file.arrayBuffer()));
      else if (k === "png") image = await doc.embedPng(new Uint8Array(await file.arrayBuffer()));
      else image = await doc.embedPng(await decodeToPng(file));
    } catch (err) {
      // Some files lie about their type. Fall back to browser decoding once.
      try {
        image = await doc.embedPng(await decodeToPng(file));
      } catch {
        throw new PdfError("unsupported-image", file.name + (err instanceof Error ? "" : ""));
      }
    }

    const { width: iw, height: ih } = image;

    if (options.pageSize === "fit") {
      const page = doc.addPage([iw, ih]);
      page.drawImage(image, { x: 0, y: 0, width: iw, height: ih });
      continue;
    }

    const base = options.pageSize === "a4" ? PageSizes.A4 : PageSizes.Letter;
    const landscape =
      options.orientation === "landscape" || (options.orientation === "auto" && iw > ih);
    const [pw, ph] = landscape ? [base[1], base[0]] : base;
    const m = Math.max(0, options.margin);
    const boxW = pw - 2 * m;
    const boxH = ph - 2 * m;
    const scale = Math.min(boxW / iw, boxH / ih);
    const w = iw * scale;
    const h = ih * scale;
    const page = doc.addPage([pw, ph]);
    page.drawImage(image, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
  }

  onProgress?.(files.length, files.length, "Saving");
  return saveStamped(doc);
}
