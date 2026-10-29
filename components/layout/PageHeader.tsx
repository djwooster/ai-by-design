import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";

/** The top of every inner page: a pill badge, the headline, one-line lede. */
export function PageHeader({
  label,
  title,
  lede,
}: {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
      <Pill>{label}</Pill>
      <h1 className="mt-6 max-w-[20ch] text-display text-fg">{title}</h1>
      {lede && <p className="mt-6 max-w-[38rem] text-lede text-fg-secondary">{lede}</p>}
    </Container>
  );
}
