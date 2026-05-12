export default function AccountOrderPage({ params }: { params: { orderId: string } }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Order detail</p>
      <h1 className="font-display fluid-heading font-light">Order {params.orderId}</h1>
      <div className="mt-10 border border-border bg-surface/50 p-6 text-muted">
        Your line items, shipping address, and order status will appear here.
      </div>
    </section>
  );
}
