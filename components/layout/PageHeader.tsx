import { Container } from "@/components/ui/Container";
import { SpecLabel } from "@/components/ui/SpecLabel";

/** The top of every inner page: spec label, headline, one-line lede. */
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
      <SpecLabel>{label}</SpecLabel>
      <h1 className="mt-5 max-w-[18ch] text-display text-fg">{title}</h1>
      {lede && <p className="mt-6 max-w-[38rem] text-body text-fg-secondary">{lede}</p>}
    </Container>
  );
}
