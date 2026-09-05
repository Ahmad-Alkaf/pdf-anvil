"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMessages } from "@/locales/context";
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
}

/**
 * Password input with a show/hide toggle. Never stores the value anywhere.
 *
 * The input is `type="text"` masked with CSS (`-webkit-text-security`, which
 * every current browser supports), not `type="password"`. A document password
 * is not a login: Chrome ignores `autocomplete="off"` on password fields and
 * offers to save the value after the form is used, which is wrong here. A
 * masked text field is not classified as a credential, so no prompt appears.
 */
export function PasswordField({ label, value, onChange, hint, placeholder, required, autoFocus, disabled }: Props) {
  const m = useMessages().toolShell.password;
  const id = useId();
  const hintId = `${id}-hint`;
  const [shown, setShown] = useState(false);
  const toggleLabel = shown ? m.hide : m.show;
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
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          data-1p-ignore=""
          data-lpignore="true"
          data-bwignore=""
          data-form-type="other"
          aria-describedby={hint ? hintId : undefined}
          className={cn(
            "h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm",
            !shown && "masked-text",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            "disabled:opacity-60",
          )}
        />
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          disabled={disabled}
          aria-label={toggleLabel}
          aria-pressed={shown}
          title={toggleLabel}
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
