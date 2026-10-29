import type { IconName } from "@/components/icons/GeoIcon";

export type Product = {
  slug: string;
  name: string;
  summary: string;
  /** A paragraph for the product page. */
  description: string;
  /** The planned range from the brief; `price` is the real one once it's set. */
  priceRange: [number, number];
  price: number | null; // [TODO: price]
  format: string;
  icon: IconName;
  /** Which cover drawing the card and product page show. */
  cover: "playbook" | "prompts" | "kit";
  /** What's inside, one row each. */
  includes: { name: string; note: string }[];
  /** Short spec rows under the price, e.g. ["Pages", "[TODO]"]. */
  specs: [string, string][];
  /** The file's pathname in the private Blob store, and the name it downloads as. */
  file: { pathname: string; filename: string };
};

// [TODO: confirm] Each product's description, includes and specs say what it contains. Check them against the real files.
export const products: Product[] = [
  {
    slug: "app-store-submission-playbook",
    name: "App Store Submission Playbook",
    summary: "Every step from a finished build to a submitted app.",
    description:
      "The playbook I wrote while submitting FocusMode: the accounts, the App Store Connect record, screenshots, privacy details and what to say to the reviewer, in the order you'll need them.",
    priceRange: [19, 39],
    price: null,
    format: "PDF guide",
    icon: "playbook",
    cover: "playbook",
    includes: [
      { name: "Accounts and agreements", note: "What to set up before you build" },
      { name: "The App Store Connect record", note: "Every field, filled in" },
      { name: "Screenshots and preview", note: "Sizes, and what reviewers expect" },
      { name: "Privacy and review notes", note: "Templates you can copy" },
    ],
    specs: [
      ["Format", "PDF"],
      ["Pages", "[TODO]"],
    ],
    file: { pathname: "products/app-store-submission-playbook.pdf", filename: "App Store Submission Playbook.pdf" }, // [TODO: upload]
  },
  {
    slug: "claude-code-prompt-pack",
    name: "Claude Code Prompt and CLAUDE.md Pack",
    summary: "The prompts and project setups I use on real builds.",
    description:
      "The CLAUDE.md files, prompts and working agreements behind FocusMode, RE-IQ and Coast Gallery, cleaned up so you can drop them into your own project.",
    priceRange: [19, 49],
    price: null,
    format: "Markdown files",
    icon: "prompt",
    cover: "prompts",
    includes: [
      { name: "CLAUDE.md templates", note: "For iOS, web and design-system projects" },
      { name: "Phase prompts", note: "One set for each phase of the Method" },
      { name: "Review prompts", note: "For checking Claude Code's work" },
    ],
    specs: [
      ["Format", "Markdown"],
      ["Files", "[TODO]"],
    ],
    file: { pathname: "products/claude-code-prompt-pack.zip", filename: "Claude Code Prompt Pack.zip" }, // [TODO: upload]
  },
  {
    slug: "react-native-starter-kit",
    name: "React Native and Claude Code Starter Kit",
    summary: "A ready-to-build app skeleton, set up for Claude Code.",
    description:
      "An Expo app with navigation, design tokens, subscriptions and the App Store build settings already in place, plus the CLAUDE.md that keeps Claude Code inside its lines.",
    priceRange: [49, 149],
    price: null,
    format: "Code repository",
    icon: "kit",
    cover: "kit",
    includes: [
      { name: "The app skeleton", note: "Navigation, tokens and screens" },
      { name: "Subscriptions", note: "Paywall and purchase flow" },
      { name: "Build settings", note: "Ready for TestFlight and review" },
      { name: "CLAUDE.md", note: "Rules written for this codebase" },
    ],
    specs: [
      ["Format", "Git repository"],
      ["Stack", "[TODO] Expo, TypeScript"],
    ],
    file: { pathname: "products/react-native-starter-kit.zip", filename: "React Native Starter Kit.zip" }, // [TODO: upload]
  },
];

/** How every product arrives: Stripe Checkout, then an email with a download link that expires. */
const LINK_DAYS = 7;

export const delivery = {
  how: "Instant download by email",
  /** How long a download link works. */
  linkDays: LINK_DAYS,
  note: `The download link arrives the moment you pay and works for ${LINK_DAYS} days.`,
};

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** The price, or the planned range until it's set. */
export function productPrice(product: Product, format: (n: number) => string) {
  return product.price !== null
    ? format(product.price)
    : `${format(product.priceRange[0])}–${format(product.priceRange[1])}`;
}
