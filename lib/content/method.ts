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
  /** One line, for the curriculum. */
  description: string;
  /** Two or three sentences, for the Method cards. */
  body: string;
  /** What you'll have at the end of the phase. */
  outcome: string;
  modules: Module[];
};

// [TODO: confirm] Lesson titles are a first draft of the course outline.
export const phases: Phase[] = [
  {
    id: "vision",
    name: "Vision",
    description: "Decide what to build, who it's for and what done looks like, before anything else.",
    body: "Pick one app worth shipping and cut it down to the version you can finish. You leave with a one-page brief that every later phase, and every prompt, points back to.",
    outcome: "A one-page brief for an app worth shipping",
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
    body: "Map the flows, then design every screen your first version needs. You turn the look into a small design system, so Claude Code builds what you designed instead of guessing.",
    outcome: "Every screen designed and a design system",
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
    body: "Set up the project and the CLAUDE.md that keeps Claude Code on track, then build one screen at a time from your designs. Data, sign-in and subscriptions come last, once the app feels right.",
    outcome: "A working iPhone app",
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
    body: "Get the app onto real iPhones through TestFlight, yours and a few testers'. You learn to turn their feedback and crash reports into fixes Claude Code can make.",
    outcome: "A TestFlight build on real phones",
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
    body: "Build the App Store listing: screenshots, description, privacy details and review notes. Then submit, and know what to do whichever way App Review answers.",
    outcome: "Your app submitted to App Review",
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
    body: "Put the app in front of the people it was built for, from launch day onward. You set up the simple habits that keep it improving: listening to users, shipping updates, watching what works.",
    outcome: "A launch plan and your first users",
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
