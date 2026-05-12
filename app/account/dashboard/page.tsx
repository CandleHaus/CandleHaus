import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Dashboard</p>
      <h1 className="font-display fluid-heading font-light">Your candle shelf.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {["Order history", "Profile settings", "Wishlist"].map((title) => (
          <div key={title} className="border border-border bg-surface/50 p-6">
            <h2 className="font-display text-3xl">{title}</h2>
            <p className="mt-3 text-sm text-muted">Manage the pieces of your GlowDrop account.</p>
          </div>
        ))}
      </div>
      <Button href="/shop" className="mt-8">Shop New Candles</Button>
    </section>
  );
}
