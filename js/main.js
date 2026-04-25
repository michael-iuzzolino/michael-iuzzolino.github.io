document.addEventListener('DOMContentLoaded', () => {
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
