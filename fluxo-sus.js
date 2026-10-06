(() => {
  const toggle = document.querySelector('#menuToggle');
  const menu = document.querySelector('#mainNav');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();
