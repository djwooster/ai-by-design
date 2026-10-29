import { Checklist } from "@/components/home/Checklist";
import { Curriculum } from "@/components/home/Curriculum";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { Fit } from "@/components/home/Fit";
import { Hero } from "@/components/home/Hero";
import { Instructor } from "@/components/home/Instructor";
import { Live } from "@/components/home/Live";
import { Method } from "@/components/home/Method";
import { Offer } from "@/components/home/Offer";
import { Proof } from "@/components/home/Proof";
import { WhyNow } from "@/components/home/WhyNow";
import { homeSections, type HomeSectionId } from "@/lib/content/home";

/** Each section id maps to its component; the order lives in lib/content/home.ts. */
const sections: Record<HomeSectionId, () => React.ReactNode> = {
  "why-now": WhyNow,
  method: Method,
  curriculum: Curriculum,
  live: Live,
  proof: Proof,
  instructor: Instructor,
  offer: Offer,
  fit: Fit,
  faq: Faq,
  checklist: Checklist,
  final: FinalCta,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {homeSections.map((id) => {
        const Section = sections[id];
        return <Section key={id} />;
      })}
    </>
  );
}
