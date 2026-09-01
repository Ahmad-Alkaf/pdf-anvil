import { PDFDocument } from "pdf-lib";
import { PDF_CREATOR, PDF_PRODUCER } from "@/lib/site";
import { looksLikePdf } from "@/lib/files";
import { PdfError, toPdfError } from "./errors";

/** Load a PDF with pdf-lib, keeping the user's Title/Author/Creator. */
export async function loadPdf(bytes: Uint8Array): Promise<PDFDocument> {
  if (!looksLikePdf(bytes)) throw new PdfError("not-pdf");
  try {
    const doc = await PDFDocument.load(bytes, { updateMetadata: false });
    if (doc.getPageCount() === 0) throw new PdfError("no-pages");
    return doc;
  } catch (err) {
    throw toPdfError(err);
  }
}

/** New empty document created by PDF Anvil. */
export async function createPdf(): Promise<PDFDocument> {
  const doc = await PDFDocument.create();
  doc.setCreator(PDF_CREATOR);
  return doc;
}

/** Mark the output. Call before save(). Invisible on the page. */
export function stamp(doc: PDFDocument) {
  doc.setProducer(PDF_PRODUCER);
  doc.setModificationDate(new Date());
}

export async function saveStamped(doc: PDFDocument): Promise<Uint8Array> {
  stamp(doc);
  return doc.save({ useObjectStreams: true });
}
