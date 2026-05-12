import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function PromoCodesPage() {
  return (
    <AdminShell title="Promo Codes">
      <form className="grid gap-4 border border-border bg-surface/50 p-5 md:grid-cols-3">
        <Input label="Code" />
        <Input label="Discount type" />
        <Input label="Value" type="number" />
        <Button variant="solid">Create Code</Button>
      </form>
    </AdminShell>
  );
}
