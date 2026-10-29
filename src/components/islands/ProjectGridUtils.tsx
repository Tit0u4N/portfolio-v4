import { forwardRef, type ComponentProps } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type ProjectContentAnimatePresenceProps = ComponentProps<typeof motion.div> & {
	appearsWhen: boolean;
};

export const ProjectContentAnimatePresence = forwardRef<
	HTMLDivElement,
	ProjectContentAnimatePresenceProps
>(
	(
		{
			children,
			appearsWhen,
			className,
			initial,
			animate,
			exit,
			transition,
			...rest
		},
		ref,
	) => {
		const scaleHidden = 0.9;

		initial = initial || { opacity: 0, scale: scaleHidden };
		animate = animate || { opacity: 1, scale: 1 };
		exit = exit || {
			opacity: 0,
			scale: scaleHidden,
			transition: { duration: 0.1 },
		};
		transition = transition || { delay: 0.4 };

		return (
			<AnimatePresence>
				{appearsWhen && (
					<motion.div
						ref={ref}
						className={className}
						initial={initial}
						animate={animate}
						exit={exit}
						transition={transition}
						{...rest}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		);
	},
);

ProjectContentAnimatePresence.displayName = 'ProjectContentAnimatePresence';

export function ProjectContent({
	html,
	isOpen,
}: {
	html: string;
	isOpen: boolean;
}) {
	return (
		<>
			<ProjectContentAnimatePresence
				appearsWhen={isOpen}
				className={
					'markdown-text text-paragraph font-thin text-base leading-6 tracking-wider li [&>:not([hidden])~:not([hidden])]:mt-2 mx-2 my-6'
				}
				initial={{ opacity: 0, y: 60 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, transition: { duration: 0.1, delay: 0 } }}
				transition={{ duration: 0.2, delay: 0.3 }}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			{/* Closed state: description stays in the static HTML so it gets indexed */}
			{!isOpen && <div hidden dangerouslySetInnerHTML={{ __html: html }} />}
		</>
	);
}
