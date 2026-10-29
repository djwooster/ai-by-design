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
    description: "[TODO: copy] Decide what to build, who it's for and what done looks like.",
    outcome: "[TODO: copy] A one-page brief for an app worth shipping",
    modules: [{ number: 1, title: "[TODO: copy] Pick an app worth shipping", lessons: lessons(4) }],
  },
  {
    id: "design",
    name: "Design",
    description: "[TODO: copy] Shape every screen before Claude Code writes a line.",
    outcome: "[TODO: copy] Every screen designed",
    modules: [
      { number: 2, title: "[TODO: copy] Flows and wireframes", lessons: lessons(5) },
      { number: 3, title: "[TODO: copy] A design system Claude Code can follow", lessons: lessons(4) },
    ],
  },
  {
    id: "build",
    name: "Build",
    description: "[TODO: copy] Build the app with Claude Code, screen by screen, from your designs.",
    outcome: "[TODO: copy] A working iPhone app",
    modules: [
      { number: 4, title: "[TODO: copy] Set up the project and CLAUDE.md", lessons: lessons(4) },
      { number: 5, title: "[TODO: copy] Build the core screens", lessons: lessons(6) },
      { number: 6, title: "[TODO: copy] Data, subscriptions and the Live Activity", lessons: lessons(5) },
    ],
  },
  {
    id: "test",
    name: "Test",
    description: "[TODO: copy] Put it on real phones with TestFlight and fix what breaks.",
    outcome: "[TODO: copy] A TestFlight build on real phones",
    modules: [{ number: 7, title: "[TODO: copy] TestFlight and real-device testing", lessons: lessons(4) }],
  },
  {
    id: "ship",
    name: "Ship",
    description: "[TODO: copy] Submit to the App Store and get through review.",
    outcome: "[TODO: copy] A submission through App Review",
    modules: [{ number: 8, title: "[TODO: copy] Listing, screenshots and submission", lessons: lessons(5) }],
  },
  {
    id: "launch",
    name: "Launch",
    description: "[TODO: copy] Put it in front of people and keep it growing.",
    outcome: "[TODO: copy] A live listing and your first users",
    modules: [{ number: 9, title: "[TODO: copy] Your first users", lessons: lessons(4) }],
  },
];

export const phaseNumber = (index: number) => String(index + 1).padStart(2, "0");
