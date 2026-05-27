/* ============ IronForge — Vanilla JS ============ */
(() => {
  // ---- Sticky navbar shadow ----
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    toTop.classList.toggle('show', window.scrollY > 400);
  };

  // ---- Mobile menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    })
  );

  // ---- Back to top ----
  const toTop = document.getElementById('toTop');
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Scroll reveal (IntersectionObserver) ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const items = [...document.querySelectorAll('.gallery-item img')];
  let current = 0;

  const openLb = (i) => {
    current = i;
    lbImg.src = items[i].src;
    lbImg.alt = items[i].alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const nav = (dir) => {
    current = (current + dir + items.length) % items.length;
    lbImg.src = items[current].src;
    lbImg.alt = items[current].alt;
  };

  items.forEach((img, i) => img.parentElement.addEventListener('click', () => openLb(i)));
  lbClose.addEventListener('click', closeLb);
  lbPrev.addEventListener('click', () => nav(-1));
  lbNext.addEventListener('click', () => nav(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });

  // ---- Contact Form ----

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const formData = {
    name: form.name.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value
  };

  note.textContent = "Sending...";

  try {

    const response = await fetch('/api/contact', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(formData)

    });

    const data = await response.json();

    if (data.success) {

      note.textContent = "Message sent successfully!";
      note.style.color = "lime";

      form.reset();

    } else {

      note.textContent = "Failed to send message.";
      note.style.color = "red";

    }

  } catch (error) {

    note.textContent = "Something went wrong.";
    note.style.color = "red";

  }

});

  // ---- Year ----
  document.getElementById('year').textContent = new Date().getFullYear();
})();
