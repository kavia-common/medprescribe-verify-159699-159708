"use client";

import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Card, { CardContent, CardHeader } from "./ui/Card";
import { apiIssuePrescription } from "@/lib/api";
import type { Prescription } from "@/types";

export default function PrescriptionForm({
  onCreated,
}: {
  onCreated?: (p: Prescription) => void;
}) {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [drugName, setDrugName] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const created = await apiIssuePrescription({
        patientId,
        patientName,
        drugName,
        dosage,
        instructions,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : "",
      });
      setSuccess(`Issued prescription #${created.code || created.id}`);
      setPatientId("");
      setPatientName("");
      setDrugName("");
      setDosage("");
      setInstructions("");
      setExpiresAt("");
      onCreated?.(created);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to issue prescription";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Issue Prescription"
        subtitle="Provide patient and medication details"
      />
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submit}>
          <Input
            label="Patient ID"
            placeholder="patient-123"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
          <Input
            label="Patient Name"
            placeholder="Jane Doe"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
          <Input
            label="Drug Name"
            placeholder="Amoxicillin"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
          <Input
            label="Dosage"
            placeholder="500mg twice daily"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Instructions"
              placeholder="Take with water after meals"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>
          <Input
            type="date"
            label="Expires On"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" variant="primary" loading={loading}>
              Issue Prescription
            </Button>
          </div>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-700">{success}</p>}
      </CardContent>
    </Card>
  );
}
