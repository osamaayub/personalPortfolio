"use client";

import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";
import StatusScreen, { primaryAction, secondaryAction } from "@/components/status-screen";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    logger.error(`Route error boundary caught an error${error.digest ? ` (digest ${error.digest})` : ""}`, error);
    toast.error("Something went wrong. Please try again.", { id: "route-error" });
  }, [error]);

  return (
    <StatusScreen
      title="Something went wrong"
      message="An unexpected error occurred while loading this page. You can try again, or head back home."
    >
      <button type="button" onClick={reset} className={primaryAction}>
        Try again
      </button>
      <Link href="/" className={secondaryAction}>
        Back to home
      </Link>
    </StatusScreen>
  );
}
