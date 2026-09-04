import { ShieldCheck, WifiOff, Zap } from "lucide-react";

export function PrivacyNote() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Files never leave your device",
      text: "The tool runs as JavaScript in your browser. There is no upload and no server-side copy of your document.",
    },
    {
      icon: WifiOff,
      title: "Works offline",
      text: "After the page loads, you can disconnect from the internet. Processing does not need a connection.",
    },
    {
      icon: Zap,
      title: "No queue, no limits",
      text: "Your device does the work, so there is no waiting line, no daily quota, and no watermark.",
    },
  ];
  return (
    <section aria-labelledby="privacy-heading" className="rounded-2xl border bg-muted/40 p-6">
      <h2 id="privacy-heading" className="text-2xl font-bold">
        Secure and private by design
      </h2>
      <ul className="mt-5 grid gap-5 sm:grid-cols-3">
        {points.map((p) => (
          <li key={p.title} className="flex gap-3">
            <p.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="block font-semibold">{p.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{p.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
