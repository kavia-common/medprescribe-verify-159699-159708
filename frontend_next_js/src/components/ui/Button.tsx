"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export default function Button({
  className,
  variant = "primary",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const styles = {
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:ring-[var(--color-primary)]",
    secondary:
      "bg-neutral-800 text-white hover:bg-neutral-900 focus-visible:ring-neutral-800",
    ghost:
      "bg-transparent text-[var(--color-primary)] hover:bg-neutral-100 focus-visible:ring-neutral-300",
  } as const;

  return (
    <button
      className={clsx(base, styles[variant], className)}
      aria-busy={loading}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
