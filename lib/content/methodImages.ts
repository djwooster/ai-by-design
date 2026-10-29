import type { Phase } from "@/lib/content/method";

/**
 * Concept B's image for each phase: a dark, premium UI scene made in ChatGPT
 * (1536×1024). Drop each file in public/images/method-ui/ under the phase's id;
 * a missing one shows a placeholder.
 */
export const methodImageSrc = (phase: Phase["id"]) => `/images/method-ui/${phase}.png`;

export const methodImageAlt: Record<Phase["id"], string> = {
  vision: "A one-page product brief for a focus timer app",
  design: "A design canvas with a user flow of three screens and a pen-tool path",
  build: "Claude Code building a timer screen beside a live iPhone preview",
  test: "A TestFlight build with testers and their feedback",
  ship: "An App Store submission moving from prepared to in review",
  launch: "An App Store product page with a Get button and screenshots",
};
