import { NextResponse } from "next/server";
import { createPrintifyOrder } from "@/lib/printify";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { labelForShippingAmountCents } from "@/lib/shipping";
import { stripe } from "@/lib/stripe";

type CheckoutItemMetadata = {
  productId: string;
  variantId: number;
  quantity: number;
  name: string;
  image: string | null;
  priceCents: number;
};

export async function POST(request: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe webhook is not configured" }, { status: 503 });
  }
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    await prisma.order.updateMany({
      where: { stripePaymentId: intent.id },
      data: { status: "paid" }
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.metadata?.source === "printify" && session.metadata.printifyItems) {
      const shippingDetails = session.shipping_details;
      const address = shippingDetails?.address;
      const email = session.customer_details?.email ?? "";
      const items: CheckoutItemMetadata[] = JSON.parse(session.metadata.printifyItems);

      const subtotal = items.reduce((sum, item) => sum + (item.priceCents * item.quantity) / 100, 0);
      const shippingCents = session.total_details?.amount_shipping ?? 0;
      const discountCents = session.total_details?.amount_discount ?? 0;
      const total = (session.amount_total ?? 0) / 100;

      const existingOrder = await prisma.order.findUnique({ where: { stripeSessionId: session.id } });
      const isFirstDelivery = !existingOrder;

      const existingUser = email ? await prisma.user.findUnique({ where: { email } }) : null;

      // Idempotent: Stripe can retry this webhook, so look the order up by
      // its unique session id rather than creating a duplicate every retry.
      const order =
        existingOrder ??
        (await prisma.order.create({
          data: {
            userId: existingUser?.id,
            email,
            status: "paid",
            stripeSessionId: session.id,
            stripePaymentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
            subtotal,
            shipping: shippingCents / 100,
            discount: discountCents / 100,
            total,
            shippingAddress: shippingDetails ? JSON.parse(JSON.stringify(shippingDetails)) : {},
            shippingMethod: labelForShippingAmountCents(shippingCents),
            items: {
              create: items.map((item) => ({
                printifyProductId: item.productId,
                printifyVariantId: item.variantId,
                name: item.name,
                image: item.image ?? undefined,
                quantity: item.quantity,
                price: item.priceCents / 100
              }))
            }
          }
        }));

      // Only attempt fulfillment once — a retried webhook shouldn't create a
      // second Printify order for the same purchase.
      if (!order.printifyOrderId && address?.line1 && address.city && address.postal_code && address.country) {
        const [firstName, ...rest] = (shippingDetails?.name || "Ember Vale").split(" ");
        try {
          const printifyOrder = await createPrintifyOrder({
            externalId: session.id,
            lineItems: items.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity
            })),
            shippingAddress: {
              firstName,
              lastName: rest.join(" ") || "Customer",
              email,
              phone: session.customer_details?.phone || "",
              country: address.country,
              region: address.state || "",
              address1: address.line1,
              address2: address.line2 || "",
              city: address.city,
              zip: address.postal_code
            }
          });
          await prisma.order.update({
            where: { id: order.id },
            data: { printifyOrderId: printifyOrder.id, fulfillmentStatus: "in_production" }
          });
        } catch (error) {
          console.error("Printify order creation failed for", session.id, error);
        }
      }

      if (resend && email && isFirstDelivery) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "orders@embervalecandles.com",
          to: email,
          subject: `Ember & Vale order confirmed — ${order.id}`,
          html: `<p>Thank you for your order! We're preparing ${items.length} item${
            items.length === 1 ? "" : "s"
          } for you. Order total: $${total.toFixed(2)}.</p>`
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
