# CLAUDE.md — Dilli Bites

This file is the canonical reference for AI assistants (and developers) working in this repository. It describes the project structure, tech stack, development workflows, testing procedures, and conventions to follow.

---

## Project Overview

**Dilli Bites** is a static restaurant website for an Indian street food outlet (momos, snacks, pizza, extras). The site is deployed on Vercel and served locally via an Express.js server.

- **Main page** (`index.html`): Full single-page site with anchor-based navigation.
- **V2 design** (`v2.html`): An alternative mobile-first redesign accessible at `/v2`.
- **No backend, no database**: All menu content is hardcoded in HTML. There is no API or data persistence layer.

---

## Repository Structure

```
dilli-bites/
├── index.html                  # Main website (single-page, anchor navigation)
├── v2.html                     # Alternative V2 UI design (mobile-first)
├── v2/
│   └── index.html              # Redirect shim → /v2.html
├── server.js                   # Express server (local dev)
├── vercel.json                 # Vercel deployment config (URL rewrites)
├── package.json                # npm config: scripts, dependencies
├── package-lock.json           # Locked dependency tree
├── images/                     # All site images (WebP format)
│   ├── food_icon/              # Category icons (burger, fries, momos, pizza)
│   └── *.webp                  # Menu item images
├── scripts/
│   └── convert-images.js       # Sharp-based image conversion CLI
├── tests/
│   └── web-app-test.spec.js    # Playwright E2E test suite
├── test-results/               # Playwright output (auto-generated, not committed)
├── .github/
│   └── skills/
│       ├── image-compression/SKILL.md  # AI skill: image optimization workflow
│       └── web-app-test/SKILL.md       # AI skill: web app testing workflow
└── .gitignore                  # Excludes node_modules/
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | LTS |
| Server | Express.js | ^5.2.1 |
| Frontend | Vanilla HTML5 + CSS3 | — |
| Image processing | Sharp | ^0.34.5 |
| E2E testing | Playwright | ^1.59.1 |
| Deployment | Vercel | — |

There is no frontend framework (React, Vue, etc.) — all markup is plain HTML with inline `<style>` blocks.

---

## Development Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time or after upgrades)
npx playwright install

# Start local development server
npm start
# → http://localhost:3000
```

The server defaults to port **3000**. Override with the `PORT` environment variable:

```bash
PORT=8080 npm start
```

---

## Available npm Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm start` | `node server.js` | Start local Express server |
| `npm run images:cards` | `convert-images.js images --width 720 --height 480 --fit cover --quality 76 --overwrite` | Convert/resize all card images to WebP at 720×480 |
| `npm run images:webp` | `convert-images.js` | Convert all images in `images/` to WebP (default quality 80) |

`npm test` is a placeholder and intentionally fails — use Playwright directly (see Testing section).

---

## Pages and Routing

### `index.html` — Main Page
Single-page layout. Sections are navigated via anchor links:

| Anchor | Section |
|---|---|
| `#momos` | Momos menu |
| `#snacks` | Snacks menu |
| `#pizza` | Pizza menu |
| `#extras` | Extras/sides menu |
| `#contact` | Location and contact info |

Key HTML structure:
- `<nav>` — fixed top navigation bar with logo and anchor links
- `.hero` — hero section with CTA buttons ("Explore Menu" → `#momos`, "Find Us" → `#contact`)
- `.info-bar` — location, phone, hours strip
- `<footer>` — payment methods and closing info

Design tokens are CSS custom properties in the `<style>` block:
- `--yellow`, `--black`, `--red`, `--white`, `--gray` — brand palette
- Google Fonts: **Bebas Neue** (headings), **Montserrat**, **Inter** (body)

### `v2.html` — V2 Design
Mobile-first redesign (max-width: 470px). Accessed at `/v2`.

Design system:
- Dark theme using `--bg-0`, `--bg-1`, `--bg-2`, `--card`, `--accent` CSS variables
- Google Fonts: **Sora**, **Plus Jakarta Sans**
- Glowing animated background elements
- Sticky top bar, service category cards

### `v2/index.html` — Redirect Shim
A simple meta-refresh redirect to `/v2.html`. Used for sub-path resolution.

---

## Server Configuration

`server.js` is minimal Express:

- **`GET /v2`** → serves `v2.html` directly
- **`GET /v2/`** → 301 redirect to `/v2`
- **Static middleware** → serves all files from repository root (images, HTML, etc.)

`vercel.json` handles the same routing for production via Vercel URL rewrites.

---

## Images

All images are stored in `/images/` in **WebP format** with lazy loading (`loading="lazy"`) and descriptive `alt` attributes.

