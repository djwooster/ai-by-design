import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { MotionDemo } from "@/components/design/MotionDemo";
import { EmailCapture } from "@/components/forms/EmailCapture";
import { GeoIcon, iconNames } from "@/components/icons/GeoIcon";
import { IsoPhase } from "@/components/illustrations/IsoPhase";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Accordion } from "@/components/ui/Accordion";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { phases } from "@/lib/content/method";

/** Internal: the tokens and components in one place. Not linked, not indexed. */
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const colors = [
  { token: "--bg", note: "#05090A vampire black · base" },
  { token: "--surface", note: "#0E191E chinese black · cards" },
  { token: "--surface-2", note: "#152429 · raised" },
  { token: "--border", note: "Platinum 8%" },
  { token: "--border-strong", note: "Platinum 15%" },
  { token: "--text-primary", note: "#DFEAE8 platinum · 16.3:1" },
  { token: "--text-secondary", note: "#BBC9C7 jet stream · 11.7:1" },
  { token: "--text-muted", note: "#8A9997 · 6.8:1" },
  { token: "--accent", note: "#5AAEBB teal · the one accent · 7.8:1" },
  { token: "--accent-hover", note: "#6DBCC8 · button hover" },
  { token: "--accent-deep", note: "#0C525F deep teal · selection" },
  { token: "--paper", note: "#DFEAE8 platinum · light section" },
  { token: "--positive", note: "#9CC3A0 · live · 10.2:1" },
  { token: "--info", note: "#B8A5C6 · in review · 8.8:1" },
  { token: "--negative", note: "States only · 8.4:1" },
];

const type = [
  { name: "Hero", className: "text-hero", spec: "68px max · 500 · −0.04em" },
  { name: "Display", className: "text-display", spec: "56px max · 500 · −0.035em" },
  { name: "Title", className: "text-title", spec: "48px max · 500 · −0.032em" },
  { name: "Heading", className: "text-heading", spec: "19px · 500" },
  { name: "Lede", className: "text-lede", spec: "18px · 1.55" },
  { name: "Body", className: "text-body", spec: "16px · 1.6" },
  { name: "UI", className: "text-ui", spec: "14px" },
  { name: "UI small", className: "text-ui-sm", spec: "13px" },
];

const motion = [
  ["Rise", "Fade + 10px rise · 400ms · ease-glide"],
  ["Stagger", "40ms between list items"],
  ["Press", "Scale 0.97 · 150ms · ease-press"],
  ["Dictation", "Words fade in, in sequence · hero subline only"],
  ["Reduced motion", "All of it collapses to instant"],
];

function Swatch({ token, note }: { token: string; note: string }) {
  return (
    <div className="col-span-2 md:col-span-3">
      <div
        className="h-16 rounded-md border border-line"
        style={{ background: `var(${token})` }}
      />
      <p className="mt-2 font-mono text-ui-sm text-fg">{token}</p>
      <SpecLabel className="mt-0.5 normal-case tracking-normal">{note}</SpecLabel>
    </div>
  );
}

