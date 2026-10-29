/**
 * The AI by Design Method: six phases, in order. The curriculum is grouped by
 * phase, so modules live here with the phase they belong to.
 */
export type Module = {
  number: number;
  title: string;
  lessons: string[];
};

export type Phase = {
  id: "vision" | "design" | "build" | "test" | "ship" | "launch";
  name: string;
  description: string;
  /** What you'll have at the end of the phase. */
  outcome: string;
  modules: Module[];
};

const lessons = (count: number) =>
  Array.from({ length: count }, (_, i) => `[TODO: copy] Lesson ${i + 1}`);

export const phases: Phase[] = [
  {
    id: "vision",
    name: "Vision",
    description: "Decide what to build, who it's for and what done looks like, before anything else.",
    outcome: "A one-page brief for an app worth shipping",
    modules: [{ number: 1, title: "Pick an app worth shipping", lessons: lessons(4) }],
  },
  {
    id: "design",
    name: "Design",
    description: "Shape every screen before Claude Code writes a line.",
    outcome: "Every screen designed and a design system",
    modules: [
      { number: 2, title: "Flows and wireframes", lessons: lessons(5) },
      { number: 3, title: "A design system Claude Code can follow", lessons: lessons(4) },
    ],
  },
  {
    id: "build",
    name: "Build",
    description: "Build the app with Claude Code, screen by screen, from your designs.",
    outcome: "A working iPhone app",
    modules: [
      { number: 4, title: "Set up the project and CLAUDE.md", lessons: lessons(4) },
      { number: 5, title: "Build the core screens", lessons: lessons(6) },
      { number: 6, title: "Data, subscriptions and native details", lessons: lessons(5) },
    ],
  },
  {
    id: "test",
    name: "Test",
    description: "Put it on real phones with TestFlight and fix what breaks.",
    outcome: "A TestFlight build on real phones",
    modules: [{ number: 7, title: "TestFlight and real-device testing", lessons: lessons(4) }],
  },
  {
    id: "ship",
    name: "Ship",
    description: "Prepare the listing and submit it to App Review.",
    outcome: "Your app submitted to App Review",
    modules: [{ number: 8, title: "Listing, screenshots and submission", lessons: lessons(5) }],
  },
  {
    id: "launch",
    name: "Launch",
    description: "Put it in front of people and keep it growing.",
    outcome: "A launch plan and your first users",
    modules: [{ number: 9, title: "Your first users", lessons: lessons(4) }],
  },
];

export const phaseNumber = (index: number) => String(index + 1).padStart(2, "0");
