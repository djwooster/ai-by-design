import Link from "next/link";
import { isPlaceholder, type NavLink } from "@/lib/content/site";

/** Internal links use next/link, external ones open in a new tab, and `[TODO: …]` hrefs render as inert text. */
export function SmartLink({
  link,
  className,
}: {
  link: NavLink;
  className?: string;
}) {
  if (isPlaceholder(link.href)) {
    return (
      <span className={className} title={link.href}>
        {link.label}
      </span>
    );
  }
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}
