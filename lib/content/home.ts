/**
 * Homepage copy and section order. Reorder or remove sections in
 * `homeSections`; each section's component lives in components/home/.
 * Headlines take one `accent`: the word or phrase set in the accent color.
 */
export type HomeSectionId =
  | "why-now"
  | "method"
  | "live"
  | "proof"
  | "instructor"
  | "offer"
  | "fit"
  | "faq"
  | "checklist"
  | "final";

export const homeSections: HomeSectionId[] = [
  "why-now",
  "method",
  "live",
  "proof",
  "instructor",
  "offer",
  "fit",
  "faq",
  "checklist",
  "final",
];

export const hero = {
  headline: ["Ship your app to the App Store.", "Built with Claude Code."],
  subline:
    "I design, build and ship real software with AI. My app is in App Store review right now. Become a founding member and learn the exact process I used.",
  videoLength: "[TODO: 0:00]",
  trust: ["2 live calls a week", "Starts Jan 1, 2027"],
};

export const whyNow = {
  badge: "Why now",
  title: ["Apps used to take a team.", "Now they take weeks."],
  accent: "weeks",
  body: "Two years ago, shipping an iOS app meant learning Swift or hiring a developer for $20K+. Now a designer with Claude Code can ship one in weeks. I just did.",
  compare: [
    { era: "Then", text: "Learn Swift, or pay a developer $20K+" },
    { era: "Now", text: "Design it, build it with Claude Code, ship in weeks" },
  ],
} as const;

export const method = {
  title: "The AI by Design Method",
  /** Three lines, read in order: the problem, what the Method does, where you end up. */
  lines: [
    "Most app ideas stall somewhere between the design and the App Store.",
    "The Method breaks the trip into six phases, each one built with Claude Code.",
    "Every phase ends with something real in your hands. The last ends with your app in review.",
  ],
};

export const live = {
  badge: "Live calls and community",
  title: "You won't build alone.",
  accent: "alone",
  lede: "From January 1, 2027: two live calls a week with me, every one recorded, and the community in Skool between them.",
  cards: [
    {
      id: "qa",
      name: "Live Q&A",
      body: "Bring the thing you're stuck on. Leave with the next step.",
    },
    {
      id: "reviews",
      name: "App reviews",
      body: "Your app on the big screen, reviewed for design, build quality and App Store readiness.",
    },
    {
      id: "builds",
      name: "Live builds",
      body: "Watch me build with Claude Code in real time, mistakes included.",
    },
    {
      id: "community",
      name: "The community",
      body: "Ask questions, share progress and get feedback in Skool, any day of the week.",
    },
  ],
} as const;

export const proofSection = {
  badge: "What I've built",
  title: "Real software, built the way you'll learn.",
  accent: "Real software",
  lede: "Everything DJ teaches comes from shipping these with Claude Code.",
};

export const instructor = {
  badge: "Your instructor",
  name: "DJ Wooster",
  role: "Product designer and builder",
  bio: "I've spent my career designing products for banks, hospitals, utilities and EdTech platforms serving millions. Now I build my own with Claude Code, in public. FocusMode is the one I'm taking to the App Store right now, and this course is the process I used, written down.",
  experience: [
    { org: "US Bank", note: null },
    { org: "Memorial Sloan Kettering", note: null },
    { org: "National Grid", note: null },
    { org: "Inbound Health", note: "Founding product designer" },
    { org: "Riverside Insights", note: "EdTech serving millions" },
  ],
  photo: null as string | null, // [TODO: photo]
};

export const offerSection = {
  badge: "Founding offer",
  title: "Join early. Pay the founding price.",
  accent: "founding price",
  steps: [
    {
      name: "Join now",
      body: "Become a founding member for $99, before the price goes to $249. [TODO: confirm] one payment, or a Skool subscription?",
    },
    {
      name: "Start January 1, 2027",
      body: "The course opens in Skool and the live calls begin, twice a week.",
    },
    {
      name: "Ship your app",
      body: "Work through the six phases with me and the community until your app is submitted to the App Store.",
    },
  ],
  perks: [
    "[TODO: confirm] The founding price, kept for as long as you stay",
    "[TODO: confirm] A say in the curriculum while it's being built",
    "[TODO: confirm] First access to every new module",
  ],
};

export const fit = {
  badge: "Who it's for",
  title: "Built for people with an idea and no engineering team.",
  accent: "an idea",
  for: [
    "Designers who are tired of handing off and want to ship what they design",
    "Aspiring founders with an app idea and no engineering team",
    "Semi-technical builders with a folder of half-finished apps and none in the App Store",
  ],
  notFor: [
    "People looking for a no-code, drag-and-drop tool",
    "Experienced iOS engineers",
    "Anyone wanting a get-rich-quick app",
  ],
};

export const faqSection = {
  badge: "FAQ",
  title: "Questions, answered.",
};

export const checklist = {
  badge: "Free",
  title: "Not ready yet? Get the App Store submission checklist.",
  accent: "checklist",
  body: "Every step between a finished build and a submitted app, in the order you'll need them. Free, in your inbox.",
};

export const finalCta = {
  title: "Your app could be in review next.",
  accent: "in review next.",
  body: "Join as a founding member, follow the Method, and ship it with Claude Code.",
};
