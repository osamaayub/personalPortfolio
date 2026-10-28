// Edge-safe (jose only) so middleware can import it.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "admin_session";
export const SESSION_SECONDS = 60 * 60 * 8;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) return null;
  return new TextEncoder().encode(value);
}

export const hasSessionSecret = () => secret() !== null;

export async function createSession() {
  const key = secret();
  if (!key) throw new Error("AUTH_SECRET must be set (32+ characters)");
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(key);
}

export async function verifySession(token: string | undefined) {
  const key = secret();
  if (!key || !token) return false;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false;
  }
}
