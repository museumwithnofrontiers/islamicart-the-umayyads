import { languageLabels, offeredLanguages, sectionMeta, useDataPackage } from '@museumwnf/viewer-core'
import {
  ISLAMICART_NO_COUNTRY, MinisiteHome, MinisiteShell, minisiteNavigation, minisiteRoutes, minisiteSettings,
} from '@museumwnf/viewer-layout/minisite'

// The whole declaration of this website: legacy Discover Islamic Art's virtual
// exhibition "The Umayyads" (islamicart.museumwnf.org/exhibitions/ISL/the_umayyads/),
// a website of its own. Its pages are every mini-site's — viewer-layout's
// `./minisite`, legacy's virtual exhibition pages — and what is this
// exhibition's own is here: its settings below, its theme (theme/tokens.css),
// its legacy pictures (theme/assets/legacy/, SOURCES.json names where each was
// taken from). Its records come from the data package, its texts from
// viewer-i18n's `minisite` bundle (and locales/, which may overload any).

const { manifest } = useDataPackage()

// The pictures of the frame, as Vite builds and fingerprints them; the pages
// name a file by its path under theme/assets/.
const chrome = import.meta.glob('../theme/assets/**/*.{jpg,jpeg,png,gif,svg}', {
  eager: true, query: '?url', import: 'default',
})

// The languages the exhibition has a title in: legacy's switcher offered them.
const languages = offeredLanguages()

// Discover Islamic Art, the website that carried this exhibition on legacy:
// its header, menu and sheet links lead there.
const parent = 'https://museumwithnofrontiers.github.io/islamicart'

export default {
  // The dataset package this website renders. Must match the alias in
  // vite.config.js and the dependency in package.json.
  datasetPackage: '@museumwnf/islamicart-the-umayyads-data',

  siteName: manifest.site?.names?.en ?? 'The Umayyads',

  // The absolute origin this build is deployed at, base path included, no
  // trailing slash: the GitHub Pages address of this repository.
  site: { origin: 'https://museumwithnofrontiers.github.io/islamicart-the-umayyads' },

  features: { entities: [] },

  languages,

  shell: MinisiteShell,

  chrome,

  navigation: minisiteNavigation({ languages: languageLabels(languages), parent }),

  // What legacy configured for this exhibition alone (the_umayyads/libs/
  // config.inc.php, index.php, ISL/libs/config.inc.php).
  minisite: minisiteSettings({
    parent,
    // The home menu's second column starts at this position ($_HOME_MENU_COL2).
    menuSecondColumnFrom: 7,
    // The curators the home page credits (HOMELOGOS): each partner's logo and the space after it.
    curators: [
      { partner: '33f89573-8b54-5c1a-86ba-1663e604740f', logo: 'legacy/JO-10.gif', space: 35 },
      { partner: '559ab197-7289-5af4-a295-1118bde9afce', logo: 'legacy/DE-10.gif', space: 30 },
    ],
    // The introduction's map ($INTROPAGE_HAVEMAP): one picture per language.
    map: {
      thumbnail: 'legacy/intro_map_thumb.jpg',
      picture: (lang, n) => (n ? `legacy/map${n}_${lang}.jpg` : `legacy/map_${lang}.jpg`),
      count: 1,
    },
    noCountry: ISLAMICART_NO_COUNTRY,
    documentTitle: 'MWNF DISCOVER ISLAMIC ART: Exhibition',
  }),

  views: { home: MinisiteHome },

  extraViews: minisiteRoutes(sectionMeta()),

  legacyRoutes: [],
}
