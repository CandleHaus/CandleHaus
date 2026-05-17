"use client";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

const SCENTS = [
  { id: "5832", name: "Beach Rose" },
  { id: "4705", name: "Christmas Warmth" },
  { id: "5510", name: "Ocean Water" },
  { id: "3519", name: "Sea Salt + Orchid" },
  { id: "4657", name: "Unscented" },
  { id: "3517", name: "White Sage and Lavender" },
];

const COLORS = [
  { id: "7254", name: "True Noir (Matte)", hex: "#141414" },
  { id: "7256", name: "Peachy Nude", hex: "#f3c79c" },
  { id: "7255", name: "Burnt Amber (Frosted)", hex: "#591900" },
  { id: "7260", name: "Vineyard Olive", hex: "#3a4200" },
  { id: "7257", name: "Opal Iris", hex: "#f7fdfd" },
  { id: "7258", name: "Deep Pacific", hex: "#013f57" },
  { id: "7259", name: "Cranberry Glow", hex: "#7a0013" },
];

const COLOR_IMAGES: Record<string, string> = {
  "7254": "https://images-api.printify.com/mockup/6a04e5d4963577f6d9076bd1/147809/124255/ember-vale-14oz-scented-soy-candle.jpg?camera_label=front",
  "7256": "https://images-api.printify.com/mockup/6a04e5d4963577f6d9076bd1/147808/124255/ember-vale-14oz-scented-soy-candle.jpg?camera_label=front",
  "7255": "https://images-api.printify.com/mockup/6a04e5d4963577f6d9076bd1/147804/124255/ember-vale-14oz-scented-soy-candle.jpg?camera_label=front",
  "7260": "https://images-api.printify.com/mockup/6a04e5d4963577f6d9076bd1/147810/124255/ember-vale-14oz-scented-soy-candle.jpg?camera_label=front",
  "7257": "https://images-api.printify.com/mockup/6a04e5d4963577f6d9076bd1/147807/124255/ember-vale-14oz-scented-soy-candle.jpg?camera_label=front",
  "7258": "https://images-api.printify.com/mockup/6a04e5d4963577f6d9076bd1/147806/124255/ember-vale-14oz-scented-soy-candle.jpg?camera_label=front",
  "7259": "https://images-api.printify.com/mockup/6a04e5d4963577f6d9076bd1/147805/124255/ember-vale-14oz-scented-soy-candle.jpg?camera_label=front",
};

const VARIANT_MAP: Record<string, number> = {
  "7257_3517": 147773,   "7255_5832": 147804,   "7258_5832": 147805,
  "7257_5832": 147806,   "7259_5832": 147807,   "7256_5832": 147808,
  "7254_5832": 147809,   "7260_5832": 147810,   "7255_4705": 147811,
  "7258_4705": 147812,   "7257_4705": 147813,   "7259_4705": 147814,
  "7256_4705": 147815,   "7254_4705": 147816,   "7260_4705": 147817,
  "7255_5510": 147818,   "7258_5510": 147819,   "7257_5510": 147820,
  "7259_5510": 147821,   "7256_5510": 147822,   "7254_5510": 147823,
  "7260_5510": 147824,   "7255_3519": 147825,   "7258_3519": 147826,
  "7257_3519": 147827,   "7259_3519": 147828,   "7256_3519": 147829,
  "7254_3519": 147830,   "7260_3519": 147831,   "7255_4657": 147832,
  "7258_4657": 147833,   "7257_4657": 147834,   "7259_4657": 147835,
  "7256_4657": 147836,   "7254_4657": 147837,   "7260_4657": 147838,
  "7255_3517": 147839,   "7258_3517": 147840,   "7259_3517": 147841,
  "7256_3517": 147842,   "7254_3517": 147843,   "7260_3517": 147844,
};

export function ProductActions({
  product,
  compact = false,
  outOfStockColorIds = new Set(),
}: {
  product: Product;
  compact?: boolean;
  outOfStockColorIds?: Set<string>;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedScent, setSelectedScent] = useState(SCENTS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const addItem = useCartStore((state) => state.addItem);

  const variantKey = `${selectedColor.id}_${selectedScent.id}`;
  const variantId = VARIANT_MAP[variantKey];
  const selectedImage = COLOR_IMAGES[selectedColor.id] ?? product.images?.[0];

  return (
    <div className={compact ? "flex gap-3" : "space-y-5"}>
      {!compact && (
        <>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-amber">
              Select Color — <span className="text-muted normal-case">{selectedColor.name}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((color) => (
                <div key={color.id} className="relative">
                  <button
                    onClick={() => {
                      if (!outOfStockColorIds.has(color.id)) setSelectedColor(color);
                    }}
                    title={outOfStockColorIds.has(color.id) ? `${color.name} — Out of stock` : color.name}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      outOfStockColorIds.has(color.id)
                        ? "opacity-40 cursor-not-allowed"
                        : selectedColor.id === color.id
                        ? "border-amber scale-110"
                        : "border-border hover:border-amber/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  {outOfStockColorIds.has(color.id) && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-px bg-white/70 rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-amber">Select Scent</p>
            <div className="grid grid-cols-2 gap-2">
              {SCENTS.map((scent) => (
                <button
                  key={scent.id}
                  onClick={() => setSelectedScent(scent)}
                  className={`border px-3 py-2 text-left text-sm transition ${
                    selectedScent.id === scent.id
                      ? "border-amber text-cream"
                      : "border-border text-muted hover:border-amber/50"
                  }`}
                >
                  {scent.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex min-h-12 items-center border border-border">
        <button className="grid h-12 w-12 place-items-center" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex-1 text-center">{quantity}</span>
        <button className="grid h-12 w-12 place-items-center" onClick={() => setQuantity(Math.min(12, quantity + 1))}>
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Button
        className="w-full"
        variant="solid"
        onClick={() => addItem({
          ...product,
          name: `${product.name} — ${selectedScent.name} / ${selectedColor.name}`,
          image: selectedImage,
          variantId,
          printifyProductId: (product as any).printifyProductId,
        } as any, quantity)}
      >
        <span className="inline-flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </span>
      </Button>
    </div>
  );
}
export function ProductImageGallery({
  colorImages,
  productName,
}: {
  colorImages: Record<string, string>;
  productName: string;
}) {
  const [selectedImage, setSelectedImage] = useState(Object.values(colorImages)[0]);

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          priority
          className="object-cover transition-opacity duration-300"
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {Object.values(colorImages).map((src) => (
          <button key={src} onClick={() => setSelectedImage(src)} className={`relative aspect-[4/5] overflow-hidden border-2 transition ${selectedImage === src ? "border-amber" : "border-transparent"}`}>
            <Image src={src} alt={productName} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
