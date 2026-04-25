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
    '#55efc4', '#fab1a0', '#74b9ff', '#ffeaa7',
    '#81ecec', '#636e72', '#b2bec3'
  ];

  const trips = [
    { lat: 47.4979, lng: 19.0402, label: 'Budapest, 2025', section: 0, size: 16 },
    { lat: 47.3769, lng: 8.5417, label: 'Zurich, 2025', section: 1, size: 12 },
    { lat: 48.2082, lng: 16.3738, label: 'Vienna, 2025', section: 2, size: 14 },
    { lat: 52.3676, lng: 4.9041, label: 'Netherlands, 2025', section: 3, size: 12 },
    { lat: 35.1796, lng: 129.0756, label: 'Busan, 2025', section: 4, size: 16 },
    { lat: 37.5665, lng: 126.978, label: 'Seoul, 2025', section: 5, size: 18 },
    { lat: 46.8523, lng: -121.7603, label: 'Mt. Rainier, 2025', section: 6, size: 12 },
    { lat: 25.0330, lng: 121.5654, label: 'Taiwan, 2020', section: 7, size: 14 },
    { lat: 34.6937, lng: 135.5023, label: 'Osaka, 2020', section: 8, size: 14 },
    { lat: 28.3949, lng: 84.124, label: 'Nepal', section: 9, size: 16 },
    { lat: -10.0, lng: -76.83, label: 'Peru', section: 10, size: 18 },
    { lat: -51.0, lng: -73.0, label: 'Patagonia', section: 11, size: 16 },
    { lat: 48.8566, lng: 2.3522, label: 'Europe', section: 12, size: 14 },
    { lat: 22.3193, lng: 114.1694, label: 'Hong Kong', section: 13, size: 12 },
    { lat: 38.9, lng: -97.0, label: 'America', section: 14, size: 14 },
    { lat: 51.2538, lng: -116.1773, label: 'Canada', section: 15, size: 12 },
    { lat: 12.8654, lng: -85.2072, label: 'Central America', section: 16, size: 14 },
    { lat: 38.2682, lng: 140.8694, label: 'Sendai, Japan', section: 17, size: 10 },
    { lat: -43.5321, lng: 172.6362, label: 'New Zealand', section: 18, size: 16 }
  ];

  // Get all travel sections from the timeline for reuse in the panel
  function getTimelineSections() {
    return timelineView.querySelectorAll('.travel-section');
  }

  // Tab switching — map is default
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

  // Initialize map on load since it's the default view
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

    trips.forEach((trip, i) => {
      const color = markerColors[i % markerColors.length];
      const markerIcon = L.divIcon({
        className: '',
        html: '<div class="trip-marker" style="width:' + trip.size + 'px;height:' + trip.size + 'px;background:' + color + ';box-shadow:0 0 10px ' + color + '60;"></div>',
        iconSize: [trip.size, trip.size],
        iconAnchor: [trip.size / 2, trip.size / 2]
      });

      const marker = L.marker([trip.lat, trip.lng], { icon: markerIcon }).addTo(map);

      marker.bindTooltip(trip.label, {
        className: 'trip-label',
        direction: 'top',
        offset: [0, -trip.size / 2 - 4]
      });

      marker.on('click', () => openPanel(trip.section));
    });
  }

  function openPanel(sectionIndex) {
    const sections = getTimelineSections();
    if (sectionIndex >= sections.length) return;

    const section = sections[sectionIndex];
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

    panelContent.innerHTML =
      (heroSrc ? '<img class="panel-hero" src="' + heroSrc + '" alt="' + title + '">' : '') +
      '<h2>' + title + '</h2>' +
      '<div class="location">' + location + '</div>' +
      (storyHtml ? '<div class="story">' + storyHtml + '</div>' : '') +
      (photosHtml ? '<div class="panel-grid">' + photosHtml + '</div>' : '');

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
