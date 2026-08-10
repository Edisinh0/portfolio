# Portfolio de Eddie Cerpa — variante retro

Portfolio personal de **Eddie Cerpa**, desarrollador FullStack en Santiago de Chile.

## Crédito

El diseño, la maquetación y todo el código de interfaz son obra de
**[Damián Alexander Aceves Navarrete](https://github.com/Damianx64)**, tomados de su portfolio
en [github.com/Damianx64/portfolio](https://github.com/Damianx64/portfolio) **con su autorización**.
Esta variante conserva su estética de escritorio retro y reemplaza únicamente el contenido.

Si el sitio se publica, el crédito debe quedar visible.

## Qué cambia respecto del original

| Área | Cambio |
|---|---|
| `src/data/projects.ts` | Catálogo reescrito: 8 proyectos propios en vez de uno |
| `src/i18n/translations.ts` | Todo el texto ES/EN: identidad, trayectoria, contacto y fichas |
| Categorías | `Web`/`Móvil` → `Sistemas`/`Integraciones`/`Web`/`Infraestructura` |
| Stack | Lenguajes, frameworks (Frontend/Backend/**Datos**) y herramientas del stack propio |
| Trayectoria | La línea de tiempo pasó de 2 entradas fijas a un arreglo de 4 |
| Campo `accessKey` | Nuevo: explica por qué un proyecto no tiene demo, en vez de dejar un enlace muerto |
| Ilustraciones propias de Damián | Su foto y su personaje se quitaron; en su lugar hay SVG provisionales |

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/, HTML estático
npm run preview
```

Requiere Node >= 22.12.

## Catálogo de proyectos

Todo el contenido vive en dos archivos:

- **`src/data/projects.ts`** — una entrada por proyecto: slug, categoría, portada, galería,
  tecnologías y las claves de traducción de su texto. La tarjeta de la portada y la página
  `/proyectos/<slug>` se generan solas.
- **`src/i18n/translations.ts`** — el texto en español e inglés. `es` es la fuente de verdad:
  su tipo define las claves y TypeScript exige que `en` las tenga todas.

Para agregar un proyecto: sumar sus claves a `es` y `en`, y una entrada al arreglo `projects`.

## Pendientes

1. **Las 8 capturas.** Hoy todas las portadas son un placeholder con el nombre del archivo.
   Es lo que más cambia la primera impresión. Antes de subirlas hay que revisar que no
   se filtren datos de clientes: RUT, montos, folios, teléfonos, IPs, nombres de empresa.
   Al agregar una, reemplazar `pendingCover(...)` por
   `{ kind: "image", src: "/projects/<slug>/cover.webp", ... }`.
2. **Foto de perfil.** El hero usa un avatar SVG provisional; el comentario en
   `src/components/astro/Hero.astro` explica cómo cambiarlo por una foto real.
3. **CV en PDF.** Hoy el botón abre `public/cv.html`, no un PDF.
4. **Imagen Open Graph:** al compartir el enlace no se ve nada.
5. **Sin desplegar.** No está publicado en ninguna parte.

## Contacto

- GitHub: [@Edisinh0](https://github.com/Edisinh0)
- Correo: [ed.cerpa@duocuc.cl](mailto:ed.cerpa@duocuc.cl)
- LinkedIn: [eddiecerpa](https://www.linkedin.com/in/eddiecerpa)
