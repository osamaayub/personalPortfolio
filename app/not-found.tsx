import Link from "next/link";
import StatusScreen, { primaryAction } from "@/components/status-screen";

export default function NotFound() {
  return (
    <StatusScreen code="404" title="Page not found" message="The page you are looking for does not exist or has moved.">
      <Link href="/" className={primaryAction}>
        Back to home
      </Link>
    </StatusScreen>
  );
}
