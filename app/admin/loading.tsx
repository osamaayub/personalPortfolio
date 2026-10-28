export default function AdminLoading() {
  return (
    <div role="status" className="flex min-h-screen items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
