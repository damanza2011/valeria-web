window.Valeria = window.Valeria || {};
Valeria.catalog = (() => {
  const { $, $$, esc, formatCOP } = Valeria.dom;
  const state = { filter: 'all', currentProduct: null, currentArticle: null };
  const byId = (id) => Valeria.products.find(p => p.id === id);
  const lang = () => Valeria.i18n.current;
  const t = (key) => Valeria.i18n.t(key);

  const renderCollections = () => {
    const grid = $('#collectionsGrid');
    if (!grid) return;
    grid.innerHTML = Valeria.collections.map((c, i) => `
      <button class="collection" type="button" data-collection="${c.filter}">
        <img src="${c.image}" alt="${esc(c.name[lang()])}" width="1400" height="1400" loading="lazy">
        <span class="collection__copy">
          <span class="collection__num">0${i + 1} / ${esc(c.name[lang()])}</span>
          <strong class="collection__name">${esc(c.name[lang()])}</strong>
          <span class="collection__desc">${esc(c.desc[lang()])}</span>
          <span class="collection__cta">${esc(c.cta[lang()])} <svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></span>
        </span>
      </button>`).join('');
  };

  const renderProducts = () => {
    const grid = $('#productGrid');
    if (!grid) return;
    const list = state.filter === 'all' ? Valeria.products : Valeria.products.filter(p => p.category === state.filter);
    grid.innerHTML = list.map(p => {
      const badge = p.badge === 'best' ? (lang() === 'es' ? 'Best seller' : 'Best seller') : p.badge === 'new' ? (lang() === 'es' ? 'Nuevo' : 'New') : '';
      return `<article class="product">
        <div class="product__media">
          <button type="button" data-product="${p.id}" aria-label="${esc(p.name[lang()])}">
            <img src="${p.image}" alt="${esc(p.name[lang()])}" width="1400" height="1400" loading="lazy">
          </button>
          ${badge ? `<span class="product__badge">${badge}</span>` : ''}
          <button class="product__quick" type="button" data-product="${p.id}" aria-label="${esc(p.name[lang()])}"><svg class="icon" aria-hidden="true"><use href="#i-up"></use></svg></button>
        </div>
        <div class="product__copy">
          <span class="product__category">${esc(t('shop.' + p.category))}</span>
          <h3 class="product__name">${esc(p.name[lang()])}</h3>
          <p class="product__desc">${esc(p.desc[lang()])}</p>
          <div class="product__row">
            <span class="product__price">${formatCOP(p.price)}</span>
            <button class="product__add" type="button" data-add="${p.id}" aria-label="${esc(t('shop.add'))}"><svg class="icon" aria-hidden="true"><use href="#i-plus"></use></svg></button>
          </div>
        </div>
      </article>`;
    }).join('');
  };

  const renderJournal = () => {
    const grid = $('#journalGrid');
    if (!grid) return;
    grid.innerHTML = Valeria.journal.map(j => `
      <article class="journal-card">
        <div class="journal-card__media"><img src="${j.image}" alt="${esc(j.title[lang()])}" width="1400" height="933" loading="lazy"></div>
        <div class="journal-card__copy">
          <span class="journal-card__tag">${esc(j.tag[lang()])}</span>
          <h3>${esc(j.title[lang()])}</h3>
          <p>${esc(j.excerpt[lang()])}</p>
          <button class="journal-card__link" type="button" data-journal="${j.id}">${esc(j.read[lang()])} <svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button>
        </div>
      </article>`).join('');
  };

  const openProduct = (id) => {
    const p = byId(id);
    if (!p) return;
    state.currentProduct = p;
    const modal = $('#productModal');
    $('#productModalImage').src = p.image;
    $('#productModalImage').alt = p.name[lang()];
    $('#productModalCategory').textContent = t('shop.' + p.category);
    $('#productModalTitle').textContent = p.name[lang()];
    $('#productModalPrice').textContent = formatCOP(p.price);
    $('#productModalDesc').textContent = p.desc[lang()];
    $('#productModalDetails').textContent = p.details[lang()];
    modal.hidden = false;
    Valeria.ui.syncLock();
    setTimeout(() => $('.modal__close', modal)?.focus(), 50);
  };

  const closeProduct = () => {
    const modal = $('#productModal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    Valeria.ui.syncLock();
  };

  const openArticle = (id) => {
    const j = Valeria.journal.find(x => x.id === id);
    if (!j) return;
    state.currentArticle = j;
    const modal = $('#articleModal');
    if (!modal) return;
    $('#articleModalImage').src = j.image;
    $('#articleModalImage').alt = j.title[lang()];
    $('#articleModalTag').textContent = j.tag[lang()];
    $('#articleModalTitle').textContent = j.title[lang()];
    $('#articleModalBody').textContent = j.excerpt[lang()];
    modal.hidden = false;
    Valeria.ui.syncLock();
  };

  const closeArticle = () => {
    const modal = $('#articleModal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    Valeria.ui.syncLock();
  };

  const search = (query) => {
    const results = $('#searchResults');
    if (!results) return;
    const q = String(query || '').toLowerCase().trim();
    const list = q ? Valeria.products.filter(p => {
      const haystack = [p.name.es, p.name.en, p.desc.es, p.desc.en, p.category].join(' ').toLowerCase();
      return haystack.includes(q);
    }) : Valeria.products.slice(0, 4);
    if (!list.length) {
      results.innerHTML = `<p class="search-empty">${lang() === 'es' ? 'No encontramos esa textura. Prueba con “cobija”, “sábana” o “baño”.' : 'We could not find that texture. Try “blanket”, “sheets” or “bath”.'}</p>`;
      return;
    }
    results.innerHTML = list.map(p => `<button class="search-result" type="button" data-product="${p.id}">
      <img src="${p.image}" alt="" width="60" height="72" loading="lazy">
      <strong>${esc(p.name[lang()])}</strong>
      <span>${formatCOP(p.price)}</span>
    </button>`).join('');
  };

  const setFilter = (filter) => {
    state.filter = filter;
    $$('.filter').forEach(btn => btn.classList.toggle('is-active', btn.dataset.filter === filter));
    renderProducts();
  };

  const init = () => {
    renderCollections();
    renderProducts();
    renderJournal();
    $$('.filter').forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
    document.addEventListener('click', (e) => {
      const productBtn = e.target.closest('[data-product]');
      if (productBtn) { e.preventDefault(); Valeria.ui.closeSearch(); openProduct(productBtn.dataset.product); return; }
      const addBtn = e.target.closest('[data-add]');
      if (addBtn) { e.preventDefault(); e.stopPropagation(); Valeria.cart.add(addBtn.dataset.add); return; }
      const collectionBtn = e.target.closest('[data-collection]');
      if (collectionBtn) {
        e.preventDefault();
        setFilter(collectionBtn.dataset.collection);
        Valeria.ui.closeSearch();
        Valeria.dom.scrollTo('#shop');
        return;
      }
      const journalBtn = e.target.closest('[data-journal]');
      if (journalBtn) { e.preventDefault(); openArticle(journalBtn.dataset.journal); return; }
      if (e.target.closest('[data-modal-close]')) {
        if (e.target.closest('#productModal')) closeProduct();
        if (e.target.closest('#articleModal')) closeArticle();
      }
    });
    $('#productModalAdd')?.addEventListener('click', () => {
      if (state.currentProduct) Valeria.cart.add(state.currentProduct.id);
      closeProduct();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeProduct(); closeArticle(); }
    });
    $('#searchInput')?.addEventListener('input', Valeria.dom.debounce((e) => search(e.target.value), 120));
    document.addEventListener('valeria:lang', () => {
      renderCollections(); renderProducts(); renderJournal();
      if (state.currentProduct) openProduct(state.currentProduct.id);
      if (state.currentArticle) openArticle(state.currentArticle.id);
    });
    window.addEventListener('resize', () => { /* layout establishes itself */ });
  };

  return { init, renderProducts, renderCollections, renderJournal, openProduct, closeProduct, search, setFilter };
})();
