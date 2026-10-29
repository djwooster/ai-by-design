"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { ease } from "@/components/motion/tokens";
import { cx } from "@/lib/cx";

export type AccordionItem = {
  id: string;
  title: React.ReactNode;
  /** Spec-sheet text on the right of the row, e.g. "6 lessons". */
  meta?: React.ReactNode;
  content: React.ReactNode;
};

/** Hairline rows that open in place. Used for the curriculum and the FAQ. */
export function Accordion({
  items,
  defaultOpen = [],
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: string[];
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const baseId = useId();
  const toggle = (id: string) =>
    setOpen((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  return (
    <div className={cx("border-t border-line", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="flex-1 text-heading text-fg">{item.title}</span>
                {item.meta && (
                  <span className="hidden font-mono text-label uppercase text-fg-muted sm:block">
                    {item.meta}
                  </span>
                )}
                <GeoIcon
                  name="plus"
                  size={16}
                  className={cx(
                    "text-fg-muted transition-[rotate,color] duration-300 ease-glide group-hover:text-fg",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: ease.glide }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-ui text-fg-secondary">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