### Image Conventions
- All images must be WebP format (no PNG or JPG in production)
- All `<img>` tags must have non-empty `alt` attributes (required by Playwright accessibility test)
- Menu card images target **720×480px** at **76% quality** (`npm run images:cards`)
- Logo and special assets use higher quality or lossless settings

### Adding or Replacing Images
1. Add the source image (PNG/JPG) to `/images/`
2. Run `npm run images:cards` to convert/resize to WebP (overwrites existing)
3. Reference via `<img src="images/filename.webp" alt="Description" loading="lazy">`
4. Do not commit PNG/JPG source files if the WebP already exists

See `.github/skills/image-compression/SKILL.md` for full Sharp optimization workflow.

---

## Testing

### Running Playwright Tests

Playwright E2E tests require the server to be running:

```bash
# Terminal 1: start the server
npm start

# Terminal 2: run Playwright tests
npx playwright test tests/web-app-test.spec.js

# Run with browser UI visible
npx playwright test --headed

# View HTML report after a run
npx playwright show-report
```

### Test Suite (`tests/web-app-test.spec.js`)

All tests target `http://localhost:3000`:

| Test | What it validates |
|---|---|
| Page loads without console errors | No JavaScript errors in browser console |
| Validate HTML structure | `<nav>`, `.hero`, `#momos`, `#snacks`, `#pizza`, `#contact`, `<footer>` all exist and are visible |
| Test internal links | Anchor links `#momos`, `#snacks`, `#pizza`, `#extras`, `#contact` navigate correctly |
| Test hero buttons | "Explore Menu" and "Find Us" buttons scroll to correct sections |
| Check images load | All `<img>` elements have `naturalWidth > 0` (no broken images) |
| Basic performance check | Page reaches `networkidle` in under 5 seconds |
| Accessibility check | All images have non-empty `alt` text; `<html lang="en">` is set |

### Quality Gate
All 7 tests must pass before considering a change production-ready.

See `.github/skills/web-app-test/SKILL.md` for the full manual testing checklist.

---

## Conventions

### HTML
- Use semantic elements: `<nav>`, `<section>`, `<footer>`, `<main>`
- All sections that appear in navigation must have their corresponding `id` attribute
- All `<img>` tags require `alt` text and `loading="lazy"`
- Inline `<style>` blocks are used — no separate CSS files
- The `<html>` tag must carry `lang="en"`

### CSS
- Design tokens via CSS custom properties (defined in `:root` or at the top of the `<style>` block)
- Do not use inline `style=""` attributes for design-critical styling — use classes
- Follow the existing naming pattern for classes (`kebab-case`)

### Images
- Always use WebP format
- Always include `alt` text
- Keep `loading="lazy"` on all images below the fold

### JavaScript
- No JS framework — vanilla JS only
- Minimal JS; prefer CSS for animations (e.g., `@keyframes` fade-in on hero)
- No external JS CDN dependencies (Google Fonts are the only external resource)

### Git
- Active development branch: `claude/add-claude-documentation-w0UQY`
- Main/production branch: `main`
- Commit messages should be clear and describe the change (not just "update")

---

## Deployment

The site deploys to **Vercel** automatically on pushes to `main`.

- `vercel.json` defines two URL rewrites for the V2 page
- No build step is required — Vercel serves the static files directly
- The Express server (`server.js`) is only used for local development

---

## AI Skills

Two custom Claude Code skills are defined in `.github/skills/`:

### `web-app-test`
Invoked to test the web app end-to-end. Steps: install deps → start server → validate HTML → check console → test links → run Playwright → performance → accessibility → report. Trigger phrase: `/web-app-test`.

### `image-compression`
Invoked to optimize and convert images. Uses Sharp exclusively. Steps: evaluate sources → resize proportionally → set quality (75–85 for photos) → convert to WebP → verify output → handle transparency. Trigger phrase: `/image-compression`.

---

## Common Tasks

### Add a new menu item
1. Add the WebP image to `/images/`
2. In `index.html`, add a card in the appropriate section (`#momos`, `#snacks`, `#pizza`, `#extras`)
3. Follow existing card HTML structure (image, title, variants, price)
4. Run `npm run images:cards` if you added a new PNG/JPG source
5. Run Playwright tests to verify no regressions

### Update pricing or menu text
Edit the relevant section in `index.html` directly. No build step needed. Run Playwright tests after.

### Test a UI change
```bash
npm start
# Open http://localhost:3000 in browser
npx playwright test tests/web-app-test.spec.js
```

### Convert new images to WebP
```bash
# Batch convert all images in /images/ to WebP (default quality 80)
npm run images:webp

# Convert and resize to card dimensions (720x480, quality 76)
npm run images:cards
```
