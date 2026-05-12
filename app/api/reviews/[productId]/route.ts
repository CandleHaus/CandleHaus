import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { productId: string } }) {
  const reviews = await prisma.review.findMany({
    where: { productId: params.productId },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(reviews);
}
