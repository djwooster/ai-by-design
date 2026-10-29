"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, type NavLink } from "@/lib/content/site";
import { cx } from "@/lib/cx";

/**
 * The header's surface: transparent at the very top of the page, then a
 * hairline and a soft blur once you scroll past it.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-glide",
        scrolled ? "border-line bg-canvas/80 backdrop-blur-lg" : "border-transparent bg-canvas/0",
      )}
    >
      {children}
    </header>
  );
}

/** Which nav link is current: by section in view on the homepage, by path elsewhere. */
function useActiveHref() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = site.nav.filter((link) => link.href.startsWith("/#")).map((link) => link.href.slice(2));
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        setSection(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/") return section ? `/#${section}` : null;
  return site.nav.find((link) => !link.href.startsWith("/#") && pathname.startsWith(link.href))?.href ?? null;
}

const linkClass = "relative py-1 text-ui-sm transition-colors duration-150 hover:text-fg";

/** The desktop nav, with an underline that slides to the current link. */
export function DesktopNav() {
  const active = useActiveHref();
  return (
    <>
      {site.nav.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={active === link.href ? "true" : undefined}
          className={cx(linkClass, active === link.href ? "text-fg" : "text-fg-secondary")}
        >
          {link.label}
          {active === link.href && (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-0 -bottom-[3px] h-px bg-fg"
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
            />
          )}
        </Link>
      ))}
    </>
  );
}

/** The same links with no active state: the server render, and the fallback while the path resolves. */
export function StaticNav({ links }: { links: NavLink[] }) {
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={cx(linkClass, "text-fg-secondary")}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
