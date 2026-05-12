import { AdminShell } from "@/components/layout/AdminShell";

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  return <AdminShell title={`Order ${params.id}`}><div className="border border-border bg-surface/50 p-6 text-muted">Update fulfillment status and review payment actions.</div></AdminShell>;
}
