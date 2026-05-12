"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-lg place-items-center px-4 py-16">
      <div className="w-full border border-border bg-surface/60 p-6">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Account</p>
        <h1 className="font-display text-5xl font-light">Welcome back.</h1>
        <form className="mt-8 grid gap-4" onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          signIn("credentials", { email: data.get("email"), password: data.get("password"), callbackUrl: "/account/dashboard" });
        }}>
          <Input required label="Email" name="email" type="email" />
          <Input required label="Password" name="password" type="password" />
          <Button variant="solid" type="submit">Sign In</Button>
        </form>
        <Button className="mt-3 w-full" variant="ghost" onClick={() => signIn("google", { callbackUrl: "/account/dashboard" })}>
          Continue with Google
        </Button>
        <a className="mt-5 block text-center text-sm text-muted hover:text-amber" href="/account/register">Create an account</a>
      </div>
    </section>
  );
}
