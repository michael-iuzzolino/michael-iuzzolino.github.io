# michael-iuzzolino.github.io

Personal website for Michael L. Iuzzolino — Senior Research Scientist at Meta.

**Live:** https://michael-iuzzolino.github.io/

## Stack

Pure static HTML/CSS/JS. No frameworks, no build step, no dependencies.

- **Hosting:** GitHub Pages (master branch, `.nojekyll`)
- **CSS:** Custom properties for theming, Flexbox/Grid layouts
- **Fonts:** Inter (Google Fonts), Font Awesome 6
- **Map:** Leaflet.js with CARTO tiles, TopoJSON for country boundaries
- **Themes:** Daylight (default light) and Prism (dark purple/pink), persisted via localStorage

## Pages

| Page | Description |
|------|-------------|
| `index.html` | About, bio, Beyond Work section (travel/music/Porsche cards) |
| `research.html` | 28 publications in 5 categories with dashboard, stats, drill-down |
| `travel.html` | 32 trips, interactive world map (40+ city markers, 39 country highlights), timeline view |
| `music.html` | Guitar videos (YouTube lightbox), electronica (SoundCloud cards), Spotify album, guitar collection |

## Structure

```
├── index.html
├── research.html
├── travel.html
├── music.html
├── thank-you.html
├── .nojekyll
├── css/
│   └── style.css          # All styles + theme definitions
├── js/
│   ├── main.js            # Nav, themes, lightboxes, scroll animations
│   └── travel-map.js      # Leaflet map, markers, country shading
├── images/
│   ├── bg.png             # Crystal art hero background
│   ├── new_mike.jpg       # Profile photo
│   ├── travel/            # 20+ trip photo directories
│   ├── guitars/           # Guitar collection photos
│   └── life/              # Porsche 911 GTS photos
└── assets/
    └── icon/              # Favicons
```

## Features

- **Theme switcher** — floating pill (bottom-left), two themes, persists across pages
- **Research dashboard** — stats bar, 5 category cards, click to drill into papers
- **Travel map** — interactive Leaflet map with per-city markers, country shading, click-to-panel with full trip content
- **Video lightbox** — click thumbnail, flies from grid position to center, autoplays YouTube
- **Audio lightbox** — SoundCloud tracks with CSS generative art, fly-out player
- **Porsche gallery** — click-to-expand photo gallery overlay
- **Responsive** — mobile hamburger menu, responsive grids

## Content Sources

- **Research:** Google Scholar (user=cjmjU5AAAAAJ)
- **Travel:** Facebook data exports (processed via Python scripts)
- **Music:** YouTube (@mliuzzolino), SoundCloud (Spastic Symmetry), Spotify (Structure of Inhumanity)
- **Bio:** LinkedIn profile

## Deployment

```bash
cd current-site
git add -A
git commit -m "description"
git push https://michael-iuzzolino:<PAT>@github.com/michael-iuzzolino/michael-iuzzolino.github.io.git master
```

Requires a GitHub Personal Access Token with repo write access.
