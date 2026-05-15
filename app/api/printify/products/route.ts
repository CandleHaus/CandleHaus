import { NextResponse } from "next/server";
import { getPrintifyProducts, getPrintifyShopId } from "@/lib/printify";

export async function GET() {
  try {
    const shopId = await getPrintifyShopId();
    const products = await getPrintifyProducts();
    return NextResponse.json({ shopId, products });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to fetch Printify products" },
      { status: 500 }
    );
  }
}
