import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

/** AI crawlers are named and welcome: being cited by LLMs is one of the site's jobs. */
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"];
const disallow = ["/go/", "/api/", "/design", "/shop/thanks"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
