import type { Metadata } from "next";
import { Wordmark } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { SmartLink } from "@/components/ui/SmartLink";
import { site } from "@/lib/content/site";

/** Ad landing pages: unlisted, noindex, and no site nav to wander off through. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const legal = site.footer.find((column) => column.title === "Legal")?.links ?? [];

export default function AdLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-14 items-center">
          <Wordmark />
        </Container>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 py-6">
          {legal.map((link) => (
            <SmartLink
              key={link.href}
              link={link}
              className="font-mono text-label uppercase text-fg-muted transition-colors duration-150 hover:text-fg"
            />
          ))}
        </Container>
      </footer>
    </>
  );
}
