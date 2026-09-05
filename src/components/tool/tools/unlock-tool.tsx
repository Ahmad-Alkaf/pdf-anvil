"use client";

import { useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { Dropzone } from "../dropzone";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { PasswordField } from "../password-field";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { isEncryptedPdf, unlockPdf } from "@/lib/pdf/qpdf";
import { toPdfError } from "@/lib/pdf/errors";
import { bytesToBlob } from "@/lib/download";
import { outputName } from "@/lib/names";
import { useMessages } from "@/locales/context";
import { errorMessage } from "@/locales/format";
import type { ToolPage } from "@/locales/types";

interface Check {
  loading: boolean;
  /** True when the file has a password and can be unlocked. */
  encrypted: boolean;
  /** Shown as soon as the file is dropped: no password, not a PDF, or damaged. */
  error: string | null;
}

const UNCHECKED: Check = { loading: false, encrypted: false, error: null };

// No pdf.js preview here: an encrypted file cannot be opened without the
// password. qpdf checks the file at once when it is dropped, so a file that
// has no password or is damaged shows its error before the user types anything.
export function UnlockTool({ tool }: { tool: ToolPage }) {
  const messages = useMessages();
  const m = messages.unlock;
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState<Check>(UNCHECKED);
  const runner = useToolRunner();

  // Adjust state during render when the file changes (no setState in effect).
  const [trackedFile, setTrackedFile] = useState<File | null>(file);
  if (file !== trackedFile) {
    setTrackedFile(file);
    setCheck(file ? { ...UNCHECKED, loading: true } : UNCHECKED);
  }

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const encrypted = await isEncryptedPdf(bytes);
        if (cancelled) return;
        setCheck({
          loading: false,
          encrypted,
          error: encrypted ? null : messages.errors["not-encrypted"],
        });
      } catch (err) {
        if (cancelled) return;
        setCheck({ loading: false, encrypted: false, error: errorMessage(messages, toPdfError(err)) });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [file, messages]);

  const reset = () => {
    setFile(null);
    setPassword("");
    runner.reset();
  };

  async function run() {
    if (!file || !password || !check.encrypted) return;
    await runner.run(
      async () => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const out = await unlockPdf(bytes, password);
        return [{ name: outputName(file.name), blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.id, files: 1, output: "pdf" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return (
      <ResultPanel
        results={runner.results}
        zipName="unlocked.zip"
        onStartOver={reset}
        note={m.note}
      />
    );
  }

  const canRun = check.encrypted && !!password;
  const hint = check.loading
    ? m.checking
    : !check.encrypted
      ? m.chooseProtected
      : !password
        ? m.typePassword
        : undefined;

  return (
    <div className="space-y-4">
      <FileHeader file={file} loading={check.loading} onRemove={reset}>
        {check.encrypted && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <LockKeyhole className="size-4" aria-hidden="true" /> {m.protected}
          </span>
        )}
      </FileHeader>
      <SizeWarning bytes={file.size} />
      {check.error && <ErrorBanner message={check.error} />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void run();
        }}
      >
        <fieldset className="rounded-xl border bg-card p-4" disabled={runner.busy || check.loading || !check.encrypted}>
          <legend className="px-1 text-xs font-medium text-muted-foreground">{m.legend}</legend>
          <div className="max-w-md">
            <PasswordField
              label={m.label}
              value={password}
              onChange={setPassword}
              required
              autoFocus
              autoComplete="current-password"
              hint={m.hint}
            />
          </div>
        </fieldset>
        <button type="submit" className="sr-only" tabIndex={-1} aria-hidden="true">
          {tool.actionLabel}
        </button>
      </form>

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={!canRun}
        busy={runner.busy}
        progress={runner.progress}
        hint={hint}
      />
    </div>
  );
}
