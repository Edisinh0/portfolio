import { capturasDe } from "./capturas";
import { translate, type TranslationKey } from "../i18n/translations";

export type ProjectCategory =
	| "Sistemas"
	| "Integraciones"
	| "Web"
	| "Infraestructura";

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
	/**
	 * Por qué no hay demo pública. Casi todos estos sistemas son internos o
	 * viven en la red de un cliente: se explica el acceso en vez de dejar un
	 * enlace roto.
	 */
	accessKey?: TranslationKey;
}

const icon = (name: string) => `/stack_icons/${name}.svg`;


const capturasTnaOffice = capturasDe("tna-office", "tnaOffice");
const capturasQueueAlerts = capturasDe("queue-alerts", "queueAlerts");
const capturasTaskflow = capturasDe("taskflow", "taskflow");
const capturasScreenpop = capturasDe("screenpop", "screenpop");
const capturasWiplus = capturasDe("wiplus", "wiplus");
const capturasCongelados = capturasDe("congelados-naty", "congelados");
const capturasTnagroup = capturasDe("tnagroup", "tnagroup");
const capturasWhm = capturasDe("whm-provision", "whm");

export const projects: Project[] = [
	{
		id: 1,
		slug: "tna-office",
		title: translate("project.tnaOffice.title"),
		titleKey: "project.tnaOffice.title",
		metaTitleKey: "meta.tnaOffice.title",
		windowTitle: "TnaOffice.exe",
		summary: translate("project.tnaOffice.summary"),
		summaryKey: "project.tnaOffice.summary",
		dialogLabelKey: "project.tnaOffice.dialogLabel",
		category: "Sistemas",
		cover: capturasTnaOffice.cover,
		gallery: capturasTnaOffice.gallery,
		technologies: [
			{ name: "FastAPI", icon: icon("fastapi") },
			{ name: "Python", icon: icon("python") },
			{ name: "SQLAlchemy", icon: icon("sqlalchemy") },
			{ name: "MariaDB", icon: icon("mariadb") },
			{ name: "React", icon: icon("react") },
			{ name: "cPanel", icon: icon("cpanel") },
		],
		description: [
			translate("project.tnaOffice.description.1"),
			translate("project.tnaOffice.description.2"),
			translate("project.tnaOffice.description.3"),
		],
		descriptionKeys: [
			"project.tnaOffice.description.1",
			"project.tnaOffice.description.2",
			"project.tnaOffice.description.3",
		],
		features: [
			translate("project.tnaOffice.feature.1"),
			translate("project.tnaOffice.feature.2"),
			translate("project.tnaOffice.feature.3"),
			translate("project.tnaOffice.feature.4"),
			translate("project.tnaOffice.feature.5"),
			translate("project.tnaOffice.feature.6"),
			translate("project.tnaOffice.feature.7"),
		],
		featureKeys: [
			"project.tnaOffice.feature.1",
			"project.tnaOffice.feature.2",
			"project.tnaOffice.feature.3",
			"project.tnaOffice.feature.4",
			"project.tnaOffice.feature.5",
			"project.tnaOffice.feature.6",
			"project.tnaOffice.feature.7",
		],
		accessKey: "project.tnaOffice.access",
	},
	{
		id: 2,
		slug: "queue-alerts",
		title: translate("project.queueAlerts.title"),
		titleKey: "project.queueAlerts.title",
		metaTitleKey: "meta.queueAlerts.title",
		windowTitle: "QueueAlerts.exe",
		summary: translate("project.queueAlerts.summary"),
		summaryKey: "project.queueAlerts.summary",
		dialogLabelKey: "project.queueAlerts.dialogLabel",
		category: "Sistemas",
		cover: capturasQueueAlerts.cover,
		gallery: capturasQueueAlerts.gallery,
		technologies: [
			{ name: "Node.js", icon: icon("node") },
			{ name: "TypeScript", icon: icon("typescript") },
			{ name: "React", icon: icon("react") },
			{ name: "SQLite", icon: icon("sqlite") },
			{ name: "Docker", icon: icon("docker") },
			{ name: "Vitest", icon: icon("vitest") },
		],
		description: [
			translate("project.queueAlerts.description.1"),
			translate("project.queueAlerts.description.2"),
			translate("project.queueAlerts.description.3"),
		],
		descriptionKeys: [
			"project.queueAlerts.description.1",
			"project.queueAlerts.description.2",
			"project.queueAlerts.description.3",
		],
		features: [
			translate("project.queueAlerts.feature.1"),
			translate("project.queueAlerts.feature.2"),
			translate("project.queueAlerts.feature.3"),
			translate("project.queueAlerts.feature.4"),
			translate("project.queueAlerts.feature.5"),
			translate("project.queueAlerts.feature.6"),
			translate("project.queueAlerts.feature.7"),
		],
		featureKeys: [
			"project.queueAlerts.feature.1",
			"project.queueAlerts.feature.2",
			"project.queueAlerts.feature.3",
			"project.queueAlerts.feature.4",
			"project.queueAlerts.feature.5",
			"project.queueAlerts.feature.6",
			"project.queueAlerts.feature.7",
		],
		accessKey: "project.queueAlerts.access",
	},
	{
		id: 3,
		slug: "taskflow",
		title: translate("project.taskflow.title"),
		titleKey: "project.taskflow.title",
		metaTitleKey: "meta.taskflow.title",
		windowTitle: "Taskflow.exe",
		summary: translate("project.taskflow.summary"),
		summaryKey: "project.taskflow.summary",
		dialogLabelKey: "project.taskflow.dialogLabel",
		category: "Sistemas",
		cover: capturasTaskflow.cover,
		gallery: capturasTaskflow.gallery,
		technologies: [
			{ name: "Laravel", icon: icon("laravel") },
			{ name: "PHP", icon: icon("php") },
			{ name: "Vue", icon: icon("vue") },
			{ name: "Redis", icon: icon("redis") },
			{ name: "Docker", icon: icon("docker") },
			{ name: "Nginx", icon: icon("nginx") },
		],
		description: [
			translate("project.taskflow.description.1"),
			translate("project.taskflow.description.2"),
		],
		descriptionKeys: [
			"project.taskflow.description.1",
			"project.taskflow.description.2",
		],
		features: [
			translate("project.taskflow.feature.1"),
			translate("project.taskflow.feature.2"),
			translate("project.taskflow.feature.3"),
			translate("project.taskflow.feature.4"),
			translate("project.taskflow.feature.5"),
			translate("project.taskflow.feature.6"),
			translate("project.taskflow.feature.7"),
		],
		featureKeys: [
			"project.taskflow.feature.1",
			"project.taskflow.feature.2",
			"project.taskflow.feature.3",
			"project.taskflow.feature.4",
			"project.taskflow.feature.5",
			"project.taskflow.feature.6",
			"project.taskflow.feature.7",
		],
		accessKey: "project.taskflow.access",
	},
	{
		id: 4,
		slug: "screenpop",
		title: translate("project.screenpop.title"),
		titleKey: "project.screenpop.title",
		metaTitleKey: "meta.screenpop.title",
		windowTitle: "ScreenPop.exe",
		summary: translate("project.screenpop.summary"),
		summaryKey: "project.screenpop.summary",
		dialogLabelKey: "project.screenpop.dialogLabel",
		category: "Integraciones",
		cover: capturasScreenpop.cover,
		gallery: capturasScreenpop.gallery,
		technologies: [
			{ name: "PHP", icon: icon("php") },
			{ name: "MySQL", icon: icon("mysql") },
			{ name: "Linux", icon: icon("linux") },
			{ name: "WhatsApp API", icon: icon("whatsapp") },
		],
		description: [
			translate("project.screenpop.description.1"),
			translate("project.screenpop.description.2"),
			translate("project.screenpop.description.3"),
		],
		descriptionKeys: [
			"project.screenpop.description.1",
			"project.screenpop.description.2",
			"project.screenpop.description.3",
		],
		features: [
			translate("project.screenpop.feature.1"),
			translate("project.screenpop.feature.2"),
			translate("project.screenpop.feature.3"),
			translate("project.screenpop.feature.4"),
			translate("project.screenpop.feature.5"),
			translate("project.screenpop.feature.6"),
			translate("project.screenpop.feature.7"),
		],
		featureKeys: [
			"project.screenpop.feature.1",
			"project.screenpop.feature.2",
			"project.screenpop.feature.3",
			"project.screenpop.feature.4",
			"project.screenpop.feature.5",
			"project.screenpop.feature.6",
			"project.screenpop.feature.7",
		],
		accessKey: "project.screenpop.access",
	},
	{
		id: 5,
		slug: "wiplus",
		title: translate("project.wiplus.title"),
		titleKey: "project.wiplus.title",
		metaTitleKey: "meta.wiplus.title",
		windowTitle: "Wiplus.exe",
		summary: translate("project.wiplus.summary"),
		summaryKey: "project.wiplus.summary",
		dialogLabelKey: "project.wiplus.dialogLabel",
		category: "Web",
		cover: capturasWiplus.cover,
		gallery: capturasWiplus.gallery,
		technologies: [
			{ name: "Next.js", icon: icon("nextjs") },
			{ name: "React", icon: icon("react") },
			{ name: "TypeScript", icon: icon("typescript") },
			{ name: "Tailwind", icon: icon("tailwind") },
			{ name: "shadcn/ui", icon: icon("shadcn") },
			{ name: "PHP", icon: icon("php") },
		],
		description: [
			translate("project.wiplus.description.1"),
			translate("project.wiplus.description.2"),
			translate("project.wiplus.description.3"),
		],
		descriptionKeys: [
			"project.wiplus.description.1",
			"project.wiplus.description.2",
			"project.wiplus.description.3",
		],
		features: [
			translate("project.wiplus.feature.1"),
			translate("project.wiplus.feature.2"),
			translate("project.wiplus.feature.3"),
			translate("project.wiplus.feature.4"),
			translate("project.wiplus.feature.5"),
			translate("project.wiplus.feature.6"),
		],
		featureKeys: [
			"project.wiplus.feature.1",
			"project.wiplus.feature.2",
			"project.wiplus.feature.3",
			"project.wiplus.feature.4",
			"project.wiplus.feature.5",
			"project.wiplus.feature.6",
		],
		links: { demo: "https://wiplus.cl" },
		accessKey: "project.wiplus.access",
	},
	{
		id: 6,
		slug: "congelados-naty",
		title: translate("project.congelados.title"),
		titleKey: "project.congelados.title",
		metaTitleKey: "meta.congelados.title",
		windowTitle: "Congelados.exe",
		summary: translate("project.congelados.summary"),
		summaryKey: "project.congelados.summary",
		dialogLabelKey: "project.congelados.dialogLabel",
		category: "Sistemas",
		cover: capturasCongelados.cover,
		gallery: capturasCongelados.gallery,
		technologies: [
			{ name: "FastAPI", icon: icon("fastapi") },
			{ name: "Python", icon: icon("python") },
			{ name: "MariaDB", icon: icon("mariadb") },
			{ name: "JavaScript", icon: icon("javascript") },
			{ name: "cPanel", icon: icon("cpanel") },
		],
		description: [
			translate("project.congelados.description.1"),
			translate("project.congelados.description.2"),
		],
		descriptionKeys: [
			"project.congelados.description.1",
			"project.congelados.description.2",
		],
		features: [
			translate("project.congelados.feature.1"),
			translate("project.congelados.feature.2"),
			translate("project.congelados.feature.3"),
			translate("project.congelados.feature.4"),
			translate("project.congelados.feature.5"),
			translate("project.congelados.feature.6"),
		],
		featureKeys: [
			"project.congelados.feature.1",
			"project.congelados.feature.2",
			"project.congelados.feature.3",
			"project.congelados.feature.4",
			"project.congelados.feature.5",
			"project.congelados.feature.6",
		],
		links: { demo: "https://congeladosdelanaty.cl" },
		accessKey: "project.congelados.access",
	},
	{
		id: 7,
		slug: "tnagroup",
		title: translate("project.tnagroup.title"),
		titleKey: "project.tnagroup.title",
		metaTitleKey: "meta.tnagroup.title",
		windowTitle: "TnaGroup.exe",
		summary: translate("project.tnagroup.summary"),
		summaryKey: "project.tnagroup.summary",
		dialogLabelKey: "project.tnagroup.dialogLabel",
		category: "Web",
		cover: capturasTnagroup.cover,
		gallery: capturasTnagroup.gallery,
		technologies: [
			{ name: "React", icon: icon("react") },
			{ name: "Vite", icon: icon("vite") },
			{ name: "Tailwind", icon: icon("tailwind") },
			{ name: "JavaScript", icon: icon("javascript") },
		],
		description: [
			translate("project.tnagroup.description.1"),
			translate("project.tnagroup.description.2"),
		],
		descriptionKeys: [
			"project.tnagroup.description.1",
			"project.tnagroup.description.2",
		],
		features: [
			translate("project.tnagroup.feature.1"),
			translate("project.tnagroup.feature.2"),
			translate("project.tnagroup.feature.3"),
			translate("project.tnagroup.feature.4"),
		],
		featureKeys: [
			"project.tnagroup.feature.1",
			"project.tnagroup.feature.2",
			"project.tnagroup.feature.3",
			"project.tnagroup.feature.4",
		],
		accessKey: "project.tnagroup.access",
	},
	{
		id: 8,
		slug: "whm-provision",
		title: translate("project.whm.title"),
		titleKey: "project.whm.title",
		metaTitleKey: "meta.whm.title",
		windowTitle: "Provision.sh",
		summary: translate("project.whm.summary"),
		summaryKey: "project.whm.summary",
		dialogLabelKey: "project.whm.dialogLabel",
		category: "Infraestructura",
		cover: capturasWhm.cover,
		gallery: capturasWhm.gallery,
		technologies: [
			{ name: "Bash", icon: icon("bash") },
			{ name: "Linux", icon: icon("linux") },
			{ name: "cPanel", icon: icon("cpanel") },
		],
		description: [
			translate("project.whm.description.1"),
			translate("project.whm.description.2"),
		],
		descriptionKeys: [
			"project.whm.description.1",
			"project.whm.description.2",
		],
		features: [
			translate("project.whm.feature.1"),
			translate("project.whm.feature.2"),
			translate("project.whm.feature.3"),
			translate("project.whm.feature.4"),
			translate("project.whm.feature.5"),
		],
		featureKeys: [
			"project.whm.feature.1",
			"project.whm.feature.2",
			"project.whm.feature.3",
			"project.whm.feature.4",
			"project.whm.feature.5",
		],
		accessKey: "project.whm.access",
	},
];

export const getProjectHref = (project: Pick<Project, "slug">) =>
	`/proyectos/${project.slug}`;

const categoryKeys: Record<ProjectCategory, TranslationKey> = {
	Sistemas: "projects.filter.systems",
	Integraciones: "projects.filter.integrations",
	Web: "projects.filter.web",
	Infraestructura: "projects.filter.infra",
};

export const getProjectCategoryKey = (
	category: ProjectCategory,
): TranslationKey => categoryKeys[category];
