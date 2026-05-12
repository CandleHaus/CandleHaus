import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display fluid-heading font-light">Profile</h1>
      <form className="mt-10 grid gap-4 border border-border bg-surface/50 p-5">
        <Input label="Name" />
        <Input label="Email" type="email" />
        <Input label="New password" type="password" />
        <Input label="Saved address" placeholder="Add your default shipping address" />
        <Button variant="solid">Save Profile</Button>
      </form>
    </section>
  );
}
