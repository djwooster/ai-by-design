/**
 * Blog post index: title, summary and date for each post. Bodies are MDX in
 * `content/blog` (see `postBodies.ts`). Drafts are listed but noindex.
 */
export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  /** Shown as the post's topic, e.g. "Build log". */
  topic: string;
  draft: boolean;
};

export const posts: Post[] = [
  {
    slug: "shipping-focusmode-with-claude-code",
    title: "[TODO: copy] Shipping FocusMode with Claude Code",
    summary: "[TODO: copy] What it took to take a designer's app to App Store review.",
    date: "2026-11-01",
    topic: "Build log",
    draft: true,
  },
  {
    slug: "app-store-review-what-to-expect",
    title: "[TODO: copy] App Store review: what to expect",
    summary: "[TODO: copy] The submission steps that trip first-time builders up.",
    date: "2026-11-08",
    topic: "App Store",
    draft: true,
  },
  {
    slug: "claude-md-for-designers",
    title: "[TODO: copy] A CLAUDE.md for designers",
    summary: "[TODO: copy] How to set up a project so Claude Code builds what you designed.",
    date: "2026-11-15",
    topic: "Claude Code",
    draft: true,
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** "2026-11-01" → "Nov 1, 2026", read as a calendar date (no time zone shift). */
export function formatDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
