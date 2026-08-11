import fs from "node:fs";
import path from "node:path";
import {
	translate,
	translations,
	type TranslationKey,
} from "../i18n/translations";
import type { ProjectMedia } from "./projects";

/**
 * Descubre las capturas de cada proyecto leyendo `public/projects/` durante el
 * build. La idea es no tener que tocar código para publicar una captura: se
 * deja el archivo en su carpeta y aparece sola.
 *
 * Convención:
 *   public/projects/<slug>/cover.webp          → portada
 *   public/projects/<slug>/gallery/01-x.webp   → galería, ordenada por nombre
 *
 * Si no hay portada, se cae al recuadro provisional con el nombre del archivo
 * que falta, para que nunca aparezca una imagen rota.
 *
 * Este módulo SOLO puede importarse desde código de build (frontmatter de
 * .astro o data/), nunca desde un <script> de cliente: usa `node:fs`.
 */

/*
 * Se resuelve desde el directorio de trabajo y no desde `import.meta.url`:
 * en el build, Vite empaqueta este módulo dentro de `dist/`, así que
 * `import.meta.url` apunta al chunk generado y la ruta relativa se va a
 * `dist/public/projects`, que no existe. Tanto `astro dev` como `astro build`
 * corren desde la raíz del proyecto.
 */
const RAIZ = path.join(process.cwd(), "public/projects");

if (!fs.existsSync(RAIZ)) {
	console.warn(
		`[capturas] No encuentro ${RAIZ}. Las portadas van a quedar en el ` +
			`recuadro provisional. ¿Se corrió el build desde la raíz del proyecto?`,
	);
}

const EXTENSIONES = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);

const listar = (dir: string): string[] => {
	try {
		return fs
			.readdirSync(dir)
			.filter((f) => EXTENSIONES.has(path.extname(f).toLowerCase()))
			.sort((a, b) => a.localeCompare(b, "en"));
	} catch {
		return [];
	}
};

/** Devuelve la clave solo si existe traducción para ella. */
const claveSiExiste = (clave: string): TranslationKey | undefined =>
	clave in translations.es ? (clave as TranslationKey) : undefined;

const medio = (
	src: string,
	archivo: string,
	altKey: TranslationKey,
	captionKey?: TranslationKey,
): ProjectMedia => ({
	kind: "image",
	src,
	alt: translate(altKey),
	altKey,
	filename: archivo.toUpperCase(),
	...(captionKey
		? { caption: translate(captionKey), captionKey }
		: {}),
});

export interface CapturasProyecto {
	cover: ProjectMedia;
	gallery: ProjectMedia[];
}

/**
 * @param slug   carpeta dentro de `public/projects/`
 * @param clave  prefijo de las claves i18n del proyecto (p. ej. `tnaOffice`)
 */
export const capturasDe = (slug: string, clave: string): CapturasProyecto => {
	const altPortada = `project.${clave}.cover.alt` as TranslationKey;
	const etiqueta = `project.${clave}.cover.label` as TranslationKey;

	const archivos = listar(path.join(RAIZ, slug));
	const portada = archivos.find((f) => path.parse(f).name === "cover");

	const cover: ProjectMedia = portada
		? medio(
				`/projects/${slug}/${portada}`,
				portada,
				altPortada,
				claveSiExiste(`project.${clave}.cover.caption`),
			)
		: {
				// Recuadro provisional: muestra qué archivo falta.
				kind: "placeholder",
				label: translate(etiqueta),
				labelKey: etiqueta,
				alt: translate(altPortada),
				altKey: altPortada,
				filename: `${slug.toUpperCase().replace(/-/g, "_")}.PNG`,
			};

	const gallery = listar(path.join(RAIZ, slug, "gallery")).map((archivo) => {
		// `01-dashboard.webp` → `dashboard`, que es la clave i18n que se busca.
		const nombre = path.parse(archivo).name.replace(/^\d+[-_]?/, "");
		// Sin texto propio la captura se publica igual, con el alt de la portada
		// y sin pie. Poner "captura pendiente" a una imagen que sí existe sería
		// mentir; el pie es opcional y se agrega cuando haya texto escrito.
		return medio(
			`/projects/${slug}/gallery/${archivo}`,
			archivo,
			claveSiExiste(`project.${clave}.shot.${nombre}.alt`) ?? altPortada,
			claveSiExiste(`project.${clave}.shot.${nombre}.caption`),
		);
	});

	return { cover, gallery };
};
