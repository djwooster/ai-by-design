import { WhyNowImage } from "@/components/home/WhyNowImage";
import { Reveal } from "@/components/motion/Reveal";
import { AccentText } from "@/components/ui/AccentText";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { whyNow } from "@/lib/content/home";

/**
 * Text on the left; on the right, the outcome: your own app, live on the App
 * Store. Then and now sit under the copy as a two-line comparison.
 */
export function WhyNow() {
  return (
    <section id="why-now" className="scroll-mt-20">
      <Container className="py-24 md:py-36">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal>
            <Pill>{whyNow.badge}</Pill>
            <h2 className="mt-6 text-title text-fg">
              {whyNow.title.map((line) => (
                <span key={line} className="block">
                  <AccentText text={line} accent={whyNow.accent} />
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-[28rem] text-lede text-fg-secondary">{whyNow.body}</p>

            <dl className="mt-10 max-w-[28rem] border-t border-line">
              {whyNow.compare.map((row) => (
                <div key={row.era} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
                  <dt className={row.era === "Now" ? "text-ui font-medium text-accent-fg" : "text-ui text-fg-muted"}>
                    {row.era}
                  </dt>
                  <dd className={row.era === "Now" ? "text-ui text-fg" : "text-ui text-fg-muted"}>{row.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <WhyNowImage />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
