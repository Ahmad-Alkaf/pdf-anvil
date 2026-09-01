export const SIZE_WARN_BYTES = 100 * 1024 * 1024; // soft warning, no hard limit

export const PDF_ACCEPT: Record<string, string[]> = { "application/pdf": [".pdf"] };
export const IMAGE_ACCEPT: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export function acceptToInputString(accept: Record<string, string[]>): string {
  return Object.entries(accept)
    .flatMap(([mime, exts]) => [mime, ...exts])
    .join(",");
}

export function acceptToExtensions(accept: Record<string, string[]>): string[] {
  return Object.values(accept).flat();
}

export function matchesAccept(file: File, accept: Record<string, string[]>): boolean {
  const name = file.name.toLowerCase();
  for (const [mime, exts] of Object.entries(accept)) {
    if (file.type && file.type === mime) return true;
    if (exts.some((ext) => name.endsWith(ext))) return true;
  }
  return false;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[i]}`;
}

/** True when the buffer starts with a PDF header within the first 1 KB. */
export function looksLikePdf(bytes: Uint8Array): boolean {
  const head = bytes.subarray(0, Math.min(bytes.length, 1024));
  const text = new TextDecoder("latin1").decode(head);
  return text.includes("%PDF-");
}

export function baseName(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  const base = dot > 0 ? fileName.slice(0, dot) : fileName;
  return base.replace(/[\\/:*?"<>|]+/g, "-").trim() || "document";
}

export function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}
