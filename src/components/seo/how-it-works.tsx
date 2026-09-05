export function HowItWorks({ steps, title }: { steps: readonly string[]; title: string }) {
  return (
    <section aria-labelledby="how-heading">
      <h2 id="how-heading" className="text-2xl font-bold">
        {title}
      </h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={i} className="rounded-xl border bg-card p-5">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
