export type PdfErrorCode =
  | "encrypted"
  | "not-pdf"
  | "corrupt"
  | "too-large"
  | "no-pages"
  | "bad-range"
  | "unsupported-image"
  | "unknown";

const MESSAGES: Record<PdfErrorCode, string> = {
  encrypted:
    "This PDF is password-protected. Remove the password in your PDF viewer first, then try again.",
  "not-pdf": "This file is not a valid PDF.",
  corrupt: "This PDF is damaged and cannot be read.",
  "too-large": "This page is too large to render at the selected quality. Try a lower DPI.",
  "no-pages": "This PDF has no pages.",
  "bad-range": "The page range is not valid.",
  "unsupported-image": "This image format is not supported. Use JPG, PNG, or WebP.",
  unknown: "Something went wrong while processing the file.",
};

export class PdfError extends Error {
  readonly code: PdfErrorCode;
  constructor(code: PdfErrorCode, detail?: string) {
    super(detail ? `${MESSAGES[code]} (${detail})` : MESSAGES[code]);
    this.name = "PdfError";
    this.code = code;
  }
}

/** Map any thrown value from pdf-lib or pdf.js to a PdfError with a user message. */
export function toPdfError(err: unknown): PdfError {
  if (err instanceof PdfError) return err;
  const name = (err as { name?: string })?.name ?? "";
  const message = (err as { message?: string })?.message ?? "";

  // pdf-lib
  if (name === "EncryptedPDFError" || /encrypted/i.test(message)) return new PdfError("encrypted");
  if (name === "NoSuchPDFError" || /No PDF header/i.test(message)) return new PdfError("not-pdf");
  // pdf.js
  if (name === "PasswordException") return new PdfError("encrypted");
  if (name === "InvalidPDFException") return new PdfError("not-pdf");
  if (name === "MissingPDFException") return new PdfError("not-pdf");
  if (name === "UnexpectedResponseException") return new PdfError("corrupt");
  if (/Failed to parse PDF document/i.test(message)) return new PdfError("corrupt");

  return new PdfError("unknown", message ? message.slice(0, 120) : undefined);
}
