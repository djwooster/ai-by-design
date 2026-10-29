import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Grid } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/SmartLink";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { instructor } from "@/lib/content/home";
import { site } from "@/lib/content/site";

export function Instructor() {
  return (
    <Section id="instructor" numeral="07" label="Your instructor">
      <Grid className="gap-y-10">
        <Reveal className="col-span-4 md:col-span-4">
          {/* [TODO: photo] */}
          <div className="flex aspect-[4/5] items-end rounded-lg border border-line bg-surface p-4">
            <SpecLabel>[TODO: photo]</SpecLabel>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="col-span-4 md:col-span-7 md:col-start-6">
          <h3 className="text-title text-fg">{instructor.name}</h3>
          <SpecLabel className="mt-3">{instructor.role}</SpecLabel>
          <p className="mt-6 max-w-[36rem] text-body text-fg-secondary">{instructor.bio}</p>

          <SpecLabel className="mt-12">Experience</SpecLabel>
          <ul className="mt-3 border-t border-line">
            {instructor.experience.map((item) => (
              <li key={item.org} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                <span className="text-ui text-fg">{item.org}</span>
                {item.note && <SpecLabel as="span">{item.note}</SpecLabel>}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {site.elsewhere.map((link) => (
              <SmartLink
                key={link.label}
                link={link}
                className="font-mono text-label uppercase text-fg-muted transition-colors duration-150 hover:text-fg"
              />
            ))}
          </div>
        </Reveal>
      </Grid>
    </Section>
  );
}
