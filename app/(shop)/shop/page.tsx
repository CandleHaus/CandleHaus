import { Suspense } from "react";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { PageShell } from "@/components/layout/PageShell";
import { products } from "@/lib/catalog";

type ShopPageProps = {
  searchParams: {
    scentFamily?: string;
    size?: string;
    waxType?: string;
    sort?: string;
  };
};

export default function ShopPage({ searchParams }: ShopPageProps) {
  let filtered = products.filter((product) => product.stock > 0);

  if (searchParams.scentFamily) filtered = filtered.filter((product) => product.scentFamily === searchParams.scentFamily);
  if (searchParams.size) filtered = filtered.filter((product) => product.size === searchParams.size);
  if (searchParams.waxType) filtered = filtered.filter((product) => product.waxType === searchParams.waxType);

  filtered = [...filtered].sort((a, b) => {
    if (searchParams.sort === "price-asc") return a.price - b.price;
    if (searchParams.sort === "price-desc") return b.price - a.price;
    if (searchParams.sort === "newest") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    return Number(b.featured) - Number(a.featured);
  });

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Shop</p>
          <h1 className="font-display fluid-heading font-light">Large candles for lingering rooms.</h1>
          <p className="mt-5 text-muted">
            Filter by scent, wax, and size to find the mood your room is asking for.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <Suspense fallback={<div className="border border-border p-5 text-muted">Loading filters...</div>}>
            <FilterSidebar />
          </Suspense>
          <ProductGrid products={filtered} />
        </div>
      </section>
    </PageShell>
  );
}
