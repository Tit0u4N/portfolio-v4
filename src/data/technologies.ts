export type TechnologyData = {
	name: string;
	imageUrl: string;
	imageOnly?: boolean;
	specialCssClass?: string;
};

export const ALL_TECH = {
	JAVASCRIPT: {
		name: 'JavaScript',
		imageUrl: '/images/technologies/javascript.svg',
	},
	TYPESCRIPT: {
		name: 'TypeScript',
		imageUrl: '/images/technologies/typescript.svg',
	},
	REACT_TECH: { name: 'React', imageUrl: '/images/technologies/react.svg' },
	NEXTJS: {
		name: 'Next.js',
		imageUrl: '/images/technologies/nextjs.svg',
		specialCssClass: 'bg-white rounded-full',
	},
	TAILWINDCSS: {
		name: 'Tailwind CSS',
		imageUrl: '/images/technologies/tailwindcss.svg',
	},
	NODEJS: { name: 'Node.js', imageUrl: '/images/technologies/nodejs.svg' },
	SCSS: { name: 'SCSS', imageUrl: '/images/technologies/sass.svg' },
	PHP: { name: 'PHP', imageUrl: '/images/technologies/php.svg' },
	SQL: { name: 'SQL', imageUrl: '/images/technologies/sql.svg' },
	ANGULAR: { name: 'Angular', imageUrl: '/images/technologies/angular.svg' },
	JAVA: { name: 'Java', imageUrl: '/images/technologies/java.svg' },
	MONGO: { name: 'MongoDB', imageUrl: '/images/technologies/mongo.svg' },
	SPRINGBOOT: {
		name: 'Spring Boot',
		imageUrl: '/images/technologies/springboot.svg',
	},
	GIT: { name: 'Git', imageUrl: '/images/technologies/git.svg' },
	ACTIVE_DIRECTORY: {
		name: 'Active Directory',
		imageUrl: '/images/technologies/active_directory.svg',
	},
	BUN: { name: 'bun', imageUrl: '/images/technologies/bun.svg' },
	BABYLONJS: {
		name: 'BabylonJs',
		imageUrl: '/images/technologies/babylonjs.svg',
	},
	HTML: { name: 'HTML', imageUrl: '/images/technologies/html.svg' },
	CSS: { name: 'CSS', imageUrl: '/images/technologies/css.svg' },
	EXPRESS: {
		name: 'Express',
		imageUrl: '/images/technologies/express.svg',
		specialCssClass: 'bg-white rounded-full',
	},
	DOCKER: { name: 'Docker', imageUrl: '/images/technologies/docker.svg' },
	JEST: { name: 'Jest', imageUrl: '/images/technologies/jest.svg' },
	VUEJS: { name: 'Vue.js', imageUrl: '/images/technologies/vuejs.svg' },
	PGSQL: { name: 'PostgreSQL', imageUrl: '/images/technologies/pgsql.svg' },
} as const satisfies Record<string, TechnologyData>;

export type AllTechnologies = keyof typeof ALL_TECH;
export const TECH_KEYS = Object.keys(ALL_TECH) as [
	AllTechnologies,
	...AllTechnologies[],
];

/** Skills section, in display order */
export const SKILLS: AllTechnologies[] = [
	'JAVASCRIPT',
	'TYPESCRIPT',
	'REACT_TECH',
	'NEXTJS',
	'SCSS',
	'TAILWINDCSS',
	'NODEJS',
	'BUN',
	'SQL',
	'DOCKER',
	'GIT',
	'JEST',
	'SPRINGBOOT',
	'ANGULAR',
	'MONGO',
	'PHP',
	'JAVA',
	'VUEJS',
	'PGSQL',
];
