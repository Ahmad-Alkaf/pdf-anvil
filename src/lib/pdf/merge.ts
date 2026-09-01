import { createPdf, loadPdf, saveStamped } from "./load";

export type Progress = (done: number, total: number, label?: string) => void;

/** Merge PDFs in the given order into one file. */
export async function mergePdfs(inputs: Uint8Array[], onProgress?: Progress): Promise<Uint8Array> {
  const out = await createPdf();
  for (let i = 0; i < inputs.length; i++) {
    onProgress?.(i, inputs.length, `Reading file ${i + 1} of ${inputs.length}`);
    const src = await loadPdf(inputs[i]);
    const pages = await out.copyPages(src, src.getPageIndices());
    for (const page of pages) out.addPage(page);
  }
  onProgress?.(inputs.length, inputs.length, "Saving");
  return saveStamped(out);
}
