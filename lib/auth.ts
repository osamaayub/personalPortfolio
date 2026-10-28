import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";
import { SESSION_COOKIE, SESSION_SECONDS, hasSessionSecret, verifySession } from "@/lib/session";

export const isAuthConfigured = () =>
  hasSessionSecret() && Boolean(process.env.ADMIN_PASSWORD);

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Hash first so both buffers have equal length for timingSafeEqual.
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_SECONDS,
};

/** Use inside route handlers and server components; middleware alone is not trusted. */
export async function isAdmin() {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}
