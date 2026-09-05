"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Camera, FileUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { acceptToExtensions, acceptToInputString, matchesAccept } from "@/lib/files";
import { useMessages } from "@/locales/context";
import { plural } from "@/locales/format";
import { cn } from "@/lib/utils";

interface Props {
  accept: Record<string, string[]>;
  multiple: boolean;
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  compact?: boolean; // smaller variant for "add more files"
  label?: string;
  /** Adds a "Take a photo" button that opens the phone camera. Desktop browsers open the file picker. */
  capture?: boolean;
}

export function Dropzone({ accept, multiple, onFiles, disabled, compact, label, capture }: Props) {
  const m = useMessages().toolShell.dropzone;
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [rejected, setRejected] = useState<string | null>(null);
  const exts = acceptToExtensions(accept);

  const handleFiles = useCallback(
    (list: FileList | File[] | null) => {
      if (!list) return;
      const all = Array.from(list);
      const ok = all.filter((f) => matchesAccept(f, accept));
      const bad = all.length - ok.length;
      setRejected(bad > 0 ? plural(m.skipped, bad, { list: exts.join(", ") }) : null);
      if (ok.length === 0) return;
      onFiles(multiple ? ok : [ok[0]]);
    },
    [accept, exts, m.skipped, multiple, onFiles],
  );

  // Paste support (Ctrl+V a file from the clipboard).
  useEffect(() => {
    if (disabled) return;
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.length) handleFiles(files);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [disabled, handleFiles]);

  const text = label ?? (multiple ? m.dropFiles : m.dropFile);

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed text-center transition-colors",
          compact ? "gap-1 px-4 py-4" : "gap-3 px-6 py-12 sm:py-16",
          over ? "border-primary bg-accent/60" : "border-border bg-card hover:border-primary/60 hover:bg-muted/40",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-105",
            compact ? "size-8" : "size-14",
          )}
        >
          <FileUp className={compact ? "size-4" : "size-7"} aria-hidden="true" />
        </span>
        <span className={cn("font-semibold", compact ? "text-sm" : "text-base sm:text-lg")}>{text}</span>
        {!compact && (
          <span className="text-sm text-muted-foreground">
            {exts.join(", ")} · {m.filesStay}
            <Lock className="ms-1 inline size-3.5 align-[-2px]" aria-hidden="true" />
          </span>
        )}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="sr-only"
          accept={acceptToInputString(accept)}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {capture && (
        <div className={cn("flex justify-center", compact ? "mt-2" : "mt-3")}>
          <Button
            variant="outline"
            size={compact ? "sm" : "md"}
            disabled={disabled}
            onClick={() => captureRef.current?.click()}
          >
            <Camera className="size-4" aria-hidden="true" />
            {m.takePhoto}
          </Button>
          <input
            ref={captureRef}
            type="file"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            data-testid="capture-input"
            accept="image/*"
            capture="environment"
            multiple={multiple}
            disabled={disabled}
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
      )}
      {rejected && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {rejected}
        </p>
      )}
    </div>
  );
}
