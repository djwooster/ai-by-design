/*
 * Draws the five email course images: one small UI scene per day, on the same
 * dark ground as the email header so each image reads as part of it. Layouts
 * are vector (Next's OG renderer, in Geist) exported as 2x PNGs, 1200×640,
 * shown at 600 wide in the email.
 *
 *   node scripts/email-images.mjs
 *
 * Writes public/images/email/day-1.png … day-5.png, plus a -light version of
 * each for light mode. They load from the live
 * site, so push after changing them.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";
import { createElement } from "react";

const W = 1200;
const H = 640;
const OUT = "public/images/email";

const dark = {
  glow: "rgba(31,94,152,0.30)",
  glowEnd: "rgba(17,17,17,0)",
  bg: "#111111",
  surface: "#191919",
  raised: "#202020",
  line: "#2A2A2A",
  edge: "#333333",
  fg: "#EDEEEE",
  secondary: "#B7BABB",
  muted: "#8E9192",
  faint: "#5A5D5E",
  blue: "#1F5E98",
  blueText: "#5B9BD8",
};

/** The same scenes for light mode: white cards on the email's tint, blue for every accent. */
const light = {
  glow: "rgba(91,155,216,0.18)",
  glowEnd: "rgba(244,245,245,0)",
  bg: "#F4F5F5",
  surface: "#FFFFFF",
  raised: "#EDEEEE",
  line: "#E2E4E4",
  edge: "#D3D6D6",
  fg: "#111111",
  secondary: "#2B2D2E",
  muted: "#5B5E5F",
  faint: "#8E9192",
  blue: "#1F5E98",
  blueText: "#1F5E98",
};

/** The palette being drawn; the render loop switches it per theme. */
let c = dark;

/** A flex box: satori wants display flex on anything with more than one child. */
const h = (style, ...children) => createElement("div", { style: { display: "flex", ...style } }, ...children);
const svg = (width, height, ...children) => createElement("svg", { width, height, viewBox: `0 0 ${width} ${height}` }, ...children);
const path = (d, props = {}) => createElement("path", { d, fill: "none", strokeLinecap: "round", strokeLinejoin: "round", ...props });

const mono = (text, style = {}) =>
  h({ fontFamily: "Mono", fontSize: 19, letterSpacing: "0.12em", textTransform: "uppercase", color: c.blueText, ...style }, text);
const card = (style, ...children) =>
  h({ flexDirection: "column", background: c.surface, border: `2px solid ${c.line}`, borderRadius: 24, ...style }, ...children);
/** A rounded gray bar standing in for a line of text. */
const bar = (width, style = {}) => h({ width, height: 12, borderRadius: 6, background: c.edge, ...style });

const check = (size = 28, color = c.blueText) =>
  svg(size, size, path(`M${size * 0.2} ${size * 0.52}l${size * 0.2} ${size * 0.2} ${size * 0.4}-${size * 0.42}`, { stroke: color, strokeWidth: size * 0.11 }));
const checkCircle = (size = 40) =>
  h({ width: size, height: size, borderRadius: 999, background: c.blue, alignItems: "center", justifyContent: "center" }, check(size * 0.7, "#FFFFFF"));
const arrow = (width = 56, dashed = false) =>
  svg(width, 24, path(`M2 12H${width - 4}M${width - 12} 4l8 8-8 8`, { stroke: c.faint, strokeWidth: 3, strokeDasharray: dashed ? "6 8" : undefined }));

/** A window with the three dots and a title, for Claude and the terminal. */
const win = (title, style, ...children) =>
  card(
    { overflow: "hidden", ...style },
    h(
      { alignItems: "center", gap: 10, padding: "18px 24px", borderBottom: `2px solid ${c.line}`, background: c.raised },
      ...[0, 1, 2].map(() => h({ width: 14, height: 14, borderRadius: 999, background: c.edge })),
      h({ marginLeft: 14, fontFamily: "Mono", fontSize: 19, color: c.muted }, title),
    ),
    h({ flexDirection: "column", padding: 28, flex: 1 }, ...children),
  );

