export type ScentFamily = "beach rose" | "christmas warmth" | "ocean water" | "sea salt + orchid" | "unscented" | "white sage and lavender";
export type CandleSize = "14oz";
export type WaxType = "soy";
export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  scentFamily: ScentFamily;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  burnTime: number;
  weightOz: number;
  waxType: WaxType;
  wickType: string;
  size: CandleSize;
  stock: number;
  featured: boolean;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  scentFamily: string;
  image: string;
  price: number;
  quantity: number;
  printifyProductId?: string;
  variantId?: number;
};

export type Review = {
  id: string;
  rating: number;
  title: string;
  body: string;
  user: { name: string | null };
  createdAt: string;
};
