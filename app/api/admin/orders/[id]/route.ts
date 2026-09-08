import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  fulfillmentStatus: z.enum(["unfulfilled", "in_production", "shipped", "delivered"]).optional(),
  trackingNumber: z.string().trim().max(120).optional(),
  trackingUrl: z.string().trim().url().optional().or(z.literal(""))
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return null;
  return session;
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      trackingUrl: parsed.data.trackingUrl === "" ? null : parsed.data.trackingUrl
    }
  });

  return NextResponse.json(order);
}
