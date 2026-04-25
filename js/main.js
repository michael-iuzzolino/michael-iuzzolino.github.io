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

  // Video lightbox
  const videoLightbox = document.getElementById('video-lightbox');
  if (videoLightbox) {
    const player = document.getElementById('video-lightbox-player');
    function closeVideoLightbox() {
      videoLightbox.classList.remove('active');
      player.src = '';
      document.body.style.overflow = '';
    }
    document.querySelectorAll('.video-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const id = thumb.dataset.video;
        player.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
        videoLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    videoLightbox.querySelector('.video-lightbox-close').addEventListener('click', closeVideoLightbox);
    videoLightbox.addEventListener('click', e => {
      if (e.target === videoLightbox) closeVideoLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && videoLightbox.classList.contains('active')) closeVideoLightbox();
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
