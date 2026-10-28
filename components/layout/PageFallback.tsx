/**
 * Holds the page's space while a dynamic segment's params resolve, so client
 * navigations into `[slug]` routes stay instant under Cache Components.
 */
export function PageFallback() {
  return <div aria-busy className="min-h-[70vh]" />;
}
