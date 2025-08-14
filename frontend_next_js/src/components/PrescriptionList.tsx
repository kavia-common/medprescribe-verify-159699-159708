"use client";

import React from "react";
import Card, { CardContent, CardHeader } from "./ui/Card";
import StatusBadge from "./StatusBadge";
import type { Prescription } from "@/types";
import { SOLANA_EXPLORER_BASE } from "@/lib/config";

export default function PrescriptionList({
  items,
  title = "Prescriptions",
}: {
  items: Prescription[];
  title?: string;
}) {
  return (
    <Card>
      <CardHeader
        title={title}
        subtitle="Recent prescriptions"
      />
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-neutral-500">No prescriptions to display.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500">
                  <th className="py-2 pr-4">Code</th>
                  <th className="py-2 pr-4">Patient</th>
                  <th className="py-2 pr-4">Drug</th>
                  <th className="py-2 pr-4">Dosage</th>
                  <th className="py-2 pr-4">Issued</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Blockchain</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-t border-neutral-100">
                    <td className="py-2 pr-4 font-mono">{p.code}</td>
                    <td className="py-2 pr-4">{p.patientName}</td>
                    <td className="py-2 pr-4">{p.drugName}</td>
                    <td className="py-2 pr-4">{p.dosage}</td>
                    <td className="py-2 pr-4">
                      {new Date(p.issuedAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-2 pr-4">
                      {p.blockchainTx ? (
                        SOLANA_EXPLORER_BASE ? (
                          <a
                            href={`${SOLANA_EXPLORER_BASE}/tx/${p.blockchainTx}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[var(--color-primary)] hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          <span className="font-mono">{p.blockchainTx}</span>
                        )
                      ) : (
                        <span className="text-neutral-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
