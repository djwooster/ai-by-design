/**
 * Homepage copy and section order. Reorder or remove sections in
 * `homeSections`; each section's component lives in components/home/.
 */
export type HomeSectionId =
  | "why-now"
  | "method"
  | "build"
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
  "build",
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
  headline: ["Ship your app to the App Store.", "Built with Claude Code."],
  subline:
    "[TODO: copy] I design, build and ship real software with AI. Become a founding member and learn the exact process I'm using to launch FocusMode.",
  video: {
    src: null as string | null, // [TODO: video]
    label: "[TODO: copy] Watch: how I built and submitted FocusMode",
    length: "[TODO: length]",
  },
};

export const whyNow = {
  statement:
    "Two years ago, shipping an iOS app meant learning Swift or hiring a developer for $20K+.",
  turn: "Now a designer with Claude Code can ship one in weeks. I just did.",
  then: ["Learn Swift, or hire a developer", "$20K+ before launch", "Months of back and forth"],
  now: ["Design it, then direct Claude Code", "A Mac and a Claude subscription", "Weeks, idea to App Store"],
};

export const build = {
  title: "[TODO: copy] Your own productivity app, live on the App Store.",
  body: "[TODO: copy] Not a tutorial clone. You'll design, build and ship an app of your own, one phase at a time, ending with a real listing people can download.",
  milestones: [
    { phase: "vision", outcome: "[TODO: copy] A one-page app brief" },
    { phase: "design", outcome: "[TODO: copy] Every screen designed" },
    { phase: "build", outcome: "[TODO: copy] A working iPhone app" },
    { phase: "test", outcome: "[TODO: copy] A TestFlight build on real phones" },
    { phase: "ship", outcome: "[TODO: copy] A submission through App Review" },
    { phase: "launch", outcome: "[TODO: copy] A live listing and first users" },
  ],
} as const;

export const live = {
  title: "[TODO: copy] You won't build alone.",
  body: "[TODO: copy] From January 1, 2027, two live calls a week with DJ, plus the community in Skool between them.",
  schedule: "[TODO: days and times]",
  formats: [
    {
      icon: "live",
      name: "Q&A",
      body: "[TODO: copy] Bring the thing you're stuck on. Leave with the next step.",
    },
    {
      icon: "test",
      name: "App reviews",
      body: "[TODO: copy] Members' apps, reviewed live: design, build and App Store readiness.",
    },
    {
      icon: "build",
      name: "Live builds",
      body: "[TODO: copy] Watch DJ build with Claude Code in real time, mistakes included.",
    },
  ],
  community: {
    name: "The community, in Skool",
    body: "[TODO: copy] Ask questions, share progress and get feedback from other members shipping their apps.",
  },
} as const;

export const instructor = {
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

export const fit = {
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

export const foundingPerks = [
  "[TODO: copy] The founding price, locked in for good",
  "[TODO: copy] A say in the curriculum while it's being built",
  "[TODO: copy] First access to every new module",
];

export const checklist = {
  title: "[TODO: copy] Not ready yet? Get the App Store submission checklist.",
  body: "[TODO: copy] Every step between a finished build and a live listing, free in your inbox.",
};

export const finalCta = {
  title: ["[TODO: copy] Your app could be next.", "Become a founding member."],
};
