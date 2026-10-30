import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { IconBrandGithub, IconPlanet } from '@tabler/icons-react';
import { cn } from '@lib/utils';
import { blurFadeStyle } from '@lib/blurFade';
import Technology from '@/components/ui/Technology';
import {
	ProjectContent,
	ProjectContentAnimatePresence,
} from './ProjectGridUtils';
import type { ProjectData, ProjectLabels, ProjectOpen } from './ProjectGrid';

type ProjectItemProps = {
	index: number;
	delay: number;
	project: ProjectData;
	labels: ProjectLabels;
	zClass: string;
	handleProjectOpen: (projectToOpen: ProjectOpen | null) => void;
	idOpen: number | null;
};

export default function ProjectItem({
	index,
	delay,
	project,
	labels,
	zClass,
	handleProjectOpen,
	idOpen,
}: ProjectItemProps) {
	const isOpen = index === idOpen;
	const ref = useRef<HTMLDivElement>(null);
	const articleRef = useRef<HTMLElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const titleRef = useRef<HTMLButtonElement>(null);
	const wasOpen = useRef(false);
	// Open geometry, measured from the untransformed <article> when opening
	const [geo, setGeo] = useState({
		width: '100%',
		height: '38rem',
		x: 0,
		y: 0,
	});
	let imageHeight = 190;

	const openModal = () => {
		if (isOpen) return;
		const article = articleRef.current;
		if (article) {
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;
			const openWidth = screenWidth > 740 ? 800 : screenWidth * 0.98;
			const openHeight = Math.min(608, screenHeight * 0.9);
			const rect = article.getBoundingClientRect();
			setGeo({
				width: `${openWidth}px`,
				height: `${openHeight}px`,
				x: screenWidth / 2 - openWidth / 2 - rect.left,
				y: screenHeight / 2 - openHeight / 2 - rect.top,
			});
		}
		handleProjectOpen({ id: index, ref });
	};

	const closeModal = () => {
		if (isOpen) handleProjectOpen(null);
	};

	// Move focus into the modal on open, give it back to the card title on close
	useEffect(() => {
		if (isOpen) closeRef.current?.focus({ preventScroll: true });
		else if (wasOpen.current) titleRef.current?.focus({ preventScroll: true });
		wasOpen.current = isOpen;
	}, [isOpen]);

	if (ref.current) {
		const screenWidth = window.innerWidth;
		const imageHeightTempOpen = screenWidth > 740 ? 370 : 230;
		const imageHeightTempClose = screenWidth > 740 ? 190 : 110;
		imageHeight = isOpen ? imageHeightTempOpen : imageHeightTempClose;
	}

	return (
		<article
			ref={articleRef}
			style={blurFadeStyle({ yOffset: -40, delay })}
			className={cn(
				'animate-blur-fade relative row-span-1 rounded-xl group/bento hover:shadow-standard-xl shadow-standard dark:shadow-none dark:border-white/[0.2] bg-card border border-transparent max-h-[210px] sm:max-h-[290px]',
				index === 3 || index === 6 ? 'md:col-span-2' : '',
				zClass,
			)}
		>
			<motion.div
				ref={ref}
				data-project-id={index}
				role={isOpen ? 'dialog' : undefined}
				aria-modal={isOpen || undefined}
				aria-label={isOpen ? project.title : undefined}
				className={cn(
					'rounded-xl bg-card',
					isOpen ? 'shadow-standard-demune' : '',
				)}
				animate={{
					x: isOpen ? geo.x : 0,
					y: isOpen ? geo.y : 0,
					width: isOpen ? geo.width : '100%',
					height: isOpen ? geo.height : '100%',
				}}
				transition={{ type: 'spring', duration: 0.6 }}
			>
				<div
					className={cn(
						'size-full',
						isOpen ? 'p-2 sm:p-6 sm:pe-2' : 'sm:p-4 p-2 ',
					)}
				>
					<div
						className={cn(
							'flex flex-col justify-between size-full',
							isOpen
								? 'overflow-y-auto overflow-x-hidden sm:pe-2'
								: 'overflow-hidden',
						)}
					>
						<ProjectContentAnimatePresence
							appearsWhen={isOpen}
							className={'h-0 w-full flex justify-end pe-2 sm:mt-0 mt-2'}
						>
							<button
								ref={closeRef}
								onClick={closeModal}
								aria-label={labels.close}
								className={
									'fixed rounded-full translate-x-3 -translate-y-3 hover:bg-slate-50 hover:rotate-90 transition duration-300 size-9 p-0.5'
								}
							>
								<svg
									className="h-8 w-8 text-slate-400"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path stroke="none" d="M0 0h24v24H0z" />
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
						</ProjectContentAnimatePresence>
						<div
							className={cn(
								'flex gap-4 size-full',
								isOpen ? 'flex-col sm:flex-row ' : '',
							)}
						>
							<div className={cn('flex flex-col gap-2 sm:gap-4 size-full ')}>
								<motion.div
									animate={{ height: imageHeight }}
									className={cn(isOpen ? '' : 'max-sm:max-h-[110px]')}
								>
									<img
										src={project.image}
										width={500}
										height={370}
										loading="lazy"
										decoding="async"
										className={
											'flex flex-1 size-full rounded-xl object-cover shadow-standard'
										}
										onClick={openModal}
										alt={project.title}
									/>
								</motion.div>
								<div className="group-hover/bento:translate-x-2 transition duration-200">
									<div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 ">
										<h3
											className={cn(
												'cursor-pointer',
												isOpen ? 'text-xl' : 'mb-2',
											)}
										>
											<button
												ref={titleRef}
												type="button"
												onClick={openModal}
												aria-expanded={isOpen}
												className="text-left"
											>
												{project.title}
											</button>
										</h3>
									</div>
									<ProjectContentAnimatePresence appearsWhen={!isOpen}>
										<p className="font-sans font-normal text-xs text-paragraph line-clamp-2">
											{project.shortDescription}
										</p>
									</ProjectContentAnimatePresence>
								</div>
							</div>
							<ProjectContentAnimatePresence
								appearsWhen={isOpen}
								className={'flex sm:flex-col sm:w-1/3 sm:gap-4'}
							>
								{(project.linkGithub || project.linkDemo) && (
									<div className={'flex flex-col w-1/3 sm:w-full gap-2'}>
										<h4 className={'text-xl mb-2'}>{labels.links} :</h4>
										{project.linkGithub && (
											<a
												className={'ps-4 underline cursor-pointer'}
												target={'_blank'}
												rel="noopener noreferrer"
												href={project.linkGithub}
											>
												<IconBrandGithub className={'inline'} />
												{labels.linkGit}
											</a>
										)}
										{project.linkDemo && (
											<a
												className={'ps-4 underline cursor-pointer'}
												target={'_blank'}
												rel="noopener noreferrer"
												href={project.linkDemo}
											>
												<IconPlanet className={'inline'} />
												{labels.linkDemo}
											</a>
										)}
									</div>
								)}
								<div className={'flex flex-col'}>
									<h4 className="text-xl mb-2">{labels.technologies} :</h4>
									<div className={'flex flex-wrap gap-2'}>
										{project.techs.map((tech, i) => (
											<Technology technology={tech} key={i} />
										))}
									</div>
								</div>
							</ProjectContentAnimatePresence>
						</div>
						<ProjectContent html={project.html} isOpen={isOpen} />
					</div>
				</div>
			</motion.div>
		</article>
	);
}
