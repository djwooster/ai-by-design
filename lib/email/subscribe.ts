"use server";

export type SubscribeState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Adds an email to the list with a tag and a source. Stubbed until stage 5,
 * when it adds the contact to the Resend audience and starts the sequence.
 */
export async function subscribe(_previous: SubscribeState, form: FormData): Promise<SubscribeState> {
  const email = String(form.get("email") ?? "").trim();
  const tag = String(form.get("tag") ?? "");
  const source = String(form.get("source") ?? "");

  if (!EMAIL.test(email)) {
    return { status: "error", message: "That email doesn't look right. Check it and try again." };
  }

  // [TODO: stage 5] Resend: add `email` to the audience with `tag` and `source`.
  void tag;
  void source;

  return { status: "success", email };
}
