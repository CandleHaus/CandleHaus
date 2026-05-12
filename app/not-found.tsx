import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative grid min-h-[calc(100vh-5rem)] place-items-center overflow-hidden px-4 py-24 text-center">
      <Image
        src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1600&q=85"
        alt="A candle burning in a dark room"
        fill
        className="-z-10 object-cover opacity-35"
      />
      <div className="max-w-xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">404</p>
        <h1 className="font-display fluid-heading font-light">The light went out.</h1>
        <p className="mt-5 text-muted">The page you wanted has slipped into shadow.</p>
        <Button href="/shop" className="mt-8">
          Return to Shop
        </Button>
      </div>
    </div>
  );
}
