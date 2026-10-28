import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

export function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function hashIp(ip: string) {
  const salt = process.env.AUTH_SECRET ?? "portfolio";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

// Best-effort limiter for when there is no database to count against.
// Per-instance memory only, so it is a speed bump rather than a guarantee.
const hits = new Map<string, number[]>();

export function memoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
