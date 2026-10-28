// Skeleton shown while the home page streams in; mirrors the hero's layout to avoid a jump.
export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading"
      className="mx-auto flex min-h-[90vh] max-w-4xl animate-pulse flex-col items-center justify-center gap-6 px-4"
    >
      <div className="h-32 w-32 rounded-full bg-surface-2" />
      <div className="h-8 w-48 rounded-full bg-surface-2" />
      <div className="h-12 w-full max-w-xl rounded-2xl bg-surface-2" />
      <div className="h-6 w-full max-w-md rounded-xl bg-surface-2" />
      <div className="mt-4 flex gap-4">
        <div className="h-14 w-40 rounded-full bg-surface-2" />
        <div className="h-14 w-40 rounded-full bg-surface-2" />
      </div>
      <span className="sr-only">Loading…</span>
    </main>
  );
}
