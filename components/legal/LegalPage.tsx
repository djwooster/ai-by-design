import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageHeader label="Legal · Last updated [TODO: date]" title={title} />
      <Container className="pb-24">
        <div className="max-w-[40rem] space-y-4 text-body text-fg-secondary">{children}</div>
      </Container>
    </>
  );
}
