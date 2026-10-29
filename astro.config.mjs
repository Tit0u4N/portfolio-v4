// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Final production domain (used for canonical, hreflang, sitemap, OG)
const SITE = process.env.SITE_URL || 'https://titouanlf.com';

export default defineConfig({
	site: SITE,
	output: 'static',
	trailingSlash: 'always',
	build: { format: 'directory', inlineStylesheets: 'auto' },
	i18n: {
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
		routing: { prefixDefaultLocale: false },
	},
	integrations: [
		react(),
		sitemap({
			i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } },
			filter: (page) => !page.includes('/404'),
		}),
	],
	vite: { plugins: [tailwindcss()] },
});
