/**
 * Renders `text` with one word or phrase, `accent`, in the accent color: the
 * single accent a headline gets. If the phrase isn't found, the text renders plain.
 */
export function AccentText({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-accent-fg">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}
