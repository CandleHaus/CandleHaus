import type { Product } from "@/types";

const baseImage =
  "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85";
const darkImage =
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85";
const amberImage =
  "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1200&q=85";
const bathImage =
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85";

export const products: Product[] = [
  {
    id: "p1",
    name: "Velvet Ember",
    slug: "velvet-ember",
    description:
      "A slow-burning amber candle with smoked vanilla, cedar, and saffron. Made for late dinners, dim rooms, and the hour when conversation softens.",
    price: 68,
    comparePrice: 78,
    images: [darkImage, amberImage, baseImage, bathImage],
    scentFamily: "woody",
    topNotes: ["Saffron", "Black Pepper", "Orange Peel"],
    heartNotes: ["Cedar", "Suede", "Warm Resin"],
    baseNotes: ["Amber", "Smoked Vanilla", "Sandalwood"],
    burnTime: 86,
    weightOz: 18,
    waxType: "blend",
    wickType: "double cotton wick",
    size: "large",
    stock: 34,
    featured: true,
    createdAt: "2026-01-08"
  },
  {
    id: "p2",
    name: "Midnight Fig",
    slug: "midnight-fig",
    description:
      "Ripe fig, violet leaf, and dark tonka create a lush room scent with a polished, green edge.",
    price: 58,
    images: [baseImage, darkImage, amberImage],
    scentFamily: "gourmand",
    topNotes: ["Fig Leaf", "Bergamot", "Pink Pepper"],
    heartNotes: ["Black Fig", "Violet", "Cassis"],
    baseNotes: ["Tonka", "Brown Sugar", "Cedarwood"],
    burnTime: 72,
    weightOz: 14,
    waxType: "coconut",
    wickType: "single cotton wick",
    size: "medium",
    stock: 22,
    featured: true,
    createdAt: "2026-02-11"
  },
  {
    id: "p3",
    name: "Rose & Smoke",
    slug: "rose-and-smoke",
    description:
      "Petals, incense, and charred birch. Romantic without sweetness, dramatic without heaviness.",
    price: 64,
    images: [amberImage, baseImage, darkImage],
    scentFamily: "floral",
    topNotes: ["Damask Rose", "Clove Bud", "Lemon Zest"],
    heartNotes: ["Incense", "Geranium", "Black Tea"],
    baseNotes: ["Birch Tar", "Patchouli", "Musk"],
    burnTime: 80,
    weightOz: 16,
    waxType: "soy",
    wickType: "wood wick",
    size: "large",
    stock: 18,
    featured: true,
    createdAt: "2026-03-02"
  },
  {
    id: "p4",
    name: "Salted Neroli",
    slug: "salted-neroli",
    description:
      "Fresh neroli, sea salt, and clean musk for an open-window brightness that still feels expensive.",
    price: 44,
    images: [bathImage, baseImage, amberImage],
    scentFamily: "fresh",
    topNotes: ["Neroli", "Sea Salt", "Mandarin"],
    heartNotes: ["Orange Blossom", "Herbal Mint", "White Tea"],
    baseNotes: ["Clean Musk", "Driftwood", "Soft Amber"],
    burnTime: 54,
    weightOz: 10,
    waxType: "soy",
    wickType: "single cotton wick",
    size: "small",
    stock: 42,
    featured: true,
    createdAt: "2026-03-18"
  },
  {
    id: "p5",
    name: "Cardamom Hearth",
    slug: "cardamom-hearth",
    description:
      "Crushed cardamom, polished woods, and a ribbon of cream. Quietly spiced and deeply comforting.",
    price: 52,
    images: [darkImage, baseImage],
    scentFamily: "spiced",
    topNotes: ["Cardamom", "Ginger", "Bitter Orange"],
    heartNotes: ["Cashmere Wood", "Nutmeg", "Orris"],
    baseNotes: ["Cream", "Amber", "Oak"],
    burnTime: 64,
    weightOz: 13,
    waxType: "blend",
    wickType: "single cotton wick",
    size: "medium",
    stock: 25,
    featured: false,
    createdAt: "2026-04-02"
  },
  {
    id: "p6",
    name: "Oakmoss Library",
    slug: "oakmoss-library",
    description:
      "A candle for old books, rain-dark windows, leather chairs, and the first page of a very good secret.",
    price: 78,
    images: [baseImage, darkImage],
    scentFamily: "woody",
    topNotes: ["Bay Leaf", "Juniper", "Citrus Peel"],
    heartNotes: ["Oakmoss", "Leather", "Iris"],
    baseNotes: ["Vetiver", "Cedar", "Labdanum"],
    burnTime: 92,
    weightOz: 20,
    waxType: "beeswax",
    wickType: "double cotton wick",
    size: "large",
    stock: 12,
    featured: false,
    createdAt: "2026-04-11"
  },
  {
    id: "p7",
    name: "White Tea Moon",
    slug: "white-tea-moon",
    description:
      "Airy white tea, pear skin, and pale woods. A graceful fresh candle for mornings and clean sheets.",
    price: 38,
    images: [bathImage, amberImage],
    scentFamily: "fresh",
    topNotes: ["Pear Skin", "Bergamot", "Lemon Verbena"],
    heartNotes: ["White Tea", "Jasmine Water", "Green Fig"],
    baseNotes: ["Pale Wood", "Musk", "Rice Milk"],
    burnTime: 46,
    weightOz: 8,
    waxType: "coconut",
    wickType: "single cotton wick",
    size: "small",
    stock: 48,
    featured: false,
    createdAt: "2026-04-19"
  },
  {
    id: "p8",
    name: "Black Cherry Veil",
    slug: "black-cherry-veil",
    description:
      "A plush gourmand with black cherry, almond, and smoky woods, balanced so it never turns syrupy.",
    price: 62,
    images: [amberImage, darkImage],
    scentFamily: "gourmand",
    topNotes: ["Black Cherry", "Almond", "Pink Pepper"],
    heartNotes: ["Heliotrope", "Cocoa Husk", "Rose"],
    baseNotes: ["Sandalwood", "Tonka", "Smoke"],
    burnTime: 78,
    weightOz: 16,
    waxType: "soy",
    wickType: "wood wick",
    size: "large",
    stock: 16,
    featured: false,
    createdAt: "2026-04-26"
  }
];

