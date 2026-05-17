"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import type { CartItem, Product } from "@/types";
import { clampQuantity } from "@/lib/utils";

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);
          toast.success("Added to cart");
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
                  : item
              )
            };
          }
          return {
            isOpen: true,
            items: [
              ...state.items,
              {
                productId: product.id,
slug: product.slug,
name: product.name,
scentFamily: product.scentFamily,
image: (product as any).image ?? product.images?.[0],
price: product.price,
quantity: clampQuantity(quantity),
printifyProductId: (product as any).printifyProductId,
variantId: (product as any).variantId,
              }
            ]
          };
        }),
      removeItem: (productId) =>
        set((state) => {
          toast("Item removed");
          return { items: state.items.filter((item) => item.productId !== productId) };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: clampQuantity(quantity) } : item
          )
        })),
      clearCart: () => set({ items: [] })
    }),
    { name: "ember-and-vale-cart" }
  )
);
