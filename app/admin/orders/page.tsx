import { AdminShell } from "@/components/layout/AdminShell";

export default function AdminOrdersPage() {
  return <AdminShell title="Orders"><div className="border border-border bg-surface/50 p-6 text-muted">Review orders by status, customer email, and order number.</div></AdminShell>;
}
