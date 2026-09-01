import { AlertTriangle } from "lucide-react";
import { formatBytes, SIZE_WARN_BYTES } from "@/lib/files";

export function SizeWarning({ bytes }: { bytes: number }) {
  if (bytes <= SIZE_WARN_BYTES) return null;
  return (
    <p
      role="status"
      className="flex items-start gap-2 rounded-lg border border-warning-foreground/20 bg-warning px-3 py-2 text-sm text-warning-foreground"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>
        Large input ({formatBytes(bytes)}). Processing happens in your browser and can take a while or run out of
        memory on small devices. You can still continue.
      </span>
    </p>
  );
}
