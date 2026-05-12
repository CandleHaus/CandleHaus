import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUniqueOrThrow({ where: { email: session.user.email } });
  const wishlist = await prisma.wishlistItem.findMany({ where: { userId: user.id }, include: { product: true } });
  return NextResponse.json(wishlist);
}
