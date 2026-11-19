/**
 * Every skill page renders from this file. Text in backticks renders as inline code.
 * Sources: ui-diff's README.md and SKILL.md, skills/type-taste/SKILL.md, ghost-cursor's skills/ghost-record/SKILL.md.
 */

export type PhaseId = "before" | "after" | "diff";

export type Skill = {
  slug: string;
  title: string;
  /** One sentence on what the skill fixes. */
  summary: string;
  /** A shorter line for search and the sidebar. */
  short: string;
  /** The paragraph on the index. **Double asterisks** mark the phrases to read first. */
  pitch: string;
  install: {
    commands: string[];
    note?: string;
    link?: { label: string; href: string };
  };
  invoke: string;
  /** ISO date of the last change to the skill's source. */
  updated: string;
  source: { label: string; href: string };
  whatItDoes: string[];
  whenToUse: string[];
  playground: {
    title: string;
    /** A real prompt for this skill, shown above the stage. */
    prompt: string;
    phases: { id: PhaseId; label: string; caption: string; duration: number }[];
  };
  prompts: string[];
  pairs: { slug: string; why: string }[];
  keywords: string[];
};

export const SKILLS: Skill[] = [
  {
    slug: "ui-diff",
    title: "UI diff",
    summary:
      "Run it on a pull request that changes UI and it posts one comment with before, after and highlighted-diff screenshots. Reviewers see the change before they approve it.",
    short: "Before, after and diff screenshots of a UI pull request, in one sticky PR comment.",
    pitch:
      "Screenshots every route a pull request touches at **base and head**, diffs them and posts **one sticky PR comment** with the images and a short UX summary. Only people who can read the repo can see the images.",
    install: {
      commands: ["git clone https://github.com/imuratalpay/ui-diff.git", "cd ui-diff && ./install.sh --claude"],
      note: "`--claude` installs into `~/.claude/skills`, which Cursor reads too. Use `--codex` for Codex. You need git and Node.js 20.10+; the GitHub CLI only to post.",
    },
    invoke: "/ui-diff",
    updated: "2026-11-19",
    source: { label: "imuratalpay/ui-diff", href: "https://github.com/imuratalpay/ui-diff" },
    whatItDoes: [
      "Works out which routes your changed files affect, using `ui-diff.config.json`, the framework’s routing and the import graph.",
      "Runs the PR’s base and head in temporary git worktrees and captures each route with Playwright. It seeds randomness and waits for fonts and animations first, so the same page gives the same pixels.",
      "Diffs the screenshots with pixelmatch and builds `before | after | diff` images, plus zoomed crops of the largest changed areas.",
      "Writes a short UX summary for a designer or PM and shows it to you before it posts anything.",
      "Creates or updates one sticky PR comment. The images go to an orphan branch of the same repository, so only people who can read the repo can see them.",
    ],
    whenToUse: [
      "When a pull request changes components, styles or pages and reviewers would otherwise approve it from the code. You can run it on your branch before you open the PR. Nothing gets posted until you publish.",
      "It also puts design variants side by side (`?hero=1..4`), records hover and transition clips, reports new accessibility issues, and flags colors and spacing that match no design token.",
    ],
    playground: {
      title: "One landing page from the ui-diff repo’s verified example, at commits `6737326` and `09cdd81`.",
      prompt: "Run the ui-diff skill on PR #123 and update the sticky PR comment.",
      phases: [
        {
          id: "before",
          label: "Before",
          caption: "Base `6737326`. A blue button and a one-line headline.",
          duration: 2600,
        },
        {
          id: "after",
          label: "After",
          caption: "Head `09cdd81`. The headline wraps to two lines and the button is a violet pill.",
          duration: 3400,
        },
        {
          id: "diff",
          label: "Diff",
          caption: "4.96% of pixels changed, in 18 areas. Each one gets a box.",
          duration: 3400,
        },
      ],
    },
    prompts: [
      "Run the ui-diff skill on PR #123 and update the sticky PR comment.",
      "Show me what my branch changes visually before I open the PR.",
      "Compare ?hero=1..4 on the home page and add them to PR #88 so design can pick one.",
      "Check PR #88 for new accessibility issues and off-token colors in dark mode too.",
    ],
    pairs: [
      { slug: "type-taste", why: "Fix the type before review." },
      { slug: "ghost-record", why: "Demo the finished component." },
    ],
    keywords: ["pull request", "pr", "screenshot", "visual diff", "review", "playwright", "accessibility", "variants"],
  },
  {
    slug: "type-taste",
    title: "Type taste",
    summary:
      "Your agent takes every size, weight, grey and line-height from measurements of 18 sites I like.",
    short: "Measured type values: Inter, a serif italic for emphasis, and grey before weight before size.",
    pitch:
      "Typography values **measured on 18 sites** I like. Inter at reading size, **Newsreader italic** for emphasis, and hierarchy from **grey first, weight second, size last**.",
    install: {
      commands: ["npx skills add imuratalpay/skills"],
      note: "The bundled fonts (Inter, Newsreader, Geist Mono, Caveat) are free under the SIL Open Font License.",
    },
    invoke: "/type-taste",
    updated: "2026-11-18",
    source: { label: "imuratalpay/skills", href: "https://github.com/imuratalpay/skills/tree/main/skills/type-taste" },
    whatItDoes: [
      "Decides what the page is for first. A reading page keeps every heading at body size in 550; a landing page gets one display line at 48/48.",
      "Gives each text role one size, line-height, weight and grey: prose 16/26 in fg-2, meta 13/21.125 in fg-3, labels in Geist Mono 12/16 caps.",
      "Uses a five-step grey ladder for light and dark, with no pure black and nothing you have to read below 4.9:1.",
      "Sets emphasis in Newsreader italic instead of bold, never uses 600 or 700, and turns on tabular numbers where digits change.",
      "Ships `tokens.css`, a Tailwind and `next/font` setup, and `audit.js`, which checks a page from the browser console and prints every failing element.",
    ],
    whenToUse: [
      "Any type decision in a web project: fonts, sizes, line-heights, weights, tracking, greys, headings, labels, numbers, links and font loading. Also when a page feels loud or flat and you can’t say why.",
      "It layers on top of `emil-typography`. Emil supplies the technique and the accessibility floors; type-taste picks the values.",
    ],
    playground: {
      title: "The same HTML rendered twice, from the worked example in `skills/type-taste/before-after`.",
      prompt: "/type-taste fix the typography on this page",
      phases: [
        {
          id: "before",
          label: "Before",
          caption: "Browser defaults. A big bold title, black text, a bold table head and a wide measure.",
          duration: 2600,
        },
        {
          id: "after",
          label: "After",
          caption: "type-taste. The title at body size in 550, prose in grey, Newsreader italic for emphasis, mono caps on the table head.",
          duration: 4200,
        },
      ],
    },
    prompts: [
      "/type-taste fix the typography on this page",
      "/type-taste audit the blog post template",
      "This page feels loud. Can you calm the headings down?",
      "Set up Inter, Newsreader and Geist Mono with next/font in this app.",
    ],
    pairs: [
      { slug: "ui-diff", why: "Show reviewers what changed." },
      { slug: "ghost-record", why: "Record the demo afterwards." },
    ],
    keywords: ["typography", "fonts", "inter", "newsreader", "geist mono", "grey", "weight", "line-height", "audit"],
  },
  {
    slug: "ghost-record",
    title: "Ghost record",
    summary:
      "Describe an interaction in one sentence. The skill records a ghost-cursor demo, checks it and hands you the snippet.",
    short: "Records a ghost-cursor demo of a React component from one sentence.",
    pitch:
      "Turns **one sentence** into a recorded ghost-cursor demo of a React component. It records with human-like input, **replays the take to check it** and prints the snippet to paste.",
    install: {
      commands: ["npm i @imuratalpay/ghost-cursor"],
      link: { label: "Steps to add the skill folder", href: "https://ghost-cursor-seven.vercel.app/docs/agents" },
    },
    invoke: "/ghost-record",
    updated: "2026-11-19",
    source: { label: "ghost-cursor docs", href: "https://ghost-cursor-seven.vercel.app/docs/agent-skill" },
    whatItDoes: [
      "Finds the component from your sentence: an export with that name, then a file, then JSX text or an `aria-label` that matches.",
      "Turns each verb into a step aimed at something stable: `data-ghost-id` first, then role and name, then text. Never a class name.",
      "Runs one script that starts the dev server if needed and records with human-like mouse and keyboard input.",
      "Replays the take and checks that the final DOM matches the live run. If it doesn’t, it records again, slower, up to three times.",
      "Saves `<component>.take.json` next to the component, prints a `<GhostReplay>` snippet and cleans up. It doesn’t edit your pages.",
    ],
    whenToUse: [
      "When you want a live demo of a React component in a post or a docs page, and you can say in one sentence what the cursor should do. It only stops to ask when no component matches.",
      "It works in Next.js projects that use `@imuratalpay/ghost-cursor`. In other setups, point it at a page that already renders the component inside a `<GhostReplay>`.",
    ],
    playground: {
      title: "A real run on the ghost-cursor site, recording its filter list.",
      prompt: '/ghost-record filter list: type "to", then pick Tooltip',
      phases: [
        {
          id: "before",
          label: "Before",
          caption: "By hand: open the page with `?record`, do the interaction, then copy the JSON into a file.",
          duration: 4200,
        },
        {
          id: "after",
          label: "After",
          caption: "With the skill, you type one sentence. The script records, replays to check and prints the snippet.",
          duration: 6600,
        },
      ],
    },
    prompts: [
      "/ghost-record like button: hover, then click it",
      "/ghost-record filter list: type “to”, then pick Tooltip",
      "/ghost-record like button: hover, click, then open the share menu and copy the link",
      "Record a demo of the sort menu: open it and pick Most popular.",
    ],
    pairs: [
      { slug: "type-taste", why: "Set the type before recording." },
      { slug: "ui-diff", why: "Show the change in the PR." },
    ],
    keywords: ["demo", "cursor", "recording", "take", "replay", "react", "component", "animation"],
  },
];

export const getSkill = (slug: string) => SKILLS.find((s) => s.slug === slug);

export const SITE = {
  name: "skills",
  url: "https://skills.muratalpay.me",
  title: "skills · Murat Alpay",
  author: "Murat Alpay",
  authorUrl: "https://muratalpay.me",
  authorX: "https://x.com/imuratalpay",
  repo: "https://github.com/imuratalpay/skills",
  description:
    "Skills by Murat Alpay, a design engineer, that help coding agents build and review interfaces. New ones are added as he writes them.",
};

/** "2026-11-19" → "19 Nov 2026", the format type-taste uses for dates. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${d} ${month} ${y}`;
}
