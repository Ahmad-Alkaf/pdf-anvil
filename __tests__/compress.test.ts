import { PDFDocument, PDFName, PDFRawStream, PDFStream } from "pdf-lib";
import sharp from "sharp";
import { describe, expect, it, vi } from "vitest";
import {
  compressPdf,
  findCandidateImages,
  removeUnreachableObjects,
  unfilterPng,
  type EncodedImage,
  type ImageEncoder,
} from "@/lib/pdf/compress";
import { PDF_PRODUCER } from "@/lib/site";
import { makeImage, makePdf, openPdf } from "./helpers/fixtures";

/** Noisy image so JPEG and Flate cannot squeeze it below the 64 KB candidate limit. */
async function noisyImage(
  format: "png" | "jpeg",
  width: number,
  height: number,
): Promise<Uint8Array> {
  const base = sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 128, g: 128, b: 128 },
      noise: { type: "gaussian", mean: 128, sigma: 40 },
    },
  });
  const buf = await (
    format === "png" ? base.png() : base.jpeg({ quality: 95 })
  ).toBuffer();
  return new Uint8Array(buf);
}

/** One page per image, each image drawn full-page. */
async function pdfWithImages(
  images: { data: Uint8Array; format: "png" | "jpeg" }[],
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (const img of images) {
    const embedded =
      img.format === "png"
        ? await doc.embedPng(img.data)
        : await doc.embedJpg(img.data);
    const page = doc.addPage([embedded.width, embedded.height]);
    page.drawImage(embedded, {
      x: 0,
      y: 0,
      width: embedded.width,
      height: embedded.height,
    });
  }
  return doc.save();
}

function imageStreams(doc: PDFDocument): PDFRawStream[] {
  return doc.context
    .enumerateIndirectObjects()
    .map(([, obj]) => obj)
    .filter(
      (obj): obj is PDFRawStream =>
        obj instanceof PDFRawStream &&
        obj.dict.lookup(PDFName.of("Subtype")) === PDFName.of("Image"),
    );
}

describe("findCandidateImages", () => {
  it("returns large JPEG and Flate RGB images with their size and filter", async () => {
    const jpg = await noisyImage("jpeg", 600, 400);
    const png = await noisyImage("png", 500, 300);
    expect(jpg.length).toBeGreaterThan(64 * 1024);
    expect(png.length).toBeGreaterThan(64 * 1024);
    const doc = await openPdf(
      await pdfWithImages([
        { data: jpg, format: "jpeg" },
        { data: png, format: "png" },
      ]),
    );
    const found = findCandidateImages(doc).sort((a, b) =>
      a.filter.localeCompare(b.filter),
    );
    expect(found).toHaveLength(2);
    expect(found[0]).toMatchObject({
      filter: "DCTDecode",
      width: 600,
      height: 400,
      channels: 3,
      predictor: 1,
    });
    expect(found[1]).toMatchObject({
      filter: "FlateDecode",
      width: 500,
      height: 300,
      channels: 3,
      predictor: 1,
    });
    expect(found[0].bytes).toBe(jpg.length);
    for (const c of found)
      expect(doc.context.lookup(c.ref)).toBeInstanceOf(PDFStream);
  });

  it("skips images that are too small in bytes or pixels", async () => {
    const tiny = await makeImage("jpeg", 300, 300); // solid color: a few KB
    const narrow = await noisyImage("jpeg", 150, 150); // under 200 px
    const doc = await openPdf(
      await pdfWithImages([
        { data: tiny, format: "jpeg" },
        { data: narrow, format: "jpeg" },
      ]),
    );
    expect(findCandidateImages(doc)).toEqual([]);
    expect(findCandidateImages(doc, { minBytes: 0, minSide: 0 })).toHaveLength(
      2,
    );
  });

  it("skips images that carry a soft mask", async () => {
    const rgba = await sharp({
      create: {
        width: 400,
        height: 400,
        channels: 4,
        background: { r: 128, g: 128, b: 128, alpha: 0.5 },
        noise: { type: "gaussian", mean: 128, sigma: 40 },
      },
    })
      .png()
      .toBuffer();
    const doc = await openPdf(
      await pdfWithImages([{ data: new Uint8Array(rgba), format: "png" }]),
    );
    expect(imageStreams(doc).some((s) => s.dict.has(PDFName.of("SMask")))).toBe(
      true,
    );
    expect(findCandidateImages(doc, { minBytes: 0, minSide: 0 })).toEqual([]);
  });
});

describe("unfilterPng", () => {
  it("undoes the Sub and Up filters", () => {
    // 2 px wide, 2 rows, 1 channel. Row 1: Sub filter, row 2: Up filter.
    const data = new Uint8Array([1, 10, 5, 2, 1, 2]);
    expect([...unfilterPng(data, 2, 2, 1)]).toEqual([10, 15, 11, 17]);
  });
});

describe("removeUnreachableObjects", () => {
  it("deletes objects nothing points at and keeps the rest", async () => {
    const doc = await openPdf(await makePdf([[100, 100]]));
    const orphan = doc.context.register(doc.context.obj({ Junk: "yes" }));
    const count = doc.context.enumerateIndirectObjects().length;
    expect(removeUnreachableObjects(doc)).toBe(1);
    expect(doc.context.lookup(orphan)).toBeUndefined();
    expect(doc.context.enumerateIndirectObjects().length).toBe(count - 1);
    const out = await openPdf(await doc.save());
    expect(out.getPageCount()).toBe(1);
  });
});

