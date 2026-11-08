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

const SITE = "https://ai-bydesign.dev";

function parse(day) {
  const raw = readFileSync(new URL(`../content/email-course/day-${day}.txt`, import.meta.url), "utf8");
  const [head, body] = raw.split(/^Body:\n/m);
  const field = (name) => head.match(new RegExp(`^${name}: (.+)$`, "m"))?.[1].trim();
  // "Image: /images/email/day-1.png | alt text" (a leading # turns it off)
  const [src, alt = ""] = (field("Image") ?? "").split("|").map((part) => part.trim());
  return {
    day,
    subject: field("Subject"),
    preview: field("Preview"),
    theme: field("Theme"),
    title: field("Title"),
    image: src ? { src: src.startsWith("http") ? src : SITE + src, alt } : null,
    body: body.trim(),
  };
}

// Brand colors, as in app/globals.css.
const C = {
  ink: "#111111",
  text: "#2B2D2E",
  muted: "#5B5E5F",
  line: "#E2E4E4",
  smoke: "#EDEEEE",
  tint: "#F4F5F5",
  blue: "#1F5E98",
  blueLight: "#5B9BD8",
  gray: "#B7BABB",
};
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Escapes, then styles `code` spans. */
const inline = (s) =>
  escape(s).replace(
    /`([^`]+)`/g,
    `<code style="font-family:${MONO};font-size:14px;background:${C.smoke};color:${C.ink};padding:2px 6px;border-radius:4px">$1</code>`,
  );

const LINK = /^\[link: (.+?) → (\S+)\]$/;
const STEP = /^(\d)\. (.+?)(?: \((\d+ min)\))?$/;

const p = (html, extra = "") =>
  `<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:${C.text}${extra}">${html}</p>`;

function step(number, title, minutes) {
  const pill = minutes
    ? `<td style="padding-left:10px"><span style="display:inline-block;background:${C.smoke};color:${C.muted};font-size:12px;line-height:1;padding:5px 8px;border-radius:999px;white-space:nowrap">${minutes}</span></td>`
    : "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:36px 0 14px"><tr>
<td style="width:28px;height:28px;background:${C.blue};border-radius:999px;color:#FFFFFF;font-size:14px;font-weight:600;text-align:center;vertical-align:middle">${number}</td>
<td style="padding-left:12px;font-size:19px;line-height:1.3;font-weight:600;letter-spacing:-0.01em;color:${C.ink}">${escape(title)}</td>${pill}
</tr></table>`;
}

function list(lines) {
  const rows = lines.map((line) => {
    // "Label: the rest" items get a bold label.
    const item = inline(line.slice(2)).replace(/^([^:<]{1,40}):/, `<strong style="color:${C.ink}">$1:</strong>`);
    return `<tr><td style="width:18px;vertical-align:top;padding-top:9px"><div style="width:6px;height:6px;background:${C.blue};border-radius:2px"></div></td><td style="padding:0 0 10px;font-size:16px;line-height:1.6;color:${C.text}">${item}</td></tr>`;
  });
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px;width:100%">${rows.join("")}</table>`;
}

function prompt(text) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 20px;width:100%"><tr><td style="background:${C.ink};border-radius:12px;padding:18px 20px">
<p style="margin:0 0 10px;font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.blueLight}">Prompt · copy and paste</p>
<p style="margin:0;font-family:${MONO};font-size:14px;line-height:1.65;color:${C.smoke}">${escape(text)}</p>
</td></tr></table>`;
}

function button(label, href) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0"><tr><td style="background:${C.blue};border-radius:8px">
<a href="${href}" style="display:inline-block;padding:14px 22px;font-size:16px;font-weight:600;color:#FFFFFF;text-decoration:none">${escape(label)} &rarr;</a>
</td></tr></table>`;
}

