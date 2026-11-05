import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CopyButton } from "@/components/forms/CopyButton";
import { PageFallback } from "@/components/layout/PageFallback";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Reveal } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { CourseBand } from "@/components/shared/CourseBand";
import { Container } from "@/components/ui/Container";
import { getLesson, lessons, type LessonSection } from "@/lib/content/emailCourse";

type Params = PageProps<"/free/5-day-course/[day]">["params"];

export function generateStaticParams() {
  return lessons.map((lesson) => ({ day: lesson.slug }));
}

export async function generateMetadata({ params }: PageProps<"/free/5-day-course/[day]">): Promise<Metadata> {
  const lesson = getLesson((await params).day);
  // Lesson pages are for people on the course; the opt-in page is the one to find.
  return lesson ? { title: `Day ${lesson.day}: ${lesson.title}`, description: lesson.lede, robots: { index: false } } : {};
}

export default function LessonPage({ params }: PageProps<"/free/5-day-course/[day]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Lesson params={params} />
    </Suspense>
  );
}

/** The companion page for one day's email: its prompts, lists and links, ready to copy. */
async function Lesson({ params }: { params: Params }) {
  const lesson = getLesson((await params).day);
  if (!lesson) notFound();
  const previous = lessons[lesson.day - 2];
  const next = lessons[lesson.day];

  return (
    <>
      <Container className="pt-14 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-[40rem]">
          <Reveal>
            <p className="font-mono text-label uppercase text-accent-fg">Day {lesson.day} of 5</p>
          </Reveal>
          <WordsIn as="h1" lines={[lesson.title]} delay={0.1} className="mt-5 text-display text-fg" />
          <Reveal delay={0.3}>
            <p className="mt-6 text-lede text-fg-secondary">{lesson.lede}</p>
          </Reveal>

          <div className="mt-14 space-y-14">
            {lesson.sections.map((section, index) => (
              <Reveal key={section.title} delay={index === 0 ? 0.35 : 0}>
                <Section section={section} />
              </Reveal>
            ))}
          </div>

          <p className="mt-16 border-t border-line pt-8 text-ui text-fg-secondary">
            Stuck, or want to show me what you made? Hit reply on today&apos;s email. I read everything.
          </p>
          <nav className="mt-8 flex items-center justify-between gap-4 text-ui-sm">
            {previous ? (
              <Link href={`/free/5-day-course/${previous.slug}`} className="text-fg-muted transition-colors hover:text-fg">
                ← Day {previous.day}
              </Link>
            ) : (
              <Link href="/free/5-day-course" className="text-fg-muted transition-colors hover:text-fg">
                ← About the course
              </Link>
            )}
            {next && (
              <Link href={`/free/5-day-course/${next.slug}`} className="text-fg-muted transition-colors hover:text-fg">
                Day {next.day} →
              </Link>
            )}
          </nav>
        </div>
      </Container>

      {lesson.day === 5 && (
        <CourseBand
          placement="email-course-day-5"
          title="Ready to take it all the way to the App Store?"
          body="The course takes you through all six phases, with two live calls a week. Founding members pay $99."
        />
      )}
    </>
  );
}

function Section({ section }: { section: LessonSection }) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-heading text-fg">{section.title}</h2>
        {section.minutes && <span className="shrink-0 font-mono text-ui-sm text-fg-muted">{section.minutes} min</span>}
      </div>
      {section.note && <p className="mt-2 text-ui text-fg-secondary">{section.note}</p>}

      {section.video && <VideoSlot length={section.video.length} className="mt-5" />}

      {section.prompt && (
        <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-label uppercase text-fg-muted">Prompt</span>
            <CopyButton text={section.prompt} />
          </div>
          <p className="mt-3 text-ui leading-relaxed whitespace-pre-line text-fg">{section.prompt}</p>
        </div>
      )}

      {section.commands && (
        <div className="mt-5 space-y-3">
          {section.commands.map((item) => (
            <div key={item.command}>
              <p className="text-ui-sm text-fg-muted">{item.label}</p>
              <div className="mt-1.5 flex items-center justify-between gap-3 rounded-md border border-line bg-surface py-2 pr-2 pl-3.5">
                <code className="min-w-0 overflow-x-auto font-mono text-ui-sm whitespace-nowrap text-fg">{item.command}</code>
                <CopyButton text={item.command} />
              </div>
            </div>
          ))}
        </div>
      )}

      {section.items && (
        <ul className="mt-5 border-t border-line">
          {section.items.map((item) => (
            <li key={item.label} className="border-b border-line py-3.5">
              {item.href ? (
                <Link
                  href={item.href}
                  {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group block"
                >
                  <span className="text-ui text-fg underline-offset-[3px] group-hover:underline">{item.label} ↗</span>
                  <span className="mt-0.5 block text-ui-sm text-fg-secondary">{item.text}</span>
                </Link>
              ) : (
                <>
                  <span className="text-ui text-fg">{item.label}</span>
                  <span className="mt-0.5 block text-ui-sm text-fg-secondary">{item.text}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {section.todo && (
        <p className="mt-5 rounded-2xl border border-dashed border-line-strong p-5 text-ui-sm text-fg-muted">{section.todo}</p>
      )}
    </section>
  );
}
