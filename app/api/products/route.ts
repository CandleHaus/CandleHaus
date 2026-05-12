import { NextResponse } from "next/server";
import { products } from "@/lib/catalog";

export async function GET(request: Request) {
  const url = new URL(request.url);
  let filtered = products;
  for (const key of ["scentFamily", "size", "waxType"] as const) {
    const value = url.searchParams.get(key);
    if (value) filtered = filtered.filter((product) => product[key] === value);
  }
  const minPrice = Number(url.searchParams.get("minPrice") ?? 0);
  const maxPrice = Number(url.searchParams.get("maxPrice") ?? Infinity);
  filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  const sort = url.searchParams.get("sort");
  filtered = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    return Number(b.featured) - Number(a.featured);
  });
  return NextResponse.json({ products: filtered, nextPage: null });
}
