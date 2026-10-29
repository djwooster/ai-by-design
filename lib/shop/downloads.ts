import { createHmac, timingSafeEqual } from "node:crypto";
import { delivery } from "@/lib/content/products";
import { siteUrl } from "@/lib/siteUrl";

/*
 * Download links: /api/download/<token>, where the token is the product slug,
 * an expiry and the Checkout Session ID, signed with DOWNLOAD_SECRET. Nothing
 * is stored; a link works until it expires and can't be altered.
 */

type Claim = { slug: string; expires: number; session: string };

function sign(payload: string) {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) throw new Error("DOWNLOAD_SECRET is not set");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function downloadUrl(slug: string, session: string) {
  const claim: Claim = { slug, session, expires: Date.now() + delivery.linkDays * 86_400_000 };
  const payload = Buffer.from(JSON.stringify(claim)).toString("base64url");
  return siteUrl(`/api/download/${payload}.${sign(payload)}`);
}

/** The claim inside a token, or why it isn't valid. */
export function readToken(token: string): { ok: true; claim: Claim } | { ok: false; reason: "invalid" | "expired" } {
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !process.env.DOWNLOAD_SECRET) return { ok: false, reason: "invalid" };

  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return { ok: false, reason: "invalid" };

  try {
    const claim = JSON.parse(Buffer.from(payload, "base64url").toString()) as Claim;
    if (typeof claim.slug !== "string" || typeof claim.expires !== "number") return { ok: false, reason: "invalid" };
    if (claim.expires < Date.now()) return { ok: false, reason: "expired" };
    return { ok: true, claim };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}
