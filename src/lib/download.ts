import { zip, type Zippable } from "fflate";

export interface OutputFile {
  name: string;
  blob: Blob;
}

export function bytesToBlob(bytes: Uint8Array, type: string): Blob {
  return new Blob([bytes as BlobPart], { type });
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Safari needs the URL alive until the download starts.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Zip already-compressed files without recompressing them. */
export async function zipFiles(files: OutputFile[]): Promise<Blob> {
  const tree: Zippable = {};
  for (const f of files) {
    const data = new Uint8Array(await f.blob.arrayBuffer());
    tree[f.name] = [data, { level: 0 }];
  }
  const out = await new Promise<Uint8Array>((resolve, reject) =>
    zip(tree, { level: 0 }, (err, data) => (err ? reject(err) : resolve(data))),
  );
  return bytesToBlob(out, "application/zip");
}
