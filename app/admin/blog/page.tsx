import { AdminShell } from "@/components/layout/AdminShell";
import { blogPosts } from "@/lib/catalog";

export default function AdminBlogPage() {
  return (
    <AdminShell title="Blog">
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <article key={post.slug} className="border border-border bg-surface/50 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber">{post.category}</p>
            <h2 className="mt-2 font-display text-3xl">{post.title}</h2>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
