import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ProductForm() {
  return (
    <form className="grid gap-4 border border-border bg-surface/50 p-5 md:grid-cols-2">
      <Input label="Product name" />
      <Input label="Slug" />
      <Input label="Price" type="number" />
      <Input label="Stock" type="number" />
      <Input label="Scent family" />
      <Input label="Wax type" />
      <Input label="Cloudinary image URL" />
      <Input label="Burn time" type="number" />
      <textarea className="min-h-32 border border-border bg-bg p-4 text-cream outline-none focus:border-amber md:col-span-2" placeholder="Description" />
      <Button variant="solid" className="md:col-span-2">Save Product</Button>
    </form>
  );
}
