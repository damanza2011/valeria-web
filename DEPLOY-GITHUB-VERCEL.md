# Despliegue · Valeria

## 1. Probar en local

```powershell
cd C:\Users\dan\Documents\deepseek-harness\default-workspace\valeria-web
python -m http.server 8092
```

Abre `http://127.0.0.1:8092/`. También puedes usar `start-demo.cmd`.

## 2. Subir a GitHub

1. Crea un repositorio **vacío** llamado `valeria-web` (privado hasta aprobar).
2. Desde la carpeta:

```powershell
git init
git add .
git commit -m "Valeria storefront v1"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/valeria-web.git
git push -u origin main
```

Si usas GitHub Desktop: **Add local repository → create → Publish repository → Commit → Push**.

## 3. Vercel

1. [vercel.com/new](https://vercel.com/new) → importa `valeria-web`.
2. Framework Preset: **Other**.
3. Root Directory: `./`.
4. Build Command: vacío.
5. Environment Variables:

| Nombre | Valor |
|---|---|
| `GEMINI_API_KEY` | Clave de Google AI Studio (opcional) |
| `GEMINI_MODEL` | `gemini-2.5-flash` |

6. Deploy.

Si no agregas clave, el chat funciona con el fallback local; `/api/chat` responderá 503 y el frontend no se rompe.

## 4. GitHub Pages

- Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
- URL: `https://TU-USUARIO.github.io/valeria-web/`.
- El front funciona; la API no. El chat usa fallback local.

## 5. Antes de compartir

1. Cambiar `573000000000` y `+57 300 000 0000` en `assets/js/core/config.js` e `index.html`.
2. Cambiar `hola@valeria.com.co` y la dirección del showroom.
3. Confirmar precios, productos, stock, envíos y garantía.
4. Cambiar `valeria-home.vercel.app` en `index.html`, `robots.txt`, `sitemap.xml` y `site.webmanifest`.
5. Validar imágenes y reemplazar por fotografía propia.
6. Conectar pago, inventario y CRM.
7. Añadir política de datos y términos.

## 6. Prueba mínima

- Home y hero en desktop/móvil.
- Filtros y búsqueda.
- Ficha de producto.
- Agregar al carrito, cambiar cantidades y abrir checkout.
- Chat IA y Concierge.
- Cambio ES/EN.
- Formulario de newsletter.
- Enlaces de WhatsApp y correo.

## 7. Seguridad

- No subas `.env` ni claves.
- La API key vive solo en Vercel.
- El checkout actual es una conversación; no procesa pagos.
- No pidas datos de tarjeta por el chat.

## 8. Nota de marca

Valeria es un prototipo de reinterpretación de la categoría de Fenore. No usa el nombre, logo ni contenido de Fenore. Antes de publicar, confirma la titularidad de la marca, textos e imágenes.
