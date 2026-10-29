export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export const PROFILE = {
	name: 'Titouan Lacombe--Fabre',
	mail: 'mail@mail',
	github: 'Tit0u4n',
	githubLink: 'https://github.com/Tit0u4N',
	linkdin: 'Titouan Lacombe--Fabre',
	linkdinLink: 'https://www.linkedin.com/in/titouan-lacombe--fabre/',
} as const;

const fr = {
	meta: {
		title: 'Bienvenue sur mon portfolio 👋',
		description:
			"Alternant en développement fullstack, je suis passionné par le développement web et l'architecture de solution informatique.",
		jobTitle: 'Développeur Fullstack',
	},
	hero: {
		title: 'Bienvenue sur mon portfolio 👋',
		callOut:
			"Ingénieur fullstack, à l'interface entre technique et fonctionnel. Je conçois des applications web modernes, de la faisabilité à la mise en production.",
		about: 'À propos',
		description:
			"Diplômé du Master MIAGE (parcours MBDS) de l'Université Côte d'Azur, je suis développeur full stack en CDI chez Randstad Digital, en mission chez Amadeus après deux ans d'alternance dans la même équipe. À l'aise avec Angular, Spring, React, Node et les architectures microservices ou serverless, j'interviens aussi en amont des projets : faisabilité, architecture, estimation de charge et priorisation avec le Product Management.",
	},
	experiences: { title: 'Expériences' },
	education: { title: 'Formations' },
	skills: { title: 'Compétences' },
	projects: {
		title: 'Mes Projets',
		links: 'Liens',
		linkGit: 'Dépôt Git',
		linkDemo: 'Démo',
		technologies: 'Technologies',
		close: 'Fermer',
	},
	other: { title: 'CV & Contact', cvFr: 'CV Français', cvEn: 'CV Anglais' },
	nav: {
		switchTo: 'English',
		current: 'Français',
		light: 'Light',
		dark: 'Dark',
	},
	notFound: { title: 'Page introuvable', back: "Retour à l'accueil" },
};

type Dict = typeof fr;

const en: Dict = {
	meta: {
		title: 'Welcome to my portfolio 👋',
		description:
			'Full-stack development apprentice, I am passionate about web development and IT solution architecture.',
		jobTitle: 'Fullstack Developer',
	},
	hero: {
		title: 'Welcome to my portfolio 👋',
		callOut:
			'Fullstack engineer working at the interface between technical and functional. I design modern web applications, from feasibility to production.',
		about: 'About',
		description:
			"I hold a Master's degree in MIAGE (MBDS track) from Université Côte d'Azur and work as a full stack developer on a permanent contract with Randstad Digital, assigned to Amadeus after a two-year apprenticeship in the same team. Comfortable with Angular, Spring, React, Node and microservice or serverless architectures, I also work upstream on projects: feasibility, architecture, effort estimation and prioritization with Product Management.",
	},
	experiences: { title: 'Experiences' },
	education: { title: 'Education' },
	skills: { title: 'Skills' },
	projects: {
		title: 'My Projects',
		links: 'Links',
		linkGit: 'Git Repository',
		linkDemo: 'Demo',
		technologies: 'Technologies',
		close: 'Close',
	},
	other: {
		title: 'Resume & Contact',
		cvFr: 'French Resume',
		cvEn: 'English Resume',
	},
	nav: {
		switchTo: 'Français',
		current: 'English',
		light: 'Light',
		dark: 'Dark',
	},
	notFound: { title: 'Page not found', back: 'Back to home' },
};

const dictionaries: Record<Locale, Dict> = { fr, en };

export const useTranslations = (locale: Locale) => dictionaries[locale];

export const localePath = (locale: Locale) =>
	locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
export const otherLocale = (locale: Locale): Locale =>
	locale === 'fr' ? 'en' : 'fr';
