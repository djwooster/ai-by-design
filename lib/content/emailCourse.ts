/**
 * The free 5-day email course: the opt-in page at /free/5-day-course and the
 * lesson pages each email links to (/free/5-day-course/day-n). The emails
 * live in content/email-course/ and are synced to Resend by
 * scripts/email-course-sync.mjs.
 */
export const emailCourse = {
  label: "Free 5-day email course",
  title: "Go from app idea to an app on your phone in five days.",
  accent: "five days.",
  lede: "Five short emails, 15–30 minutes a day. One clear path and only three tools, with Claude as your guide, from a one-paragraph vision to a real project running on your iPhone.",
  promises: [
    "Skip the overwhelm: three tools, in the right order",
    "Map your whole app before you build a single screen",
    "See your app running on your own phone with Expo Go",
  ],
  cta: "Send me Day 1",
  fineprint: "Day 1 arrives right away. After Day 5, you'll get the occasional email about the course. Unsubscribe anytime.",
  days: [
    { title: "Tools and vision", note: "The only three tools you need, and a one-paragraph vision written with Claude." },
    { title: "Design", note: "Map your whole app as a flow of screens, and learn the ten words Claude Code listens to." },
    { title: "Prompt", note: "Have Claude write your first Claude Code prompt from your vision, flow and references." },
    { title: "Build", note: "Run the prompt, open your app on your phone in Expo Go, and tour the files." },
    { title: "Refine, and what's next", note: "One round of polish, and the road to TestFlight and the App Store." },
  ],
  /** The band under the form: who the course is for. */
  fit: {
    title: "Made for anyone with an app idea and too many tabs open.",
    accent: "an app idea",
    label: "You're in the right place if…",
    items: [
      "You have an app idea and no engineering team to build it",
      "Every tool, tutorial and thread tells you something different",
      "You've tried AI coding tools but never got past a demo",
      "You want a real app you own, not a no-code prototype",
    ],
  },
  /** Meet DJ: a short video beside a hello. */
  about: {
    title: "Hi, I'm DJ. I spent 8+ years designing apps other people built.",
    accent: "DJ",
    body: "Startups, banks, hospitals, EdTech platforms serving millions. Now I design and build my own apps with Claude Code. FocusMode is live on the web and in App Store review right now, and these five emails are where that process starts.",
    videoLength: "[TODO: 0:00]",
  },
  confirmation: {
    title: "Day 1 is on its way.",
    body: "Check your inbox. If it isn't there in a few minutes, look in promotions or spam.",
  },
};

/** One part of a lesson page. Each field that's present renders, in this order. */
export type LessonSection = {
  title: string;
  minutes?: number;
  note?: string;
  video?: { length: string };
  /** A prompt to paste into Claude or Claude Code, with a copy button. */
  prompt?: string;
  /** Terminal commands, each with a copy button. */
  commands?: { label: string; command: string }[];
  items?: { label: string; text: string; href?: string }[];
  /** A placeholder for something DJ still has to make. */
  todo?: string;
};

export type Lesson = { slug: string; day: number; title: string; lede: string; sections: LessonSection[] };

