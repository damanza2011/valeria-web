window.Valeria = window.Valeria || {};
Valeria.chat = (() => {
  const { $, $$, esc } = Valeria.dom;
  const state = { open: false, lang: Valeria.i18n.current, tab: 'ai', started: false, busy: false, history: [] };

  const AREAS = [
    { id: 'comprar', label: { es: 'Quiero comprar', en: 'I want to buy' }, desc: { es: 'Te ayudo a elegir textura y color.', en: 'I will help you choose texture and colour.' }, msg: { es: 'Hola Valeria, vengo de la web. Quiero asesoría para elegir una cobija, edredón o sábana.', en: 'Hi Valeria, I am coming from the website. I would like advice choosing a blanket, duvet or sheets.' } },
    { id: 'medidas', label: { es: 'Medidas y materiales', en: 'Sizes & materials' }, desc: { es: 'Medidas, composición y cuidado.', en: 'Sizes, composition and care.' }, msg: { es: 'Hola Valeria, necesito ayuda con medidas, materiales y cuidado de un producto.', en: 'Hi Valeria, I need help with sizes, materials and care for a product.' } },
    { id: 'showroom', label: { es: 'Visitar el showroom', en: 'Visit the showroom' }, desc: { es: 'Barranquilla, con cita previa.', en: 'Barranquilla, by appointment.' }, msg: { es: 'Hola Valeria, quiero agendar una visita al showroom de Barranquilla.', en: 'Hi Valeria, I would like to book a visit to the Barranquilla showroom.' } },
    { id: 'envio', label: { es: 'Envío o pedido', en: 'Shipping or order' }, desc: { es: 'Estado, entregas y cambios.', en: 'Status, delivery and returns.' }, msg: { es: 'Hola Valeria, tengo una pregunta sobre un pedido, envío o cambio.', en: 'Hi Valeria, I have a question about an order, shipping or return.' } },
    { id: 'orientacion', label: { es: 'No sé qué elegir', en: 'Not sure what to choose' }, desc: { es: 'Me guías según tu espacio.', en: 'Guide me based on my space.' }, msg: { es: 'Hola Valeria, no sé qué elegir. ¿Me orientan según mi espacio y clima?', en: 'Hi Valeria, I am not sure what to choose. Could you guide me based on my space and climate?' } }
  ];

  const COPY = {
    es: {
      welcome: 'Hola, soy Valeria. Te ayudo a elegir texturas para tu casa, resolver envíos o agendar el showroom. ¿Por dónde empezamos?',
      quick: [
        { label: 'Cobijas', prompt: '¿Qué cobija me recomiendan para el calor?' },
        { label: 'Edredones', prompt: 'Quiero un edredón liviano.' },
        { label: 'Envíos', prompt: '¿Cómo funcionan los envíos?' },
        { label: 'Showroom', prompt: 'Quiero agendar una visita al showroom.' },
        { label: 'Hablar con humano', prompt: 'Quiero hablar con una persona.' }
      ],
      fallback: 'Puedo ayudarte con cobijas, edredones, sábanas, baño, envíos, garantía y showroom. Si necesitas una recomendación personal, pásate a Concierge y te conecto con una persona.',
      intents: [
        { keys: ['hola', 'buenas', 'hello', 'hi'], reply: 'Hola. Soy Valeria, asesora de descanso. ¿Buscas algo para el calor, para aire acondicionado o para regalar?' },
        { keys: ['cobija', 'bruma', 'noche', 'manta', 'blanket'], reply: 'Para el calor, la Cobija Bruma ($289.000) es ligera y fresca. Para aire acondicionado o media estación, la Cobija Noche ($319.000) tiene más caída. ¿Para qué espacio la buscas?' },
        { keys: ['edredón', 'edredon', 'duvet', 'quilt', 'dunas', 'mar abierto'], reply: 'El Edredón Mar Abierto ($459.000) es acolchado y reversible; el Quilt Dunas ($389.000) es más liviano. Ambos funcionan con sábanas claras. ¿Buscas algo fresco o con más cuerpo?' },
        { keys: ['sábana', 'sabana', 'arenal', 'sheet', 'hilo'], reply: 'Las Sábanas Arenal ($329.000) son de 300 hilos, four pieces, queen. Son frescas y de caída suave. Si tu cama es king, te confirmo disponibilidad por WhatsApp.' },
        { keys: ['baño', 'bano', 'toalla', 'coral', 'bath'], reply: 'El Set Coral ($249.000) incluye dos toallas de algodón de secado rápido, 500 g/m². Ideal para el clima de Barranquilla.' },
        { keys: ['precio', 'costo', 'cuánto', 'cuanto', 'price'], reply: 'Los precios están en la tienda y son de referencia: Bruma $289.000, Mar Abierto $459.000, Arenal $329.000, Dunas $389.000, Coral $249.000. La disponibilidad y el envío se confirman al pedido.' },
        { keys: ['envío', 'envio', 'domicilio', 'shipping', 'entrega'], reply: 'Enviamos a toda Colombia. Envío gratis desde $400.000. En Barranquilla coordinamos entrega local; fuera de la ciudad, 3–5 días hábiles según transportadora. ¿A qué ciudad lo envías?' },
        { keys: ['showroom', 'barranquilla', 'visita', 'cita', 'visit'], reply: 'El showroom está en Barranquilla y se visita con cita previa, de lunes a sábado, 9:00–18:00. Puedo abrir WhatsApp con el mensaje listo para agendar.' },
        { keys: ['garantía', 'garantia', 'cambio', 'devolución', 'devolucion', 'warranty'], reply: 'Tienes 90 días de garantía. Los cambios aplican por producto sin uso y en su empaque; te acompañamos en el proceso. ¿Es por una compra reciente?' },
        { keys: ['cuidado', 'lavar', 'limpiar', 'care', 'wash'], reply: 'Lava en frío, ciclo suave, seca a la sombra y evita blanqueadores. Para cobijas y edredones, usa funda y ventila entre usos.' },
        { keys: ['medida', 'tamaño', 'tamano', 'queen', 'king', 'size'], reply: 'Manejamos medidas de cama queen y king en varias piezas; cada ficha indica las medidas. Si me dices el ancho de tu cama, te oriento. Para una confirmación exacta, te conecto con una persona.' },
        { keys: ['pago', 'tarjeta', 'payment'], reply: 'El pago se confirma al pedido. No compartas datos de tarjeta por el chat; la pasarela o el asesor te indican el canal seguro.' },
        { keys: ['humano', 'persona', 'asesor', 'concierge', 'human'], reply: 'Claro. En la pestaña Concierge eliges el tema y abrimos WhatsApp con el mensaje listo para que una persona continúe.' }
      ]
    },
    en: {
      welcome: 'Hi, I am Valeria. I can help you choose textures for your home, answer shipping questions or book the showroom. Where shall we start?',
      quick: [
        { label: 'Blankets', prompt: 'Which blanket do you recommend for the heat?' },
        { label: 'Duvets', prompt: 'I am looking for a light duvet.' },
        { label: 'Shipping', prompt: 'How does shipping work?' },
        { label: 'Showroom', prompt: 'I would like to book a showroom visit.' },
        { label: 'Talk to a human', prompt: 'I want to talk to a person.' }
      ],
      fallback: 'I can help with blankets, duvets, sheets, bath, shipping, guarantee and the showroom. If you need a personal recommendation, switch to Concierge and I will connect you with a person.',
      intents: [
        { keys: ['hello', 'hi', 'hey'], reply: 'Hi. I am Valeria, your rest advisor. Are you looking for something for the heat, for air conditioning or as a gift?' },
        { keys: ['blanket', 'bruma', 'noche', 'throw'], reply: 'For heat, the Bruma Blanket ($289,000) is light and cool. For air conditioning or mid-season, the Noche Blanket ($319,000) has more weight. Which room is it for?' },
        { keys: ['duvet', 'quilt', 'dunas', 'mar abierto'], reply: 'The Mar Abierto Duvet ($459,000) is quilted and reversible; the Dunas Quilt ($389,000) is lighter. Both work with light sheets. Are you looking for something cool or with more body?' },
        { keys: ['sheet', 'arenal', 'thread'], reply: 'Arenal Sheets ($329,000) are 300 thread count, four pieces, queen. They are cool with a soft drape. If your bed is king, I can confirm availability by WhatsApp.' },
        { keys: ['bath', 'towel', 'coral'], reply: 'The Coral Bath Set ($249,000) includes two quick-dry cotton towels, 500 g/m². Ideal for the Barranquilla climate.' },
        { keys: ['price', 'cost', 'how much'], reply: 'Prices are shown in the shop and are reference prices: Bruma $289,000, Mar Abierto $459,000, Arenal $329,000, Dunas $389,000, Coral $249,000. Availability and shipping are confirmed with your order.' },
        { keys: ['shipping', 'delivery', 'ship'], reply: 'We ship across Colombia. Free shipping from $400,000. In Barranquilla we coordinate local delivery; elsewhere, 3–5 business days depending on the carrier. Which city are we shipping to?' },
        { keys: ['showroom', 'barranquilla', 'visit', 'appointment'], reply: 'The showroom is in Barranquilla, by appointment, Monday to Saturday, 9:00–18:00. I can open WhatsApp with the message ready to book.' },
        { keys: ['warranty', 'return', 'exchange'], reply: 'You have a 90-day guarantee. Returns apply to unused products in their packaging; we will guide you through it. Is this about a recent purchase?' },
        { keys: ['care', 'wash', 'clean'], reply: 'Wash cold on a gentle cycle, dry in the shade and avoid bleach. For blankets and duvets, use a cover and air them between uses.' },
        { keys: ['size', 'queen', 'king', 'measure'], reply: 'We carry queen and king sizes across several pieces; each product page lists the measurements. Tell me your bed width and I can guide you. For an exact confirmation, I will connect you with a person.' },
        { keys: ['payment', 'card'], reply: 'Payment is confirmed with your order. Please do not share card details in chat; the checkout or an advisor will provide the secure channel.' },
        { keys: ['human', 'person', 'advisor', 'concierge'], reply: 'Of course. In the Concierge tab, choose a topic and we will open WhatsApp with the message ready for a person to continue.' }
      ]
    }
  };

  const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const t = (key) => Valeria.i18n.t(key);
  const copy = () => COPY[state.lang] || COPY.es;

  const addMsg = (role, text) => {
    const box = $('#chatMessages');
    if (!box) return;
    const el = document.createElement('div');
    el.className = `chat-msg chat-msg--${role}`;
    el.textContent = text;
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
  };

  const setTyping = (on) => {
    const el = $('#chatTyping');
    if (!el) return;
    el.hidden = !on;
    if (on) $('#chatMessages').scrollTop = $('#chatMessages').scrollHeight;
  };

  const renderQuick = () => {
    const box = $('#chatQuick');
    if (!box) return;
    box.innerHTML = copy().quick.map(q => `<button type="button" data-quick="${esc(q.prompt)}">${esc(q.label)}</button>`).join('');
  };

  const renderConcierge = () => {
    const grid = $('#conciergeGrid');
    if (!grid) return;
    grid.innerHTML = AREAS.map((a, i) => `<button type="button" class="area-card" data-area="${a.id}">
      <span class="area-card__num">0${i + 1}</span>
      <strong>${esc(a.label[state.lang])}</strong>
      <span>${esc(a.desc[state.lang])}</span>
      <svg class="icon" aria-hidden="true"><use href="#i-up"></use></svg>
    </button>`).join('');
  };

  const setTab = (tab) => {
    state.tab = tab === 'concierge' ? 'concierge' : 'ai';
    const panel = $('#chatPanel');
    const isConcierge = state.tab === 'concierge';
    panel.classList.toggle('is-concierge', isConcierge);
    $$('.chat-tab').forEach(btn => {
      const active = btn.dataset.chatTab === state.tab;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    $('#chatBody').hidden = isConcierge;
    $('#chatQuick').hidden = isConcierge;
    $('#chatForm').hidden = isConcierge;
    $('.chat-legal').hidden = isConcierge;
    $('#chatConcierge').hidden = !isConcierge;
    if (isConcierge) renderConcierge();
  };

  const open = () => {
    if (state.open) return;
    state.open = true;
    state.lang = Valeria.i18n.current;
    const panel = $('#chatPanel');
    panel.hidden = false;
    $('#chatFab').hidden = true;
    $('#chatFab').setAttribute('aria-expanded', 'true');
    Valeria.ui.syncLock();
    renderQuick();
    updateLangButtons();
    if (!state.started) {
      state.started = true;
      addMsg('bot', copy().welcome);
    }
    setTab('ai');
    setTimeout(() => $('#chatInput')?.focus(), 120);
  };

  const close = () => {
    if (!state.open) return;
    state.open = false;
    const panel = $('#chatPanel');
    panel.hidden = true;
    $('#chatFab').hidden = false;
    $('#chatFab').setAttribute('aria-expanded', 'false');
    Valeria.ui.syncLock();
    $('#chatFab').focus();
  };

  const updateLangButtons = () => {
    $$('[data-chat-lang]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.chatLang === state.lang));
    const input = $('#chatInput');
    if (input) input.placeholder = t('chat.placeholder');
  };

  const localReply = (text) => {
    const n = normalize(text);
    const hit = copy().intents.find(i => i.keys.some(k => n.includes(normalize(k))));
    return hit ? hit.reply : copy().fallback;
  };

  const apiReply = async (text) => {
    if (location.protocol === 'file:' || location.hostname.endsWith('github.io')) return null;
    try {
      const res = await fetch(Valeria.config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: state.history.slice(-8), lang: state.lang })
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.reply ? data.reply : null;
    } catch (_) { return null; }
  };

  const send = async (raw) => {
    const text = String(raw || '').trim();
    if (!text || state.busy) return;
    state.busy = true;
    addMsg('user', text);
    state.history.push({ role: 'user', content: text });
    $('#chatInput').value = '';
    setTyping(true);
    const api = await apiReply(text);
    await new Promise(r => setTimeout(r, api ? 120 : 380));
    setTyping(false);
    const reply = api || localReply(text);
    addMsg('bot', reply);
    state.history.push({ role: 'assistant', content: reply });
    state.busy = false;
    $('#chatInput').focus();
  };

  const openArea = (id) => {
    const area = AREAS.find(a => a.id === id);
    if (!area) return;
    const msg = area.msg[state.lang];
    const url = `https://wa.me/${Valeria.config.whatsapp}?text=${encodeURIComponent(msg)}`;
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
  };

  const init = () => {
    $('#chatFab')?.addEventListener('click', open);
    $('#chatClose')?.addEventListener('click', close);
    $$('[data-chat-open]').forEach(btn => btn.addEventListener('click', open));
    $$('.chat-tab').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.chatTab)));
    $$('[data-chat-lang]').forEach(btn => btn.addEventListener('click', () => {
      state.lang = btn.dataset.chatLang === 'en' ? 'en' : 'es';
      updateLangButtons();
      renderQuick();
      if (state.tab === 'concierge') renderConcierge();
    }));
    $('#chatQuick')?.addEventListener('click', (e) => {
      const b = e.target.closest('[data-quick]');
      if (b) send(b.dataset.quick);
    });
    $('#chatForm')?.addEventListener('submit', (e) => { e.preventDefault(); send($('#chatInput').value); });
    $('#conciergeGrid')?.addEventListener('click', (e) => {
      const b = e.target.closest('[data-area]');
      if (b) openArea(b.dataset.area);
    });
    $('#conciergeHelp')?.addEventListener('click', () => openArea('orientacion'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.open) close(); });
    document.addEventListener('valeria:lang', () => {
      state.lang = Valeria.i18n.current;
      updateLangButtons();
      renderQuick();
      if (state.tab === 'concierge') renderConcierge();
    });
    updateLangButtons();
    renderQuick();
  };

  return { init, open, close, send, setTab, get isOpen() { return state.open; } };
})();
