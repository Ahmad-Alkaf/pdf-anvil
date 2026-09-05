import {
  decodePDFRawStream,
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFObject,
  PDFRawStream,
  PDFRef,
  PDFStream,
} from "pdf-lib";
import { loadPdf, saveStamped } from "./load";
import type { Progress } from "./merge";

export type CompressLevel = "lossless" | "balanced" | "small";

/** Pixel cap on the long side and JPEG quality per level. */
export const LEVELS: Record<Exclude<CompressLevel, "lossless">, ImageTarget> = {
  balanced: { maxLongSide: 1600, quality: 0.75 },
  small: { maxLongSide: 1100, quality: 0.6 },
};

/** Images below either limit are left alone: the gain is not worth the risk. */
export const MIN_IMAGE_BYTES = 64 * 1024;
export const MIN_IMAGE_SIDE = 200;

export interface ImageTarget {
  maxLongSide: number;
  quality: number;
}

/** What the encoder receives. JPEG data is passed as is; raw data is 8-bit Gray or RGB, one row after the other. */
export type ImageSource =
  | { kind: "jpeg"; data: Uint8Array; width: number; height: number }
  | { kind: "raw"; data: Uint8Array; width: number; height: number; channels: 1 | 3 };

export interface EncodedImage {
  /** JPEG bytes, DeviceRGB, 8 bits per component. */
  data: Uint8Array;
  width: number;
  height: number;
}

/** Decodes the source, scales it down to `target`, and returns JPEG bytes. Return null to skip the image. */
export type ImageEncoder = (source: ImageSource, target: ImageTarget) => Promise<EncodedImage | null>;

export interface CompressOptions {
  level: CompressLevel;
  /** Override for tests. Defaults to the browser canvas encoder. */
  encodeImage?: ImageEncoder;
}

export interface CompressResult {
  bytes: Uint8Array;
  before: number;
  after: number;
  /** Images that were re-encoded and replaced. */
  imagesProcessed: number;
  /** Images that met the size rules, including ones that were skipped or did not shrink. */
  imagesFound: number;
}

export interface ImageCandidate {
  ref: PDFRef;
  width: number;
  height: number;
  filter: "DCTDecode" | "FlateDecode";
  channels: 1 | 3;
  /** Compressed size of the stream inside the PDF. */
  bytes: number;
  /** PNG predictor from /DecodeParms, only for FlateDecode. 1 = none. */
  predictor: number;
}

const name = (s: string) => PDFName.of(s);

function nameOf(dict: PDFDict, key: string): string | undefined {
  const value = dict.lookupMaybe(name(key), PDFName);
  return value?.decodeText();
}

function numberOf(dict: PDFDict, key: string): number | undefined {
  const value = dict.lookupMaybe(name(key), PDFNumber);
  return value?.asNumber();
}

function singleFilter(dict: PDFDict): string | undefined {
  const raw = dict.lookup(name("Filter"));
  if (raw instanceof PDFName) return raw.decodeText();
  if (raw instanceof PDFArray && raw.size() === 1) {
    const only = raw.lookup(0);
    if (only instanceof PDFName) return only.decodeText();
  }
  return undefined;
}

/** Channel count for the color spaces the encoder can handle. Undefined means skip. */
function channelsOf(dict: PDFDict): 1 | 3 | undefined {
  const raw = dict.lookup(name("ColorSpace"));
  if (raw instanceof PDFName) {
    const cs = raw.decodeText();
    if (cs === "DeviceRGB" || cs === "CalRGB") return 3;
    if (cs === "DeviceGray" || cs === "CalGray") return 1;
    return undefined;
  }
  if (raw instanceof PDFArray && raw.size() >= 2) {
    const family = raw.lookup(0);
    if (!(family instanceof PDFName)) return undefined;
    const kind = family.decodeText();
    if (kind === "ICCBased") {
      const profile = raw.lookup(1);
      if (!(profile instanceof PDFStream)) return undefined;
      const n = numberOf(profile.dict, "N");
      if (n === 3) return 3;
      if (n === 1) return 1;
      return undefined;
    }
    if (kind === "CalRGB") return 3;
    if (kind === "CalGray") return 1;
  }
  return undefined;
}

function predictorOf(dict: PDFDict): number {
  const parms = dict.lookupMaybe(name("DecodeParms"), PDFDict);
  if (!parms) return 1;
  return numberOf(parms, "Predictor") ?? 1;
}

/**
 * Image XObjects that are worth re-encoding: JPEG or raw Flate, Gray or RGB, 8 bits,
 * no transparency, no color key mask, no Decode array, and large enough to matter.
 * Pure: reads the document, changes nothing.
 */
