/**
 * Homepage copy and section order. Reorder or remove sections in
 * `homeSections`; each section's component lives in components/home/.
 * Headlines take one `accent`: the word or phrase set in the accent color.
 */
export type HomeSectionId =
  | "why-now"
  | "method"
  | "curriculum"
  | "live"
  | "proof"
  | "instructor"
  | "offer"
  | "guarantee"
  | "fit"
  | "faq"
  | "checklist"
  | "final";

export const homeSections: HomeSectionId[] = [
  "why-now",
  "method",
  "curriculum",
  "live",
  "proof",
  "instructor",
  "offer",
  "guarantee",
  "fit",
  "faq",
  "checklist",
  "final",
];

export const hero = {
  badge: "FocusMode is in App Store review",
  headline: ["Ship your app to the App Store.", "Built with Claude Code."],
  subline:
    "[TODO: copy] I design, build and ship real software with AI. Become a founding member and learn the exact process I'm using to launch FocusMode.",
  videoLength: "[TODO: 0:00]",
  trust: ["Full refund if it doesn't launch", "2 live calls a week", "Starts Jan 1, 2027"],
};

export const whyNow = {
  badge: "Why now",
  title: "Shipping an app used to take a team. Now it takes weeks.",
  accent: "weeks",
  body: "Two years ago, shipping an iOS app meant learning Swift or hiring a developer for $20K+. Now a designer with Claude Code can ship one in weeks. I just did.",
  cards: [
    { spot: "hire-dev", era: "Then", title: "Learn Swift, or hire a developer", note: "Months of learning, or $20K+ before launch" },
    { spot: "claude-code", era: "Now", title: "Design it. Build it with Claude Code.", note: "Idea to App Store in weeks" },
  ],
} as const;

export const method = {
  badge: "The AI by Design Method",
  title: "Six phases from idea to the App Store.",
  accent: "App Store",
  lede: "[TODO: copy] You'll build one productivity app of your own, one phase at a time. Each phase ends with something real in your hands.",
};

export const curriculum = {
  badge: "Curriculum",
  title: "Everything, in the order you'll need it.",
  accent: "in the order",
  lede: "[TODO: copy] Self-paced lessons in Skool, grouped by the six phases of the Method.",
};

export const live = {
  badge: "Live calls and community",
  title: "You won't build alone.",
  accent: "alone",
  lede: "[TODO: copy] From January 1, 2027: two live calls a week with DJ, all recorded, and the community in Skool between them.",
  cards: [
    {
      id: "qa",
      name: "Live Q&A",
      body: "[TODO: copy] Bring the thing you're stuck on. Leave with the next step.",
    },
    {
      id: "reviews",
      name: "App reviews",
      body: "[TODO: copy] Members' apps, reviewed live for design, build quality and App Store readiness.",
    },
    {
      id: "builds",
      name: "Live builds",
      body: "[TODO: copy] Watch DJ build with Claude Code in real time, mistakes included.",
    },
    {
      id: "community",
      name: "The community",
      body: "[TODO: copy] Ask questions, share progress and get feedback in Skool, any day of the week.",
    },
  ],
} as const;

export const proofSection = {
  badge: "Proof",
  title: "Real software, built the way you'll learn.",
  accent: "Real software",
  lede: "Everything DJ teaches comes from shipping these with Claude Code.",
};

export const instructor = {
  badge: "Your instructor",
  name: "DJ Wooster",
  role: "Product designer and builder",
  bio: "[TODO: copy] I've spent my career designing products for large organizations. Now I build my own with Claude Code, in public, and FocusMode is the one I'm taking to the App Store right now.",
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
      body: "[TODO: copy] Become a founding member for $99. Your price is locked in, and you get in before anyone else.",
    },
    {
      name: "Start January 1, 2027",
      body: "[TODO: copy] The course opens in Skool, and the two live calls a week begin.",
    },
    {
      name: "Ship your app",
      body: "[TODO: copy] Work through the six phases with DJ and the community until your app is on the App Store.",
    },
  ],
  perks: [
    "[TODO: copy] The founding price, locked in for good",
    "[TODO: copy] A say in the curriculum while it's being built",
    "[TODO: copy] First access to every new module",
  ],
};

export const fit = {
  badge: "Who it's for",
  title: "Built for people with an idea and no engineering team.",
  accent: "an idea",
  for: [
    "[TODO: copy] Designers who want to ship what they design",
    "[TODO: copy] Aspiring founders with an app idea and no engineering team",
    "[TODO: copy] Semi-technical builders who have started apps but never shipped one",
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
  body: "[TODO: copy] Every step between a finished build and a live listing, free in your inbox.",
};

export const finalCta = {
  title: "[TODO: copy] Your app could be next.",
  accent: "next",
  body: "[TODO: copy] Join as a founding member and ship it with Claude Code.",
};
