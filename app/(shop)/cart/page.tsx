"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display fluid-heading font-light">Your cart</h1>
      {items.length ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5">
            {items.map((item) => (
              <div key={item.productId} className="grid gap-4 border border-border bg-surface/50 p-4 sm:grid-cols-[120px_1fr_auto]">
                <Image src={item.image} alt={item.name} width={240} height={240} className="aspect-square object-cover" />
                <div>
                  <Link href={`/shop/${item.slug}`} className="font-display text-3xl">{item.name}</Link>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{item.scentFamily}</p>
                  <select
                    className="mt-5 border border-border bg-bg px-3 py-2"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.productId, Number(event.target.value))}
                  >
                    {Array.from({ length: 12 }).map((_, index) => (
                      <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-start justify-between gap-6 sm:block sm:text-right">
                  <p className="text-amber">{formatPrice(item.price * item.quantity)}</p>
                  <button className="mt-5 text-muted hover:text-amber" onClick={() => removeItem(item.productId)}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit border border-border bg-surface/60 p-5">
            <h2 className="font-display text-3xl">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <Line label="Subtotal" value={formatPrice(subtotal)} />
              <Line label="Estimated shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <div className="pt-3"><Input label="Promo code" placeholder="WELCOME10" /></div>
              <div className="border-t border-border pt-4"><Line label="Total" value={formatPrice(total)} strong /></div>
            </div>
            <Button href="/checkout" className="mt-6 w-full" variant="solid">Proceed to Checkout</Button>
            <Link href="/shop" className="mt-4 block text-center text-xs uppercase tracking-[0.2em] text-muted hover:text-amber">Continue Shopping</Link>
          </aside>
        </div>
      ) : (
        <div className="mt-12 grid min-h-[420px] place-items-center border border-border bg-surface/50 text-center">
          <div>
            <p className="font-display text-5xl">Nothing glowing yet.</p>
            <p className="mt-3 text-muted">Find a candle that makes the room feel finished.</p>
            <Button href="/shop" className="mt-7">Shop Candles</Button>
          </div>
        </div>
      )}
    </section>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "font-display text-3xl text-amber" : "text-muted"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
