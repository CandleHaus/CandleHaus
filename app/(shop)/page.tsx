import Image from &quot;next/image&quot;;
import Link from &quot;next/link&quot;;
import { ArrowRight, Flame, Sparkles, Stars } from &quot;lucide-react&quot;;
import { PageShell } from &quot;@/components/layout/PageShell&quot;;
import { ProductCard } from &quot;@/components/shop/ProductCard&quot;;
import { Button } from &quot;@/components/ui/Button&quot;;
import { SectionHeading } from &quot;@/components/ui/SectionHeading&quot;;
import { products, reviews, scentFamilies } from &quot;@/lib/catalog&quot;;

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <PageShell>
      <section className=&quot;relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden px-4 pb-12 sm:px-6 lg:px-8&quot;>
        <Image
          src=&quot;https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=2200&q=85&quot;
          alt=&quot;Luxury candle in a dark moody room&quot;
          fill
          priority
          className=&quot;-z-10 object-cover opacity-55&quot;
        />
        <div className=&quot;absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/55 to-bg/20&quot; />
        <div className=&quot;mx-auto w-full max-w-7xl&quot;>
          <p className=&quot;mb-5 text-xs uppercase tracking-[0.35em] text-amber&quot;>Small batch / Large format</p>
          <h1 className=&quot;max-w-5xl font-display fluid-display font-light&quot;>Light Changes Everything.</h1>
          <p className=&quot;mt-6 max-w-2xl fluid-subhead text-cream/85&quot;>
            Premium candles poured for deep rooms, slow evenings, and fragrance that lingers like a remembered song.
          </p>
          <div className=&quot;mt-8 flex flex-col gap-3 sm:flex-row&quot;>
            <Button href=&quot;/shop&quot; variant=&quot;solid&quot;>Shop Now</Button>
            <Button href=&quot;/about&quot;>Our Story</Button>
          </div>
        </div>
      </section>

      <div className=&quot;overflow-hidden border-y border-border bg-surface py-4 text-amber&quot;>
        <div className=&quot;animate-[marquee_24s_linear_infinite] whitespace-nowrap text-sm uppercase tracking-[0.32em]&quot;>
          Free shipping over $75 / Hand-poured / Small batch / Premium fragrance / Burns 80+ hours / Free shipping over $75 / Hand-poured /
        </div>
      </div>

      <section className=&quot;mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8&quot;>
        <SectionHeading
          eyebrow=&quot;Bestsellers&quot;
          title=&quot;Candles with a devoted following.&quot;
          copy=&quot;Each vessel is poured slowly, cured patiently, and built for a clean, atmospheric burn.&quot;
        />
        <div className=&quot;mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4&quot;>
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className=&quot;border-y border-border bg-surface/50&quot;>
        <div className=&quot;mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8&quot;>
          <div className=&quot;self-center&quot;>
            <p className=&quot;mb-4 text-xs uppercase tracking-[0.3em] text-amber&quot;>Our Ethos</p>
            <h2 className=&quot;font-display fluid-heading font-light&quot;>Poured for rooms with memory.</h2>
            <p className=&quot;mt-6 max-w-xl leading-8 text-muted&quot;>
              GlowDrop began with the belief that fragrance should feel architectural. We blend waxes for steady heat,
              build fragrances in layered notes, and pour each candle in small batches so every vessel feels deliberate.
              The result is warm luxury with a darker edge: elegant, sensory, and quietly dramatic.
            </p>
          </div>
          <Image
            src=&quot;https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1400&q=85&quot;
            alt=&quot;A candlelit interior detail&quot;
            width={1200}
            height={1400}
            className=&quot;aspect-[4/5] w-full object-cover&quot;
          />
        </div>
      </section>

      <section className=&quot;px-4 py-24 sm:px-6 lg:px-8&quot;>
        <div className=&quot;mx-auto max-w-7xl&quot;>
          <SectionHeading eyebrow=&quot;Scent Families&quot; title=&quot;Follow the note that finds you.&quot; />
          <div className=&quot;hide-scrollbar mt-10 flex gap-4 overflow-x-auto pb-4&quot;>
            {scentFamilies.map((family) => (
              <Link
                key={family.key}
                href={`/shop?scentFamily=${family.key}`}
                className=&quot;min-w-[230px] border border-border bg-surface p-6 transition hover:border-amber hover:shadow-glow&quot;
                style={{ background: `linear-gradient(160deg, ${family.accent}33, #1A1410 54%)` }}
              >
                <Sparkles className=&quot;mb-10 h-6 w-6 text-amber&quot; />
                <p className=&quot;font-display text-4xl&quot;>{family.label}</p>
                <p className=&quot;mt-2 text-sm uppercase tracking-[0.2em] text-muted&quot;>{family.icon}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className=&quot;mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8&quot;>
        <div className=&quot;grid gap-5 md:grid-cols-3&quot;>
          {reviews.map((review) => (
            <blockquote key={review.name} className=&quot;border border-border bg-surface/60 p-6&quot;>
              <div className=&quot;mb-5 flex gap-1 text-amber&quot;>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Stars key={index} className=&quot;h-4 w-4 fill-current&quot; />
                ))}
              </div>
              <p className=&quot;font-display text-2xl leading-8&quot;>&quot;{review.quote}&quot;</p>
              <cite className=&quot;mt-5 block text-xs not-italic uppercase tracking-[0.22em] text-muted&quot;>{review.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className=&quot;border-y border-border bg-amber-radial px-4 py-20 text-center sm:px-6 lg:px-8&quot;>
        <Flame className=&quot;mx-auto mb-6 h-8 w-8 text-amber&quot; />
        <h2 className=&quot;font-display fluid-heading font-light&quot;>Join the Inner Circle.</h2>
        <p className=&quot;mx-auto mt-4 max-w-xl text-muted&quot;>Get 10% off your first order and notes from the studio.</p>
        <form className=&quot;mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row&quot; action=&quot;/api/email/subscribe&quot; method=&quot;post&quot;>
          <input
            required
            type=&quot;email&quot;
            name=&quot;email&quot;
            placeholder=&quot;you@example.com&quot;
            className=&quot;min-h-12 flex-1 border border-border bg-bg px-4 text-cream outline-none focus:border-amber&quot;
          />
          <Button type=&quot;submit&quot;>
            <span className=&quot;inline-flex items-center gap-2&quot;>Subscribe <ArrowRight className=&quot;h-4 w-4&quot; /></span>
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
