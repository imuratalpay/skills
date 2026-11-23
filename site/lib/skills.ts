/**
 * Every skill page renders from this file. Text in backticks renders as inline code.
 * Sources: ui-diff's README.md, SKILL.md, CHANGELOG.md, docs/release/v2.0.0.md and docs/example/comment.md, skills/type-taste/SKILL.md, ghost-cursor's skills/ghost-record/SKILL.md.
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
  /** "auto": the agent may load it when a task matches its description. "user": it only runs when typed. */
  invocation: "auto" | "user";
  /** ISO date of the last change to the skill's source. */
  updated: string;
  source: { label: string; href: string };
  whatItDoes: string[];
  whenToUse: string[];
  /** What the latest major version added, shown above "What it does". */
  release?: { version: string; items: string[] };
  /** Real output from the skill, trimmed. `output` is shown as written; `image` is a file in `public/`. */
  example?: {
    intro: string;
    output: string;
    image?: { src: string; width: number; height: number; alt: string; caption: string };
    source: { label: string; href: string };
  };
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
      "On every pull request it compares the UI against its base and posts one comment saying what changed visually.",
    short: "Measured before and after of a UI pull request, in one sticky PR comment.",
    pitch:
      "Compares every route a pull request touches at **base and head**, names the style changes it measured and posts **one sticky PR comment** that starts with the verdict. Only people who can read the repo can see the images.",
    install: {
      commands: ["npx skills add imuratalpay/skills"],
      note: "Installs every skill here, for Claude Code, Cursor, Codex and more. ui-diff needs git and Node.js 20.10+, and the GitHub CLI only to post. For the standalone CLI, clone `imuratalpay/ui-diff` and run `./install.sh`.",
      link: { label: "imuratalpay/ui-diff on GitHub", href: "https://github.com/imuratalpay/ui-diff" },
    },
    invoke: "/ui-diff",
    invocation: "auto",
    updated: "2026-11-23",
    source: { label: "imuratalpay/ui-diff", href: "https://github.com/imuratalpay/ui-diff" },
    release: {
      version: "2.1",
      items: [
        "Hover and focus states. Links, buttons and form fields in the first viewport are also checked hovered and reached with Tab, so a PR that only changes a hover color or drops a focus ring reads `button 'Save' · hover: background #1d4ed8 → #1e3a8a`, with a before and after crop.",
        "Recorded flows. List a few steps in `flows`, such as a click, typing or a wait, and ui-diff replays them on base and head and compares the page at each checkpoint, under `flow 'menu' · after open`. A flow that no longer gets through is reported: `flow 'checkout' stops at step 3 on head: button 'Pay' not found`.",
        "Component mode. Point `components` at one selector, on a route or after a flow, to get the same tight crop on both sides and only the changes inside it, under `component 'primary button'` with how its box changed. A component the selector no longer finds is reported as removed.",
      ],
    },
    example: {
      intro:
        "The repo’s verified example: one page committed at `6737326` and `cc13cab`. The primary button got more padding and rounder corners, the gap beside it grew by 1px and the email label turned blue. This is the top of the comment ui-diff wrote for it, trimmed.",
      output: [
        "### UI diff — 5 measured changes on 1 route",
        "",
        "**Base** `6737326` → **Head** `cc13cab` · 1 route · desktop, mobile · light, dark",
        "",
        "#### Measured changes",
        "",
        "**`/`**",
        "",
        "- `label 'Work email'` (`label`): color #0f172a → #2563eb — desktop, mobile · light",
        "- `label 'Work email'` (`label`): color #f8fafc → #2563eb — desktop, mobile · dark",
        "- `link 'Start free trial'` (`a.cta`): padding 8px 14px → 10px 18px — desktop, mobile · light, dark",
        "  - size 134.5×40px → 142.5×44px (from the padding change)",
        "  <details><summary>10 effects on other elements</summary>",
        "  …",
        "- `link 'Start free trial'` (`a.cta`): border-radius 4px → 8px — desktop, mobile · light, dark",
        "- `div.hero-actions`: gap 16px → 17px — desktop, mobile · light, dark",
      ].join("\n"),
      image: {
        src: "/ui-diff/compare/home__mobile__light__pair-1.png",
        width: 1620,
        height: 545,
        alt: "Before and after of the mobile page, side by side: the Start free trial button is a few pixels larger with rounder corners, and the link beside it sits further right. The changed row is outlined in pink.",
        caption:
          "The still pair for `/` on mobile, light, and the line ui-diff puts under it: link 'Start free trial': padding 8px 14px → 10px 18px · border-radius 4px → 8px",
      },
      source: { label: "docs/example/comment.md", href: "https://github.com/imuratalpay/ui-diff/blob/v2.0.0/docs/example/comment.md" },
    },
    whatItDoes: [
      "Works out which routes your changed files affect, using `ui-diff.config.json`, the framework’s routing and the import graph.",
      "Runs the PR’s base and head in temporary git worktrees, or uses preview URLs, and captures each route with Playwright. Clock, randomness, animations and fonts are frozen on both sides, so the same page gives the same pixels.",
      "Matches base and head elements, measures their style changes and checks each one against the changed pixels. A change that fails the check is listed as unverified, never dropped.",
      "Creates or updates one sticky PR comment. The images go to an orphan branch of the same repository, so only people who can read the repo can see them.",
    ],
    whenToUse: [
      "When a pull request changes components, styles or pages and reviewers would otherwise approve it from the code. Run `ui-diff check` on your branch first. Nothing gets posted until you publish.",
      "It also checks a menu, form or dialog after it is used and a single component on its own, puts design variants side by side (`?hero=1..4`), records hover and transition clips, reports new accessibility issues, and flags colors and spacing that match no design token.",
    ],
    playground: {
      title: "The full-page image from the 2.0 comment for the repo’s verified example, at commits `6737326` and `cc13cab`.",
      prompt: "Run the ui-diff skill on PR #123 and update the sticky PR comment.",
      phases: [
        {
          id: "before",
          label: "Before",
          caption: "Base `6737326`. The Start free trial button at 8px 14px padding, with 4px corners.",
          duration: 2600,
        },
        {
          id: "after",
          label: "After",
          caption: "Head `cc13cab`. Padding 10px 18px, 8px corners, and the Work email label in blue.",
          duration: 3400,
        },
        {
          id: "diff",
          label: "Diff",
          caption: "0.34% of pixels changed, in 2 areas. The 4px shift below the button is aligned out.",
          duration: 3400,
        },
      ],
    },
    prompts: [
      "Run the ui-diff skill on PR #123 and update the sticky PR comment.",
      "Show me what my branch changes visually before I open the PR.",
      "Compare ?hero=1..4 on the home page and add them to PR #88 so design can pick one.",
      "Check PR #88 for new accessibility issues and off-token colors in dark mode too.",
      "On PR #88, check the mobile menu open state and diff the primary button on its own.",
    ],
    pairs: [
      { slug: "type-taste", why: "Fix the type before review." },
      { slug: "ghost-record", why: "Demo the finished component." },
    ],
    keywords: ["pull request", "pr", "screenshot", "visual diff", "review", "playwright", "accessibility", "variants", "verdict", "style diff", "design tokens", "check", "hover", "focus", "flows", "component"],
  },
  {
    slug: "type-taste",
    title: "Type taste",
    summary:
      "Your agent sets type the way I do: every size, weight, grey and line-height, from years of shipping interfaces.",
    short: "My type values: Inter, a serif italic for emphasis, and grey before weight before size.",
    pitch:
      "**My own type values**, refined over years of shipping interfaces. Inter at reading size, **Newsreader italic** for emphasis, and hierarchy from **grey first, weight second, size last**.",
    install: {
      commands: ["npx skills add imuratalpay/skills"],
      note: "The bundled fonts (Inter, Newsreader, Geist Mono, Caveat) are free under the SIL Open Font License.",
    },
    invoke: "/type-taste",
    invocation: "auto",
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
      "Pair it with any general typography skill: that one supplies the technique and the accessibility floors, type-taste picks the values.",
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
      commands: ["npx skills add imuratalpay/skills"],
      note: "Your project also needs `@imuratalpay/ghost-cursor` and `motion`; the skill installs whatever is missing. It only runs when you type `/ghost-record`.",
      link: { label: "ghost-cursor docs for agents", href: "https://ghost-cursor.muratalpay.me/docs/agents" },
    },
    invoke: "/ghost-record",
    invocation: "user",
    updated: "2026-11-19",
    source: { label: "ghost-cursor docs", href: "https://ghost-cursor.muratalpay.me/docs/agent-skill" },
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
