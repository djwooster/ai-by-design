import Link from "next/link";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { Reveal } from "@/components/motion/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { checklist } from "@/lib/content/home";

export function Checklist() {
  return (
    <section id="checklist" className="scroll-mt-20">
      <Container className="pb-24 md:pb-36">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 rounded-[28px] border border-line bg-surface p-8 md:p-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <Pill>{checklist.badge}</Pill>
              <h2 className="mt-6 text-title text-fg">
                <AccentText text={checklist.title} accent={checklist.accent} />
              </h2>
              <p className="mt-5 max-w-[28rem] text-lede text-fg-secondary">{checklist.body}</p>
            </div>
            <div>
              <EmailCapture source="home" tag="app-store-checklist" />
              <Link
                href="/free/app-store-checklist"
                className="mt-5 inline-flex text-ui-sm text-fg-muted transition-colors duration-150 hover:text-fg"
              >
                What&apos;s in it →
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
