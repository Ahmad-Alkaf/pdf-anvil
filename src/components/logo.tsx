import { MARK_PATH, MARK_VIEWBOX } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
    >
      <path d={MARK_PATH} />
    </svg>
  );
}

export function Logo({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const mark = size === "lg" ? "size-9" : size === "sm" ? "size-6" : "size-7";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Mark className={cn(mark, "text-primary")} />
      <span className={cn("font-heading font-bold tracking-tight", text)}>
        PDF<span className="text-primary"> Anvil</span>
      </span>
    </span>
  );
}
