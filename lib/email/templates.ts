import { site } from "@/lib/content/site";
import { siteUrl } from "@/lib/siteUrl";

/*
 * Transactional emails as plain HTML and text: one column, system type, the
 * site's ink and blue, nothing an email client can break.
 */

export type Email = { subject: string; html: string; text: string };

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#EDEEEE;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111111">
<div style="max-width:520px;margin:0 auto;background:#FFFFFF;border-radius:16px;padding:32px">
<p style="margin:0 0 28px;font-size:14px;font-weight:600;letter-spacing:-0.02em">${site.name}</p>
${body}
<p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #E2E4E4;font-size:12px;line-height:1.5;color:#5B5E5F">${site.author} · <a href="${siteUrl("/")}" style="color:#5B5E5F">${site.url.replace("https://", "")}</a></p>
</div></body></html>`;
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:#1F5E98;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:500;padding:12px 20px;border-radius:8px">${escape(label)}</a>`;
}

const p = (text: string) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3A3C3D">${text}</p>`;

export function deliveryEmail({ product, url, days }: { product: string; url: string; days: number }): Email {
  return {
    subject: `Your download: ${product}`,
    html: layout(
      `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;font-weight:500;letter-spacing:-0.03em">Thanks for buying ${escape(product)}.</h1>` +
        p(`Here's your download. The link works for ${days} days; reply to this email if it runs out.`) +
        `<p style="margin:24px 0">${button(url, "Download")}</p>` +
        p("[TODO: copy] A line on how to get the most out of it."),
    ),
    text: `Thanks for buying ${product}.\n\nDownload it here (the link works for ${days} days):\n${url}\n\nReply to this email if it runs out.`,
  };
}

export function checklistEmail({ url }: { url: string | null }): Email {
  const link = url ?? siteUrl("/free/app-store-checklist");
  return {
    subject: "[TODO: copy] Your App Store submission checklist",
    html: layout(
      `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;font-weight:500;letter-spacing:-0.03em">[TODO: copy] Here's your checklist.</h1>` +
        p("[TODO: copy] Every step between a finished build and a live App Store listing, in the order you'll need it.") +
        `<p style="margin:24px 0">${button(link, "Get the checklist")}</p>` +
        p("[TODO: copy] What the next emails in the sequence will cover."),
    ),
    text: `[TODO: copy] Here's your checklist:\n${link}`,
  };
}
