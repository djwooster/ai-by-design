/**
 * The AI by Design Method: six phases, in order. Each phase's modules and
 * lessons live with it; the homepage shows its outcomes, and llms.txt lists
 * the full syllabus.
 */
export type Module = {
  number: number;
  title: string;
  lessons: string[];
};

export type Phase = {
  id: "vision" | "design" | "build" | "test" | "ship" | "launch";
  name: string;
  /** One line on what you do in the phase. */
  description: string;
  /** What you'll have when the phase is done, in two short sentences: the Method card's text. */
  outcome: string;
  modules: Module[];
};

// [TODO: confirm] Lesson titles are a first draft of the course outline.
export const phases: Phase[] = [
  {
    id: "vision",
    name: "Vision",
    description: "Decide what to build, who it's for and what done looks like, before anything else.",
    outcome: "A one-page brief for an app you'd use every day, cut to a version 1 you can finish. Every prompt after this points back to it.",
    modules: [
      {
        number: 1,
        title: "Pick an app worth shipping",
        lessons: ["Ideas you'd use every day", "Who it's for, in one sentence", "Cutting it to a version 1", "Writing the one-page brief"],
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    description: "Shape every screen before Claude Code writes a line.",
    outcome: "Every screen of version 1, designed, and a small design system to go with it. Claude Code builds from it instead of guessing.",
    modules: [
      {
        number: 2,
        title: "Flows and wireframes",
        lessons: ["Mapping the core flow", "Wireframes in an afternoon", "Designing for iOS conventions", "Empty, loading and error states", "Prototyping on your phone"],
      },
      {
        number: 3,
        title: "A design system Claude Code can follow",
        lessons: ["Color, type and spacing tokens", "The handful of components you need", "Writing tokens down as code", "Handing off to Claude Code"],
      },
    ],
  },
  {
    id: "build",
    name: "Build",
    description: "Build the app with Claude Code, screen by screen, from your designs.",
    outcome: "A working iPhone app, built screen by screen from your designs. Data, sign-in and subscriptions included.",
    modules: [
      {
        number: 4,
        title: "Set up the project and CLAUDE.md",
        lessons: ["Installing the tools", "Starting the project", "Your first CLAUDE.md", "A working loop: prompt, review, commit"],
      },
      {
        number: 5,
        title: "Build the core screens",
        lessons: ["The first screen, end to end", "Navigation between screens", "Forms and input", "Motion and haptics", "Reviewing Claude Code's work", "When Claude Code gets it wrong"],
      },
      {
        number: 6,
        title: "Data, subscriptions and native details",
        lessons: ["Saving data on the device", "Sync and sign-in", "Subscriptions and a paywall", "Notifications", "Widgets and other native touches"],
      },
    ],
  },
  {
    id: "test",
    name: "Test",
    description: "Put it on real phones with TestFlight and fix what breaks.",
    outcome: "Your app on real phones through TestFlight. Testers' feedback and crash reports, turned into fixes.",
    modules: [
      {
        number: 7,
        title: "TestFlight and real-device testing",
        lessons: ["Your first TestFlight build", "Inviting testers", "Turning feedback into fixes", "Performance and crash reports"],
      },
    ],
  },
  {
    id: "ship",
    name: "Ship",
    description: "Prepare the listing and submit it to App Review.",
    outcome: "A complete App Store listing, submitted to App Review. And a plan for whichever answer comes back.",
    modules: [
      {
        number: 8,
        title: "Listing, screenshots and submission",
        lessons: ["The App Store Connect record", "Screenshots that sell", "Privacy details and permissions", "Review notes and submitting", "If App Review says no"],
      },
    ],
  },
  {
    id: "launch",
    name: "Launch",
    description: "Put it in front of people and keep it growing.",
    outcome: "Your first users, and an App Store page that works like a landing page. Then the habit of shipping updates.",
    modules: [
      {
        number: 9,
        title: "Your first users",
        lessons: ["A launch-day plan", "Your App Store page as a landing page", "Listening to your first users", "Shipping updates"],
      },
    ],
  },
];

export const phaseNumber = (index: number) => String(index + 1).padStart(2, "0");
