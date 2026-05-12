"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { scentFamilies } from "@/lib/catalog";

const sizes = ["small", "medium", "large"];
const waxes = ["soy", "coconut", "beeswax", "blend"];

export function FilterSidebar() {
  const params = useSearchParams();
  const router = useRouter();

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`/shop?${next.toString()}`);
  }

  return (
    <aside className="space-y-8 border border-border bg-surface/50 p-5 lg:sticky lg:top-28">
      <FilterGroup title="Scent Family" items={scentFamilies.map((item) => item.key)} active={params.get("scentFamily")} onSelect={(value) => setFilter("scentFamily", value)} />
      <FilterGroup title="Size" items={sizes} active={params.get("size")} onSelect={(value) => setFilter("size", value)} />
      <FilterGroup title="Wax" items={waxes} active={params.get("waxType")} onSelect={(value) => setFilter("waxType", value)} />
      <select
        className="min-h-11 w-full border border-border bg-bg px-3 text-sm text-cream"
        value={params.get("sort") ?? "featured"}
        onChange={(event) => setFilter("sort", event.target.value)}
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price Low-High</option>
        <option value="price-desc">Price High-Low</option>
        <option value="best">Best Selling</option>
      </select>
    </aside>
  );
}

function FilterGroup({
  title,
  items,
  active,
  onSelect
}: {
  title: string;
  items: readonly string[];
  active: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs uppercase tracking-[0.22em] text-amber">{title}</h3>
      <div className="flex flex-wrap gap-2 lg:grid">
        {items.map((item) => (
          <button
            key={item}
            className={`border px-3 py-2 text-left text-sm capitalize transition ${
              active === item ? "border-amber text-cream" : "border-border text-muted hover:border-amber"
            }`}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
