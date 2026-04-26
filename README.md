# michael-iuzzolino.github.io

Personal website for Michael L. Iuzzolino — Senior Research Scientist at Meta.

**Live:** https://michael-iuzzolino.github.io/

## Stack

Pure static HTML/CSS/JS. No frameworks, no build step, no dependencies.

- **Hosting:** GitHub Pages (master branch, `.nojekyll`)
- **CSS:** Custom properties for theming, Flexbox/Grid layouts
- **Fonts:** Inter (Google Fonts), Font Awesome 6
- **Map:** Leaflet.js with CARTO tiles, TopoJSON 50m for country boundaries
- **Themes:** Daylight (default light) and Prism (dark purple/pink), persisted via localStorage

## Pages

| Page | Description |
|------|-------------|
| `index.html` | About, bio, Beyond Work (mini travel map, music hover gallery, Porsche hover/click gallery) |
| `research.html` | 28 publications in 5 categories with dashboard, stats, drill-down, Google Scholar link |
| `travel.html` | 32 trips (2022-2025), interactive world map (40+ city markers, 39 countries), timeline view |
| `music.html` | Guitar carousel (9 guitars, coverflow, click-to-expand), YouTube video grid, SoundCloud audio cards, Spotify album |
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
│   ├── main.js                # Nav, themes, lightboxes, scroll animations, Porsche gallery
│   └── travel-map.js          # Leaflet map, markers, country shading, panel
├── images/
│   ├── bg.png                 # Crystal art hero background
│   ├── new_mike.jpg           # Profile photo
│   ├── travel/                # 32 trip photo directories
│   ├── guitars/               # Original horizontal guitar photos
│   ├── guitars/v2/            # Rotated vertical guitar photos (for carousel)
│   └── life/                  # Porsche 911 GTS photos (plates blurred)
└── assets/
    └── icon/                  # Favicons
```

## Features

- **Theme switcher** — floating pill (bottom-left), Daylight/Prism, persists via localStorage
- **Research dashboard** — stats bar, 5 category cards, click to drill into papers
- **Travel map** — interactive Leaflet map, per-city markers (40+), 39 country highlights, click-to-panel with full trip content, timeline view toggle
- **Homepage mini-map** — live Leaflet preview with colored markers in Beyond Work section
- **Guitar carousel** — coverflow with 5 visible, click any to navigate + expand, smooth circular wrap
- **Video lightbox** — click thumbnail, scale-up animation to center, autoplays YouTube
- **Audio cards** — SoundCloud tracks with CSS generative art, fly-out player
- **Porsche gallery** — hover shows mini gallery popup, click opens full overlay
- **Music hover gallery** — mini guitar strip + video thumbnails on hover
- **Interactive CV** — sticky TOC sidebar with scroll-spy, clickable publication links
- **Responsive** — mobile hamburger menu, responsive grids, touch swipe on carousel

## Related Projects

- **LaTeX CV/Resume:** `../CV_new/` — awesome-cv template, compiled with tectonic
- **Skills:** `/website`, `/linkedin`, `/cv` slash commands for Claude Code

## Content Sources

- **Research:** Google Scholar (user=cjmjU5AAAAAJ)
- **Travel:** Facebook data exports (processed via Python scripts)
- **Music:** YouTube (@mliuzzolino), SoundCloud (Spastic Symmetry), Spotify (Structure of Inhumanity)
- **Guitar photos:** User-provided, rotated manually
- **Bio:** LinkedIn profile

## Deployment

```bash
cd current-site
git add -A
git commit -m "description"
git push https://michael-iuzzolino:<PAT>@github.com/michael-iuzzolino/michael-iuzzolino.github.io.git master
```

Requires a GitHub Personal Access Token with repo write access.
