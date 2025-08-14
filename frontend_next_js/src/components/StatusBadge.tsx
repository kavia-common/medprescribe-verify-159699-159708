"use client";

import React from "react";
import type { Prescription, VerifyResult } from "@/types";

type BadgeProps = {
  status:
    | Prescription["status"]
    | VerifyResult["status"]
    | VerifyResult["onChainStatus"]
    | undefined;
  label?: string;
};

const colorMap: Record<string, string> = {
  valid: "bg-green-100 text-green-800",
  confirmed: "bg-green-100 text-green-800",
  finalized: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  expired: "bg-orange-100 text-orange-800",
  invalid: "bg-red-100 text-red-800",
  revoked: "bg-red-100 text-red-800",
  unknown: "bg-neutral-100 text-neutral-800",
  not_found: "bg-neutral-100 text-neutral-800",
};

export default function StatusBadge({ status, label }: BadgeProps) {
  const s = status || "unknown";
  const cls = colorMap[s] || colorMap["unknown"];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${cls}`}
      title={label || s}
    >
      {label || s}
    </span>
  );
}
