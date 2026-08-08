import { translate, type TranslationKey } from "../i18n/translations";

export type ProjectCategory = "Web" | "Móvil";

export type ProjectMedia =
	| {
			kind: "image";
			src: string;
			alt: string;
			altKey: TranslationKey;
			filename: string;
			caption?: string;
			captionKey?: TranslationKey;
	  }
	| {
			kind: "placeholder";
			label: string;
			labelKey?: TranslationKey;
			alt: string;
			altKey: TranslationKey;
			filename: string;
			caption?: string;
			captionKey?: TranslationKey;
	  };

export interface ProjectTechnology {
	name: string;
	icon: string;
}

export interface ProjectLinks {
	demo?: string;
	repository?: string;
}

export interface Project {
	id: number;
	slug: string;
	title: string;
	titleKey: TranslationKey;
	metaTitleKey: TranslationKey;
	windowTitle: string;
	summary: string;
	summaryKey: TranslationKey;
	dialogLabelKey: TranslationKey;
	category: ProjectCategory;
	cover: ProjectMedia;
	gallery: ProjectMedia[];
	technologies: ProjectTechnology[];
	description: string[];
	descriptionKeys: TranslationKey[];
	features: string[];
	featureKeys: TranslationKey[];
	links?: ProjectLinks;
}

const gastoCover: ProjectMedia = {
	kind: "image",
	src: "/projects/gasto/cover.webp",
	alt: translate("project.gasto.cover.alt"),
	altKey: "project.gasto.cover.alt",
	filename: "GASTO_COVER.WEBP",
	caption: translate("project.gasto.cover.caption"),
	captionKey: "project.gasto.cover.caption",
};

const gastoGallery: ProjectMedia[] = [
	{
		kind: "image",
		src: "/projects/gasto/gallery/01-dashboard.webp",
		alt: translate("project.gasto.gallery.1.alt"),
		altKey: "project.gasto.gallery.1.alt",
		filename: "01_DASHBOARD.WEBP",
		caption: translate("project.gasto.gallery.1.caption"),
		captionKey: "project.gasto.gallery.1.caption",
	},
	{
		kind: "image",
		src: "/projects/gasto/gallery/02-movimientos.webp",
		alt: translate("project.gasto.gallery.2.alt"),
		altKey: "project.gasto.gallery.2.alt",
		filename: "02_MOVIMIENTOS.WEBP",
		caption: translate("project.gasto.gallery.2.caption"),
		captionKey: "project.gasto.gallery.2.caption",
	},
	{
		kind: "image",
		src: "/projects/gasto/gallery/03-nuevo_movimiento.webp",
		alt: translate("project.gasto.gallery.3.alt"),
		altKey: "project.gasto.gallery.3.alt",
		filename: "03_NUEVO_MOVIMIENTO.WEBP",
		caption: translate("project.gasto.gallery.3.caption"),
		captionKey: "project.gasto.gallery.3.caption",
	},
	{
		kind: "image",
		src: "/projects/gasto/gallery/04-reportes.webp",
		alt: translate("project.gasto.gallery.4.alt"),
		altKey: "project.gasto.gallery.4.alt",
		filename: "04_REPORTES.WEBP",
		caption: translate("project.gasto.gallery.4.caption"),
		captionKey: "project.gasto.gallery.4.caption",
	},
	{
		kind: "image",
		src: "/projects/gasto/gallery/05-categorias.webp",
		alt: translate("project.gasto.gallery.5.alt"),
		altKey: "project.gasto.gallery.5.alt",
		filename: "05_CATEGORIAS.WEBP",
		caption: translate("project.gasto.gallery.5.caption"),
		captionKey: "project.gasto.gallery.5.caption",
	},
	{
		kind: "image",
		src: "/projects/gasto/gallery/06-nueva_categoria.webp",
		alt: translate("project.gasto.gallery.6.alt"),
		altKey: "project.gasto.gallery.6.alt",
		filename: "06_NUEVA_CATEGORIA.WEBP",
		caption: translate("project.gasto.gallery.6.caption"),
		captionKey: "project.gasto.gallery.6.caption",
	},
];

export const projects: Project[] = [
	{
		id: 1,
		slug: "gasto",
		title: translate("project.gasto.title"),
		titleKey: "project.gasto.title",
		metaTitleKey: "meta.gasto.title",
		windowTitle: "Gasto.exe",
		summary: translate("project.gasto.summary"),
		summaryKey: "project.gasto.summary",
		dialogLabelKey: "project.gasto.dialogLabel",
		category: "Móvil",
		cover: gastoCover,
		gallery: gastoGallery,
		technologies: [
			{ name: "Expo", icon: "/stack_icons/expo.svg" },
			{ name: "React Native", icon: "/stack_icons/react.svg" },
			{ name: "Supabase", icon: "/stack_icons/supabase.svg" },
			{ name: "Expo SQLite", icon: "/stack_icons/sql.svg" },
			{ name: "TypeScript", icon: "/stack_icons/typescript.svg" },
			{ name: "EAS Build", icon: "/stack_icons/expo.svg" },
		],
		description: [
			translate("project.gasto.description.1"),
			translate("project.gasto.description.2"),
		],
		descriptionKeys: [
			"project.gasto.description.1",
			"project.gasto.description.2",
		],
		features: [
			translate("project.gasto.feature.1"),
			translate("project.gasto.feature.2"),
			translate("project.gasto.feature.3"),
			translate("project.gasto.feature.4"),
			translate("project.gasto.feature.5"),
			translate("project.gasto.feature.6"),
			translate("project.gasto.feature.7"),
		],
		featureKeys: [
			"project.gasto.feature.1",
			"project.gasto.feature.2",
			"project.gasto.feature.3",
			"project.gasto.feature.4",
			"project.gasto.feature.5",
			"project.gasto.feature.6",
			"project.gasto.feature.7",
		],
		links: {
			repository: "https://github.com/Damianx64/Gasto",
		},
	},
];

export const getProjectHref = (project: Pick<Project, "slug">) =>
	`/proyectos/${project.slug}`;

export const getProjectCategoryKey = (
	category: ProjectCategory,
): TranslationKey =>
	category === "Móvil" ? "projects.filter.mobile" : "projects.filter.web";
