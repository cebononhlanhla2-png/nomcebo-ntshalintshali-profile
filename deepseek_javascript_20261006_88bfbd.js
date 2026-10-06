/* ============================================================
   NOMCEBO NTSHALANTSHALI — PORTFOLIO INTERACTIVITY
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navItems  = navLinks.querySelectorAll('a');

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close menu when a nav link is clicked
  navItems.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  // Reset menu state when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ---------- 2. STICKY HEADER SHADOW ---------- */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  /* ---------- 3. ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = 'home';

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('active', isActive);
    });
  }

  /* ---------- 4. SCROLL HANDLER (throttled with rAF) ---------- */
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleHeaderScroll();
        setActiveLink();
        toggleBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ---------- 5. SCROLL REVEAL ANIMATIONS ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for very old browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ---------- 6. ANIMATED SKILL BARS ---------- */
  const skillBars = document.querySelectorAll('.bar-fill');

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width  = target.getAttribute('data-width') || '0';
          // Small delay so the transition is visible
          setTimeout(() => {
            target.style.width = width + '%';
          }, 150);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.35 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  } else {
    skillBars.forEach(bar => {
      bar.style.width = (bar.getAttribute('data-width') || 0) + '%';
    });
  }

  /* ---------- 7. BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    backToTop.classList.toggle('show', window.scrollY > 500);
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 8. FOOTER YEAR ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- 9. INITIALISE ON LOAD ---------- */
  window.addEventListener('load', () => {
    handleHeaderScroll();
    setActiveLink();
    toggleBackToTop();
  });

})();