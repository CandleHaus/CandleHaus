"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethod === "express" ? 14.99 : subtotal > 75 ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display fluid-heading font-light">Checkout</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="border border-border bg-surface/50 p-5">
          <div className="mb-8 grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.16em]">
            {["Contact", "Shipping", "Payment"].map((label, index) => (
              <button
                key={label}
                className={`border px-2 py-3 ${step === index + 1 ? "border-amber text-cream" : "border-border text-muted"}`}
                onClick={() => setStep(index + 1)}
              >
                {label}
              </button>
            ))}
          </div>

          {step === 1 ? (
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setStep(2); }}>
              <div className="sm:col-span-2"><Input required label="Email" type="email" /></div>
              <Input required label="First name" />
              <Input required label="Last name" />
              <div className="sm:col-span-2"><Input required label="Address line 1" /></div>
              <div className="sm:col-span-2"><Input label="Address line 2" /></div>
              <Input required label="City" />
              <Input required label="State" />
              <Input required label="Zip" />
              <Input label="Country" defaultValue="US" />
              <Button className="sm:col-span-2" variant="solid" type="submit">Continue to Shipping</Button>
            </form>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4">
              {[
                ["standard", "Standard", "5-8 days", subtotal > 75 ? "Free" : "$6.99"],
                ["express", "Express", "2-3 days", "$14.99"]
              ].map(([id, name, eta, price]) => (
                <button
                  key={id}
                  className={`flex justify-between border p-4 text-left ${shippingMethod === id ? "border-amber" : "border-border"}`}
                  onClick={() => setShippingMethod(id)}
                >
                  <span><strong>{name}</strong><br /><span className="text-sm text-muted">{eta}</span></span>
                  <span className="text-amber">{price}</span>
                </button>
              ))}
              <Button variant="solid" onClick={() => setStep(3)}>Continue to Payment</Button>
            </div>
          ) : null}

          {step === 3 ? (
  <div className="grid gap-5">
    <div className="rounded-none border border-border bg-bg p-5 text-muted">
      You'll be redirected to Stripe to complete your purchase securely.
    </div>
    <Button
      variant="solid"
      onClick={async () => {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.printifyProductId ?? item.id,
              variantId: item.variantId,
              quantity: item.quantity,
            })),
          }),
        });
        const data = await res.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          alert("Something went wrong. Please try again.");
        }
      }}
    >
      Pay {formatPrice(total)}
    </Button>
  </div>
) : null}
        </div>

        <aside className="h-fit border border-border bg-surface/60 p-5">
          <h2 className="font-display text-3xl">Review</h2>
          <div className="mt-5 grid gap-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between gap-4 text-sm">
                <span className="text-muted">{item.name} x {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-border pt-5 text-sm">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="mt-2 flex justify-between text-muted"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="mt-4 flex justify-between font-display text-3xl text-amber"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
