import { Wordmark } from "@/components/layout/Header";
import { Container, Grid } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/SmartLink";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { offer } from "@/lib/content/offer";
import { site } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="py-16">
        <Grid className="gap-y-10">
          <div className="col-span-4">
            <Wordmark />
            <p className="mt-3 max-w-[18rem] text-ui-sm text-fg-secondary">
              The school for designers and builders shipping their own apps with AI.
            </p>
          </div>
          {site.footer.map((column) => (
            <div key={column.title} className="col-span-2">
              <SpecLabel as="p">{column.title}</SpecLabel>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      link={link}
                      className="text-ui-sm text-fg-secondary transition-colors duration-150 hover:text-fg"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Grid>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <SpecLabel parts={[`© ${site.copyrightYear} ${site.name}`, site.author]} />
          <SpecLabel parts={[offer.course, `Founding · ${offer.foundingSpots.total} spots`]} />
        </Container>
      </div>
    </footer>
  );
}
