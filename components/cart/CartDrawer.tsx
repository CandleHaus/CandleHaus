"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button className="absolute inset-0 bg-bg/75" aria-label="Close cart" onClick={closeCart} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-glow">
        <div className="flex h-20 items-center justify-between border-b border-border px-5">
          <h2 className="font-display text-3xl font-light">Cart</h2>
          <button aria-label="Close cart" onClick={closeCart}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length ? (
            <div className="grid gap-5">
              {items.map((item) => (
                <div key={item.productId} className="grid grid-cols-[92px_1fr] gap-4 border-b border-border pb-5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={184}
                    height={184}
                    className="aspect-square object-cover"
                  />
                  <div>
                    <Link href={`/shop/${item.slug}`} className="font-display text-2xl" onClick={closeCart}>
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{item.scentFamily}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button className="p-2" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button className="p-2" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button className="text-muted hover:text-amber" onClick={() => removeItem(item.productId)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-3 text-sm font-medium text-amber">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border border-border text-3xl">
                  *
                </div>
                <h3 className="font-display text-3xl">The cart is quiet.</h3>
                <p className="mt-2 text-muted">Add a candle and let the room warm up.</p>
                <Button className="mt-6" href="/shop">
                  Shop Now
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm uppercase tracking-[0.2em] text-muted">Subtotal</span>
            <span className="font-display text-3xl text-amber">{formatPrice(subtotal)}</span>
          </div>
          <Button href="/checkout" className="w-full" variant="solid">
            Proceed to Checkout
          </Button>
          <Link
            href="/cart"
            className="mt-4 block text-center text-xs uppercase tracking-[0.2em] text-muted hover:text-amber"
            onClick={closeCart}
          >
            View Cart
          </Link>
        </div>
      </aside>
    </div>
  );
}
