// Runs the qpdf WebAssembly build (from the pdfstudio package) against one
// input file. Knows nothing about asset paths or threads: src/lib/pdf/qpdf.ts
// decides where the files come from and whether a Web Worker runs this code.
//
// The wasm is compiled once. Every run gets a fresh module instance: qpdf
// keeps global state across callMain calls, and a fresh instance also frees
// the input and output from memory when the run ends.
import { looksLikePdf } from "@/lib/files";
import { PdfError, toPdfError } from "./errors";
import {
  isEncryptedArgs,
  isQpdfOk,
  protectArgs,
  qpdfFailure,
  QPDF_IN,
  QPDF_OUT,
  unlockArgs,
  type ProtectOptions,
} from "./qpdf-args";

/** The parts of the Emscripten module that this code touches. */
export interface QpdfFs {
  mkdir(path: string): void;
  writeFile(path: string, data: Uint8Array): void;
  readFile(path: string): Uint8Array;
  analyzePath(path: string): { exists: boolean };
  /** Redirect stdout and stderr at the byte level. Must be called during preRun. */
  init(
    input: (() => number | null) | null,
    output: ((byte: number | null) => void) | null,
    error: ((byte: number | null) => void) | null,
  ): void;
}

export interface QpdfModule {
  callMain(args: string[]): number;
  FS: QpdfFs;
}

export interface QpdfModuleInit {
  noInitialRun?: boolean;
  thisProgram?: string;
  preRun?: (() => void)[];
  instantiateWasm?: (
    imports: WebAssembly.Imports,
    done: (instance: WebAssembly.Instance, module: WebAssembly.Module) => void,
  ) => Record<string, never>;
  /** Filled in by the glue before preRun runs. */
  FS?: QpdfFs;
}

export type CreateQpdfModule = (init: QpdfModuleInit) => Promise<QpdfModule>;

export interface QpdfEngine {
  create: CreateQpdfModule;
  compiled: WebAssembly.Module;
}

export interface QpdfRun {
  exitCode: number;
  stdout: string;
  stderr: string;
  /** Bytes of /job/out.pdf when the run produced it. */
  output: Uint8Array | null;
}

/** One qpdf run: `input` is written to /job/in.pdf, `args` are the qpdf arguments. */
export type RunQpdf = (input: Uint8Array, args: string[]) => Promise<QpdfRun>;

/** Load the glue and compile the wasm from URLs (browser and Web Worker). */
export async function loadEngine(glueUrl: string, wasmUrl: string): Promise<QpdfEngine> {
  const [glue, response] = await Promise.all([
    import(/* webpackIgnore: true */ /* @vite-ignore */ glueUrl) as Promise<{ default: CreateQpdfModule }>,
    fetch(wasmUrl),
  ]);
  if (!response.ok) throw new Error(`qpdf.wasm: HTTP ${response.status}`);
  const compiled = await WebAssembly.compile(await response.arrayBuffer());
  return { create: glue.default, compiled };
}

const decoder = new TextDecoder();

export async function runWithEngine(engine: QpdfEngine, input: Uint8Array, args: string[]): Promise<QpdfRun> {
  const out: number[] = [];
  const err: number[] = [];
  const init: QpdfModuleInit = {
    noInitialRun: true,
    thisProgram: "qpdf",
    preRun: [
      () => {
        init.FS?.init(
          null,
          (b) => {
            if (b !== null) out.push(b);
          },
          (b) => {
            if (b !== null) err.push(b);
          },
        );
      },
    ],
    instantiateWasm: (imports, done) => {
      WebAssembly.instantiate(engine.compiled, imports).then((instance) => done(instance, engine.compiled));
      return {};
    },
  };
  const mod = await engine.create(init);
  mod.FS.mkdir("/job");
  mod.FS.writeFile(QPDF_IN, input);

  let exitCode: number;
  try {
    exitCode = mod.callMain(args);
  } catch (e) {
    // qpdf may leave through exit(); Emscripten surfaces that as an ExitStatus throw.
    const status = (e as { name?: string; status?: number }) ?? {};
    if (status.name === "ExitStatus" && typeof status.status === "number") exitCode = status.status;
    else throw e;
  }

  const output = mod.FS.analyzePath(QPDF_OUT).exists ? mod.FS.readFile(QPDF_OUT) : null;
  return {
    exitCode,
    stdout: decoder.decode(new Uint8Array(out)),
    stderr: decoder.decode(new Uint8Array(err)),
    // Copy out of the wasm heap so the module can be dropped.
    output: output ? output.slice() : null,
  };
}

function outputOf(run: QpdfRun): Uint8Array {
  if (!isQpdfOk(run.exitCode)) throw qpdfFailure(run.exitCode, run.stderr);
  if (!run.output) throw new PdfError("unknown", "qpdf produced no output");
  return run.output;
}

/**
 * True when `bytes` is an encrypted PDF. Throws a PdfError when the file is
 * not a PDF or is damaged, so a tool can show that as soon as the file is dropped.
 */
export async function isEncryptedWith(run: RunQpdf, bytes: Uint8Array): Promise<boolean> {
  if (!looksLikePdf(bytes)) throw new PdfError("not-pdf");
  try {
    const probe = await run(bytes, isEncryptedArgs());
    if (probe.exitCode === 0) return true;
    if (probe.exitCode === 2 && probe.stderr.trim() === "") return false;
    throw qpdfFailure(probe.exitCode, probe.stderr);
  } catch (err) {
    throw toPdfError(err);
  }
}

/** Remove the password from `bytes` using the user or the owner password. */
export async function unlockWith(run: RunQpdf, bytes: Uint8Array, password: string): Promise<Uint8Array> {
  if (!(await isEncryptedWith(run, bytes))) throw new PdfError("not-encrypted");
  try {
    return outputOf(await run(bytes, unlockArgs(password)));
  } catch (err) {
    throw toPdfError(err);
  }
}

/** Encrypt `bytes` with AES-256 and the given passwords and permissions. */
export async function protectWith(run: RunQpdf, bytes: Uint8Array, options: ProtectOptions): Promise<Uint8Array> {
  if (!looksLikePdf(bytes)) throw new PdfError("not-pdf");
  if (!options.userPassword) throw new PdfError("unknown", "a password is required");
  try {
    return outputOf(await run(bytes, protectArgs(options)));
  } catch (err) {
    throw toPdfError(err);
  }
}
