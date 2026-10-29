import { Section } from "@/components/layout/Section";
import { MethodScroll } from "@/components/signature/MethodScroll";
import { phases } from "@/lib/content/method";

export function Method() {
  return (
    <Section
      id="method"
      numeral="02"
      label="The AI by Design Method"
      title={
        <>
          Six phases. <span className="text-fg-secondary">One app, shipped.</span>
        </>
      }
      paper
    >
      <MethodScroll phases={phases} />
    </Section>
  );
}