describe("compressPdf", () => {
  it("lossless keeps the pages and does not grow the file", async () => {
    const input = await pdfWithImages([
      { data: await noisyImage("jpeg", 600, 400), format: "jpeg" },
    ]);
    const result = await compressPdf(input, { level: "lossless" });
    expect(result.before).toBe(input.length);
    expect(result.after).toBe(result.bytes.length);
    expect(result.after).toBeLessThanOrEqual(input.length + 2048);
    expect(result.imagesProcessed).toBe(0);
    const out = await openPdf(result.bytes);
    expect(out.getPageCount()).toBe(1);
    expect(out.getProducer()).toBe(PDF_PRODUCER);
    // The JPEG is untouched.
    const [stream] = imageStreams(out);
    expect(stream.getContentsSize()).toBe(
      imageStreams(await openPdf(input))[0].getContentsSize(),
    );
  });

  it("lossless drops XMP metadata but keeps the title", async () => {
    const doc = await PDFDocument.create();
    doc.addPage([50, 50]);
    doc.setTitle("Keep me");
    const xmp = doc.context.register(
      doc.context.stream("<x:xmpmeta/>", { Type: "Metadata", Subtype: "XML" }),
    );
    doc.catalog.set(PDFName.of("Metadata"), xmp);
    const result = await compressPdf(await doc.save(), { level: "lossless" });
    const out = await openPdf(result.bytes);
    expect(out.getTitle()).toBe("Keep me");
    expect(out.catalog.has(PDFName.of("Metadata"))).toBe(false);
  });

  it("balanced replaces a large image with the encoder output under the same ref", async () => {
    const jpg = await noisyImage("jpeg", 600, 400);
    const png = await noisyImage("png", 500, 300);
    const input = await pdfWithImages([
      { data: jpg, format: "jpeg" },
      { data: png, format: "png" },
    ]);
    const small = await makeImage("jpeg", 8, 8);
    const encode = vi.fn<ImageEncoder>(
      async () => ({ data: small, width: 8, height: 8 }) satisfies EncodedImage,
    );
    const onProgress = vi.fn();

    const result = await compressPdf(
      input,
      { level: "balanced", encodeImage: encode },
      onProgress,
    );
    expect(result.imagesFound).toBe(2);
    expect(result.imagesProcessed).toBe(2);
    expect(result.after).toBeLessThan(result.before / 4);

    // The encoder saw the JPEG bytes as-is and the Flate image as raw RGB rows.
    const sources = encode.mock.calls.map(([source]) => source);
    const jpegSource = sources.find((s) => s.kind === "jpeg");
    const rawSource = sources.find((s) => s.kind === "raw");
    expect(jpegSource).toMatchObject({ width: 600, height: 400 });
    expect(jpegSource!.data.length).toBe(jpg.length);
    expect(rawSource).toMatchObject({ width: 500, height: 300, channels: 3 });
    expect(rawSource!.data.length).toBe(500 * 300 * 3);
    expect(encode.mock.calls[0][1]).toEqual({
      maxLongSide: 1600,
      quality: 0.75,
    });

    const out = await openPdf(result.bytes);
    expect(out.getPageCount()).toBe(2);
    expect(out.getProducer()).toBe(PDF_PRODUCER);
    const streams = imageStreams(out);
    expect(streams).toHaveLength(2);
    for (const s of streams) {
      expect(s.dict.lookup(PDFName.of("Filter"))).toBe(PDFName.of("DCTDecode"));
      expect(s.dict.lookup(PDFName.of("ColorSpace"))).toBe(
        PDFName.of("DeviceRGB"),
      );
      expect(s.dict.lookup(PDFName.of("Width"))?.toString()).toBe("8");
      expect([...s.getContents()]).toEqual([...small]);
    }
    // Every page still resolves its XObject to a stream.
    for (const page of out.getPages()) {
      const xobjects = page.node.Resources()?.lookup(PDFName.of("XObject"));
      expect(xobjects).toBeDefined();
    }
    expect(onProgress).toHaveBeenLastCalledWith(3, 3);
  });

  it("keeps the original image when the encoder output is not smaller or fails", async () => {
    const jpg = await noisyImage("jpeg", 600, 400);
    const png = await noisyImage("png", 500, 300);
    const input = await pdfWithImages([
      { data: jpg, format: "jpeg" },
      { data: png, format: "png" },
    ]);
    let call = 0;
    const encode: ImageEncoder = async () => {
      call++;
      if (call === 1) throw new Error("decoder broke");
      return { data: new Uint8Array(10 * 1024 * 1024), width: 1, height: 1 };
    };
    const result = await compressPdf(input, {
      level: "small",
      encodeImage: encode,
    });
    expect(result.imagesFound).toBe(2);
    expect(result.imagesProcessed).toBe(0);
    const out = await openPdf(result.bytes);
    expect(out.getPageCount()).toBe(2);
    const filters = imageStreams(out).map((s) =>
      s.dict.lookup(PDFName.of("Filter")),
    );
    expect(filters).toEqual(
      expect.arrayContaining([
        PDFName.of("DCTDecode"),
        PDFName.of("FlateDecode"),
      ]),
    );
  });

  it("small uses the tighter target", async () => {
    const input = await pdfWithImages([
      { data: await noisyImage("jpeg", 600, 400), format: "jpeg" },
    ]);
    const encode = vi.fn<ImageEncoder>(async () => null);
    await compressPdf(input, { level: "small", encodeImage: encode });
    expect(encode).toHaveBeenCalledTimes(1);
    expect(encode.mock.calls[0][1]).toEqual({
      maxLongSide: 1100,
      quality: 0.6,
    });
  });
});
