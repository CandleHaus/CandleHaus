import { Instagram, Music2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="font-display text-4xl font-light">
            Ember &amp; Vale
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Calm, luxurious candles poured for welcoming rooms and everyday rituals.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.24em] text-amber">Explore</h3>
          <div className="grid gap-3 text-sm text-muted">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/journal">Journal</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.24em] text-amber">Care</h3>
          <div className="grid gap-3 text-sm text-muted">
            <Link href="/about#care">Candle Care</Link>
            <Link href="/cart">Shipping</Link>
            <Link href="/account/profile">Profile</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.24em] text-amber">Social</h3>
          <div className="flex gap-4 text-muted">
            <Instagram className="h-5 w-5" />
            <Music2 className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 text-center text-xs uppercase tracking-[0.2em] text-muted">
        (c) {new Date().getFullYear()} Ember &amp; Vale. Privacy / Terms
      </div>
    </footer>
  );
}
