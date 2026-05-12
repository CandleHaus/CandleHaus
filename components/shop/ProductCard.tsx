"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group border border-border bg-surface/60 transition duration-300 hover:border-amber/70 hover:shadow-glow">
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={900}
          height={1100}
          className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <Link href={`/shop/${product.slug}`} className="font-display text-3xl font-light">
              {product.name}
            </Link>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
              {product.topNotes.slice(0, 2).join(" / ")}
            </p>
          </div>
          <p className="font-medium text-amber">{formatPrice(product.price)}</p>
        </div>
        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-muted">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-muted">
            {product.weightOz} oz / {product.burnTime}+ hrs
          </span>
          <Button className="px-3 py-2" onClick={() => addItem(product)}>
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Add
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
}
