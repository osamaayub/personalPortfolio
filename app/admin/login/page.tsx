"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const password = new FormData(e.currentTarget).get("password");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-slate-900"
      >
        <h1 className="text-2xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage projects and read messages.
        </p>
        <label htmlFor="password" className="mt-6 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-white/15 dark:bg-white/10 dark:text-white"
        />
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 h-12 w-full rounded-xl bg-indigo-600 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
