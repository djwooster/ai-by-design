import { Resend } from "resend";

let client: Resend | null | undefined;

/** The Resend client, or null until `RESEND_API_KEY` is set. */
export function getResend() {
  if (client === undefined) {
    const key = process.env.RESEND_API_KEY;
    client = key ? new Resend(key) : null;
  }
  return client;
}

export const sender = {
  from: process.env.EMAIL_FROM || "DJ Wooster <dj@ai-bydesign.dev>",
  replyTo: process.env.EMAIL_REPLY_TO || undefined,
};
