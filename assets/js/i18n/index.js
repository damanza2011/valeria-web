window.Valeria = window.Valeria || {};
Valeria.i18n = (() => {
  const dicts = Valeria.i18nData;
  let current = Valeria.config.lang || 'es';

  const t = (key, vars) => {
    const raw = (dicts[current] && dicts[current][key]) ?? (dicts.es && dicts.es[key]) ?? key;
    return vars ? String(raw).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '') : raw;
  };

  const apply = (lang, persist = true) => {
    current = lang === 'en' ? 'en' : 'es';
    Valeria.config.lang = current;
    document.documentElement.lang = current;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = t(el.dataset.i18n);
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const value = t(el.dataset.i18nHtml);
      if (value) el.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const value = t(el.dataset.i18nPlaceholder);
      if (value) el.placeholder = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const value = t(el.dataset.i18nAria);
      if (value) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-lang]').forEach(btn => {
      const active = btn.dataset.lang === current;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    if (persist) Valeria.storage.set('lang', current);
    document.dispatchEvent(new CustomEvent('valeria:lang', { detail: { lang: current } }));
  };

  const init = () => {
    const saved = Valeria.storage.get('lang', Valeria.config.lang);
    apply(saved === 'en' ? 'en' : 'es', false);
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => apply(btn.dataset.lang));
    });
  };

  return { t, apply, init, get current() { return current; } };
})();
