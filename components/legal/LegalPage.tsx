import { PageHeader } from "@/components/layout/PageHeader";
import { H2, P, Prose } from "@/components/prose/elements";
import { Container } from "@/components/ui/Container";
import type { LegalDoc } from "@/lib/content/legal";

/** A legal page: the contents on the left, staying in view; the text on the right, in the blog's prose. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader label={`Legal · Last updated ${doc.updated}`} title={doc.title} lede={doc.intro} />
      <Container className="pb-24 md:pb-32">
        <div className="grid grid-cols-1 gap-10 border-t border-line pt-12 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-16">
          <nav aria-label="On this page" className="md:sticky md:top-24 md:self-start">
            <p className="text-ui-sm text-fg-muted">On this page</p>
            <ol className="mt-4 space-y-2.5">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-ui-sm text-fg-secondary transition-colors duration-150 hover:text-fg">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Prose>
            {doc.sections.map((section) => (
              <section key={section.id} className="mt-14 first:mt-0">
                <H2 id={section.id}>{section.heading}</H2>
                {section.body.map((paragraph, i) => (
                  <P key={i}>{paragraph}</P>
                ))}
              </section>
            ))}
          </Prose>
        </div>
      </Container>
    </>
  );
}
