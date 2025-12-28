/* ======================================================
   SPA + TYPEWRITER — FINAL FIX (DESKTOP + MOBILE AMAN)
====================================================== */

const pages = document.querySelectorAll('.page');
const buttons = document.querySelectorAll('[data-page]');
const isMobile = window.matchMedia('(max-width: 768px)').matches;

/* ===============================
   TYPEWRITER CORE
================================ */

function typeText(el) {
  const text = el.dataset.text;
  if (!text) return;

  el.innerHTML = '';
  el.dataset.done = 'true';

  let i = 0;
  const speed = 35;

  function type() {
    if (i >= text.length) return;

    const char = text[i];
    el.innerHTML += char === '\n' ? '<br>' : char;
    i++;
    setTimeout(type, speed);
  }

  type();
}

/* ===============================
   OBSERVER (DESKTOP ONLY)
================================ */

let observer = null;

if (!isMobile) {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting && !el.dataset.done) {
          typeText(el);
        }
      });
    },
    { threshold: 0.4 }
  );
}

/* ===============================
   INIT TYPEWRITER
================================ */

function initTyping(page) {
  page.querySelectorAll('.typewriter').forEach(el => {
    if (el.dataset.done) return;

    // 🔥 MOBILE = LANGSUNG ISI (TANPA OBSERVER)
    if (isMobile) {
      typeText(el);
      return;
    }

    // DESKTOP BEHAVIOR
    if (page.id === 'home') {
      typeText(el);
    } else {
      observer.observe(el);
    }
  });
}

/* ===============================
   NAVIGATION HANDLER (SPA)
================================ */

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // bersihin observer desktop
    if (observer) observer.disconnect();

    pages.forEach(p => p.classList.remove('active'));

    const page = document.getElementById(btn.dataset.page);
    if (!page) return;

    page.classList.add('active');

    // 🔒 reset typing state
    page.querySelectorAll('.typewriter').forEach(el => {
      el.dataset.done = '';
      el.innerHTML = '';
    });

    // mobile scroll ke atas
    if (isMobile) {
      page.scrollTop = 0;
      window.scrollTo({ top: 0 });
    }

    initTyping(page);
  });
});

/* ===============================
   FIRST LOAD
================================ */

const firstPage = document.querySelector('.page.active');
if (firstPage) {
  initTyping(firstPage);
}

/* ===============================
   DARK MODE TOGGLE
================================ */

const toggle = document.getElementById('darkToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

toggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    body.classList.contains('dark') ? 'dark' : 'light'
  );
});
