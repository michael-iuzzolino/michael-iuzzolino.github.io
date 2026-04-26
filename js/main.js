document.addEventListener('DOMContentLoaded', () => {
  // Theme switcher
  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';
  switcher.innerHTML = '<div class="theme-dot active" data-theme="default" title="Midnight"></div><div class="theme-dot" data-theme="prism" title="Prism"></div>';
  document.body.appendChild(switcher);

  const saved = localStorage.getItem('theme');
  if (saved && saved !== 'default') {
    document.body.classList.add('theme-' + saved);
    switcher.querySelector('.theme-dot.active').classList.remove('active');
    const dot = switcher.querySelector('[data-theme="' + saved + '"]');
    if (dot) dot.classList.add('active');
  }

  switcher.querySelectorAll('.theme-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.dataset.theme;
      document.body.className = document.body.className.replace(/theme-\S+/g, '');
      if (theme !== 'default') document.body.classList.add('theme-' + theme);
      localStorage.setItem('theme', theme);
      switcher.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Nav scroll behavior
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Porsche gallery
  const porscheTrigger = document.getElementById('porsche-trigger');
  const porscheGallery = document.getElementById('porsche-gallery');
  if (porscheTrigger && porscheGallery) {
    porscheTrigger.addEventListener('click', () => {
      porscheGallery.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    const closePorsche = () => {
      porscheGallery.classList.remove('active');
      document.body.style.overflow = '';
    };
    porscheGallery.querySelector('.porsche-gallery-close').addEventListener('click', closePorsche);
    porscheGallery.querySelector('.porsche-gallery-backdrop').addEventListener('click', closePorsche);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && porscheGallery.classList.contains('active')) closePorsche();
    });
  }

  // Scroll animations
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

  // Abstract toggle
  document.querySelectorAll('.toggle-abstract').forEach(btn => {
    btn.addEventListener('click', () => {
      const abstract = btn.previousElementSibling;
      abstract.classList.toggle('expanded');
      btn.textContent = abstract.classList.contains('expanded') ? 'Show less' : 'Read more';
    });
  });

  // Research category navigation
  const dashboard = document.getElementById('research-dashboard');
  const categoryCards = document.querySelectorAll('.category-card');
  const categorySections = document.querySelectorAll('.category-section');
  const backButtons = document.querySelectorAll('.category-back');

  function showCategory(id) {
    if (!dashboard) return;
    dashboard.style.display = 'none';
    categorySections.forEach(s => {
      s.classList.toggle('active', s.id === id);
    });
    categoryCards.forEach(c => {
      c.classList.toggle('active', c.dataset.category === id);
    });
    // re-observe new fade-in-up elements
    document.querySelectorAll('#' + id + ' .fade-in-up').forEach(el => observer.observe(el));
    window.scrollTo({ top: document.querySelector('.page-hero').offsetHeight - 72, behavior: 'smooth' });
  }

  function showDashboard() {
    if (!dashboard) return;
    dashboard.style.display = '';
    categorySections.forEach(s => s.classList.remove('active'));
    categoryCards.forEach(c => c.classList.remove('active'));
    window.scrollTo({ top: document.querySelector('.page-hero').offsetHeight - 72, behavior: 'smooth' });
  }

  categoryCards.forEach(card => {
    card.addEventListener('click', () => showCategory(card.dataset.category));
  });

  backButtons.forEach(btn => {
    btn.addEventListener('click', showDashboard);
  });

  // Audio lightbox with fly-out animation
  const audioLightbox = document.getElementById('audio-lightbox');
  if (audioLightbox) {
    const audioPlayer = document.getElementById('audio-lightbox-player');
    const audioFlyout = audioLightbox.querySelector('.audio-lightbox-flyout');
    const audioBackdrop = audioLightbox.querySelector('.video-lightbox-backdrop');
    let activeAudioCard = null;

    function openAudio(card) {
      const scId = card.dataset.sc;
      const scPlaylist = card.dataset.scPlaylist;
      const isPlaylist = card.dataset.type === 'playlist' || !!scPlaylist;
      const resourceId = scPlaylist || scId;
      const rect = card.getBoundingClientRect();
      activeAudioCard = card;

      const resourceType = isPlaylist ? 'playlists' : 'tracks';
      const targetH = isPlaylist ? 400 : 166;
      const src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/' + resourceType + '/' + resourceId + '&color=%234ecdc4&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false';

      audioPlayer.src = '';
      audioPlayer.style.opacity = '0';
      audioFlyout.style.display = 'block';

      audioFlyout.style.transition = 'none';
      audioFlyout.style.top = rect.top + 'px';
      audioFlyout.style.left = rect.left + 'px';
      audioFlyout.style.width = rect.width + 'px';
      audioFlyout.style.height = rect.height + 'px';

      audioLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetW = Math.min(600, window.innerWidth - 64);
          audioFlyout.style.transition = '';
          audioFlyout.style.top = ((window.innerHeight - targetH) / 2) + 'px';
          audioFlyout.style.left = ((window.innerWidth - targetW) / 2) + 'px';
          audioFlyout.style.width = targetW + 'px';
          audioFlyout.style.height = targetH + 'px';

          setTimeout(() => {
            audioPlayer.src = src;
            audioPlayer.style.opacity = '1';
          }, 500);
        });
      });
    }

    function closeAudio() {
      audioPlayer.src = '';
      audioPlayer.style.opacity = '0';

      if (activeAudioCard) {
        const rect = activeAudioCard.getBoundingClientRect();
        audioFlyout.style.transition = '';
        audioFlyout.style.top = rect.top + 'px';
        audioFlyout.style.left = rect.left + 'px';
        audioFlyout.style.width = rect.width + 'px';
        audioFlyout.style.height = rect.height + 'px';
      }

      audioLightbox.classList.remove('active');
      document.body.style.overflow = '';

      setTimeout(() => {
        audioFlyout.style.transition = 'none';
        audioFlyout.style.display = 'none';
        activeAudioCard = null;
      }, 500);
    }

    document.querySelectorAll('.audio-card').forEach(card => {
      card.addEventListener('click', () => openAudio(card));
    });
    document.querySelectorAll('.album-track[data-sc]').forEach(track => {
      track.addEventListener('click', () => openAudio(track));
    });
    audioLightbox.querySelector('.video-lightbox-close').addEventListener('click', closeAudio);
    audioBackdrop.addEventListener('click', closeAudio);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && audioLightbox.classList.contains('active')) closeAudio();
    });
  }

  // Video lightbox with fly-out animation
  const videoLightbox = document.getElementById('video-lightbox');
  if (videoLightbox) {
    const player = document.getElementById('video-lightbox-player');
    const thumbImg = document.getElementById('video-lightbox-thumb');
    const flyout = videoLightbox.querySelector('.video-lightbox-flyout');
    const backdrop = videoLightbox.querySelector('.video-lightbox-backdrop');
    let activeThumb = null;

    function getTargetRect() {
      const maxW = Math.min(900, window.innerWidth - 64);
      const h = maxW * 9 / 16;
      return {
        top: (window.innerHeight - h) / 2,
        left: (window.innerWidth - maxW) / 2,
        width: maxW,
        height: h
      };
    }

    function openVideo(thumb) {
      const id = thumb.dataset.video;
      const rect = thumb.getBoundingClientRect();
      activeThumb = thumb;

      thumbImg.src = thumb.querySelector('img').src;
      thumbImg.style.display = 'block';
      player.src = '';
      player.style.opacity = '0';
      flyout.style.display = 'block';

      flyout.style.transition = 'none';
      flyout.style.top = rect.top + 'px';
      flyout.style.left = rect.left + 'px';
      flyout.style.width = rect.width + 'px';
      flyout.style.height = rect.height + 'px';
      flyout.style.borderRadius = '8px';

      videoLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = getTargetRect();
          flyout.style.transition = '';
          flyout.style.top = target.top + 'px';
          flyout.style.left = target.left + 'px';
          flyout.style.width = target.width + 'px';
          flyout.style.height = target.height + 'px';
          flyout.style.borderRadius = '12px';

          setTimeout(() => {
            player.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
            thumbImg.style.display = 'none';
            player.style.opacity = '1';
          }, 500);
        });
      });
    }

    function closeVideo() {
      player.src = '';
      player.style.opacity = '0';

      if (activeThumb) {
        thumbImg.src = activeThumb.querySelector('img').src;
        thumbImg.style.display = 'block';
        const rect = activeThumb.getBoundingClientRect();
        flyout.style.transition = '';
        flyout.style.top = rect.top + 'px';
        flyout.style.left = rect.left + 'px';
        flyout.style.width = rect.width + 'px';
        flyout.style.height = rect.height + 'px';
        flyout.style.borderRadius = '8px';
      }

      videoLightbox.classList.remove('active');
      document.body.style.overflow = '';

      setTimeout(() => {
        flyout.style.transition = 'none';
        flyout.style.display = 'none';
        thumbImg.style.display = 'none';
        activeThumb = null;
      }, 500);
    }

    document.querySelectorAll('.video-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => openVideo(thumb));
    });
    videoLightbox.querySelector('.video-lightbox-close').addEventListener('click', closeVideo);
    backdrop.addEventListener('click', closeVideo);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && videoLightbox.classList.contains('active')) closeVideo();
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.travel-grid img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
