import { faq } from "@/lib/content/faq";
import { phases } from "@/lib/content/method";
import { formatPrice, offer } from "@/lib/content/offer";
import { posts } from "@/lib/content/posts";
import { products } from "@/lib/content/products";
import { focusModeStatusLabel, focusModeStatus } from "@/lib/content/proof";
import { site } from "@/lib/content/site";

/** A plain summary of the site for LLMs (llmstxt.org), built from the same content as the pages. */
export function GET() {
  const url = (path: string) => `${site.url}${path}`;
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is ${site.author}'s school. Its course, ${offer.course}, teaches designers and builders to ${offer.promise.charAt(0).toLowerCase()}${offer.promise.slice(1)}`,
    "",
    "## The course",
    "",
    `- [${offer.course}](${url("/")}): ${formatPrice(offer.foundingPrice)} for the first ${offer.foundingSpots.total} founding members, ${formatPrice(offer.launchPrice)} at launch on January 1, 2027.`,
    `- Includes: ${offer.includes.join("; ")}.`,
    `- Guarantee: ${offer.guarantee}`,
    `- The Method, six phases: ${phases.map((phase) => phase.name).join(", ")}.`,
    `- FocusMode, the instructor's app built this way: ${focusModeStatusLabel[focusModeStatus]}.`,
    "",
    "## Syllabus",
    "",
    ...phases.flatMap((phase) => [
      `### ${phase.name}: ${phase.description}`,
      "",
      `You'll have: ${phase.outcomes.join("; ")}.`,
      "",
      ...phase.modules.flatMap((module) => [`- Module ${module.number}, ${module.title}: ${module.lessons.join("; ")}`]),
      "",
    ]),
    "",
    "## Shop",
    "",
    ...products.map((product) => `- [${product.name}](${url(`/shop/${product.slug}`)}): ${product.summary}`),
    "",
    "## Free",
    "",
    `- [App Store submission checklist](${url("/free/app-store-checklist")})`,
    "",
    "## Blog",
    "",
    ...posts.filter((post) => !post.draft).map((post) => `- [${post.title}](${url(`/blog/${post.slug}`)}): ${post.summary}`),
    "",
    "## FAQ",
    "",
    ...faq.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
