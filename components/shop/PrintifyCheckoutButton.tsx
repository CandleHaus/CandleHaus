"use client";

import { CreditCard } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

type PrintifyCheckoutButtonProps = {
  productId?: string;
  variantId?: number;
  quantity?: number;
  className?: string;
  label?: string;
};

export function PrintifyCheckoutButton({
  productId,
  variantId,
  quantity = 1,
  className,
  label = "Buy Now"
}: PrintifyCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    if (!productId) {
      toast.error("This product is not connected to Printify yet.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/printify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ productId, variantId, quantity }]
        })
      });
      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? "Unable to start checkout");
      }
      window.location.href = data.checkoutUrl;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to start checkout");
      setLoading(false);
    }
  }

  return (
    <Button className={className} variant="solid" disabled={loading} onClick={startCheckout}>
      <span className="inline-flex items-center gap-2">
        <CreditCard className="h-4 w-4" />
        {loading ? "Opening..." : label}
      </span>
    </Button>
  );
}
