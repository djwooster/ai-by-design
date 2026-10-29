import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { formatDate, posts } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on designing, building and shipping apps with Claude Code.",
};

/** The newest post as a large card, then the rest as hairline rows. */
export default function BlogPage() {
  const [latest, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        label="Blog"
        title="Notes from the build."
        accent="the build."
        lede="What I learn shipping real apps with Claude Code, written down as I go."
      />
      <Container className="pb-24 md:pb-32">
        {latest && (
          <Link
            href={`/blog/${latest.slug}`}
            className="group grid grid-cols-1 overflow-hidden rounded-[28px] border border-line bg-surface transition-colors duration-200 hover:border-line-strong md:grid-cols-2"
          >
            <div className="theme-blue flex min-h-[220px] items-end p-8 md:min-h-[340px]">
              <p className="text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none font-medium tracking-[-0.05em] text-fg transition-transform duration-500 ease-glide group-hover:-translate-y-1">
                {latest.topic}
              </p>
            </div>
            <div className="flex flex-col p-8 md:p-10">
              <Meta date={latest.date} topic="Latest" draft={latest.draft} />
              <h2 className="mt-6 text-title text-fg">{latest.title}</h2>
              <p className="mt-4 text-lede text-fg-secondary">{latest.summary}</p>
              <span className="mt-auto pt-8 text-ui-sm text-fg-muted transition-colors duration-150 group-hover:text-fg">
                Read the post →
              </span>
            </div>
          </Link>
        )}

        <Stagger as="ul" className="mt-16 border-t border-line">
          {rest.map((post) => (
            <StaggerItem key={post.slug} as="li" className="border-b border-line">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 gap-x-6 gap-y-2 py-7 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-baseline"
              >
                <Meta date={post.date} topic={post.topic} />
                <div>
                  <h2 className="text-heading text-fg transition-colors duration-150 group-hover:text-accent-fg">{post.title}</h2>
                  <p className="mt-1 text-ui text-fg-secondary">{post.summary}</p>
                </div>
                {post.draft && <Badge tone="info">Draft</Badge>}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </>
  );
}

function Meta({ date, topic, draft }: { date: string; topic: string; draft?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-ui-sm text-fg-muted">
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden>·</span>
      {topic}
      {draft && <Badge tone="info">Draft</Badge>}
    </p>
  );
}