/** An iPhone outline; children fill the screen. */
const phone = (width, height, style, ...children) =>
  h(
    { position: "relative", flexDirection: "column", width, height, borderRadius: width * 0.18, border: `3px solid ${c.edge}`, background: c.surface, padding: `${width * 0.16}px ${width * 0.09}px ${width * 0.09}px`, ...style },
    h({ position: "absolute", top: width * 0.055, left: width * 0.36, width: width * 0.28, height: width * 0.065, borderRadius: 999, background: "#111111" }),
    ...children,
  );
const button = (label, style = {}) =>
  h({ height: 44, borderRadius: 14, background: c.blue, alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: 18, ...style }, label);
/** The blue ring where a tap lands. */
const tap = (style) =>
  h({ position: "absolute", width: 44, height: 44, borderRadius: 999, border: `3px solid ${c.blueText}`, background: "rgba(91,155,216,0.25)", ...style });

const scene = (...children) =>
  h(
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 64,
      background: c.bg,
      backgroundImage: `radial-gradient(circle at 50% 45%, ${c.glow}, ${c.glowEnd} 62%)`,
      fontFamily: "Geist",
      color: c.fg,
    },
    ...children,
  );

// Day 1: the three tools, and the noise you can ignore.
function day1() {
  const tools = [
    ["01", "Think", "Claude", "Shape the idea, plan the app, write the prompts."],
    ["02", "Build", "Claude Code", "Writes and edits the code on your computer."],
    ["03", "Preview", "Expo Go", "Your app, live on your phone as you build."],
  ];
  const noise = ["No-code builders", "Agent frameworks", "100 tutorials", "Plugin #47"];
  return scene(
    h(
      { alignItems: "stretch", gap: 20 },
      ...tools.flatMap(([n, role, name, desc], i) => [
        ...(i ? [h({ alignItems: "center" }, arrow(36))] : []),
        card(
          { width: 316, padding: "30px 30px 34px", gap: 14 },
          h({ width: 36, height: 5, borderRadius: 4, background: c.blueText, marginBottom: 6 }),
          mono(`${n} · ${role}`),
          h({ fontSize: 40, letterSpacing: "-0.03em" }, name),
          h({ fontSize: 23, lineHeight: 1.4, color: c.secondary }, desc),
        ),
      ]),
    ),
    h(
      { alignItems: "center", gap: 14, marginTop: 44 },
      mono("Ignore for now", { color: c.muted, marginRight: 8 }),
      ...noise.map((label) =>
        h({ padding: "10px 20px", border: `2px solid ${c.line}`, borderRadius: 999, color: c.faint, fontSize: 21, textDecoration: "line-through" }, label),
      ),
    ),
  );
}

// Day 2: the whole main path as a flow of four screens.
function day2() {
  const W2 = 184;
  const H2 = 340;
  const screens = [
    [
      "01 Open",
      [
        h({ width: 56, height: 56, borderRadius: 16, background: c.blue, marginTop: 34 }),
        bar(110, { marginTop: 24 }),
        bar(80, { marginTop: 12 }),
        h({ flex: 1 }),
        button("Start"),
      ],
      { bottom: 13, left: 124 },
    ],
    [
      "02 Set",
      [
        mono("Minutes", { fontSize: 14, color: c.muted, marginTop: 20 }),
        h({ fontSize: 76, letterSpacing: "-0.04em", marginTop: 8 }, "25"),
        h({ gap: 8, marginTop: 8 }, ...["15", "25", "45"].map((m, i) => h({ padding: "6px 10px", borderRadius: 10, fontSize: 15, color: i === 1 ? c.fg : c.muted, border: `2px solid ${i === 1 ? c.blueText : c.line}` }, m))),
        h({ flex: 1 }),
        button("Focus"),
      ],
      { bottom: 13, left: 124 },
    ],
    [
      "03 Focus",
      [
        h(
          { position: "relative", width: 132, height: 132, marginTop: 30, alignItems: "center", justifyContent: "center", alignSelf: "center" },
          h({ position: "absolute", top: 0, left: 0 }, svg(132, 132, path("M66 8a58 58 0 1 1 0 116a58 58 0 1 1 0-116", { stroke: c.edge, strokeWidth: 8 }), path("M66 8a58 58 0 0 1 50 87", { stroke: c.blueText, strokeWidth: 8 }))),
          h({ fontSize: 30, letterSpacing: "-0.03em" }, "18:42"),
        ),
        h({ flex: 1 }),
        h({ height: 44, borderRadius: 14, border: `2px solid ${c.edge}`, alignItems: "center", justifyContent: "center", color: c.muted, fontSize: 18 }, "Pause"),
      ],
      null,
    ],
    [
      "04 Done",
      [
        h({ alignSelf: "center", marginTop: 40 }, checkCircle(72)),
        h({ alignSelf: "center", fontSize: 22, marginTop: 20 }, "Nice work."),
        bar(90, { alignSelf: "center", marginTop: 12 }),
        h({ flex: 1 }),
        button("Again", { background: c.raised, color: c.secondary }),
      ],
      null,
    ],
  ];
  return scene(
    h(
      { alignSelf: "flex-start", marginLeft: 66, marginBottom: 26, alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 999, background: c.surface, border: `2px solid ${c.line}` },
      h({ width: 10, height: 10, borderRadius: 999, background: c.blueText }),
      h({ fontSize: 21, color: c.secondary }, "Main path · 2 taps to focus"),
    ),
    h(
      { alignItems: "flex-start", gap: 18 },
      ...screens.flatMap(([label, children, tapAt], i) => [
        ...(i ? [h({ height: H2, alignItems: "center" }, arrow(48))] : []),
        h(
          { flexDirection: "column", alignItems: "center", gap: 18 },
          phone(W2, H2, {}, ...children, ...(tapAt ? [tap(tapAt)] : [])),
          mono(label, { fontSize: 17, color: c.muted }),
        ),
      ]),
    ),
  );
}

