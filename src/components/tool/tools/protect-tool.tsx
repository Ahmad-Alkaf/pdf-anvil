"use client";

import { useId, useState } from "react";
import { Dropzone } from "../dropzone";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { PasswordField } from "../password-field";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { protectPdf } from "@/lib/pdf/qpdf";
import { bytesToBlob } from "@/lib/download";
import { outputName } from "@/lib/names";
import { useMessages } from "@/locales/context";
import type { Messages, ToolPage } from "@/locales/types";

type Permission = "allowPrinting" | "allowCopying" | "allowModifying";

function permissionOptions(m: Messages["protect"]): { key: Permission; label: string; hint: string }[] {
  return [
    { key: "allowPrinting", label: m.allowPrinting, hint: m.allowPrintingHint },
    { key: "allowCopying", label: m.allowCopying, hint: m.allowCopyingHint },
    { key: "allowModifying", label: m.allowEditing, hint: m.allowEditingHint },
  ];
}

export function ProtectTool({ tool }: { tool: ToolPage }) {
  const m = useMessages().protect;
  const PERMISSIONS = permissionOptions(m);
  const [file, setFile] = useState<File | null>(null);
  const [userPassword, setUserPassword] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [permissions, setPermissions] = useState<Record<Permission, boolean>>({
    allowPrinting: true,
    allowCopying: true,
    allowModifying: true,
  });
  const pdf = usePdfDocument(file);
  const runner = useToolRunner();
  const permissionsId = useId();

  const reset = () => {
    setFile(null);
    setUserPassword("");
    setOwnerPassword("");
    runner.reset();
  };

  async function run() {
    if (!file || !pdf.doc || !userPassword) return;
    await runner.run(
      async () => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const out = await protectPdf(bytes, { userPassword, ownerPassword: ownerPassword || undefined, ...permissions });
        return [{ name: outputName(file.name), blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.id, files: 1, pages: pdf.pageCount, output: "pdf" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return (
      <ResultPanel
        results={runner.results}
        zipName="protected.zip"
        onStartOver={reset}
        note={m.note}
      />
    );
  }

  const sameOwner = !ownerPassword;

  return (
    <div className="space-y-4">
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset} />
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void run();
        }}
        className="space-y-4"
      >
        <fieldset className="rounded-xl border bg-card p-4" disabled={runner.busy}>
          <legend className="px-1 text-xs font-medium text-muted-foreground">{m.passwords}</legend>
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <PasswordField
              label={m.openPassword}
              value={userPassword}
              onChange={setUserPassword}
              required
              autoFocus
              autoComplete="new-password"
              hint={m.openHint}
            />
            <PasswordField
              label={m.ownerPassword}
              value={ownerPassword}
              onChange={setOwnerPassword}
              autoComplete="new-password"
              placeholder={m.optional}
              hint={
                sameOwner
                  ? m.ownerHintEmpty
                  : m.ownerHintSet
              }
            />
          </div>
        </fieldset>

        <fieldset className="rounded-xl border bg-card p-4" disabled={runner.busy} aria-describedby={permissionsId}>
          <legend className="px-1 text-xs font-medium text-muted-foreground">{m.permissions}</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {PERMISSIONS.map((p) => (
              <label key={p.key} className="flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 hover:bg-muted/50">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 shrink-0 accent-primary"
                  checked={permissions[p.key]}
                  onChange={(e) => setPermissions((prev) => ({ ...prev, [p.key]: e.target.checked }))}
                />
                <span>
                  <span className="block text-sm font-semibold">{p.label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{p.hint}</span>
                </span>
              </label>
            ))}
          </div>
          <p id={permissionsId} className="mt-3 text-xs text-muted-foreground">
            {m.permissionsNote}
          </p>
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
        disabled={!pdf.doc || !userPassword}
        busy={runner.busy}
        progress={runner.progress}
        hint={!userPassword ? m.typeFirst : m.aes}
      />
    </div>
  );
}
