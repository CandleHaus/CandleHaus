import { NextResponse } from "next/server";
import { findProduct } from "@/lib/catalog";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const product = findProduct(params.slug);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}
