"use client";

import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/account/dashboard", label: "Account" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { openCart, items } = useCartStore();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6 text-cream" />
        </button>
        <Link href="/" className="font-display text-3xl font-light text-cream">
          Ember &amp; Vale
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.22em] text-muted transition hover:text-amber"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden text-muted transition hover:text-amber sm:block">
            <Search className="h-5 w-5" />
          </button>
          <Link aria-label="Account" href="/account/dashboard" className="hidden text-muted hover:text-amber sm:block">
            <UserRound className="h-5 w-5" />
          </Link>
          <button aria-label="Open cart" className="relative text-muted transition hover:text-amber" onClick={openCart}>
            <ShoppingBag className="h-5 w-5" />
            {count ? (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-amber text-[10px] font-bold text-cream">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[80] bg-bg/95 lg:hidden">
          <div className="flex h-20 items-center justify-between border-b border-border px-4">
            <Link href="/" className="font-display text-3xl font-light" onClick={() => setOpen(false)}>
              Ember &amp; Vale
            </Link>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="grid gap-2 p-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-5 font-display text-4xl"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
