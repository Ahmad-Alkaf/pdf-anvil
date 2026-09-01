import { createPdf, loadPdf, saveStamped } from "./load";
import { parseRanges, rangeIndices, rangeLabel } from "./ranges";
import type { Progress } from "./merge";

export type SplitMode = "each" | "ranges";

export interface SplitOptions {
  mode: SplitMode;
  ranges?: string; // used when mode === "ranges"
}

export interface SplitResult {
  label: string; // e.g. "page-3" or "pages-1-3"
  bytes: Uint8Array;
}

export async function splitPdf(
  input: Uint8Array,
  options: SplitOptions,
  onProgress?: Progress,
): Promise<SplitResult[]> {
  const src = await loadPdf(input);
  const pageCount = src.getPageCount();

  const groups: { label: string; indices: number[] }[] =
    options.mode === "each"
      ? Array.from({ length: pageCount }, (_, i) => ({ label: `page-${i + 1}`, indices: [i] }))
      : parseRanges(options.ranges ?? "", pageCount).map((r) => ({
          label: rangeLabel(r),
          indices: rangeIndices(r),
        }));

  const results: SplitResult[] = [];
  for (let i = 0; i < groups.length; i++) {
    onProgress?.(i, groups.length, `Writing ${groups[i].label}`);
    const out = await createPdf();
    const pages = await out.copyPages(src, groups[i].indices);
    for (const page of pages) out.addPage(page);
    results.push({ label: groups[i].label, bytes: await saveStamped(out) });
  }
  onProgress?.(groups.length, groups.length);
  return results;
}
