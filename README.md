# islamicart-the-umayyads

**The Umayyads**, a virtual exhibition of Discover Islamic Art, as a website of
its own. On legacy it lived inside Discover Islamic Art
(`islamicart.museumwnf.org/exhibitions/ISL/the_umayyads/`); here it is a
product in its own right, and Discover Islamic Art links to it.

It shows what legacy showed, the way legacy showed it: the exhibition's home
page, its introduction, its pages theme by theme, and the three windows those
pages open — the credits, the map and the zoom. Nothing on it is written for
it: every record comes from the data package, every text from `locales/`.

| Package | Role |
| --- | --- |
| `@museumwnf/islamicart-the-umayyads-data` | the exhibition: its collection, its themes and pages, the items they place, the curators it credits |
| `@museumwnf/viewer-core` | application engine (routing, data access, texts, language) |
| `@museumwnf/viewer-layout` | the shared components it uses (the glossary popover) |
| `@museumwnf/viewer-i18n` | the shared texts of the standalone websites |

---

## Translator — editing the website's texts

You only need a GitHub account and a browser. The files under `locales/` hold
**this website's own texts**, one file per language — `en.json` is English,
`fr.json` French, `ar.json` Arabic, and so on, for the nine languages legacy
offered. They were taken from legacy's dictionary (inventory-app's
`scripts/site-i18n`, `npm run extract:standalone -- islamicart-the-umayyads`),
word for word; the exhibition's own texts — its titles, quotes, essays and
captions — arrive translated in the data package and are not edited here.

1. **Open the folder.** On the website's GitHub page, open `locales/` and click
   the language file you want to change.
2. **Click the pencil** (✏️, top right of the file view). Change only the text
   between the second pair of quotation marks on a line — the part before the
   colon is the name of the entry and must stay exactly as it is.
3. **Click "Commit changes…" then "Propose changes".** The automatic check runs
   on your proposal; a green tick means it goes live by itself a few minutes
   later, and a comment says in plain language what to fix otherwise.

A text is **just text**, formatted with Markdown if you want (`**bold**`,
`*italic*`); it may not contain HTML tags, `{` or `}`.

---

## Webdesigner — theming the website

The website's look is legacy's exhibition frame, kept as it was:

- `theme/tokens.css` — the palette and the fonts, read from legacy's
  `the_umayyads/_styles.css` (and `_styles_ar.css` for Arabic);
- `theme/assets/legacy/` — legacy's own pictures of the frame: the backgrounds
  of the home page, the introduction and the exhibition pages (and their
  Arabic mirror images), the MWNF logo per language, the map per language,
  the curators' logos, the small icons. `SOURCES.json` names where each file
  was taken from and its hash; `tests/assets.test.js` checks every file
  against it, so a picture is replaced on purpose, with its entry;
- `src/styles/site.css` — the pages laid out as legacy laid them out, 763
  pixels wide, with legacy's own positions.

To preview your changes, install Docker Desktop and run `docker compose up` in
the folder, then open **http://localhost:5173**. Propose changes as a pull
request; styling changes are reviewed before they merge.

---

## Developer notes

**What a page shows, and from where.**

- `src/dataset.config.js` is the whole declaration: the routes, the frame's
  links (`navigation`), and what legacy configured for this exhibition alone
  (`exhibition`: the home menu's second column, the curators and their logos,
  the introduction's map). Discover Islamic Art's address is written there
  once, as `parent`.
- `src/composables/exhibition.js` reads the exhibition from the data package:
  its themes and their pages in reading order, previous and next as legacy
  chained them (the first page's previous page is the introduction), and each
  caption composed by legacy's rules (`class.exhibition.inc.php`): the page's
  own text first, the item's own otherwise; the museum for an object only;
  location, province and country, with legacy's exception for Jerusalem; the
  typographic characters legacy's `cleanText()` printed plain.
- A page shows each item at its position, and the views of it — the dots under
  the caption — are the placements at that position, each with its own
  picture and texts (the picture the placement links, a picture child item of
  the record, or the page's own picture there).
- `src/MiniShell.vue` is the frame; a route whose `meta.bare` is set is one of
  legacy's windows and is drawn without it. `src/tip.js` is legacy's tooltip.
- "More information" opens the record's sheet on Discover Islamic Art, as
  legacy opened `database_item.php`.

**Checking it against legacy.** Every caption legacy prints is in its pages'
`pageItems` script, all views included; a page here can be compared field by
field with the page there, in every language. The pilot was checked that way,
on every page and the introduction, in English, French, Arabic and German.

**Commands** (Docker, no Node on the host):

```bash
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine sh -c "npm ci && npm test && npm run lint && npm run build"
```

---

## Licence

See [LICENSE.md](LICENSE.md).
