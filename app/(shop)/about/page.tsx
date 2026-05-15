import { Flame, Leaf, PackageCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
  const values = [
    ["Small batch", Flame, "Every candle is poured in limited runs for better quality control."],
    ["Transparent sourcing", Leaf, "Wax blends and fragrance materials are selected for performance and clarity."],
    ["Built to keep", PackageCheck, "Heavy vessels are designed to be cleaned, reused, and displayed."],
    ["Atmospheric scent", Sparkles, "Each fragrance is composed with top, heart, and base notes."]
  ] as const;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">About</p>
      <h1 className="max-w-4xl font-display fluid-heading font-light">Warm luxury with a darker heart.</h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
        Ember &amp; Vale makes large candles for rooms that feel lived-in, considered, and calm: dinner tables, quiet bedrooms,
        book-lined corners, and evenings that ask you to slow down. Our fragrances are layered, our vessels are substantial,
        and our approach is warm by design.
      </p>
      <div className="mt-16 grid gap-5 md:grid-cols-4">
        {values.map(([title, Icon, copy]) => (
          <article key={title} className="border border-border bg-surface/50 p-5">
            <Icon className="mb-8 h-6 w-6 text-amber" />
            <h2 className="font-display text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
          </article>
        ))}
      </div>
      <div id="care" className="mt-16 border border-border bg-surface/50 p-8">
        <h2 className="font-display text-5xl font-light">Candle care</h2>
        <p className="mt-4 max-w-3xl leading-8 text-muted">
          Trim the wick before every burn, let the wax pool reach the edge on the first light, and stop burning when half an inch of wax remains.
          These small habits keep the scent even, the vessel clean, and the flame steady.
        </p>
      </div>
    </section>
  );
}
