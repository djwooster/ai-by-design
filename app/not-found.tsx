import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHeader label="404 · Not found" title="Nothing shipped here." />
        <Container className="pb-24">
          <ButtonLink href="/" variant="secondary">
            Back to the homepage
          </ButtonLink>
        </Container>
      </main>
      <Footer />
    </>
  );
}
