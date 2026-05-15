import { NextResponse } from "next/server";
import { createPrintifyOrder } from "@/lib/printify";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

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
      const shipping = session.shipping_details;
      const address = shipping?.address;
      if (address?.line1 && address.city && address.postal_code && address.country) {
        const [firstName, ...rest] = (shipping?.name || "Ember Vale").split(" ");
        await createPrintifyOrder({
          externalId: session.id,
          lineItems: JSON.parse(session.metadata.printifyItems),
          shippingAddress: {
            firstName,
            lastName: rest.join(" ") || "Customer",
            email: session.customer_details?.email || "",
            phone: session.customer_details?.phone || "",
            country: address.country,
            region: address.state || "",
            address1: address.line1,
            address2: address.line2 || "",
            city: address.city,
            zip: address.postal_code
          }
        });
      }
    }
  }
  return NextResponse.json({ received: true });
}
