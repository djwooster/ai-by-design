import { Reveal } from "@/components/motion/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { whyNow } from "@/lib/content/home";

/** One statement, centered, with room around it. */
export function WhyNow() {
  return (
    <section id="why-now" className="scroll-mt-20">
      <Container className="py-28 md:py-44">
        <Reveal className="mx-auto max-w-[52rem] text-center">
          <Pill>{whyNow.badge}</Pill>
          <p className="mt-8 text-title">
            <span className="text-fg-muted">{whyNow.before}</span>{" "}
            <span className="text-fg">
              <AccentText text={whyNow.after} accent={whyNow.accent} />
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
