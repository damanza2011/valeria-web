# Auditoría de código · Valeria

**Fecha:** 26 de octubre de 2026  
**Alcance:** prototipo `valeria-web` · commit inicial `prototype-v1`  
**Auditor:** revisión técnica asistida, con evidencia de navegador y código.

## Resumen ejecutivo

El prototipo es funcional, sin errores de consola en la prueba de humo, y cubre el flujo principal: catálogo, filtros, búsqueda, ficha, carrito, checkout por WhatsApp, idioma y Concierge. No está listo para producción comercial porque los datos de contacto, precios, stock, imágenes y pagos son de demostración.

## Métricas

- 14 archivos JavaScript, 6 archivos CSS y 1 HTML principal.
- 8 productos, 3 colecciones, 3 notas de journal.
- 2 idiomas (ES/EN).
- Sin dependencias de runtime.
- Imágenes: 9 fotografías editoriales; sin `srcset` ni AVIF/WebP.

## Hallazgos

| ID | Severidad | Categoría | Ubicación | Evidencia | Impacto | Recomendación | Estado |
|---|---|---|---|---|---|---|---|
| V-01 | Alta | Operación | `assets/js/core/config.js`, `index.html` | WhatsApp `573000000000`, correo `hola@valeria.com.co`, dominio `valeria-home.vercel.app` | Los enlaces no llegan a la marca real | Reemplazar por datos verificados antes de publicar | Abierto |
| V-02 | Alta | Negocio | `assets/js/data/products.js` | Precios y productos ilustrativos; sin inventario | Un cliente podría pedir algo inexistente | Conectar catálogo/inventario real; marcar disponibilidad | Abierto |
| V-03 | Alta | Pagos | `assets/js/ui/cart.js` | Checkout abre WhatsApp; no hay pasarela | No hay cobro automático ni conciliación | Integrar Wompi/Mercado Pago/Shopify y orden de compra | Abierto |
| V-04 | Alta | Datos | `assets/js/ui/forms.js` | Newsletter solo muestra estado local; no guarda ni envía | No se captura el lead ni hay consentimiento formal | Conectar CRM, doble opt-in y política de datos | Abierto |
| V-05 | Media | Legal/rendimiento | `assets/img/*` | Imágenes de Unsplash sin optimizar | Riesgo de licencia/atribución y peso alto | Usar fotografía propia o validar licencia; WebP/AVIF y `srcset` | Abierto |
| V-06 | Media | API | `api/chat.js`, `assets/js/chat/chat.js` | Sin clave, API 503; fallback local; rate limit en memoria | La IA no responde en Pages y el límite no es distribuido | Configurar clave en Vercel; rate limit durable | Aceptado en demo |
| V-07 | Media | Accesibilidad | `index.html`, `catalog.js`, `chat.js` | Modales y chat sin focus trap completo | Navegación por teclado puede escapar del diálogo | Implementar focus trap, retorno de foco y pruebas con lector | Abierto |
| V-08 | Media | Pruebas | Repo | Sin suite automatizada | Regresiones no detectadas | Añadir Playwright/Vitest cuando se estabilice el contenido | Abierto |
| V-09 | Media | SEO | `index.html`, `robots.txt`, `sitemap.xml` | Canonical y sitemap apuntan a dominio de demo | Indexación incorrecta | Cambiar al dominio final; revisar anclas del sitemap | Abierto |
| V-10 | Media | Seguridad | Repo | Sin CSP ni cabeceras de seguridad | Menor defensa ante XSS/clickjacking | Añadir CSP, HSTS, X-Content-Type-Options y Referrer-Policy | Abierto |
| V-11 | Baja | Mantenibilidad | `assets/js/chat/chat.js` | Archivo de ~400 líneas con UI, KB y API | Difícil de revisar | Separar KB/transporte/UI en una segunda fase | Abierto |
| V-12 | Baja | Contenido | `index.html` | Testimonios y nombres ilustrativos | Puede leerse como prueba real | Reemplazar por reseñas verificadas o marcar como demo | Abierto |

## Evidencia de la prueba de humo

- `GET /` → 200.
- 8 productos, 3 colecciones y 3 notas renderizadas.
- Filtro `cobijas` → 2 productos.
- Añadir al carrito → contador 1; carrito renderiza subtotal.
- Chat: “cobija para el calor” → respuesta con Bruma y Noche.
- Búsqueda “cobija” → 3 resultados; ficha de producto abre.
- Concierge → 5 tarjetas.
- ES/EN → título y nombre de producto cambian.
- Sin errores de consola en Chrome headless.
- Sin overflow horizontal a 390 px.

## No verificado

- Pasarela de pago real.
- Inventario y tiempos de entrega reales.
- WhatsApp con número real.
- Safari/Firefox.
- Lector de pantalla.
- Lighthouse/Core Web Vitals.
- Cumplimiento legal de imágenes y datos.

## Riesgo residual

El prototipo es apto para demostración y validación de marca. No debe presentarse como tienda transaccional final hasta cerrar V-01 a V-04, V-07 y V-09.
