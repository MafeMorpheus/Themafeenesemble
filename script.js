/* ============================================
   THE MAFÉ ENSEMBLE — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- Mobile menu toggle ---
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // --- Scroll-triggered fade-in animations ---
  const animatedElements = document.querySelectorAll(
    '.section__label, .about__heading, .about__text p, .about__image, ' +
    '.services__heading, .service-card, .gallery__heading, .gallery__item, ' +
    '.contact__heading, .contact__text, .contact__details, .contact__form-wrap'
  );

  animatedElements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  animatedElements.forEach(el => observer.observe(el));

  // --- Contact form handling ---
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      try {
        const formData = new FormData(form);
        const body = new URLSearchParams(formData).toString();

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        form.reset();
        form.hidden = true;
        if (success) success.hidden = false;
      } catch (error) {
        console.error(error);
        alert('Sorry, your message could not be sent. Please email Contact@TheMafeEnsemble.com directly.');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
