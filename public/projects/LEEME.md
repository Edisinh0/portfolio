# Capturas de los proyectos

## Cómo se publican

1. Dejar los PNG/JPG en `capturas/<slug>/` (en la raíz del repo, fuera de git).
   La portada se llama `cover`; el resto, numerado: `01-...`, `02-...`
2. `python3 scripts/capturas.py` — convierte a `.webp`, los achica a 1600 px de
   ancho y los deja aquí.
3. `npm run build`. El build lee esta carpeta y arma las tarjetas y las galerías
   solo: **no hay que tocar código**.

`python3 scripts/capturas.py --estado` dice qué falta.

Mientras no exista `cover.webp`, la tarjeta muestra el recuadro provisional con
el nombre del archivo que falta. Nunca aparece una imagen rota.

## Antes de subir cualquier captura

Seis de los ocho proyectos son sistemas internos con datos de clientes reales.
Revisar **cada** imagen contra esta lista:

- [ ] **RUT** y razón social de clientes
- [ ] **Montos** reales, folios de boleta/factura, números de documento tributario
- [ ] **Números de teléfono**, DIDs y anexos
- [ ] **IPs privadas** (`172.16.x.x`, `192.168.x.x`), hostnames internos, dominios de gestión
- [ ] **Nombres de personas**: usuarios, agentes, ejecutivos, destinatarios de correo
- [ ] **Tokens, claves de API, cookies de sesión** visibles en la URL o en un panel
- [ ] La **URL de la barra del navegador**
- [ ] Correos electrónicos reales

Lo más limpio es capturar en un entorno de pruebas con datos ficticios. Si eso no
se puede, tapar con un bloque sólido — no con desenfoque, que a veces se revierte.

## Qué conviene capturar de cada uno

| Proyecto | Capturas que cuentan la historia | Cuidado especial |
|---|---|---|
| `tna-office` | Dashboard de ventas · emisión de una boleta · calendario de reservas · estado de resultados | RUT, montos, folios, nombres de clientes |
| `queue-alerts` | Dashboard de colas en vivo · pantalla de umbrales · el correo de alerta | Nombre del cliente, anexos, nombres de agentes |
| `taskflow` | Árbol de tareas con dependencias · una tarea bloqueada · un reporte | Nombres de personas asignadas |
| `screenpop` | **Un diagrama de la arquitectura** vale más que una captura aquí · el ticket abriéndose prellenado | Teléfono del llamante, IPs internas, dominio de la mesa de ayuda |
| `wiplus` | Es público: capturar de `wiplus.cl` directamente | — |
| `congelados-naty` | Es público: tienda y panel de administración | Pedidos y clientes reales del panel |
| `tnagroup` | Es público: la portada con el video | — |
| `whm-provision` | El instalador desatendido corriendo · la salida del health-check | Hostnames, IPs, licencia de cPanel |

Para `screenpop` en particular: es una integración entre tres sistemas, así que
un diagrama del flujo se entiende mucho mejor que una captura de un formulario.
