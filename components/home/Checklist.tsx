import Link from "next/link";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Container";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { checklist } from "@/lib/content/home";

export function Checklist() {
  return (
    <Section id="checklist">
      <Reveal>
        <Card className="p-6 md:p-10">
          <Grid className="items-center gap-y-8">
            <div className="col-span-4 md:col-span-6">
              <div className="flex items-center gap-3">
                <GeoIcon name="playbook" size={22} className="text-fg-secondary" />
                <SpecLabel>Free · App Store submission checklist</SpecLabel>
              </div>
              <h2 className="mt-5 max-w-[22ch] text-title text-fg">{checklist.title}</h2>
              <p className="mt-3 max-w-[30rem] text-ui text-fg-secondary">{checklist.body}</p>
            </div>
            <div className="col-span-4 md:col-span-5 md:col-start-8">
              <EmailCapture source="home" tag="app-store-checklist" />
              <Link
                href="/free/app-store-checklist"
                className="mt-4 inline-flex font-mono text-label uppercase text-fg-muted transition-colors duration-150 hover:text-fg"
              >
                What&apos;s in it
              </Link>
            </div>
          </Grid>
        </Card>
      </Reveal>
    </Section>
  );
}
