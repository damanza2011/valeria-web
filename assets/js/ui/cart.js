window.Valeria = window.Valeria || {};
Valeria.cart = (() => {
  const { $, esc, formatCOP } = Valeria.dom;
  const t = (key) => Valeria.i18n.t(key);
  let items = Valeria.storage.get('cart', []);
  if (!Array.isArray(items)) items = [];

  const product = (id) => Valeria.products.find(p => p.id === id);
  const count = () => items.reduce((n, item) => n + item.qty, 0);
  const subtotal = () => items.reduce((sum, item) => {
    const p = product(item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const persist = () => Valeria.storage.set('cart', items);

  const render = () => {
    const box = $('#cartItems');
    const empty = $('#cartEmpty');
    const foot = $('#cartFoot');
    if (!box) return;
    const valid = items.filter(item => product(item.id) && item.qty > 0);
    if (!valid.length) {
      box.innerHTML = '';
      empty.hidden = false;
      foot.hidden = true;
    } else {
      empty.hidden = true;
      foot.hidden = false;
      box.innerHTML = valid.map(item => {
        const p = product(item.id);
        return `<div class="cart__item">
          <img src="${p.image}" alt="${esc(p.name[Valeria.i18n.current])}" width="60" height="72">
          <div>
            <div class="cart__item-name">${esc(p.name[Valeria.i18n.current])}</div>
            <div class="cart__item-price">${formatCOP(p.price)}</div>
            <div class="cart__qty">
              <button type="button" data-cart-qty="${p.id}" data-dir="-1" aria-label="Quitar uno">−</button>
              <span>${item.qty}</span>
              <button type="button" data-cart-qty="${p.id}" data-dir="1" aria-label="Agregar uno">+</button>
              <button type="button" class="cart__remove" data-cart-remove="${p.id}">${Valeria.i18n.current === 'es' ? 'Quitar' : 'Remove'}</button>
            </div>
          </div>
          <div class="cart__item-total">${formatCOP(p.price * item.qty)}</div>
        </div>`;
      }).join('');
    }
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = String(count()); });
    const sub = subtotal();
    if ($('#cartSubtotal')) $('#cartSubtotal').textContent = formatCOP(sub);
    const remaining = Math.max(0, Valeria.config.freeShipping - sub);
    if ($('#shippingText')) {
      $('#shippingText').textContent = remaining > 0
        ? (Valeria.i18n.current === 'es' ? `Te faltan ${formatCOP(remaining)} para envío gratis` : `${formatCOP(remaining)} away from free shipping`)
        : (Valeria.i18n.current === 'es' ? 'Tu pedido tiene envío gratis' : 'Your order ships free');
    }
    if ($('#shippingBar')) $('#shippingBar').style.width = `${Math.min(100, (sub / Valeria.config.freeShipping) * 100)}%`;
    persist();
  };

  const add = (id, qty = 1) => {
    const p = product(id);
    if (!p) return;
    const found = items.find(item => item.id === id);
    if (found) found.qty += qty;
    else items.push({ id, qty });
    render();
    Valeria.dom.toast(Valeria.i18n.current === 'es' ? `${p.name.es} agregada al carrito` : `${p.name.en} added to cart`);
  };

  const remove = (id) => {
    items = items.filter(item => item.id !== id);
    render();
  };

  const setQty = (id, dir) => {
    const found = items.find(item => item.id === id);
    if (!found) return;
    found.qty += dir;
    if (found.qty <= 0) items = items.filter(item => item.id !== id);
    render();
  };

  const open = () => {
    Valeria.ui.closeSearch();
    const panel = $('#cartPanel');
    if (!panel) return;
    render();
    panel.hidden = false;
    Valeria.ui.syncLock();
    $('#cartClose')?.focus();
  };

  const close = () => {
    const panel = $('#cartPanel');
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    Valeria.ui.syncLock();
    $('#cartOpen')?.focus();
  };

  const checkout = () => {
    if (!items.length) return;
    const lines = items.map(item => {
      const p = product(item.id);
      return `• ${item.qty} × ${p.name[Valeria.i18n.current]} — ${formatCOP(p.price * item.qty)}`;
    }).join('\n');
    const msg = Valeria.i18n.current === 'es'
      ? `Hola Valeria, quiero confirmar este pedido:\n${lines}\n\nSubtotal: ${formatCOP(subtotal())}\n¿Me ayudan con disponibilidad, color y envío?`
      : `Hi Valeria, I would like to confirm this order:\n${lines}\n\nSubtotal: ${formatCOP(subtotal())}\nCould you help with availability, colour and shipping?`;
    const url = `https://wa.me/${Valeria.config.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  };

  const init = () => {
    $('#cartOpen')?.addEventListener('click', open);
    $('#cartClose')?.addEventListener('click', close);
    $('#checkoutBtn')?.addEventListener('click', checkout);
    document.addEventListener('click', (e) => {
      const qty = e.target.closest('[data-cart-qty]');
      if (qty) { e.preventDefault(); setQty(qty.dataset.cartQty, Number(qty.dataset.dir)); return; }
      const rem = e.target.closest('[data-cart-remove]');
      if (rem) { e.preventDefault(); remove(rem.dataset.cartRemove); return; }
      if (e.target.closest('[data-cart-close]')) close();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    document.addEventListener('valeria:lang', render);
    render();
  };

  return { init, add, remove, render, open, close, get count() { return count(); }, get subtotal() { return subtotal(); } };
})();
