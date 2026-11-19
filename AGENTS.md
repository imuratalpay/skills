# AGENTS.md

This repository is a collection of agent skills. Each skill is a folder at `skills/<name>/` with a `SKILL.md` (YAML frontmatter plus instructions) and any files it refers to. The site at `site/` (Next.js) documents them at https://skills.muratalpay.me.

## Install

```sh
npx skills add imuratalpay/skills        # every skill, into this project
npx skills add imuratalpay/skills -g     # every skill, for all projects
npx skills add imuratalpay/skills --list # list them without installing
```

Machine-readable index: https://skills.muratalpay.me/skills.json. Each skill page is also served as markdown at `https://skills.muratalpay.me/<name>.md`, and https://skills.muratalpay.me/llms.txt lists them all.

## Skills

| Skill | Invocation | Use it when |
|---|---|---|
| `ui-diff` | auto, or `/ui-diff` | A pull request or branch changes UI and reviewers should see it: before/after screenshots, visual diffs, design variants (`?hero=1..4`), hover or transition clips, design-token or accessibility checks, protected preview deployments. |
| `type-taste` | auto, or `/type-taste` | Any typography decision or review in a web project: fonts, sizes, line-height, weights, tracking, greys, line length, headings, labels, numbers, links, font loading. |
| `ghost-record` | user only: `/ghost-record` (`$ghost-record` in Codex) | The user asks to record a ghost-cursor demo of a React component in one sentence. Never start it on your own. |

**auto** means the agent may load the skill when the task matches its `description`. **user only** means the skill has `disable-model-invocation: true` in `SKILL.md` and `policy.allow_implicit_invocation: false` in `agents/openai.yaml`, so it runs only when typed.

## Adding a skill

1. Create `skills/<name>/SKILL.md`. `name:` in the frontmatter must equal the folder name (lowercase, digits, hyphens).
2. `description:` is required. Start with what the skill does, then a `Use when ...` sentence listing the tasks and phrases that should trigger it.
3. User-invoked only: add `disable-model-invocation: true` to the frontmatter and `agents/openai.yaml` containing:
   ```yaml
   policy:
     allow_implicit_invocation: false
   ```
4. Keep supporting files inside the skill folder (`scripts/`, `references/`, assets) and refer to them by relative path. Never commit secrets, `node_modules` or build output.
5. Update the table above, the table in `README.md`, and the site: an entry in `site/lib/skills.ts` (set `invocation` to `"auto"` or `"user"`) and its slug in `site/lib/nav.ts`. `site/DESIGN.md` has the rest.
6. Verify: `npx skills add . --list` lists the skill, and `npm run build && npm run lint` pass in `site/`.

## Rules for this repo

- Skill text names no people or sites as inspiration. State the rules and values themselves.
- The site's `skills.json`, `/<name>.md` and `llms.txt` render from `site/lib/skills.ts`. Change the data there, not the routes.
