(() => {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(error => {
        console.warn('NeuroConecta: não foi possível ativar o modo offline.', error);
      });
    });
  }

  let installPrompt = null;
  const installButton = document.querySelector('#installAppBtn');
  const status = document.querySelector('#installStatus');
  const setMessage = message => { if (status) status.textContent = message; };
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  if (isStandalone) setMessage('NeuroConecta já está aberto como aplicativo neste dispositivo.');

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    if (installButton) installButton.hidden = false;
  });

  if (installButton) {
    installButton.addEventListener('click', async () => {
      if (!installPrompt) {
        setMessage('Use a opção “Adicionar à Tela de Início” ou “Instalar app” no menu do navegador.');
        return;
      }
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      setMessage(choice.outcome === 'accepted' ? 'Instalação iniciada. Procure o NeuroConecta na tela inicial.' : 'Tudo bem — você pode instalar depois pelo menu do navegador.');
      installPrompt = null;
      installButton.hidden = true;
    });
  }

  window.addEventListener('appinstalled', () => {
    if (installButton) installButton.hidden = true;
    setMessage('Aplicativo instalado. O NeuroConecta estará disponível na tela inicial.');
  });
})();
