const pages = document.querySelectorAll('.page');
const buttons = document.querySelectorAll('[data-page]');

/* ===============================
   TYPEWRITER CORE
================================ */

function typeText(el) {
  const text = el.dataset.text;
  if (!text) return;

  el.innerHTML = "";
  el.dataset.done = "true";

  let i = 0;
  const speed = 35;

  const type = () => {
    if (i >= text.length) return;

    const char = text[i];
    el.innerHTML += char === "\n" ? "<br>" : char;

    i++;
    setTimeout(type, speed);
  };

  type();
}

/* ===============================
   OBSERVER (UNTUK PAGE NON-HOME)
================================ */

let observer = new IntersectionObserver(
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

/* ===============================
   INIT TYPEWRITER
================================ */

function initTyping(page) {
  const isHome = page.id === "home";

  page.querySelectorAll('.typewriter').forEach(el => {
    if (el.dataset.done) return;

    if (isHome) {
      // 🔥 HOME: langsung ketik, tanpa observer
      typeText(el);
    } else {
      observer.observe(el);
    }
  });
}

/* ===============================
   NAVIGATION HANDLER
================================ */

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // bersihin observer
    observer.disconnect();

    pages.forEach(p => p.classList.remove('active'));
    const page = document.getElementById(btn.dataset.page);
    page.classList.add('active');

    initTyping(page);
  });
});

/* ===============================
   FIRST LOAD
================================ */

initTyping(document.querySelector('.page.active'));
/* ===============================
   DARK MODE TOGGLE
================================ */

const toggle = document.getElementById('darkToggle');
const body = document.body;

// load saved preference
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
