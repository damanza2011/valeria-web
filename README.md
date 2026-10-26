# Valeria · Textiles de descanso

Tienda editorial bilingüe para una marca de textiles del hogar con sede en **Barranquilla, Colombia**. El proyecto reinterpreta la categoría de Fenore —cobijas, edredones, sábanas, baño y bienestar— con identidad propia, enfoque editorial y una experiencia de compra más cuidada. No usa el nombre, los textos ni las imágenes de Fenore.

## Qué incluye

- Home editorial con hero, colecciones, historia, ritual, showroom y journal.
- Catálogo de 8 productos con filtros, búsqueda, ficha modal y precios en COP.
- Carrito funcional con `localStorage`, cantidades, subtotal y checkout por WhatsApp.
- Selector ES/EN con persistencia.
- Concierge con pestaña de IA y pestaña humana.
- Showroom en Barranquilla y formulario de newsletter.
- Diseño responsive, accesibilidad básica y documentación de entrega.
- API opcional `/api/chat` para Gemini en Vercel; sin clave, el chat usa el fallback local.

## Ejecutar en local

```powershell
cd C:\Users\dan\Documents\deepseek-harness\default-workspace\valeria-web
python -m http.server 8092
```

Abre `http://127.0.0.1:8092/`.

También puedes usar `start-demo.cmd`.

## Desplegar

- **Vercel:** importa el repo, framework **Other**, root `./`, sin build command. Agrega `GEMINI_API_KEY` y `GEMINI_MODEL` si quieres IA.
- **GitHub Pages:** funciona el front, pero `/api/chat` no se ejecuta; el chat usa el fallback local.
- **Dominio:** reemplaza `valeria-home.vercel.app` por el dominio real en `index.html`, `robots.txt`, `sitemap.xml` y `site.webmanifest`.

Guía completa: `DEPLOY-GITHUB-VERCEL.md`.

## Antes de publicar

1. Reemplazar el WhatsApp de demostración `+57 300 000 0000` / `573000000000`.
2. Reemplazar `hola@valeria.com.co` y la dirección del showroom.
3. Confirmar precios, stock, tiempos de entrega y políticas.
4. Validar derechos de las imágenes y cambiar las que sean necesarias.
5. Conectar pasarela de pago e inventario reales.
6. Añadir política de datos, términos y consentimiento.
7. Revisar que la marca Valeria sea de titularidad del cliente.

## Estado

Prototipo de alta fidelidad, funcional en local y listo para despliegue estático. Los precios, testimonios, reseñas y datos de contacto son ilustrativos. Ver `DOCUMENTACION.md` y `docs/AUDITORIA-CODIGO.md`.
