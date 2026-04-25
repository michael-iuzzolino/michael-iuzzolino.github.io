document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.view-tab');
  const timelineView = document.getElementById('timeline-view');
  const mapView = document.getElementById('map-view');
  const panel = document.getElementById('map-panel');
  const panelContent = panel.querySelector('.map-panel-content');
  const panelClose = panel.querySelector('.map-panel-close');
  const backdrop = document.getElementById('map-panel-backdrop');
  let map = null;

  const trips = [
    {
      lat: 47.4979, lng: 19.0402, title: 'Christmas Markets & Thermal Baths in Budapest',
      location: 'Budapest, Hungary', year: '2025',
      story: 'Five days in Budapest with 20,000–30,000 steps daily. Violin concert at Matthias Church, chimney cakes at Christmas markets, crypts beneath Buda Castle, and a late-night session at the Turkish thermal baths. Capped it off with a Danube night cruise.',
      hero: 'images/travel/budapest_2025/1.jpg',
      photos: [2,3,4,5,6,7,8,9].map(n => 'images/travel/budapest_2025/' + n + '.jpg')
    },
    {
      lat: 47.3769, lng: 8.5417, title: 'Ending a Month in Europe — Zurich',
      location: 'Zurich, Switzerland', year: '2025',
      story: 'The finale of a month-long European adventure through the Netherlands, Austria, and Hungary. Zurich is stunning, meticulously clean, and surrounded by alpine scenery.',
      hero: 'images/travel/zurich_2025/1.jpg',
      photos: [2,3,4,5,6,7,8,9].map(n => 'images/travel/zurich_2025/' + n + '.jpg')
    },
    {
      lat: 48.2082, lng: 16.3738, title: 'Mozart, Schnitzel, and Spontaneity — Vienna',
      location: 'Vienna, Austria', year: '2025',
      story: 'A spontaneous detour from the Netherlands. Imperial architecture, incredible coffee, Mozart\'s preserved apartment, and a train to Budapest that rivaled Japan\'s Gran Class Shinkansen.',
      hero: 'images/travel/vienna_2025/1.jpg',
      photos: [2,3,4,5,6,7,8,9].map(n => 'images/travel/vienna_2025/' + n + '.jpg')
    },
    {
      lat: 52.3676, lng: 4.9041, title: 'Amsterdam & Haarlem',
      location: 'Netherlands', year: '2025',
      story: 'Canals, bikes, and cozy brown cafes in Amsterdam. The real standout was Haarlem — a smaller city that quickly became a favorite, kicking off an unplanned European sprint.',
      hero: 'images/travel/netherlands_2025/1.jpg',
      photos: [2,3,4,5,6,7,8].map(n => 'images/travel/netherlands_2025/' + n + '.jpg')
    },
    {
      lat: 35.1796, lng: 129.0756, title: 'Busan & Late Nights in Korea',
      location: 'Busan, South Korea', year: '2025',
      story: 'Late-night fish markets, seaside temples, cliffside foot-spa cafes, and a 24/7 self-serve ramen shop at 3am. By the end of the month, we’d walked roughly 240 miles across Seoul and Busan.',
      hero: 'images/travel/korea_busan_2025/1.jpg',
      photos: [2,3,4,5,6,7,8,9].map(n => 'images/travel/korea_busan_2025/' + n + '.jpg')
    },
    {
      lat: 37.5665, lng: 126.978, title: 'Two Weeks Exploring Seoul',
      location: 'Seoul, South Korea', year: '2025',
      story: '10+ miles of walking every day, 33,000 steps in a single day, Rain Report cafe with pepper foam lattes, PC Bangs, souffle pancakes, weird art museums, and the best pizza since Hong Kong at "No More Pizza."',
      hero: 'images/travel/korea_seoul_2025/1.jpg',
      photos: [2,3,4,5,6,7,8,9].map(n => 'images/travel/korea_seoul_2025/' + n + '.jpg')
    },
    {
      lat: 46.8523, lng: -121.7603, title: 'Mt. Rainier — Skyline Trail Loop',
      location: 'Mt. Rainier, Washington', year: '2025',
      story: '1,450 ft elevation gain over 5.5 miles, much of it through snow, all in Keen sandals with no socks. A cozy cabin with a private jacuzzi to recover afterward.',
      hero: 'images/travel/mt_rainier_2025/1.jpg',
      photos: [2,3,4,5,6,7,8,9].map(n => 'images/travel/mt_rainier_2025/' + n + '.jpg')
    },
    {
      lat: 25.0330, lng: 121.5654, title: 'Remote PhD in Taiwan',
      location: 'Taipei, Taiwan', year: '2020',
      story: 'One month in the Songshan district, 10+ miles of walking daily. Night markets, incredible hiking, and Louisa Coffee. Easily one of my favorite countries.',
      hero: 'images/travel/taiwan/1.jpg',
      photos: [3,9,11,5,10,8,4,7,6].map(n => 'images/travel/taiwan/' + n + '.jpg')
    },
    {
      lat: 34.6937, lng: 135.5023, title: 'Remote PhD in Japan',
      location: 'Osaka, Japan', year: '2020',
      story: 'February in Osaka, five minutes from Dotonburi. Sushi, udon, takoyaki, okonomiyaki, and Japanese bathrooms that ruined American ones forever.',
      hero: 'images/travel/japan/7.jpg',
      photos: [3,9,1,5,10,8,4,2,6].map(n => 'images/travel/japan/' + n + '.jpg')
    },
    {
      lat: 28.3949, lng: 84.124, title: 'High-altitude Pulmonary Edema in the Himalayas',
      location: 'Nepal', year: '',
      story: 'Trekking through the Nepalese Himalayas.',
      hero: 'images/travel/nepal/4.jpg',
      photos: [1,2,3,5,6].map(n => 'images/travel/nepal/' + n + '.jpg')
    },
    {
      lat: -10.0, lng: -76.83, title: '75 Miles Through the Cordillera Huayhuash',
      location: 'Peru', year: '',
      story: 'The Huayhuash Circuit — 75 miles through the Peruvian Andes.',
      hero: 'images/travel/peru/10.jpg',
      photos: [1,2,3,4,5,6,7,8,9].map(n => 'images/travel/peru/' + n + '.jpg')
    },
    {
      lat: -51.0, lng: -73.0, title: 'Torres del Paine "O" Circuit',
      location: 'Patagonia, Chile', year: '',
      story: 'The full O Circuit in Torres del Paine National Park.',
      hero: 'images/travel/patagonia/2.jpg',
      photos: [9,5,6,4,7,8,3,10].map(n => 'images/travel/patagonia/' + n + '.jpg')
    },
    {
      lat: 48.8566, lng: 2.3522, title: 'Backpacking Europe',
      location: 'Europe', year: '',
      story: 'Backpacking across Europe.',
      hero: 'images/travel/europe/1.jpg',
      photos: [2,4,3,5,6].map(n => 'images/travel/europe/' + n + '.jpg')
    },
    {
      lat: 22.3193, lng: 114.1694, title: 'Hong Kong vs. PhD',
      location: 'Hong Kong', year: '',
      story: 'Hong Kong.',
      hero: 'images/travel/hk/1.jpg',
      photos: [2,3].map(n => 'images/travel/hk/' + n + '.jpg')
    },
    {
      lat: 38.9, lng: -97.0, title: 'Adventures in America',
      location: 'United States', year: '',
      story: 'Adventures across the United States.',
      hero: 'images/travel/america/1.jpg',
      photos: [2,3,4,5,6,7,8].map(n => 'images/travel/america/' + n + '.jpg')
    },
    {
      lat: 51.2538, lng: -116.1773, title: 'Hiking, Camping, and Hitchhiking in Canada',
      location: 'Canada', year: '',
      story: 'Hiking, camping, and hitchhiking across Canada.',
      hero: 'images/travel/canada/2.jpg',
      photos: [3,1,4].map(n => 'images/travel/canada/' + n + '.jpg')
    },
    {
      lat: 12.8654, lng: -85.2072, title: 'All of Central America in Two Weeks',
      location: 'Central America', year: '',
      story: 'All of Central America in two weeks.',
      hero: 'images/travel/central_america/6.jpg',
      photos: [5,2,9,7,1,8,12,4].map(n => 'images/travel/central_america/' + n + '.jpg')
    },
    {
      lat: 38.2682, lng: 140.8694, title: 'Studying Abroad in Sendai',
      location: 'Sendai, Japan', year: '',
      story: 'Study abroad in Sendai, Japan.',
      hero: 'images/travel/japan_study_abroad/1.jpg',
      photos: []
    },
    {
      lat: -43.5321, lng: 172.6362, title: 'Mountaineering in New Zealand',
      location: 'New Zealand', year: '',
      story: 'Mountaineering across New Zealand.',
      hero: 'images/travel/nz/1.jpg',
      photos: [5,3,4,2,7,6,8,9,10,11,12].map(n => 'images/travel/nz/' + n + '.jpg')
    }
  ];

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const view = tab.dataset.view;
      timelineView.style.display = view === 'timeline' ? '' : 'none';
      mapView.style.display = view === 'map' ? '' : 'none';
      if (view === 'map' && !map) initMap();
    });
  });

  function initMap() {
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

    trips.forEach(trip => {
      const markerIcon = L.divIcon({
        className: '',
        html: '<div class="trip-marker"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([trip.lat, trip.lng], { icon: markerIcon }).addTo(map);

      const label = trip.title + (trip.year ? ' (' + trip.year + ')' : '');
      marker.bindTooltip(label, {
        className: 'trip-label',
        direction: 'top',
        offset: [0, -10]
      });

      marker.on('click', () => openPanel(trip));
    });
  }

  function openPanel(trip) {
    let photosHtml = trip.photos.map(p =>
      '<img src="' + p + '" alt="' + trip.location + '">'
    ).join('');

    panelContent.innerHTML =
      '<img class="panel-hero" src="' + trip.hero + '" alt="' + trip.title + '">' +
      '<h2>' + trip.title + (trip.year ? ' (' + trip.year + ')' : '') + '</h2>' +
      '<div class="location">' + trip.location + '</div>' +
      '<div class="story"><p>' + trip.story + '</p></div>' +
      (photosHtml ? '<div class="panel-grid">' + photosHtml + '</div>' : '');

    panel.classList.add('open');
    backdrop.classList.add('open');
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
