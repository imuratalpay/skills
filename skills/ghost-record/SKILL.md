---
name: ghost-record
description: One sentence in, a verified ghost-cursor demo out. User-invoked only. Run it when the user types /ghost-record (or $ghost-record in Codex) followed by a component and an interaction, for example "/ghost-record like button, hover then click it". Finds the React component, turns the sentence into steps and runs one script. It starts the dev server if needed, records with human-like input, replays the take to check it, saves <component>.take.json next to the component, prints a <GhostReplay> snippet, and cleans up. Never ask the user anything unless no component matches.
disable-model-invocation: true
---

# ghost-record

Do all of it in one go. The user wrote one sentence because they don't want a conversation.

## 1. Find the component

Search the project with `rg` for the noun phrase before the colon ("like button"). Rank matches top to bottom and take the first rank that has a hit:

```
An exported component whose name is the phrase in PascalCase (LikeButton)?
├── Yes → it
└── No → a file whose name is the phrase in kebab-case (like-button.tsx)?
    ├── Yes → its main export
    └── No → a component whose JSX text or aria-label contains the phrase
        ├── Yes → the one with the fewest other matches in its file
        └── No → ask the user, the only question this skill ever asks
```

Skip `*.test.*`, `*.stories.*` and anything under `node_modules`. They render outside the app.

## 2. Write the steps

Read the component, then map each verb in the sentence to one step. Aim at elements by what's stable: `@name` for `data-ghost-id`, then `role=button[name=Like]`, then `text=Most popular`. Never aim by class name, because classes change with styling.

## 3. Run it

The project needs the package and Playwright. Check `package.json` first and install only what's missing:

```bash
npm i @imuratalpay/ghost-cursor motion
npm i -D playwright && npx playwright install chromium
```

Then run the script from the project root. It sits next to this file, in `scripts/`:

```bash
node <this skill's folder>/scripts/ghost-record.mjs \
  --component components/like-button.tsx#LikeButton \
  'hover @like' 'click @like' 'click role=button[name=Share]' 'click text=Copy link'
```

That's `/ghost-record like button: hover, click, then open the share menu and copy the link`. When it ends with two ✓ lines, show the user the snippet it printed and where to paste it. Don't edit their pages.

## Defaults

| Thing | Default | Why |
| --- | --- | --- |
| Where it records | The page that has the component as the direct child of a `<GhostCursor>`, otherwise a temporary `/ghost-stage` route | Recording in place keeps the page's layout and props; the temporary route is deleted at the end |
| Dev server | The one in `.next/dev/lock`, then ports 3000 to 3003, otherwise it starts one and stops it at the end | Next 16 refuses a second dev server for the same app |
| Box height | 320px on the temporary route, the embed's height in place | The take stores coordinates relative to the box |
| Props | None. Pass `--props '{"label":"Save"}'` when the component requires some | The temporary route mounts the component alone |
| Output | `<component>.take.json` next to the component | An existing take that a page imports is never overwritten |
| Verification | Preview replays the take; the final DOM must match the live run | Text, structure and attributes are compared, not styles |
| Content that changes by itself | Left out of the comparison, found by comparing two snapshots 1s apart | Clocks and counters can't match between two runs |
| Retries | 3 takes: full speed, then 85%, then 75%, each with 400ms more settle time, up to 1400ms | Most mismatches are animations still running at the check |

## Failure modes

| Output | What to do |
| --- | --- |
| `<target> isn't in the box at this point in the take` | Re-read the component. The element may only exist after an earlier step opens it, or the name is wrong. Fix the step and rerun |
| `three takes failed` with a diff | The component reacts differently to a replay than to real input, usually because it checks `event.isTrusted` or needs real focus. Tell the user which line differs |
| `no Next.js app contains this component` | Pass `--url` to a page that renders the component inside a `<GhostCursor>` |
| `the page threw during the take` | A replayed `setPointerCapture` throws for the synthetic pointer. Tell the user; don't work around it |
| `some targets are CSS paths` | The take works now but breaks when the markup changes. Suggest adding `data-ghost-id` to the elements in the steps |
