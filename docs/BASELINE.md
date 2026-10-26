# Baseline · Valeria

**Fecha:** 26 de octubre de 2026  
**Entorno:** Chrome headless, servidor local `http://127.0.0.1:8092/`.

## Estado inicial

- Página principal con 8 productos, 3 colecciones y 3 notas.
- Catálogo filtrable y buscable.
- Carrito con persistencia local.
- Chat local + API opcional.
- Concierge de 5 rutas.
- Bilingüe ES/EN.
- Sin errores de consola.
- Sin overflow horizontal a 390 px.

## Pruebas realizadas

| Prueba | Resultado |
|---|---|
| `GET /` | 200 |
| Render de productos | 8 |
| Render de colecciones | 3 |
| Render de journal | 3 |
| Filtro cobijas | 2 |
| Añadir al carrito | Contador 1 |
| Búsqueda “cobija” | 3 resultados |
| Ficha de producto | Abre |
| Artículo de journal | Abre |
| Concierge | 5 tarjetas |
| ES/EN | Cambia título y producto |
| Consola | Sin errores |
| 390 px | Sin overflow |

## Limitaciones

No se probaron pagos, inventario, WhatsApp real, Safari/Firefox, lector de pantalla ni Lighthouse. Se documentan como pendientes en `TEST-REPORT.md` y `AUDITORIA-CODIGO.md`.
