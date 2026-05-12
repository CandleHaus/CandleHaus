import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const order = await prisma.order.create({
    data: {
      email: body.email,
      subtotal: body.subtotal,
      shipping: body.shipping,
      total: body.total,
      shippingAddress: body.shippingAddress,
      shippingMethod: body.shippingMethod,
      promoCode: body.promoCode,
      discount: body.discount ?? 0,
      stripePaymentId: body.stripePaymentId,
      status: "paid",
      items: {
        create: body.items.map((item: { productId: string; quantity: number; price: number }) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    }
  });

  if (resend) {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "orders@glowdrop.com",
      to: body.email,
      subject: `GlowDrop order ${order.id}`,
      html: `<p>Thank you for your order. Total: $${body.total}</p>`
    });
  }

  return NextResponse.json(order);
}
