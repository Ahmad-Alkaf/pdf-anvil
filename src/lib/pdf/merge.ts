import { createPdf, loadPdf, saveStamped } from "./load";
import type { Progress } from "./progress";

export type { Progress } from "./progress";

/** Merge PDFs in the given order into one file. */
export async function mergePdfs(inputs: Uint8Array[], onProgress?: Progress): Promise<Uint8Array> {
  const out = await createPdf();
  for (let i = 0; i < inputs.length; i++) {
    onProgress?.(i, inputs.length, { key: "reading-file", index: i + 1, total: inputs.length });
    const src = await loadPdf(inputs[i]);
    const pages = await out.copyPages(src, src.getPageIndices());
    for (const page of pages) out.addPage(page);
  }
  onProgress?.(inputs.length, inputs.length, { key: "saving" });
  return saveStamped(out);
}
