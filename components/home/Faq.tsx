import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Grid } from "@/components/ui/Container";
import { faq } from "@/lib/content/faq";

export function Faq() {
  return (
    <Section id="faq" numeral="11" label="FAQ" title="Questions, answered.">
      <Grid>
        <div className="col-span-4 md:col-span-8 md:col-start-5">
          <Accordion
            items={faq.map((item) => ({
              id: item.id,
              title: item.question,
              content: <p className="max-w-[40rem]">{item.answer}</p>,
            }))}
          />
        </div>
      </Grid>
    </Section>
  );
}
