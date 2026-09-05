import { describe, expect, it } from "vitest";
import { organizePdf } from "@/lib/pdf/organize";
import { PDF_CREATOR } from "@/lib/site";
import { makePdf, openPdf, pageSizes, rotations } from "./helpers/fixtures";

const threePages = (rotation = 0) =>
  makePdf(
    [
      [100, 100],
      [200, 200],
      [300, 300],
    ],
    rotation,
  );

describe("organizePdf", () => {
  it("reorders and drops pages", async () => {
    const out = await openPdf(await organizePdf(await threePages(), { order: [2, 0] }));
    expect(pageSizes(out)).toEqual([
      [300, 300],
      [100, 100],
    ]);
  });

  it("can duplicate a page", async () => {
    const out = await openPdf(await organizePdf(await threePages(), { order: [1, 1, 1] }));
    expect(pageSizes(out)).toEqual([
      [200, 200],
      [200, 200],
      [200, 200],
    ]);
  });

  it("applies rotations by source page index", async () => {
    const out = await openPdf(
      await organizePdf(await threePages(), { order: [2, 1, 0], rotations: { 0: 90, 2: 180 } }),
    );
    // Output order is source pages 2, 1, 0.
    expect(rotations(out)).toEqual([180, 0, 90]);
  });

  it("composes rotations with the existing /Rotate value", async () => {
    const out = await openPdf(await organizePdf(await threePages(90), { order: [0, 1], rotations: { 0: 270 } }));
    expect(rotations(out)).toEqual([0, 90]);
  });

  it("writes a fresh PDF Anvil document", async () => {
    const out = await openPdf(await organizePdf(await threePages(), { order: [0] }));
    expect(out.getCreator()).toBe(PDF_CREATOR);
  });

  it("refuses an empty order", async () => {
    await expect(organizePdf(await threePages(), { order: [] })).rejects.toMatchObject({ code: "no-pages" });
  });

  it("rejects input that is not a PDF", async () => {
    await expect(organizePdf(new TextEncoder().encode("nope"), { order: [0] })).rejects.toMatchObject({
      code: "not-pdf",
    });
  });
});
