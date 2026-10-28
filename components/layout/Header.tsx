import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { site } from "@/lib/content/site";

export function Wordmark() {
  return (
    <span className="text-ui font-semibold tracking-[-0.03em] text-fg">{site.name}</span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/92 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {site.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ui-sm text-fg-secondary transition-colors duration-150 hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <CTAButton placement="header" size="sm" />
      </Container>

      {/* Phones get the nav as a second row instead of a menu. */}
      <nav aria-label="Main" className="border-t border-line md:hidden">
        <Container className="flex h-10 items-center gap-6">
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-label uppercase text-fg-muted transition-colors duration-150 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}
