# Documentación · Valeria

**Versión:** 1.0 · **Fecha:** 26 de octubre de 2026  
**Marca:** Valeria · Textiles de descanso  
**Sede:** Barranquilla, Atlántico, Colombia  
**Tipo:** tienda editorial bilingüe + catálogo + carrito + concierge.

## 1. Contexto

Valeria es una marca de textiles para el hogar inspirada en la categoría de **Fenore** (cobijas, edredones, sábanas, baño, bienestar y hogar), pero con identidad propia: paleta Caribe, tono editorial, sede en Barranquilla y una experiencia de compra pensada para el clima cálido.

No se copiaron nombre, logotipo, textos, precios ni imágenes de Fenore. Las imágenes son de Unsplash y se usan como material editorial de demostración; ver créditos al final.

## 2. Stack

- HTML5 semántico.
- CSS modular: tokens, base, layout, componentes, commerce y chat.
- JavaScript vanilla por módulos IIFE, sin build step.
- `localStorage` para idioma y carrito.
- API serverless opcional `POST /api/chat` con Gemini.
- Vercel para producción; GitHub Pages funciona solo con front.

## 3. Estructura

```text
valeria-web/
├─ index.html
├─ DOCUMENTACION.md
├─ README.md
├─ DEPLOY-GITHUB-VERCEL.md
├─ api/chat.js
├─ assets/
│  ├─ css/{tokens,base,layout,components,commerce,chat}.css
│  ├─ js/core/{config,dom,storage}.js
│  ├─ js/data/{products,journal}.js
│  ├─ js/i18n/{es,en,index}.js
│  ├─ js/ui/{navigation,catalog,cart,forms}.js
│  ├─ js/chat/chat.js
│  ├─ js/main.js
│  └─ img/
├─ docs/
│  ├─ PROJECT-CONTEXT.md
│  ├─ AUDITORIA-CODIGO.md
│  ├─ ARCHITECTURE.md
│  ├─ BASELINE.md
│  ├─ MIGRATION-MAP.md
│  ├─ TEST-REPORT.md
│  └─ RISKS.md
├─ package.json
├─ start-demo.cmd
├─ robots.txt
├─ sitemap.xml
└─ site.webmanifest
```

## 4. Rutas y secciones

La home es una experiencia de una sola página con anclas:

- `#top`: hero y propuesta de marca.
- `#collections`: tres colecciones.
- `#shop`: catálogo filtrable.
- `#story`: historia y valores.
- `#showroom`: sede Barranquilla y agenda.
- `#journal`: notas editoriales.
- `#newsletter`: captura de correo.

El carrito, la búsqueda, la ficha de producto, la nota de journal y el chat se abren como capas.

## 5. Catálogo

`assets/js/data/products.js` contiene:

- `Valeria.products`: 8 productos con `id`, `category`, `price`, `image`, `name`, `desc` y `details` en ES/EN.
- `Valeria.collections`: tres colecciones con imagen, filtro y copy bilingüe.

Categorías: `cobijas`, `edredones`, `sabanas`, `bano`, `bienestar`.

Los precios son de referencia y están en COP. No hay inventario ni pasarela conectada: el checkout abre WhatsApp con el resumen del pedido.

## 6. Carrito

`assets/js/ui/cart.js`:

- Persiste en `localStorage` con la clave `valeria.v1.cart`.
- Suma cantidades, calcula subtotal y progreso de envío gratis ($400.000).
- Genera un mensaje de WhatsApp con productos, cantidades y subtotal.
- No procesa pagos ni descuenta stock.

## 7. Chat y Concierge

`assets/js/chat/chat.js` tiene dos pestañas:

- **Valeria · IA:** respuestas locales por intención; si existe `/api/chat`, intenta Gemini y cae al fallback.
- **Concierge:** cinco rutas humanas (comprar, medidas, showroom, envío, orientación) que abren WhatsApp con mensaje prellenado.

No se piden datos sensibles. El chat no confirma stock ni pagos.

## 8. Bilingüe

`assets/js/i18n/es.js` y `en.js` contienen los diccionarios. `i18n/index.js` aplica:

- `data-i18n` → texto.
- `data-i18n-html` → HTML.
- `data-i18n-placeholder` → placeholder.
- `data-i18n-aria` → aria-label.

El idioma se guarda en `localStorage` (`valeria.v1.lang`).

## 9. Variables de entorno

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
```

Sin clave, el chat funciona en modo local.

## 10. Despliegue

### Vercel

1. Importar el repositorio.
2. Framework: Other.
3. Root: `./`.
4. Build command: vacío.
5. Variables: `GEMINI_API_KEY`, `GEMINI_MODEL`.
6. Deploy.

### GitHub Pages

Subir el contenido a la raíz del repo, activar Pages desde `main` / root. El front funciona; la API no. El chat usa fallback local.

## 11. Accesibilidad

- HTML semántico, labels, `aria-label`, `aria-expanded`, `aria-modal`, `aria-live`.
- Foco visible.
- Navegación por teclado y cierre con `Escape`.
- `prefers-reduced-motion`.
- Contraste revisado en textos principales.

Pendiente: focus trap completo en modales/chat y pruebas con lector de pantalla.

## 12. Rendimiento

- Imágenes con `loading="lazy"` salvo hero.
- Sin librerías JS externas.
- CSS y JS divididos por responsabilidad.
- Pendiente: convertir imágenes a WebP/AVIF, definir `srcset` y medir Lighthouse.

## 13. Datos de demostración

Son ilustrativos:

- Precios y productos.
- Testimonios y nombres.
- WhatsApp, correo y dominio.
- Dirección exacta del showroom (se muestra solo “Barranquilla”).
- Fotografías de Unsplash.

## 14. Créditos de imágenes

Fotografías de Unsplash usadas como material editorial de demostración:

- `hero.jpg` — interior luminoso.
- `textile-01.jpg` — almohada sobre fondo amarillo.
- `textile-02.jpg` — pila de cobijas.
- `bedroom-01.jpg`, `bedroom-02.jpg`, `bedroom-03.jpg`, `bedroom-04.jpg` — interiores.
- `bath-01.jpg` — baño.
- `living-01.jpg` — sala.

Reemplazar por fotografía propia de Valeria antes de publicar. Unsplash permite uso comercial bajo su licencia, pero la marca debe validar cada pieza.

## 15. Convenciones

- `camelCase` en JS, `UPPER_SNAKE_CASE` para constantes, clases CSS en kebab-case.
- Un módulo, una responsabilidad.
- Escapar HTML dinámico con `Valeria.dom.esc`.
- No introducir dependencias sin justificar.
- No cambiar copy, precios o contacto sin registrar el cambio.
