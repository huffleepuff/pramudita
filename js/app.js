const pages = document.querySelectorAll('.page');
const buttons = document.querySelectorAll('[data-page]');

/* ===============================
   TYPEWRITER SIMPLE
================================ */
function typeText(el) {
  const text = el.dataset.text;
  if (!text || el.dataset.done) return;

  el.dataset.done = "true";
  el.innerHTML = "";
  let i = 0;

  const type = () => {
    if (i >= text.length) return;
    el.innerHTML += text[i] === "\n" ? "<br>" : text[i];
    i++;
    setTimeout(type, 30);
  };

  type();
}

function initTyping(page) {
  page.querySelectorAll('.typewriter').forEach(typeText);
}

/* ===============================
   NAVIGATION
================================ */
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    pages.forEach(p => p.classList.remove('active'));
    const page = document.getElementById(btn.dataset.page);
    page.classList.add('active');
    initTyping(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* FIRST LOAD */
initTyping(document.querySelector('.page.active'));

/* ===============================
   DARK MODE
================================ */
const toggle = document.getElementById('darkToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    body.classList.contains('dark') ? 'dark' : 'light'
  );
});
