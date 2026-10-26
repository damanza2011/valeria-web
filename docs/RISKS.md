# Riesgos · Valeria

| Riesgo | Severidad | Impacto | Mitigación | Estado |
|---|---|---|---|---|
| Contacto y dominio de demostración | Alta | Enlaces y correos no llegan a la marca | Reemplazar en config, HTML, sitemap y manifest | Abierto |
| Precios, stock y testimonios ilustrativos | Alta | Expectativa incorrecta del cliente | Confirmar catálogo real y marcar demo hasta publicar | Abierto |
| Checkout solo por WhatsApp | Alta | No hay cobro automático ni conciliación | Integrar pasarela (Wompi/Shopify) y orden de compra | Abierto |
| Newsletter sin CRM | Alta | No se capturan leads ni consentimiento | Conectar CRM y doble opt-in | Abierto |
| Imágenes de Unsplash | Media | Licencia y peso | Validar licencia; reemplazar por fotografía propia; WebP/AVIF | Abierto |
| API opcional sin clave | Media | Chat solo local | Configurar `GEMINI_API_KEY` en Vercel | Aceptado |
| Sin focus trap | Media | Accesibilidad | Implementar trampa de foco y pruebas | Abierto |
| Sin pruebas automatizadas | Media | Regresiones | Playwright/Vitest en fase 2 | Abierto |
| Sin CSP/HSTS | Media | Seguridad | Añadir cabeceras y CSP | Abierto |
| Marca Valeria no validada | Alta | Riesgo legal | Verificar titularidad y registro de marca | Abierto |

La tienda es apta para demostración y validación visual. No debe presentarse como e-commerce transaccional final hasta cerrar los riesgos altos.
