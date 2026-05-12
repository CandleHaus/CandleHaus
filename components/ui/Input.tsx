import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-xs uppercase tracking-[0.18em] text-muted">{label}</span> : null}
      <input
        className={cn(
          "min-h-12 w-full border bg-bg/70 px-4 text-sm text-cream outline-none transition placeholder:text-muted/70 focus:border-amber",
          error ? "border-red-500" : "border-border",
          className
        )}
        {...props}
      />
      {error ? <span className="block text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
