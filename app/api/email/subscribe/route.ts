import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  if (resend && email) {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "orders@glowdrop.com",
      to: email,
      subject: "Welcome to GlowDrop",
      html: "<p>Use WELCOME10 for 10% off your first order.</p>"
    });
  }
  return NextResponse.redirect(new URL("/?subscribed=true", request.url), { status: 303 });
}