export function findCandidateImages(
  doc: PDFDocument,
  limits: { minBytes?: number; minSide?: number } = {},
): ImageCandidate[] {
  const minBytes = limits.minBytes ?? MIN_IMAGE_BYTES;
  const minSide = limits.minSide ?? MIN_IMAGE_SIDE;
  const found: ImageCandidate[] = [];

  for (const [ref, object] of doc.context.enumerateIndirectObjects()) {
    if (!(object instanceof PDFRawStream)) continue;
    const dict = object.dict;
    if (nameOf(dict, "Subtype") !== "Image") continue;
    if (dict.has(name("SMask")) || dict.has(name("Mask")) || dict.has(name("Decode"))) continue;
    if (dict.has(name("ImageMask")) || dict.has(name("SMaskInData"))) continue;

    const filter = singleFilter(dict);
    if (filter !== "DCTDecode" && filter !== "FlateDecode") continue;

    const width = numberOf(dict, "Width") ?? 0;
    const height = numberOf(dict, "Height") ?? 0;
    if (width < 1 || height < 1 || Math.max(width, height) < minSide) continue;

    const bytes = object.getContentsSize();
    if (bytes < minBytes) continue;

    const bits = numberOf(dict, "BitsPerComponent") ?? 8;
    if (bits !== 8) continue;

    const channels = channelsOf(dict);
    if (!channels) continue;

    const predictor = filter === "FlateDecode" ? predictorOf(dict) : 1;
    // 1 = none, 10-15 = PNG filters (handled below). 2 = TIFF, not handled.
    if (predictor !== 1 && predictor < 10) continue;

    found.push({ ref, width, height, filter, channels, bytes, predictor });
  }
  return found;
}

/** Undo PNG row filters (PDF /Predictor 10-15) on 8-bit data. Each row starts with a filter type byte. */
export function unfilterPng(data: Uint8Array, width: number, height: number, channels: number): Uint8Array {
  const rowLength = width * channels;
  const out = new Uint8Array(rowLength * height);
  const prev = new Uint8Array(rowLength);
  for (let row = 0; row < height; row++) {
    const inStart = row * (rowLength + 1);
    const type = data[inStart];
    const outStart = row * rowLength;
    for (let i = 0; i < rowLength; i++) {
      const raw = data[inStart + 1 + i] ?? 0;
      const left = i >= channels ? out[outStart + i - channels] : 0;
      const up = prev[i];
      const upLeft = i >= channels ? prev[i - channels] : 0;
      let value: number;
      switch (type) {
        case 1:
          value = raw + left;
          break;
        case 2:
          value = raw + up;
          break;
        case 3:
          value = raw + ((left + up) >> 1);
          break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          value = raw + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft);
          break;
        }
        default:
          value = raw;
      }
      out[outStart + i] = value & 0xff;
    }
    prev.set(out.subarray(outStart, outStart + rowLength));
  }
  return out;
}

/** Read the pixel data of a candidate in the form the encoder wants. */
export function readImageSource(stream: PDFRawStream, candidate: ImageCandidate): ImageSource {
  const { width, height, channels } = candidate;
  if (candidate.filter === "DCTDecode") {
    return { kind: "jpeg", data: stream.getContents(), width, height };
  }
  let data = decodePDFRawStream(stream).decode();
  if (candidate.predictor >= 10) data = unfilterPng(data, width, height, channels);
  const expected = width * height * channels;
  if (data.length < expected) throw new Error("image data is shorter than its size says");
  if (data.length > expected) data = data.subarray(0, expected);
  return { kind: "raw", data, width, height, channels };
}

/** Build a DeviceRGB JPEG XObject and put it under the old ref so every page keeps pointing at it. */
export function replaceImage(doc: PDFDocument, ref: PDFRef, image: EncodedImage): void {
  const stream = doc.context.stream(image.data, {
    Type: "XObject",
    Subtype: "Image",
    Width: image.width,
    Height: image.height,
    ColorSpace: "DeviceRGB",
    BitsPerComponent: 8,
    Filter: "DCTDecode",
  });
  doc.context.assign(ref, stream);
}

// ---- lossless part: metadata and unreachable objects ----

/** Keys that hold private application data or duplicates of the Info dictionary. */
const DROP_KEYS = ["Metadata", "PieceInfo", "Thumb"];

function dropKeys(dict: PDFDict) {
  for (const key of DROP_KEYS) dict.delete(name(key));
}

/** Drop XMP packets, application private data, and legacy page thumbnails. Title and Info stay. */
export function stripMetadata(doc: PDFDocument): void {
  dropKeys(doc.catalog);
  for (const page of doc.getPages()) dropKeys(page.node);
}

function walk(object: PDFObject | undefined, seen: Set<string>, queue: PDFRef[]) {
  if (!object) return;
  if (object instanceof PDFRef) {
    const key = object.toString();
    if (!seen.has(key)) {
      seen.add(key);
      queue.push(object);
    }
    return;
  }
  if (object instanceof PDFStream) {
    walk(object.dict, seen, queue);
    return;
  }
  if (object instanceof PDFDict) {
    for (const value of object.values()) walk(value, seen, queue);
    return;
  }
  if (object instanceof PDFArray) {
    for (const value of object.asArray()) walk(value, seen, queue);
  }
}

