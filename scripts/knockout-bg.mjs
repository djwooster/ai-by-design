// Removes the flat dark background from generated line art (light lines and
// fills on a near-black field), so the art sits on any surface with no seam.
//
//   node scripts/knockout-bg.mjs <input.png> <output.png>
//
// How: measure the background color and its grain from a ring of border
// pixels, make anything within the grain transparent, ramp alpha with the
// distance from the background, and un-mix the background out of the soft
// edges so antialiased lines keep their true color.

import sharp from "sharp";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/knockout-bg.mjs <input.png> <output.png>");
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Background: per-channel median of a 24px border ring; grain: its spread.
const ring = 24;
const samples = [[], [], []];
for (let y = 0; y < height; y += 2) {
  for (let x = 0; x < width; x += 2) {
    if (x >= ring && x < width - ring && y >= ring && y < height - ring) continue;
    const i = (y * width + x) * channels;
    for (let c = 0; c < 3; c++) samples[c].push(data[i + c]);
  }
}
const median = (list) => list.sort((a, b) => a - b)[Math.floor(list.length / 2)];
const bg = samples.map(median);
const spread = Math.max(
  ...samples.map((list, c) => {
    const sorted = list.sort((a, b) => a - b);
    return Math.max(sorted[Math.floor(sorted.length * 0.98)] - bg[c], bg[c] - sorted[Math.floor(sorted.length * 0.02)]);
  }),
);

// Alpha ramps from fully clear just above the grain to fully opaque.
const low = Math.max(8, spread * 1.5);
const high = low + 55;

const out = Buffer.alloc(width * height * 4);
for (let p = 0; p < width * height; p++) {
  const i = p * channels;
  const o = p * 4;
  const diff = [0, 1, 2].map((c) => data[i + c] - bg[c]);
  const distance = Math.max(...diff.map(Math.abs));
  const t = Math.min(1, Math.max(0, (distance - low) / (high - low)));
  const alpha = t * t * (3 - 2 * t);
  for (let c = 0; c < 3; c++) {
    out[o + c] = alpha > 0 ? Math.min(255, Math.max(0, Math.round(bg[c] + diff[c] / alpha))) : 0;
  }
  out[o + 3] = Math.round(alpha * 255);
}

await sharp(out, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(output);
console.log(`${input} → ${output} · background rgb(${bg.join(", ")}) · grain ±${spread} · clear below ${low.toFixed(0)}`);