// Day 3: Claude writes the prompt; you read it like a designer.
function day3() {
  const section = (title, ...rest) => h({ flexDirection: "column", gap: 10 }, mono(title, { fontSize: 16, letterSpacing: "0.06em", textTransform: "none" }), ...rest);
  const checks = ["Every screen is in it", "The design is specific", "It leaves room to surprise"];
  return scene(
    h(
      { alignItems: "center", gap: 44 },
      win(
        "Claude",
        { width: 640, height: 500 },
        h(
          { alignSelf: "flex-end", flexShrink: 0, width: 440, padding: "14px 20px", borderRadius: 18, background: c.blue, color: "#FFFFFF", fontSize: 20, lineHeight: 1.4 },
          "Turn my vision and flow into a Claude Code prompt.",
        ),
        h(
          { flexDirection: "column", flexShrink: 0, gap: 16, marginTop: 20, padding: "20px 24px", borderRadius: 16, background: c.bg, border: `2px solid ${c.line}` },
          section("## Vision", bar(420), bar(300)),
          section("## Screens", h({ gap: 8 }, ...["Open", "Set", "Focus", "Done"].map((s) => h({ padding: "5px 12px", borderRadius: 8, background: c.raised, fontSize: 16, color: c.secondary }, s)))),
          section("## Design", bar(380)),
          section("## Working agreement", bar(330)),
        ),
      ),
      h(
        { flexDirection: "column", gap: 22, width: 330 },
        mono("Read it like a designer", { color: c.muted, marginBottom: 6 }),
        ...checks.map((label) => h({ alignItems: "center", gap: 16 }, checkCircle(40), h({ fontSize: 24, color: c.fg }, label))),
      ),
    ),
  );
}

/** A QR-looking block: three finder squares and a fixed, seeded pattern. */
function qr(size) {
  const n = 25;
  const cell = size / n;
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const finder = (x, y) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  const rects = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && rand() > 0.52) rects.push([x, y]);
  const square = (x, y) => [
    createElement("rect", { key: `a${x}${y}`, x: x * cell, y: y * cell, width: cell * 7, height: cell * 7, rx: cell * 1.4, fill: "#111111" }),
    createElement("rect", { key: `b${x}${y}`, x: (x + 1) * cell, y: (y + 1) * cell, width: cell * 5, height: cell * 5, rx: cell, fill: "#FFFFFF" }),
    createElement("rect", { key: `c${x}${y}`, x: (x + 2) * cell, y: (y + 2) * cell, width: cell * 3, height: cell * 3, rx: cell * 0.6, fill: "#111111" }),
  ];
  return h(
    { padding: 12, borderRadius: 14, background: "#FFFFFF", border: `2px solid ${c.line}` },
    svg(
      size,
      size,
      ...rects.map(([x, y]) => createElement("rect", { key: `${x}-${y}`, x: x * cell, y: y * cell, width: cell, height: cell, rx: cell * 0.3, fill: "#111111" })),
      ...square(0, 0),
      ...square(n - 7, 0),
      ...square(0, n - 7),
    ),
  );
}

