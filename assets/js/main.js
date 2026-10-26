window.Valeria = window.Valeria || {};
document.addEventListener('DOMContentLoaded', () => {
  try {
    Valeria.i18n.init();
    Valeria.ui.init();
    Valeria.cart.init();
    Valeria.catalog.init();
    Valeria.forms.init();
    Valeria.chat.init();
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
    console.info('[Valeria] Prototipo listo. Reemplazar contacto, precios y dominio antes de publicar.');
  } catch (error) {
    console.error('[Valeria] Error de inicialización', error);
  }
});
