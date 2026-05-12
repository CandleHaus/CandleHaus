import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/shop/ProductActions";
import { ProductCard } from "@/components/shop/ProductCard";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { findProduct, products, relatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export const revalidate = 60;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = findProduct(params.slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:px-8">
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={1400}
            height={1600}
            priority
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.slice(0, 4).map((image) => (
              <Image
                key={image}
                src={image}
                alt={`${product.name} detail`}
                width={320}
                height={380}
                className="aspect-[4/5] object-cover"
              />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.3em] text-amber">{product.scentFamily}</p>
          <h1 className="mt-4 font-display fluid-heading font-light">{product.name}</h1>
          <p className="mt-4 font-display text-4xl text-amber">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-8 text-muted">{product.description}</p>
          <div className="my-8 grid grid-cols-3 border-y border-border py-5 text-center text-sm">
            <div>
              <p className="text-amber">{product.burnTime}+ hrs</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Burn</p>
            </div>
            <div className="border-x border-border">
              <p className="text-amber">{product.weightOz} oz</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Weight</p>
            </div>
            <div>
              <p className="capitalize text-amber">{product.waxType}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Wax</p>
            </div>
          </div>
          <ProductActions product={product} />
          <Button href="/account/login" variant="ghost" className="mt-3 w-full">
            <span className="inline-flex items-center gap-2"><Heart className="h-4 w-4" /> Add to Wishlist</span>
          </Button>

          <div className="mt-10 grid gap-4">
            {[
              ["Ingredients", "Coconut-soy wax blend, fine fragrance oils, cotton or wood wick, reusable glass vessel."],
              ["Care Instructions", "Trim wick to 1/4 inch before each burn. Let the first melt pool reach the edge of the vessel."],
              ["Shipping Info", "Standard shipping is free over $75. Express options are available at checkout."]
            ].map(([title, copy]) => (
              <details key={title} className="border border-border bg-surface/50 p-4" open={title === "Ingredients"}>
                <summary className="cursor-pointer text-sm uppercase tracking-[0.2em] text-amber">{title}</summary>
                <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <Notes title="Top Notes" notes={product.topNotes} />
          <Notes title="Heart Notes" notes={product.heartNotes} />
          <Notes title="Base Notes" notes={product.baseNotes} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber">Reviews</p>
            <h2 className="font-display text-5xl font-light">Loved in low light.</h2>
          </div>
          <Button href="/account/login" variant="ghost">Write a Review</Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {["Elegant throw", "Burns beautifully", "A signature scent"].map((title) => (
            <article key={title} className="border border-border bg-surface/50 p-5">
              <div className="mb-4 flex text-amber">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">The fragrance opens slowly and makes the whole room feel considered.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-display text-5xl font-light">Related candles</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 p-3 backdrop-blur lg:hidden">
        <ProductActions product={product} compact />
      </div>
    </PageShell>
  );
}

function Notes({ title, notes }: { title: string; notes: string[] }) {
  return (
    <div className="border border-border bg-surface/50 p-6">
      <h2 className="text-xs uppercase tracking-[0.28em] text-amber">{title}</h2>
      <p className="mt-4 font-display text-3xl">{notes.join(" / ")}</p>
    </div>
  );
}