// Day 4: from the terminal to the phone.
function day4() {
  const line = (...children) => h({ alignItems: "center", gap: 12, fontFamily: "Mono", fontSize: 21, color: c.secondary }, ...children);
  const prompt = (cmd) => line(h({ color: c.muted }, "~/my-app"), h({ color: c.blueText }, "$"), h({ color: c.fg }, cmd));
  return scene(
    h(
      { alignItems: "center", gap: 36 },
      win(
        "Terminal",
        { width: 620, height: 500 },
        h(
          { flexDirection: "column", gap: 16 },
          prompt("claude"),
          line(check(24), "Created an Expo project"),
          line(check(24), "Stage 1: screens and navigation"),
          prompt("npx expo start"),
        ),
        h(
          { alignItems: "center", gap: 24, marginTop: 26 },
          qr(150),
          h({ flexDirection: "column", gap: 10 }, h({ fontSize: 22, color: c.fg }, "Scan with your"), h({ fontSize: 22, color: c.fg }, "iPhone camera"), mono("Same Wi-Fi", { fontSize: 15, color: c.muted, marginTop: 6 })),
        ),
      ),
      arrow(64, true),
      h(
        { flexDirection: "column", alignItems: "center", gap: 18 },
        phone(
          236,
          440,
          {},
          h({ justifyContent: "space-between", fontSize: 15, color: c.secondary, marginTop: -6 }, "9:41", h({ gap: 4 }, bar(18, { height: 10 }), bar(26, { height: 10 }))),
          h({ fontSize: 28, letterSpacing: "-0.03em", marginTop: 26 }, "My app"),
          bar(120, { marginTop: 12 }),
          h({ flexDirection: "column", gap: 12, marginTop: 24, padding: 18, borderRadius: 18, background: c.raised }, bar(110, { background: c.blueText }), bar(150), bar(90)),
          h({ flex: 1 }),
          button("Get started", { height: 50 }),
        ),
        h({ alignItems: "center", gap: 10 }, h({ width: 10, height: 10, borderRadius: 999, background: c.blueText }), mono("Live in Expo Go", { fontSize: 16, color: c.muted })),
      ),
    ),
  );
}

// Day 5: one round of polish, then the road to the App Store.
function day5() {
  const pin = (n, style) =>
    h({ position: "absolute", width: 34, height: 34, borderRadius: 999, background: c.blueText, color: c.bg, fontSize: 18, alignItems: "center", justifyContent: "center", border: `3px solid ${c.bg}`, ...style }, n);
  const notes = ["More space between the cards", "A pressed state on the button", "A font with more character"];
  const road = [
    ["On your phone", "You are here"],
    ["TestFlight", ""],
    ["App Store listing", ""],
    ["App Review", ""],
    ["Live", ""],
  ];
  return scene(
    h(
      { alignItems: "center", gap: 52 },
      phone(
        220,
        420,
        {},
        h({ fontSize: 26, letterSpacing: "-0.03em", marginTop: 6 }, "Today"),
        h({ flexDirection: "column", gap: 10, marginTop: 20 }, ...[0, 1, 2].map(() => h({ flexDirection: "column", gap: 10, padding: 14, borderRadius: 14, background: c.raised }, bar(100), bar(60)))),
        h({ flex: 1 }),
        button("Start"),
        pin("1", { top: 150, right: -17 }),
        pin("2", { bottom: 40, left: -17 }),
        pin("3", { top: 58, right: 40 }),
      ),
      h(
        { flexDirection: "column", gap: 18, width: 300 },
        mono("Polish", { color: c.muted, marginBottom: 4 }),
        ...notes.map((note, i) =>
          h({ alignItems: "flex-start", gap: 14 }, h({ width: 30, height: 30, flexShrink: 0, borderRadius: 999, background: c.raised, border: `2px solid ${c.blueText}`, color: c.blueText, fontSize: 16, alignItems: "center", justifyContent: "center" }, String(i + 1)), h({ fontSize: 22, lineHeight: 1.35, color: c.fg }, note)),
        ),
      ),
      card(
        { width: 320, padding: "28px 28px 30px", gap: 0 },
        mono("Road to the App Store", { color: c.muted, fontSize: 15, letterSpacing: "0.08em", marginBottom: 22 }),
        ...road.map(([label, note], i) =>
          h(
            { gap: 16 },
            h(
              { flexDirection: "column", alignItems: "center", width: 30 },
              i === 0 ? checkCircle(30) : h({ width: 30, height: 30, borderRadius: 999, border: `3px solid ${c.edge}` }),
              ...(i < road.length - 1 ? [h({ width: 3, height: 26, background: i === 0 ? c.blueText : c.edge })] : []),
            ),
            h(
              { flexDirection: "column", gap: 4, paddingTop: 2 },
              h({ fontSize: 21, color: i === 0 ? c.fg : c.secondary }, label),
              ...(note ? [mono(note, { fontSize: 13 })] : []),
            ),
          ),
        ),
      ),
    ),
  );
}

