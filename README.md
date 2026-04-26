# michael-iuzzolino.github.io

Personal website for Michael L. Iuzzolino — Senior Research Scientist at Meta.

**Live:** https://michael-iuzzolino.github.io/

## Stack

Pure static HTML/CSS/JS. No frameworks, no build step, no dependencies.

- **Hosting:** GitHub Pages (master branch, `.nojekyll`)
- **CSS:** Custom properties for theming, Flexbox/Grid layouts
- **Fonts:** Inter (Google Fonts), Font Awesome 6
- **Map:** Leaflet.js with CARTO tiles, TopoJSON 50m for country boundaries
- **Themes:** Aurora (default, light purple/pink accents) and Prism (dark purple/pink)

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Condensed bio, Beyond Work with electric arc animation (travel map + hover gallery, music hover gallery, Porsche hover/click gallery with fly animation) |
| `research.html` | 28 publications in 5 categories with dashboard, stats, drill-down, Google Scholar link |
| `travel.html` | 32 trips (2022-2025), interactive world map (40+ city markers, 39 countries), timeline view |
| `music.html` | Guitar carousel (9 guitars + coming soon, coverflow, click-to-expand), YouTube video grid, SoundCloud audio cards, Spotify album |
| `cv.html` | Interactive HTML CV with sticky TOC sidebar, clickable publication links, Download PDF button |

## Structure

```
├── index.html
├── research.html
├── travel.html
├── music.html
├── cv.html
├── thank-you.html
├── .nojekyll
├── css/
│   └── style.css              # All styles + theme definitions
├── js/
│   ├── main.js                # Nav, themes, lightboxes, Porsche gallery, tooltips
│   └── travel-map.js          # Leaflet map, markers, country shading, panel
├── images/
│   ├── bg.png                 # Crystal art hero background (visible at 30% opacity)
│   ├── new_mike.jpg           # Profile photo
│   ├── travel/                # 32 trip photo directories
│   ├── guitars/               # Original horizontal guitar photos
│   ├── guitars/v2/            # Rotated vertical guitar photos (for carousel)
│   └── life/                  # Porsche 911 GTS photos (plates blurred via watermarkly)
└── assets/
    └── icon/                  # Favicons
```

## Key Features

- **Aurora theme** (default) — light lavender background, purple/pink gradient accents
- **Prism theme** — dark mode with pink/purple accents, dark map tiles
- **Electric arc animation** — canvas-drawn lightning bolts around "Beyond Work" title
- **Beyond Work cards** — all three have hover zoom, dark gallery popup, custom instant tooltips
- **Travel hover gallery** — 6 destination photos from different countries
- **Music hover gallery** — mini guitar strip + YouTube video thumbnails
- **Porsche gallery** — hover shows mini popup, click flies thumbnails to full overlay, close animates back
- **Guitar carousel** — coverflow (5 visible), click any to navigate + expand horizontal detail
- **Travel map** — per-city markers, country shading, theme-aware tile swapping
- **Interactive CV** — sticky TOC with scroll-spy, clickable publication links
- **Responsive** — mobile hamburger menu, touch swipe on carousel

## Related Projects

- **LaTeX CV/Resume:** `../CV_new/` — awesome-cv template, compiled with `../tectonic`
- **Skills:** `/website`, `/linkedin`, `/cv` slash commands for Claude Code

## Content Sources

- **Research:** Google Scholar (user=cjmjU5AAAAAJ)
- **Travel:** Facebook data exports (processed via Python scripts)
- **Music:** YouTube (@mliuzzolino), SoundCloud (Spastic Symmetry), Spotify (Structure of Inhumanity)
- **Guitar photos:** User-provided and rotated
- **Porsche photos:** User-blurred plates via watermarkly.com
- **Bio:** LinkedIn profile

## Deployment

```bash
cd current-site
git add -A
git commit -m "description"
git push https://michael-iuzzolino:<PAT>@github.com/michael-iuzzolino/michael-iuzzolino.github.io.git master
```

Requires a GitHub Personal Access Token with repo write access.
