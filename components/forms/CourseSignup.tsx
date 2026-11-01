"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect } from "react";
import { ease } from "@/components/motion/tokens";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { track } from "@/lib/analytics";
import { subscribe, type SubscribeState } from "@/lib/email/subscribe";

/**
 * The stacked sign-up for the email course: first name and email side by side,
 * a full-width button and the fine print beneath. Same `subscribe` action as
 * `EmailCapture`.
 */
export function CourseSignup({
  source,
  tag,
  cta,
  fineprint,
  confirmation,
}: {
  source: string;
  tag: string;
  cta: string;
  fineprint: string;
  confirmation: React.ReactNode;
}) {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") track({ name: "email_signup", source, tag });
  }, [state, source, tag]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: ease.glide }}
        >
          {confirmation}
        </motion.div>
      ) : (
        <motion.form key="form" action={action} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} noValidate>
          <input type="hidden" name="source" value={source} />
          <input type="hidden" name="tag" value={tag} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label htmlFor={`name-${source}`} className="sr-only">
              First name
            </label>
            <Input id={`name-${source}`} name="firstName" autoComplete="given-name" placeholder="First name" className="h-11" />
            <label htmlFor={`email-${source}`} className="sr-only">
              Email address
            </label>
            <Input
              id={`email-${source}`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-11"
              aria-invalid={state.status === "error"}
              aria-describedby={state.status === "error" ? `email-${source}-error` : undefined}
            />
          </div>
          {state.status === "error" && (
            <p id={`email-${source}-error`} className="mt-2 text-ui-sm text-negative">
              {state.message}
            </p>
          )}
          <Button type="submit" size="lg" disabled={pending} className="mt-4 w-full">
            {pending ? "Sending…" : `${cta} →`}
          </Button>
          <p className="mt-4 text-center text-ui-sm text-fg-muted">{fineprint}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
