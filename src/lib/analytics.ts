// Umami event helper. No-ops when Umami is not loaded. Must never throw.

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

export function track(event: string, data?: EventData) {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, data);
  } catch {
    // analytics must never break a tool
  }
}