/** Delete indirect objects that nothing reaches from the trailer. Returns the count removed. */
export function removeUnreachableObjects(doc: PDFDocument): number {
  const { context } = doc;
  const seen = new Set<string>();
  const queue: PDFRef[] = [];
  walk(context.trailerInfo.Root, seen, queue);
  walk(context.trailerInfo.Info, seen, queue);
  walk(context.trailerInfo.Encrypt, seen, queue);
  walk(context.trailerInfo.ID, seen, queue);
  while (queue.length) walk(context.lookup(queue.pop()!), seen, queue);

  let removed = 0;
  for (const [ref] of context.enumerateIndirectObjects()) {
    if (seen.has(ref.toString())) continue;
    context.delete(ref);
    removed++;
  }
  return removed;
}

// ---- browser encoder ----

type AnyCanvas = OffscreenCanvas | HTMLCanvasElement;

function makeCanvas(width: number, height: number): AnyCanvas {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function canvasToJpeg(canvas: AnyCanvas, quality: number): Promise<Blob> {
  if ("convertToBlob" in canvas) return canvas.convertToBlob({ type: "image/jpeg", quality });
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", quality),
  );
}

function toRgba(source: Extract<ImageSource, { kind: "raw" }>): Uint8ClampedArray {
  const { data, width, height, channels } = source;
  const out = new Uint8ClampedArray(width * height * 4);
  if (channels === 3) {
    for (let i = 0, j = 0; j < out.length; i += 3, j += 4) {
      out[j] = data[i];
      out[j + 1] = data[i + 1];
      out[j + 2] = data[i + 2];
      out[j + 3] = 255;
    }
  } else {
    for (let i = 0, j = 0; j < out.length; i++, j += 4) {
      out[j] = out[j + 1] = out[j + 2] = data[i];
      out[j + 3] = 255;
    }
  }
  return out;
}

async function decodeSource(source: ImageSource): Promise<ImageBitmap> {
  if (source.kind === "jpeg") {
    return createImageBitmap(new Blob([source.data as BlobPart], { type: "image/jpeg" }));
  }
  const rgba = toRgba(source);
  return createImageBitmap(new ImageData(rgba as ImageData["data"], source.width, source.height));
}

/** Decode with the browser, scale down on a canvas, encode as JPEG. Never upscales. */
export const browserImageEncoder: ImageEncoder = async (source, target) => {
  const bitmap = await decodeSource(source);
  try {
    const scale = Math.min(1, target.maxLongSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = makeCanvas(width, height);
    const ctx = canvas.getContext("2d", { alpha: false }) as
      | OffscreenCanvasRenderingContext2D
      | CanvasRenderingContext2D
      | null;
    if (!ctx) return null;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0, width, height);
    const blob = await canvasToJpeg(canvas, target.quality);
    return { data: new Uint8Array(await blob.arrayBuffer()), width, height };
  } finally {
    bitmap.close();
  }
};

// ---- main ----

/**
 * Shrink a PDF. Every level rewrites the file with object streams, drops unreachable
 * objects and private metadata, and stamps the producer. "balanced" and "small" also
 * re-encode large photos as smaller JPEGs. Text and vector graphics are never touched.
 */
export async function compressPdf(
  bytes: Uint8Array,
  options: CompressOptions,
  onProgress?: Progress,
): Promise<CompressResult> {
  const before = bytes.length;
  onProgress?.(0, 1, "Reading");
  const doc = await loadPdf(bytes);

  stripMetadata(doc);
  removeUnreachableObjects(doc);

  let imagesProcessed = 0;
  let imagesFound = 0;

  if (options.level !== "lossless") {
    const target = LEVELS[options.level];
    const encode = options.encodeImage ?? browserImageEncoder;
    const candidates = findCandidateImages(doc);
    imagesFound = candidates.length;

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      onProgress?.(i, candidates.length + 1, `Image ${i + 1} of ${candidates.length}`);
      try {
        const stream = doc.context.lookup(candidate.ref, PDFStream);
        if (!(stream instanceof PDFRawStream)) continue;
        const source = readImageSource(stream, candidate);
        const encoded = await encode(source, target);
        if (!encoded || encoded.data.length >= candidate.bytes) continue;
        replaceImage(doc, candidate.ref, encoded);
        imagesProcessed++;
      } catch {
        // One bad image must not stop the run. The original stream stays in place.
      }
      // Let the UI paint progress between images.
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  onProgress?.(imagesFound, imagesFound + 1, "Saving");
  const out = await saveStamped(doc);
  onProgress?.(imagesFound + 1, imagesFound + 1);
  return { bytes: out, before, after: out.length, imagesProcessed, imagesFound };
}
