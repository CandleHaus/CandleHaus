import type { ReactNode } from "react";

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Ember &amp; Vale Admin</p>
      <h1 className="font-display fluid-heading font-light">{title}</h1>
      <nav className="my-8 flex flex-wrap gap-3 text-sm">
        {["products", "orders", "promo-codes", "blog"].map((item) => (
          <a key={item} href={`/admin/${item}`} className="border border-border px-4 py-2 text-muted hover:border-amber hover:text-cream">
            {item}
          </a>
        ))}
      </nav>
      {children}
    </section>
  );
}
