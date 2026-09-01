"use client";

import { useEffect, useState } from "react";
import { closePdf, openPdf, type PDFDocumentProxy } from "@/lib/pdf/pdfjs";
import { PdfError, toPdfError } from "@/lib/pdf/errors";
import { looksLikePdf } from "@/lib/files";

export interface PdfDocumentState {
  doc: PDFDocumentProxy | null;
  pageCount: number;
  loading: boolean;
  error: string | null;
}

const EMPTY: PdfDocumentState = { doc: null, pageCount: 0, loading: false, error: null };

/**
 * Open a File with pdf.js for page count and thumbnails.
 * The buffer given to pdf.js is transferred to its worker, so this hook reads
 * its own copy and never shares bytes with pdf-lib.
 */
export function usePdfDocument(file: File | null): PdfDocumentState {
  const [state, setState] = useState<PdfDocumentState>(EMPTY);
  const [trackedFile, setTrackedFile] = useState<File | null>(file);

  // Adjust state during render when the file changes (no setState in effect).
  if (file !== trackedFile) {
    setTrackedFile(file);
    setState(file ? { ...EMPTY, loading: true } : EMPTY);
  }

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    let opened: PDFDocumentProxy | null = null;

    (async () => {
      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        if (!looksLikePdf(bytes)) throw new PdfError("not-pdf");
        const doc = await openPdf(bytes);
        if (cancelled) {
          await closePdf(doc);
          return;
        }
        opened = doc;
        setState({ doc, pageCount: doc.numPages, loading: false, error: null });
      } catch (err) {
        if (cancelled) return;
        setState({ doc: null, pageCount: 0, loading: false, error: toPdfError(err).message });
      }
    })();

    return () => {
      cancelled = true;
      if (opened) void closePdf(opened);
    };
  }, [file]);

  return state;
}
