import { NextRequest, NextResponse } from "next/server";
import { isAuthConfigured, passwordMatches, sessionCookieOptions } from "@/lib/auth";
import { clientIp, hashIp, memoryRateLimit } from "@/lib/request";
import { SESSION_COOKIE, createSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin is not configured. Set ADMIN_PASSWORD and AUTH_SECRET." },
      { status: 503 },
    );
  }

  if (!memoryRateLimit(`login:${hashIp(clientIp(req))}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, await createSession(), sessionCookieOptions);
  return res;
}
