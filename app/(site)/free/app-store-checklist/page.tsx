import type { Metadata } from "next";
import Link from "next/link";
import { ChecklistSheet } from "@/components/checklist/ChecklistSheet";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { CourseBand } from "@/components/shared/CourseBand";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { checklistGroups, checklistPage } from "@/lib/content/checklist";

export const metadata: Metadata = {
  title: "Free App Store submission checklist",
  description: "[TODO: copy] Every step between a finished build and a live App Store listing.",
};

/** The opt-in: the form beside a page of the checklist, then every section of it. */
export default function ChecklistPage() {
  return (
    <>
      <Container className="pt-14 pb-24 md:pt-20 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Pill>{checklistPage.badge}</Pill>
            </Reveal>
            <WordsIn
              as="h1"
              lines={[checklistPage.title]}
              accent={checklistPage.accent}
              delay={0.1}
              className="mt-6 text-display text-fg"
            />
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-[32rem] text-lede text-fg-secondary">{checklistPage.lede}</p>
              <ul className="mt-8 space-y-2.5">
                {checklistPage.promises.map((line) => (
                  <li key={line} className="flex gap-3 text-ui text-fg">
                    <GeoIcon name="check" size={18} className="mt-px text-positive" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4} className="mt-10">
              <EmailCapture
                source="checklist-page"
                tag="app-store-checklist"
                cta={checklistPage.cta}
                confirmation={<Confirmation />}
              />
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ChecklistSheet />
          </Reveal>
        </div>
      </Container>

      <Container className="pb-24 md:pb-32">
        <h2 className="text-title text-fg">What&apos;s in it</h2>
        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {checklistGroups.map((group, index) => (
            <StaggerItem key={group.id} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-ui-sm text-fg-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-ui-sm text-fg-muted">
                  {group.items.length} {group.items.length === 1 ? "step" : "steps"}
                </span>
              </div>
              <h3 className="mt-8 text-heading text-fg">{group.name}</h3>
              <p className="mt-1 text-ui-sm text-fg-secondary">{group.note}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-ui-sm text-fg-secondary">
                    <span aria-hidden className="mt-[3px] size-3 shrink-0 rounded-[4px] border border-line-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <CourseBand
        placement="checklist-page"
        title="[TODO: copy] Want help getting to submit?"
        body="[TODO: copy] The course walks you through every phase, from idea to App Store."
      />
    </>
  );
}

/** What replaces the form once someone signs up. */
function Confirmation() {
  return (
    <div className="max-w-[28rem] rounded-2xl border border-line bg-surface p-6">
      <span className="flex size-9 items-center justify-center rounded-full bg-accent text-on-accent">
        <GeoIcon name="check" size={18} />
      </span>
      <p className="mt-5 text-heading text-fg">{checklistPage.confirmation.title}</p>
      <p className="mt-1.5 text-ui text-fg-secondary">{checklistPage.confirmation.body}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
        <ButtonLink href="/#method" variant="secondary" size="md">
          See the course
        </ButtonLink>
        <Link href="/shop/app-store-submission-playbook" className="text-ui-sm text-fg-muted transition-colors hover:text-fg">
          The full playbook →
        </Link>
      </div>
    </div>
  );
}
