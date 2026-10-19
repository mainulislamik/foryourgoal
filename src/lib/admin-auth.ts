import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Secret for HMAC signing of session tokens
const ADMIN_SECRET =
  process.env.ADMIN_SECRET ||
  "foryourgoal-enterprise-secure-admin-token-signing-secret-2026-imon";

// Authorized usernames (case-insensitive)
const AUTHORIZED_USERNAMES = [
  "imon.khanforyourgoal.com",
  "imon.khan@foryourgoal.com",
  "imon",
  "imon.khan",
];

// SHA-256 hash of "imran%$#"
// crypto.createHash("sha256").update("imran%$#").digest("hex")
const PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  "39ad27cd4572af386d9848d89bc25310446d7592340f18045968d5f2a247cba3";

export interface AdminUser {
  username: string;
  name: string;
  email: string;
  role: string;
}

export function verifyAdminCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;

  const normalizedUser = username.trim().toLowerCase();
  const isUserValid = AUTHORIZED_USERNAMES.includes(normalizedUser);

  if (!isUserValid) return false;

  const inputHash = crypto.createHash("sha256").update(password.trim()).digest("hex");
  return inputHash === PASSWORD_HASH;
}

export function createAdminToken(user: AdminUser): string {
  const payload = {
    ...user,
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

export function verifyAdminToken(token?: string | null): AdminUser | null {
  if (!token || !token.includes(".")) return null;

  try {
    const [payloadBase64, signature] = token.split(".");
    const expectedSig = crypto
      .createHmac("sha256", ADMIN_SECRET)
      .update(payloadBase64)
      .digest("base64url");

    if (signature !== expectedSig) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8"));
    if (Date.now() > payload.exp) {
      return null;
    }

    return {
      username: payload.username,
      name: payload.name || "Imon Khan",
      email: payload.email || "imon.khan@foryourgoal.com",
      role: payload.role || "Super Admin",
    };
  } catch {
    return null;
  }
}

export async function getSessionFromCookies(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("fyg_admin_session")?.value;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export function getSessionFromRequest(req: NextRequest): AdminUser | null {
  const token = req.cookies.get("fyg_admin_session")?.value;
  return verifyAdminToken(token);
}
