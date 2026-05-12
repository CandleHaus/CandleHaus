"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types";

export function ProductGrid({ products }: { products: Product[] }) {
  const [visible, setVisible] = useState(6);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisible(6);
  }, [products]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisible((current) => Math.min(products.length, current + 6));
      }
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [products.length]);

  if (!products.length) {
    return (
      <div className="grid min-h-[360px] place-items-center border border-border bg-surface/50 p-8 text-center">
        <div>
          <p className="font-display text-4xl">No candles found.</p>
          <p className="mt-3 text-muted">Try clearing a filter or opening the scent family a little wider.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.slice(0, visible).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div ref={sentinelRef} className="h-8 md:col-span-2 xl:col-span-3" />
    </div>
  );
}
