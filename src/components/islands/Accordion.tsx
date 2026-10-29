import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@lib/utils';
import { blurFadeStyle } from '@lib/blurFade';
import { ChevronRight } from '@/components/ui/icons';

export type AccordionData = {
	image: string;
	title: string;
	subtitle: string;
	/** Markdown pre-rendered to HTML at build time */
	html: string;
	startDate: string;
	endDate: string;
};

type AccordionProps = {
	items: AccordionData[];
	delay?: number;
};

export default function Accordion({ items, delay = 0 }: AccordionProps) {
	const [idOpen, setIdOpen] = useState<number | null>(null);

	const handleOpen = (id: number | null) => {
		setIdOpen(id === idOpen ? null : id);
	};

	return (
		<div>
			{items.map((item, index) => (
				<Item
					key={index}
					index={index}
					delay={delay + index * 0.15}
					data={item}
					idOpen={idOpen}
					handleOpen={handleOpen}
				/>
			))}
			<div className={'ms-[28px] size-[7px] bg-gray-300 rounded-full'}></div>
		</div>
	);
}

type ItemProps = {
	index: number;
	delay: number;
	data: AccordionData;
	idOpen: number | null;
	handleOpen: (id: number | null) => void;
};

function Item({ index, delay, idOpen, handleOpen, data }: ItemProps) {
	const isOpen = idOpen === index;

	return (
		<div
			className="animate-blur-fade"
			style={blurFadeStyle({ yOffset: -40, delay })}
		>
			<div className={'h-0'}>
				<div
					className={
						'relative size-[61px] rounded-full border bg-white flex items-center justify-center z-10 overflow-hidden'
					}
				>
					<img
						src={data.image}
						className={'object-cover'}
						alt={data.title}
						title={data.title}
						width={140}
						height={140}
						loading="lazy"
						decoding="async"
					/>
				</div>
			</div>
			<div
				className={
					'ms-[31px] p-2 ps-10 pb-14 h-fit min-h-28 border-s [&>:not([hidden])~:not([hidden])]:mt-2 z-8'
				}
			>
				<div
					className={'w-full flex justify-between items-center'}
					onClick={() => handleOpen(index)}
				>
					<div className={'group cursor-pointer'}>
						<div className={'flex items-center gap-1 '}>
							<h3 className={'font-medium group-hover:underline'}>
								<button
									type="button"
									aria-expanded={isOpen}
									className={'text-left'}
								>
									{data.title}
								</button>
							</h3>
							<ChevronRight
								size={20}
								className={cn(
									'transition duration-500',
									isOpen && 'translate-x-0 opacity-100 rotate-90',
								)}
							/>
						</div>
						<p className={'text-xs text-paragraph -mt-1'}>{data.subtitle}</p>
					</div>
					<div className={'text-paragraph'}>
						{data.startDate} - {data.endDate}
					</div>
				</div>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							className={'markdown-text text-paragraph overflow-hidden'}
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{
								duration: 0.2,
								type: 'spring',
								stiffness: 100,
								damping: 12,
							}}
							dangerouslySetInnerHTML={{ __html: data.html }}
						/>
					)}
				</AnimatePresence>
				{/* Closed state: content stays in the static HTML so it gets indexed */}
				{!isOpen && (
					<div hidden dangerouslySetInnerHTML={{ __html: data.html }} />
				)}
			</div>
		</div>
	);
}
