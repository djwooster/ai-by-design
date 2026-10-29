import { offer } from "@/lib/content/offer";

/**
 * The legal pages. Each is a list of sections with plain paragraphs; the page
 * builds its table of contents from the headings. All of it is placeholder
 * until it's written properly. [TODO: legal]
 */
export type LegalSection = { id: string; heading: string; body: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

export const privacy: LegalDoc = {
  title: "Privacy policy",
  updated: "[TODO: date]",
  intro: "[TODO: legal] What this site collects, why, and what you can do about it.",
  sections: [
    { id: "collect", heading: "What I collect", body: ["[TODO: legal] Email addresses you give me, purchase details from Stripe, and anonymous analytics."] },
    { id: "use", heading: "How I use it", body: ["[TODO: legal] To send what you asked for, deliver purchases and improve the site."] },
    { id: "services", heading: "Services I use", body: ["[TODO: legal] Stripe for payments, Resend for email, Vercel for hosting and analytics, Skool for the course and community."] },
    { id: "choices", heading: "Your choices", body: ["[TODO: legal] Unsubscribe from any email, or ask me to delete your data."] },
    { id: "contact", heading: "Contact", body: ["[TODO: legal] How to reach me about privacy."] },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of service",
  updated: "[TODO: date]",
  intro: "[TODO: legal] The terms for using this site, the shop and the course.",
  sections: [
    { id: "use", heading: "Using the site", body: ["[TODO: legal]"] },
    { id: "purchases", heading: "Purchases", body: ["[TODO: legal] Shop products are digital and delivered by email."] },
    { id: "course", heading: "The course", body: ["[TODO: legal] The course and community are hosted on Skool, under Skool's terms as well as these."] },
    { id: "license", heading: "What you can do with what you buy", body: ["[TODO: legal]"] },
    { id: "liability", heading: "Liability", body: ["[TODO: legal]"] },
  ],
};

export const refunds: LegalDoc = {
  title: "Refund policy",
  updated: "[TODO: date]",
  intro: "[TODO: legal] How refunds work for the course and for shop products.",
  sections: [
    { id: "course", heading: "The course", body: [offer.guarantee, "[TODO: legal] How to ask, and how long a refund takes."] },
    { id: "shop", heading: "Shop products", body: ["[TODO: legal] The refund terms for digital downloads."] },
    { id: "contact", heading: "Asking for a refund", body: ["[TODO: legal] Where to write."] },
  ],
};
