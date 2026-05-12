import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
});

export async function POST(request: Request) {
  const form = Object.fromEntries(await request.formData());
  const parsed = schema.safeParse(form);
  if (!parsed.success || parsed.data.password !== parsed.data.confirmPassword) {
    return NextResponse.json({ error: "Invalid registration details" }, { status: 400 });
  }

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await bcrypt.hash(parsed.data.password, 12)
    }
  });

  return NextResponse.redirect(new URL("/account/login", request.url), { status: 303 });
}
