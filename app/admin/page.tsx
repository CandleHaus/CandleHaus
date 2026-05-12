import { products } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";
import { AdminShell } from "@/components/layout/AdminShell";

export default function AdminDashboardPage() {
  const revenue = products.reduce((sum, product) => sum + product.price * 3, 0);
  const lowStock = products.filter((product) => product.stock < 20);

  return (
    <AdminShell title="Admin Dashboard">
      <div className="grid gap-5 md:grid-cols-4">
        <Metric label="Total revenue" value={formatPrice(revenue)} />
        <Metric label="Orders today" value="12" />
        <Metric label="Low stock" value={String(lowStock.length)} />
        <Metric label="Active products" value={String(products.length)} />
      </div>
      <div className="mt-8 border border-border bg-surface/50 p-5">
        <h2 className="font-display text-3xl">Recent orders</h2>
        <p className="mt-3 text-muted">The latest studio orders will appear here as payments settle.</p>
      </div>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-surface/50 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-4 font-display text-4xl text-amber">{value}</p>
    </div>
  );
}
