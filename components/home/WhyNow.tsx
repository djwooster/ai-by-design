import { ThenNow } from "@/components/home/ThenNow";
import { WhyNowImage } from "@/components/home/WhyNowImage";
import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { whyNow } from "@/lib/content/home";

/**
 * Text on the left; on the right, the outcome: your own app, live on the App
 * Store. Then and now sit under the copy as a two-line comparison that
 * strikes "then" and lights up "now" as it scrolls in.
 */
export function WhyNow() {
  return (
    <section id="why-now" className="scroll-mt-20">
      <Container className="py-24 md:py-36">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal>
            <Pill>{whyNow.badge}</Pill>
            <WordsIn lines={[...whyNow.title]} accent={whyNow.accent} delay={0.1} className="mt-6 text-title text-fg" />
            <p className="mt-6 max-w-[28rem] text-lede text-fg-secondary">{whyNow.body}</p>

            <ThenNow rows={whyNow.compare} />
          </Reveal>

          <Reveal delay={0.1}>
            <WhyNowImage />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
