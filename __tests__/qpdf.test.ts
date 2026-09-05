// Round trip through the real qpdf wasm in Node. The glue and the wasm come
// from node_modules/pdfstudio, the same files that scripts/copy-pdf-assets.mjs
// copies to public/qpdf/<version>/ for the browser.
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { QPDF_VERSION } from "@/lib/pdf/qpdf";
import {
  isEncryptedWith,
  protectWith,
  runWithEngine,
  unlockWith,
  type CreateQpdfModule,
  type QpdfEngine,
  type RunQpdf,
} from "@/lib/pdf/qpdf-core";
import { QPDF_IN } from "@/lib/pdf/qpdf-args";
import { makePdf, openPdf } from "./helpers/fixtures";

const pkgDir = fileURLToPath(new URL("../node_modules/pdfstudio/", import.meta.url));

let run: RunQpdf;

beforeAll(async () => {
  // The package exports map hides dist/wasm/qpdf.js; a file URL bypasses it.
  const glue = (await import(pathToFileURL(`${pkgDir}dist/wasm/qpdf.js`).href)) as { default: CreateQpdfModule };
  const engine: QpdfEngine = {
    create: glue.default,
    compiled: await WebAssembly.compile(readFileSync(`${pkgDir}dist/wasm/qpdf.wasm`)),
  };
  run = (input, args) => runWithEngine(engine, input, args);
});

async function encryptionInfo(bytes: Uint8Array, password: string) {
  const result = await run(bytes, [`--password=${password}`, "--json", "--json-key=encrypt", QPDF_IN]);
  expect(result.exitCode).toBe(0);
  return JSON.parse(result.stdout).encrypt as {
    encrypted: boolean;
    userpasswordmatched: boolean;
    ownerpasswordmatched: boolean;
    parameters: { bits: number; method: string };
    capabilities: { printhigh: boolean; printlow: boolean; extract: boolean; modify: boolean };
  };
}

const twoPages = () =>
  makePdf([
    [200, 100],
    [100, 200],
  ]);

describe("qpdf asset version", () => {
  it("matches the installed pdfstudio version", () => {
    const { version } = JSON.parse(readFileSync(`${pkgDir}package.json`, "utf8"));
    expect(QPDF_VERSION).toBe(version);
  });
});

describe("protectWith / unlockWith", () => {
  it("encrypts with AES-256 and decrypts again with the user password", async () => {
    const plain = await twoPages();
    const locked = await protectWith(run, plain, {
      userPassword: "test1234",
      allowPrinting: true,
      allowCopying: true,
      allowModifying: true,
    });
    const info = await encryptionInfo(locked, "test1234");
    expect(info.encrypted).toBe(true);
    expect(info.parameters).toMatchObject({ bits: 256, method: "AESv3" });
    expect(info.userpasswordmatched).toBe(true);

    const unlocked = await unlockWith(run, locked, "test1234");
    const doc = await openPdf(unlocked);
    expect(doc.getPageCount()).toBe(2);
    expect(doc.getPages().map((p) => [p.getWidth(), p.getHeight()])).toEqual([
      [200, 100],
      [100, 200],
    ]);
    expect((await run(unlocked, ["--is-encrypted", QPDF_IN])).exitCode).toBe(2);
  });

  it("accepts the owner password for unlocking", async () => {
    const locked = await protectWith(run, await twoPages(), {
      userPassword: "open",
      ownerPassword: "owner-only",
      allowPrinting: false,
      allowCopying: false,
      allowModifying: false,
    });
    const info = await encryptionInfo(locked, "owner-only");
    expect(info.ownerpasswordmatched).toBe(true);
    expect(info.userpasswordmatched).toBe(false);
    const unlocked = await unlockWith(run, locked, "owner-only");
    expect((await openPdf(unlocked)).getPageCount()).toBe(2);
  });

  it("writes the permission flags into the file", async () => {
    const plain = await twoPages();
    const locked = await protectWith(run, plain, {
      userPassword: "u",
      ownerPassword: "o",
      allowPrinting: false,
      allowCopying: true,
      allowModifying: false,
    });
    const caps = (await encryptionInfo(locked, "u")).capabilities;
    expect(caps.printhigh).toBe(false);
    expect(caps.printlow).toBe(false);
    expect(caps.extract).toBe(true);
    expect(caps.modify).toBe(false);

    const open = await protectWith(run, plain, {
      userPassword: "u",
      ownerPassword: "o",
      allowPrinting: true,
      allowCopying: false,
      allowModifying: true,
    });
    const caps2 = (await encryptionInfo(open, "u")).capabilities;
    expect(caps2.printhigh).toBe(true);
    expect(caps2.extract).toBe(false);
    expect(caps2.modify).toBe(true);
  });

  it("rejects a wrong password with the mapped error", async () => {
    const locked = await protectWith(run, await twoPages(), {
      userPassword: "right",
      allowPrinting: true,
      allowCopying: true,
      allowModifying: true,
    });
    await expect(unlockWith(run, locked, "wrong")).rejects.toMatchObject({ code: "wrong-password" });
    await expect(unlockWith(run, locked, "")).rejects.toMatchObject({ code: "wrong-password" });
  });

  it("tells the user when the file has no password", async () => {
    await expect(unlockWith(run, await twoPages(), "anything")).rejects.toMatchObject({ code: "not-encrypted" });
  });

  it("reports whether a file has a password before any password is typed", async () => {
    const plain = await twoPages();
    expect(await isEncryptedWith(run, plain)).toBe(false);
    const locked = await protectWith(run, plain, { userPassword: "x", allowPrinting: true, allowCopying: true, allowModifying: true });
    expect(await isEncryptedWith(run, locked)).toBe(true);
    await expect(isEncryptedWith(run, new Uint8Array([1, 2, 3]))).rejects.toMatchObject({ code: "not-pdf" });
    await expect(isEncryptedWith(run, new TextEncoder().encode("%PDF-1.7\nnothing here\n"))).rejects.toMatchObject({
      code: "corrupt",
    });
  });

  it("rejects input that is not a PDF", async () => {
    const opts = { userPassword: "x", allowPrinting: true, allowCopying: true, allowModifying: true };
    await expect(protectWith(run, new Uint8Array([1, 2, 3]), opts)).rejects.toMatchObject({ code: "not-pdf" });
    await expect(unlockWith(run, new Uint8Array([1, 2, 3]), "x")).rejects.toMatchObject({ code: "not-pdf" });
    // Has a header but nothing else: qpdf cannot find the trailer.
    const broken = new TextEncoder().encode("%PDF-1.7\nnothing here\n");
    await expect(unlockWith(run, broken, "x")).rejects.toMatchObject({ code: "corrupt" });
  });

  it("requires a user password to protect", async () => {
    await expect(
      protectWith(run, await twoPages(), { userPassword: "", allowPrinting: true, allowCopying: true, allowModifying: true }),
    ).rejects.toMatchObject({ code: "unknown" });
  });
});
