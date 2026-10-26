# Arquitectura · Valeria

## Capas

1. **Presentación:** `index.html` con secciones semánticas y capas (búsqueda, carrito, producto, artículo, chat).
2. **Sistema visual:** CSS en seis archivos: tokens, base, layout, componentes, commerce y chat.
3. **Datos:** `products.js` (catálogo y colecciones) y `journal.js` (notas).
4. **Estado:** `storage.js` para idioma y carrito; estado local en módulos.
5. **UI:** navegación, catálogo, carrito, formularios y reveal.
6. **Chat:** `chat/chat.js` con KB local, API opcional y Concierge.
7. **Serverless:** `api/chat.js` para Vercel.

## Flujo de compra

`producto → ficha → agregar → localStorage → carrito → WhatsApp`.

No hay pago ni inventario. El checkout es una conversación, no una transacción.

## Flujo de idioma

`data-i18n` → diccionario ES/EN → evento `valeria:lang` → catálogo, carrito y chat se vuelven a renderizar.

## Flujo de chat

`FAB → panel → pestaña IA o Concierge → intención local o API → respuesta → handoff WhatsApp`.

## Decisiones

- Sin framework ni build para reducir riesgo de despliegue.
- Módulos IIFE y namespace `window.Valeria` para compatibilidad sin bundler.
- Precios en COP con `Intl.NumberFormat`.
- Imágenes locales para evitar dependencia de CDN de terceros.
- API opcional: la tienda funciona sin clave.

## Deuda técnica

- Separar la KB del chat en archivo propio.
- Añadir focus trap y pruebas de accesibilidad.
- Convertir imágenes a formatos modernos.
- Integrar catálogo, stock y pagos reales.
