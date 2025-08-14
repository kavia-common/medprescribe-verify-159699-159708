"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import Link from "next/link";
import { apiLogin } from "@/lib/api";
import { setAuth, isAuthenticated } from "@/lib/auth";
import type { Role } from "@/types";
import { API_BASE_URL } from "@/lib/config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await apiLogin({ email, password, role });
      setAuth(user, token);
      router.replace("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to login";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-56px)] bg-white">
      <div className="mx-auto max-w-md px-4 py-10">
        <Card>
          <CardHeader
            title="Welcome back"
            subtitle="Sign in to your account"
          />
          <CardContent>
            {!API_BASE_URL && (
              <div className="mb-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 border border-yellow-200">
                Missing NEXT_PUBLIC_API_BASE_URL. Set it in your environment to enable API calls.
              </div>
            )}
            <form className="space-y-4" onSubmit={submit}>
              <Select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                required
              >
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="pharmacy">Pharmacy</option>
              </Select>
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" loading={loading} className="w-full">
                Sign in
              </Button>
            </form>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <p className="mt-6 text-sm text-neutral-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[var(--color-primary)] hover:underline">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
