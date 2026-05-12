import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <CheckCircle2 className="mx-auto mb-6 h-12 w-12 text-success" />
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Order confirmed</p>
      <h1 className="font-display fluid-heading font-light">Thank you for your order.</h1>
      <p className="mx-auto mt-5 max-w-xl text-muted">
        Order {params.orderId} is being prepared. A confirmation email is sent from the order creation route after payment succeeds.
      </p>
      <div className="mt-10 border border-border bg-surface/50 p-6 text-left">
        <h2 className="font-display text-3xl">Track your order</h2>
        <p className="mt-3 text-muted">Tracking appears here once the studio prints your shipping label.</p>
      </div>
      <Button href="/shop" className="mt-8">Continue Shopping</Button>
    </section>
  );
}
