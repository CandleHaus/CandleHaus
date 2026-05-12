import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1),
  body: z.string().min(1)
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.parse(await request.json());
  const user = await prisma.user.findUniqueOrThrow({ where: { email: session.user.email } });
  const review = await prisma.review.create({ data: { ...parsed, userId: user.id } });
  return NextResponse.json(review);
}
