import type { MDXContent } from "mdx/types";

/**
 * Each post's MDX body, by slug. Add a post by adding its file in
 * `content/blog` and an entry here, then its metadata in `posts.ts`.
 */
export const postBodies: Record<string, () => Promise<{ default: MDXContent }>> = {
  "shipping-focusmode-with-claude-code": () => import("@/content/blog/shipping-focusmode-with-claude-code.mdx"),
  "app-store-review-what-to-expect": () => import("@/content/blog/app-store-review-what-to-expect.mdx"),
  "claude-md-for-designers": () => import("@/content/blog/claude-md-for-designers.mdx"),
};
