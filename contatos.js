(() => {
  const menu = document.querySelector('#mainNav');
  const menuToggle = document.querySelector('#menuToggle');
  if (menu && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const feedback = document.querySelector('#contactFeedback');
  document.querySelectorAll('[data-demo-social]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const channel = link.dataset.demoSocial;
      feedback.textContent = `${channel}: link fictício de demonstração. Nenhuma conta, telefone ou serviço externo foi aberto.`;
    });
  });
})();
