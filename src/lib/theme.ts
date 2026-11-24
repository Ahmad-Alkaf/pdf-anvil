/** The localStorage key of the theme choice (the next-themes default, given explicitly). */
export const THEME_STORAGE_KEY = "theme";

/**
 * The theme that next-themes applies for a stored choice: "light" or "dark" as stored, and the
 * system theme for "system", for no stored value, and for an unknown value.
 */
export function resolveTheme(stored: string | null, systemDark: boolean): "light" | "dark" {
  if (stored === "light" || stored === "dark") return stored;
  return systemDark ? "dark" : "light";
}
