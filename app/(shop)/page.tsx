import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Stars } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews, scentFamilies } from "@/lib/catalog";
import { getStoreProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getStoreProducts();
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <PageShell>
      <section className="relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden px-4 pb-12 sm:px-6 lg:px-8">
        <Image
          src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=2200&q=85"
          alt="A calm luxury candle arrangement in warm neutral tones"
          fill
          priority
          className="-z-10 object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/70 to-bg/35" />
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-2 text-xs uppercase tracking-[0.26em] text-amber">Welcoming luxury / hand poured candles</p>
          <h1 className="max-w-5xl font-display fluid-display font-light">A Softer Way to Come Home.</h1>
          <p className="mt-5 max-w-2xl fluid-subhead text-muted">
            Ember &amp; Vale creates calm, beautiful candles for warm rooms, quiet rituals, and homes that feel thoughtfully lived in.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop" variant="solid">
              Shop Now
            </Button>
            <Button href="/about">Our Story</Button>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-surface py-4 text-amber">
        <div className="animate-[marquee_24s_linear_infinite] whitespace-nowrap text-sm uppercase tracking-[0.32em]">
          Free shipping over $75 / Hand-poured / Small batch / Premium fragrance / Burns 80+ hours / Free shipping
          over $75 / Hand-poured /
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Candles with a warm sense of place."
          copy="Each Ember & Vale candle is selected for calm rooms, earthy notes, and an elevated everyday ritual."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="self-center">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Our Ethos</p>
            <h2 className="font-display fluid-heading font-light">Poured for rooms with memory.</h2>
            <p className="mt-6 max-w-xl leading-8 text-muted">
              Ember &amp; Vale began with the belief that fragrance should feel architectural. We blend waxes for steady heat,
              build fragrances in layered notes, and pour each candle in small batches so every vessel feels deliberate.
              The result is welcoming luxury with a calm, polished presence: elegant, sensory, and easy to live with.
            </p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1400&q=85"
            alt="A candlelit interior detail"
            width={1200}
            height={1400}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Scent Families" title="Follow the note that finds you." />
          <div className="hide-scrollbar mt-10 flex gap-4 overflow-x-auto pb-4">
            {scentFamilies.map((family) => (
              <Link
                key={family.key}
                href={`/shop?scentFamily=${family.key}`}
                className="min-w-[230px] border border-border bg-surface p-6 transition hover:border-amber hover:shadow-glow"
                style={{ background: `linear-gradient(160deg, ${family.accent}24, #fff8ed 58%)` }}
              >
                <Sparkles className="mb-10 h-6 w-6 text-amber" />
                <p className="font-display text-4xl">{family.label}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">{family.icon}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.name} className="border border-border bg-surface/60 p-6">
              <div className="mb-5 flex gap-1 text-amber">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Stars key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-display text-2xl leading-8">
                "{review.quote}"
              </p>
              <cite className="mt-5 block text-xs not-italic uppercase tracking-[0.22em] text-muted">
                {review.name}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-amber-radial px-4 py-20 text-center sm:px-6 lg:px-8">
        <Flame className="mx-auto mb-6 h-8 w-8 text-amber" />
        <h2 className="font-display fluid-heading font-light">Join the Inner Circle.</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">Get 10% off your first order and notes from the studio.</p>
        <form
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          action="/api/email/subscribe"
          method="post"
        >
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className="min-h-12 flex-1 border border-border bg-bg px-4 text-cream outline-none focus:border-amber"
          />
          <Button type="submit">
            <span className="inline-flex items-center gap-2">
              Subscribe <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