export default function DesignPage() {
  return (
    <>
      <PageHeader
        label="Internal · Design system"
        title="A precise instrument."
        lede="Tokens and components for ai-bydesign.dev. Dark first, one accent, hierarchy from scale, weight and tone."
      />

      <Section badge="Color" title="Cool blacks, platinum and one teal.">
        <Grid className="gap-y-8">
          {colors.map((color) => (
            <Swatch key={color.token} {...color} />
          ))}
        </Grid>
      </Section>

      <Section badge="Type" title="Geist, large and quiet.">
        <div className="divide-y divide-line border-y border-line">
          {type.map((style) => (
            <div key={style.name} className="grid grid-cols-4 gap-x-4 gap-y-2 py-6 md:grid-cols-12 md:gap-x-6">
              <div className="col-span-4 md:col-span-3">
                <SpecLabel>{style.name}</SpecLabel>
                <SpecLabel className="mt-1 normal-case tracking-normal">{style.spec}</SpecLabel>
              </div>
              <p className={`col-span-4 text-fg md:col-span-9 ${style.className}`}>
                Ship your app.
              </p>
            </div>
          ))}
          <div className="grid grid-cols-4 gap-x-4 gap-y-2 py-6 md:grid-cols-12 md:gap-x-6">
            <SpecLabel className="col-span-4 md:col-span-3">Spec label · Mono</SpecLabel>
            <SpecLabel className="col-span-4 md:col-span-9" parts={["Module 02", "Build", "6 lessons"]} />
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-2 py-6 md:grid-cols-12 md:gap-x-6">
            <SpecLabel className="col-span-4 md:col-span-3">Pill badge</SpecLabel>
            <div className="col-span-4 md:col-span-9">
              <Pill>FocusMode is in App Store review</Pill>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 gap-y-2 py-6 md:grid-cols-12 md:gap-x-6">
            <SpecLabel className="col-span-4 md:col-span-3">Tabular numbers</SpecLabel>
            <p className="col-span-4 font-mono text-ui text-fg md:col-span-9">$99 · $249 · 150 · 01:25:00</p>
          </div>
        </div>
      </Section>

      <Section badge="Components" title="Small, tight, no shadows.">
        <Grid className="gap-y-10">
          <div className="col-span-4 md:col-span-6">
            <SpecLabel>Buttons</SpecLabel>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <CTAButton placement="design" />
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6">
            <SpecLabel>Badges</SpecLabel>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge>Neutral</Badge>
              <Badge tone="accent">Founding</Badge>
              <Badge tone="info" dot>In App Store review</Badge>
              <Badge tone="positive" dot>Live</Badge>
              <Badge tone="negative">Sold out</Badge>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6">
            <SpecLabel>Email capture · source + tag</SpecLabel>
            <EmailCapture className="mt-4" source="design" tag="app-store-checklist" />
          </div>
          <div className="col-span-4 md:col-span-6">
            <SpecLabel>Card</SpecLabel>
            <Card className="mt-4">
              <SpecLabel parts={["06", "Proof", "Web app"]} />
              <p className="mt-6 text-heading text-fg">RE-IQ</p>
              <p className="mt-1 text-ui text-fg-secondary">Multifamily asset-management dashboard.</p>
            </Card>
          </div>
          <div className="col-span-4 md:col-span-12">
            <SpecLabel>Accordion</SpecLabel>
            <Accordion
              className="mt-4"
              defaultOpen={["m2"]}
              items={phases.slice(1, 3).flatMap((phase) =>
                phase.modules.map((module) => ({
                  id: `m${module.number}`,
                  title: module.title,
                  meta: `Module ${String(module.number).padStart(2, "0")} · ${phase.name} · ${module.lessons.length} lessons`,
                  content: (
                    <ol className="space-y-1.5">
                      {module.lessons.map((lesson) => (
                        <li key={lesson}>{lesson}</li>
                      ))}
                    </ol>
                  ),
                })),
              )}
            />
          </div>
        </Grid>
      </Section>

      <Section badge="Method illustrations" title="One drawing per phase.">
        <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {phases.map((phase, index) => (
            <StaggerItem key={phase.id} className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-heading text-fg">{phase.name}</p>
              <IsoPhase phase={phase.id} step={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section badge="Icons" title="Circles, arcs and lines.">
        <Grid className="gap-y-8">
          {iconNames.map((name) => (
            <div key={name} className="col-span-1 flex flex-col items-start gap-3 md:col-span-2">
              <span className="flex size-14 items-center justify-center rounded-lg border border-line bg-surface text-fg">
                <GeoIcon name={name} size={24} />
              </span>
              <SpecLabel>{name}</SpecLabel>
            </div>
          ))}
        </Grid>
      </Section>

      <Section paper badge="Paper" title="Platinum, used once or twice a page.">
        <Grid className="gap-y-8">
          <div className="col-span-4 md:col-span-6">
            <p className="text-body text-fg-secondary">
              The same semantic tokens, swapped for the light section, such as the guarantee.
              Black on platinum is 16.3:1, and the accent deepens to #0C525F (7.2:1).
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CTAButton placement="design-paper" />
              <Button variant="secondary">Secondary</Button>
              <Badge tone="accent">Active layer</Badge>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6">
            <Card>
              <SpecLabel parts={["Phase 03", "Build"]} />
              <p className="mt-6 text-heading text-fg">A card on paper</p>
              <p className="mt-1 text-ui text-fg-secondary">Surface, hairline, no shadow.</p>
            </Card>
          </div>
        </Grid>
      </Section>

      <Section badge="Motion" title="Graceful, then quiet.">
        <MotionDemo />
        <dl className="mt-10 divide-y divide-line border-y border-line">
          {motion.map(([name, spec]) => (
            <div key={name} className="grid grid-cols-4 gap-x-4 py-4 md:grid-cols-12 md:gap-x-6">
              <SpecLabel as="dt" className="col-span-4 md:col-span-3">
                {name}
              </SpecLabel>
              <dd className="col-span-4 text-ui text-fg-secondary md:col-span-9">{spec}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
