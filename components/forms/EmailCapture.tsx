"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect } from "react";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { ease } from "@/components/motion/tokens";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import { subscribe, type SubscribeState } from "@/lib/email/subscribe";

/**
 * Email capture for the list. `source` says where on the site it sits and
 * `tag` says what the person asked for; both go to the email provider and
 * to analytics.
 */
export function EmailCapture({
  source,
  tag,
  cta = "Send me the checklist",
  success = "[TODO: copy] Check your inbox. The checklist is on its way.",
  confirmation,
  className,
}: {
  source: string;
  tag: string;
  cta?: string;
  success?: string;
  /** A fuller confirmation state to show in place of the one-line `success`. */
  confirmation?: React.ReactNode;
  className?: string;
}) {
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") track({ name: "email_signup", source, tag });
  }, [state, source, tag]);

  return (
    <div className={cx("max-w-[28rem]", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" && confirmation ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: ease.glide }}
          >
            {confirmation}
          </motion.div>
        ) : state.status === "success" ? (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: ease.glide }}
            className="flex h-9 items-center gap-2.5 text-ui text-fg"
          >
            <GeoIcon name="check" size={18} className="text-positive" />
            {success}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            action={action}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            noValidate
          >
            <input type="hidden" name="source" value={source} />
            <input type="hidden" name="tag" value={tag} />
            <div className="flex flex-col gap-2 sm:flex-row">
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
                aria-invalid={state.status === "error"}
                aria-describedby={state.status === "error" ? `email-${source}-error` : undefined}
              />
              <Button type="submit" variant="secondary" disabled={pending}>
                {pending ? "Sending…" : cta}
              </Button>
            </div>
            {state.status === "error" && (
              <p id={`email-${source}-error`} className="mt-2 text-ui-sm text-negative">
                {state.message}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
      {!(state.status === "success" && confirmation) && (
        <p className="mt-3 font-mono text-label uppercase text-fg-muted">No spam. Unsubscribe anytime.</p>
      )}
    </div>
  );
}
