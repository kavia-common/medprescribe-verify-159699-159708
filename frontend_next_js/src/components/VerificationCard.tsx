"use client";

import React, { useState } from "react";
import Card, { CardContent, CardHeader } from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import StatusBadge from "./StatusBadge";
import { apiVerifyPrescription } from "@/lib/api";
import type { VerifyResult } from "@/types";
import { SOLANA_EXPLORER_BASE } from "@/lib/config";

export default function VerificationCard() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const r = await apiVerifyPrescription(code.trim());
      setResult(r);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Verification failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Verify Prescription"
        subtitle="Enter the prescription code or hash to verify"
      />
      <CardContent>
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={submit}>
          <Input
            label="Prescription Code"
            placeholder="e.g. MED-1A2B3C"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <div className="sm:self-end">
            <Button type="submit" variant="primary" loading={loading}>
              Verify
            </Button>
          </div>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {result && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">Result:</span>
              <StatusBadge status={result.status} />
            </div>
            {result.onChainStatus && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600">Blockchain:</span>
                <StatusBadge status={result.onChainStatus} />
              </div>
            )}
            {result.blockchainTx && (
              <div className="text-sm">
                <span className="text-neutral-600 mr-2">Tx:</span>
                {SOLANA_EXPLORER_BASE ? (
                  <a
                    className="text-[var(--color-primary)] hover:underline"
                    href={`${SOLANA_EXPLORER_BASE}/tx/${result.blockchainTx}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Explorer
                  </a>
                ) : (
                  <span className="font-mono">{result.blockchainTx}</span>
                )}
              </div>
            )}
            {result.message && (
              <p className="text-sm text-neutral-600">{result.message}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