export const lessons: Lesson[] = [
  {
    slug: "day-1",
    day: 1,
    title: "The only three tools you need.",
    lede: "Get set up, collect what you like, and write a one-paragraph vision for your app with Claude.",
    sections: [
      {
        title: "Your three tools",
        minutes: 5,
        note: "Get a Claude plan that includes Claude Code, and install Expo Go on your phone. Ignore every other tool for now.",
        items: [
          { label: "Claude", text: "Your thinking partner: shape the idea, plan the app, write your prompts.", href: "https://claude.ai" },
          { label: "Claude Code", text: "The builder. It writes and edits the code on your computer. You'll set it up on Day 4.", href: "https://code.claude.com/docs/en/setup" },
          { label: "Expo Go", text: "A free iPhone app that opens the app you're building, live, while you work on it.", href: "https://apps.apple.com/us/app/expo-go/id982107779" },
        ],
      },
      {
        title: "Reference checklist",
        minutes: 15,
        note: "Save 5–10 screenshots into one folder, and write one line about what you like in each. The lines matter more than the pictures.",
        items: [
          { label: "The vibe", text: "One or two images that capture the feeling. They don't have to be apps: a product, a poster, a car dashboard." },
          { label: "Screens", text: "Apps that do something similar to yours, or that you just love using." },
          { label: "Details", text: "A button, a font, a chart, a transition you keep noticing." },
          { label: "Notes", text: "One line each: \"Chunky buttons that feel physical.\" \"Lots of empty space.\"" },
        ],
      },
      {
        title: "Write your vision with Claude",
        minutes: 10,
        note: "Open Claude, paste this, fill in the brackets, and attach your screenshots with their notes. Keep the chat open for tomorrow.",
        prompt:
          "I want to build an iPhone app. My idea: [your idea]. It's for [who]. Ask me questions one at a time until you can write a one-paragraph vision for the app, plus a short list of what the first version should and shouldn't include. Keep the first version small.",
      },
    ],
  },
  {
    slug: "day-2",
    day: 2,
    title: "Think in flows, not screens.",
    lede: "Map your whole app on one page, and learn the words that let you steer Claude Code precisely.",
    sections: [
      {
        title: "Map your flow",
        minutes: 15,
        note: "Go back to yesterday's Claude chat so it remembers your vision, and paste this. Then sketch it: one box per screen, arrows between them.",
        prompt:
          "Map the full user flow for the first version of my app, from opening it for the first time to finishing the main task. List every screen, what's on it, and what the user taps to get to the next one. Use the fewest screens possible, and point out anything that could be cut.",
      },
      {
        title: "Three checks for every flow",
        items: [
          { label: "The main path first", text: "Map the path to the main thing. Settings, profiles and edge cases come later." },
          { label: "First time vs. every time", text: "What someone sees the first time they open the app is often different from day ten." },
          { label: "Count the taps", text: "Every tap you remove between opening the app and the main thing makes it feel better." },
        ],
      },
      {
        title: "Flow template",
        note: "Next to each box, note its main components and any states it needs. That page is half of tomorrow's prompt.",
        todo: "[TODO: printable flow template] A one-page PDF with screen boxes and space for components and states.",
      },
      {
        title: "Ten words to steer Claude Code",
        minutes: 10,
        items: [
          { label: "Screen", text: "One full view of your app." },
          { label: "Component", text: "A reusable piece, like a button or a card." },
          { label: "Navigation", text: "How people move between screens: tabs, back and forth, a sheet that slides up." },
          { label: "Layout", text: "How things are arranged on a screen." },
          { label: "State", text: "How something looks in different situations: pressed, loading, error." },
          { label: "Empty state", text: "What a screen shows before there's anything in it." },
          { label: "Design tokens", text: "Your named colors, font sizes and spacing, so everything stays consistent." },
          { label: "Typography", text: "Your fonts, sizes and weights." },
          { label: "Spacing", text: "The gaps between things, usually on a scale like 4, 8, 16, 24." },
          { label: "Transition", text: "How things move from one state or screen to the next." },
        ],
      },
    ],
  },
  {
    slug: "day-3",
    day: 3,
    title: "Let Claude write your prompt.",
    lede: "Turn your vision and flow into the prompt that builds your app, written by Claude from an example.",
    sections: [
      {
        title: "Get the example prompt",
        minutes: 2,
        note: "The structure I use for my own builds: what we're building, how to approach it, a working agreement, every screen, the design direction and the tech.",
        todo: "[TODO: example prompt] DJ's prompt structure, trimmed and rewritten for a simple Expo app, as a download.",
      },
      {
        title: "Have Claude write your prompt",
        minutes: 15,
        note: "Go back to the Claude chat from Days 1 and 2, attach the example, and paste this.",
        prompt:
          "Using my vision, my screen flow and my references from this chat, write a prompt for Claude Code to build the first version of my app with Expo. Follow the structure and level of detail of the example I attached. Include: what we're building and who it's for; every screen in my flow and what's on it; the design direction (colors, fonts, spacing and the feel of my references); and a working agreement: build in stages, get it running before polishing, stop after each stage with a short summary, and ask me before any big decision. Leave Claude Code room to suggest design ideas within that direction.",
      },
      {
        title: "Read it like a designer",
        minutes: 8,
        note: "If something's off, tell Claude what to change, in plain words. Then save the final prompt in a text file.",
        items: [
          { label: "Every screen is in it", text: "If a screen from your flow is missing, Claude Code won't build it." },
          { label: "A stranger could picture it", text: "If the design section says \"modern and clean,\" push for colors, space and feel." },
          { label: "It still leaves room", text: "A clear direction, not a pixel-by-pixel spec. That room is where Claude Code can surprise you." },
        ],
      },
    ],
  },
  {
    slug: "day-4",
    day: 4,
    title: "Your app, on your phone.",
    lede: "About 30 minutes from an empty folder to your app running on your iPhone. You'll need a Mac or Windows computer and Expo Go on your phone.",
    sections: [
      {
        title: "Watch it first",
        video: { length: "[TODO: 0:00]" },
      },
      {
        title: "Set up",
        minutes: 10,
        note: "Install both, then make a new, empty folder for your app and open your terminal in it.",
        items: [
          { label: "Node.js", text: "Install the LTS version. It runs your app on your computer while you build.", href: "https://nodejs.org/en/download" },
          { label: "Claude Code", text: "The official setup guide, if the commands below don't work for you.", href: "https://code.claude.com/docs/en/setup" },
        ],
        commands: [
          { label: "Install Claude Code on a Mac", command: "curl -fsSL https://claude.ai/install.sh | bash" },
          { label: "Install Claude Code on Windows (PowerShell)", command: "irm https://claude.ai/install.ps1 | iex" },
        ],
      },
      {
        title: "Build",
        minutes: 15,
        note: "Start Claude Code in your app's folder and paste yesterday's prompt. It asks before running commands or creating files: read what it's asking, then approve. When it stops to summarize a stage, tell it to keep going.",
        commands: [{ label: "Start Claude Code", command: "claude" }],
      },
      {
        title: "Open it on your phone",
        minutes: 5,
        note: "When the first stage is ready, start the app and scan the QR code with your iPhone camera. It opens in Expo Go.",
        commands: [
          { label: "Start your app", command: "npx expo start" },
          { label: "If your phone can't connect", command: "npx expo start --tunnel" },
        ],
      },
      {
        title: "Troubleshooting",
        items: [
          { label: "Won't connect", text: "Put your phone and computer on the same Wi-Fi, or use the tunnel command above." },
          { label: "An error", text: "Copy it into Claude Code and ask it to fix it. That's not cheating. That's the workflow." },
          { label: "Stuck", text: "Hit reply on today's email and tell me where. I read everything." },
        ],
      },
      {
        title: "Take the tour",
        minutes: 5,
        note: "Ask Claude Code to show you around. You don't need to memorize it, just know your way around your own house.",
        prompt:
          "Give me a tour of this project's files and folders, like I've never coded before. What should I touch, and what should I leave alone?",
      },
    ],
  },
  {
    slug: "day-5",
    day: 5,
    title: "Make it yours.",
    lede: "One round of polish, and what stands between your build and the App Store.",
    sections: [
      {
        title: "One round of polish",
        minutes: 15,
        note: "Put your app next to your Day 1 screenshots and write down the three things that bother you most. Fix them one at a time: screenshot on your phone, paste it into Claude Code, say what's wrong and what you want instead.",
        prompt:
          "[Attach a screenshot] On this screen, [what's wrong]. I want [what you want instead], in the same style as the rest of the app. Change only this.",
      },
      {
        title: "The road to the App Store",
        minutes: 5,
        items: [
          { label: "TestFlight", text: "Put your app on other people's phones before launch. Needs Apple's developer account ($99/year) and a real build, which Expo's build service can make." },
          { label: "Your listing", text: "Name, description, screenshots, privacy details and a support link." },
          { label: "App Review", text: "Apple checks your app before it goes live, and explains very little along the way." },
          { label: "The free checklist", text: "Every step between a finished build and a submitted app.", href: "/free/app-store-checklist" },
        ],
      },
    ],
  },
];

export const getLesson = (slug: string) => lessons.find((lesson) => lesson.slug === slug);
