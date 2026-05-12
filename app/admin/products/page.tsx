import Link from "next/link";
import { AdminShell } from "@/components/layout/AdminShell";
import { products } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <AdminShell title="Products">
      <Link href="/admin/products/new" className="mb-5 inline-block border border-amber px-4 py-3 text-sm uppercase tracking-[0.18em] text-amber">Add New Product</Link>
      <div className="overflow-x-auto border border-border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.2em] text-muted">
            <tr><th className="p-4">Name</th><th>Family</th><th>Price</th><th>Stock</th><th>Edit</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="p-4 font-display text-2xl">{product.name}</td>
                <td className="capitalize text-muted">{product.scentFamily}</td>
                <td className="text-amber">{formatPrice(product.price)}</td>
                <td>{product.stock}</td>
                <td><Link className="text-amber" href={`/admin/products/${product.id}/edit`}>Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
