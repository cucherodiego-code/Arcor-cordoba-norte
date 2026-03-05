/* ========================================
   DISTRIBUIDORA ARCOR CÓRDOBA NORTE
   JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Floating Candies Animation
  var candyContainer = document.getElementById('hero-candies');
  if (candyContainer) {
    var candySVGs = [
      '<svg viewBox="0 0 60 40" fill="none"><ellipse cx="30" cy="20" rx="14" ry="12" fill="white"/><path d="M16 20c-4-6-12-6-14-4s2 8 6 8" stroke="white" stroke-width="2" fill="none"/><path d="M44 20c4-6 12-6 14-4s-2 8-6 8" stroke="white" stroke-width="2" fill="none"/></svg>',
      '<svg viewBox="0 0 40 60" fill="none"><circle cx="20" cy="16" r="14" fill="white"/><path d="M20 30v28" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><polygon points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15" fill="white"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="16" fill="white"/></svg>',
      '<svg viewBox="0 0 40 60" fill="none"><ellipse cx="20" cy="18" rx="14" ry="16" fill="white"/><polygon points="8,26 20,56 32,26" fill="white" opacity="0.8"/></svg>'
    ];

    for (var i = 0; i < 15; i++) {
      var candy = document.createElement('div');
      candy.className = 'candy';
      candy.innerHTML = candySVGs[Math.floor(Math.random() * candySVGs.length)];
      candy.style.left = Math.random() * 100 + '%';
      candy.style.width = (18 + Math.random() * 24) + 'px';
      candy.style.animationDuration = (18 + Math.random() * 30) + 's';
      candy.style.animationDelay = -(Math.random() * 35) + 's';
      candyContainer.appendChild(candy);
    }
  }

  // Mobile Nav Toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close nav on link click (mobile)
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;

    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;

      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toLocaleString('es-AR');
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats(); // Check on load

  // Fade-in on Scroll (Intersection Observer)
  const fadeElements = document.querySelectorAll(
    '.servicio-card, .producto-card, .mission-card, .logistica-item, .contacto-item'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPos = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'Mensaje Enviado';
        btn.style.background = '#27ae60';
        btn.style.borderColor = '#27ae60';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          form.reset();
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

});
