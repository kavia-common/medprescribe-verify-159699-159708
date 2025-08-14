"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, isAuthenticated } from "@/lib/auth";
import { apiGetMyPrescriptions } from "@/lib/api";
import type { Prescription } from "@/types";
import PrescriptionForm from "@/components/PrescriptionForm";
import PrescriptionList from "@/components/PrescriptionList";
import VerificationCard from "@/components/VerificationCard";

export default function DashboardPage() {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const user = getUser();
  const role = user?.role;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    if (role === "doctor" || role === "patient") {
      setLoadingList(true);
      apiGetMyPrescriptions({ role })
        .then((items) => setPrescriptions(items || []))
        .catch(() => setPrescriptions([]))
        .finally(() => setLoadingList(false));
    }
  }, [router, role]);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-neutral-900">
            Dashboard
          </h1>
          <p className="text-sm text-neutral-600">
            {user?.name} • <span className="capitalize">{role}</span>
          </p>
        </div>

        {role === "doctor" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PrescriptionForm
                onCreated={(p) => setPrescriptions((prev) => [p, ...prev])}
              />
            </div>
            <div className="lg:col-span-1">
              <VerificationCard />
            </div>
            <div className="lg:col-span-3">
              {loadingList ? (
                <p className="text-sm text-neutral-500">Loading...</p>
              ) : (
                <PrescriptionList
                  title="Your issued prescriptions"
                  items={prescriptions}
                />
              )}
            </div>
          </div>
        )}

        {role === "patient" && (
          <div className="space-y-6">
            <VerificationCard />
            {loadingList ? (
              <p className="text-sm text-neutral-500">Loading...</p>
            ) : (
              <PrescriptionList title="Your prescriptions" items={prescriptions} />
            )}
          </div>
        )}

        {role === "pharmacy" && (
          <div className="grid grid-cols-1 gap-6">
            <VerificationCard />
            <p className="text-sm text-neutral-600">
              Enter a prescription code above to verify authenticity and on-chain
              status.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
