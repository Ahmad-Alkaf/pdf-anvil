import { describe, expect, it } from "vitest";
import { rotatePdf } from "@/lib/pdf/rotate";
import { PDF_PRODUCER } from "@/lib/site";
import { makePdf, openPdf, rotations } from "./helpers/fixtures";

const threePages = (rotation = 0) =>
  makePdf(
    [
      [100, 100],
      [100, 100],
      [100, 100],
    ],
    rotation,
  );

describe("rotatePdf", () => {
  it("rotates only the pages listed in deltas", async () => {
    const out = await openPdf(await rotatePdf(await threePages(), { deltas: { 0: 90, 2: 270 } }));
    expect(rotations(out)).toEqual([90, 0, 270]);
  });

  it("composes the delta with the existing /Rotate value", async () => {
    const out = await openPdf(await rotatePdf(await threePages(270), { deltas: { 0: 180, 1: 90, 2: 0 } }));
    expect(rotations(out)).toEqual([90, 0, 270]);
  });

  it("ignores indices that do not exist", async () => {
    const out = await openPdf(await rotatePdf(await threePages(), { deltas: { 7: 90, [-1]: 90 } }));
    expect(rotations(out)).toEqual([0, 0, 0]);
  });

  it("keeps the page count and stamps the producer but not the creator", async () => {
    const input = await threePages();
    const creator = (await openPdf(input)).getCreator();
    const out = await openPdf(await rotatePdf(input, { deltas: { 1: 90 } }));
    expect(out.getPageCount()).toBe(3);
    expect(out.getProducer()).toBe(PDF_PRODUCER);
    // The user's own Creator field is left alone.
    expect(out.getCreator()).toBe(creator);
  });

  it("rejects input that is not a PDF", async () => {
    await expect(rotatePdf(new Uint8Array([1, 2, 3]), { deltas: {} })).rejects.toMatchObject({ code: "not-pdf" });
  });
});
