import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { SmartLink } from "@/components/ui/SmartLink";
import { instructor } from "@/lib/content/home";
import { site } from "@/lib/content/site";

/** Split: the story on the left, a large photo panel on the right. */
export function Instructor() {
  return (
    <section id="instructor" className="scroll-mt-20">
      <Container className="py-24 md:py-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Pill>{instructor.badge}</Pill>
            <h2 className="mt-6 text-title text-fg">{instructor.name}</h2>
            <p className="mt-2 text-lede text-fg-muted">{instructor.role}</p>
            <p className="mt-6 max-w-[32rem] text-lede text-fg-secondary">{instructor.bio}</p>

            <ul className="mt-10 border-t border-line">
              {instructor.experience.map((item) => (
                <li key={item.org} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <span className="text-ui text-fg">{item.org}</span>
                  {item.note && <span className="text-ui-sm text-fg-muted">{item.note}</span>}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {site.elsewhere.map((link) => (
                <SmartLink
                  key={link.label}
                  link={link}
                  className="text-ui-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {/* [TODO: photo] */}
            <div className="flex aspect-[4/5] items-center justify-center rounded-[28px] border border-line bg-surface">
              <span className="text-ui-sm text-fg-muted">[TODO: photo]</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
