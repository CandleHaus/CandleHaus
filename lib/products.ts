import { products as fallbackProducts } from "@/lib/catalog";
import { getPrintifyProducts, getPrintifyProductBySlug } from "@/lib/printify";

export async function getStoreProducts() {
  try {
    const products = await getPrintifyProducts();
    return products.length ? products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getStoreProductBySlug(slug: string) {
  try {
    const printifyProduct = await getPrintifyProductBySlug(slug);
    if (printifyProduct) return printifyProduct;
  } catch {
    // Fall through to the local launch collection when Printify is unavailable.
  }

  return fallbackProducts.find((product) => product.slug === slug);
}
