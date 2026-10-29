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
 * Text on the left; on the right, the story in three illustrated cards that
 * deal onto the table as the section scrolls in: two "then" cards, and the
 * pastel-blue "now" card landing on top (references/09).
 */

// Where each card rests in the stack on large screens.
const resting = [
  { rotate: -4, z: 1, className: "lg:left-0 lg:top-0" },
  { rotate: 3, z: 2, className: "lg:right-0 lg:top-10" },
  { rotate: -1.5, z: 3, className: "lg:left-[16%] lg:top-[46%]" },
];

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
            className="relative grid grid-cols-1 gap-4 sm:grid-cols-3 lg:block lg:h-[560px]"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          >
            {whyNow.cards.map((card, i) => (
              <motion.li
                key={card.title}
                className={cx("lg:absolute lg:w-[54%]", resting[i].className)}
                style={{ zIndex: resting[i].z }}
                variants={{
                  hidden: { opacity: 0, y: 40, rotate: 0 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    rotate: resting[i].rotate,
                    transition: { duration: 0.7, ease: ease.glide, delay: 0.15 + i * 0.22 },
                  },
                }}
              >
                <IllustratedCard
                  spot={card.spot}
                  eyebrow={card.era}
                  title={card.title}
                  note={card.note}
                  blue={card.era === "Now"}
                  className="h-full ring-2 ring-(--air-black)"
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
