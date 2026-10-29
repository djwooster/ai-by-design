import Link from "next/link";
import { Suspense } from "react";
import { DesktopNav, HeaderShell, StaticNav } from "@/components/layout/HeaderChrome";
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
    <HeaderShell>
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {/* The active link reads the URL, which can suspend on unknown [slug] pages. */}
            <Suspense fallback={<StaticNav links={site.nav} />}>
              <DesktopNav />
            </Suspense>
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
    </HeaderShell>
  );
}
