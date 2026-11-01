/**
 * The free 5-day email course: the opt-in page at /free/5-day-course. The
 * emails themselves are a Resend automation on the course segment.
 */
export const emailCourse = {
  label: "Free 5-day email course",
  title: "Go from app idea to a working build in five days.",
  accent: "five days.",
  lede: "In 5 short emails, learn the AI by Design Method: how a designer turns an idea into a real iPhone app with Claude Code, without being a developer first.",
  // [TODO: confirm] The three promises and the day titles match the emails you write.
  promises: [
    "Shrink your idea to a first version you can actually ship",
    "Get Claude Code building your first screen",
    "Know every step between a working build and the App Store",
  ],
  cta: "Send me Day 1",
  fineprint: "Day 1 arrives right away. After Day 5, you'll get the occasional email about the course. Unsubscribe anytime.",
  days: [
    { title: "The one-page brief", note: "Cut your idea down to a v1 you can finish." },
    { title: "Design before you build", note: "Screens and tokens Claude Code can follow." },
    { title: "Your first build", note: "Set up Claude Code and get a screen running." },
    { title: "On your own phone", note: "Test it on your iPhone, then with TestFlight." },
    { title: "The road to the App Store", note: "What review asks for, and how to get ready." },
  ],
  /** The band under the form: who the course is for. */
  fit: {
    title: "Made for designers with an idea and no engineering team.",
    accent: "an idea",
    label: "You're in the right place if…",
    items: [
      "You design apps for a living but have never shipped one of your own",
      "You have an app idea and no one to build it",
      "You've tried AI coding tools, but the result never looked like your design",
      "You want a real app in the App Store, not another prototype",
    ],
  },
  /** Meet DJ: a short video beside a hello. */
  about: {
    title: "Hi, I'm DJ. I spent years designing apps other people built.",
    accent: "DJ",
    body: "Banks, hospitals, EdTech platforms serving millions. Then Claude Code let me build my own. FocusMode is the one I'm taking to the App Store now, and these five emails are where that process starts.",
    videoLength: "[TODO: 0:00]",
  },
  confirmation: {
    title: "Day 1 is on its way.",
    body: "Check your inbox. If it isn't there in a few minutes, look in promotions or spam.",
  },
};
