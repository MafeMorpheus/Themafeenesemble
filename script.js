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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data (ready for a backend or service like Formspree)
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submission:', data);

    // Show success message
    form.hidden = true;
    success.hidden = false;

    // Reset after 4 seconds
    setTimeout(() => {
      form.reset();
      form.hidden = false;
      success.hidden = true;
    }, 4000);
  });

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
