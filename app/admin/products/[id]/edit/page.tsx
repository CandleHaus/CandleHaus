import { AdminShell } from "@/components/layout/AdminShell";
import { ProductForm } from "@/components/shop/ProductForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <AdminShell title={`Edit ${params.id}`}><ProductForm /></AdminShell>;
}
