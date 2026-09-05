import { describe, expect, it, vi } from "vitest";
import { splitPdf } from "@/lib/pdf/split";
import { PDF_PRODUCER } from "@/lib/site";
import { makePdf, openPdf, pageSizes } from "./helpers/fixtures";

const threePages = () =>
  makePdf([
    [100, 100],
    [200, 200],
    [300, 300],
  ]);

describe("splitPdf", () => {
  it("writes one file per page in 'each' mode", async () => {
    const results = await splitPdf(await threePages(), { mode: "each" });
    expect(results.map((r) => r.label)).toEqual(["page-1", "page-2", "page-3"]);
    for (const [i, r] of results.entries()) {
      const doc = await openPdf(r.bytes);
      expect(pageSizes(doc)).toEqual([[100 * (i + 1), 100 * (i + 1)]]);
      expect(doc.getProducer()).toBe(PDF_PRODUCER);
    }
  });

  it("writes one file per range in 'ranges' mode", async () => {
    const results = await splitPdf(await threePages(), { mode: "ranges", ranges: "1-2, 3" });
    expect(results.map((r) => r.label)).toEqual(["pages-1-2", "page-3"]);
    expect(pageSizes(await openPdf(results[0].bytes))).toEqual([
      [100, 100],
      [200, 200],
    ]);
    expect(pageSizes(await openPdf(results[1].bytes))).toEqual([[300, 300]]);
  });

  it("supports open-ended ranges", async () => {
    const results = await splitPdf(await threePages(), { mode: "ranges", ranges: "2-" });
    expect(results.map((r) => r.label)).toEqual(["pages-2-3"]);
    expect(pageSizes(await openPdf(results[0].bytes))).toEqual([
      [200, 200],
      [300, 300],
    ]);
  });

  it("throws a bad-range error for an invalid range", async () => {
    await expect(splitPdf(await threePages(), { mode: "ranges", ranges: "1-9" })).rejects.toMatchObject({
      code: "bad-range",
    });
    await expect(splitPdf(await threePages(), { mode: "ranges" })).rejects.toMatchObject({ code: "bad-range" });
  });

  it("reports progress per output file", async () => {
    const onProgress = vi.fn();
    await splitPdf(await threePages(), { mode: "each" }, onProgress);
    expect(onProgress).toHaveBeenCalledTimes(4);
    expect(onProgress).toHaveBeenNthCalledWith(1, 0, 3, { key: "writing", label: "page-1" });
    expect(onProgress).toHaveBeenLastCalledWith(3, 3);
  });
});
