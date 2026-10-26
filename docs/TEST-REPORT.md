# Test report · Valeria

## Ejecutado

- Servidor local Python `http.server` en `8092`.
- Chrome headless 1440×1000 y 390×844.
- Navegación, render dinámico, filtros, búsqueda, ficha, journal, carrito, chat y cambio de idioma.
- Verificación de consola y ancho de página.

## Resultados

| Caso | Resultado | Evidencia |
|---|---|---|
| Home 200 | OK | HTTP 200 |
| 8 productos | OK | `querySelectorAll('.product').length` |
| 3 colecciones | OK | `querySelectorAll('.collection').length` |
| 3 journal | OK | `querySelectorAll('.journal-card').length` |
| Filtro cobijas | OK | 2 productos |
| Búsqueda | OK | 3 resultados para “cobija” |
| Ficha | OK | Modal con título |
| Añadir | OK | Contador actualizado |
| Carrito | OK | Subtotal y progreso |
| Chat | OK | Respuesta con Bruma/Noche |
| Concierge | OK | 5 tarjetas |
| ES/EN | OK | Título y producto traducidos |
| Consola | OK | 0 errores |
| 390 px | OK | Sin overflow |

## No ejecutado

- Pago real.
- Inventario.
- WhatsApp real.
- Pruebas cross-browser.
- Lector de pantalla.
- Lighthouse.
- Pruebas automatizadas.

## Conclusión

El prototipo pasa la prueba de humo funcional. Las pruebas de producción deben repetirse después de conectar pagos, inventario, dominio y datos reales.
