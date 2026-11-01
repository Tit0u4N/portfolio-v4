export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export const PROFILE = {
	name: 'Titouan Lacombe--Fabre',
	// No public address yet: mail links are hidden while this is null
	mail: null as string | null,
	github: 'Tit0u4n',
	githubLink: 'https://github.com/Tit0u4N',
	linkdin: 'Titouan Lacombe--Fabre',
	linkdinLink: 'https://www.linkedin.com/in/titouan-lacombe--fabre/',
} as const;

const fr = {
	meta: {
		title: 'Titouan Lacombe--Fabre, ingénieur fullstack',
		description:
			"Ingénieur fullstack, à l'interface entre technique et fonctionnel. Je conçois des applications web modernes, de la faisabilité à la mise en production.",
		jobTitle: 'Développeur Fullstack',
	},
	hero: {
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
	other: { title: 'Contact', cvFr: 'CV Français', cvEn: 'CV Anglais' },
	nav: {
		home: 'Accueil',
		switchTo: 'English',
		current: 'Français',
		light: 'Light',
		dark: 'Dark',
	},
	notFound: { title: 'Page introuvable', back: "Retour à l'accueil" },
	legal: {
		title: 'Mentions légales',
		description: 'Mentions légales et confidentialité du site titouanlf.com.',
		contact: 'Contact :',
		back: "Retour à l'accueil",
		sections: [
			{
				title: 'Éditeur du site',
				body: [
					`Ce site est édité à titre personnel et non professionnel par ${PROFILE.name}, également directeur de la publication.`,
					"Conformément à la loi pour la confiance dans l'économie numérique (LCEN), ses coordonnées personnelles ne sont pas publiées et ont été communiquées à l'hébergeur.",
				],
				showContact: true,
			},
			{
				title: 'Hébergement',
				body: [
					'Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis. Téléphone : +1 888 993 5273.',
				],
			},
			{
				title: 'Propriété intellectuelle',
				body: [
					"Sauf mention contraire, les textes et visuels de ce site appartiennent à l'éditeur et ne peuvent pas être réutilisés sans son accord. Les logos et marques cités restent la propriété de leurs titulaires respectifs.",
				],
			},
			{
				title: 'Données personnelles et cookies',
				body: [
					"Ce site ne dépose aucun cookie, n'utilise aucun outil de mesure d'audience et ne comporte aucun formulaire. Votre choix de thème clair ou sombre est conservé uniquement dans votre navigateur.",
					"Pour assurer le fonctionnement et la sécurité du site, l'hébergeur traite des données techniques de connexion, comme l'adresse IP, et peut les traiter hors de l'Union européenne.",
					'Vous pouvez exercer vos droits sur vos données via le contact indiqué ci-dessus et introduire une réclamation auprès de la CNIL (cnil.fr).',
				],
			},
		],
	},
};

type Dict = typeof fr;

const en: Dict = {
	meta: {
		title: 'Titouan Lacombe--Fabre, fullstack engineer',
		description:
			'Fullstack engineer working at the interface between technical and functional. I design modern web applications, from feasibility to production.',
		jobTitle: 'Fullstack Developer',
	},
	hero: {
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
		title: 'Contact',
		cvFr: 'French Resume',
		cvEn: 'English Resume',
	},
	nav: {
		home: 'Home',
		switchTo: 'Français',
		current: 'English',
		light: 'Light',
		dark: 'Dark',
	},
	notFound: { title: 'Page not found', back: 'Back to home' },
	legal: {
		title: 'Legal notice',
		description: 'Legal notice and privacy information for titouanlf.com.',
		contact: 'Contact:',
		back: 'Back to home',
		sections: [
			{
				title: 'Site publisher',
				body: [
					`This site is published in a personal, non-professional capacity by ${PROFILE.name}, who is also the publication director.`,
					"In accordance with the French law on confidence in the digital economy (LCEN), the publisher's personal contact details are not published and have been provided to the hosting provider.",
				],
				showContact: true,
			},
			{
				title: 'Hosting',
				body: [
					'Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, United States. Phone: +1 888 993 5273.',
				],
			},
			{
				title: 'Intellectual property',
				body: [
					'Unless stated otherwise, the text and visuals on this site belong to the publisher and may not be reused without permission. Logos and trademarks mentioned remain the property of their respective owners.',
				],
			},
			{
				title: 'Personal data and cookies',
				body: [
					'This site sets no cookies, uses no audience measurement tools and has no forms. Your light or dark theme choice is stored only in your browser.',
					'To keep the site running and secure, the hosting provider processes technical connection data, such as IP addresses, and may process it outside the European Union.',
					'You can exercise your data rights through the contact given above and lodge a complaint with the CNIL, the French data protection authority (cnil.fr).',
				],
			},
		],
	},
};

const dictionaries: Record<Locale, Dict> = { fr, en };

export const useTranslations = (locale: Locale) => dictionaries[locale];

export const localePath = (locale: Locale) =>
	locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
export const legalPath = (locale: Locale) =>
	locale === DEFAULT_LOCALE ? '/mentions-legales/' : '/en/legal-notice/';
export const otherLocale = (locale: Locale): Locale =>
	locale === 'fr' ? 'en' : 'fr';
