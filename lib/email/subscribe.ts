"use server";

import { getResend, sender } from "@/lib/email/resend";
import { checklistEmail } from "@/lib/email/templates";

export type SubscribeState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Each sign-up tag's Resend segment. The rest of a sequence is a Resend
 * automation that starts when a contact joins the segment.
 */
const segments: Record<string, string | undefined> = {
  "app-store-checklist": process.env.RESEND_SEGMENT_CHECKLIST,
  "sourceiq-interest": process.env.RESEND_SEGMENT_SOURCEIQ,
  "email-course": process.env.RESEND_SEGMENT_EMAIL_COURSE,
};

/**
 * Adds an email to the list under its tag. Checklist sign-ups also get the
 * checklist right away. Without Resend keys it validates and succeeds, so the
 * forms can be tried locally.
 */
export async function subscribe(_previous: SubscribeState, form: FormData): Promise<SubscribeState> {
  const email = String(form.get("email") ?? "").trim();
  const tag = String(form.get("tag") ?? "");
  const source = String(form.get("source") ?? "");
  const firstName = String(form.get("firstName") ?? "").trim() || undefined;

  if (!EMAIL.test(email)) {
    return { status: "error", message: "That email doesn't look right. Check it and try again." };
  }

  const resend = getResend();
  if (!resend) {
    console.info("[subscribe] Resend not configured; skipped", { tag, source });
    return { status: "success", email };
  }

  const segment = segments[tag];
  const contact = await resend.contacts.create({ email, firstName, segments: segment ? [{ id: segment }] : undefined });
  if (contact.error) {
    // Already on the list: just add them to this tag's segment too.
    const exists = /already exists/i.test(contact.error.message);
    const added = exists && segment ? await resend.contacts.segments.add({ email, segmentId: segment }) : null;
    if (!exists || added?.error) {
      console.error("[subscribe]", added?.error ?? contact.error, { tag, source });
      return { status: "error", message: "Something went wrong on my end. Try again in a moment." };
    }
  }

  if (tag === "app-store-checklist") {
    const message = checklistEmail({ url: process.env.CHECKLIST_URL || null });
    const sent = await resend.emails.send({ ...sender, to: email, ...message });
    if (sent.error) console.error("[subscribe] checklist email", sent.error);
  }

  return { status: "success", email };
}