// Day 1, inside "Collect what you like": screenshotting a product you like on
// the web. The web page keeps its own colors in both themes; the browser
// chrome and the screen around it change.
function capture() {
  const lcd = "#FF6A2B";
  const ink = "#16161A";
  const sub = "#6E6D73";
  const hair = "#E7E5E0";
  const paper = "#FBFAF8";
  const key = (bg, w = 30) => h({ width: w, height: 22, borderRadius: 6, background: bg, boxShadow: "0 3px 0 rgba(0,0,0,0.16)" });
  const abs = (x, y, w, hgt, style, ...children) => h({ position: "absolute", left: x, top: y, width: w, height: hgt, ...style }, ...children);
  const icon = (d, color, size = 18, width = 1.7) => svg(size, size, path(d, { stroke: color, strokeWidth: width }));

  const B = { x: 24, y: 24, w: 1024, h: 520 };
  const CHROME = 52;
  const NAV = 64;
  const pad = 56;
  const textW = 380;
  const gap = 44;
  const tile = { w: 484, h: 304 };

  // Browser chrome, Safari-like: lights, sidebar and arrows, the domain, actions.
  const chrome = h(
    { alignItems: "center", height: CHROME, padding: "0 18px", gap: 8, background: c.raised, borderBottom: `1px solid ${c.line}` },
    h({ width: 12, height: 12, borderRadius: 999, background: "#FF5F57" }),
    h({ width: 12, height: 12, borderRadius: 999, background: "#FEBC2E" }),
    h({ width: 12, height: 12, borderRadius: 999, background: "#28C840", marginRight: 18 }),
    icon("M3 4h12v10H3zM7 4v10", c.muted),
    h({ width: 8 }),
    icon("M11 4L6 9l5 5", c.muted),
    icon("M7 4l5 5-5 5", c.faint),
    h(
      { flex: 1, justifyContent: "center" },
      h(
        { alignItems: "center", gap: 8, width: 360, height: 32, borderRadius: 9, background: c.surface, border: `1px solid ${c.line}`, justifyContent: "center", fontSize: 15, color: c.secondary },
        svg(11, 13, path("M2.5 6V4.5a3 3 0 0 1 6 0V6M1.5 6h8v6h-8z", { stroke: c.muted, strokeWidth: 1.4 })),
        "tinyobjects.studio",
      ),
    ),
    icon("M9 2v9M5.5 5.5L9 2l3.5 3.5M4 9v6h10V9", c.muted),
    h({ width: 10 }),
    icon("M9 4v10M4 9h10", c.muted),
  );

  // Site nav: mark and wordmark, links, sign in and a small dark button.
  const nav = h(
    { alignItems: "center", height: NAV, padding: `0 ${pad}px`, borderBottom: `1px solid ${hair}` },
    h(
      { alignItems: "center", gap: 10, width: 220 },
      h({ width: 22, height: 22, borderRadius: 6, background: ink, alignItems: "center", justifyContent: "center" }, h({ width: 8, height: 8, borderRadius: 999, background: lcd })),
      h({ fontSize: 17, letterSpacing: "-0.02em", color: ink }, "Tiny Objects"),
    ),
    h({ flex: 1, justifyContent: "center", gap: 28, fontSize: 14, color: sub }, h({}, "Products"), h({}, "Journal"), h({}, "Studio"), h({}, "Support")),
    h(
      { width: 220, justifyContent: "flex-end", alignItems: "center", gap: 16, fontSize: 14 },
      h({ color: sub }, "Sign in"),
      h({ padding: "7px 13px", borderRadius: 8, background: ink, color: paper, fontSize: 14 }, "Pre-order"),
    ),
  );

  // Hero: announcement pill, headline, copy, two buttons, the small print.
  const copy = h(
    { flexDirection: "column", width: textW },
    h(
      { alignSelf: "flex-start", alignItems: "center", gap: 8, padding: "5px 12px 5px 6px", borderRadius: 999, border: `1px solid ${hair}`, background: "#FFFFFF", fontSize: 13, color: sub },
      h({ padding: "2px 8px", borderRadius: 999, background: "#FFF0E8", color: "#D9531E", fontSize: 12 }, "New"),
      "Timer One is here",
      h({ color: "#A6A4AB" }, "→"),
    ),
    h({ fontSize: 46, lineHeight: 1.02, letterSpacing: "-0.05em", color: ink, marginTop: 18 }, "Focus you can feel."),
    h({ fontSize: 16, lineHeight: 1.5, color: sub, marginTop: 14, width: 330 }, "A desk timer with one knob and one button. Nothing to set up, nothing to check."),
    h(
      { gap: 10, marginTop: 22 },
      h({ padding: "11px 18px", borderRadius: 10, background: ink, color: paper, fontSize: 15, boxShadow: "0 1px 2px rgba(0,0,0,0.25)" }, "Pre-order · $129"),
      h({ alignItems: "center", gap: 6, padding: "11px 16px", borderRadius: 10, border: `1px solid ${hair}`, background: "#FFFFFF", color: ink, fontSize: 15 }, "Watch the film", h({ color: "#A6A4AB" }, "›")),
    ),
    h(
      { alignItems: "center", gap: 18, marginTop: 20, fontSize: 13, color: "#8D8B92" },
      h({ alignItems: "center", gap: 6 }, svg(14, 14, path("M2 7.5l3 3 7-7", { stroke: "#8D8B92", strokeWidth: 1.6 })), "Ships in March"),
      h({ alignItems: "center", gap: 6 }, svg(14, 14, path("M2 7.5l3 3 7-7", { stroke: "#8D8B92", strokeWidth: 1.6 })), "30-day returns"),
    ),
  );

  // Product photo: the gadget on a warm sweep, with swatches and carousel dots.
  const photo = h(
    { position: "relative", width: tile.w, height: tile.h, borderRadius: 16, border: `1px solid ${hair}`, background: "radial-gradient(circle at 50% 38%, #F1EEE8, #D6D1C7 75%)", alignItems: "center", justifyContent: "center" },
    h(
      { flexDirection: "column", gap: 18, width: 232, padding: 20, borderRadius: 22, background: "#EFEDE7", boxShadow: "0 4px 0 #D3CFC6, 0 24px 36px rgba(60,50,40,0.25)" },
      h(
        { alignItems: "center", justifyContent: "space-between" },
        h({ width: 118, height: 62, borderRadius: 10, background: "#1A1A1A", alignItems: "center", justifyContent: "center", fontFamily: "Mono", fontSize: 30, color: lcd, letterSpacing: "0.04em" }, "25:00"),
        h(
          { width: 64, height: 64, borderRadius: 999, background: "linear-gradient(160deg, #3A3A3A, #1E1E1E)", boxShadow: "0 6px 12px rgba(0,0,0,0.3)", justifyContent: "center", paddingTop: 8 },
          h({ width: 4, height: 16, borderRadius: 2, background: "#EFEDE7" }),
        ),
      ),
      h({ gap: 10 }, key("#D8D5CE"), key("#D8D5CE"), key("#D8D5CE"), key(lcd, 58)),
    ),
    h(
      { position: "absolute", left: 16, bottom: 16, alignItems: "center", gap: 8, padding: "6px 10px 6px 6px", borderRadius: 999, background: "rgba(255,255,255,0.8)", fontSize: 12, color: sub },
      h({ width: 16, height: 16, borderRadius: 999, background: "#EFEDE7", border: `2px solid ${ink}` }),
      h({ width: 16, height: 16, borderRadius: 999, background: "#2A2A2A" }),
      "Sand",
    ),
    h(
      { position: "absolute", bottom: 22, left: tile.w / 2 - 26, gap: 6 },
      h({ width: 16, height: 6, borderRadius: 3, background: "rgba(22,22,26,0.7)" }),
      ...[0, 1, 2].map(() => h({ width: 6, height: 6, borderRadius: 3, background: "rgba(22,22,26,0.22)" })),
    ),
  );

  const heroH = B.h - 2 - CHROME - 1 - NAV - 1;
  const hero = h({ height: heroH, alignItems: "center", padding: `0 ${pad}px`, gap }, copy, photo);
  const browser = abs(
    B.x, B.y, B.w, B.h,
    { flexDirection: "column", borderRadius: 14, overflow: "hidden", border: `1px solid ${c.edge}`, background: paper, boxShadow: "0 24px 60px rgba(0,0,0,0.25)" },
    chrome,
    nav,
    hero,
  );

  // The screenshot: the photo selected, the rest of the screen dimmed, handles
  // on the corners and edges like macOS.
  const sel = {
    x: B.x + 1 + pad + textW + gap - 8,
    y: B.y + 1 + CHROME + 1 + NAV + 1 + (heroH - tile.h) / 2 - 8,
    w: tile.w + 16,
    h: tile.h + 16,
  };
  const right = sel.x + sel.w;
  const bottom = sel.y + sel.h;
  const W1 = 1072;
  const H1 = 568;
  const dim = (x, y, w, hgt) => abs(x, y, w, hgt, { background: "rgba(0,0,0,0.38)" });
  const handle = (x, y) => abs(x - 5, y - 5, 10, 10, { borderRadius: 999, background: "#FFFFFF", boxShadow: "0 0 0 1px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.35)" });
  const midX = sel.x + sel.w / 2;
  const midY = sel.y + sel.h / 2;
  const crosshair = abs(
    right - 20, bottom - 20, 40, 40, {},
    svg(40, 40, path("M20 2v12M20 26v12M2 20h12M26 20h12", { stroke: "rgba(0,0,0,0.6)", strokeWidth: 4 }), path("M20 2v12M20 26v12M2 20h12M26 20h12", { stroke: "#FFFFFF", strokeWidth: 2 })),
  );
  const size = h(
    { position: "absolute", left: right + 12, top: bottom + 6, flexDirection: "column", gap: 2, fontFamily: "Mono", fontSize: 13, color: "#FFFFFF", padding: "5px 8px", borderRadius: 6, background: "rgba(0,0,0,0.6)" },
    h({}, `${sel.w * 2}`),
    h({}, `${sel.h * 2}`),
  );

  return h(
    { position: "relative", width: "100%", height: "100%", background: c.bg, fontFamily: "Geist", color: c.fg },
    browser,
    dim(0, 0, W1, sel.y),
    dim(0, bottom, W1, H1 - bottom),
    dim(0, sel.y, sel.x, sel.h),
    dim(right, sel.y, W1 - right, sel.h),
    abs(sel.x, sel.y, sel.w, sel.h, { border: "1px solid rgba(255,255,255,0.95)" }),
    handle(sel.x, sel.y), handle(midX, sel.y), handle(right, sel.y),
    handle(sel.x, midY), handle(right, midY),
    handle(sel.x, bottom), handle(midX, bottom), handle(right, bottom),
    crosshair,
    size,
  );
}

const [sans, monoFont] = await Promise.all([readFile("assets/fonts/Geist-Medium.ttf"), readFile("assets/fonts/GeistMono-Regular.ttf")]);
const fonts = [
  { name: "Geist", data: sans, weight: 500, style: "normal" },
  { name: "Mono", data: monoFont, weight: 400, style: "normal" },
];

await mkdir(OUT, { recursive: true });
// The header images are full width; figures sit inside the 536px text column.
const images = [
  ["day-1", day1, W, H],
  ["day-2", day2, W, H],
  ["day-3", day3, W, H],
  ["day-4", day4, W, H],
  ["day-5", day5, W, H],
  ["day-1-screenshot", capture, 1072, 568],
];
for (const [suffix, palette] of [["", dark], ["-light", light]]) {
  c = palette;
  for (const [name, draw, width, height] of images) {
    const image = new ImageResponse(draw(), { width, height, fonts });
    const file = `${OUT}/${name}${suffix}.png`;
    await writeFile(file, Buffer.from(await image.arrayBuffer()));
    console.log(`wrote ${file}`);
  }
}