export const scentFamilies = [
  { key: "woody", label: "Woody", accent: "#8A5C34", icon: "Cedar" },
  { key: "floral", label: "Floral", accent: "#A75D70", icon: "Rose" },
  { key: "fresh", label: "Fresh", accent: "#638B7A", icon: "Mist" },
  { key: "spiced", label: "Spiced", accent: "#B0733C", icon: "Clove" },
  { key: "gourmand", label: "Gourmand", accent: "#8B5E4A", icon: "Vanilla" }
] as const;

export const reviews = [
  {
    name: "Mara V.",
    quote: "Velvet Ember makes my apartment feel like a boutique hotel after dark.",
    rating: 5
  },
  {
    name: "Simone K.",
    quote: "The throw is beautiful and the vessel looks expensive on the table.",
    rating: 5
  },
  {
    name: "Ari T.",
    quote: "Finally, a floral candle that feels moody instead of powdery.",
    rating: 5
  }
];

export const blogPosts = [
  {
    title: "How to Build a Candle Ritual",
    slug: "how-to-build-a-candle-ritual",
    excerpt: "A simple guide to matching scent, light, and room energy.",
    category: "Ritual",
    readTime: 4,
    date: "May 2, 2026",
    content:
      "A candle ritual begins before the match. Choose one room, clear one surface, and let the scent be specific to the hour. Fresh notes suit morning, woods suit evening, and spiced blends make transitional weather feel intentional."
  },
  {
    title: "Why Wax Blends Matter",
    slug: "why-wax-blends-matter",
    excerpt: "A transparent look at soy, coconut, beeswax, and burn performance.",
    category: "Ingredients",
    readTime: 5,
    date: "April 18, 2026",
    content:
      "Wax is the quiet architecture of a candle. Soy brings a clean burn, coconut improves scent diffusion, and beeswax lends structure. A careful blend lets fragrance unfold slowly instead of arriving all at once."
  }
];

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function relatedProducts(product: Product) {
  return products
    .filter((item) => item.scentFamily === product.scentFamily && item.id !== product.id)
    .slice(0, 3);
}
