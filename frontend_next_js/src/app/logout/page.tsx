"use client";

import { useEffect } from "react";
import { clearAuth } from "@/lib/auth";
import { apiLogout } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await apiLogout();
      } catch {
        // ignore
      } finally {
        clearAuth();
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-white flex items-center justify-center">
      <p className="text-neutral-600 text-sm">Signing you out…</p>
    </main>
  );
}
