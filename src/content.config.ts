import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TECH_KEYS } from '@/data/technologies';

const experiences = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/experiences' }),
	schema: ({ image }) =>
		z.object({
			order: z.number(),
			company: z.string(),
			jobTitle: z.string(),
			startDate: z.string(),
			endDate: z.string(),
			image: image(),
		}),
});

const education = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
	schema: ({ image }) =>
		z.object({
			order: z.number(),
			school: z.string(),
			degree: z.string(),
			startDate: z.string(),
			endDate: z.string(),
			image: image(),
		}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			order: z.number(),
			title: z.string(),
			shortDescription: z.string(),
			image: image(),
			techs: z.array(z.enum(TECH_KEYS)),
			linkGithub: z.url().optional(),
			linkDemo: z.url().optional(),
		}),
});

export const collections = { experiences, education, projects };
