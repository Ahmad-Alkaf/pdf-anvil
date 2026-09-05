import { PageSizes } from "pdf-lib";
import { describe, expect, it, vi } from "vitest";
import { PdfError } from "@/lib/pdf/errors";
import { imagesToPdf } from "@/lib/pdf/images-to-pdf";
import { PDF_CREATOR, PDF_PRODUCER } from "@/lib/site";
import { asFile, makeImage, openPdf, pageSizes } from "./helpers/fixtures";

const fit = { pageSize: "fit", orientation: "auto", margin: 0 } as const;

describe("imagesToPdf", () => {
  it("embeds a PNG and a JPG as pages of their own pixel size", async () => {
    const png = asFile(await makeImage("png", 40, 20), "a.png", "image/png");
    const jpg = asFile(await makeImage("jpeg", 30, 50), "b.jpg", "image/jpeg");
    const out = await openPdf(await imagesToPdf([png, jpg], fit));
    expect(pageSizes(out)).toEqual([
      [40, 20],
      [30, 50],
    ]);
    expect(out.getCreator()).toBe(PDF_CREATOR);
    expect(out.getProducer()).toBe(PDF_PRODUCER);
  });

  it("detects the format from the extension when the MIME type is missing", async () => {
    const jpg = asFile(await makeImage("jpeg", 12, 8), "photo.JPEG", "");
    const out = await openPdf(await imagesToPdf([jpg], fit));
    expect(pageSizes(out)).toEqual([[12, 8]]);
  });

  it("uses A4 portrait for a portrait image and centers it", async () => {
    const png = asFile(await makeImage("png", 20, 40), "p.png", "image/png");
    const out = await openPdf(await imagesToPdf([png], { pageSize: "a4", orientation: "auto", margin: 36 }));
    expect(pageSizes(out)).toEqual([[PageSizes.A4[0], PageSizes.A4[1]]]);
  });

  it("switches to landscape for a wide image in auto orientation", async () => {
    const png = asFile(await makeImage("png", 40, 20), "l.png", "image/png");
    const out = await openPdf(await imagesToPdf([png], { pageSize: "letter", orientation: "auto", margin: 0 }));
    expect(pageSizes(out)).toEqual([[PageSizes.Letter[1], PageSizes.Letter[0]]]);
  });

  it("forces the requested orientation", async () => {
    const wide = asFile(await makeImage("png", 40, 20), "l.png", "image/png");
    const portrait = await openPdf(await imagesToPdf([wide], { pageSize: "a4", orientation: "portrait", margin: 0 }));
    expect(pageSizes(portrait)).toEqual([[PageSizes.A4[0], PageSizes.A4[1]]]);

    const tall = asFile(await makeImage("png", 20, 40), "p.png", "image/png");
    const landscape = await openPdf(await imagesToPdf([tall], { pageSize: "a4", orientation: "landscape", margin: 0 }));
    expect(pageSizes(landscape)).toEqual([[PageSizes.A4[1], PageSizes.A4[0]]]);
  });

  it("reports progress per image and once when saving", async () => {
    const png = asFile(await makeImage("png", 4, 4), "a.png", "image/png");
    const onProgress = vi.fn();
    await imagesToPdf([png, png], fit, onProgress);
    expect(onProgress.mock.calls).toEqual([
      [0, 2, { key: "adding", name: "a.png" }],
      [1, 2, { key: "adding", name: "a.png" }],
      [2, 2, { key: "saving" }],
    ]);
  });

  it("throws unsupported-image when the browser decoder is not available", async () => {
    // WebP needs createImageBitmap + OffscreenCanvas, which Node does not have.
    // In the browser this path re-encodes to PNG; here it must fail cleanly.
    const webp = asFile(await makeImage("webp", 8, 8), "c.webp", "image/webp");
    await expect(imagesToPdf([webp], fit)).rejects.toBeInstanceOf(PdfError);
    await expect(imagesToPdf([webp], fit)).rejects.toMatchObject({ code: "unsupported-image" });
  });

  it("rejects a file whose extension lies about its content", async () => {
    const pngNamedJpg = asFile(await makeImage("png", 8, 8), "fake.jpg", "");
    await expect(imagesToPdf([pngNamedJpg], fit)).rejects.toMatchObject({ code: "unsupported-image" });
  });

  it("produces one blank page for no files", async () => {
    // pdf-lib's save() adds a default page to a document without pages
    // (addDefaultPage is true by default). The UI never runs the tool with
    // zero files, so this only documents the current behaviour.
    const out = await openPdf(await imagesToPdf([], fit));
    expect(out.getPageCount()).toBe(1);
  });
});
