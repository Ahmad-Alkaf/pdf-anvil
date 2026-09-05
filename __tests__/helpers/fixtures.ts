import { degrees, PDFDocument } from "pdf-lib";
import sharp from "sharp";

export type Size = [number, number];

/** Build a PDF with one page per size. Optional /Rotate on every page. */
export async function makePdf(sizes: Size[], rotation = 0): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (const [w, h] of sizes) {
    const page = doc.addPage([w, h]);
    if (rotation) page.setRotation(degrees(rotation));
  }
  return doc.save();
}

export function openPdf(bytes: Uint8Array): Promise<PDFDocument> {
  return PDFDocument.load(bytes, { updateMetadata: false });
}

export function pageSizes(doc: PDFDocument): Size[] {
  return doc.getPages().map((p) => [p.getWidth(), p.getHeight()]);
}

export function rotations(doc: PDFDocument): number[] {
  return doc.getPages().map((p) => p.getRotation().angle);
}

/** Solid-color raster image of the given size. */
export async function makeImage(
  format: "png" | "jpeg" | "webp",
  width: number,
  height: number,
): Promise<Uint8Array> {
  const base = sharp({
    create: { width, height, channels: 3, background: { r: 200, g: 30, b: 30 } },
  });
  const buf = await (format === "png" ? base.png() : format === "jpeg" ? base.jpeg() : base.webp()).toBuffer();
  return new Uint8Array(buf);
}

export function asFile(bytes: Uint8Array, name: string, type: string): File {
  // Copy into a plain ArrayBuffer-backed view: BlobPart does not accept
  // Uint8Array<ArrayBufferLike> under TypeScript 5.9.
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return new File([copy], name, { type });
}
