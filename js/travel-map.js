document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.view-tab');
  const timelineView = document.getElementById('timeline-view');
  const mapView = document.getElementById('map-view');
  const panel = document.getElementById('map-panel');
  const panelContent = panel.querySelector('.map-panel-content');
  const panelClose = panel.querySelector('.map-panel-close');
  const backdrop = document.getElementById('map-panel-backdrop');
  let map = null;

  const markerColors = [
    '#4ecdc4', '#e84393', '#f0932b', '#6c5ce7',
    '#00b894', '#fd79a8', '#0984e3', '#fdcb6e',
    '#d63031', '#00cec9', '#e17055', '#a29bfe',
    '#55efc4', '#fab1a0', '#74b9ff'
  ];

  // Grouped by country — each entry has one map pin and multiple visits
  // `sections` are indices into the timeline's .travel-section elements
  const locations = [
    {
      country: 'South Korea',
      lat: 36.5, lng: 127.9, size: 20,
      visits: [
        { label: 'Seoul, 2025', section: 5 },
        { label: 'Busan, 2025', section: 4 }
      ]
    },
    {
      country: 'Hungary',
      lat: 47.4979, lng: 19.0402, size: 14,
      visits: [{ label: 'Budapest, 2025', section: 0 }]
    },
    {
      country: 'Switzerland',
      lat: 47.3769, lng: 8.5417, size: 12,
      visits: [{ label: 'Zurich, 2025', section: 1 }]
    },
    {
      country: 'Austria',
      lat: 48.2082, lng: 16.3738, size: 13,
      visits: [{ label: 'Vienna, 2025', section: 2 }]
    },
    {
      country: 'Netherlands',
      lat: 52.3676, lng: 4.9041, size: 12,
      visits: [{ label: 'Amsterdam & Haarlem, 2025', section: 3 }]
    },
    {
      country: 'Japan',
      lat: 36.2, lng: 138.2, size: 18,
      visits: [
        { label: 'Osaka, 2020', section: 8 },
        { label: 'Sendai (Study Abroad)', section: 17 }
      ]
    },
    {
      country: 'Taiwan',
      lat: 25.0330, lng: 121.5654, size: 14,
      visits: [{ label: 'Taipei, 2020', section: 7 }]
    },
    {
      country: 'Nepal',
      lat: 28.3949, lng: 84.124, size: 16,
      visits: [{ label: 'Himalayas', section: 9 }]
    },
    {
      country: 'Peru',
      lat: -10.0, lng: -76.83, size: 18,
      visits: [{ label: 'Cordillera Huayhuash', section: 10 }]
    },
    {
      country: 'Chile',
      lat: -51.0, lng: -73.0, size: 16,
      visits: [{ label: 'Patagonia', section: 11 }]
    },
    {
      country: 'Europe',
      lat: 46.5, lng: 6.6, size: 14,
      visits: [{ label: 'Backpacking Europe', section: 12 }]
    },
    {
      country: 'Hong Kong',
      lat: 22.3193, lng: 114.1694, size: 12,
      visits: [{ label: 'Hong Kong', section: 13 }]
    },
    {
      country: 'United States',
      lat: 39.8, lng: -98.5, size: 16,
      visits: [
        { label: 'Mt. Rainier, 2025', section: 6 },
        { label: 'Adventures in America', section: 14 }
      ]
    },
    {
      country: 'Canada',
      lat: 51.2538, lng: -116.1773, size: 12,
      visits: [{ label: 'Hiking & Hitchhiking', section: 15 }]
    },
    {
      country: 'Central America',
      lat: 12.8654, lng: -85.2072, size: 14,
      visits: [{ label: 'All of Central America in Two Weeks', section: 16 }]
    },
    {
      country: 'New Zealand',
      lat: -43.5321, lng: 172.6362, size: 16,
      visits: [{ label: 'Mountaineering', section: 18 }]
    }
  ];

  function getTimelineSections() {
    return timelineView.querySelectorAll('.travel-section');
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.dataset.view;
      timelineView.style.display = view === 'timeline' ? '' : 'none';
      mapView.style.display = view === 'map' ? '' : 'none';
      if (view === 'map') {
        if (!map) {
          setTimeout(initMap, 50);
        } else {
          setTimeout(() => map.invalidateSize(), 50);
        }
      }
    });
  });

  setTimeout(initMap, 100);

  function initMap() {
    if (map) return;
    map = L.map('travel-map', {
      center: [20, 20],
      zoom: 2,
      minZoom: 2,
      maxBoundsViscosity: 1.0,
      zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    locations.forEach((loc, i) => {
      const color = markerColors[i % markerColors.length];
      const markerIcon = L.divIcon({
        className: '',
        html: '<div class="trip-marker" style="width:' + loc.size + 'px;height:' + loc.size + 'px;background:' + color + ';box-shadow:0 0 10px ' + color + '60;"></div>',
        iconSize: [loc.size, loc.size],
        iconAnchor: [loc.size / 2, loc.size / 2]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: markerIcon }).addTo(map);

      const visitCount = loc.visits.length;
      const tooltipText = loc.country + (visitCount > 1 ? ' (' + visitCount + ' trips)' : '');
      marker.bindTooltip(tooltipText, {
        className: 'trip-label',
        direction: 'top',
        offset: [0, -loc.size / 2 - 4]
      });

      marker.on('click', () => openPanel(loc));
    });
  }

  function buildSectionHtml(section) {
    const title = section.querySelector('h2')?.textContent || '';
    const location = section.querySelector('.location')?.textContent || '';
    const storyEl = section.querySelector('.story');
    const storyHtml = storyEl ? storyEl.innerHTML : '';
    const heroImg = section.querySelector('.travel-hero-img');
    const heroSrc = heroImg ? heroImg.src : '';

    const gridImgs = section.querySelectorAll('.travel-grid img');
    let photosHtml = '';
    gridImgs.forEach(img => {
      photosHtml += '<img src="' + img.src + '" alt="' + img.alt + '">';
    });

    return (
      (heroSrc ? '<img class="panel-hero" src="' + heroSrc + '" alt="' + title + '">' : '') +
      '<h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.25rem;">' + title + '</h3>' +
      '<div class="location">' + location + '</div>' +
      (storyHtml ? '<div class="story">' + storyHtml + '</div>' : '') +
      (photosHtml ? '<div class="panel-grid">' + photosHtml + '</div>' : '')
    );
  }

  function openPanel(loc) {
    const sections = getTimelineSections();
    const visitCount = loc.visits.length;

    let html = '<h2>' + loc.country + '</h2>';
    if (visitCount > 1) {
      html += '<div class="location">' + visitCount + ' visits</div>';
    }
    html += '<div style="margin-top:1rem;">';

    loc.visits.forEach((visit, i) => {
      if (visit.section < sections.length) {
        if (i > 0) {
          html += '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:1.5rem 0;">';
        }
        html += buildSectionHtml(sections[visit.section]);
      }
    });

    html += '</div>';

    panelContent.innerHTML = html;
    panel.classList.add('open');
    backdrop.classList.add('open');
    panel.scrollTop = 0;
  }

  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
  }

  panelClose.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });
});
