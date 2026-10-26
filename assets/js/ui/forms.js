window.Valeria = window.Valeria || {};
Valeria.forms = (() => {
  const { $ } = Valeria.dom;
  const init = () => {
    const form = $('#newsletterForm');
    const status = $('#newsletterStatus');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#newsletterEmail').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        if (status) status.textContent = Valeria.i18n.current === 'es' ? 'Escribe un correo válido.' : 'Enter a valid email.';
        return;
      }
      if (status) status.textContent = Valeria.i18n.current === 'es'
        ? 'Gracias. Te escribiremos con la carta y tu 10%.'
        : 'Thank you. We will send the letter and your 10%.';
      Valeria.dom.toast(Valeria.i18n.current === 'es' ? 'Bienvenida a la carta Valeria.' : 'Welcome to the Valeria letter.');
      form.reset();
    });
    document.addEventListener('valeria:lang', () => { if (status) status.textContent = ''; });
  };
  return { init };
})();
