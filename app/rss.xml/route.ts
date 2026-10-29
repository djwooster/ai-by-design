import { posts } from "@/lib/content/posts";
import { site } from "@/lib/content/site";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The blog's RSS feed: published posts only, newest first. */
export function GET() {
  const items = posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const link = `${site.url}/blog/${post.slug}`;
      return `<item><title>${escape(post.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate><description>${escape(post.summary)}</description></item>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${escape(site.name)} · Blog</title><link>${site.url}/blog</link><description>${escape(site.description)}</description><language>en-us</language>${items.join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
