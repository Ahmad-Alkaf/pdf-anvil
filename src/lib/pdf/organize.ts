import { degrees } from "pdf-lib";
import { createPdf, loadPdf, saveStamped } from "./load";
import { PdfError } from "./errors";
import type { RotationDelta } from "./rotate";

export interface OrganizeOptions {
  /** New page order as 0-based indices of the source. Omitted pages are deleted. */
  order: number[];
  /** Optional rotation delta per source page index. */
  rotations?: Record<number, RotationDelta>;
}

/** Copy pages into a fresh document so deleted pages drop out of the file. */
export async function organizePdf(input: Uint8Array, options: OrganizeOptions): Promise<Uint8Array> {
  if (options.order.length === 0) throw new PdfError("no-pages");
  const src = await loadPdf(input);
  const out = await createPdf();
  const pages = await out.copyPages(src, options.order);
  pages.forEach((page, i) => {
    const delta = options.rotations?.[options.order[i]];
    if (delta) {
      const current = page.getRotation().angle;
      page.setRotation(degrees((((current + delta) % 360) + 360) % 360));
    }
    out.addPage(page);
  });
  return saveStamped(out);
}
