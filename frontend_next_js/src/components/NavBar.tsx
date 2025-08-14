"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { APP_NAME } from "@/lib/config";
import { clearAuth, getUser } from "@/lib/auth";
import { apiLogout } from "@/lib/api";

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`text-sm ${active ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"}`}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  const router = useRouter();
  const user = getUser();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {
      // ignore logout errors (e.g., if backend not reachable)
    } finally {
      clearAuth();
      router.replace("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-[var(--color-primary)]" />
              <span className="text-[var(--color-secondary)] font-medium">
                {APP_NAME}
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <NavLink href="/" label="Home" />
              <NavLink href="/dashboard" label="Dashboard" />
              <NavLink href="/login" label="Login" />
              <NavLink href="/signup" label="Sign up" />
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-700 uppercase">
                    {user.name?.[0] || "U"}
                  </div>
                  <div className="text-sm text-neutral-700">
                    <div className="font-medium leading-none">{user.name}</div>
                    <div className="text-xs text-neutral-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm text-[var(--color-primary)] hover:underline"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
