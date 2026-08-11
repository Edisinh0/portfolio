# Portfolio de Eddie Cerpa — variante retro

Portfolio personal de **Eddie Cerpa**, desarrollador FullStack en Santiago de Chile.

## Crédito

El diseño, la maquetación y todo el código de interfaz son obra de
**[Damián Alexander Aceves Navarrete](https://github.com/Damianx64)**, tomados de su portfolio
en [github.com/Damianx64/portfolio](https://github.com/Damianx64/portfolio) **con su autorización**.
Esta variante conserva su estética de escritorio retro y reemplaza únicamente el contenido.

Si el sitio se publica, el crédito debe quedar visible.

## Gatos

Los sprites de `public/gatos/` salen del pack **[64x64 FREE Pixel Cats](https://last-tick.itch.io/animated-pixel-cats-64x64)**
de **Last tick** — gratis, uso comercial permitido, sin exigencia de crédito (se da igual).
Son cuatro filas del pack recortadas al área útil, no el pack completo.

> El pack prohíbe **revender o redistribuir**. Usarlo en un sitio desplegado es su uso previsto;
> si este repo se publica en GitHub, los PNG quedan visibles ahí. Son cuatro tiras sueltas y no
> las hojas originales, pero conviene tenerlo presente antes de hacerlo público.

`src/components/ui/GatoPixel.astro` los anima con `steps()` en CSS, sin JavaScript, y respeta
`prefers-reduced-motion` (el gato se congela en el primer cuadro en vez de desaparecer).

| Sección | Gato |
|---|---|
| Proyectos | naranjo cruzando la sección, de derecha a izquierda |
| Tecnologías | negro lamiéndose la pata |
| Sobre mí | blanco durmiendo |
| Contacto | naranjo sentado de espaldas, moviendo la cola |

Para agregar otro: extraer su fila del pack, dejar el PNG en `public/gatos/` y sumar la entrada
a `SPRITES` en el componente con el tamaño de un cuadro. **El sentido del paseo tiene que coincidir
con hacia dónde mira el sprite**, o el gato camina de espaldas.

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

## Capturas de los proyectos

No hay que tocar código para publicar una captura. El build lee
`public/projects/` y arma tarjetas y galerías solo.

```bash
python3 scripts/capturas.py --estado   # qué falta
python3 scripts/capturas.py            # convierte capturas/ → public/projects/
npm run build
```

Se dejan los PNG/JPG en `capturas/<slug>/` —la portada llamada `cover`, el resto
numerado—, el script los pasa a `.webp` de 1600 px y `src/data/capturas.ts` los
descubre en el build. Mientras no exista `cover.webp`, la tarjeta muestra el
recuadro provisional con el nombre del archivo que falta: nunca hay imagen rota.

`capturas/` está fuera de git a propósito, porque guarda los originales sin revisar.

**Antes de subir cualquier captura**, revisar la lista de datos sensibles en
[`public/projects/LEEME.md`](public/projects/LEEME.md) — ahí está también qué
conviene capturar de cada proyecto. Seis de los ocho son sistemas internos con
datos de clientes reales.

Para ponerle texto propio a una captura, agregar a `translations.ts` las claves
`project.<clave>.shot.<nombre>.alt` y `.caption`, donde `<nombre>` es el archivo
sin el número (`01-ventas.webp` → `ventas`). Si no existen, la captura se publica
igual con el alt de la portada y sin pie.

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
