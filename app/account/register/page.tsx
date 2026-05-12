import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-lg place-items-center px-4 py-16">
      <div className="w-full border border-border bg-surface/60 p-6">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">Join</p>
        <h1 className="font-display text-5xl font-light">Create your account.</h1>
        <form className="mt-8 grid gap-4" action="/api/auth/register" method="post">
          <Input required label="Name" name="name" />
          <Input required label="Email" name="email" type="email" />
          <Input required label="Password" name="password" type="password" />
          <Input required label="Confirm password" name="confirmPassword" type="password" />
          <Button variant="solid" type="submit">Register</Button>
        </form>
      </div>
    </section>
  );
}
