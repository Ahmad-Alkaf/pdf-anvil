import { describe, expect, it, vi } from "vitest";
import { PdfError } from "@/lib/pdf/errors";
import { mergePdfs } from "@/lib/pdf/merge";
import { PDF_CREATOR, PDF_PRODUCER } from "@/lib/site";
import { makePdf, openPdf, pageSizes } from "./helpers/fixtures";

describe("mergePdfs", () => {
  it("concatenates pages in the given order", async () => {
    const a = await makePdf([
      [100, 200],
      [110, 210],
    ]);
    const b = await makePdf([
      [300, 400],
      [310, 410],
      [320, 420],
    ]);
    const out = await openPdf(await mergePdfs([a, b]));
    expect(pageSizes(out)).toEqual([
      [100, 200],
      [110, 210],
      [300, 400],
      [310, 410],
      [320, 420],
    ]);

    const reversed = await openPdf(await mergePdfs([b, a]));
    expect(pageSizes(reversed).map(([w]) => w)).toEqual([300, 310, 320, 100, 110]);
  });

  it("stamps the output with the PDF Anvil producer and creator", async () => {
    const out = await openPdf(await mergePdfs([await makePdf([[100, 100]])]));
    expect(out.getProducer()).toBe(PDF_PRODUCER);
    expect(out.getCreator()).toBe(PDF_CREATOR);
    expect(out.getModificationDate()).toBeInstanceOf(Date);
  });

  it("reports progress per file and once at the end", async () => {
    const a = await makePdf([[100, 100]]);
    const b = await makePdf([[100, 100]]);
    const onProgress = vi.fn();
    await mergePdfs([a, b], onProgress);
    expect(onProgress.mock.calls).toEqual([
      [0, 2, { key: "reading-file", index: 1, total: 2 }],
      [1, 2, { key: "reading-file", index: 2, total: 2 }],
      [2, 2, { key: "saving" }],
    ]);
  });

  it("works with a single file", async () => {
    const out = await openPdf(await mergePdfs([await makePdf([[50, 60]])]));
    expect(pageSizes(out)).toEqual([[50, 60]]);
  });

  it("rejects input that is not a PDF", async () => {
    const notPdf = new TextEncoder().encode("hello, this is not a pdf");
    await expect(mergePdfs([notPdf])).rejects.toMatchObject({ code: "not-pdf" });
    await expect(mergePdfs([notPdf])).rejects.toBeInstanceOf(PdfError);
  });

  it("rejects a damaged PDF with a PdfError", async () => {
    const damaged = new TextEncoder().encode("%PDF-1.7\n this is garbage");
    await expect(mergePdfs([damaged])).rejects.toBeInstanceOf(PdfError);
  });
});
