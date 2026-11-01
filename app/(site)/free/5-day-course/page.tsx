import type { Metadata } from "next";
import { CourseSignup } from "@/components/forms/CourseSignup";
import { AccentText } from "@/components/ui/AccentText";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WordsIn } from "@/components/motion/WordsIn";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { emailCourse } from "@/lib/content/emailCourse";

export const metadata: Metadata = {
  title: "Free 5-day email course: build your first app",
  description: emailCourse.lede,
};

/** One narrow column: the pitch, the form, then what each day covers. */
export default function EmailCoursePage() {
  return (
    <>
      <Container className="pt-14 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-[40rem]">
          <Reveal>
            <p className="font-mono text-label uppercase text-accent-fg">
              {emailCourse.label}
            </p>
          </Reveal>
          <WordsIn
            as="h1"
            lines={[emailCourse.title]}
            accent={emailCourse.accent}
            delay={0.1}
            className="mt-5 text-display text-fg"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 text-lede text-fg-secondary">
              {emailCourse.lede}
            </p>
            <ul className="mt-8 space-y-2.5">
              {emailCourse.promises.map((line) => (
                <li key={line} className="flex gap-3 text-ui text-fg">
                  <GeoIcon
                    name="check"
                    size={18}
                    className="mt-px text-positive"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <CourseSignup
              source="email-course-page"
              tag="email-course"
              cta={emailCourse.cta}
              fineprint={emailCourse.fineprint}
              confirmation={<Confirmation />}
            />
          </Reveal>

          <h2 className="mt-16 border-t border-line pt-10 text-heading text-fg">
            What the five days cover
          </h2>
          <Stagger as="ol" className="mt-5">
            {emailCourse.days.map((day, index) => (
              <StaggerItem
                key={day.title}
                as="li"
                className="flex gap-5 border-b border-line py-4 last:border-b-0"
              >
                <span className="w-12 shrink-0 pt-0.5 font-mono text-ui-sm text-fg-muted">
                  Day {index + 1}
                </span>
                <div>
                  <p className="text-ui text-fg">{day.title}</p>
                  <p className="mt-0.5 text-ui-sm text-fg-secondary">
                    {day.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
      <Fit />
      <About />
    </>
  );
}

/** Meet DJ: the video beside the hello, still on the light band. */
function About() {
  const { about } = emailCourse;
  return (
    <section className="theme-light bg-canvas text-fg">
      <Container className="pb-20 md:pb-28">
        <div className="mx-auto grid max-w-[64rem] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <VideoSlot
              length={about.videoLength}
              label="Meet DJ"
              className="aspect-[4/5]!"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="text-title text-fg">
              <AccentText text={about.title} accent={about.accent} />
            </h2>
            <p className="mt-5 text-lede text-fg-secondary">{about.body}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** A full-width light band: who it's for, the heading beside the list. */
function Fit() {
  const { fit } = emailCourse;
  return (
    <section className="theme-light bg-canvas text-fg">
      <Container className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[64rem] grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="text-title text-fg">
              <AccentText text={fit.title} accent={fit.accent} />
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-ui font-medium text-fg">{fit.label}</p>
            <ul className="mt-5 border-t border-line">
              {fit.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-line py-4 text-ui text-fg-secondary"
                >
                  <GeoIcon
                    name="check"
                    size={18}
                    className="mt-px shrink-0 text-positive"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** What replaces the form once someone signs up. */
function Confirmation() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <span className="flex size-9 items-center justify-center rounded-full bg-accent text-on-accent">
        <GeoIcon name="check" size={18} />
      </span>
      <p className="mt-5 text-heading text-fg">
        {emailCourse.confirmation.title}
      </p>
      <p className="mt-1.5 text-ui text-fg-secondary">
        {emailCourse.confirmation.body}
      </p>
      <div className="mt-6 border-t border-line pt-5">
        <ButtonLink href="/#method" variant="secondary" size="md">
          See the full course
        </ButtonLink>
      </div>
    </div>
  );
}
