import { cache } from "react";
import type { Product as CatalogProduct } from "@/types";

const PRINTIFY_API_BASE = "https://api.printify.com/v1";

export type PrintifyImage = {
  src: string;
  variant_ids?: number[];
  position?: string;
};

export type PrintifyVariant = {
  id: number;
  title: string;
  price: number;
  is_enabled: boolean;
  is_available?: boolean;
};

export type PrintifyProduct = {
  id: string;
  title: string;
  description: string;
  images: PrintifyImage[];
  variants: PrintifyVariant[];
  tags?: string[];
  visible?: boolean;
};

export type StoreProduct = CatalogProduct & {
  printifyProductId: string;
  printifyVariantId: number;
  variantTitle: string;
};

type ShopsResponse = Array<{ id: number; title: string }>;
type ProductsResponse = { data?: PrintifyProduct[] } | PrintifyProduct[];

function requirePrintifyKey() {
  const apiKey = process.env.PRINTIFY_API_KEY;
  if (!apiKey) {
    throw new Error("PRINTIFY_API_KEY is not configured");
  }
  return apiKey;
}

async function printifyFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${PRINTIFY_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${requirePrintifyKey()}`,
      "Content-Type": "application/json",
      ...init?.headers
    },
    next: init?.method && init.method !== "GET" ? undefined : { revalidate: 300 }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Printify request failed: ${response.status} ${detail}`);
  }

  return response.json() as Promise<T>;
}

export const getPrintifyShopId = cache(async () => {
  const shops = await printifyFetch<ShopsResponse>("/shops.json");
  const shop = shops[0];
  if (!shop) {
    throw new Error("No Printify shops found for this account");
  }
  return shop.id;
});

export const getPrintifyProducts = cache(async () => {
  const shopId = await getPrintifyShopId();
  const response = await printifyFetch<ProductsResponse>(`/shops/${shopId}/products.json`);
  const products = Array.isArray(response) ? response : response.data ?? [];
  return products.map(normalizePrintifyProduct).filter(Boolean) as StoreProduct[];
});

export async function getPrintifyProductBySlug(slug: string) {
  const products = await getPrintifyProducts();
  return products.find((product) => product.slug === slug || product.id === slug);
}

export async function getPrintifyProductById(productId: string) {
  const products = await getPrintifyProducts();
  return products.find((product) => product.printifyProductId === productId || product.id === productId);
}

export function normalizePrintifyProduct(product: PrintifyProduct): StoreProduct | null {
  const variant =
    product.variants.find((item) => item.is_enabled && item.is_available !== false) ??
    product.variants.find((item) => item.is_enabled) ??
    product.variants[0];

  if (!variant) return null;

  return {
    id: product.id,
    slug: slugify(product.title || product.id),
    name: product.title,
    description: stripHtml(product.description || "A warm, beautifully made candle from Ember & Vale."),
    price: centsToDollars(variant.price),
    images: product.images.map((image) => image.src).filter(Boolean),
    printifyProductId: product.id,
    printifyVariantId: variant.id,
    variantTitle: variant.title,
    scentFamily: inferScentFamily(product),
    topNotes: ["Warm woods", "Soft cream", "Golden amber"],
    heartNotes: ["Cedar", "Vanilla", "Quiet florals"],
    baseNotes: ["Musk", "Sandalwood", "Cashmere"],
    burnTime: 60,
    weightOz: inferWeight(variant.title),
    waxType: "blend",
    wickType: "cotton wick",
    size: inferSize(variant.title),
    stock: variant.is_available === false ? 0 : 100,
    featured: true,
    createdAt: new Date().toISOString()
  };
}

export async function createPrintifyOrder(input: {
  externalId: string;
  label?: string;
  lineItems: Array<{ productId: string; variantId: number; quantity: number }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    country: string;
    region: string;
    address1: string;
    address2?: string;
    city: string;
    zip: string;
  };
}) {
  const shopId = await getPrintifyShopId();

  return printifyFetch(`/shops/${shopId}/orders.json`, {
    method: "POST",
    body: JSON.stringify({
      external_id: input.externalId,
      label: input.label ?? `Ember & Vale order ${input.externalId}`,
      line_items: input.lineItems.map((item) => ({
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity
      })),
      shipping_method: 1,
      send_shipping_notification: true,
      address_to: {
        first_name: input.shippingAddress.firstName,
        last_name: input.shippingAddress.lastName,
        email: input.shippingAddress.email,
        phone: input.shippingAddress.phone ?? "",
        country: input.shippingAddress.country,
        region: input.shippingAddress.region,
        address1: input.shippingAddress.address1,
        address2: input.shippingAddress.address2 ?? "",
        city: input.shippingAddress.city,
        zip: input.shippingAddress.zip
      }
    })
  });
}

function centsToDollars(value: number) {
  return Math.round(value) / 100;
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inferScentFamily(product: PrintifyProduct): CatalogProduct["scentFamily"] {
  const haystack = `${product.title} ${(product.tags ?? []).join(" ")}`.toLowerCase();
  if (haystack.includes("floral") || haystack.includes("rose")) return "floral";
  if (haystack.includes("fresh") || haystack.includes("linen")) return "fresh";
  if (haystack.includes("spice") || haystack.includes("cinnamon")) return "spiced";
  if (haystack.includes("vanilla") || haystack.includes("fig")) return "gourmand";
  return "woody";
}

function inferWeight(variantTitle: string) {
  const match = variantTitle.match(/(\d+(?:\.\d+)?)\s*oz/i);
  return match ? Number(match[1]) : 9;
}

function inferSize(variantTitle: string): CatalogProduct["size"] {
  const weight = inferWeight(variantTitle);
  if (weight >= 16) return "large";
  if (weight >= 10) return "medium";
  return "small";
}
