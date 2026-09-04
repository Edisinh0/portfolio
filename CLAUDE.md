# Portfolio de Eddie Cerpa

Sitio estático en Astro con estética de escritorio retro. Bilingüe español/inglés,
9 páginas generadas, sin backend. Desplegado en Vercel desde `main`.

- **En vivo:** https://eddie-cerpa-edisinh0s-projects.vercel.app
- **Repo:** https://github.com/Edisinh0/portfolio (público)

```
npm run dev      # servidor de desarrollo
npm run build    # genera dist/
npm run preview  # sirve la build
```

## Publicar capturas de un proyecto

Este es el flujo que más confunde, así que va primero.

1. Dejar los PNG en **`capturas/<slug>/`** — carpeta en la raíz, **fuera de git**
   (está en `.gitignore` porque las originales pueden traer datos de clientes).
   La portada se llama `cover`; el resto va numerado: `01-nombre`, `02-nombre`.
2. `python3 scripts/capturas.py` — convierte a `.webp`, reduce a 1600 px de ancho
   y los escribe en `public/projects/<slug>/`.
3. `npm run build`. El build arma tarjetas y galerías solo, **sin tocar código**.

`python3 scripts/capturas.py --estado` informa qué proyecto no tiene portada.

**La portada y la galería son cosas distintas.** `cover.webp` alimenta la tarjeta
de la grilla de Proyectos; `gallery/*.webp` alimenta el visor de la ficha de
detalle. Un proyecto con portada pero sin galería muestra "CAPTURA PENDIENTE" en
el detalle: hay que poblar las dos.

### Antes de publicar cualquier captura

Revisarla contra la lista de **`public/projects/LEEME.md`**: RUT, montos, folios,
teléfonos, anexos, IPs privadas, nombres de personas, tokens, correos y **la barra
de pestañas del navegador**. Seis de los ocho proyectos son sistemas internos con
datos de clientes reales.

Lo limpio es capturar contra datos de demostración. Si no se puede, tapar con
bloque sólido — nunca con desenfoque. `scripts/censurar.py` ayuda con eso.

## Textos e i18n

Todo el texto vive en **`src/i18n/translations.ts`**, en dos objetos: `es` y `en`.
No hay strings sueltos en los componentes.

Las claves de las capturas siguen esta forma, y el slug sale del nombre del
archivo sin el prefijo numérico (`04-dependencias.webp` → `dependencias`):

```
project.<clave>.cover.alt
project.<clave>.shot.<nombre>.alt
project.<clave>.shot.<nombre>.caption
```

`claveSiExiste` hace que las claves ausentes no rompan nada: la captura se publica
igual, con el alt de la portada y sin pie.

**Al publicar una imagen hay que actualizar su `alt`.** Los proyectos sin captura
tienen un alt de marcador ("Espacio reservado para..."), que era cierto mientras
no había imagen. Al publicarla queda describiendo un vacío que ya no existe, y es
el texto que lee un lector de pantalla.

El runtime de i18n intercambia atributos de forma genérica: cualquier
`data-i18n-attr-<nombre>` se aplica al atributo correspondiente
(`Layout.astro`). Sirve para `alt`, `content`, `aria-label` y, si hiciera falta,
`src`.

## Estructura

```
src/data/projects.ts    los 9 proyectos; capturasDe() cablea las imágenes
src/data/capturas.ts    lee public/projects/ y arma cover + gallery
src/i18n/               translations.ts, único lugar con texto
src/components/astro/   secciones de la página (Hero, Projects, Stack...)
src/components/ui/      piezas reutilizables (galería, ventanas, gato)
public/cv.html          CV en español · cv-en.html en inglés
```

## Cosas que ya nos mordieron

**`site` en `astro.config.mjs` es obligatorio.** Sin él, Astro emite `og:url` y
`og:image` como rutas relativas y LinkedIn, Upwork o WhatsApp no arman la vista
previa al compartir el enlace.

**Cuidado con `flex: 1` en filas que deben envolver.** Fija `flex-basis` en 0, así
que los elementos siempre "caben" en una línea y el `flex-wrap` nunca se activa;
lo que desborda es el contenido interno, que no encoge. Pasó con los filtros de
proyectos y provocaba scroll horizontal en móvil.

**Para medir desbordamiento horizontal, comparar `scrollWidth` con `innerWidth`.**
Las capturas engañan: Chrome headless tiene un ancho mínimo de ventana de ~500 px
y recorta la imagen al tamaño pedido, lo que simula un desbordamiento inexistente.

**Las secciones usan revelado por scroll** (`data-reveal`). En capturas
automatizadas hay que forzar `prefers-reduced-motion: reduce`, o el contenido sale
en blanco.
