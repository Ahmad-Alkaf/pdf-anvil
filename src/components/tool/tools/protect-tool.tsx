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
import type { ToolDef } from "@/lib/tools";

type Permission = "allowPrinting" | "allowCopying" | "allowModifying";

const PERMISSIONS: { key: Permission; label: string; hint: string }[] = [
  { key: "allowPrinting", label: "Allow printing", hint: "The reader can print the file." },
  { key: "allowCopying", label: "Allow copying", hint: "The reader can copy text and images." },
  { key: "allowModifying", label: "Allow editing", hint: "The reader can change the file, fill forms, and add comments." },
];

export function ProtectTool({ tool }: { tool: ToolDef }) {
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
      { tool: tool.slug, files: 1, pages: pdf.pageCount, output: "pdf" },
    );
  }

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return (
      <ResultPanel
        results={runner.results}
        zipName="protected.zip"
        onStartOver={reset}
        note="The file is encrypted with AES-256. Keep the password in a safe place. Without it, the file cannot be opened."
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
          <legend className="px-1 text-xs font-medium text-muted-foreground">Passwords</legend>
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <PasswordField
              label="Password to open the file"
              value={userPassword}
              onChange={setUserPassword}
              required
              autoFocus
              autoComplete="new-password"
              hint="Every reader must type this password to open the file."
            />
            <PasswordField
              label="Owner password"
              value={ownerPassword}
              onChange={setOwnerPassword}
              autoComplete="new-password"
              placeholder="Optional"
              hint={
                sameOwner
                  ? "Empty: the password to open the file is used for both. Then the permissions below do not limit a reader who knows it."
                  : "Gives full access and removes the permission limits below."
              }
            />
          </div>
        </fieldset>

        <fieldset className="rounded-xl border bg-card p-4" disabled={runner.busy} aria-describedby={permissionsId}>
          <legend className="px-1 text-xs font-medium text-muted-foreground">Permissions</legend>
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
            Permissions apply to a reader who opens the file with the password to open it. A reader with the owner
            password can do everything.
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
        hint={!userPassword ? "Type a password to open the file first." : "AES-256 encryption"}
      />
    </div>
  );
}
