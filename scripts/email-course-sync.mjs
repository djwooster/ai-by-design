// Syncs the 5-day email course to Resend: one published template per day
// from content/email-course/day-N.txt, and the automation that sends them
// (created disabled; turn it on in the Resend dashboard).
//
//   node --env-file=.env.local scripts/email-course-sync.mjs           templates + automation
//   node --env-file=.env.local scripts/email-course-sync.mjs --test you@example.com
//                                                                     also sends all five to one address
import { readFileSync } from "node:fs";
import { Resend } from "resend";

const DAYS = [1, 2, 3, 4, 5];
const EVENT = "email_course.signed_up";
const AUTOMATION = "5-day email course";
const FROM = process.env.EMAIL_FROM || "DJ Wooster <dj@ai-bydesign.dev>";
const REPLY_TO = process.env.EMAIL_REPLY_TO;
const ADDRESS = process.env.MAILING_ADDRESS;

const resend = new Resend(process.env.RESEND_API_KEY);
const must = (result, what) => {
  if (result.error) throw new Error(`${what}: ${result.error.message}`);
  return result.data;
};

// --- Parsing and rendering --------------------------------------------------

function parse(day) {
  const raw = readFileSync(new URL(`../content/email-course/day-${day}.txt`, import.meta.url), "utf8");
  const [head, body] = raw.split(/^Body:\n/m);
  const field = (name) => head.match(new RegExp(`^${name}: (.+)$`, "m"))[1].trim();
  return { day, subject: field("Subject"), preview: field("Preview"), body: body.trim() };
}

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const LINK = /^\[link: (.+?) → (\S+)\]$/;
const STEP = /^\d\. .+/;

const p = (html) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2B2D2E">${html}</p>`;

function block(text) {
  const lines = text.split("\n");
  const link = text.match(LINK);
  if (link) {
    return `<p style="margin:28px 0"><a href="${link[2]}" style="display:inline-block;background:#1F5E98;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:600;padding:12px 20px;border-radius:8px">${escape(link[1])}</a></p>`;
  }
  if (lines.every((line) => line.startsWith("- "))) {
    const items = lines.map((line) => {
      const item = escape(line.slice(2));
      // "Label: the rest" lists get a bold label.
      const bolded = item.replace(/^([^:]{1,40}):/, "<strong>$1:</strong>");
      return `<li style="margin:0 0 8px">${bolded}</li>`;
    });
    return `<ul style="margin:0 0 16px;padding-left:20px;font-size:16px;line-height:1.6;color:#2B2D2E">${items.join("")}</ul>`;
  }
  if (lines.length === 1 && STEP.test(text) && text.length < 60) {
    return `<h2 style="margin:32px 0 12px;font-size:18px;line-height:1.3;font-weight:600;color:#111111">${escape(text)}</h2>`;
  }
  if (text.startsWith('"') && text.endsWith('"') && text.length > 120) {
    // A prompt to copy: set apart so it's easy to find and select.
    return `<div style="margin:0 0 16px;padding:16px;background:#F3F4F4;border-left:3px solid #1F5E98;border-radius:6px;font-size:15px;line-height:1.6;color:#111111">${escape(text.slice(1, -1))}</div>`;
  }
  return p(escape(text).replace(/\n/g, "<br>"));
}

function footer() {
  const address = ADDRESS ? escape(ADDRESS) : "[TODO: mailing address]";
  return `<p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #E2E4E4;font-size:12px;line-height:1.6;color:#5B5E5F">You're getting this because you signed up for the free 5-day course at ai-bydesign.dev.<br>${address}<br><a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#5B5E5F">Unsubscribe</a></p>`;
}

function html({ preview, body }) {
  const blocks = body.split(/\n{2,}/).map(block).join("\n");
  return `<!doctype html><html><body style="margin:0;background:#FFFFFF;padding:24px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
<div style="display:none;max-height:0;overflow:hidden">${escape(preview)}</div>
<div style="max-width:560px;margin:0 auto">
${blocks}
${footer()}
</div></body></html>`;
}

function text({ body }) {
  const plain = body.replace(/^\[link: (.+?) → (\S+)\]$/gm, "$1: $2");
  const address = ADDRESS || "[TODO: mailing address]";
  return `${plain}\n\n---\nYou're getting this because you signed up for the free 5-day course at ai-bydesign.dev.\n${address}\nUnsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`;
}

// --- Templates --------------------------------------------------------------

async function syncTemplate(email) {
  const alias = `email-course-day-${email.day}`;
  const fields = {
    name: `Email course · Day ${email.day}`,
    alias,
    subject: email.subject,
    from: FROM,
    replyTo: REPLY_TO,
    html: html(email),
    text: text(email),
    variables: [{ key: "NAME", type: "string", fallbackValue: "there" }],
  };
  const existing = await resend.templates.get(alias);
  let id;
  if (existing.data) {
    id = existing.data.id;
    must(await resend.templates.update(id, fields), `update ${alias}`);
  } else {
    id = must(await resend.templates.create(fields), `create ${alias}`).id;
  }
  must(await resend.templates.publish(id), `publish ${alias}`);
  console.log(`template ${alias}: ${existing.data ? "updated" : "created"}, published`);
  return id;
}

// --- Automation -------------------------------------------------------------

async function syncAutomation(templateIds) {
  const steps = [{ key: "trigger", type: "trigger", config: { eventName: EVENT } }];
  const connections = [];
  let previous = "trigger";
  DAYS.forEach((day, index) => {
    if (index > 0) {
      const wait = `wait-${day}`;
      steps.push({ key: wait, type: "delay", config: { duration: "1 day" } });
      connections.push({ from: previous, to: wait });
      previous = wait;
    }
    const send = `day-${day}`;
    steps.push({
      key: send,
      type: "send_email",
      config: { template: { id: templateIds[index], variables: { NAME: { var: "event.firstName" } } } },
    });
    connections.push({ from: previous, to: send });
    previous = send;
  });

  const list = must(await resend.automations.list(), "list automations");
  const existing = list.data.find((a) => a.name === AUTOMATION);
  if (existing) {
    must(await resend.automations.update(existing.id, { steps, connections }), "update automation");
    console.log(`automation "${AUTOMATION}": updated (status ${existing.status})`);
  } else {
    must(await resend.automations.create({ name: AUTOMATION, status: "disabled", steps, connections }), "create automation");
    console.log(`automation "${AUTOMATION}": created, disabled`);
  }
}

// --- Run --------------------------------------------------------------------

if (!ADDRESS) console.warn("MAILING_ADDRESS isn't set: the footer shows a placeholder. Set it before turning the automation on.");

must(await resend.events.update(EVENT, { schema: { source: "string", firstName: "string" } }), "update event schema");

const emails = DAYS.map(parse);
const templateIds = [];
for (const email of emails) templateIds.push(await syncTemplate(email));
await syncAutomation(templateIds);

const testIndex = process.argv.indexOf("--test");
if (testIndex !== -1) {
  const to = process.argv[testIndex + 1];
  for (const [index, id] of templateIds.entries()) {
    must(
      await resend.emails.send({ to, template: { id, variables: { NAME: "DJ" } } }),
      `test send day ${index + 1}`,
    );
    console.log(`test: day ${index + 1} sent to ${to}`);
  }
}
