# WELCOME TO BABYLS

**English** · [繁體中文](./README.zh-TW.md)

> An unofficial **fan impression site** for *Welcome to Demon School! Iruma-kun* — Traditional Chinese (Taiwan), seven chapters on one page, centered on Season 4’s music festival. Data cutoff: **2026-10-16**.

<p align="center">
  <img src="./public/art/academy.svg" alt="Original academy crest illustration" width="280" />
</p>

<p align="center">
  <a href="https://github.com/ReiKama414/iruma-demon-academy">Star</a>
  ·
  <a href="https://reikama414.vercel.app/">Portfolio</a>
  ·
  <a href="#quick-start">Quick start</a>
  ·
  <a href="#license--rights">License</a>
</p>

---

## Why

A non-commercial fan page to walk through seasons, characters, and Season 4 arcs in one scrollable stage — not an official product, and not affiliated with the rights holders.

## Highlights

- **Seven chapters** — wheel, trackpad, arrow keys, Page Up/Down, Home/End, nav dots, and chapter menu
- **Season 4 stage** — music festival, demon social, and idol battle arcs with titles, videos, stills, and related cast
- **Character atlas** — taxonomy, name search, outfit variants, and an interactive standing-art stage
- **Taiwan streaming** — seasonal filters and official PV playback; spoilers off by default
- **Accessibility** — `prefers-reduced-motion`; inactive scenes use `inert`; native dialogs with Esc

## Tech stack

| Area | Choice |
| --- | --- |
| App | Next.js · React · TypeScript |
| Motion | GSAP · Observer · ScrollTrigger |
| Media | react-youtube · Web Audio (original short cues) |
| Icons / type | Lucide · Noto via Google Fonts |

## Quick start

Node.js 24 LTS recommended (tests use Node’s native TypeScript loader).

```bash
npm install
npm run dev
```

If port 3000 is taken:

```bash
npm run dev -- --port 3109
```

Production:

```bash
npm run build
npm run start
```

Checks:

```bash
npm run typecheck
npm test
npm run check:links
```

`check:links` updates `docs/link-audit.json`. An HTTP OK only means the page exists — not that every episode is unlocked or purchased.

## Project structure

| Path | Role |
| --- | --- |
| `src/components/Academy.tsx` | Scene controller, Observer, ScrollTrigger, GSAP Context, Web Audio, UI |
| `src/components/Magic.tsx` | Original magic circle, note paths, Lucide theme marks |
| `src/components/YouTubePlayer.tsx` | Loads react-youtube on click; unloads when the dialog closes |
| `src/data/content.ts` | Anime, characters, chapters, sources, Taiwan platforms |
| `src/data/portraits.json` / `assets.ts` | Portrait manifest, rights fields, enable flags |
| `src/data/taxonomy.ts` | Hierarchy of 50 taxonomy nodes |
| `public/art/` | Original SVGs — not recreations of official Babyls buildings or crests |
| `docs/research.md` | Verification notes and known limits |

## Fan notice / third-party IP

This is an **unofficial, non-commercial fan work**. It is **not** affiliated with, endorsed by, or connected to NHK, the manga publisher, the animation production committee, or any related company.

- *Welcome to Demon School! Iruma-kun* (*魔入りました！入間くん*), characters, names, settings, official art, stills, logos, and trademarks belong to their respective rights holders (including the original author and related publishers / production entities)
- **MIT covers only original code and original assets created for this repo** (for example `public/art/` SVGs and site UI code). It does **not** grant any license to official illustrations, episode stills, videos, music, or other third-party materials
- Official standing art and stills are loaded remotely with source attribution kept in the UI and manifest; public availability ≠ redistribution permission
- YouTube embeds use the privacy-enhanced player after click; embedability depends on region and platform policy
- Character names follow common Taiwan platform translations; other localizations may differ

See also `docs/research.md` and the in-site source / asset log.

## Links

| | |
| --- | --- |
| Repository | [iruma-demon-academy](https://github.com/ReiKama414/iruma-demon-academy) |
| Author | [ReiKama414](https://github.com/ReiKama414) |
| Portfolio | [Personal site](https://reikama414.vercel.app/) |
| License text | [LICENSE](./LICENSE) |

## License / rights

**Explicit exception to the default All Rights Reserved policy:** original source code in this repository is licensed under the **MIT License**.

Copyright (c) 2026 ReiKama414 — applies to original code and original assets only.

Third-party IP (the anime / manga and related materials) is **not** owned by ReiKama414 and is **not** licensed under MIT. Fan presentation here does not claim ownership or transfer of those rights.

- [GitHub](https://github.com/ReiKama414/iruma-demon-academy)
- [Personal site](https://reikama414.vercel.app/)
- [Full MIT text](./LICENSE)

---

<sub>Unofficial fan project · ReiKama414 · 2026</sub>
