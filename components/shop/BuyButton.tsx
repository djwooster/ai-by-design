"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";
import { ease } from "@/components/motion/tokens";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { startCheckout, type CheckoutState } from "@/lib/shop/checkout";

/** Buy now: starts Stripe Checkout for one product (stubbed until stage 5). */
export function BuyButton({ slug, label }: { slug: string; label: string }) {
  const [state, action, pending] = useActionState<CheckoutState, FormData>(async (previous, form) => {
    track({ name: "checkout_start", slug });
    const next = await startCheckout(previous, form);
    if (next.status === "redirect") window.location.assign(next.url);
    return next;
  }, { status: "idle" });

  return (
    <form action={action}>
      <input type="hidden" name="slug" value={slug} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Opening checkout…" : label}
      </Button>
      <AnimatePresence>
        {state.status === "unavailable" && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: ease.glide }}
            className="mt-3 text-center text-ui-sm text-fg-muted"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
