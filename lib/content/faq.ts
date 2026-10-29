import { offer } from "@/lib/content/offer";

export type Faq = { id: string; question: string; answer: string };

export const faq: Faq[] = [
  {
    id: "code",
    question: "Do I need to know how to code?",
    answer: "[TODO: copy] No. You need an idea, a Mac and the patience to work through each phase. Claude Code writes the code; the course teaches you to direct it.",
  },
  {
    id: "mac",
    question: "What do I need to get started?",
    answer: "[TODO: copy] A Mac, a Claude subscription and an Apple Developer account ($99 a year, paid to Apple) by the time you ship.",
  },
  {
    id: "start",
    question: "When does the course start?",
    answer: `[TODO: copy] Founding members join now. The course and the live calls start on January 1, 2027.`,
  },
  {
    id: "calls",
    question: "How do the live calls work?",
    answer: `[TODO: copy] ${offer.liveCallsPerWeek} calls a week in Skool: Q&A, members' app reviews and live builds. Every call is recorded, so you can catch up anytime.`,
  },
  {
    id: "refund",
    question: "What if the course doesn't launch?",
    answer: offer.guarantee,
  },
  {
    id: "app",
    question: "What kind of app will I build?",
    answer: "[TODO: copy] A productivity iOS app of your own, taken from idea to the App Store, following the same Method DJ used for FocusMode.",
  },
];
