// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Astro lo usa para armar las URL absolutas del sitemap y de las
	// metaetiquetas de Open Graph. Sin esto, la vista previa al compartir el
	// enlace en LinkedIn o Upwork sale incompleta.
	site: 'https://eddie-cerpa-edisinh0s-projects.vercel.app',
});
