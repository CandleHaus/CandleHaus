"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

export function ProductActions({ product, compact = false }: { product: Product; compact?: boolean }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className={compact ? "flex gap-3" : "space-y-4"}>
      <div className="flex min-h-12 items-center border border-border">
        <button className="grid h-12 w-12 place-items-center" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex-1 text-center">{quantity}</span>
        <button className="grid h-12 w-12 place-items-center" onClick={() => setQuantity(Math.min(12, quantity + 1))}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button className="w-full" variant="solid" onClick={() => addItem(product, quantity)}>
        <span className="inline-flex items-center gap-2"><ShoppingBag className="h-4 w-4" /> Add to Cart</span>
      </Button>
    </div>
  );
}
