# Portfolio de Damian Aceves

¡Hola! Este es mi portafolio como desarrollador. Aquí comparto una parte de mi trabajo, las tecnologías con las que disfruto crear y un poco de mi recorrido como Ingeniero en Sistemas Computacionales.

Me gusta transformar ideas en experiencias digitales claras, funcionales y atractivas. Para este sitio elegí una estética inspirada en el software de escritorio retro, porque también creo que los detalles hacen que una interfaz se sienta más cercana y memorable.

## Lo que encontrarás

- Proyectos web y móviles, con filtros por categoría y una página de detalle para cada uno.
- Las tecnologías, frameworks y herramientas que forman parte de mi día a día.
- Mi experiencia, formación y forma de entender el desarrollo de software.
- Enlaces para contactarme, conocer mi perfil de GitHub y descargar mi CV.

## Catálogo de proyectos

La información de los proyectos se concentra en [`src/data/projects.ts`](src/data/projects.ts). Cada entrada define el identificador y *slug*, categoría, resumen, portada, galería, tecnologías, descripción, funcionalidades y enlaces disponibles.

Esta fuente de datos alimenta tanto la galería de la página principal como las rutas estáticas de detalle en `/proyectos/[slug]`. Para añadir un nuevo proyecto basta con agregar sus recursos en `public/projects/` y una entrada al arreglo `projects`; la interfaz generará su tarjeta y su página automáticamente.

## Desarrollado con

Este portafolio fue desarrollado con:

- [Astro](https://astro.build/) para la estructura y los componentes interactivos.
- CSS Modules y CSS nativo para conservar una interfaz ligera y personalizada.
- TypeScript para mantener el código más claro y confiable.

## Estructura del proyecto

```text
Portfolio/
├── public/                         # Imágenes, iconos, favicon y CV
│   └── projects/                    # Portadas y galerías de los proyectos
├── src/
│   ├── components/
│   │   ├── astro/                  # Secciones principales de la página
│   │   ├── ui/                     # Componentes usados dentro de las secciones
│   │   └── styles/                 # Bloques visuales construidos únicamente con CSS
│   ├── data/
│   │   └── projects.ts              # Catálogo y tipos de datos de los proyectos
│   ├── layouts/                    # Layouts compartidos
│   ├── pages/                      # Rutas del sitio
│   │   └── index.astro
│   │   └── proyectos/[slug].astro  # Detalle generado para cada proyecto
│   └── styles/
│       └── global.css              # Estilos globales
```

## Contacto

- GitHub: [@Damianx64](https://github.com/Damianx64)
- Correo: [aceves.x64@gmail.com](mailto:aceves.x64@gmail.com)
- LinkedIn: [Damian Alexander Aceves Navarrete](https://www.linkedin.com/search/results/people/?keywords=Damian%20Alexander%20Aceves%20Navarrete)

## Licencia

Este repositorio se utiliza como portafolio personal. Todos los derechos reservados.
