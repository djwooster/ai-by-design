import { ConceptA } from "@/components/home/method/ConceptA";
import { ConceptB } from "@/components/home/method/ConceptB";
import { ConceptC } from "@/components/home/method/ConceptC";
import { ConceptSwitcher } from "@/components/home/method/ConceptSwitcher";
import { Section } from "@/components/layout/Section";
import { method } from "@/lib/content/home";

/** Shown on localhost and previews; production gets the chosen concept alone. */
const exploring = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

/*
 * The Method: a centered heading, then the six phases. Three concepts are in
 * play until one is picked:
 *   A  folded-corner cards with line-drawn UI scenes
 *   B  two columns of image cards, the images made in ChatGPT
 *   C  a scroll stepper, phases pinned on the left
 */
export function Method() {
  return (
    <Section id="method" title={method.title} accent={method.accent} lede={method.lede} center>
      {exploring ? (
        <ConceptSwitcher
          concepts={[
            { id: "a", label: "A", node: <ConceptA /> },
            { id: "b", label: "B", node: <ConceptB /> },
            { id: "c", label: "C", node: <ConceptC /> },
          ]}
        />
      ) : (
        <ConceptA />
      )}
    </Section>
  );
}
