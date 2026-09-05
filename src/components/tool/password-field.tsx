"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

/** Password input with a show/hide toggle. Never stores the value anywhere. */
export function PasswordField({ label, value, onChange, hint, placeholder, required, autoFocus, disabled, autoComplete }: Props) {
  const id = useId();
  const hintId = `${id}-hint`;
  const [shown, setShown] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      <div className="mt-1.5 flex items-center gap-1">
        <input
          id={id}
          type={shown ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          autoComplete={autoComplete ?? "off"}
          spellCheck={false}
          aria-describedby={hint ? hintId : undefined}
          className={cn(
            "h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            "disabled:opacity-60",
          )}
        />
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          disabled={disabled}
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          title={shown ? "Hide password" : "Show password"}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-card text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-60"
        >
          {shown ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
        </button>
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
