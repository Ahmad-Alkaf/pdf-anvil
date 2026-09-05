export type PdfErrorCode =
  | "encrypted"
  | "wrong-password"
  | "not-encrypted"
  | "not-pdf"
  | "corrupt"
  | "too-large"
  | "no-pages"
  | "bad-range"
  | "unsupported-image"
  | "unknown";

/**
 * Structured detail of an error. The UI turns a detail into text in the
 * current language; `PdfError.message` holds the English text as a fallback
 * for logs and tests.
 */
export type PdfErrorDetail =
  | { key: "range-empty" }
  | { key: "range-bad-part"; part: string }
  | { key: "range-start" }
  | { key: "range-too-high"; pages: number }
  | { key: "range-reversed"; part: string }
  /** Free text from a library, already in no particular language. */
  | { key: "text"; text: string };

/** English reference messages. The locale bundles hold the translations (`messages.errors`). */
export const MESSAGES: Record<PdfErrorCode, string> = {
  encrypted: "This PDF is password-protected. Remove the password with the Unlock PDF tool first, then try again.",
  "wrong-password": "The password is not correct. Check it and try again.",
  "not-encrypted": "This PDF has no password. There is nothing to remove.",
  "not-pdf": "This file is not a valid PDF.",
  corrupt: "This PDF is damaged and cannot be read.",
  "too-large": "This page is too large to render at the selected quality. Try a lower DPI.",
  "no-pages": "This PDF has no pages.",
  "bad-range": "The page range is not valid.",
  "unsupported-image": "This image format is not supported. Use JPG, PNG, or WebP.",
  unknown: "Something went wrong while processing the file.",
};

/** English reference text of the structured details (`messages.errorDetails` in the locales). */
export const DETAIL_MESSAGES: Record<Exclude<PdfErrorDetail["key"], "text">, string> = {
  "range-empty": "enter at least one page or range",
  "range-bad-part": '"{part}" is not a page or range',
  "range-start": "pages start at 1",
  "range-too-high": "this PDF has {pages} pages",
  "range-reversed": '"{part}" ends before it starts',
};

/** Fill `{name}` placeholders of a detail template. */
export function detailText(templates: Record<Exclude<PdfErrorDetail["key"], "text">, string>, detail: PdfErrorDetail): string {
  if (detail.key === "text") return detail.text;
  const template = templates[detail.key];
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = (detail as unknown as Record<string, unknown>)[name];
    return value === undefined ? `{${name}}` : String(value);
  });
}

export class PdfError extends Error {
  readonly code: PdfErrorCode;
  readonly detail?: PdfErrorDetail;
  constructor(code: PdfErrorCode, detail?: string | PdfErrorDetail) {
    const structured = typeof detail === "string" ? { key: "text" as const, text: detail } : detail;
    super(structured ? `${MESSAGES[code]} (${detailText(DETAIL_MESSAGES, structured)})` : MESSAGES[code]);
    this.name = "PdfError";
    this.code = code;
    this.detail = structured;
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
