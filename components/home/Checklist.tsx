import Link from "next/link";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
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
              <WordsIn lines={[checklist.title]} accent={checklist.accent} delay={0.1} className="mt-6 text-title text-fg" />
              <p className="mt-5 max-w-[28rem] text-lede text-fg-secondary">{checklist.body}</p>
            </div>
            <div>
              <EmailCapture source="home" tag="email-course" cta="Send me Day 1" success="Check your inbox. Day 1 is on its way." />
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-ui-sm text-fg-muted">
                <Link href="/free/5-day-course" className="transition-colors duration-150 hover:text-fg">
                  What&apos;s in it →
                </Link>
                <Link href="/free/app-store-checklist" className="transition-colors duration-150 hover:text-fg">
                  Or get the App Store checklist →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
