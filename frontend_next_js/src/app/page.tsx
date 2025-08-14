import Link from "next/link";
import Button from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-white">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              Secure prescription issuance and verification
            </h1>
            <p className="mt-4 text-neutral-600">
              {APP_NAME} enables doctors to issue digital prescriptions and
              pharmacies to verify authenticity with Solana blockchain-backed
              status.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link href="/login">
                <Button variant="primary">Sign in</Button>
              </Link>
              <Link href="/signup" className="text-sm text-[var(--color-primary)] hover:underline">
                Create an account
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-[var(--color-primary)]/10 p-6">
                <p className="text-sm text-neutral-700">Doctor</p>
                <p className="text-xs text-neutral-500">
                  Issue and manage prescriptions
                </p>
              </div>
              <div className="rounded-xl bg-[var(--color-accent)]/10 p-6">
                <p className="text-sm text-neutral-700">Patient</p>
                <p className="text-xs text-neutral-500">
                  View your prescriptions
                </p>
              </div>
              <div className="rounded-xl bg-neutral-900/5 p-6">
                <p className="text-sm text-neutral-700">Pharmacy</p>
                <p className="text-xs text-neutral-500">
                  Verify authenticity on-chain
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/dashboard"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Go to dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
