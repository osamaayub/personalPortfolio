import React from "react";

type StatusScreenProps = {
  code?: string;
  title: string;
  message: string;
  children?: React.ReactNode;
};

/** Shared layout for error and not-found pages; works in both themes via tokens. */
export default function StatusScreen({ code, title, message, children }: StatusScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="card w-full max-w-md px-8 py-12 text-center">
        {code && (
          <p className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent dark:from-indigo-300 dark:to-purple-300">
            {code}
          </p>
        )}
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 leading-relaxed text-ink-muted">{message}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>
      </div>
    </main>
  );
}

export const primaryAction =
  "inline-flex h-11 items-center justify-center rounded-full bg-indigo-600 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400";

export const secondaryAction =
  "inline-flex h-11 items-center justify-center rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition-colors hover:bg-surface-2";
