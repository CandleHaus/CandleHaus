import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { blogPosts, products } from "../lib/catalog";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.promoCode.deleteMany();

  await prisma.product.createMany({
    data: products.map((product) => ({
      ...product,
      createdAt: new Date(product.createdAt),
      active: true
    }))
  });

  await prisma.promoCode.createMany({
    data: [
      { code: "WELCOME10", discountType: "percent", discountValue: 10, maxUses: 1000 },
      { code: "FREESHIP", discountType: "fixed", discountValue: 6.99, maxUses: 500 },
      { code: "GLOW20", discountType: "percent", discountValue: 20, maxUses: 250 }
    ]
  });

  await prisma.blogPost.createMany({
    data: blogPosts.map((post) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
      published: true
    }))
  });

  await prisma.user.upsert({
    where: { email: "admin@glowdrop.com" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@glowdrop.com",
      name: "GlowDrop Admin",
      role: "ADMIN",
      passwordHash: await bcrypt.hash("changeme123", 12)
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
