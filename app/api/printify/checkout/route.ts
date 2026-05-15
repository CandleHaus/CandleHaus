import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrintifyProductById } from "@/lib/printify";
import { stripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.number().int().positive().optional(),
        quantity: z.number().int().positive().max(25).default(1)
      })
    )
    .min(1)
});

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not configured" }, { status: 503 });
    }

    const parsed = checkoutSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const resolvedItems = await Promise.all(
      parsed.data.items.map(async (item) => {
        const product = await getPrintifyProductById(item.productId);
        if (!product) {
          throw new Error(`Printify product ${item.productId} was not found`);
        }
        return {
          product,
          quantity: item.quantity,
          variantId: item.variantId ?? product.printifyVariantId
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"]
      },
      phone_number_collection: {
        enabled: true
      },
      success_url: `${origin}/order-confirmation/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      metadata: {
        source: "printify",
        printifyItems: JSON.stringify(
          resolvedItems.map((item) => ({
            productId: item.product.printifyProductId,
            variantId: item.variantId,
            quantity: item.quantity
          }))
        )
      },
      line_items: resolvedItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price * 100),
          product_data: {
            name: item.product.name,
            description: item.product.variantTitle,
            images: item.product.images.slice(0, 8)
          }
        }
      }))
    });

    return NextResponse.json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to start Printify checkout" },
      { status: 500 }
    );
  }
}
