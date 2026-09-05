import { describe, expect, it } from "vitest";
import { PdfError, toPdfError } from "@/lib/pdf/errors";

describe("PdfError", () => {
  it("carries a code and a user message", () => {
    const err = new PdfError("encrypted");
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("PdfError");
    expect(err.code).toBe("encrypted");
    expect(err.message).toMatch(/password-protected/);
  });

  it("appends the detail in parentheses", () => {
    expect(new PdfError("bad-range", "pages start at 1").message).toBe(
      "The page range is not valid. (pages start at 1)",
    );
  });
});

describe("toPdfError", () => {
  it("returns a PdfError unchanged", () => {
    const err = new PdfError("no-pages");
    expect(toPdfError(err)).toBe(err);
  });

  it("maps pdf-lib errors", () => {
    expect(toPdfError(named("EncryptedPDFError")).code).toBe("encrypted");
    expect(toPdfError(new Error("Input document to PDFDocument.load is encrypted")).code).toBe("encrypted");
    expect(toPdfError(named("NoSuchPDFError")).code).toBe("not-pdf");
    expect(toPdfError(new Error("Failed to parse PDF document (No PDF header found)")).code).toBe("not-pdf");
  });

  it("maps pdf.js errors", () => {
    expect(toPdfError(named("PasswordException")).code).toBe("encrypted");
    expect(toPdfError(named("InvalidPDFException")).code).toBe("not-pdf");
    expect(toPdfError(named("MissingPDFException")).code).toBe("not-pdf");
    expect(toPdfError(named("UnexpectedResponseException")).code).toBe("corrupt");
    expect(toPdfError(new Error("Failed to parse PDF document (line:0 col:0 offset=0)")).code).toBe("corrupt");
  });

  it("wraps anything else as unknown with a truncated detail", () => {
    const long = "x".repeat(300);
    const err = toPdfError(new Error(long));
    expect(err.code).toBe("unknown");
    expect(err.message).toBe(`Something went wrong while processing the file. (${"x".repeat(120)})`);
  });

  it("handles values that are not errors", () => {
    expect(toPdfError("boom").code).toBe("unknown");
    expect(toPdfError(undefined).code).toBe("unknown");
    expect(toPdfError(null).code).toBe("unknown");
    expect(toPdfError(null).message).toBe("Something went wrong while processing the file.");
  });
});

function named(name: string, message = ""): Error {
  const err = new Error(message);
  err.name = name;
  return err;
}
