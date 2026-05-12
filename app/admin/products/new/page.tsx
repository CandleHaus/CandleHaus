import { AdminShell } from "@/components/layout/AdminShell";
import { ProductForm } from "@/components/shop/ProductForm";

export default function NewProductPage() {
  return <AdminShell title="New Product"><ProductForm /></AdminShell>;
}
