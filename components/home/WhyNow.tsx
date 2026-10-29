"use client";

import { motion } from "motion/react";
import { IllustratedCard } from "@/components/illustrations/IllustratedCard";
import { Reveal } from "@/components/motion/Reveal";
import { ease } from "@/components/motion/tokens";
import { AccentText } from "@/components/ui/AccentText";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { whyNow } from "@/lib/content/home";
import { cx } from "@/lib/cx";

/*
 * Text on the left; on the right, two illustrated cards side by side: a light
 * "then" card and the blue "now" card, set a step lower so the pair reads as
 * moving forward. They rise in one after the other as the section scrolls in.
 */
export function WhyNow() {
  return (
    <section id="why-now" className="scroll-mt-20">
      <Container className="py-24 md:py-36">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <Pill>{whyNow.badge}</Pill>
            <h2 className="mt-6 text-title text-fg">
              <AccentText text={whyNow.title} accent={whyNow.accent} />
            </h2>
            <p className="mt-6 max-w-[28rem] text-lede text-fg-secondary">{whyNow.body}</p>
          </Reveal>

          <motion.ul
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          >
            {whyNow.cards.map((card, i) => (
              <motion.li
                key={card.title}
                className={cx("h-full", i === 1 && "sm:mt-16")}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.glide, delay: 0.1 + i * 0.3 } },
                }}
              >
                <IllustratedCard
                  spot={card.spot}
                  eyebrow={card.era}
                  title={card.title}
                  note={card.note}
                  blue={card.era === "Now"}
                  tall
                  className="h-full min-h-[380px]"
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
