import Link from "next/link";
import { blogPosts } from "@/lib/catalog";

export default function JournalPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Journal</p>
      <h1 className="font-display fluid-heading font-light">Notes from the studio.</h1>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="border border-border bg-surface/50 p-6 transition hover:border-amber">
            <p className="text-xs uppercase tracking-[0.24em] text-amber">{post.category} / {post.readTime} min</p>
            <h2 className="mt-5 font-display text-4xl">{post.title}</h2>
            <p className="mt-3 text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
