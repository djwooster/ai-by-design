"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { DictatedText } from "@/components/motion/DictatedText";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { formatPrice } from "@/lib/content/offer";

/** Internal: each motion primitive with a replay, for the /design page. */
export function MotionDemo() {
  const [run, setRun] = useState(0);
  const [launch, setLaunch] = useState(false);

  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
      <Card className="col-span-4 md:col-span-6">
        <div className="flex items-center justify-between">
          <SpecLabel parts={["Rise", "Stagger 40ms"]} />
          <Button size="sm" variant="ghost" onClick={() => setRun((n) => n + 1)}>
            Replay
          </Button>
        </div>
        <Stagger key={run} as="ul" className="mt-6 space-y-2">
          {["Vision", "Design", "Build", "Test"].map((name) => (
            <StaggerItem key={name} as="li" className="rounded-md border border-line px-3 py-2 text-ui text-fg">
              {name}
            </StaggerItem>
          ))}
        </Stagger>
      </Card>

      <Card className="col-span-4 md:col-span-6">
        <div className="flex items-center justify-between">
          <SpecLabel parts={["Dictation", "Hero subline only"]} />
          <Button size="sm" variant="ghost" onClick={() => setRun((n) => n + 1)}>
            Replay
          </Button>
        </div>
        <DictatedText
          key={run}
          className="mt-6 text-body text-fg-secondary"
          text="I design, build and ship real software with AI. Learn the exact process I'm using to launch FocusMode."
        />
      </Card>

      <Card className="col-span-4 md:col-span-6">
        <div className="flex items-center justify-between">
          <SpecLabel parts={["Number", launch ? "At launch" : "Founding"]} />
          <Button size="sm" variant="secondary" onClick={() => setLaunch((v) => !v)}>
            {launch ? "Show founding" : "Show launch"}
          </Button>
        </div>
        <AnimatedNumber
          value={launch ? 249 : 99}
          format={(n) => formatPrice(Math.round(n))}
          className="mt-6 block font-mono text-title text-fg"
        />
      </Card>

      <Reveal key={run} className="col-span-4 md:col-span-6">
        <Card className="h-full">
          <SpecLabel parts={["Reveal", "Fade + 10px rise", "400ms"]} />
          <p className="mt-6 text-ui text-fg-secondary">
            Sections and cards rise into place once, the first time they scroll into view.
          </p>
        </Card>
      </Reveal>
    </div>
  );
}
