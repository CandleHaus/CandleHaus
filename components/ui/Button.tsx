import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "solid";
};

export function Button({ href, children, className, variant = "primary", ...props }: ButtonProps) {
  const classes = cn(
    "group relative inline-flex min-h-11 items-center justify-center overflow-hidden border px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] transition duration-300 disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary" &&
      "border-amber text-cream before:absolute before:inset-y-0 before:left-0 before:w-0 before:bg-amber before:transition-all before:duration-300 hover:text-cream hover:before:w-full",
    variant === "solid" && "border-amber bg-amber text-cream hover:bg-amber-light",
    variant === "ghost" && "border-border text-muted hover:border-amber hover:text-cream",
    className
  );
  const content = <span className="relative z-10">{children}</span>;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
