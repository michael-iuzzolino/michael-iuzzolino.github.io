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

  // Per-city markers — each pin is a specific city/location
  const locations = [
    { city: 'Zurich', lat: 47.3769, lng: 8.5417, size: 12, visits: [{ label: 'Zurich, 2025', section: 0 }] },
    { city: 'Budapest', lat: 47.4979, lng: 19.0402, size: 14, visits: [{ label: 'Budapest, 2025', section: 1 }] },
    { city: 'Vienna', lat: 48.2082, lng: 16.3738, size: 13, visits: [{ label: 'Vienna, 2025', section: 2 }] },
    { city: 'Amsterdam', lat: 52.3676, lng: 4.9041, size: 12, visits: [{ label: 'Amsterdam & Haarlem, 2025', section: 3 }] },
    { city: 'Busan', lat: 35.1796, lng: 129.0756, size: 14, visits: [{ label: 'Busan, 2025', section: 4 }] },
    { city: 'Seoul', lat: 37.5665, lng: 126.978, size: 16, visits: [
      { label: 'Seoul, 2025', section: 5 },
      { label: 'Seoul, 2024', section: 12 }
    ] },
    { city: 'Mt. Rainier', lat: 46.8523, lng: -121.7603, size: 12, visits: [{ label: 'Mt. Rainier, 2025', section: 6 }] },
    { city: 'Taipei', lat: 25.0330, lng: 121.5654, size: 14, visits: [
      { label: 'Taipei, 2024 (Winter)', section: 7 },
      { label: 'Taipei, 2024 (Summer)', section: 10 },
      { label: 'Taipei, 2023', section: 17 },
      { label: 'Taipei, 2020', section: 20 }
    ] },
    { city: 'Osaka', lat: 34.6937, lng: 135.5023, size: 14, visits: [
      { label: 'Osaka, 2024 (Spring)', section: 11 },
      { label: 'Osaka, 2020', section: 21 }
    ] },
    { city: 'Nepal', lat: 28.3949, lng: 84.124, size: 16, visits: [{ label: 'Himalayas', section: 22 }] },
    { city: 'Huayhuash', lat: -10.0, lng: -76.83, size: 16, visits: [{ label: 'Cordillera Huayhuash', section: 23 }] },
    { city: 'Patagonia', lat: -51.0, lng: -73.0, size: 16, visits: [{ label: 'Torres del Paine', section: 24 }] },
    { city: 'Europe', lat: 48.8566, lng: 2.3522, size: 14, visits: [{ label: 'Backpacking Europe', section: 25 }] },
    { city: 'Hong Kong', lat: 22.3193, lng: 114.1694, size: 12, visits: [
      { label: 'Hong Kong, 2024', section: 13 },
      { label: 'Hong Kong', section: 26 }
    ] },
    { city: 'America', lat: 38.9, lng: -97.0, size: 14, visits: [{ label: 'Adventures in America', section: 27 }] },
    { city: 'Canada', lat: 51.2538, lng: -116.1773, size: 12, visits: [{ label: 'Hiking & Hitchhiking', section: 28 }] },
    { city: 'Central America', lat: 12.8654, lng: -85.2072, size: 14, visits: [{ label: 'Central America in Two Weeks', section: 29 }] },
    { city: 'Sendai', lat: 38.2682, lng: 140.8694, size: 10, visits: [
      { label: 'Sendai, 2024', section: 7 },
      { label: 'Study Abroad, Sendai', section: 30 }
    ] },
    { city: 'New Zealand', lat: -43.5321, lng: 172.6362, size: 14, visits: [{ label: 'Mountaineering', section: 31 }] },
    { city: 'Singapore', lat: 1.3521, lng: 103.8198, size: 14, visits: [
      { label: 'Singapore, 2024', section: 10 },
      { label: 'Singapore, 2022', section: 19 }
    ] },
    { city: 'Dubai', lat: 25.2048, lng: 55.2708, size: 13, visits: [{ label: 'Dubai, 2023', section: 18 }] },
    { city: 'New York City', lat: 40.7128, lng: -74.006, size: 13, visits: [{ label: 'NYC, 2023', section: 16 }] },
    { city: 'Los Angeles', lat: 34.0522, lng: -118.2437, size: 12, visits: [{ label: 'LA, 2023', section: 15 }] },
    { city: 'Athens', lat: 37.9838, lng: 23.7275, size: 12, visits: [{ label: 'Europe, 2023', section: 14 }] },
    { city: 'Kuala Lumpur', lat: 3.139, lng: 101.6869, size: 12, visits: [{ label: 'Malaysia, 2024', section: 10 }] },
    { city: 'Tokyo', lat: 35.6762, lng: 139.6503, size: 14, visits: [
      { label: 'Tokyo, 2024 (Winter)', section: 7 },
      { label: 'Tokyo, 2024 (Summer)', section: 9 },
      { label: 'Tokyo, 2024 (Spring)', section: 11 }
    ] },
    { city: 'Varberg', lat: 57.1, lng: 12.25, size: 12, visits: [{ label: 'Sweden Guitar Camp, 2024', section: 8 }] },
    { city: 'Kyoto', lat: 35.0116, lng: 135.7681, size: 13, visits: [
      { label: 'Kyoto, 2024 (Winter)', section: 7 },
      { label: 'Kyoto, 2024 (Spring)', section: 11 }
    ] },
    { city: 'Fukuoka', lat: 33.5904, lng: 130.4017, size: 11, visits: [{ label: 'Fukuoka, 2024', section: 7 }] },
    { city: 'Batam', lat: 1.0456, lng: 104.0305, size: 10, visits: [{ label: 'Batam, Indonesia, 2024', section: 10 }] },
    { city: 'Haarlem', lat: 52.3874, lng: 4.6462, size: 10, visits: [{ label: 'Haarlem, 2025', section: 3 }] },
    { city: 'Crete', lat: 35.2401, lng: 24.4694, size: 10, visits: [{ label: 'Crete, Greece, 2023', section: 14 }] },
    { city: 'Brussels', lat: 50.8503, lng: 4.3517, size: 10, visits: [{ label: 'Brussels, 2023', section: 14 }] },
    { city: 'Cologne', lat: 50.9375, lng: 6.9603, size: 10, visits: [{ label: 'Cologne, Germany, 2023', section: 14 }] },
    { city: 'Taichung', lat: 24.1477, lng: 120.6736, size: 10, visits: [{ label: 'Taichung, Taiwan, 2024', section: 10 }] },
    { city: 'Kaohsiung', lat: 22.6273, lng: 120.3014, size: 10, visits: [{ label: 'Kaohsiung, Taiwan, 2020', section: 20 }] },
    { city: 'Las Vegas', lat: 36.1699, lng: -115.1398, size: 10, visits: [{ label: 'Las Vegas, 2023', section: 14 }] },
    { city: 'Saigon', lat: 10.8231, lng: 106.6297, size: 12, visits: [{ label: 'Ho Chi Minh City', section: -1 }] },
    { city: 'Vung Tau', lat: 10.3460, lng: 107.0843, size: 10, visits: [{ label: 'Vung Tau, Vietnam', section: -1 }] },
    { city: 'Phu Quoc', lat: 10.2270, lng: 103.9680, size: 10, visits: [{ label: 'Phu Quoc, Vietnam', section: -1 }] }
  ];

  function getTimelineSections() {
    return timelineView.querySelectorAll('.travel-section');
  }

  const tagsView = document.getElementById('tags-view');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.dataset.view;
      timelineView.style.display = view === 'timeline' ? '' : 'none';
      mapView.style.display = view === 'map' ? '' : 'none';
      if (tagsView) tagsView.style.display = view === 'tags' ? '' : 'none';
      if (view === 'map') {
        if (!map) {
          setTimeout(initMap, 50);
        } else {
          setTimeout(() => map.invalidateSize(), 50);
        }
      }
    });
  });

  // Tag filtering
  document.querySelectorAll('.tag-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const tag = pill.dataset.tag;
      document.querySelectorAll('.tag-photo').forEach(photo => {
        if (tag === 'all' || photo.dataset.tags.includes(tag)) {
          photo.classList.remove('hidden');
        } else {
          photo.classList.add('hidden');
        }
      });
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

    function getTileUrl() {
      return document.body.classList.contains('theme-prism')
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    }

    let tileLayer = L.tileLayer(getTileUrl(), {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Swap tiles on theme change
    window.addEventListener('themechange', () => {
      map.removeLayer(tileLayer);
      tileLayer = L.tileLayer(getTileUrl(), {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);
    });

    // ISO 3166-1 numeric codes for visited countries (as numbers — world-atlas uses numeric IDs)
    const visitedIds = new Set([
      344, // Hong Kong
      392, // Japan
      524, // Nepal
      410, // South Korea
      158, // Taiwan
      36,  // Australia
      554, // New Zealand
      56,  // Belgium
      208, // Denmark
      246, // Finland
      250, // France
      276, // Germany
      380, // Italy
      528, // Netherlands
      578, // Norway
      620, // Portugal
      724, // Spain
      752, // Sweden
      826, // United Kingdom
      336, // Vatican
      124, // Canada
      484, // Mexico
      840, // United States
      32,  // Argentina
      84,  // Belize
      188, // Costa Rica
      152, // Chile
      222, // El Salvador
      320, // Guatemala
      340, // Honduras
      558, // Nicaragua
      591, // Panama
      604, // Peru
      40,  // Austria
      348, // Hungary
      756, // Switzerland
      702, // Singapore
      784, // United Arab Emirates
      360, // Indonesia
      458, // Malaysia
      300, // Greece
      704, // Vietnam
    ]);

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
      .then(r => r.json())
      .then(topo => {
        const countries = topojson.feature(topo, topo.objects.countries);
        // Split MultiPolygons so overseas territories can be filtered individually
        const visitedFeatures = [];
        countries.features.forEach(f => {
          const fid = typeof f.id === 'string' ? parseInt(f.id, 10) : f.id;
          if (!visitedIds.has(fid)) return;
          if (f.geometry.type === 'MultiPolygon') {
            f.geometry.coordinates.forEach(poly => {
              visitedFeatures.push({
                type: 'Feature', id: f.id, properties: f.properties,
                geometry: { type: 'Polygon', coordinates: poly }
              });
            });
          } else {
            visitedFeatures.push(f);
          }
        });

        // Countries with overseas territories — only shade polygons near visited regions
        const regionFilter = {
          250: { minLat: 40, maxLat: 55, minLng: -6, maxLng: 12 },   // France → Europe only
          528: { minLat: 49, maxLat: 55, minLng: 2, maxLng: 8 },     // Netherlands → Europe only
          826: { minLat: 48, maxLat: 62, minLng: -15, maxLng: 5 },   // UK → British Isles only
        };

        const filtered = visitedFeatures.filter(f => {
          const fid = typeof f.id === 'string' ? parseInt(f.id, 10) : f.id;
          const filter = regionFilter[fid];
          if (!filter) return true;
          const flat = f.geometry.coordinates.flat(Infinity);
          let sumLat = 0, sumLng = 0, n = 0;
          for (let i = 0; i < flat.length; i += 2) {
            sumLng += flat[i]; sumLat += flat[i+1]; n++;
          }
          const cLat = sumLat / n, cLng = sumLng / n;
          return cLat >= filter.minLat && cLat <= filter.maxLat && cLng >= filter.minLng && cLng <= filter.maxLng;
        });

        L.geoJSON({ type: 'FeatureCollection', features: filtered }, {
          style: function() {
            return {
              fillColor: '#f0932b',
              fillOpacity: 0.08,
              color: '#f0932b',
              weight: 0.5,
              opacity: 0.2
            };
          },
          interactive: false
        }).addTo(map);
      });

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
      const tooltipText = loc.city + (visitCount > 1 ? ' (' + visitCount + ' trips)' : '');
      marker.bindTooltip(tooltipText, {
        className: 'trip-label',
        direction: 'top',
        offset: [0, -loc.size / 2 - 4]
      });

      marker.on('click', () => openPanel(loc));
    });
  }

  const PANEL_PHOTO_LIMIT = 12;

  function buildSectionHtml(section, visitId) {
    const title = section.querySelector('h2')?.textContent || '';
    const location = section.querySelector('.location')?.textContent || '';
    const storyEl = section.querySelector('.story');
    const storyHtml = storyEl ? storyEl.innerHTML : '';
    const heroImg = section.querySelector('.travel-hero-img');
    const heroSrc = heroImg ? heroImg.src : '';

    const gridImgs = Array.from(section.querySelectorAll('.travel-grid img'));
    const total = gridImgs.length;
    const showLimit = Math.min(PANEL_PHOTO_LIMIT, total);

    let photosHtml = '';
    gridImgs.slice(0, showLimit).forEach(img => {
      photosHtml += '<img src="' + img.src + '" alt="' + img.alt + '">';
    });

    let extraHtml = '';
    if (total > showLimit) {
      const remaining = total - showLimit;
      extraHtml = '<div class="panel-show-more" onclick="var el=this.nextElementSibling;el.style.display=\'grid\';this.style.display=\'none\';">+' + remaining + ' more photos</div>';
      extraHtml += '<div class="panel-grid panel-grid-extra" style="display:none;">';
      gridImgs.slice(showLimit).forEach(img => {
        extraHtml += '<img src="' + img.src + '" alt="' + img.alt + '">';
      });
      extraHtml += '</div>';
    }

    return (
      '<div id="panel-visit-' + visitId + '">' +
      (heroSrc ? '<img class="panel-hero" src="' + heroSrc + '" alt="' + title + '">' : '') +
      '<h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.25rem;">' + title + '</h3>' +
      '<div class="location">' + location + '</div>' +
      (storyHtml ? '<div class="story">' + storyHtml + '</div>' : '') +
      (photosHtml ? '<div class="panel-grid">' + photosHtml + '</div>' : '') +
      extraHtml +
      '</div>'
    );
  }

  function openPanel(loc) {
    const sections = getTimelineSections();
    const visitCount = loc.visits.length;
    const validVisits = loc.visits.filter(v => v.section >= 0 && v.section < sections.length);

    let html = '<h2>' + loc.city + '</h2>';

    // Floating TOC for multi-visit cities
    if (validVisits.length > 1) {
      html += '<div class="panel-toc">';
      validVisits.forEach((visit, i) => {
        html += '<a href="#panel-visit-' + i + '" class="panel-toc-link" onclick="event.preventDefault();document.getElementById(\'panel-visit-'+i+'\').scrollIntoView({behavior:\'smooth\',block:\'start\'});">' + visit.label + '</a>';
      });
      html += '</div>';
    }

    html += '<div style="margin-top:1rem;">';

    if (validVisits.length === 0) {
      html += '<p style="color:var(--text-muted);font-size:0.95rem;text-align:center;padding:2rem 0;"><i class="fas fa-camera" style="font-size:1.5rem;display:block;margin-bottom:0.5rem;opacity:0.4;"></i>Photos &amp; stories coming soon</p>';
    } else {
      validVisits.forEach((visit, i) => {
        if (i > 0) {
          html += '<hr style="border:none;border-top:1px solid var(--border-subtle);margin:1.5rem 0;">';
        }
        html += buildSectionHtml(sections[visit.section], i);
      });
    }

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
