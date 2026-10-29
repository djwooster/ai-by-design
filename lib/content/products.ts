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

export const products: Product[] = [
  {
    slug: "app-store-submission-playbook",
    name: "App Store Submission Playbook",
    summary: "[TODO: copy] Every step from a finished build to an approved listing.",
    description:
      "[TODO: copy] The playbook I wrote while submitting FocusMode: the accounts, the App Store Connect record, screenshots, privacy details and what to say to the reviewer, in the order you'll need them.",
    priceRange: [19, 39],
    price: null,
    format: "PDF guide",
    icon: "playbook",
    cover: "playbook",
    includes: [
      { name: "[TODO: copy] Accounts and agreements", note: "[TODO: copy] What to set up before you build" },
      { name: "[TODO: copy] The App Store Connect record", note: "[TODO: copy] Every field, filled in" },
      { name: "[TODO: copy] Screenshots and preview", note: "[TODO: copy] Sizes and what reviewers expect" },
      { name: "[TODO: copy] Privacy and review notes", note: "[TODO: copy] Templates you can copy" },
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
    summary: "[TODO: copy] The prompts and project setups DJ uses on real builds.",
    description:
      "[TODO: copy] The CLAUDE.md files, prompts and working agreements behind FocusMode, RE-IQ and Coast Gallery, cleaned up so you can drop them into your own project.",
    priceRange: [19, 49],
    price: null,
    format: "Markdown files",
    icon: "prompt",
    cover: "prompts",
    includes: [
      { name: "[TODO: copy] CLAUDE.md templates", note: "[TODO: copy] For iOS, web and design-system projects" },
      { name: "[TODO: copy] Phase prompts", note: "[TODO: copy] One set per phase of the Method" },
      { name: "[TODO: copy] Review prompts", note: "[TODO: copy] For checking Claude Code's work" },
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
    summary: "[TODO: copy] A ready-to-ship app skeleton, set up for Claude Code.",
    description:
      "[TODO: copy] An Expo app with navigation, design tokens, subscriptions and the App Store build settings already in place, plus the CLAUDE.md that keeps Claude Code inside its lines.",
    priceRange: [49, 149],
    price: null,
    format: "Code repository",
    icon: "kit",
    cover: "kit",
    includes: [
      { name: "[TODO: copy] The app skeleton", note: "[TODO: copy] Navigation, tokens and screens" },
      { name: "[TODO: copy] Subscriptions", note: "[TODO: copy] Paywall and purchase flow" },
      { name: "[TODO: copy] Build settings", note: "[TODO: copy] Ready for TestFlight and review" },
      { name: "[TODO: copy] CLAUDE.md", note: "[TODO: copy] Rules written for this codebase" },
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
