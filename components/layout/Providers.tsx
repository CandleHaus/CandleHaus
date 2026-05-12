"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CursorGlow } from "@/components/layout/CursorGlow";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <CartDrawer />
      <CursorGlow />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1A1410",
            color: "#F5ECD7",
            border: "1px solid #2E2218"
          }
        }}
      />
    </SessionProvider>
  );
}
