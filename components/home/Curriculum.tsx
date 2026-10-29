"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { Reveal } from "@/components/motion/Reveal";
import { ease } from "@/components/motion/tokens";
import { AccentText } from "@/components/ui/AccentText";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { curriculum } from "@/lib/content/home";
import { phaseNumber, phases } from "@/lib/content/method";
import { cx } from "@/lib/cx";

const moduleNumber = (n: number) => String(n).padStart(2, "0");

/**
 * Left/right: the heading and a list of the six phases on the left, the
 * selected phase's modules and lessons on the right.
 */
export function Curriculum() {
  const [selected, setSelected] = useState(0);
  const phase = phases[selected];

  return (
    <section id="curriculum" className="scroll-mt-20">
      <Container className="py-24 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <Pill>{curriculum.badge}</Pill>
            <h2 className="mt-6 text-title text-fg">
              <AccentText text={curriculum.title} accent={curriculum.accent} />
            </h2>
            <p className="mt-6 max-w-[28rem] text-lede text-fg-secondary">{curriculum.lede}</p>

            <ul className="mt-12 border-t border-line" aria-label="Phases">
              {phases.map((p, index) => {
                const active = index === selected;
                return (
                  <li key={p.id} className="border-b border-line">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelected(index)}
                      className="group relative flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span
                        aria-hidden
                        className={cx(
                          "absolute top-0 left-0 h-px bg-accent transition-[width] duration-500 ease-glide",
                          active ? "w-full" : "w-0",
                        )}
                      />
                      <span className="font-mono text-ui-sm text-fg-muted">{phaseNumber(index)}</span>
                      <span
                        className={cx(
                          "flex-1 text-heading transition-colors duration-200",
                          active ? "text-fg" : "text-fg-muted group-hover:text-fg-secondary",
                        )}
                      >
                        {p.name}
                      </span>
                      <span className="text-ui-sm text-fg-muted">
                        {p.modules.length} {p.modules.length === 1 ? "module" : "modules"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="min-h-[520px] rounded-2xl border border-line bg-surface p-6 md:p-8" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: ease.glide }}
                >
                  <div className="flex items-center gap-3">
                    <GeoIcon name={phase.id} size={22} className="text-accent-fg" />
                    <span className="text-ui-sm text-fg-muted">Phase {phaseNumber(selected)}</span>
                  </div>
                  <h3 className="mt-4 text-display text-fg">{phase.name}</h3>
                  <p className="mt-3 max-w-[32rem] text-ui text-fg-secondary">{phase.description}</p>

                  <div className="mt-10 space-y-8">
                    {phase.modules.map((module) => (
                      <div key={module.number}>
                        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                          <p className="text-heading text-fg">
                            <span className="mr-3 font-mono text-ui-sm text-fg-muted">
                              {moduleNumber(module.number)}
                            </span>
                            {module.title}
                          </p>
                          <span className="shrink-0 text-ui-sm text-fg-muted">{module.lessons.length} lessons</span>
                        </div>
                        <ol className="mt-3 space-y-2">
                          {module.lessons.map((lesson, i) => (
                            <li key={lesson} className="flex gap-4 text-ui text-fg-secondary">
                              <span className="w-8 shrink-0 font-mono text-ui-sm text-fg-muted">
                                {moduleNumber(module.number)}.{i + 1}
                              </span>
                              {lesson}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
