"use client";

import React from "react";
import clsx from "clsx";

export default function Card({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-neutral-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 p-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p>
        )}
      </div>
      {actions}
    </div>
  );
}

export function CardContent({ children }: React.PropsWithChildren) {
  return <div className="p-4">{children}</div>;
}
