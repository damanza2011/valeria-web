/* Persistencia segura en localStorage */
window.Valeria = window.Valeria || {};
Valeria.storage = (() => {
  const key = (name) => `${Valeria.config.storageKey}.${name}`;
  const get = (name, fallback = null) => {
    try {
      const raw = localStorage.getItem(key(name));
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) { return fallback; }
  };
  const set = (name, value) => {
    try { localStorage.setItem(key(name), JSON.stringify(value)); return true; }
    catch (_) { return false; }
  };
  const remove = (name) => {
    try { localStorage.removeItem(key(name)); } catch (_) {}
  };
  return { get, set, remove };
})();
