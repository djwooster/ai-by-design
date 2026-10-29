import { Reveal } from "@/components/motion/Reveal";
import { SentencesIn } from "@/components/motion/SentencesIn";
import { WordsIn } from "@/components/motion/WordsIn";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { faq } from "@/lib/content/faq";
import { faqSection } from "@/lib/content/home";

/** Heading on the left, questions on the right. */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20">
      <Container className="py-24 md:py-36">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <Reveal>
            <Pill>{faqSection.badge}</Pill>
            <WordsIn lines={[faqSection.title]} delay={0.1} className="mt-6 text-title text-fg" />
          </Reveal>
          <Reveal delay={0.06}>
            <Accordion
              items={faq.map((item) => ({
                id: item.id,
                title: item.question,
                content: <SentencesIn text={item.answer} className="max-w-[40rem]" />,
              }))}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
