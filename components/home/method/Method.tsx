import { ConceptA } from "@/components/home/method/ConceptA";
import { Section } from "@/components/layout/Section";
import { method } from "@/lib/content/home";

/*
 * The Method: a centered heading, then the six phases as folded-corner cards
 * with line-drawn UI scenes. (Concepts B, image cards, and C, a scroll
 * stepper, were tried in fe7c7c2 and set aside.)
 */
export function Method() {
  return (
    <Section id="method" title={method.title} accent={method.accent} lede={method.lede} center>
      <ConceptA />
    </Section>
  );
}
