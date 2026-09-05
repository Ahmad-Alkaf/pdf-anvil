// Pure mapping from tool options to qpdf command-line arguments, and from a
// failed qpdf run to a PdfError. No I/O, no wasm: this file is unit-tested.
import { PdfError } from "./errors";

/** Paths inside the in-memory file system of one qpdf run. */
export const QPDF_IN = "/job/in.pdf";
export const QPDF_OUT = "/job/out.pdf";

export interface ProtectOptions {
  /** Password needed to open the file. Required. */
  userPassword: string;
  /** Password that gives full access. Defaults to the user password. */
  ownerPassword?: string;
  allowPrinting: boolean;
  allowCopying: boolean;
  allowModifying: boolean;
}

/** Exit code 0 is success; 3 is success with warnings. */
export function isQpdfOk(exitCode: number): boolean {
  return exitCode === 0 || exitCode === 3;
}

/** `qpdf --is-encrypted in.pdf`: exit 0 = encrypted, exit 2 with empty stderr = not encrypted. */
export function isEncryptedArgs(): string[] {
  return ["--is-encrypted", QPDF_IN];
}

/** Decrypt with the user or the owner password. The output has no password and no limits. */
export function unlockArgs(password: string): string[] {
  return [`--password=${password}`, "--decrypt", QPDF_IN, QPDF_OUT];
}

/** Encrypt with AES-256 (PDF 2.0). Permissions apply to a reader who opens with the user password. */
export function protectArgs(options: ProtectOptions): string[] {
  const user = options.userPassword;
  const owner = options.ownerPassword || user;
  return [
    "--encrypt",
    `--user-password=${user}`,
    `--owner-password=${owner}`,
    "--bits=256",
    `--print=${options.allowPrinting ? "full" : "none"}`,
    `--modify=${options.allowModifying ? "all" : "none"}`,
    `--extract=${options.allowCopying ? "y" : "n"}`,
    "--",
    QPDF_IN,
    QPDF_OUT,
  ];
}

/** Map a failed qpdf run to a PdfError with a user message. Never echoes a password. */
export function qpdfFailure(exitCode: number, stderr: string): PdfError {
  const text = stderr.trim();
  if (/invalid password/i.test(text)) return new PdfError("wrong-password");
  if (/can't find PDF header/i.test(text)) return new PdfError("not-pdf");
  if (/damaged|unable to find trailer|xref|startxref|not a PDF/i.test(text)) return new PdfError("corrupt");
  // Last line without the "program: /job/in.pdf: " prefix qpdf adds.
  const last = text.split("\n").filter(Boolean).at(-1) ?? "";
  const detail = last.replace(/^[^:]*:\s*(?:\/job\/[\w.]+:\s*)?/, "").trim();
  return new PdfError("unknown", detail ? detail.slice(0, 120) : `qpdf exit code ${exitCode}`);
}
