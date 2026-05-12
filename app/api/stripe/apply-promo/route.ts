import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { code, subtotal } = await request.json();
  const promo = await prisma.promoCode.findUnique({ where: { code: String(code).toUpperCase() } });
  if (!promo || !promo.active) return NextResponse.json({ error: "Promo code is not valid" }, { status: 404 });
  const discount =
    promo.discountType === "percent" ? Number(subtotal) * (promo.discountValue / 100) : promo.discountValue;
  return NextResponse.json({ code: promo.code, discount: Math.min(discount, Number(subtotal)) });
}
