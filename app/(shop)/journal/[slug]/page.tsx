import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/catalog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">{post.category} / {post.readTime} min</p>
      <h1 className="font-display fluid-heading font-light">{post.title}</h1>
      <p className="mt-8 text-lg leading-9 text-muted">{post.content}</p>
    </article>
  );
}
