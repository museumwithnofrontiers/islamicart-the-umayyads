# islamicart-the-umayyads

**The Umayyads**, a virtual exhibition of Discover Islamic Art, as a website of its
own. On legacy it lived inside Discover Islamic Art
(`islamicart.museumwnf.org/exhibitions/ISL/the_umayyads/`); here it is a
product in its own right, and Discover Islamic Art links to it.

It shows what legacy showed, the way legacy showed it: the exhibition's home
page, its introduction, its pages theme by theme, and the three windows those
pages open — the credits, the map and the zoom. Nothing on it is written for
it: every record comes from the data package, every text from viewer-i18n or
`locales/`.

Its pages are every mini-site's, from
[`minisite-template`](https://github.com/museumwithnofrontiers/minisite-template)
and the mini-site family layer: a change to how a page is drawn is made once,
in `@museumwnf/viewer-layout/minisite`, for every mini-site. What is this
exhibition's own is written from its legacy folder by inventory-app's
`scripts/minisites/legacy-minisite.mjs`.

| Package | Role |
| --- | --- |
| `@museumwnf/islamicart-the-umayyads-data` | the exhibition: its collection, its themes and pages, the items they place, the curators it credits |
| `@museumwnf/viewer-core` | application engine (routing, data access, texts, language) |
| `@museumwnf/viewer-layout` | the mini-site pages and frame (`./minisite`) |
| `@museumwnf/viewer-i18n` | the texts every mini-site shows (`./minisite`) |

---

## Translator — editing the website's texts

The texts every mini-site shows — the menu, the navigation, the credits
window's labels — are shared, in
[`viewer-i18n`](https://github.com/museumwithnofrontiers/viewer-i18n)'s
`minisite/` folder, and are edited there. The exhibition's own texts — its
titles, quotes, essays and captions — arrive translated in the data package
and are not edited anywhere. `locales/` holds this website's own texts, one
file per language; it starts empty, and an entry written there overrides the
shared one of the same name for this website alone. See
`minisite-template`'s README, "Translator", for the steps in the browser.

---

## Webdesigner — theming the website

The website's look is legacy's exhibition frame, kept as it was:

- `theme/tokens.css` — every value legacy's `the_umayyads/_styles.css`
  set (and `_styles_ar.css` over it for Arabic), as `--minisite-*` tokens;
- `theme/assets/legacy/` — legacy's own pictures of the frame, the maps and
  the curators' logos; `SOURCES.json` names where each file was taken from
  and its hash, and `tests/assets.test.js` checks every file against it;
- `theme/overrides.css` — the escape hatch, empty until a need cannot be
  expressed with a token.

A change to the pages' layout itself is a change to every mini-site: a
request for [`viewer-layout`](https://github.com/museumwithnofrontiers/viewer-layout)'s
`./minisite`. To preview, run `docker compose up` and open
**http://localhost:5173**.

---

## Developer notes

- `src/dataset.config.js` is the whole declaration and needs no edit;
  `src/minisite.json` holds what legacy configured for this exhibition alone
  (its address, the home menu's second column, the curators the home page
  credits, the maps of its introduction).
- Every caption legacy prints is in its pages' `pageItems` script, all views
  included; a page here can be compared field by field with the page there,
  in every language.

```bash
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine sh -c "npm ci && npm test && npm run lint && npm run build"
```

## Licence

See [LICENSE.md](LICENSE.md).
