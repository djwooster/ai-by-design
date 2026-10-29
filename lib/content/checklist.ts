/**
 * The free App Store submission checklist: what the opt-in page shows of it.
 * The full checklist is the PDF the email sequence sends (stage 5).
 */
export const checklistPage = {
  badge: "Free · App Store submission checklist",
  title: "Get your app through review.",
  accent: "through review.",
  lede: "[TODO: copy] The checklist I use to submit to the App Store, free in your inbox.",
  cta: "Send me the checklist",
  /** What people get, in three short lines beside the form. */
  promises: [
    "[TODO: copy] Every step, in the order you'll need it",
    "[TODO: copy] The review notes reviewers actually read",
    "[TODO: copy] Updated as Apple's rules change",
  ],
  confirmation: {
    title: "Check your inbox.",
    body: "[TODO: copy] The checklist is on its way. If it isn't there in a few minutes, look in promotions or spam.",
  },
};

export type ChecklistGroup = { id: string; name: string; note: string; items: string[] };

// [TODO: copy] Review the items against the real checklist before launch.
export const checklistGroups: ChecklistGroup[] = [
  {
    id: "accounts",
    name: "Accounts",
    note: "[TODO: copy] Before you build anything.",
    items: ["Apple Developer Program membership", "Agreements, tax and banking", "Bundle ID and capabilities"],
  },
  {
    id: "record",
    name: "App Store Connect",
    note: "[TODO: copy] The record your build attaches to.",
    items: ["App name and subtitle", "Category and age rating", "Pricing and availability"],
  },
  {
    id: "media",
    name: "Screenshots and preview",
    note: "[TODO: copy] What people see before they tap Get.",
    items: ["Screenshots for each required size", "App icon at every size", "Optional app preview video"],
  },
  {
    id: "privacy",
    name: "Privacy",
    note: "[TODO: copy] The part most first-timers skip.",
    items: ["Privacy policy URL", "App privacy details", "Permission prompts that explain themselves"],
  },
  {
    id: "build",
    name: "Build and TestFlight",
    note: "[TODO: copy] Ship a build you've tested.",
    items: ["Version and build numbers", "Archive and upload", "Test on a real device through TestFlight"],
  },
  {
    id: "review",
    name: "Review",
    note: "[TODO: copy] Help the reviewer say yes.",
    items: ["Review notes and a demo account", "Subscriptions submitted with the build", "A plan for a rejection"],
  },
];
