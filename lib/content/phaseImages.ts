import type { StaticImageData } from "next/image";
import type { Phase } from "@/lib/content/method";
import build from "@/public/images/method/build.png";
import design from "@/public/images/method/design.png";
import launch from "@/public/images/method/launch.png";
import ship from "@/public/images/method/ship.png";
import test from "@/public/images/method/test.png";
import vision from "@/public/images/method/vision.png";

/**
 * The hand-drawn scene for each Method phase (generated in ChatGPT from the
 * prompts DJ uses). Phases missing here fall back to their node diagram. To add
 * one: keep the original in references/method-originals/, knock its background
 * out with `node scripts/knockout-bg.mjs <original> public/images/method/<phase>.png`,
 * then import it here.
 */
export const phaseImages: Partial<Record<Phase["id"], StaticImageData>> = {
  vision,
  design,
  build,
  test,
  ship,
  launch,
};
