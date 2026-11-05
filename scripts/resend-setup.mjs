// One-off Resend setup for the email course: the segment and the sign-up event.
// Run with: node --env-file=.env.local scripts/resend-setup.mjs
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const segments = await resend.segments.list();
if (segments.error) throw new Error(segments.error.message);
console.log("existing segments:", segments.data.data.map((s) => s.name));
let segment = segments.data.data.find((s) => s.name === "Email course");
if (!segment) {
  const created = await resend.segments.create({ name: "Email course" });
  if (created.error) throw new Error(created.error.message);
  segment = created.data;
  console.log("created segment");
}
console.log("SEGMENT_ID", segment.id);

const events = await resend.events.list();
if (events.error) throw new Error(events.error.message);
console.log("existing events:", events.data.data.map((e) => e.name));
if (!events.data.data.some((e) => e.name === "email_course.signed_up")) {
  const created = await resend.events.create({ name: "email_course.signed_up", schema: { source: "string" } });
  console.log("created event", created.error ?? "ok");
}
