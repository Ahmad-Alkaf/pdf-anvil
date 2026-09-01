"use client";

import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string | number> {
  value: T;
  label: string;
  hint?: string;
}

interface Props<T extends string | number> {
  label: string;
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
}

/** Radio group styled as a segmented control. */
export function Segmented<T extends string | number>({ label, value, options, onChange, disabled, className }: Props<T>) {
  return (
    <fieldset className={cn("min-w-0", className)} disabled={disabled}>
      <legend className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</legend>
      <div role="radiogroup" className="inline-flex rounded-lg border bg-muted/40 p-0.5">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              role="radio"
              aria-checked={active}
              title={opt.hint}
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                disabled && "opacity-60",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
