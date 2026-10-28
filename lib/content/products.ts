export type Product = {
  slug: string;
  name: string;
  summary: string;
  /** The planned range from the brief; `price` is the real one once it's set. */
  priceRange: [number, number];
  price: number | null; // [TODO: price]
  format: string;
};

export const products: Product[] = [
  {
    slug: "app-store-submission-playbook",
    name: "App Store Submission Playbook",
    summary: "[TODO: copy] Every step from a finished build to an approved listing.",
    priceRange: [19, 39],
    price: null,
    format: "PDF guide",
  },
  {
    slug: "claude-code-prompt-pack",
    name: "Claude Code Prompt and CLAUDE.md Pack",
    summary: "[TODO: copy] The prompts and project setups DJ uses on real builds.",
    priceRange: [19, 49],
    price: null,
    format: "Markdown files",
  },
  {
    slug: "react-native-starter-kit",
    name: "React Native and Claude Code Starter Kit",
    summary: "[TODO: copy] A ready-to-ship app skeleton, set up for Claude Code.",
    priceRange: [49, 149],
    price: null,
    format: "Code repository",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
