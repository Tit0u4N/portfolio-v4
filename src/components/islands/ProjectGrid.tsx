import { useCallback, useEffect, useState, type RefObject } from 'react';
import { delay as doDelay } from 'motion/react';
import { cn, hasParentWithAttribute } from '@lib/utils';
import type { TechnologyData } from '@/data/technologies';
import ProjectItem from './ProjectGridItem';

export type ProjectData = {
	title: string;
	shortDescription: string;
	image: string;
	techs: TechnologyData[];
	linkGithub?: string;
	linkDemo?: string;
	/** Markdown pre-rendered to HTML at build time */
	html: string;
};

export type ProjectLabels = {
	links: string;
	linkGit: string;
	linkDemo: string;
	technologies: string;
	close: string;
};

export type ProjectOpen = {
	id: number;
	ref: RefObject<HTMLDivElement | null>;
};

export default function ProjectGrid({
	className,
	projects,
	labels,
	delay = 0,
}: {
	className?: string;
	projects: ProjectData[];
	labels: ProjectLabels;
	delay?: number;
}) {
	const [projectOpen, setProjectOpen] = useState<ProjectOpen | null>(null);
	// z-index class per item: raised while open, kept above siblings during close animation
	const [zClasses, setZClasses] = useState<Record<number, string>>({});

	const handleProjectOpen = useCallback(
		(projectToOpen: ProjectOpen | null) => {
			if (projectOpen) {
				const closingId = projectOpen.id;
				setZClasses((z) => ({ ...z, [closingId]: 'z-10' }));
				doDelay(() => setZClasses((z) => ({ ...z, [closingId]: '' })), 600);
			}
			if (projectToOpen) {
				setZClasses((z) => ({ ...z, [projectToOpen.id]: 'z-50' }));
			}
			setProjectOpen(projectToOpen);
		},
		[projectOpen],
	);

	// Outside click closes the open project (clicks on another project are handled by that item)
	useEffect(() => {
		if (!projectOpen) return;
		const listener = (event: Event) => {
			const target = event.target as HTMLElement | null;
			const el = projectOpen.ref.current;
			if (!el || !target || el.contains(target)) return;
			if (hasParentWithAttribute(target, 'data-project-id')) return;
			handleProjectOpen(null);
		};
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') handleProjectOpen(null);
		};
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
			document.removeEventListener('keydown', onKey);
		};
	}, [projectOpen, handleProjectOpen]);

	return (
		<div
			className={cn(
				'grid md:auto-rows-[18rem] grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 max-w-7xl mx-auto ',
				className,
			)}
		>
			{projects.map((project, index) => (
				<ProjectItem
					key={index}
					index={index}
					delay={delay + index * 0.1}
					project={project}
					labels={labels}
					zClass={zClasses[index] ?? ''}
					handleProjectOpen={handleProjectOpen}
					idOpen={projectOpen ? projectOpen.id : null}
				/>
			))}
		</div>
	);
}
