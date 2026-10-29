import { cn } from '@lib/utils';
import type { TechnologyData } from '@/data/technologies';

type Props = {
	technology: TechnologyData;
	className?: string;
	showName?: boolean;
	showImage?: boolean;
};

/** Pure markup: rendered server-side from Astro, and reused inside the ProjectGrid island. */
export default function Technology({
	technology,
	className,
	showName = true,
	showImage = true,
}: Props) {
	return (
		<div
			className={cn(
				'flex items-center rounded-2xl shadow-standard dark:shadow-none dark:border-white/[0.2] dark:border w-fit p-1 px-2 gap-1 bg-popover text-popover-foreground group hover:bg-popover-foreground hover:text-popover transition duration-300 cursor-pointer',
				className,
			)}
		>
			{showImage && (
				<img
					src={technology.imageUrl}
					alt={technology.name}
					width={50}
					height={50}
					loading="lazy"
					decoding="async"
					className={cn('h-5 w-fit', technology.specialCssClass)}
				/>
			)}
			{showName && !technology.imageOnly && (
				<div className="text-m font-medium select-none">{technology.name}</div>
			)}
		</div>
	);
}
