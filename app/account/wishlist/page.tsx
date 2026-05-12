import { ProductGrid } from "@/components/shop/ProductGrid";
import { products } from "@/lib/catalog";

export default function WishlistPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display fluid-heading font-light">Wishlist</h1>
      <p className="mt-4 text-muted">Saved candles for the rooms you are still imagining.</p>
      <div className="mt-10"><ProductGrid products={products.slice(0, 3)} /></div>
    </section>
  );
}