function signature() {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px"><tr>
<td style="width:44px;height:44px;background:${C.ink};border-radius:999px;color:#FFFFFF;font-size:15px;font-weight:600;text-align:center;vertical-align:middle">DJ</td>
<td style="padding-left:12px;font-size:15px;line-height:1.4;color:${C.ink}"><strong>DJ Wooster</strong><br><span style="color:${C.muted}">AI by Design</span></td>
</tr></table>`;
}

function postscript(text) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%"><tr><td style="background:${C.tint};border-radius:12px;padding:16px 18px;font-size:15px;line-height:1.6;color:${C.text}">
<strong style="color:${C.ink}">P.S.</strong> ${inline(text.replace(/^P\.S\. /, ""))}</td></tr></table>`;
}

function block(text) {
  const lines = text.split("\n");
  const link = text.match(LINK);
  if (link) return button(link[1], link[2]);
  if (text === "DJ") return signature();
  if (text.startsWith("P.S.")) return postscript(text);
  if (lines.every((line) => line.startsWith("- "))) return list(lines);
  const heading = lines.length === 1 && text.length < 60 && text.match(STEP);
  if (heading) return step(heading[1], heading[2], heading[3]);
  // A prompt to copy, on its own line in quotes.
  if (text.startsWith('"') && text.endsWith('"') && text.length > 120) return prompt(text.slice(1, -1));
  return p(inline(text).replace(/\n/g, "<br>"));
}

/** The dark band at the top: wordmark, progress through the five days, the day's title. */
function header({ day, theme, title }) {
  const bars = DAYS.map(
    (n) =>
      `<td style="width:20%;padding-right:${n < DAYS.length ? 6 : 0}px"><div style="height:4px;border-radius:2px;background:${n <= day ? C.blueLight : "#333333"}"></div></td>`,
  ).join("");
  return `<tr><td style="background:${C.ink};padding:28px 32px 32px">
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%"><tr>
<td style="font-size:15px;font-weight:600;letter-spacing:-0.02em;color:#FFFFFF">AI by Design</td>
<td style="text-align:right;font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.gray}">Day ${day} of 5</td>
</tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:20px 0 28px"><tr>${bars}</tr></table>
<p style="margin:0 0 8px;font-family:${MONO};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${C.blueLight}">${escape(theme)}</p>
<h1 style="margin:0;font-size:30px;line-height:1.15;font-weight:600;letter-spacing:-0.03em;color:#FFFFFF">${escape(title)}</h1>
</td></tr>`;
}

function footer() {
  const address = ADDRESS ? escape(ADDRESS) : "[TODO: mailing address]";
  return `<p style="margin:24px 0 0;text-align:center;font-size:12px;line-height:1.7;color:${C.muted}">You're getting this because you signed up for the free 5-day course at <a href="${SITE}" style="color:${C.muted}">ai-bydesign.dev</a>.<br>${address}<br><a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${C.muted}">Unsubscribe</a></p>`;
}

function html(email) {
  const blocks = email.body.split(/\n{2,}/).map(block).join("\n");
  // Light by default; inboxes that know the reader is in dark mode (Apple Mail
  // and a few others) swap in the dark version. Outlook desktop never sees it.
  const img = (src, attrs) => `<img src="${src}" alt="${escape(email.image.alt)}" width="600" ${attrs}>`;
  const image = email.image
    ? `<tr><td>${img(email.image.src.replace(/\.png$/, "-light.png"), 'class="img-light" style="display:block;width:100%;height:auto;border:0"')}<!--[if !mso]><!-->${img(email.image.src, 'class="img-dark" style="display:none;width:100%;height:auto;border:0;max-height:0;overflow:hidden"')}<!--<![endif]--></td></tr>`
    : "";
  return `<!doctype html><html><head><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark">
<style>@media (prefers-color-scheme: dark) { .img-light { display: none !important; } .img-dark { display: block !important; max-height: none !important; } }</style></head>
<body style="margin:0;background:${C.smoke};padding:32px 12px;font-family:${SANS}">
<div style="display:none;max-height:0;overflow:hidden">${escape(email.preview)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden">
${header(email)}
${image}
<tr><td style="padding:32px">
${blocks}
</td></tr>
</table>
<div style="max-width:600px;margin:0 auto">${footer()}</div>
</body></html>`;
}

function text({ body }) {
  const plain = body.replace(/^\[link: (.+?) → (\S+)\]$/gm, "$1: $2").replace(/`/g, "");
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
