import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const { amount } = await request.json();
  if (!stripe) return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(Number(amount) * 100),
    currency: "usd",
    automatic_payment_methods: { enabled: true }
  });
  return NextResponse.json({ clientSecret: intent.client_secret });
}
