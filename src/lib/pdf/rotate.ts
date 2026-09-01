import { degrees } from "pdf-lib";
import { loadPdf, saveStamped } from "./load";

export type RotationDelta = 0 | 90 | 180 | 270;

export interface RotateOptions {
  /** Delta per 0-based page index. Missing pages are not rotated. */
  deltas: Record<number, RotationDelta>;
}

/** Compose the delta with the page's existing /Rotate value. */
export async function rotatePdf(input: Uint8Array, options: RotateOptions): Promise<Uint8Array> {
  const doc = await loadPdf(input);
  const pages = doc.getPages();
  for (const [indexText, delta] of Object.entries(options.deltas)) {
    const index = Number(indexText);
    const page = pages[index];
    if (!page || !delta) continue;
    const current = page.getRotation().angle;
    page.setRotation(degrees((((current + delta) % 360) + 360) % 360));
  }
  return saveStamped(doc);
}
