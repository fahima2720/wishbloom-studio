# Personalize this birthday site

Everything a customer sees lives in **one file**: `src/config/birthday.ts`.
You do not need to search the codebase or touch the layout code.

## 1. Run it on your computer

```sh
npm install
npm run dev
```

Open the address it prints (usually `http://localhost:8080`).

## 2. Change the words

Open `src/config/birthday.ts` and edit the numbered sections:

| Section | What it controls |
| --- | --- |
| `recipientName` / `senderName` | The two names used across the page |
| `ageOrMilestone` | Optional line under the headline (`""` hides it) |
| `intro` | Headline + short line shown after opening |
| `opening` | Eyebrow, headline, subline, button label on the first screen |
| `gallery` | Six photos: image, alt text, caption, and small date/place line |
| `letter` | Greeting, paragraph array (one string = one paragraph), sign-off, signature |
| `littleThings` | Six short notes (title + text) |
| `wish` | Title, instruction, button label, message after the wish, candle count |
| `closing` | Final headline, message, signature, replay button label |
| `theme` | Colors — `ivory`, `blush`, `rose`, `burgundy`, `gold`, `ink`, `sage` |

Any valid CSS color works (hex, rgb, oklch).

## 3. Swap the photos

Replace the six files in `src/assets/` and keep the same names:
`gallery-1.jpg` … `gallery-6.jpg`. Square or 4:5 crops look best, around
1200px wide. If you prefer different filenames, update the six `import`
lines at the top of `src/config/birthday.ts`.

Always rewrite each photo's `alt` text to describe what is actually in it.

## 4. Remove the demo ribbon

Set `isDemo: false` in `src/config/birthday.ts` once the content is real.
The demo banner ("Aria" and "Noah" are fictional) disappears with it.

## 5. Publish it free

**Simplest:** in Lovable, click **Publish** — you get a live address with
no accounts or configuration.

**Your own domain / static host:** push the folder to GitHub, then connect
it to Cloudflare Pages or Netlify. Build command `npm run build`, publish
directory `.output/public`.

## 6. Before you hand it over

- [ ] Real names, real letter, real dates — no "Aria" or "Noah" left
- [ ] `isDemo: false`
- [ ] All six photos replaced and alt text rewritten
- [ ] Read the letter on a phone (small screen, not a desktop preview)
- [ ] Open it once in Safari and once in Chrome
- [ ] Try the whole flow with the keyboard only (Tab + Enter)
