# xhs-ai-notes

**English** | [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Type](https://img.shields.io/badge/type-Agent%20Skill-blueviolet)](https://agentskills.io/specification)
![Hosts](https://img.shields.io/badge/hosts-Codex%20%7C%20Claude%20Code-black)

An agent skill that turns an AI-related topic into a ready-to-publish **Xiaohongshu (RED) photo post**: one cover plus 3–9 inner pages in 3:4, the post title and body, and a pinned comment containing every prompt as copy-paste text.

The look is editorial "magazine / UI notes" — restrained type, evidence-first copy, a sliced-sphere motif — with **two complete themes** (light & dark). Produced and used daily by **FUTURE SLICE · 未来切片**.

## What it produces

| Page type | Layout | Typical use |
| --- | --- | --- |
| **Prompt page** | Big issue number + title + BEFORE/AFTER illustration + 1–2 copy-ready prompts | "AI writes UI, four habits to fix" |
| **Screenshot review** | Full-width screenshot + one-line keyword caption + pros / cons | Comparing tools or skills on the same task |
| **Plain text page** | Numbered 01/02/03 paragraphs, no illustrations | Test conditions, conclusions, workflows |
| **Pick cover** | URL-bar hero + 2–4 artwork thumbnails | Recommending a single tool or skill |

Every run also writes the **post title (≤ 20 chars)**, a structured **post body**, and the **pinned comment** with the full prompt text — so the images and the copy ship together.

## How a run works

1. Confirm the topic, page count, and any screenshots you provide; pick the light or dark theme (dark when your screenshots are pale and need contrast).
2. The skill drafts the section copy under strict copy rules (titles ≤ 8 characters and single-line, prompts 20–70 characters each, no emoji, restrained tone) and asks you to confirm before drawing.
3. BEFORE/AFTER mock illustrations are assembled from a small library of "UI blocks" that show *what changed* — never random decoration.
4. Everything is written into a single `content.js` data file; the template (`card.html` / `render.js` / `composite.py`) is copied from `template/`.
5. Render and composite, then ship.

```bash
cd xhs-ai-notes/template
node render.js out && python3 composite.py out
```

Output: `card_01.png …` at **2172 × 2896** (3:4 at 2×), plus the post copy.

## Built-in quality gates

`render.js` QA-checks every page and refuses to pass until all reports are `OK`:

| Code | Meaning | Fix |
| --- | --- | --- |
| `CONTENT_TOO_LONG` | content runs past the bottom margin | trim the prompt text |
| `MOCK_OVERFLOW` | illustration content exceeds its frame | compress the mock |
| `TITLE_WRAPS` | title doesn't fit on one line | shorten the title |
| `TOO_WIDE` | horizontal overflow | reduce content width |

After the automated check, the skill is instructed to visually inspect every card (alignment, spacing, clipping) before delivery.

## Repository layout

```
xhs-ai-notes/            ← the skill (copy this folder)
├── SKILL.md              design spec, copy rules, content.js fields, full template source
├── template/             card.html · render.js · composite.py · content.js · fonts/
└── examples/             dark review issue · pick-cover issue · install-card template
```

## Installation

- **Easiest** — tell your agent: *"Please install this skill: `github.com/ghosthlh/xhs-ai-notes`"*
- **Claude Code** — copy `xhs-ai-notes/` into `~/.claude/skills/`
- **Any other agent** — load `xhs-ai-notes/SKILL.md`

## Rendering requirements

- **Node.js** with Playwright (Chromium)
- **Python 3** with numpy + Pillow
- **Fonts**: Inter and Source Han Sans / Noto Sans CJK SC; large numerals additionally use *Fraunces Italic* (variable, [SIL OFL 1.1](https://fonts.google.com/specimen/Fraunces/license)) — place it at `template/fonts/FrauncesItalic.ttf`, or rely on a system-installed Fraunces. The skill will ask you for the font file rather than substitute a lookalike.

## Design system (in brief)

- Canvas 1086 × 1448 CSS px, exported at 2×; margins 96/48/80.
- Exactly **2 typefaces** (Inter + Noto Sans CJK SC), **4 type sizes** (20/32/80/200) plus a 96 cover title, **4 text colors** (ink / body / muted / accent blue #2F6BFF; dark theme swaps to mint #2ED8AA).
- Spacing restricted to 8 / 16 / 24 / 32 / 48; hairlines fixed at 1 px, 12% opacity.
- Large numerals and cover TOC numbers are set in Fraunces Italic with a gradient fade and 1 px stroke — one layer of text, no doubling.
- Paper-grain noise is composited onto the background layer only (`composite.py`), keeping text and cards clean.

The full spec — including `content.js` field reference, illustration blocks, and the complete template source — lives in [`xhs-ai-notes/SKILL.md`](xhs-ai-notes/SKILL.md).

## Adding new styles

A new style is a theme inside `card.html` (modeled on the `html.dark` block) switched via `theme` in `content.js`, documented in a new "Theme: …" section of the SKILL.md. Workflow, copy rules, and scripts are shared. Only a fundamentally different workflow (e.g. video) warrants a separate skill.

## License

- Code & documentation: **MIT** — see [`LICENSE`](LICENSE)
- Fraunces font: **SIL Open Font License 1.1** — see `xhs-ai-notes/template/fonts/OFL.txt`
- "FUTURE SLICE / 未来切片" is the author's brand used as sample data — replace `brand` in `content.js` with your own name.
