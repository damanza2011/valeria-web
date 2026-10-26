# Paquete Valeria · entrega de sitio

**Proyecto:** Valeria · Textiles de descanso  
**Sede:** Barranquilla, Atlántico, Colombia  
**Fecha:** 26 de octubre de 2026  
**Versión:** 1.0 · prototipo de alta fidelidad

## Contenido

| Archivo / carpeta | Uso |
|---|---|
| `index.html` | Home editorial completa. |
| `assets/` | CSS modular, JS modular, imágenes y favicon. |
| `api/chat.js` | API opcional de Gemini para Vercel. |
| `assets/js/data/products.js` | Catálogo y colecciones. |
| `assets/js/ui/cart.js` | Carrito y checkout por WhatsApp. |
| `assets/js/chat/chat.js` | Chat IA + Concierge. |
| `DOCUMENTACION.md` | Documentación técnica y funcional. |
| `docs/AUDITORIA-CODIGO.md` | Auditoría con hallazgos y riesgos. |
| `DEPLOY-GITHUB-VERCEL.md` | Guía de despliegue. |
| `preview-*.png` | Capturas desktop, móvil, chat y carrito. |

## Estado

El sitio funciona en local: catálogo, filtros, búsqueda, ficha, carrito, idioma, chat y Concierge. **No** procesa pagos, no descuenta inventario y no envía correos reales. El checkout abre WhatsApp con el resumen.

## Antes de publicar

1. Reemplazar `573000000000` / `+57 300 000 0000`.
2. Reemplazar `hola@valeria.com.co`.
3. Confirmar dirección del showroom.
4. Reemplazar dominio `valeria-home.vercel.app`.
5. Confirmar precios, productos, stock, envíos y garantía.
6. Reemplazar imágenes por fotografía propia o validar licencia.
7. Integrar pago, inventario y CRM.
8. Validar la titularidad de la marca Valeria.

## Créditos

Fotografías editoriales de Unsplash usadas como demostración. No se usó nombre, logo, textos ni imágenes de Fenore. Ver `DOCUMENTACION.md`.
