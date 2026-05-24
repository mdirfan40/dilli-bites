# Dilli Bites — Design System

All values live in two places:
- **JS pages** → import from `lib/tokens.js`
- **CSS pages** → use variables from `app/globals.css`

---

## Colors

| Token (JS)            | CSS Variable         | Value       | Usage                        |
|-----------------------|----------------------|-------------|------------------------------|
| `color.brand`         | `--brand`            | `#FFD600`   | Buttons, tags, accents       |
| `color.brandHover`    | `--brand-hover`      | `#FFE040`   | Button hover state           |
| `color.bg`            | `--bg`               | `#0A0A0A`   | Page background              |
| `color.surface`       | `--surface`          | `#141414`   | Cards, panels                |
| `color.surfaceAlt`    | `--surface-alt`      | `#1C1C1C`   | Nested surfaces              |
| `color.border`        | `--border`           | `#2A2A2A`   | Input borders, dividers      |
| `color.borderSubtle`  | `--border-subtle`    | `#1E1E1E`   | Card borders                 |
| `color.textPrimary`   | `--text`             | `#FFFFFF`   | Headings, main text          |
| `color.textSecondary` | `--text-secondary`   | `#AAAAAA`   | Subtext, descriptions        |
| `color.textMuted`     | `--text-muted`       | `#666666`   | Hints, helper text           |
| `color.textLabel`     | `--text-label`       | `#888888`   | Form labels                  |
| `color.placeholder`   | —                    | `#444444`   | Input placeholders           |
| `color.red`           | `--red`              | `#E8140A`   | Destructive actions          |
| `color.errorBg`       | `--error-bg`         | `#1A0F0F`   | Error banner background      |
| `color.errorBorder`   | `--error-border`     | `#6B2020`   | Error banner border          |
| `color.errorText`     | `--error-text`       | `#FC8181`   | Error banner text            |
| `color.errorField`    | `--error-field`      | `#E53E3E`   | Inline field error           |
| `color.successGreen`  | `--success`          | `#38A169`   | Success state                |

---

## Typography

| Token        | CSS Variable      | Value                          | Usage                    |
|--------------|-------------------|--------------------------------|--------------------------|
| `font.display` | `--font-display` | `'Bebas Neue', sans-serif`     | Titles, prices, hero h1  |
| `font.ui`      | `--font-ui`      | `'Montserrat', sans-serif`     | Buttons, nav, tags       |
| `font.body`    | `--font-body`    | `'Inter', sans-serif`          | Forms, paragraphs, labels|

### Font Sizes

| Token        | CSS Variable   | Value  | Usage                    |
|--------------|----------------|--------|--------------------------|
| `size.xs`    | `--text-xs`    | `11px` | Labels, tags, micro text |
| `size.sm`    | `--text-sm`    | `13px` | Buttons, captions        |
| `size.base`  | `--text-base`  | `14px` | Body / input text        |
| `size.md`    | `--text-md`    | `16px` | Paragraphs               |
| `size.lg`    | `--text-lg`    | `19px` | Card titles              |
| `size.xl`    | `--text-xl`    | `24px` | Prices                   |
| `size['2xl']`| —              | `32px` | Section subheadings      |
| `size['3xl']`| —              | `48px` | Page titles (forms)      |
| `size['4xl']`| —              | `64px` | Hero / large display     |

---

## Border Radius

| Token          | Value  | Usage                   |
|----------------|--------|-------------------------|
| `size.tag`     | `2px`  | Badges, pills, tags     |
| `size.input`   | `8px`  | Inputs, small buttons   |
| `size.card`    | `12px` | Menu cards              |
| `size.cardLg`  | `16px` | Form cards, modals      |

---

## Spacing

| Token         | Value  |
|---------------|--------|
| `space.xs`    | `4px`  |
| `space.sm`    | `8px`  |
| `space.md`    | `16px` |
| `space.lg`    | `24px` |
| `space.xl`    | `32px` |
| `space['2xl']`| `48px` |

---

## Reusable Fragments (from `lib/tokens.js`)

```js
import { color, font, size, space, input, tag, submitButton } from '@/lib/tokens'

// input(hasError) → inline style object for all form inputs
// tag             → inline style object for brand yellow pill tags
// submitButton    → inline style object for primary CTA buttons
```

---

## Rules

1. Never hardcode a color hex in a page file — always use a token.
2. `font.display` (Bebas Neue) for titles only — never for body or labels.
3. `font.ui` (Montserrat) for buttons and nav — uppercase + letter-spacing.
4. `font.body` (Inter) for all form fields, paragraphs, and labels.
5. v2 page (`app/v2/page.js`) uses its own isolated dark palette — intentional.
