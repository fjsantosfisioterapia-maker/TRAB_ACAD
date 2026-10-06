(() => {
  const demoAccounts = {
    company: {email: 'instituicao@neuroconecta.example', password: 'rede-demo-2026', label: 'instituição'},
    patient: {email: 'paciente@neuroconecta.example', password: 'cuidado-demo-2026', label: 'paciente'}
  };

  document.querySelectorAll('.login-form').forEach(form => {
    const role = form.dataset.login;
    const feedback = form.querySelector('.login-feedback');
    const account = demoAccounts[role];

    form.querySelector('.show-password').addEventListener('click', event => {
      const input = form.querySelector('input[name="password"]');
      const reveal = input.type === 'password';
      input.type = reveal ? 'text' : 'password';
      event.currentTarget.setAttribute('aria-label', reveal ? 'Ocultar senha de demonstração' : 'Mostrar senha de demonstração');
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      feedback.className = 'login-feedback';
      const email = form.querySelector('input[name="email"]').value.trim().toLowerCase();
      const password = form.querySelector('input[name="password"]').value;
      if (email !== account.email || password !== account.password) {
        feedback.textContent = 'A demonstração aceita somente as credenciais fictícias pré-preenchidas para este perfil.';
        feedback.classList.add('error');
        return;
      }

      // Values remain in page memory only; clear them before redirecting. No request is sent.
      form.querySelector('input[name="email"]').value = '';
      form.querySelector('input[name="password"]').value = '';
      feedback.textContent = `Acesso de ${account.label} simulado. Abrindo a área correspondente…`;
      feedback.classList.add('success');
      window.setTimeout(() => {
        window.location.href = `index.html?area=${encodeURIComponent(role)}#portal`;
      }, 550);
    });
  });
})();
