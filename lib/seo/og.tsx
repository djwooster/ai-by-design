import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/content/site";

/*
 * The site's share card: Air Black, the headline in Geist Medium with tight
 * tracking, a small pill above it and the wordmark and URL along the foot,
 * with a blue rule as the only color. Every page's image uses it.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Geist-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/GeistMono-Regular.ttf")),
]);

const ink = { bg: "#111111", surface: "#191919", line: "#2a2a2a", fg: "#EDEEEE", secondary: "#B7BABB", muted: "#8E9192", blue: "#1F5E98", blueText: "#5B9BD8" };

export async function ogImage({ eyebrow, title, footnote }: { eyebrow: string; title: string; footnote?: string }) {
  const [sans, mono] = await fonts;
  const size = title.length > 60 ? 60 : title.length > 36 ? 72 : 84;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: ink.bg, padding: "72px 80px", fontFamily: "Geist" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              height: 44,
              padding: "0 20px",
              borderRadius: 999,
              border: `1px solid ${ink.line}`,
              background: ink.surface,
              color: ink.secondary,
              fontSize: 22,
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: 999, background: ink.blueText }} />
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <div style={{ display: "flex", maxWidth: 980, color: ink.fg, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.04em" }}>{title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${ink.line}`, paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 28, height: 4, borderRadius: 4, background: ink.blue }} />
            <div style={{ color: ink.fg, fontSize: 26, letterSpacing: "-0.03em" }}>{site.name}</div>
          </div>
          <div style={{ color: ink.muted, fontSize: 20, fontFamily: "Geist Mono", letterSpacing: "0.04em" }}>
            {footnote ?? site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
