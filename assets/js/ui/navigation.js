window.Valeria = window.Valeria || {};
Valeria.ui = (() => {
  const { $, $$ } = Valeria.dom;
  const panels = () => [$('#searchPanel'), $('#cartPanel'), $('#mobileMenu'), $('#productModal'), $('#chatPanel')].filter(Boolean);
  const isOpen = (el) => el && !el.hidden;
  const syncLock = () => {
    const any = panels().some(isOpen);
    document.body.classList.toggle('is-locked', any);
  };
  const closeSearch = () => {
    const panel = $('#searchPanel');
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    syncLock();
    $('#searchOpen')?.focus();
  };
  const openSearch = () => {
    const panel = $('#searchPanel');
    if (!panel) return;
    panel.hidden = false;
    syncLock();
    setTimeout(() => $('#searchInput')?.focus(), 80);
    Valeria.catalog?.search('');
  };
  const openMenu = () => {
    const menu = $('#mobileMenu');
    if (!menu) return;
    menu.hidden = false;
    syncLock();
    $('#menuBtn')?.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    const menu = $('#mobileMenu');
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    syncLock();
    $('#menuBtn')?.setAttribute('aria-expanded', 'false');
    $('#menuBtn')?.focus();
  };
  const init = () => {
    $('#searchOpen')?.addEventListener('click', openSearch);
    $('#searchClose')?.addEventListener('click', closeSearch);
    $('#menuBtn')?.addEventListener('click', openMenu);
    $('#menuClose')?.addEventListener('click', closeMenu);
    $$('#mobileMenu a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (isOpen($('#searchPanel'))) { closeSearch(); return; }
      if (isOpen($('#mobileMenu'))) { closeMenu(); return; }
    });
    // Reveal on scroll
    const items = $$('.section__head, .trust__item, .collection, .product, .journal-card, .ritual__grid article, .testimonials blockquote, .story__media, .story__copy, .showroom__media, .showroom__copy, .newsletter__grid');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(el => el.setAttribute('data-reveal', ''));
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
        });
      }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
      items.forEach(el => io.observe(el));
    }
  };
  return { init, openSearch, closeSearch, openMenu, closeMenu, syncLock };
})();
